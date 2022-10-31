import { useState } from "react";
import {
  generateRandomColor,
  generateRandomX,
  generateRandomY,
} from "../utils";
import { CircleData, circleStyling } from "../constants";
import { useDragging } from "../useDragging";
import { atomFamily, RecoilRoot, useRecoilState } from "recoil";

const circleAtomFamily = atomFamily<CircleData, number>({
  key: "circle",
  default: (id) => ({
    color: `#${generateRandomColor()}`,
    x: generateRandomX(),
    y: generateRandomY(),
    id,
  }),
});

type CircleProps = {
  id: number;
};

const Circle = ({ id }: CircleProps) => {
  const [data, setData] = useRecoilState(circleAtomFamily(id));
  const [ref, props] = useDragging((x, y) =>
    setData((prev) => ({ ...prev, x, y }))
  );

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

const ListElement = ({ id }: { id: number }) => {
  const [data] = useRecoilState(circleAtomFamily(id));

  return (
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
};

const List = ({ circleIds }: { circleIds: number[] }) => {
  return (
    <ul>
      {[...circleIds]
        .sort((a, b) => a - b)
        .map((id) => (
          <ListElement key={id} id={id} />
        ))}
    </ul>
  );
};

export const CirclesWithListOptimized = () => {
  const [circleIds, setCircleIds] = useState<number[]>([]);

  const handleAddCircle = () =>
    setCircleIds((prev) => {
      const newId = prev.length + 1;

      return [...prev, newId];
    });

  return (
    <RecoilRoot>
      <div>
        <button onClick={handleAddCircle}>+</button>
        <List circleIds={circleIds} />
        {circleIds.map((id) => (
          <Circle key={id} id={id} />
        ))}
      </div>
    </RecoilRoot>
  );
};
