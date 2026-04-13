# Figma Design Guide — Satellite Reliability-Aware Monitoring Dashboard
**Version 1.0 | Dark Mode First | Web App**

---

## 1. Project Overview

### Product
A reliability-aware decision support dashboard for satellite operators. The system monitors hundreds of satellite subsystems in real time, evaluates AI-generated fault alerts for trustworthiness, and helps operators make faster, more confident decisions — while keeping a human in the loop at every stage.

### Primary User
Satellite operations engineers / ground control operators. Expert users working in high-stakes, time-sensitive environments. The UI must reduce cognitive load, not add to it.

### Core Design Principle
**Clarity under pressure.** Every screen must answer "what do I need to act on, and can I trust it?" within 3 seconds of looking at it.

---

## 2. Design System

### 2.1 Color Palette

All colors are defined as CSS variables. Dark mode is the primary theme. Light mode support is optional for v1.

| Token | Hex (Dark) | Usage |
|---|---|---|
| `--bg-base` | `#0A0C10` | Page background |
| `--bg-surface` | `#111318` | Card / panel backgrounds |
| `--bg-elevated` | `#1A1D25` | Raised surfaces, dropdowns, modals |
| `--bg-overlay` | `#222634` | Hover states, selected rows |
| `--border-subtle` | `#2A2E3D` | Default borders, dividers |
| `--border-strong` | `#3D4258` | Active borders, focused elements |
| `--text-primary` | `#E8EAF0` | Headings, primary labels |
| `--text-secondary` | `#8B90A4` | Sub-labels, metadata, timestamps |
| `--text-muted` | `#555A70` | Disabled states, placeholder text |
| `--accent-primary` | `#4F8EF7` | Primary actions, links, highlights |
| `--accent-primary-muted` | `#1A2D52` | Accent backgrounds, subtle highlights |

#### Semantic / Status Colors

| Token | Hex | Usage |
|---|---|---|
| `--status-critical` | `#E84040` | High-confidence real fault. Requires immediate attention. |
| `--status-critical-bg` | `#2A1010` | Background behind critical badges |
| `--status-warning` | `#F5A623` | Medium reliability alert. Investigate. |
| `--status-warning-bg` | `#2A1E08` | Background behind warning badges |
| `--status-nominal` | `#3DD68C` | Nominal / healthy state |
| `--status-nominal-bg` | `#0C2A1A` | Background behind nominal badges |
| `--status-unknown` | `#8B90A4` | Stale data, unconfirmed, pending |
| `--status-unknown-bg` | `#1A1D25` | Background behind unknown badges |
| `--reliability-high` | `#3DD68C` | Reliability score ≥ 80% |
| `--reliability-medium` | `#F5A623` | Reliability score 50–79% |
| `--reliability-low` | `#E84040` | Reliability score < 50% |

#### Reliability Score Color Gradient (continuous)
Used on score rings, progress bars, and sparklines.
- 0–49%: `#E84040`
- 50–69%: `#F5A623`
- 70–84%: `#EDD35A`
- 85–100%: `#3DD68C`
Interpolate between these stops using CSS or JS for smooth transitions.

---

### 2.2 Typography

| Role | Font | Weight | Size | Line Height |
|---|---|---|---|---|
| Display / page title | `Space Grotesk` | 600 | 24px | 1.3 |
| Section heading | `Space Grotesk` | 500 | 16px | 1.4 |
| Card title | `Space Grotesk` | 500 | 14px | 1.4 |
| Body / descriptions | `Inter` | 400 | 13px | 1.6 |
| Monospace data (timestamps, IDs, scores) | `JetBrains Mono` | 400 | 12px | 1.5 |
| Badge / label | `Inter` | 600 | 11px | 1 |
| Micro label | `Inter` | 400 | 11px | 1.4 |

> **Import from Google Fonts:** Space Grotesk (400, 500, 600), Inter (400, 500, 600), JetBrains Mono (400)

All text is sentence case. No ALL CAPS except badge labels which may use uppercase for STATUS LABELS only (e.g. "CRITICAL", "NOMINAL").

---

### 2.3 Spacing Scale

