import { useEffect, useRef, type ReactNode } from "react";

/** Counts how many times the calling component has rendered. */
export function useRenderCount() {
  const count = useRef(0);
  count.current += 1;
  return count.current;
}

/**
 * Visual wrapper for every widget in the demos.
 * Shows a live render count and flashes its border every time it re-renders,
 * so the audience can see re-renders even without React DevTools.
 */
export function Panel({ title, children }: { title: string; children?: ReactNode }) {
  const renders = useRenderCount();
  const ref = useRef<HTMLDivElement>(null);

  // Re-trigger the flash animation after every render.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("panel-flash");
    void el.offsetWidth; // force reflow so the animation restarts
    el.classList.add("panel-flash");
  });

  return (
    <div ref={ref} className="panel">
      <div className="panel-header">
        <span className="panel-title">{title}</span>
        <span className="render-badge">renders: {renders}</span>
      </div>
      <div className="panel-body">{children}</div>
    </div>
  );
}
