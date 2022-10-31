import { useState } from "react";
import {
  generateRandomColor,
  generateRandomX,
  generateRandomY,
} from "../utils";
import { CircleData, circleStyling } from "../constants";
import { useDragging } from "../useDragging";

type CircleProps = {
  data: CircleData;
  updatePosition: (x: number, y: number) => void;
};

const Circle = ({ data, updatePosition }: CircleProps) => {
  const [ref, props] = useDragging(updatePosition);

  return (
    <div
      ref={ref}
      {...props}
      style={{
        ...circleStyling,
        left: data.x,
        top: data.y,
        background: data.color,
      }}
    />
  );
};

const ListElement = ({ data }: { data: CircleData }) => (
  <li
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <div
      style={{ width: "20px", height: "20px", backgroundColor: data.color }}
    />
    <div>id: {data.id}</div>
    <div>x: {data.x.toFixed(0)}</div>
    <div>y: {data.y.toFixed(0)}</div>
  </li>
);

type ListProps = {
  circles: CircleData[];
};

const List = ({ circles }: ListProps) => {
  return (
    <ul>
      {[...circles]
        .sort((a, b) => a.id - b.id)
        .map((data) => (
          <ListElement data={data} key={data.id} />
        ))}
    </ul>
  );
};

export const CirclesWithList = () => {
  const [circles, setCircles] = useState<CircleData[]>([]);

  const handleAddCircle = () =>
    setCircles((prev) => {
      const newId = prev.length + 1;

      const newCircle = {
        color: `#${generateRandomColor()}`,
        x: generateRandomX(),
        y: generateRandomY(),
        id: newId,
      };
      return [...prev, newCircle];
    });

  const handleUpdatePosition = (id: number, x: number, y: number) => {
    setCircles((prev) => {
      const circle = prev.find((c) => c.id === id);

      const filteredPrev = prev.filter((c) => c.id !== id);

      return circle ? [...filteredPrev, { ...circle, x, y }] : prev;
    });
  };

  return (
    <div>
      <button onClick={handleAddCircle}>+</button>
      <List circles={circles} />
      {circles.map((circle) => (
        <Circle
          key={circle.id}
          data={circle}
          updatePosition={(x, y) => handleUpdatePosition(circle.id, x, y)}
        />
      ))}
    </div>
  );
};
