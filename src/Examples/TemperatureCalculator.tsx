import {
  atom,
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { KELVIN_OFFSET } from "../constants";
import {
  celsiusToKelvin,
  fahrenheitToKelvin,
  kelvinToCelsius,
  kelvinToFahrenheit,
} from "../utils";

enum Scale {
  Celsjus = "c",
  Fahrenheit = "f",
}

const scaleNames = {
  [Scale.Celsjus]: "Celsjuszach",
  [Scale.Fahrenheit]: "Fahrenheitach",
};

const kelvinAtom = atom<number>({ key: "kelvin", default: KELVIN_OFFSET });

const celsiusSelector = selector<number>({
  key: "celsius",
  get: ({ get }) => kelvinToCelsius(get(kelvinAtom)),
  set: ({ set }, newValue) =>
    set(kelvinAtom, celsiusToKelvin(newValue as number)),
});

const fahrenheitSelector = selector<number>({
  key: "fahrenheit",
  get: ({ get }) => kelvinToFahrenheit(get(kelvinAtom)),
  set: ({ set }, newValue) =>
    set(kelvinAtom, fahrenheitToKelvin(newValue as number)),
});

type TemperatureInputProps = {
  scale: Scale;
};

const TemperatureInput = ({ scale }: TemperatureInputProps) => {
  const [temperature, setTemperature] = useRecoilState(
    scale === Scale.Celsjus ? celsiusSelector : fahrenheitSelector
  );

  return (
    <fieldset>
      <legend>Podaj temperaturę w {scaleNames[scale]}:</legend>
      <input
        value={temperature.toFixed(2)}
        onChange={(e) => setTemperature(Number(e.target.value))}
      />
    </fieldset>
  );
};

const KelvinTemperature = () => {
  const temperature = useRecoilValue(kelvinAtom);

  return <div>Temperatura w kelvinach: {temperature.toFixed(2)}</div>;
};

export const TemperatureCalculator = () => {
  return (
    <RecoilRoot>
      <div>
        <TemperatureInput scale={Scale.Celsjus} />
        <TemperatureInput scale={Scale.Fahrenheit} />
        <KelvinTemperature />
      </div>
    </RecoilRoot>
  );
};
