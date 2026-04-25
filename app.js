import { useState, useEffect, useRef, useCallback } from "react";
const MONTHS_ARR = [{
  name: "April",
  short: "APR",
  days: 30,
  m: 4
}, {
  name: "May",
  short: "MAY",
  days: 31,
  m: 5
}, {
  name: "June",
  short: "JUN",
  days: 30,
  m: 6
}];
const Q2_WEEKS = [{
  n: 1,
  start: [4, 6],
  end: [4, 12],
  sm: "APR",
  em: "APR"
}, {
  n: 2,
  start: [4, 13],
  end: [4, 19],
  sm: "APR",
  em: "APR"
}, {
  n: 3,
  start: [4, 20],
  end: [4, 26],
  sm: "APR",
  em: "APR"
}, {
  n: 4,
  start: [4, 27],
  end: [5, 3],
  sm: "APR",
  em: "MAY"
}, {
  n: 5,
  start: [5, 4],
  end: [5, 10],
  sm: "MAY",
  em: "MAY"
}, {
  n: 6,
  start: [5, 11],
  end: [5, 17],
  sm: "MAY",
  em: "MAY"
}, {
  n: 7,
  start: [5, 18],
  end: [5, 24],
  sm: "MAY",
  em: "MAY"
}, {
  n: 8,
  start: [5, 25],
  end: [5, 31],
  sm: "MAY",
  em: "MAY"
}, {
  n: 9,
  start: [6, 1],
  end: [6, 7],
  sm: "JUN",
  em: "JUN"
}, {
  n: 10,
  start: [6, 8],
  end: [6, 14],
  sm: "JUN",
  em: "JUN"
}, {
  n: 11,
  start: [6, 15],
  end: [6, 21],
  sm: "JUN",
  em: "JUN"
}, {
  n: 12,
  start: [6, 22],
  end: [6, 28],
  sm: "JUN",
  em: "JUN"
}, {
  n: 13,
  start: [6, 29],
  end: [7, 5],
  sm: "JUN",
  em: "JUL"
}];
const ESS_SPORT = [{
  code: "MS",
  label: "Sport"
}, {
  code: "MM",
  label: "Mind"
}];
const ESS_RJ = [{
  code: "RJ",
  label: "Journal AM"
}, {
  code: "RJ2",
  label: "Journal PM"
}];
const ESSENTIALS = [...ESS_SPORT, ...ESS_RJ];
const TOP3 = [{
  code: "PW",
  label: "Work"
}, {
  code: "PB",
  label: "Behavior"
}, {
  code: "PA",
  label: "Advance"
}];
const TRK_PXRV = [{
  code: "PX",
  label: "Digital"
}, {
  code: "RV",
  label: "Visuals"
}];
const TRK_PR = [{
  code: "PR",
  label: "Reading"
}];
const TRK_RSLH = [{
  code: "RS",
  label: "Spaces"
}, {
  code: "LH",
  label: "House"
}];
const TRK_MV = [{
  code: "MV",
  label: "Vibe"
}];
const TRK_SM = [{
  code: "SM",
  label: "Social"
}];
const ALL_HATS = [...ESSENTIALS, ...TOP3, ...TRK_PXRV, ...TRK_PR, ...TRK_RSLH, ...TRK_MV, ...TRK_SM];
const TRK_SECTIONS = [{
  hats: TRK_PXRV,
  label: "PX+RV"
}, {
  hats: TRK_PR,
  label: "PR"
}, {
  hats: TRK_RSLH,
  label: "RS+LH"
}, {
  hats: TRK_MV,
  label: "MV"
}, {
  hats: TRK_SM,
  label: "SM"
}];
const MONTH_SECTIONS = [{
  hats: ESS_SPORT,
  color: "#bf5000",
  bg: "#fff3e0",
  bdr: "#ffb74d",
  gap: true
}, {
  hats: ESS_RJ,
  color: "#bf5000",
  bg: "#fff3e0",
  bdr: "#ffb74d",
  gap: true
}, {
  hats: TOP3,
  color: "#1b5e20",
  bg: "#e8f5e9",
  bdr: "#66bb6a",
  gap: true
}, {
  hats: TRK_PXRV,
  color: "#555",
  bg: "#f5f5f5",
  bdr: "#c0c0c0",
  gap: false
}, {
  hats: TRK_PR,
  color: "#666",
  bg: "#fafafa",
  bdr: "#cccccc",
  gap: false
}, {
  hats: TRK_RSLH,
  color: "#555",
  bg: "#f5f5f5",
  bdr: "#c0c0c0",
  gap: false
}, {
  hats: TRK_MV,
  color: "#666",
  bg: "#fafafa",
  bdr: "#cccccc",
  gap: false
}, {
  hats: TRK_SM,
  color: "#555",
  bg: "#f5f5f5",
  bdr: "#c0c0c0",
  gap: false
}];
const ENERGY = [{
  sym: "▲▲",
  color: "#00897b",
  label: "PEAK"
}, {
  sym: "▲",
  color: "#43a047",
  label: "EXCEEDED"
}, {
  sym: "■",
  color: "#1976d2",
  label: "ON TRACK"
}, {
  sym: "▼",
  color: "#e53935",
  label: "UNDER"
}, {
  sym: "○",
  color: "#999",
  label: "REST"
}];
const TIMER_CONFIGS = [{
  label: "Focus",
  min: 25,
  color: "#111"
}, {
  label: "Meal",
  min: 20,
  color: "#e65100"
}, {
  label: "Rest",
  min: 15,
  color: "#1565c0"
}, {
  label: "Break",
  min: 5,
  color: "#2e7d32"
}];
const _NOW = new Date();
const TODAY_M = _NOW.getMonth() + 1; // real current month
const TODAY_D = _NOW.getDate(); // real current day
const TABS = ["today", "month", "timer"];
const MANTRAS = [{
  hat: null,
  text: "Be Konstantin. One move = full presence."
}, {
  hat: null,
  text: "I am proud of you. I am proud of myself."
}, {
  hat: null,
  text: "I choose me."
}, {
  hat: null,
  text: "Create a garden and they will come."
}, {
  hat: null,
  text: "One door, one step. / Одна дверь, один шаг."
}, {
  hat: null,
  text: "Presence matters more than certainty."
}, {
  hat: null,
  text: "This is not cruelty — this is the end of survival and the beginning of life."
}, {
  hat: null,
  text: "Every step I took was driven by my passion. I need to follow my own path."
}, {
  hat: null,
  text: "Winning through many losses. Determination. Failure = success."
}, {
  hat: null,
  text: "Top performers are great not because their ideas are better, but because their execution disciplines are better."
}, {
  hat: null,
  text: "I concentrate on one career milestone at a time. I give it my best, celebrate the win, and only then move on."
}, {
  hat: null,
  text: "No matter what happens today — I can handle it."
}, {
  hat: null,
  text: "Walk in with no plan. Trust that you belong. The job follows."
}, {
  hat: null,
  text: "Looking at a different ocean shore every day."
}, {
  hat: null,
  text: "Authority figures will not spontaneously recognize your potential. You go get it yourself."
}];
const WHO_I_AM_QUOTES = [{
  hat: "PW",
  text: "Money = true freedom"
}, {
  hat: "PW",
  text: "Raise your prices — people who value you will pay"
}, {
  hat: "PW",
  text: "Business first, friendship second in client relationships"
}, {
  hat: "PW",
  text: "Always require deposits on large bookings"
}, {
  hat: "PW",
  text: "Just post your services. Every day something. People will come."
}, {
  hat: "PW",
  text: "Inner architecture and outer reality must move in parallel. Systems without action is just decoration."
}, {
  hat: "PW",
  text: "Walk in with no plan. Trust that you belong. The job follows."
}, {
  hat: "PW",
  text: "Authority figures will not spontaneously recognize your potential. You go get it yourself."
}, {
  hat: "PB",
  text: "Today is going to be superfantabulous. Say it in the morning."
}, {
  hat: "PB",
  text: "Первые 20 минут после пробуждения решают как пройдет твой день."
}, {
  hat: "PB",
  text: "Morning protocol: music first, no social media until top tasks set. Apple News max 5 min — marketing or photography only."
}, {
  hat: "PB",
  text: "No matter what happens today — I can handle it. Say it every morning."
}, {
  hat: "PB",
  text: "High five in the morning."
}, {
  hat: "PB",
  text: '"I am proud of you" — say it daily.'
}, {
  hat: "PB",
  text: "Talk to yourself — it works."
}, {
  hat: "PB",
  text: "Sleep consistency = life consistency."
}, {
  hat: "PB",
  text: "Friday night bedtime discipline is the hardest one. That's exactly why it matters."
}, {
  hat: "PB",
  text: "Evening is a skill — stop with evidence. Top 3 morning, 2 of 3 evening = good day. Win Entry Rule already works."
}, {
  hat: "PB",
  text: "Physical reset between tasks — finished one block, stand up, go outside 10 minutes, then sit down for the next. The brain needs the signal that the first task is closed. One tool, not a new system."
}, {
  hat: "PB",
  text: "I choose me — write it daily. It replaces the old voice."
}, {
  hat: "PB",
  text: "Acting despite fear three times in one day is a normal Tuesday now."
}, {
  hat: "PB",
  text: "They don't know your story. That's your advantage. Show up well — that's enough."
}, {
  hat: "PB",
  text: "On bad days: just do Top 3 + Wins. That's enough."
}, {
  hat: "PB",
  text: "Challenges build me (75 Hard, 7 AM Club, Sober October, Afraid No More, 75 Run)."
}, {
  hat: "PB",
  text: 'I chose myself long before I had words for it. Every time I walked away from what was hurting me, that was already "I choose me."'
}, {
  hat: "PB",
  text: "Sobriety is my foundation — I proved it in Q4 2025."
}, {
  hat: "PB",
  text: "I caught the weed pattern in days this quarter, not weeks. Self-awareness is getting faster."
}, {
  hat: "PB",
  text: "Outdoor learning is my personal technique. Moving outside while studying, listening, reading between runs. Body active, mind absorbs better. ADHD brain works with movement not against it."
}, {
  hat: "PR",
  text: "The reading habit is real and compounding. Two books simultaneously in Week 13 26Q1 matched the 75 Hard record. PR is not just a book list — it's proof that the habit survived two quarters and is getting stronger."
}, {
  hat: "PR",
  text: "Let Them (Mel Robbins) — boundaries, emotional release, control only what's mine"
}, {
  hat: "PR",
  text: "Atomic Habits (James Clear) — identity-based habits, systems over goals"
}, {
  hat: "PR",
  text: "12 Week Year (Moran & Lennington) — urgency without burnout, quarterly vision"
}, {
  hat: "PR",
  text: "Adult Children of Emotionally Immature Parents — understanding my family patterns (in process of reading)"
}, {
  hat: "PR",
  text: "The 5 Second Rule (Mel Robbins) — Q2 reading."
}, {
  hat: "RJ",
  text: "A5 box technique became the closest thing to guaranteed deep work the system has ever had — one box drawn around the anchor task triggers focused execution, multiple pomodoros run from that single commitment, dashes show exactly where the day drifted and when catch-up happened."
}, {
  hat: "RJ",
  text: "Daily brainstorm — one line for the day or week ahead. Clears the mind before the tasks start."
}, {
  hat: "RJ",
  text: "Week plan checked during weekly assessment — reviewed every morning alongside Vision. This is what makes the weekly assessment a living document, not just an archive."
}, {
  hat: "MM",
  text: "Sauna — daily when possible, meditation space, social space, sleep prep."
}, {
  hat: "MM",
  text: "Pool + swimming — calm and cardio combined."
}, {
  hat: "MM",
  text: "Nature hikes — clarity comes from movement outdoors."
}, {
  hat: "MM",
  text: "Creating art — drawing, stickers, collages as meditation (neuroart)."
}, {
  hat: "MM",
  text: "Vinyl + music — Tchaikovsky close to the player, stillness through sound."
}, {
  hat: "MM",
  text: "4-7-8 breathing — keep it daily."
}, {
  hat: "MM",
  text: "Progressive muscle relaxation — 5 seconds tensing, 5 relaxing per zone."
}, {
  hat: "MM",
  text: "Brown noise — play when stressed and before sleep."
}, {
  hat: "MM",
  text: "Inner meditation universe — Dragon, Horse, Phoenix, Garden, Cosmic Ship. My sanctuary, accessible anywhere."
}, {
  hat: "MM",
  text: "Forging Armor — use it before the hard moment, not after."
}, {
  hat: "MM",
  text: "Meditation in a moment — when fear arrives, use it as fuel. Fear means it matters."
}, {
  hat: "MM",
  text: "Gratitude — practice it daily. Small things count."
}, {
  hat: "MM",
  text: "Я в безопасности / I am safe — say it when nervous. It's true."
}, {
  hat: "MM",
  text: "Detach, detach, detach — one word that stops reactivity. Say it silently before responding."
}, {
  hat: "MH",
  text: "Magnesium daily — better sleep, less anxiety, muscle recovery"
}, {
  hat: "MH",
  text: "Vitamin D — mood, immunity, energy especially in Toronto winters"
}, {
  hat: "MH",
  text: "Omega-3 — focus, inflammation, brain health"
}, {
  hat: "MH",
  text: "2.5 liters of water daily — use your bottle, track it"
}, {
  hat: "MH",
  text: "Brown noise — play when stressed and before sleep"
}, {
  hat: "MV",
  text: "Cold water on face morning and evening — tightens pores, reduces puffiness, improves circulation. Keeps skin healthy and looking sharp."
}, {
  hat: "MV",
  text: "Weekly maintenance — nails, hair, haircut, flossing, mask"
}, {
  hat: "DP",
  text: "I visited many universes: sex, drugs, clubs, Russia, California, travelling, journalism, photography — every one taught me something."
}, {
  hat: "DP",
  text: "Past skills (photo, journalism, systems) are fuel, not waste."
}, {
  hat: "DP",
  text: "Helping Lena for 6 hours — building her plan, mantras, letter from her future self — that used journalism and psychology background simultaneously. That's not accidental. It's a skill that can be monetized."
}, {
  hat: "DP",
  text: "Growth phases: acceleration now → cruiser height in 1-3 years → 30-40% rest without guilt."
}, {
  hat: "DP",
  text: "C+ execution beats perfect planning. Ship it, learn, iterate."
}, {
  hat: "DP",
  text: "People won't hear if they don't want to. Create a garden and they will come."
}, {
  hat: "DP",
  text: "Separation from parents was necessary — choosing myself is not cruelty, it's survival becoming life."
}, {
  hat: "DP",
  text: "Negative thoughts are not your voice. They are the old voice. I Choose Me is literally replacing the program."
}, {
  hat: "DP",
  text: "Healing fantasy is the belief that if I behave correctly, they will finally see me. When I feel weak and needy — that is the signal. Shift to observing mode."
}, {
  hat: "DP",
  text: "ADHD is not a limitation — it's a superpower. Fast learning, cross-domain thinking, creative adaptation."
}, {
  hat: "DP",
  text: "Hyperfocus — use it, don't fight it. Most important task first. Timer 60-90 min. When it rings — stand up physically."
}, {
  hat: "DP",
  text: "80% rule — done is better than perfect. Morning in A5: is this an 80% or 100% task? 80% — do it, close it, move on."
}, {
  hat: "DP",
  text: 'Win Entry Rule — antidote to "I didn\'t do enough." Top 3 morning, 2 of 3 evening = good day.'
}, {
  hat: "DP",
  text: "Life OS built for ADHD is a real story and a real content angle. Nobody else has it."
}, {
  hat: "SR",
  text: "Social circle has three layers: close friends (Manan, Iulia), casual friends, weak ties. Weak ties open doors that close friends can't — different realities, different opportunities."
}, {
  hat: "SR",
  text: "Close friends take years to build. Warm contacts take one conversation."
}, {
  hat: "SR",
  text: "I want a partner who opens doors, not one who holds them. Financial investment is a love language — it means time, attention, and seriousness. I will come to that relationship from my own stable ground."
}];
const ALL_QUOTES = [...MANTRAS, ...WHO_I_AM_QUOTES];

