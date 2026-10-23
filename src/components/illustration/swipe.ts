export function attachSwipe(element: Element, navigate: (delta: number) => void, signal: AbortSignal) {
  let start: { x: number; y: number } | undefined;
  element.addEventListener('touchstart', ((event: TouchEvent) => {
    start = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : undefined;
  }) as EventListener, { passive: true, signal });
  element.addEventListener('touchend', ((event: TouchEvent) => {
    if (!start) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) navigate(dx < 0 ? 1 : -1);
    start = undefined;
  }) as EventListener, { passive: true, signal });
  element.addEventListener('touchcancel', () => { start = undefined; }, { signal });
}
