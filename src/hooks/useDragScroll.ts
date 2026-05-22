import { useEffect, useRef } from "react";

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;

    let mouseDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const startDragging = (e: MouseEvent) => {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const stopDragging = () => {
      mouseDown = false;
    };

    const move = (e: MouseEvent) => {
      e.preventDefault();
      if (!mouseDown) return;
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    };

    slider.addEventListener("mousemove", move, { passive: false });
    slider.addEventListener("mousedown", startDragging);
    slider.addEventListener("mouseup", stopDragging);
    slider.addEventListener("mouseleave", stopDragging);

    return () => {
      slider.removeEventListener("mousemove", move);
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
    };
  }, []);

  return ref;
}