Use an 8px base unit throughout.

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | 4px | Icon gaps, tight padding |
| `--space-sm` | 8px | Internal component padding |
| `--space-md` | 16px | Card padding, section gaps |
| `--space-lg` | 24px | Between cards |
| `--space-xl` | 32px | Between major sections |
| `--space-2xl` | 48px | Page margins |

---

### 2.4 Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Badges, tags, small pills |
| `--radius-md` | 8px | Buttons, inputs, small cards |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-xl` | 16px | Modals, large surfaces |

---

### 2.5 Iconography

Use **Lucide Icons** throughout (MIT licensed, consistent stroke weight).
- Default stroke: 1.5px
- Size: 16px inline, 20px in nav/sidebar, 24px for empty states
- Color: inherit from parent text color
- Never fill icons — outline only

Key icons needed:
- `satellite` — subsystem type indicator
- `alert-triangle` — warnings
- `alert-circle` — critical alerts
- `check-circle` — nominal / resolved
- `activity` — real-time feeds, telemetry
- `clock` — temporal consistency
- `link-2` — cross-signal correlation
- `brain` — AI / reliability scoring
- `thumbs-up`, `thumbs-down` — operator feedback
- `file-text` — report / audit log
- `search` — filter / search
- `chevron-right` — navigation, drill-down
- `x` — dismiss, close
- `history` — past incidents
- `zap` — voltage / power subsystems
- `thermometer` — thermal subsystems
- `radio` — comms subsystems
- `cpu` — onboard computing

---

### 2.6 Elevation / Shadow

No decorative shadows. Elevation is expressed through background color alone:
- Level 0: `--bg-base` (page)
- Level 1: `--bg-surface` (cards)
- Level 2: `--bg-elevated` (dropdowns, tooltips, modals)
- Level 3: `--bg-overlay` (hover / selected states)

For modals only: `1px solid --border-strong` acts as the modal edge.

---

### 2.7 Motion

All animations must be subtle and purposeful. No decorative animations.

| Transition | Duration | Easing | Usage |
|---|---|---|---|
| Micro | 100ms | ease-out | Hover states, badge swap |
| Standard | 200ms | ease-in-out | Panel open/close, tab switch |
| Reveal | 300ms | ease-out | Modal enter, drawer slide |
| Alert pulse | 2000ms | ease-in-out, loop | Pulsing dot on active critical alert |

The pulsing dot: a 8px circle in `--status-critical` with a CSS `box-shadow` pulse animation used only on active unacknowledged critical alerts.

---

## 3. Layout & Navigation

### 3.1 Global Layout

The app uses a **fixed sidebar + fixed topbar + scrollable main content** layout.

```
┌──────────────────────────────────────────────────────────┐
│  Topbar (56px height, fixed)                             │
├────────────┬─────────────────────────────────────────────┤
│            │                                             │
│  Sidebar   │  Main content area                          │
│  (240px,   │  (fluid, scrollable)                        │
│   fixed)   │                                             │
│            │                                             │
└────────────┴─────────────────────────────────────────────┘
```

- Page background: `--bg-base`
- Sidebar background: `--bg-surface`
- Sidebar border-right: `1px solid --border-subtle`
- Topbar background: `--bg-surface`
- Topbar border-bottom: `1px solid --border-subtle`
- Main content padding: `24px`
- Max content width: `1440px`, centered

---

### 3.2 Topbar (56px)

Left-to-right contents:
1. **Logo / product name** — "ORBITWATCH" or placeholder. Space Grotesk 600, 15px. Accent color `--accent-primary`. Left padding 24px.
2. **Satellite selector dropdown** — shows currently monitored satellite. E.g. "SAT-7 — Sentinel-Alpha". Monospace font. Clicking opens a dropdown to switch satellite context.
3. **Live indicator** — a pulsing green dot + "LIVE" label in `--status-nominal`. JetBrains Mono, 11px uppercase. Only shown when telemetry stream is active.
4. **Right side**: notification bell (badge count if unread), operator avatar/initials circle, optional settings gear.

---

### 3.3 Sidebar (240px)

Sections from top to bottom:

**Navigation links** (icon + label):
- Overview (dashboard home)
- Active Alerts
- Subsystem Map
- Incident Log
- Operator Feedback
- Settings

Active state: `--bg-overlay` background, `--accent-primary` left border (3px), text in `--text-primary`.
Inactive state: text in `--text-secondary`, no background.
Hover: `--bg-overlay` background.

**Bottom of sidebar:**
- Satellite health summary pill (e.g., "12 active alerts" with `--status-warning` color)
- Operator name + role (small, muted)

---

## 4. Screen-by-Screen Specifications

---

### Screen 1: Onboarding — Welcome / Login

**Purpose:** First-time entry. Minimal, high-trust aesthetic.

**Layout:** Full-screen centered, single column, max-width 400px card.

**Contents:**
1. Logo mark (top, centered) — satellite icon in `--accent-primary`
2. Product name "ORBITWATCH" — Space Grotesk 600, 24px
3. Tagline — "Reliability-aware fault monitoring for satellite operations" — Inter 400, 13px, `--text-secondary`
4. Email input field
5. Password input field
6. "Sign in" button — full width, `--accent-primary` background, white text
7. "Forgot password" link — small, muted
8. Footer: "Secure access. All sessions are logged." — 11px, `--text-muted`

**Card styling:** `--bg-surface` background, `--border-subtle` border, `--radius-xl` corners, 40px padding.

Page background: `--bg-base` with a very subtle grid pattern overlay (1px dots, 24px spacing, 5% opacity in `--border-subtle`).

---

### Screen 2: Onboarding — Satellite Configuration

**Purpose:** First-time operator setup. Select which satellite and subsystem groups to monitor.

**Layout:** Full-screen, two-column (sidebar left: steps; right: form).

**Left sidebar (200px):**
Step tracker, vertical. Steps: 1. Select satellite, 2. Configure subsystem groups, 3. Set alert thresholds, 4. Review & launch.
Active step: white text + accent left dot. Completed steps: checkmark icon + muted text.

**Right content (fluid):**

Step 1 — "Select your satellite":
- Search input at top
- Grid of satellite cards (3 columns). Each card: satellite name (bold), mission type (muted), launch date (monospace). Selected state: `--accent-primary` border + `--accent-primary-muted` background.

Step 2 — "Configure subsystem groups":
- List of subsystem categories: Power, Thermal, Attitude Control, Communications, Onboard Computer, Payload, Propulsion.
- Each row: toggle (on/off) + subsystem name + count of sub-components. Enabled subsystems show in full opacity; disabled in muted.

Step 3 — "Set alert thresholds":
- Two sliders per subsystem group: "Fault confidence threshold" (0–100%) and "Reliability minimum" (0–100%).
- Numerical input alongside each slider.
- Default values pre-filled: confidence 70%, reliability 60%.

Step 4 — Review & launch:
- Summary of configuration as read-only key-value list.
- "Launch dashboard" primary button.

Navigation: "Back" / "Continue" buttons at bottom right of content area.

---

### Screen 3: Main Dashboard — Overview

**Purpose:** The operator's home screen. At-a-glance satellite health, alert triage queue, reliability scoring.

**Layout:** 3-zone layout.

```
┌─────────────────────────────────────────────────────────────┐
│  Top row: Status bar + 4 summary metric cards               │
├──────────────────────────┬──────────────────────────────────┤
│  Alert triage panel      │  Subsystem health map            │
│  (left, ~55% width)      │  (right, ~45% width)             │
│                          │                                  │
│                          │                                  │
├──────────────────────────┴──────────────────────────────────┤
│  Recent activity feed (full width, collapsed by default)    │
└─────────────────────────────────────────────────────────────┘
```

#### Top Row — Summary Metric Cards (4 cards, equal width)

Card 1: **Active alerts**
- Large number (e.g. "12") in `--status-warning` if >0, `--text-primary` if 0.
- Sub-label: "3 critical · 9 warning" in `--text-secondary`

Card 2: **Avg. reliability score**
- Large number (e.g. "74%") with colour from reliability gradient.
- Sub-label: "Across all active alerts"

Card 3: **False alarm rate (30d)**
- Large number (e.g. "18%")
- Sub-label: "↓ 4% vs last 30d" in `--status-nominal` for improvement

Card 4: **Pending operator decisions**
- Large number (e.g. "5")
- Sub-label: "Awaiting review"

Card styling: `--bg-surface` background, `--border-subtle` border, `--radius-lg`, 20px padding. Label: Inter 400 11px `--text-secondary`. Number: Space Grotesk 600 28px.

---

#### Alert Triage Panel (left column)

Header: "Active alerts" + sort/filter controls (dropdown: sort by reliability, severity, time).

Each alert is a card row. From left to right:

1. **Severity indicator** — vertical 3px left border. Red = critical, amber = warning.
2. **Reliability badge** — pill showing score e.g. "68%" with background colour from reliability gradient. Font: JetBrains Mono 11px.
3. **Alert title** — e.g. "Power bus undervoltage — Subsystem group: EPS". Space Grotesk 500 13px.
4. **Temporal consistency icon** — clock icon with a small label. "Persistent 14m" in amber if intermittent, green if stable.
5. **Cross-signal consistency icon** — link icon. "4/4 correlated" in green if all expected signals agree, "2/4" in amber if partial.
6. **Timestamp** — JetBrains Mono 11px `--text-secondary`
7. **"Review" button** — small, right-aligned. Clicking navigates to the Alert Detail screen.

Unacknowledged critical alerts: show pulsing dot (8px, `--status-critical`) to the left of the severity border.

Alert row hover: `--bg-overlay` background. Selected/active: `--border-strong` border all-around.

Below the list: "Load more" link if >10 alerts.

---

#### Subsystem Health Map (right column)

A hierarchical tree / grouped grid showing all subsystem categories with health status.

Top level: subsystem groups (Power, Thermal, Attitude Control, etc.) — each shown as a labelled section header.

Each subsystem group contains individual component tiles (e.g. Battery Pack A, Battery Pack B, Solar Array 1…).

**Component tile (approx 80×56px each):**
- Background: `--status-critical-bg` / `--status-warning-bg` / `--status-nominal-bg` based on status.
- 1px border in matching status color.
- Component short name: Inter 600 10px.
- Status dot: 6px circle in status color.
- Optional: micro sparkline (last 5min telemetry).

Hovering a tile shows a tooltip: full name, current value, last updated timestamp.

Clicking a tile navigates to the relevant subsystem panel within Alert Detail.

---

#### Recent Activity Feed (bottom, collapsible)

A horizontal timeline / log strip showing the last 20 events.
Each entry: timestamp (monospace) + event type (badge) + brief description.

Event types: Alert raised · Alert resolved · Operator action logged · Feedback submitted · System learned.

Collapsed by default (shows 3 rows). "Show all" expands.

---

### Screen 4: Alert Detail View

**Purpose:** Operator drills into a specific alert. This is the most information-dense screen and the core decision-making interface.

**Navigation:** Full-page screen opened from triage panel. Has a back arrow to return.

**Layout:** Two-column. Left ~60%, right ~40%.

---

#### Left Column

**Alert header section:**
- Alert title (Space Grotesk 600, 18px)
- ID: monospace pill, e.g. `ALT-20240413-0047`
- Severity badge + Reliability score badge (large, prominent)
- Timestamps: "First detected: 14:32:07 UTC · Duration: 14m 22s"
- Status row: "Temporal consistency: Persistent" · "Cross-signal consistency: 4/4 correlated"

**AI Explanation Report (card):**

Section header: "Reliability assessment report" with `brain` icon.

Subsections within the card:

1. **Summary** — 2–3 sentence plain-language explanation. E.g.: "A sustained undervoltage condition has been detected on the main power bus. The alert has remained consistent over 14 minutes and is corroborated by 4 correlated voltage-dependent subsystems. Reliability score: 68% — treat as probable real fault."

2. **Temporal consistency** — mini timeline graphic. X-axis: last 30 minutes. Y-axis: alert active/inactive. Filled segments = alert firing. Shows whether signal is sustained, intermittent, or sporadic. Label: "Persistent — firing continuously for 14m 22s" in `--status-warning`.

3. **Cross-signal consistency** — horizontal list of related subsystem signals. Each row: signal name + status icon (green check or red X) + current reading. Shows which expected correlated signals are also firing. E.g.:
   - ✓ Battery Pack A — 24.1V (below threshold)
   - ✓ Battery Pack B — 23.8V (below threshold)
   - ✓ EPS Controller — fault flag raised
   - ✓ Solar Array Current — 0.0A (no input)

4. **Contributing features** — expandable section. Lists the telemetry features the AI model used to produce this alert, with relative importance bars (like a mini horizontal bar chart). Label axis: "Feature importance". Feature names in monospace. This is the explainability (XAI) section.

5. **Historical match** (only shown if system has seen similar events before) — visually distinct card within the card. Icon: `history`. Text: "Similar event on 2024-02-19: Power bus undervoltage lasting 31 minutes. Operator action taken: Manual switchover to backup power bus. Outcome: Resolved." Then a button: "Apply same response?" (primary button, small).

---

#### Right Column

**Affected subsystems panel:**

Header: "Affected subsystems (4)"

Filtered list — only the subsystems flagged as correlated with this alert. Each row:
- Subsystem name
- Current reading (monospace)
- Trend sparkline (last 5min)
- Status badge

A "View all subsystems" link at the bottom to expand to the full list (dimmed uncorrelated ones shown in muted state with a visual separator).

**Operator action panel (card):**

Header: "Log your decision"

1. **Free-text field** — "Describe the action taken" (placeholder). Min height 80px.
2. **Predefined quick-actions** — chip/tag row of common actions: "Investigated — no action", "Switched to backup", "Escalated to lead", "Scheduled maintenance", "Dismissed as false alarm". Clicking a chip pre-fills the text field.
3. **"Mark as resolved" toggle** — checkbox + label.
4. **"Submit action log"** button — primary, full width.

**Operator feedback panel (card, below action panel):**

Header: "Rate this alert's reliability"

Two large toggle buttons side by side:
- 👍 "Reliable alert" — `--status-nominal-bg` background when selected, `--status-nominal` border.
- 👎 "False alarm" — `--status-critical-bg` background when selected, `--status-critical` border.

Below: optional comment field "Add notes (optional)" — small, 1 line.

"Submit feedback" button — secondary style.

Small helper text: "Your feedback trains the system to improve future reliability scoring."

---

### Screen 5: Subsystem Map — Full View

**Purpose:** Bird's-eye view of all satellite subsystems and their health status. The operator can see the big picture.

**Layout:** Full-width, single column within main content area.

**Top controls row:**
- Filter by status: All · Critical · Warning · Nominal (tab-style toggle)
- Filter by subsystem group: dropdown
- Search by component name: text input

**Subsystem group sections:**
Each group (Power, Thermal, etc.) is its own card-section with:
- Group header: icon + group name + aggregate status badge ("2 faults" in amber)
- Grid of component tiles (same tile design as dashboard map, but larger here: ~120×80px)
- Component tile on this screen adds: current primary value + units (e.g. "23.9V"), last updated timestamp.

Clicking any component tile opens a side drawer (not a new page) with:
- Full component details
- Telemetry chart (last 1 hour)
- Alert history for this component
- Link to any active alert involving this component

---

### Screen 6: Incident Log

**Purpose:** Searchable, filterable historical record of all past alerts, operator actions, and feedback.

**Layout:** Full-width table view.

**Top controls:**
- Date range picker
- Filter by: severity, subsystem group, reliability score range, operator, outcome
- Search bar

**Table columns:**
| Alert ID | Timestamp | Subsystem | Severity | Reliability Score | Duration | Operator Decision | Outcome | Feedback |

- Alert ID: monospace, clickable link → opens Alert Detail in read-only mode
- Reliability score: coloured pill
- Outcome: badge — Resolved · Escalated · Dismissed · Pending
- Feedback: thumbs up / thumbs down icon (greyed if not yet rated)

Rows are alternating `--bg-surface` / `--bg-base`. Hover: `--bg-overlay`.

Pagination at bottom: 25 rows per page.

Export button (top right): "Export CSV".

---

### Screen 7: Operator Feedback & System Learning

**Purpose:** Review how operator feedback is shaping the system's reliability model over time.

**Layout:** Two-column.

Left column (60%):
- "Feedback submitted" table — list of alerts the operator has rated, with their rating and notes.
- Filter: All · Reliable · False alarms

Right column (40%):
- "Model improvement summary" card:
  - Total feedback submitted: N
  - False alarm rate trend chart (line chart, last 30d)
  - Reliability score accuracy chart
  - Last model update timestamp

- "Patterns learned" card:
  - List of identified fault patterns the system has associated with operator feedback.
  - Each pattern: subsystem group + description + "learned from N incidents"

---

### Screen 8: Settings

**Purpose:** Configuration for alert thresholds, notification preferences, operator profile.

**Layout:** Left nav tabs + right content area.

Tabs: Profile · Alert thresholds · Notification preferences · Satellite configuration · Audit log.

Each tab is a standard form layout with section headers, labelled inputs, and a "Save changes" button at the bottom.

Audit log tab: read-only table of all system events (session logins, threshold changes, model updates) with timestamp and operator.

---

## 5. Component Library Reference

### 5.1 Reliability Score Badge

A pill badge displaying the reliability percentage.
- Background: derived from reliability score (see gradient in Section 2.1)
- Text: JetBrains Mono 600 11px
- Padding: 4px 10px
- Border radius: `--radius-sm`
- No border

Sizes: small (for table rows), medium (for alert cards), large (for alert detail header — 24px font, 8px 16px padding, `--radius-md`).

---

### 5.2 Status Badge

| Label | Background | Text color |
|---|---|---|
| CRITICAL | `--status-critical-bg` | `--status-critical` |
| WARNING | `--status-warning-bg` | `--status-warning` |
| NOMINAL | `--status-nominal-bg` | `--status-nominal` |
| UNKNOWN | `--status-unknown-bg` | `--status-unknown` |

Font: Inter 600 11px uppercase. Padding: 3px 8px. Border radius: `--radius-sm`.

---

### 5.3 Temporal Consistency Indicator

A small inline component showing whether an alert is persistent or intermittent.

States:
- Persistent: `clock` icon in `--status-nominal` + "Persistent Xm" label
- Intermittent: `clock` icon in `--status-warning` + "Intermittent" label
- Sporadic: `clock` icon in `--status-critical` + "Sporadic" label

Used inline in alert rows and in the alert detail header.

---

### 5.4 Mini Sparkline

A 60×20px inline SVG line chart showing a telemetry signal over the last 5 minutes.

Baseline colour: `--text-muted`. If signal is in fault state, line colour: `--status-critical`. If recovered: `--status-nominal`.

No axes, no labels — purely visual trend indicator. Used in component tiles and subsystem rows.

---

### 5.5 Primary Button

- Background: `--accent-primary`
- Text: white, Inter 600 13px
- Height: 36px
- Padding: 0 16px
- Border radius: `--radius-md`
- Hover: 10% darker background (filter: brightness(0.9))
- Disabled: 30% opacity

### 5.6 Secondary Button

- Background: transparent
- Border: `1px solid --border-strong`
- Text: `--text-primary`, Inter 500 13px
- Height: 36px
- Padding: 0 16px
- Border radius: `--radius-md`
- Hover: `--bg-elevated` background

### 5.7 Text Input / Select

- Background: `--bg-elevated`
- Border: `1px solid --border-subtle`
- Text: `--text-primary`, Inter 400 13px
- Placeholder: `--text-muted`
- Height: 36px
- Padding: 0 12px
- Border radius: `--radius-md`
- Focus border: `1px solid --accent-primary`

### 5.8 Card

Default card:
- Background: `--bg-surface`
- Border: `1px solid --border-subtle`
- Border radius: `--radius-lg`
- Padding: 20px

Elevated card (modal, dropdown):
- Background: `--bg-elevated`
- Border: `1px solid --border-strong`
- Border radius: `--radius-xl`
- Box shadow: `0 8px 32px rgba(0, 0, 0, 0.4)`

---

## 6. Interaction States

| State | Treatment |
|---|---|
| Default | As specified above |
| Hover | `--bg-overlay` background on interactive rows/cards |
| Active / Selected | `--accent-primary` left border (3px) + `--accent-primary-muted` background |
| Focus (keyboard) | `0 0 0 2px --accent-primary` outline on focusable elements |
| Disabled | 30% opacity. No hover effects. `cursor: not-allowed` |
| Loading | Skeleton screen — `--bg-elevated` rectangle with a left-to-right shimmer animation |
| Empty state | Centered icon (40px, `--text-muted`) + heading + body text + optional CTA button |
| Error state | `--status-critical` border + error message below input in `--status-critical` color, 12px |

---

## 7. Data Visualisation Patterns

### 7.1 Temporal consistency timeline
Type: Horizontal filled bar chart. Thin (8px height). Time on X axis. Filled segments = alert active. Background = `--bg-elevated`. Segment fill = `--status-critical` or `--status-warning`. Used in Alert Detail.

### 7.2 Feature importance chart
Type: Horizontal bar chart. Each bar = one feature. Bar fill = `--accent-primary`. Background track = `--bg-elevated`. Max bar width = 100% of container. Label left of bar, value (e.g. "0.82") right of bar. Font: JetBrains Mono 11px.

### 7.3 False alarm rate trend
Type: Line chart. X axis = dates (last 30d). Y axis = false alarm %. Line colour: gradient from `--status-critical` (high rate) to `--status-nominal` (low rate) based on value. Grid lines: `--border-subtle`, 0.5px. No background fill under line. Dot on last data point.

### 7.4 Telemetry sparkline (full)
Type: Line chart with threshold line. Shown in component side drawer. X axis = time (last 1hr). Y axis = measurement value. Line: `--accent-primary`. Threshold line: dashed `--status-warning`. Fault region shaded with `--status-critical-bg`.

---

## 8. Responsive Behaviour

The primary design target is a 1440px wide desktop browser.

At 1280px: sidebar collapses to icon-only (48px wide). Labels hidden.
At <1024px: sidebar becomes a hamburger-triggered drawer overlay. Not the primary target — design for desktop first.

---

## 9. Figma File Structure (Recommended)

```
Pages:
├── 🎨 Design System
│    ├── Colors
│    ├── Typography
│    ├── Spacing & Grid
│    ├── Icons
│    └── Components (all components from Section 5)
│
├── 🔐 Onboarding
│    ├── Screen 1 — Login
│    └── Screen 2 — Satellite configuration (4 steps)
│
├── 🏠 Core App
│    ├── Screen 3 — Main dashboard
│    ├── Screen 4 — Alert detail
│    ├── Screen 5 — Subsystem map
│    ├── Screen 6 — Incident log
│    ├── Screen 7 — Feedback & learning
│    └── Screen 8 — Settings
│
└── 📐 Prototype flows
     ├── Flow 1: Login → Dashboard
     ├── Flow 2: Alert triage → Alert detail → Action log
     └── Flow 3: Subsystem drill-down