// HAT color palette matching HAT system v7.0
const HAT_COLORS = {
  P: {
    color: "#5e1b8b",
    bg: "#f5f0ff",
    bdr: "#9c27b0"
  },
  // 🟣 Priority — purple
  R: {
    color: "#bf5000",
    bg: "#fff3e0",
    bdr: "#ff9800"
  },
  // 🟠 Reflection — orange
  M: {
    color: "#1565c0",
    bg: "#e8f0ff",
    bdr: "#42a5f5"
  },
  // 🔵 Mind & Body — blue
  D: {
    color: "#4e342e",
    bg: "#fdf3ee",
    bdr: "#a1887f"
  },
  // 🟤 Development — brown
  L: {
    color: "#546e7a",
    bg: "#f4f6f7",
    bdr: "#90a4ae"
  },
  // ⚪ Logistics — grey
  S: {
    color: "#f9a825",
    bg: "#fffde7",
    bdr: "#fdd835"
  },
  // 🟡 Social — yellow
  C: {
    color: "#2e7d32",
    bg: "#f1f8f1",
    bdr: "#66bb6a"
  } // 💚 Creative — green
};
const VISION_SECTIONS = [
// ── Q2 2026 GOALS ──────────────────────────────────────────────────────────
{
  title: "🎯 Q2 2026 — QUARTER GOALS",
  color: "#111",
  bg: "#f5f5f5",
  bdr: "#333",
  subsections: [{
    label: "🔥 TOP 3 HATs",
    items: ["🟣💰 PW: $3,000+ cash · job secured · photography income · Rover active · 1 live contact/week", "🟣🌀 PB: bedtime 11:30–12:00 every day · physical reset between tasks · I Choose Me daily · sobriety", "🟣🚀 PA: LinkedIn done Week 2 · portfolio by Week 10 · 5+ applications · certificate added"]
  }, {
    label: "🔵 DAILY ESSENTIALS",
    items: ["MS: sport every morning · progressively earlier (12pm→9am) · EE tracked monthly", "MM: 4-7-8 breathing daily · gratitude daily · Forging Armor before hard moments", "RJ: Vision + I Choose Me + top 3 tasks every morning · system unbroken"]
  }, {
    label: "📊 TRACKING HATs",
    items: ["PX+RV: one strong reel/week · Toronto angle · photography · animals", "PR: Adult Children + 5 Second Rule · 15–25 min, twice a week minimum", "RS+LH: one organizing session/week · two maintenance sessions/week", "MV: weekly grooming — nails, hair, haircut, flossing, mask. Scheduled, not reactive", "SM: one new social action per week — not with Manan"]
  }]
},
// ── Q3/Q4 NEXT QUARTERS ────────────────────────────────────────────────────
{
  title: "🔭 Q3/Q4 — NEXT QUARTERS",
  color: "#37474f",
  bg: "#f8f9fa",
  bdr: "#90a4ae",
  subsections: [{
    label: "💰 INCOME EXPANSION",
    items: ["Real estate photography: $150–350/property · GTA market · cold outreach to agents on Instagram/LinkedIn", "Second shooter for weddings/events: $150–300/event · 4–8 hrs · Facebook 'Toronto Wedding Photographers'", "Corporate headshots: coworking spaces · $75–150/person · 20 min/session · ring light + Canon", "Content creation for pet businesses: groomers, vets, dog trainers need Instagram · Star Sitter credibility", "Life coaching/system facilitation: Lena session proved this works · $50–100/session informal start", "Toronto photography walking tours: Airbnb Experiences · $50–150/person · 2hr city walk · Eevee angle", "Retail walk-ins: Zara, Aritzia, bookstores, camera shops — same energy as Second Cup"]
  }]
},
// ── LONG TERM ──────────────────────────────────────────────────────────────
{
  title: "🌊 LONG TERM VISION",
  color: "#1565c0",
  bg: "#f0f4ff",
  bdr: "#90caf9",
  subsections: [{
    label: "1 YEAR",
    items: ["Earned $10,000+ for 2 front teeth. They look great. I am confident."]
  }, {
    label: "3 YEARS",
    items: ["Vancouver — concrete plan, not abstract dream. 2010 Olympics — something clicked. I saw it and knew.", "Stable career in digital marketing / photography / creative field.", "Consistent income covering rent + savings.", "All health issues resolved — teeth, hearing, sleep optimized."]
  }, {
    label: "5 YEARS",
    items: ["Financial independence — no more gig dependency.", "Established online presence — content that inspires people.", "Healthy partnership with someone who opens doors, not holds them."]
  }, {
    label: "10 YEARS",
    items: ["My first house: ocean or water view — non-negotiable feature.", "Nature, serene and beautiful. Big house, courtyard, fountain, terracotta.", "Share with partner, friends — people I care about feel safe and protected.", "Condo apartment in NYC or London. Everything else: rent.", "Horse rides. Creative space. Security."]
  }, {
    label: "15 YEARS",
    items: ["Enough savings for retirement.", "Teaching others my Life OS — HAT, 1EE, the full journey from ADHD chaos to clarity."]
  }]
},
// ── WHO I AM ───────────────────────────────────────────────────────────────
{
  title: "🧬 WHO I AM — PW (Work)",
  color: "#5e1b8b",
  bg: "#f5f0ff",
  bdr: "#9c27b0",
  items: ["Money = true freedom.", "Raise your prices — people who value you will pay.", "Business first, friendship second in client relationships.", "Always require deposits on large bookings.", "Just post your services. Every day something. People will come.", "Inner architecture and outer reality must move in parallel. Systems without action is decoration.", "Walk in with no plan. Trust that you belong. The job follows.", "Authority figures will not spontaneously recognize your potential. You go get it yourself."]
}, {
  title: "🧬 WHO I AM — PB (Behavior)",
  color: "#5e1b8b",
  bg: "#f5f0ff",
  bdr: "#9c27b0",
  subsections: [{
    label: "☀️ MORNING",
    items: ["Today is going to be superfantabulous. Say it in the morning.", "Первые 20 минут после пробуждения решают как пройдет твой день.", "Morning: music first, no social media until top tasks set.", "No matter what happens today — I can handle it.", "High five in the morning. 'I am proud of you' — say it daily."]
  }, {
    label: "🌙 EVENING & RHYTHM",
    items: ["Sleep consistency = life consistency.", "Friday night bedtime discipline is the hardest one. That's exactly why it matters.", "Evening is a skill — stop with evidence. Top 3 morning, 2 of 3 evening = good day.", "Physical reset between tasks — finished one block, go outside 10 min, sit down for next."]
  }, {
    label: "🧠 IDENTITY & COURAGE",
    items: ["I choose me — write it daily. It replaces the old voice.", "Acting despite fear three times in one day is a normal Tuesday now.", "They don't know your story. That's your advantage. Show up well — that's enough.", "I chose myself long before I had words for it.", "On bad days: just do Top 3 + Wins. That's enough.", "Detach, detach, detach — one word that stops reactivity. Say it silently before responding.", "Healing fantasy: when I feel weak and needy — that is the signal. Shift to observing mode."]
  }, {
    label: "🚫 SOBRIETY",
    items: ["Sobriety is my foundation — I proved it in Q4 2025.", "I caught the weed pattern in days this quarter, not weeks. Self-awareness getting faster."]
  }, {
    label: "🌿 ADHD",
    items: ["ADHD is not a limitation — it's a superpower. Fast learning, cross-domain thinking, creative adaptation.", "Hyperfocus: use it, don't fight it. Most important task first. Timer 60–90 min.", "80% rule: done is better than perfect. Is this an 80% or 100% task?", "Win Entry Rule: antidote to 'I didn't do enough.' Top 3 morning, 2 of 3 evening = good day.", "Outdoor learning is my personal technique. Body active, mind absorbs better.", "Life OS built for ADHD is a real story and a real content angle. Nobody else has it."]
  }]
}, {
  title: "🧬 WHO I AM — PR (Reading)",
  color: "#5e1b8b",
  bg: "#f5f0ff",
  bdr: "#9c27b0",
  items: ["The reading habit is real and compounding. PR is proof the habit survived two quarters.", "Adult Children of Emotionally Immature Parents — changing how I understand myself.", "The 5 Second Rule · Let Them · Atomic Habits · 12 Week Year — embedded in how I live.", "Book annotation system: underlining + 1–3 star rating. Active for over a year."]
}, {
  title: "🧬 WHO I AM — RJ (Journaling)",
  color: "#5e1b8b",
  bg: "#f5f0ff",
  bdr: "#9c27b0",
  items: ["A5 box technique — one box drawn around the anchor task triggers focused execution.", "Daily brainstorm — one line for the day or week ahead. Clears the mind before tasks start.", "Week plan checked during weekly assessment — reviewed every morning alongside Vision."]
}, {
  title: "🧬 WHO I AM — MM (Mindfulness)",
  color: "#5e1b8b",
  bg: "#f5f0ff",
  bdr: "#9c27b0",
  subsections: [{
    label: "🔥 PHYSICAL",
    items: ["Sauna — daily when possible. Meditation space, social space, sleep prep.", "Pool + swimming — calm and cardio combined.", "Nature hikes — clarity comes from movement outdoors.", "Creating art — drawing, stickers, collages as meditation (neuroart).", "Vinyl + music — Tchaikovsky close to the player, stillness through sound."]
  }, {
    label: "💨 BREATH & BODY",
    items: ["4-7-8 breathing — keep it daily.", "Progressive muscle relaxation — 5 seconds tensing, 5 relaxing per zone.", "Brown noise — play when stressed and before sleep."]
  }, {
    label: "🌌 INNER WORLD",
    items: ["Inner meditation universe — Dragon, Horse, Phoenix, Garden, Cosmic Ship.", "Forging Armor — use it before the hard moment, not after.", "Meditation lineage: Wild Horse → Phoenix → Dragon → Earth Dragon → Forging Armor.", "Fear is fuel. Embarrassment means it matters. Use it.", "Я в безопасности / I am safe — say it when nervous. It's true.", "Gratitude — one line, morning or evening. Small things count."]
  }]
}, {
  title: "🧬 WHO I AM — MH (Health)",
  color: "#5e1b8b",
  bg: "#f5f0ff",
  bdr: "#9c27b0",
  items: ["Magnesium daily — better sleep, less anxiety, muscle recovery.", "Vitamin D — mood, immunity, energy especially in Toronto winters.", "Omega-3 — focus, inflammation, brain health.", "2.5 liters of water daily — use your bottle, track it.", "Brown noise — play when stressed and before sleep."]
}, {
  title: "🧬 WHO I AM — MV (Vibe)",
  color: "#5e1b8b",
  bg: "#f5f0ff",
  bdr: "#9c27b0",
  items: ["Cold water on face morning and evening — tightens pores, improves circulation.", "Weekly maintenance: nails, hair, haircut, flossing, mask. Scheduled, not reactive."]
}, {
  title: "🧬 WHO I AM — DP (Psychology)",
  color: "#5e1b8b",
  bg: "#f5f0ff",
  bdr: "#9c27b0",
  items: ["I visited many universes: sex, drugs, clubs, Russia, California, travelling, journalism, photography.", "Past skills (photo, journalism, systems) are fuel, not waste.", "Helping Lena for 6 hours used journalism and psychology simultaneously. That's a monetizable skill.", "Growth phases: acceleration now → cruiser height in 1–3 years → 30–40% rest without guilt.", "C+ execution beats perfect planning. Ship it, learn, iterate.", "Separation from parents was necessary — choosing myself is not cruelty, it's survival becoming life.", "Negative thoughts are not your voice. They are the old voice. I Choose Me literally replaces the program.", "Healing fantasy: belief that if I behave correctly, they will finally see me. When I feel weak — that is the signal."]
}, {
  title: "🧬 WHO I AM — SR (Connection)",
  color: "#5e1b8b",
  bg: "#f5f0ff",
  bdr: "#9c27b0",
  items: ["Social circle: close friends (Manan, Yulia) · casual friends · weak ties. All three layers matter.", "Weak ties open doors that close friends can't — different realities, different opportunities.", "Close friends take years to build. Warm contacts take one conversation.", "I want a partner who opens doors, not one who holds them.", "Financial investment is a love language — it means time, attention, and seriousness.", "I will come to that relationship from my own stable ground."]
},
// ── MANTRAS ────────────────────────────────────────────────────────────────
{
  title: "💬 MANTRA COLLECTION",
  color: "#333",
  bg: "#fafafa",
  bdr: "#ccc",
  items: MANTRAS
}];
const M_LABEL = {
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL"
};
const DW = 22,
  EW = 14,
  CW = 19;
