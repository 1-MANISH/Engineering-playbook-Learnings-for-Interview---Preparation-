import { useState } from "react";
import { Panel } from "./renderTracker";

/**
 * 1. useState only — all state lives at the top of the tree and is passed
 *    down via props. ANY state change re-renders the ENTIRE dashboard,
 *    including the Sidebar which uses no state at all.
 */

function Header({ user, dark }: { user: string; dark: boolean }) {
  return (
    <div className="dashboard-header">
      <Panel title="Header (reads user + theme)">
        <p>
          Welcome back, <b>{user}</b> · {dark ? "🌙 dark mode" : "☀️ light mode"}
        </p>
      </Panel>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="dashboard-sidebar">
      <Panel title="Sidebar (uses NO state)">
        <ul>
          <li>Home</li>
          <li>Analytics</li>
          <li>Settings</li>
        </ul>
      </Panel>
    </div>
  );
}

function CounterCard({ count, onIncrement }: { count: number; onIncrement: () => void }) {
  return (
    <Panel title="Counter (reads count)">
      <div className="big-number">{count}</div>
      <button onClick={onIncrement}>Increment</button>
    </Panel>
  );
}

function UserCard({ user, onChange }: { user: string; onChange: (v: string) => void }) {
  return (
    <Panel title="User (reads user)">
      <input value={user} onChange={(e) => onChange(e.target.value)} />
    </Panel>
  );
}

function ThemeCard({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <Panel title="Theme (reads theme)">
      <p>Current: {dark ? "🌙 dark" : "☀️ light"}</p>
      <button onClick={onToggle}>Toggle theme</button>
    </Panel>
  );
}

export function DashboardOnlyUseState() {
  const [user, setUser] = useState("Harkirat");
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(true);

  return (
    <div>
      <p className="demo-note">
        <b>useState at the top + prop drilling.</b> Click "Increment" — every single
        component re-renders, even the Sidebar which uses no state. The whole tree
        re-renders because the state lives in the root component.
      </p>
      <div className="dashboard">
        <Header user={user} dark={dark} />
        <Sidebar />
        <main className="dashboard-main">
          <CounterCard count={count} onIncrement={() => setCount((c) => c + 1)} />
          <UserCard user={user} onChange={setUser} />
          <ThemeCard dark={dark} onToggle={() => setDark((d) => !d)} />
        </main>
      </div>
    </div>
  );
}
