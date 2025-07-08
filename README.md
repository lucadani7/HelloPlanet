# 🌍 Hello Planet

**Hello Planet** is a theatrical Node.js package where planets talk — literally.  
Each planet comes with personality, sarcasm, and cosmic attitude.

> From dramatic Neptune to sassy Pluto, space has never been this entertaining.

---

## 🚀 Features

- Get funny and poetic messages from each planet
- Access prewritten theatre-style dialogues
- Export scenes in multiple formats:
  - JSON
  - CSV
  - TXT
  - YAML
  - XML
- Random planet picker
- Planet distance from the Sun (based on official AU value)

---

## 📦 Installation

```bash
npm install hello-planet
```

---

## 🛠️ Usage

```ts
import { PlanetsManager, EnumPlanets } from "hello-planet";

// Say hello to a planet
console.log(PlanetsManager.sayHelloToPlanet(EnumPlanets.Mars));

// Get a sarcastic message from Pluto
console.log(PlanetsManager.certainPlanetIsTalkingToUs(EnumPlanets.Pluto));

// Export all theatrical scenes to YAML
PlanetsManager.exportScenes("yaml", "./scenes.yaml");

// Get all planet names
console.log(PlanetsManager.listAllPlanets());

// Get distance info
console.log(PlanetsManager.infoAboutCertainPlanet(EnumPlanets.Jupiter));
```

---

## 📁 Example: Scene Export

You can export all theatre scenes in any of the supported formats:

```ts
PlanetsManager.exportScenes("xml", "drama.xml");
PlanetsManager.exportScenes("txt", "space-play.txt");
```

---

## 🌌 About the Data

- All dialogue is hardcoded in TypeScript (no external JSON).
- Distances from the Sun use the IAU-defined 1 AU = 149,597,870.7 km.

---


## 🛰️ License

Apache-2.0 license

---

## 🧑‍🚀 Author

Luca Daniel Ionescu  
[GitHub Profile](https://github.com/lucadani7)