const STATES = [null, "x", "box", "back"];
function nextSt(cur) {
  return STATES[(STATES.indexOf(cur) + 1) % STATES.length];
}
function stMark(st, col) {
  if (!st) return {
    ch: "·",
    c: "#ddd",
    fw: 400,
    fs: 10
  };
  if (st === "x") return {
    ch: "×",
    c: col,
    fw: 900,
    fs: 13
  };
  if (st === "box") return {
    ch: "⊠",
    c: col,
    fw: 900,
    fs: 12
  };
  if (st === "back") return {
    ch: "◀",
    c: col,
    fw: 900,
    fs: 11
  };
  return {
    ch: "·",
    c: "#ddd",
    fw: 400,
    fs: 10
  };
}
function initMonth(days) {
  const grid = {};
  ALL_HATS.forEach(h => {
    grid[h.code] = {};
    for (let d = 1; d <= days; d++) grid[h.code][d] = null;
  });
  const energy = {},
    tasks = {},
    mood = {};
  for (let d = 1; d <= days; d++) {
    energy[d] = null;
    tasks[d] = {
      t1: "",
      t2: "",
      t3: ""
    };
    mood[d] = null;
  }
  return {
    grid,
    energy,
    tasks,
    mood
  };
}
function fmtT(s) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
function ecol(sym) {
  return ENERGY.find(e => e.sym === sym)?.color || "#999";
}
function top3pct(data, day) {
  if (!data) return 0;
  return Math.round(TOP3.filter(h => data.grid[h.code]?.[day]).length / TOP3.length * 100);
}
function weeklyTop3(allData, wdList) {
  let total = 0,
    done = 0;
  wdList.forEach(({
    m,
    d
  }) => {
    const mi = MONTHS_ARR.findIndex(x => x.m === m);
    const data = allData[mi];
    if (!data) return;
    TOP3.forEach(h => {
      total++;
      if (data.grid[h.code]?.[d]) done++;
    });
  });
  return total > 0 ? Math.round(done / total * 100) : 0;
}
function NBtn({
  onClick,
  on,
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: on ? onClick : undefined,
    style: {
      background: "none",
      border: `1px solid ${on ? "#bbb" : "#eee"}`,
      color: on ? "#444" : "#ddd",
      borderRadius: 20,
      padding: "5px 14px",
      cursor: on ? "pointer" : "default",
      fontSize: 15,
      fontFamily: "inherit"
    }
  }, children);
}
function HRow({
  h,
  state,
  color,
  bg,
  onToggle
}) {
  const mk = stMark(state, color);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 14px",
      background: state ? bg : "#fff",
      border: "none",
      borderBottom: "1px solid #f2f2f2",
      cursor: "pointer",
      textAlign: "left",
      fontFamily: "inherit"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 5,
      flexShrink: 0,
      border: `2px solid ${state ? color : "#ddd"}`,
      background: state ? color + "22" : "#f8f8f8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: mk.fs,
      color: state ? color : "#ddd",
      fontWeight: mk.fw
    }
  }, state === "x" ? "×" : state === "box" ? "⊠" : state === "back" ? "◀" : ""), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: state ? "#111" : "#aaa"
    }
  }, h.code), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#ccc"
    }
  }, h.label)));
}
function HatCounter({
  h,
  count,
  color,
  onPlus,
  onMinus
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "7px 12px",
      borderBottom: "1px solid #f2f2f2",
      background: count > 0 ? color + "08" : "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: count > 0 ? color : "#888"
    }
  }, h.code), count === 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      color: color,
      marginLeft: 6,
      fontWeight: 700
    }
  }, "\xD7 DONE"), count >= 2 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      color: "#1565c0",
      marginLeft: 6,
      fontWeight: 700
    }
  }, "\u22A0 BOXING")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Cb, {
    bg: "#ebebeb",
    col: "#444",
    onClick: onMinus
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: count > 0 ? color : "#ccc",
      minWidth: 22,
      textAlign: "center"
    }
  }, count), /*#__PURE__*/React.createElement(Cb, {
    bg: color,
    col: "#fff",
    onClick: onPlus
  }, "+")));
}
function Cb({
  bg,
  col,
  onClick,
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      background: bg,
      border: "none",
      color: col,
      borderRadius: 8,
      width: 28,
      height: 28,
      cursor: "pointer",
      fontSize: 16,
      fontWeight: 800,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, children);
}

