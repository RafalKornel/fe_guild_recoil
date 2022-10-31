import { CSSProperties } from "react";

export const circleStyling: CSSProperties = {
  position: "absolute",
  width: "50px",
  height: "50px",
  transform: "translate(-50%, -50%)",
  borderRadius: "50%",
};

export type CircleData = {
  id: number;
  color: string;
  x: number;
  y: number;
};

export const KELVIN_OFFSET = 273.15;
