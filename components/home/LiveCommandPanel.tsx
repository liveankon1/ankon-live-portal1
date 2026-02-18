"use client";

import { useEffect, useMemo, useState } from "react";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const VIEW_KEY = "ankon:home_view_count";

type CalendarCell = {
  day: number;
  monthOffset: -1 | 0 | 1;
};

const buildCalendar = (date: Date): CalendarCell[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const leading = firstDay.getDay();
  const trailing = 6 - lastDay.getDay();

  const cells: CalendarCell[] = [];

  for (let i = leading; i > 0; i -= 1) {
    cells.push({ day: prevMonthLastDay - i + 1, monthOffset: -1 });
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    cells.push({ day, monthOffset: 0 });
  }

  for (let day = 1; day <= trailing; day += 1) {
    cells.push({ day, monthOffset: 1 });
  }

  return cells;
};

export const LiveCommandPanel = () => {
  const [now, setNow] = useState(() => new Date());
  const [views, setViews] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const previousRaw = window.localStorage.getItem(VIEW_KEY);
    const previous = previousRaw ? Number(previousRaw) : 0;
    const seed = Number.isFinite(previous) && previous > 0 ? previous : 4132 + Math.floor(Math.random() * 460);
    const next = seed + 1;
    window.localStorage.setItem(VIEW_KEY, String(next));
    setViews(next);
  }, []);

  const dateLabel = useMemo(
    () =>
      now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }),
    [now]
  );

  const monthLabel = useMemo(
    () =>
      now.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      }),
    [now]
  );

  const timeLabel = useMemo(
    () =>
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }),
    [now]
  );

  const calendarCells = useMemo(() => buildCalendar(now), [now]);
  const today = now.getDate();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
      <div className="rounded-3xl border border-cyan-300/30 bg-slate-900/55 p-5 backdrop-blur-xl md:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/85">Live Command Clock</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-50">Calendar + Live Time</h2>
            <p className="mt-1 text-slate-300">{dateLabel}</p>
          </div>
          <div className="rounded-2xl border border-emerald-300/35 bg-emerald-300/10 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-100/90">Live Views</p>
            <p className="text-2xl font-bold text-emerald-100">{views.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-2xl border border-fuchsia-300/30 bg-slate-950/70 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-fuchsia-200/85">Current Time</p>
            <p className="mt-3 text-4xl font-bold text-slate-50 md:text-5xl">{timeLabel}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-100">
              <span className="live-dot" aria-hidden="true" />
              Live Sync
            </div>
          </article>

          <article className="rounded-2xl border border-cyan-300/25 bg-slate-950/70 p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-lg font-semibold text-slate-100">{monthLabel}</p>
              <span className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">Calendar</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {WEEK_DAYS.map((day) => (
                <span key={day} className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {day}
                </span>
              ))}
              {calendarCells.map((cell, index) => {
                const isToday = cell.monthOffset === 0 && cell.day === today;
                const muted = cell.monthOffset !== 0;
                return (
                  <span
                    key={`${cell.monthOffset}-${cell.day}-${index}`}
                    className={`rounded-lg py-2 text-sm ${
                      isToday
                        ? "border border-cyan-200/55 bg-cyan-300/25 font-bold text-cyan-50"
                        : muted
                          ? "text-slate-500"
                          : "border border-slate-700/70 bg-slate-900/70 text-slate-200"
                    }`}
                  >
                    {cell.day}
                  </span>
                );
              })}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