// ── TODAY PANEL ─────────────────────────────────────────────────────────────
function TodayPanel({
  allData,
  getMI,
  viewDay,
  viewM,
  setViewDay,
  setViewM,
  weekIdx,
  setWeekIdx,
  weekDays,
  cycleCell,
  cycleEnergy,
  setTask,
  weekAssess,
  setAssess,
  setPriority
}) {
  const data = allData[getMI(viewM)];
  const w = Q2_WEEKS[weekIdx];
  const wd = weekDays();
  const essDone = ESSENTIALS.filter(h => data?.grid?.[h.code]?.[viewDay]).length;
  const dayPct = top3pct(data, viewDay);
  const wkPct = weeklyTop3(allData, wd);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(NBtn, {
    onClick: () => setWeekIdx(x => Math.max(0, x - 1)),
    on: weekIdx > 0
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#333",
      letterSpacing: 1
    }
  }, "W", w.n, " \xB7 ", w.sm, " ", w.start[1], "\u2013", w.em, " ", w.end[1]), /*#__PURE__*/React.createElement(NBtn, {
    onClick: () => setWeekIdx(x => Math.min(12, x + 1)),
    on: weekIdx < 12
  }, "\u203A")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      overflowX: "auto",
      marginBottom: 12,
      paddingBottom: 4
    }
  }, wd.map(({
    m,
    d
  }) => {
    const dd = allData[getMI(m)];
    const de = dd?.energy?.[d];
    const dp = top3pct(dd, d);
    const isT = m === TODAY_M && d === TODAY_D,
      isV = m === viewM && d === viewDay;
    return /*#__PURE__*/React.createElement("button", {
      key: `${m}-${d}`,
      onClick: () => {
        setViewDay(d);
        setViewM(m);
      },
      style: {
        minWidth: 44,
        background: isV ? "#111" : "#fff",
        border: `1.5px solid ${isT && !isV ? "#111" : "#e0e0e0"}`,
        borderRadius: 10,
        padding: "6px 4px",
        cursor: "pointer",
        textAlign: "center",
        fontFamily: "inherit"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 7,
        color: isV ? "#777" : "#bbb",
        letterSpacing: 1
      }
    }, M_LABEL[m]), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: isT ? 900 : 500,
        color: isV ? "#fff" : "#111"
      }
    }, d), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: isV ? "#aaa" : de ? ecol(de) : "#e0e0e0",
        marginTop: 1
      }
    }, de || "·"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: isV ? "#777" : "#ccc"
      }
    }, dp > 0 ? dp + "%" : ""));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 10,
      border: "1px solid #e0e0e0",
      marginBottom: 10,
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      letterSpacing: 3,
      color: "#1b5e20",
      fontWeight: 800
    }
  }, "WEEK W", w.n, " \xB7 TOP 3"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 900,
      color: wkPct === 100 ? "#1b5e20" : wkPct >= 50 ? "#43a047" : "#e53935"
    }
  }, wkPct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: "#f0f0f0",
      borderRadius: 3,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${wkPct}%`,
      background: wkPct === 100 ? "#1b5e20" : wkPct >= 50 ? "#66bb6a" : "#ff8a65",
      borderRadius: 3,
      transition: "width .3s"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginTop: 8
    }
  }, TOP3.map(h => {
    const dc = wd.filter(({
      m,
      d
    }) => {
      const mi = getMI(m);
      return allData[mi]?.grid?.[h.code]?.[d];
    }).length;
    return /*#__PURE__*/React.createElement("div", {
      key: h.code,
      style: {
        flex: 1,
        textAlign: "center",
        background: "#f8f8f8",
        borderRadius: 6,
        padding: "4px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: dc > 0 ? "#1b5e20" : "#ccc"
      }
    }, h.code), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 900,
        color: dc > 0 ? "#1b5e20" : "#ddd"
      }
    }, dc, "/", wd.length));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 10,
      border: "2px solid #111",
      marginBottom: 10,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "7px 14px",
      background: "#111",
      fontSize: 9,
      letterSpacing: 3,
      color: "#fff",
      fontWeight: 800
    }
  }, "\u25A1 TOP 3 TASKS \u2014 ", M_LABEL[viewM], " ", viewDay), ["t1", "t2", "t3"].map((f, idx) => {
    const tasks = data?.tasks?.[viewDay] || {};
    return /*#__PURE__*/React.createElement("div", {
      key: f,
      style: {
        display: "flex",
        alignItems: "center",
        borderBottom: idx < 2 ? "1px solid #f0f0f0" : "none",
        padding: "0 14px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "#ccc",
        marginRight: 8,
        fontWeight: 700
      }
    }, idx + 1), /*#__PURE__*/React.createElement("input", {
      value: tasks[f] || "",
      onChange: ev => setTask(viewM, viewDay, f, ev.target.value),
      placeholder: `Task ${idx + 1}...`,
      style: {
        flex: 1,
        background: "none",
        border: "none",
        fontSize: 13,
        fontFamily: "inherit",
        color: "#111",
        padding: "10px 0",
        outline: "none"
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 10,
      border: "1px solid #e0e0e0",
      marginBottom: 10,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "6px 14px",
      background: "#f8f8f8",
      borderBottom: "1px solid #ececec",
      fontSize: 9,
      letterSpacing: 3,
      color: "#555",
      fontWeight: 700
    }
  }, "ENERGY"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 10px",
      display: "flex",
      gap: 4
    }
  }, ENERGY.map(en => {
    const active = data?.energy?.[viewDay] === en.sym;
    return /*#__PURE__*/React.createElement("button", {
      key: en.sym,
      onClick: () => {
        const cur = data?.energy?.[viewDay];
        // direct select: if already active, deselect (cycle to null)
        const next = cur === en.sym ? null : en.sym;
        const idx = next ? ENERGY.findIndex(e => e.sym === next) : -1;
        // use cycleEnergy repeatedly to reach target, or set directly via mutData
        // We pass a special value — handled in App via setTask-like direct set
        cycleEnergy(viewM, viewDay, next);
      },
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        background: active ? en.color + "22" : "#f8f8f8",
        border: `2px solid ${active ? en.color : "#e8e8e8"}`,
        color: active ? en.color : "#aaa",
        borderRadius: 8,
        padding: "6px 2px",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all .15s"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 900,
        lineHeight: 1,
        color: active ? en.color : "#bbb"
      }
    }, en.sym), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 6,
        fontWeight: 700,
        letterSpacing: .5,
        color: active ? en.color : "#ccc"
      }
    }, en.label));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 10,
      border: "2px solid #bf5000",
      marginBottom: 10,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "6px 14px",
      background: "#fff3e0",
      fontSize: 9,
      letterSpacing: 3,
      color: "#bf5000",
      fontWeight: 800
    }
  }, "ESSENTIALS \u2014 ", essDone, "/", ESSENTIALS.length), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "2px 14px",
      fontSize: 8,
      color: "#e67700",
      letterSpacing: 2,
      background: "#fff8ee"
    }
  }, "MS \xB7 MM"), ESS_SPORT.map(h => /*#__PURE__*/React.createElement(HRow, {
    key: h.code,
    h: h,
    state: data?.grid?.[h.code]?.[viewDay],
    color: "#bf5000",
    bg: "#fff8ee",
    onToggle: () => cycleCell(h.code, viewM, viewDay)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "2px solid #ffb74d"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "2px 14px",
      fontSize: 8,
      color: "#e67700",
      letterSpacing: 2,
      background: "#fff8ee"
    }
  }, "RJ \xB7 RJ2"), ESS_RJ.map(h => /*#__PURE__*/React.createElement(HRow, {
    key: h.code,
    h: h,
    state: data?.grid?.[h.code]?.[viewDay],
    color: "#bf5000",
    bg: "#fff8ee",
    onToggle: () => cycleCell(h.code, viewM, viewDay)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 10,
      border: "2px solid #1b5e20",
      marginBottom: 10,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "6px 14px",
      background: "#e8f5e9",
      borderBottom: "1px solid #a5d6a7",
      fontSize: 9,
      letterSpacing: 3,
      color: "#1b5e20",
      fontWeight: 800
    }
  }, "TOP 3 \u2014 TODAY ", dayPct, "%"), TOP3.map(h => /*#__PURE__*/React.createElement(HRow, {
    key: h.code,
    h: h,
    state: data?.grid?.[h.code]?.[viewDay],
    color: "#1b5e20",
    bg: "#f1fff5",
    onToggle: () => cycleCell(h.code, viewM, viewDay)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 10,
      border: "1px solid #ccc",
      marginBottom: 10,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "6px 14px",
      background: "#f5f5f5",
      borderBottom: "1px solid #e0e0e0",
      fontSize: 9,
      letterSpacing: 3,
      color: "#555",
      fontWeight: 800
    }
  }, "TRACKING"), TRK_SECTIONS.map((sec, si) => /*#__PURE__*/React.createElement("div", {
    key: si,
    style: {
      borderBottom: si < TRK_SECTIONS.length - 1 ? "1px solid #ececec" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "2px 14px",
      fontSize: 8,
      color: "#bbb",
      letterSpacing: 2,
      background: "#fafafa"
    }
  }, sec.label), sec.hats.map(h => /*#__PURE__*/React.createElement(HRow, {
    key: h.code,
    h: h,
    state: data?.grid?.[h.code]?.[viewDay],
    color: "#555",
    bg: "#f8f8f8",
    onToggle: () => cycleCell(h.code, viewM, viewDay)
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 8,
      border: "1px solid #e0e0e0",
      padding: "8px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: "#bbb",
      letterSpacing: 2,
      marginBottom: 5
    }
  }, "TAP CYCLES"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, [["·", "empty", "#ccc"], ["×", "done", "#1b5e20"], ["⊠", "boxing", "#1565c0"], ["◀", "back", "#888"]].map(([s, l, c]) => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: c,
      fontWeight: 900
    }
  }, s), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 7,
      color: "#bbb"
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      background: "#fff",
      borderRadius: 10,
      border: "2px solid #111",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 14px",
      background: "#111",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 900,
      color: "#fff",
      letterSpacing: 2
    }
  }, "WEEK PRIORITIES"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      color: "#666",
      letterSpacing: 1
    }
  }, "W", Q2_WEEKS[weekIdx]?.n, " \xB7 ", Q2_WEEKS[weekIdx]?.sm)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: "#aaa",
      letterSpacing: 2,
      marginBottom: 8
    }
  }, "TOP 5 THIS WEEK"), (weekAssess?.priorities || ["", "", "", "", ""]).map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 4,
      background: p ? "#111" : "#f5f5f5",
      border: "1px solid #ddd",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 900,
      color: p ? "#fff" : "#ccc"
    }
  }, i + 1)), /*#__PURE__*/React.createElement("input", {
    value: p,
    onChange: e => setPriority(i, e.target.value),
    placeholder: `Priority ${i + 1}...`,
    style: {
      flex: 1,
      border: "none",
      borderBottom: "1px solid #eee",
      padding: "4px 2px",
      fontSize: 11,
      fontFamily: "'SF Mono','Courier New',monospace",
      color: "#333",
      outline: "none",
      background: "transparent"
    }
  }))))));
}

// ── MONTH PANEL ─────────────────────────────────────────────────────────────
const FLAT_HATS = MONTH_SECTIONS.flatMap(s => s.hats);
// C = cell size px (square). No margins between cols — alignment via borders only.
const C = 20,
  COL_DAY = 28,
  COL_EN = 14,
  COL_MOOD = 20,
  COL_PCT = 24;
const GRID_COLS = `${COL_DAY}px ${COL_EN}px ${COL_MOOD}px ${FLAT_HATS.map(() => `${C}px`).join(" ")} ${COL_PCT}px`;
function moodColor(v) {
  if (!v) return "#ddd";
  if (v >= 9) return "#00897b";
  if (v >= 7) return "#43a047";
  if (v >= 5) return "#f9a825";
  if (v >= 3) return "#e65100";
  return "#c62828";
}

// Tracking HATs
const TRK_ALL = [...TRK_PXRV, ...TRK_PR, ...TRK_RSLH, ...TRK_MV, ...TRK_SM];
const TRK_DEFAULT_GOALS = {
  PX: 2,
  RV: 1,
  PR: 2,
  RS: 1,
  LH: 2,
  MV: 1,
  SM: 1
};

// Group spans: col indices (0-based within HAT columns) for each group
// FLAT_HATS: 0=MS 1=MM 2=RJ 3=RJ2 | 4=PW 5=PB 6=PA | 7=PX 8=RV 9=PR 10=RS 11=LH 12=MV 13=SM
const GROUPS = [{
  label: "ESSENTIALS",
  start: 0,
  end: 3,
  color: "#bf5000",
  bg: "#fff3e0",
  bdr: "#ffb74d"
}, {
  label: "TOP 3",
  start: 4,
  end: 6,
  color: "#1b5e20",
  bg: "#e8f5e9",
  bdr: "#66bb6a"
}, {
  label: "TRACKING",
  start: 7,
  end: 13,
  color: "#555",
  bg: "#f5f5f5",
  bdr: "#bbb"
}];

// Build flat meta for each HAT col
function buildSectionMeta() {
  let i = 0;
  const meta = [];
  MONTH_SECTIONS.forEach((sec, si) => {
    sec.hats.forEach((h, hi) => {
      const grp = GROUPS.find(g => i >= g.start && i <= g.end);
      meta.push({
        h,
        sec,
        si,
        isFirstInSec: hi === 0,
        isLastInSec: hi === sec.hats.length - 1,
        isFirstInGrp: i === (grp ? grp.start : i),
        isLastInGrp: i === (grp ? grp.end : i),
        grp,
        globalIdx: i
      });
      i++;
    });
  });
  return meta;
}
const SECTION_META = buildSectionMeta();
function getWeekForDay(m, d) {
  return Q2_WEEKS.find(w => {
    const [sm, sd] = w.start,
      [em, ed] = w.end;
    return m * 100 + d >= sm * 100 + sd && m * 100 + d <= em * 100 + ed;
  });
}
function isWeekEnd(month, day) {
  const w = getWeekForDay(month.m, day);
  if (!w) return false;
  const [em, ed] = w.end;
  return em === month.m && ed === day;
}
function MonthPanel({
  monthIdx,
  setMonthIdx,
  allData,
  cycleCell,
  cycleEnergy,
  cycleMood
}) {
  const month = MONTHS_ARR[monthIdx];
  const data = allData[monthIdx];
  const DAYS = Array.from({
    length: month.days
  }, (_, i) => i + 1);
  const isCur = month.m === TODAY_M;
  const totalW = COL_DAY + COL_EN + COL_MOOD + FLAT_HATS.length * C + COL_PCT + 2;
  const [trkGoals, setTrkGoals] = useState(() => ({
    ...TRK_DEFAULT_GOALS
  }));
  const [showGoals, setShowGoals] = useState(false);
  function adjustGoal(code, delta) {
    setTrkGoals(p => ({
      ...p,
      [code]: Math.max(1, Math.min(7, (p[code] || 1) + delta))
    }));
  }
  function getWeekDaysInMonth(day) {
    const w = getWeekForDay(month.m, day);
    if (!w) return [];
    const days = [];
    let [cm, cd] = [...w.start];
    const [em, ed] = w.end;
    for (let i = 0; i < 7; i++) {
      if (cm === month.m) days.push(cd);
      if (cm === em && cd === ed) break;
      const mI = MONTHS_ARR.find(x => x.m === cm);
      if (mI && cd >= mI.days) {
        cm++;
        cd = 1;
      } else cd++;
    }
    return days;
  }
  function trkGoalMet(code, day) {
    const wdays = getWeekDaysInMonth(day);
    return wdays.filter(d => data.grid[code]?.[d]).length >= (trkGoals[code] || 1);
  }

  // Sticky header height: group row (14px) + code row (18px) = 32px
  const HDR_GRP = 14,
    HDR_CODE = 18,
    HDR_TOTAL = HDR_GRP + HDR_CODE;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(NBtn, {
    onClick: () => setMonthIdx(x => Math.max(0, x - 1)),
    on: monthIdx > 0
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      color: "#111"
    }
  }, month.name, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: "#aaa",
      fontWeight: 400,
      letterSpacing: 2
    }
  }, "2026")), /*#__PURE__*/React.createElement(NBtn, {
    onClick: () => setMonthIdx(x => Math.min(2, x + 1)),
    on: monthIdx < 2
  }, "\u203A")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowGoals(x => !x),
    style: {
      background: "none",
      border: "1px solid #ddd",
      borderRadius: 16,
      padding: "4px 12px",
      fontSize: 9,
      letterSpacing: 2,
      color: "#666",
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: 700
    }
  }, showGoals ? "▲ HIDE GOALS" : "▼ WEEKLY GOALS"), showGoals && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      background: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: 8,
      padding: "8px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: "#aaa",
      letterSpacing: 2,
      marginBottom: 6
    }
  }, "TRACKING \u2014 TIMES PER WEEK"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, TRK_ALL.map(h => /*#__PURE__*/React.createElement("div", {
    key: h.code,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      background: "#f8f8f8",
      borderRadius: 8,
      padding: "3px 6px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      color: "#444",
      minWidth: 22
    }
  }, h.code), /*#__PURE__*/React.createElement(Cb, {
    bg: "#e0e0e0",
    col: "#444",
    onClick: () => adjustGoal(h.code, -1)
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 900,
      color: "#111",
      minWidth: 14,
      textAlign: "center"
    }
  }, trkGoals[h.code] || 1), /*#__PURE__*/React.createElement(Cb, {
    bg: "#444",
    col: "#fff",
    onClick: () => adjustGoal(h.code, 1)
  }, "+")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 8,
      border: "1px solid #e0e0e0",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      overflowY: "auto",
      maxHeight: "62vh",
      WebkitOverflowScrolling: "touch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: totalW,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 12,
      background: "#fff",
      borderBottom: "2px solid #ccc"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: HDR_GRP
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: COL_DAY + COL_EN,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: COL_MOOD,
      flexShrink: 0,
      background: "#ffffff",
      border: "1px solid #d0d0d0",
      borderBottom: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 6,
      fontWeight: 900,
      color: "#666666",
      letterSpacing: .5
    }
  }, "MOOD"), GROUPS.map((grp, gi) => {
    const w = (grp.end - grp.start + 1) * C;
    return /*#__PURE__*/React.createElement("div", {
      key: gi,
      style: {
        width: w,
        flexShrink: 0,
        background: grp.bg,
        border: `1px solid ${grp.bdr}`,
        borderBottom: "none",
        borderLeft: gi === 0 ? `1px solid ${grp.bdr}` : `2px solid ${grp.bdr}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 7,
        fontWeight: 900,
        color: grp.color,
        letterSpacing: 1,
        overflow: "hidden"
      }
    }, grp.label);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: COL_PCT,
      flexShrink: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: HDR_CODE
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: COL_DAY,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: COL_EN,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: COL_MOOD,
      flexShrink: 0,
      height: HDR_CODE,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#ffffff",
      borderLeft: "1px solid #d0d0d0",
      borderBottom: "1px solid #d0d0d0",
      fontSize: 7,
      fontWeight: 800,
      color: "#666666"
    }
  }, "\uD83D\uDE0A"), SECTION_META.map(meta => {
    const {
      h,
      sec,
      isFirstInGrp
    } = meta;
    return /*#__PURE__*/React.createElement("div", {
      key: h.code,
      style: {
        width: C,
        flexShrink: 0,
        height: HDR_CODE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: sec.bg,
        borderLeft: isFirstInGrp ? `2px solid ${sec.bdr}` : `1px solid ${sec.bdr}88`,
        fontSize: 7,
        fontWeight: 800,
        color: sec.color
      }
    }, h.code === "RJ2" ? "R2" : h.code);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: COL_PCT,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 7,
      color: "#1b5e20",
      fontWeight: 800
    }
  }, "%"))), DAYS.map(day => {
    const p = top3pct(data, day);
    const e = data.energy[day];
    const isT = isCur && day === TODAY_D;
    const isPast = isCur ? day < TODAY_D : month.m < TODAY_M;
    const wkEnd = isWeekEnd(month, day);
    const wk = getWeekForDay(month.m, day);
    const rowBg = isT ? "#dbeafe" : day % 2 === 0 ? "#f9f9f9" : "#fff";
    return /*#__PURE__*/React.createElement("div", {
      key: day
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "stretch",
        background: rowBg,
        borderLeft: isT ? "3px solid #1976d2" : "3px solid transparent",
        height: C
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: COL_DAY - 3,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: 4,
        fontSize: 10,
        fontWeight: isT ? 900 : 500,
        color: isT ? "#1565c0" : "#555"
      }
    }, day), /*#__PURE__*/React.createElement("div", {
      onClick: () => cycleEnergy(month.m, day),
      style: {
        width: COL_EN,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: e === "▲▲" ? 7 : 9,
        fontWeight: 800,
        color: e ? ecol(e) : "#ddd",
        letterSpacing: e === "▲▲" ? -1 : 0
      }
    }, e || "·"), (() => {
      const mv = data.mood?.[day];
      return /*#__PURE__*/React.createElement("div", {
        onClick: () => cycleMood(month.m, day),
        style: {
          width: COL_MOOD,
          flexShrink: 0,
          height: C,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: "#ffffff",
          borderLeft: "1px solid #d0d0d0",
          borderTop: "1px solid #d0d0d022",
          borderBottom: "1px solid #d0d0d022"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          fontWeight: 900,
          color: moodColor(mv),
          lineHeight: 1
        }
      }, mv || "·"));
    })(), SECTION_META.map(meta => {
      const {
        h,
        sec,
        isFirstInGrp
      } = meta;
      const st = data.grid[h.code]?.[day];
      const mk = stMark(st, sec.color);
      const isTop3 = TOP3.some(t => t.code === h.code);
      const isTrk = TRK_ALL.some(t => t.code === h.code);
      const goalMet = isTrk && trkGoalMet(h.code, day);
      let bg = sec.bg;
      if (isTop3) {
        bg = st ? "#bbf7d0" : isPast ? "#fecaca" : sec.bg;
      }
      if (goalMet) {
        bg = "#d4d4d4";
      }
      // cell border: always visible; stronger left border at group boundary
      const bdrLeft = isFirstInGrp ? `2px solid ${sec.bdr}` : `1px solid ${goalMet ? "#aaa" : sec.bdr + "66"}`;
      return /*#__PURE__*/React.createElement("div", {
        key: h.code,
        onClick: () => cycleCell(h.code, month.m, day),
        style: {
          width: C,
          height: C,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: bg,
          borderLeft: bdrLeft,
          borderTop: `1px solid ${goalMet ? "#bbb" : sec.bdr + "33"}`,
          borderBottom: `1px solid ${goalMet ? "#bbb" : sec.bdr + "33"}`,
          boxSizing: "border-box"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: mk.fs,
          fontWeight: mk.fw,
          lineHeight: 1,
          color: isTop3 && st ? "#15803d" : isTop3 && isPast && !st ? "#dc2626" : goalMet ? "#666" : mk.c
        }
      }, mk.ch));
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: COL_PCT,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8,
        fontWeight: 800,
        color: p === 100 ? "#15803d" : p > 0 ? "#86efac" : "#e5e7eb"
      }
    }, p > 0 ? p : ""))), wkEnd && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        height: 10,
        background: "#f0f0f0",
        borderTop: "2px solid #333",
        borderBottom: "1px solid #999"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: COL_DAY - 3 + COL_EN + 3,
        flexShrink: 0,
        paddingLeft: 4,
        fontSize: 6,
        fontWeight: 800,
        color: "#555",
        letterSpacing: 1
      }
    }, "W", wk?.n)));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      background: "#fff",
      borderRadius: 8,
      border: "1px solid #e0e0e0",
      padding: "6px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, [["·", "empty", "#ccc"], ["×", "done", "#1b5e20"], ["⊠", "boxing", "#1565c0"], ["◀", "back", "#888"]].map(([s, l, c]) => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: c,
      fontWeight: 900
    }
  }, s), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 7,
      color: "#bbb"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 12,
      background: "#eee",
      margin: "0 2px"
    }
  }), [[`#bbf7d0`, "#22c55e", "done"], [`#fecaca`, "#ef4444", "missed"], [`#c8c8c8`, "#888", "trk✓"]].map(([bg, bdr, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: bg,
      border: `1px solid ${bdr}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 7,
      color: "#bbb"
    }
  }, l))))));
}

// ── TIMER PANEL ─────────────────────────────────────────────────────────────
function TimerPanel({
  timers,
  toggleTimer,
  resetTimer,
  nextIv,
  prevIv,
  adjustT,
  hatCounts,
  hatPlus,
  hatMinus
}) {
  const HAT_GROUPS = [{
    label: "ESSENTIALS",
    color: "#bf5000",
    hats: ESSENTIALS
  }, {
    label: "TOP 3",
    color: "#1b5e20",
    hats: TOP3
  }, {
    label: "TRACKING",
    color: "#444",
    hats: [...TRK_PXRV, ...TRK_PR, ...TRK_RSLH, ...TRK_MV, ...TRK_SM]
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 14
    }
  }, TIMER_CONFIGS.map((cfg, i) => {
    const t = timers[i];
    const pct = 1 - t.timeLeft / (cfg.min * 60);
    const r = i === 0 ? 50 : 34;
    const sz = i === 0 ? 112 : 80;
    const sc = 2 * Math.PI * r;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "#fff",
        borderRadius: 14,
        border: `2px solid ${t.running ? cfg.color : t.timeLeft === 0 ? "#2e7d32" : "#e8e8e8"}`,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        gridColumn: i === 0 ? "1/3" : "auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => toggleTimer(i),
      style: {
        position: "relative",
        width: sz,
        height: sz,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: sz,
      height: sz,
      style: {
        transform: "rotate(-90deg)"
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: sz / 2,
      cy: sz / 2,
      r: r,
      fill: "none",
      stroke: "#f0f0f0",
      strokeWidth: i === 0 ? 7 : 5
    }), /*#__PURE__*/React.createElement("circle", {
      cx: sz / 2,
      cy: sz / 2,
      r: r,
      fill: "none",
      stroke: t.timeLeft === 0 ? "#2e7d32" : t.running ? cfg.color : "#ddd",
      strokeWidth: i === 0 ? 7 : 5,
      strokeDasharray: sc,
      strokeDashoffset: sc * (1 - pct),
      strokeLinecap: "round",
      style: {
        transition: t.running ? "stroke-dashoffset 1s linear" : "none"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: i === 0 ? 26 : 16,
        fontWeight: 900,
        letterSpacing: -1,
        color: "#111",
        lineHeight: 1
      }
    }, fmtT(t.timeLeft)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: i === 0 ? 9 : 7,
        color: t.running ? cfg.color : "#bbb",
        fontWeight: 700,
        marginTop: 2
      }
    }, t.running ? "⏸ PAUSE" : t.timeLeft === 0 ? "✓ DONE" : "▶ START"))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: i === 0 ? 11 : 9,
        fontWeight: 800,
        color: cfg.color,
        letterSpacing: 1
      }
    }, cfg.label.toUpperCase()), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#888",
        fontWeight: 600
      }
    }, "\xD7", t.sessions, " sessions"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5,
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Cb, {
      bg: "#e8e8e8",
      col: "#555",
      onClick: () => prevIv(i)
    }, "\u2212"), i === 0 && [[-5, "−5"], [-1, "−1"], [1, "+1"], [5, "+5"]].map(([d, l]) => /*#__PURE__*/React.createElement("button", {
      key: l,
      onClick: () => adjustT(0, d * 60),
      style: {
        background: "#f5f5f5",
        border: "1px solid #ddd",
        color: "#333",
        borderRadius: 16,
        padding: "3px 7px",
        cursor: "pointer",
        fontSize: 10,
        fontFamily: "inherit",
        fontWeight: 700
      }
    }, l, "m")), /*#__PURE__*/React.createElement(Cb, {
      bg: cfg.color,
      col: "#fff",
      onClick: () => nextIv(i)
    }, "+"), /*#__PURE__*/React.createElement(Cb, {
      bg: "#e8e8e8",
      col: "#888",
      onClick: () => resetTimer(i)
    }, "\u21BA")));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 10,
      border: "1px solid #e0e0e0",
      padding: "12px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#888",
      letterSpacing: 3,
      marginBottom: 8,
      fontWeight: 700
    }
  }, "TODAY SESSIONS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, TIMER_CONFIGS.map((cfg, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      textAlign: "center",
      background: "#f8f8f8",
      borderRadius: 8,
      padding: "8px 4px",
      border: `1px solid ${timers[i].sessions > 0 ? cfg.color + "44" : "#e8e8e8"}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      color: timers[i].sessions > 0 ? cfg.color : "#ddd"
    }
  }, timers[i].sessions), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: "#888",
      fontWeight: 700,
      letterSpacing: 1
    }
  }, cfg.label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 8,
      border: "1px solid #e0e0e0",
      padding: "6px 12px",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: "#bbb",
      letterSpacing: 2
    }
  }, "HABIT COUNTER \u2192 syncs to APR ", TODAY_D)), HAT_GROUPS.map((grp, gi) => /*#__PURE__*/React.createElement("div", {
    key: gi,
    style: {
      background: "#fff",
      borderRadius: 10,
      border: "1px solid #e0e0e0",
      marginBottom: 10,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "6px 12px",
      background: "#f8f8f8",
      borderBottom: "1px solid #e8e8e8",
      fontSize: 9,
      letterSpacing: 3,
      color: grp.color,
      fontWeight: 800
    }
  }, grp.label), grp.hats.map(h => /*#__PURE__*/React.createElement(HatCounter, {
    key: h.code,
    h: h,
    count: hatCounts[h.code] || 0,
    color: grp.color,
    onPlus: () => hatPlus(h.code),
    onMinus: () => hatMinus(h.code)
  })))));
}

