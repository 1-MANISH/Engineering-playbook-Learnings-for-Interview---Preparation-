import { useState } from "react";
import "./index.css";
import "./dashboard.css";

import { DashboardOnlyUseState } from "./DashboardOnlyUseState";
import { DashboardWithContext } from "./DashboardWithContext";
import { DashboardWithContextAndMemo } from "./DashboardWithContextAndMemo";
import { DashboardWithZustand } from "./DashboardWithZustand";

const demos = {
  "1. useState only": DashboardOnlyUseState,
  "2. Context": DashboardWithContext,
  "3. Context + memo": DashboardWithContextAndMemo,
  "4. Zustand": DashboardWithZustand,
} as const;

type DemoName = keyof typeof demos;

export function App() {
  const [active, setActive] = useState<DemoName>("1. useState only");
  const ActiveDemo = demos[active];

  return (
    <div className="demo-app">
      <div className="tabs">
        {(Object.keys(demos) as DemoName[]).map((name) => (
          <button
            key={name}
            className={`tab${name === active ? " active" : ""}`}
            onClick={() => setActive(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <ActiveDemo />
    </div>
  );
}

export default App;
