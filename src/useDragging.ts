import {
  useRef,
  useState,
  MouseEvent,
  MouseEventHandler,
  MutableRefObject,
} from "react";

type MouseHandlers = {
  onMouseMove: MouseEventHandler;
  onMouseUp: MouseEventHandler;
  onMouseDown: MouseEventHandler;
};

type RefType = MutableRefObject<HTMLDivElement | null>;

type TReturn = [RefType, MouseHandlers];

export const useDragging = (
  onMoveCallback: (x: number, y: number) => void
): TReturn => {
  const [isDragging, setIsDragging] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseDown = () => setIsDragging(true);

  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newX = e.clientX;
      const newY = e.clientY;
      onMoveCallback(newX, newY);
    }
  };

  return [ref, { onMouseDown, onMouseUp, onMouseMove }];
};
