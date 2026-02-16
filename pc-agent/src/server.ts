import "dotenv/config";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import os from "node:os";
import { cleanRecycleBin, cleanTemp } from "./cleaner.js";

const PORT = Number(process.env.PORT || 8787);
const AUTH_TOKEN = process.env.AUTH_TOKEN || "";
const ALLOWED_SUBNET = process.env.ALLOWED_SUBNET || "192.168.1.0/24";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "";
const VERSION = "1.0.0";

const app = express();

const parseSubnet = (subnet: string) => {
  const [baseIp, prefixText] = subnet.split("/");
  const prefix = Number(prefixText);
  if (!baseIp || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    throw new Error(`Invalid ALLOWED_SUBNET: ${subnet}`);
  }
  return { baseIp, prefix };
};

const ipv4ToInt = (ip: string) => {
  const parts = ip.split(".").map((n) => Number(n));
  if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    return null;
  }
  return ((((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3]) >>> 0);
};

const maskFromPrefix = (prefix: number) => {
  if (prefix === 0) return 0;
  return (0xffffffff << (32 - prefix)) >>> 0;
};

const clientIp = (req: Request) => {
  const raw = req.socket.remoteAddress || "";
  if (raw.startsWith("::ffff:")) return raw.slice(7);
  if (raw === "::1") return "127.0.0.1";
  return raw;
};

const subnet = parseSubnet(ALLOWED_SUBNET);
const subnetBase = ipv4ToInt(subnet.baseIp);
const subnetMask = maskFromPrefix(subnet.prefix);
if (subnetBase == null) {
  throw new Error(`Invalid ALLOWED_SUBNET base IP: ${subnet.baseIp}`);
}

const isAllowedSubnet = (ip: string) => {
  if (ip === "127.0.0.1" || ip === "::1") return true;
  const numeric = ipv4ToInt(ip);
  if (numeric == null) return false;
  return (numeric & subnetMask) === (subnetBase & subnetMask);
};

const isAllowedOrigin = (origin: string) => {
  const configured = ALLOWED_ORIGIN
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

  if (configured.includes(origin)) return true;

  try {
    const u = new URL(origin);
    const host = u.hostname;
    const port = u.port || (u.protocol === "https:" ? "443" : "80");
    if (port !== "3000") return false;
    if (host === "localhost" || host === "127.0.0.1") return true;
    return isAllowedSubnet(host);
  } catch {
    return false;
  }
};

const enforceNetworkScope = (req: Request, res: Response, next: NextFunction) => {
  const ip = clientIp(req);
  if (!isAllowedSubnet(ip)) {
    return res.status(403).json({ ok: false, error: "Forbidden: outside allowed subnet" });
  }
  return next();
};

const enforceToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("X-Auth-Token") || "";
  if (!AUTH_TOKEN || token !== AUTH_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }
  return next();
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Blocked by CORS"));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "X-Auth-Token"]
  })
);

app.use(express.json());
app.use(enforceNetworkScope);

app.get("/api/status", (_req, res) => {
  res.json({
    ok: true,
    pcName: os.hostname(),
    uptime: Math.floor(os.uptime()),
    version: VERSION
  });
});

app.post("/api/clean-temp", enforceToken, async (_req, res) => {
  const result = await cleanTemp();
  res.json(result);
});

app.post("/api/clean-recycle", enforceToken, async (_req, res) => {
  const result = await cleanRecycleBin();
  res.json(result);
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ ok: false, error: error.message });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Temp Cleaner agent listening on http://0.0.0.0:${PORT}`);
  console.log(`Allowed subnet: ${ALLOWED_SUBNET}`);
  if (ALLOWED_ORIGIN) {
    console.log(`Allowed origin override(s): ${ALLOWED_ORIGIN}`);
  }
});
