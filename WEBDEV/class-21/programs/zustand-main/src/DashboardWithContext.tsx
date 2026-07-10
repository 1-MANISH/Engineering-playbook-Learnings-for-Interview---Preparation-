import { createContext, useContext, useState } from "react";
import { Panel } from "./renderTracker";

/**
 * 2. Context (naive) — state moved into a context so we no longer prop-drill.
 *    But nothing improves: the provider component holds the state, so when it
 *    re-renders, the whole tree below it re-renders too. And every consumer
 *    re-renders on ANY change because the context value is a brand new object
 *    each time.
 */

type DashboardState = {
  user: string;
  count: number;
  dark: boolean;
  setUser: (v: string) => void;
  increment: () => void;
  toggleDark: () => void;
};

const DashboardContext = createContext<DashboardState | null>(null);

function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside the provider");
  return ctx;
}

function Header() {
  const { user, dark } = useDashboard();
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

function CounterCard() {
  const { count, increment } = useDashboard();
  return (
    <Panel title="Counter (reads count)">
      <div className="big-number">{count}</div>
      <button onClick={increment}>Increment</button>
    </Panel>
  );
}

function UserCard() {
  const { user, setUser } = useDashboard();
  return (
    <Panel title="User (reads user)">
      <input value={user} onChange={(e) => setUser(e.target.value)} />
    </Panel>
  );
}

function ThemeCard() {
  const { dark, toggleDark } = useDashboard();
  return (
    <Panel title="Theme (reads theme)">
      <p>Current: {dark ? "🌙 dark" : "☀️ light"}</p>
      <button onClick={toggleDark}>Toggle theme</button>
    </Panel>
  );
}

export function DashboardWithContext() {
  const [user, setUser] = useState("Harkirat");
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(true);

  return (
    <DashboardContext.Provider value={{
      user,
      count,
      dark,
      setUser,
      increment: () => setCount((c) => c + 1),
      toggleDark: () => setDark((d) => !d),
    }}>
      <p className="demo-note">
        <b>Context (naive).</b> No more prop drilling, but click "Increment" —
        everything STILL re-renders. The provider component owns the state, so its
        whole subtree re-renders, and every consumer re-renders because the context
        value is a new object on every render. Context solves prop drilling, not
        re-renders.
      </p>
      <div className="dashboard">
        <Header />
        <Sidebar />
        <main className="dashboard-main">
          <CounterCard />
          <UserCard />
          <ThemeCard />
        </main>
      </div>
    </DashboardContext.Provider>
  );
}
