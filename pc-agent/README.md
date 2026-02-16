# Temp Cleaner Agent (Windows, Local Network Only)

This agent exposes a controlled API for safe temporary-file cleanup on your own LAN.

## Safety Boundaries

- Local network scope only via `ALLOWED_SUBNET` check.
- Pairing token required for cleanup via `X-Auth-Token`.
- No stealth behavior, no persistence setup, no privilege escalation.
- No startup autorun logic.
- Cleanup is restricted to:
  - `%TEMP%`
  - `%TMP%`
  - `C:\Windows\Temp` (best effort; permission failures are reported, not fatal)

## 1) Setup

```powershell
cd pc-agent
copy .env.example .env
npm install
npm run dev
```

## 2) Configure `.env`

```env
PORT=8787
AUTH_TOKEN=replace-with-a-long-random-token
ALLOWED_SUBNET=192.168.1.0/24
ALLOWED_ORIGIN=http://192.168.1.77:3000
```

- `ALLOWED_ORIGIN` should be the exact origin of your phone UI page.
- Keep token private.

## 3) Windows Firewall Rule (allow LAN only)

Run in elevated PowerShell:

```powershell
New-NetFirewallRule -DisplayName "Temp Cleaner Agent 8787" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 8787 -Profile Private
```

Use only `Private` network profile at home/LAN.

## 4) Find Local PC IP

```powershell
ipconfig
```

Use your active adapter IPv4 (example: `192.168.1.50`).

## 5) API

### `GET /api/status`

Response:

```json
{
  "ok": true,
  "pcName": "DESKTOP-XXXX",
  "uptime": 12345,
  "version": "1.0.0"
}
```

### `POST /api/clean-temp`

Required header:

`X-Auth-Token: <AUTH_TOKEN>`

Response:

```json
{
  "ok": true,
  "deletedFiles": 123,
  "freedBytes": 4567890,
  "errors": []
}
```
