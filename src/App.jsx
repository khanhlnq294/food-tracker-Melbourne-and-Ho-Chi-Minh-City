import { useState } from "react";
import MelbourneFoodTracker from "./MelbourneFoodTracker";
import HCMCFoodPassport from "./HCMCFoodPassport";

export default function App() {
  const [city, setCity] = useState("melbourne");

  return city === "melbourne"
    ? <MelbourneFoodTracker onSwitch={() => setCity("hcmc")} />
    : <HCMCFoodPassport onSwitch={() => setCity("melbourne")} />;
}