// ── VISION PANEL ─────────────────────────────────────────────────────────────
function VisionPanel() {
  const [openSec, setOpenSec] = useState(null);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#111",
      borderRadius: 10,
      padding: "12px 16px",
      marginBottom: 12,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: "#666",
      letterSpacing: 3,
      marginBottom: 4
    }
  }, "IDENTITY ANCHOR"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 900,
      color: "#fff",
      letterSpacing: .5,
      lineHeight: 1.5,
      fontFamily: "Georgia,serif"
    }
  }, "\"Be Konstantin.", /*#__PURE__*/React.createElement("br", null), "One move = full presence.\"")), VISION_SECTIONS.map((sec, i) => {
    const isOpen = openSec === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        marginBottom: 6,
        borderRadius: 10,
        overflow: "hidden",
        border: `1px solid ${sec.bdr}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => setOpenSec(isOpen ? null : i),
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "9px 14px",
        background: sec.bg,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        color: sec.color,
        letterSpacing: .3
      }
    }, sec.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: sec.color,
        fontWeight: 900
      }
    }, isOpen ? "▲" : "▼")), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        padding: "6px 14px 10px"
      }
    }, sec.subsections && sec.subsections.map((sub, si) => /*#__PURE__*/React.createElement("div", {
      key: si,
      style: {
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        fontWeight: 800,
        color: sec.color,
        letterSpacing: 2,
        padding: "4px 0 3px",
        borderBottom: `1px solid ${sec.bdr}44`
      }
    }, sub.label), sub.items.map((item, j) => /*#__PURE__*/React.createElement("div", {
      key: j,
      style: {
        display: "flex",
        gap: 8,
        alignItems: "flex-start",
        padding: "4px 0",
        borderBottom: j < sub.items.length - 1 ? "1px solid #f5f5f5" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: sec.color,
        fontSize: 8,
        marginTop: 2,
        flexShrink: 0
      }
    }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: "#333",
        lineHeight: 1.5
      }
    }, item))))), sec.items && sec.items.map((item, j) => /*#__PURE__*/React.createElement("div", {
      key: j,
      style: {
        display: "flex",
        gap: 8,
        alignItems: "flex-start",
        padding: "4px 0",
        borderBottom: j < sec.items.length - 1 ? "1px solid #f5f5f5" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: sec.color,
        fontSize: 8,
        marginTop: 2,
        flexShrink: 0
      }
    }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: "#333",
        lineHeight: 1.5
      }
    }, item)))));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      padding: "6px 14px",
      background: "#f8f8f8",
      borderRadius: 8,
      border: "1px solid #e8e8e8"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 7,
      color: "#bbb",
      letterSpacing: 2,
      textAlign: "center"
    }
  }, "VISION v2.0 \xB7 26Q2 \xB7 READ DAILY")));
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
function App() {
  const [tabIdx, setTabIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const tsX = useRef(null),
    tsY = useRef(null),
    wRef = useRef(390);

  // Rotating mantra
  const [mantraIdx, setMantraIdx] = useState(() => Math.floor(Math.random() * ALL_QUOTES.length));
  const nextMantra = () => setMantraIdx(i => (i + 1) % ALL_QUOTES.length);
  const [monthIdx, setMonthIdx] = useState(0);
  const [weekIdx, setWeekIdx] = useState(() => {
    const i = Q2_WEEKS.findIndex(w => TODAY_M * 100 + TODAY_D >= w.start[0] * 100 + w.start[1] && TODAY_M * 100 + TODAY_D <= w.end[0] * 100 + w.end[1]);
    return i >= 0 ? i : 0;
  });
  const [viewDay, setViewDay] = useState(TODAY_D);
  const [viewM, setViewM] = useState(TODAY_M);

  // localStorage helpers
  const LS_VERSION = "lifeos_v8";
  function lsGet(key, fallback) {
    try {
      const v = localStorage.getItem(LS_VERSION + "_" + key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function lsSet(key, val) {
    try {
      localStorage.setItem(LS_VERSION + "_" + key, JSON.stringify(val));
    } catch (e) {}
  }

  // Persisted state: allData, hatCounts, weekAssess
  const [allData, setAllData] = useState(() => lsGet("allData", MONTHS_ARR.map(m => initMonth(m.days))));
  const [hatCounts, setHatCounts] = useState(() => lsGet("hatCounts", (() => {
    const o = {};
    ALL_HATS.forEach(h => {
      o[h.code] = 0;
    });
    return o;
  })()));
  const [weekAssess, setWeekAssess] = useState(() => lsGet("weekAssess", {
    priorities: ["", "", "", "", ""]
  }));
  const [timers, setTimers] = useState(() => TIMER_CONFIGS.map(c => ({
    timeLeft: c.min * 60,
    running: false,
    sessions: 0
  })));
  const ivsRef = useRef([null, null, null, null]);

  // Auto-save to localStorage whenever data changes
  useEffect(() => lsSet("allData", allData), [allData]);
  useEffect(() => lsSet("hatCounts", hatCounts), [hatCounts]);
  useEffect(() => lsSet("weekAssess", weekAssess), [weekAssess]);
  const setAssess = (field, val) => setWeekAssess(p => ({
    ...p,
    [field]: val
  }));
  const setPriority = (i, val) => setWeekAssess(p => ({
    ...p,
    priorities: p.priorities.map((x, j) => j === i ? val : x)
  }));
  const beep = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [[880, 0], [1100, .22], [1320, .44]].forEach(([f, t]) => {
        const o = ctx.createOscillator(),
          g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.frequency.value = f;
        o.type = "sine";
        g.gain.setValueAtTime(.5, ctx.currentTime + t);
        g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + t + .3);
        o.start(ctx.currentTime + t);
        o.stop(ctx.currentTime + t + .35);
      });
    } catch (e) {}
  }, []);
  const runKey = timers.map(t => t.running ? "1" : "0").join("");
  useEffect(() => {
    timers.forEach((t, i) => {
      clearInterval(ivsRef.current[i]);
      if (t.running && t.timeLeft > 0) {
        ivsRef.current[i] = setInterval(() => {
          setTimers(prev => {
            const nx = [...prev];
            if (nx[i].timeLeft <= 1) {
              clearInterval(ivsRef.current[i]);
              beep();
              nx[i] = {
                ...nx[i],
                timeLeft: 0,
                running: false,
                sessions: nx[i].sessions + 1
              };
            } else nx[i] = {
              ...nx[i],
              timeLeft: nx[i].timeLeft - 1
            };
            return nx;
          });
        }, 1000);
      }
    });
    return () => ivsRef.current.forEach(iv => clearInterval(iv));
  }, [runKey, beep]);
  const toggleTimer = i => setTimers(p => {
    const n = [...p];
    n[i] = {
      ...n[i],
      running: !n[i].running
    };
    return n;
  });
  const resetTimer = i => {
    clearInterval(ivsRef.current[i]);
    setTimers(p => {
      const n = [...p];
      n[i] = {
        timeLeft: TIMER_CONFIGS[i].min * 60,
        running: false,
        sessions: n[i].sessions
      };
      return n;
    });
  };
  const nextIv = i => {
    clearInterval(ivsRef.current[i]);
    beep();
    setTimers(p => {
      const n = [...p];
      n[i] = {
        timeLeft: TIMER_CONFIGS[i].min * 60,
        running: false,
        sessions: n[i].sessions + 1
      };
      return n;
    });
  };
  const prevIv = i => setTimers(p => {
    const n = [...p];
    n[i] = {
      ...n[i],
      sessions: Math.max(0, n[i].sessions - 1)
    };
    return n;
  });
  const adjustT = (i, ds) => setTimers(p => {
    const n = [...p];
    n[i] = {
      ...n[i],
      timeLeft: Math.max(0, n[i].timeLeft + ds)
    };
    return n;
  });
  const onTS = e => {
    tsX.current = e.touches[0].clientX;
    tsY.current = e.touches[0].clientY;
    wRef.current = e.currentTarget.offsetWidth || 390;
  };
  const onTM = e => {
    if (tsX.current === null) return;
    const dx = e.touches[0].clientX - tsX.current,
      dy = e.touches[0].clientY - tsY.current;
    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
      setIsDrag(true);
      setDragX(dx);
    }
  };
  const onTE = e => {
    if (!isDrag) {
      tsX.current = null;
      return;
    }
    const dx = e.changedTouches[0].clientX - tsX.current;
    if (Math.abs(dx) > 55) {
      if (dx < 0 && tabIdx < 2) setTabIdx(x => x + 1);
      if (dx > 0 && tabIdx > 0) setTabIdx(x => x - 1);
    }
    setIsDrag(false);
    setDragX(0);
    tsX.current = null;
  };
  const slideX = i => (i - tabIdx) * 100 + (isDrag ? dragX / wRef.current * 100 : 0);
  const getMI = m => MONTHS_ARR.findIndex(x => x.m === m);
  const mutData = (m, fn) => setAllData(p => {
    const c = [...p];
    c[getMI(m)] = fn(p[getMI(m)]);
    return c;
  });
  const cycleCell = (code, m, day) => mutData(m, d => ({
    ...d,
    grid: {
      ...d.grid,
      [code]: {
        ...d.grid[code],
        [day]: nextSt(d.grid[code][day])
      }
    }
  }));
  const cycleEnergy = (m, day, directVal) => {
    if (directVal !== undefined) {
      mutData(m, d => ({
        ...d,
        energy: {
          ...d.energy,
          [day]: directVal
        }
      }));
    } else {
      const cur = allData[getMI(m)]?.energy?.[day];
      const idx = cur ? ENERGY.findIndex(e => e.sym === cur) : -1;
      mutData(m, d => ({
        ...d,
        energy: {
          ...d.energy,
          [day]: idx >= ENERGY.length - 1 ? null : ENERGY[idx + 1].sym
        }
      }));
    }
  };
  const cycleMood = (m, day) => {
    const cur = allData[getMI(m)]?.mood?.[day];
    const next = cur === null || cur === undefined ? 1 : cur >= 10 ? null : cur + 1;
    mutData(m, d => ({
      ...d,
      mood: {
        ...(d.mood || {}),
        [day]: next
      }
    }));
  };
  const setTask = (m, day, f, v) => mutData(m, d => ({
    ...d,
    tasks: {
      ...d.tasks,
      [day]: {
        ...d.tasks[day],
        [f]: v
      }
    }
  }));
  const hatPlus = code => {
    const nc = (hatCounts[code] || 0) + 1;
    setHatCounts(p => ({
      ...p,
      [code]: nc
    }));
    const mi = getMI(TODAY_M);
    setAllData(prev => {
      const c = [...prev];
      const ns = nc === 1 ? "x" : "box";
      c[mi] = {
        ...c[mi],
        grid: {
          ...c[mi].grid,
          [code]: {
            ...c[mi].grid[code],
            [TODAY_D]: ns
          }
        }
      };
      return c;
    });
  };
  const hatMinus = code => {
    const nc = Math.max(0, (hatCounts[code] || 0) - 1);
    setHatCounts(p => ({
      ...p,
      [code]: nc
    }));
    const mi = getMI(TODAY_M);
    setAllData(prev => {
      const c = [...prev];
      const ns = nc === 0 ? null : nc === 1 ? "x" : "box";
      c[mi] = {
        ...c[mi],
        grid: {
          ...c[mi].grid,
          [code]: {
            ...c[mi].grid[code],
            [TODAY_D]: ns
          }
        }
      };
      return c;
    });
  };
  const weekDays = () => {
    const w = Q2_WEEKS[weekIdx];
    const days = [];
    let [cm, cd] = [...w.start];
    const [em, ed] = w.end;
    for (let i = 0; i < 7; i++) {
      days.push({
        m: cm,
        d: cd
      });
      if (cm === em && cd === ed) break;
      const mI = MONTHS_ARR.find(x => x.m === cm);
      if (mI && cd >= mI.days) {
        cm++;
        cd = 1;
      } else cd++;
    }
    return days;
  };

  // Export week data for Claude
  const [showExport, setShowExport] = useState(false);
  const buildExport = () => {
    const wk = Q2_WEEKS[weekIdx];
    const wdays = weekDays();
    const M_NAME = {
      4: "APR",
      5: "MAY",
      6: "JUN"
    };
    let out = `LIFE OS — WEEK ${wk.n} EXPORT (${wk.sm} ${wk.start[1]}–${wk.em} ${wk.end[1]})\n`;
    out += `Generated: ${M_NAME[TODAY_M] || TODAY_M} ${TODAY_D}\n\n`;

    // TOP 3 per day
    out += `TOP 3 (PW·PB·PA) — DAILY:\n`;
    wdays.forEach(({
      m,
      d
    }) => {
      const mi = getMI(m);
      const data = allData[mi];
      if (!data) return;
      const pct = top3pct(data, d);
      const en = data.energy?.[d] || "·";
      const mood = data.mood?.[d] || "·";
      const marks = TOP3.map(h => data.grid[h.code]?.[d] ? "✓" : "✗").join(" ");
      out += `  ${M_NAME[m] || m} ${d}: ${marks} [${pct}%] energy:${en} mood:${mood}\n`;
    });

    // HAT grid summary per week
    out += `\nHAT WEEK SUMMARY:\n`;
    ALL_HATS.forEach(h => {
      const filled = wdays.filter(({
        m,
        d
      }) => {
        const mi = getMI(m);
        return allData[mi]?.grid?.[h.code]?.[d];
      }).length;
      if (filled > 0) out += `  ${h.code}: ${filled}/${wdays.length} days\n`;
    });

    // Week priorities
    const pris = (weekAssess?.priorities || []).filter(p => p.trim());
    if (pris.length) {
      out += `\nWEEK PRIORITIES:\n`;
      pris.forEach((p, i) => {
        out += `  ${i + 1}. ${p}\n`;
      });
    }
    out += `\n— end of Week ${wk.n} export —`;
    return out;
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "#f4f4f2",
      fontFamily: "'SF Mono','Courier New',monospace",
      maxWidth: 430,
      margin: "0 auto",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderBottom: "2px solid #111",
      padding: "12px 16px 0",
      position: "sticky",
      top: 0,
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 900,
      color: "#111",
      letterSpacing: -1
    }
  }, "26Q2 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: "#aaa",
      fontWeight: 400,
      letterSpacing: 3
    }
  }, "LIFE OS")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#777",
      fontWeight: 700
    }
  }, ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][TODAY_M - 1], " ", TODAY_D, " \xB7 W", Q2_WEEKS.find(w => TODAY_M * 100 + TODAY_D >= w.start[0] * 100 + w.start[1] && TODAY_M * 100 + TODAY_D <= w.end[0] * 100 + w.end[1])?.n || "?")), /*#__PURE__*/React.createElement("div", {
    onClick: nextMantra,
    style: {
      margin: "7px 0 0",
      padding: "5px 8px",
      background: "#f8f8f8",
      borderRadius: 6,
      cursor: "pointer",
      borderLeft: "2px solid #111",
      display: "flex",
      alignItems: "flex-start",
      gap: 6
    }
  }, ALL_QUOTES[mantraIdx]?.hat && (() => {
    const cat = ALL_QUOTES[mantraIdx].hat[0]; // P, M, R, D, S, L, C
    const tagColors = {
      P: {
        bg: "#ede7f6",
        color: "#5e1b8b"
      },
      M: {
        bg: "#e3f2fd",
        color: "#1565c0"
      },
      R: {
        bg: "#fff3e0",
        color: "#bf5000"
      },
      D: {
        bg: "#efebe9",
        color: "#4e342e"
      },
      S: {
        bg: "#fffde7",
        color: "#f57f17"
      },
      L: {
        bg: "#f5f5f5",
        color: "#546e7a"
      },
      C: {
        bg: "#e8f5e9",
        color: "#2e7d32"
      }
    };
    const tc = tagColors[cat] || {
      bg: "#f0f0f0",
      color: "#555"
    };
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 7,
        fontWeight: 900,
        color: tc.color,
        background: tc.bg,
        borderRadius: 3,
        padding: "1px 5px",
        flexShrink: 0,
        marginTop: 2,
        fontFamily: "'SF Mono','Courier New',monospace"
      }
    }, ALL_QUOTES[mantraIdx].hat);
  })(), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8.5,
      color: "#444",
      fontStyle: "italic",
      fontWeight: 500,
      lineHeight: 1.4,
      fontFamily: "Georgia,serif",
      flex: 1
    }
  }, "\"", ALL_QUOTES[mantraIdx]?.text, "\""), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 6,
      color: "#ccc",
      flexShrink: 0,
      marginTop: 2
    }
  }, "tap\u203A")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      marginTop: 8
    }
  }, TABS.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTabIdx(i),
    style: {
      flex: 1,
      background: "none",
      border: "none",
      borderBottom: tabIdx === i ? "3px solid #111" : "3px solid transparent",
      color: tabIdx === i ? "#111" : "#aaa",
      fontSize: 10,
      letterSpacing: 1.5,
      padding: "7px 0 9px",
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: tabIdx === i ? 800 : 400,
      textTransform: "uppercase"
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden"
    },
    onTouchStart: onTS,
    onTouchMove: onTM,
    onTouchEnd: onTE
  }, TABS.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      position: i === tabIdx ? "relative" : "absolute",
      top: 0,
      left: 0,
      width: "100%",
      transform: `translateX(${slideX(i)}%)`,
      transition: isDrag ? "none" : "transform .28s cubic-bezier(.4,0,.2,1)",
      willChange: "transform",
      padding: "14px 12px 40px",
      boxSizing: "border-box",
      minHeight: "80vh"
    }
  }, t === "today" && /*#__PURE__*/React.createElement(TodayPanel, {
    allData: allData,
    getMI: getMI,
    viewDay: viewDay,
    viewM: viewM,
    setViewDay: setViewDay,
    setViewM: setViewM,
    weekIdx: weekIdx,
    setWeekIdx: setWeekIdx,
    weekDays: weekDays,
    cycleCell: cycleCell,
    cycleEnergy: cycleEnergy,
    setTask: setTask,
    weekAssess: weekAssess,
    setAssess: setAssess,
    setPriority: setPriority
  }), t === "month" && /*#__PURE__*/React.createElement(MonthPanel, {
    monthIdx: monthIdx,
    setMonthIdx: setMonthIdx,
    allData: allData,
    cycleCell: cycleCell,
    cycleEnergy: cycleEnergy,
    cycleMood: cycleMood
  }), t === "timer" && /*#__PURE__*/React.createElement(TimerPanel, {
    timers: timers,
    toggleTimer: toggleTimer,
    resetTimer: resetTimer,
    nextIv: nextIv,
    prevIv: prevIv,
    adjustT: adjustT,
    hatCounts: hatCounts,
    hatPlus: hatPlus,
    hatMinus: hatMinus
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "8px 16px 16px",
      display: "flex",
      gap: 8,
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowExport(x => !x),
    style: {
      background: "#111",
      color: "#fff",
      border: "none",
      borderRadius: 20,
      padding: "8px 20px",
      fontSize: 9,
      letterSpacing: 2,
      cursor: "pointer",
      fontFamily: "'SF Mono','Courier New',monospace",
      fontWeight: 700
    }
  }, "\u2197 EXPORT W", Q2_WEEKS[weekIdx]?.n)), showExport && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.6)",
      zIndex: 100,
      display: "flex",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      background: "#fff",
      borderRadius: "16px 16px 0 0",
      padding: "16px",
      maxHeight: "70vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 900,
      letterSpacing: 2
    }
  }, "EXPORT \u2014 PASTE INTO CLAUDE"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowExport(false),
    style: {
      background: "none",
      border: "none",
      fontSize: 18,
      cursor: "pointer",
      color: "#999"
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("textarea", {
    readOnly: true,
    value: buildExport(),
    style: {
      flex: 1,
      border: "1px solid #e0e0e0",
      borderRadius: 8,
      padding: "10px",
      fontSize: 9,
      fontFamily: "'SF Mono','Courier New',monospace",
      color: "#333",
      resize: "none",
      lineHeight: 1.6,
      background: "#fafafa"
    },
    onFocus: e => e.target.select()
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const txt = buildExport();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(txt);
      } else {
        const t = document.createElement("textarea");
        t.value = txt;
        document.body.appendChild(t);
        t.select();
        document.execCommand("copy");
        document.body.removeChild(t);
      }
      setShowExport(false);
    },
    style: {
      marginTop: 10,
      background: "#111",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "12px",
      fontSize: 10,
      letterSpacing: 2,
      cursor: "pointer",
      fontWeight: 700,
      fontFamily: "'SF Mono','Courier New',monospace"
    }
  }, "COPY TO CLIPBOARD"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "0 0 16px",
      fontSize: 8,
      color: "#ccc",
      letterSpacing: 3
    }
  }, "BE KONSTANTIN \xB7 ONE MOVE = FULL PRESENCE"));
}

// Auto-mount when DOM is ready
(function mount() {
  const el = document.getElementById("root");
  if (!el) {
    setTimeout(mount, 100);
    return;
  }
  try {
    ReactDOM.createRoot(el).render(React.createElement(App));
  } catch (e) {
    el.innerHTML = "<div style=\"padding:20px;color:red;font-family:monospace\">Error: " + e.message + "</div>";
  }
})();
