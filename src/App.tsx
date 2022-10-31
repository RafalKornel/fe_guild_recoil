import { useState } from "react";
import "./App.css";
import {
  Circles,
  CirclesWithList,
  CirclesWithListOptimized,
  TemperatureCalculator,
} from "./Examples";

enum Tabs {
  Calculator = "Calculator",
  Circles = "Circles",
  CirclesWithList = "Circles with list",
  CirclesWithListOptimized = "Circles with list optimized",
}

const components = {
  [Tabs.Calculator]: <TemperatureCalculator />,
  [Tabs.Circles]: <Circles />,
  [Tabs.CirclesWithList]: <CirclesWithList />,
  [Tabs.CirclesWithListOptimized]: <CirclesWithListOptimized />,
};

type TabsSelectProps = {
  tab: Tabs;
  setTab: (tab: Tabs) => void;
};

const TabSelect = ({ tab, setTab }: TabsSelectProps) => (
  <select value={tab} onChange={(e) => setTab(e.target.value as Tabs)}>
    <option value={Tabs.Calculator}>{Tabs.Calculator}</option>
    <option value={Tabs.Circles}>{Tabs.Circles}</option>
    <option value={Tabs.CirclesWithList}>{Tabs.CirclesWithList}</option>
    <option value={Tabs.CirclesWithListOptimized}>
      {Tabs.CirclesWithListOptimized}
    </option>
  </select>
);

function App() {
  const [tab, setTab] = useState<Tabs>(Tabs.Calculator);

  return (
    <div>
      <h1 style={{ marginBottom: "auto" }}>Recoil showcase</h1>
      <TabSelect tab={tab} setTab={setTab} />
      <div style={{ marginTop: "2rem" }}>{components[tab]}</div>
    </div>
  );
}

export default App;
