import { create } from "zustand";
import { Panel } from "./renderTracker";

/**
 * 4. Zustand — state lives OUTSIDE React in a store. Each component subscribes
 *    to exactly the slice it needs with a selector. When the count changes,
 *    only CounterCard re-renders. No memo, no useMemo, no providers, no prop
 *    drilling. Zero boilerplate.
 */

type DashboardStore = {
  user: string;
  count: number;
  dark: boolean;
  setUser: (v: string) => void;
  increment: () => void;
  toggleDark: () => void;
};

const useDashboardStore = create<DashboardStore>((set) => ({
  user: "Harkirat",
  count: 0,
  dark: true,
  setUser: (user) => set({ user }),
  increment: () => set((s) => ({ count: s.count + 1 })),
  toggleDark: () => set((s) => ({ dark: !s.dark })),
}));

function Header() {
  // Selectors: this component only re-renders when `user` or `dark` change.
  const {user,dark} = useDashboardStore((s) => s);

  return (
    <div className="dashboard-header">
      <Panel title="Header (selects user + theme)">
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
  const count = useDashboardStore((s) => s.count);

  const increment = useDashboardStore((s) => s.increment);
  return (
    <Panel title="Counter (selects count)">
      <div className="big-number">{count}</div>
      <button onClick={increment}>Increment</button>
    </Panel>
  );
}

function UserCard() {
  const user = useDashboardStore((s) => s.user);
  const setUser = useDashboardStore((s) => s.setUser);
  return (
    <Panel title="User (selects user)">
      <input value={user} onChange={(e) => setUser(e.target.value)} />
    </Panel>
  );
}

function ThemeCard() {
  const dark = useDashboardStore((s) => s.dark);
  const toggleDark = useDashboardStore((s) => s.toggleDark);
  return (
    <Panel title="Theme (selects theme)">
      <p>Current: {dark ? "🌙 dark" : "☀️ light"}</p>
      <button onClick={toggleDark}>Toggle theme</button>
    </Panel>
  );
}

export function DashboardWithZustand() {
  // Note: this parent component subscribes to NOTHING, so it never re-renders.
  return (
    <div>
      <p className="demo-note">
        <b>Zustand.</b> Click "Increment" — ONLY the Counter re-renders. Type in the
        user input — only the Header and UserCard re-render. Each component
        subscribes to exactly the slice it needs via a selector, and the state lives
        outside React entirely. No providers, no memo, no prop drilling.
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
    </div>
  );
}

// react query