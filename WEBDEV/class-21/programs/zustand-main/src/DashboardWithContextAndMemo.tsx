import { createContext, memo, useContext, useMemo, useState } from "react";
import { Panel } from "./renderTracker";

/**
 * 3. Context + memo — every component is wrapped in React.memo and the context
 *    value is memoized with useMemo.
 *
 *    Improvement: the Sidebar (which doesn't consume the context) finally stops
 *    re-rendering.
 *
 *    Still broken: EVERY context consumer re-renders on ANY change, because
 *    they all subscribe to the same context value. Change the count and the
 *    Header, UserCard and ThemeCard re-render too — memo can't save a
 *    component from its own useContext. Fixing this properly with context
 *    means splitting into 3+ separate providers.
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

const Header = memo(function Header() {
  const { user, dark } = useDashboard();
  return (
    <div className="dashboard-header">
      <Panel title="Header (memo, reads user + theme)">
        <p>
          Welcome back, <b>{user}</b> · {dark ? "🌙 dark mode" : "☀️ light mode"}
        </p>
      </Panel>
    </div>
  );
});

const Sidebar = memo(function Sidebar() {
  return (
    <div className="dashboard-sidebar">
      <Panel title="Sidebar (memo, uses NO state)">
        <ul>
          <li>Home</li>
          <li>Analytics</li>
          <li>Settings</li>
        </ul>
      </Panel>
    </div>
  );
});

const CounterCard = memo(function CounterCard() {
  const { count, increment } = useDashboard();
  return (
    <Panel title="Counter (memo, reads count)">
      <div className="big-number">{count}</div>
      <button onClick={increment}>Increment</button>
    </Panel>
  );
});

const UserCard = memo(function UserCard() {
  const { user, setUser } = useDashboard();
  return (
    <Panel title="User (memo, reads user)">
      <input value={user} onChange={(e) => setUser(e.target.value)} />
    </Panel>
  );
});

const ThemeCard = memo(function ThemeCard() {
  const { dark, toggleDark } = useDashboard();
  return (
    <Panel title="Theme (memo, reads theme)">
      <p>Current: {dark ? "🌙 dark" : "☀️ light"}</p>
      <button onClick={toggleDark}>Toggle theme</button>
    </Panel>
  );
});

export function DashboardWithContextAndMemo() {
  const [user, setUser] = useState("Harkirat");
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(true);

  // Memoized value — only changes when the underlying state changes.
  const value = useMemo<DashboardState>(
    () => ({
      user,
      count,
      dark,
      setUser,
      increment: () => setCount((c) => c + 1),
      toggleDark: () => setDark((d) => !d),
    }),
    [user, count, dark],
  );

  return (
    <DashboardContext.Provider value={value}>
      <p className="demo-note">
        <b>Context + React.memo + useMemo.</b> Click "Increment" — the Sidebar is
        finally quiet, but the Header, UserCard and ThemeCard STILL re-render even
        though count didn't affect them. Every consumer of a context re-renders
        whenever the context value changes. memo can't help a component escape its
        own useContext. And look how much boilerplate this took.
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
