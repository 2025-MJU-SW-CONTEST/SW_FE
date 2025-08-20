import { useEffect, useState } from "react";

export function useIO(
  targetRef,
  { root = null, rootMargin = "200px", threshold = 0.01 } = {}
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) =>
        setVisible(entry.isIntersecting || entry.intersectionRatio > 0),
      { root, rootMargin, threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [targetRef, root, rootMargin, threshold]);

  return visible;
}
