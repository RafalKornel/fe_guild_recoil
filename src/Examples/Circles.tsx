import { useState } from "react";
import {
  generateRandomColor,
  generateRandomX,
  generateRandomY,
} from "../utils";
import { CircleData, circleStyling } from "../constants";
import { useDragging } from "../useDragging";

const Circle = ({ id }: { id: number }) => {
  const [data, setData] = useState<CircleData>({
    id,
    color: generateRandomColor(),
    x: generateRandomX(),
    y: generateRandomY(),
  });

  const [ref, props] = useDragging((newX, newY) =>
    setData((prev) => ({ ...prev, x: newX, y: newY }))
  );

  return (
    <div
      ref={ref}
      {...props}
      style={{
        ...circleStyling,
        left: data.x,
        top: data.y,
        background: `#${data.color}`,
      }}
    />
  );
};

export const Circles = () => {
  const [circleIds, setCircleIds] = useState<number[]>([1, 2]);

  const handleAddCircle = () =>
    setCircleIds((prev) => {
      const newId = prev.length + 1;
      return [...prev, newId];
    });

  return (
    <div>
      <button onClick={handleAddCircle}>+</button>
      {circleIds.map((id) => (
        <Circle key={id} id={id} />
      ))}
    </div>
  );
};