```

---

## 10. Prototype Interactions (Figma Prototype Tab)

| Trigger | From | To | Animation |
|---|---|---|---|
| Click "Sign in" | Login screen | Satellite config step 1 | Dissolve, 200ms |
| Click "Continue" | Config step N | Config step N+1 | Slide left, 200ms |
| Click "Launch dashboard" | Config step 4 | Main dashboard | Dissolve, 300ms |
| Click "Review" on alert row | Dashboard | Alert detail | Slide left, 200ms |
| Click "← Back" | Alert detail | Dashboard | Slide right, 200ms |
| Click component tile | Subsystem map | Side drawer (overlay) | Slide in from right, 200ms |
| Click "Submit feedback" | Alert detail | Confirmation toast | Instant |
| Hover alert row | Dashboard | Alert row hover state | 100ms |
| Click sidebar nav item | Any | Target screen | Dissolve, 150ms |

---

## 11. Key Figma Notes for the Designer

1. Use **auto-layout everywhere**. Every card, row, and badge should be auto-layout so the prototype scales cleanly.
2. Create **components with variants** for: StatusBadge (4 variants), ReliabilityBadge (continuous colour, parameterised), AlertRow (default/hover/selected), Button (primary/secondary/disabled), Input (default/focus/error).
3. The reliability score badge colour should be handled as a **component property** (score: 0–100) with conditional fills.
4. Use **Figma variables** to store all the colour tokens from Section 2.1. Map them to a dark mode variable collection. This makes it easy to demo dark/light if needed later.
5. The sidebar active state uses a **left border + background** — implement this as a separate variant, not a manually drawn border.
6. Telemetry sparklines in tiles can be **static placeholder graphics** for the prototype — they do not need to be functional charts.
7. All alert ID values, timestamps, and telemetry readings should use **JetBrains Mono** so they visually read as data, not labels.
8. The "Historical match" card in Alert Detail is a **conditional component** — show it only when the prototype flow demonstrates a repeat incident scenario.
