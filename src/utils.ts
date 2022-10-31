import { KELVIN_OFFSET } from "./constants";

export const generateRandomX = () =>
  50 + Math.random() * window.innerWidth - 100;
export const generateRandomY = () =>
  50 + Math.random() * window.innerHeight - 100;

export const generateRandomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

export function tryConvert(
  temperature: string,
  convert: (val: number) => number
) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

export function kelvinToCelsius(kelvin: number) {
  return kelvin - KELVIN_OFFSET;
}

export function celsiusToKelvin(celsius: number) {
  return celsius + KELVIN_OFFSET;
}

export function kelvinToFahrenheit(kelvin: number) {
  return (kelvin * 9) / 5 - 459.67;
}

export function fahrenheitToKelvin(fahrenheit: number) {
  return ((fahrenheit + 459.67) * 5) / 9;
}
