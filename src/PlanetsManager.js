"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanetsManager = void 0;
const EnumPlanets_1 = __importDefault(require("./EnumPlanets"));
const PlanetDistance_1 = require("./PlanetDistance");
const scenes_1 = require("./scenes");
const yaml = __importStar(require("js-yaml"));
const xmlbuilder2_1 = require("xmlbuilder2");
const fs_1 = __importDefault(require("fs"));
class PlanetsManager {
    // list with all planets
    static listAllPlanets() {
        return Object.values(EnumPlanets_1.default);
    }
    // checking if a string is a valid planet
    static isPlanet(name) {
        return this.listAllPlanets().includes(name);
    }
    // getting random planet based on EnumPlanets enum
    static getRandomPlanet() {
        const arr = Object.values(EnumPlanets_1.default);
        const pick = Math.floor(Math.random() * arr.length);
        return arr[pick];
    }
    // returning index of planet in EnumPlanets enum
    static indexOfPlanet(planet) {
        return this.listAllPlanets().indexOf(planet);
    }
    // returning next planet
    static getNextPlanet(current) {
        const planets = Object.values(EnumPlanets_1.default);
        const idx = planets.indexOf(current);
        const nextId = (idx + 1) % planets.length;
        return planets[nextId];
    }
    // returning previous planet
    static getPreviousPlanet(current) {
        const planets = Object.values(EnumPlanets_1.default);
        let idx = planets.indexOf(current);
        if (idx - 1 < 0) {
            idx += planets.length;
        }
        const previousId = (idx - 1) % planets.length;
        return planets[previousId];
    }
    // saying hello to a certain planet
    static sayHelloToPlanet(planet) {
        return "Hello " + planet + "!";
    }
    static certainPlanetIsTalkingToUs(planet) {
        const sb = [];
        sb.push("Hello astronaut!");
        sb.push(" ");
        switch (planet) {
            case EnumPlanets_1.default.Earth:
                sb.push("Home sweet home! I am the original space station for humanity since forever.");
                break;
            case EnumPlanets_1.default.Mercury:
                sb.push("Hot days, freezing nights - talk about weird. Each spin takes 59 Earth days... I seriously need sleep. Coffee, please?");
                break;
            case EnumPlanets_1.default.Mars:
                sb.push("I am dry, cold and still more hospitable than Twitter!");
                break;
            case EnumPlanets_1.default.Venus:
                sb.push("Feel free to try my atmosphere if you think your office is a sauna!");
                break;
            case EnumPlanets_1.default.Jupiter:
                sb.push("I am the king of the giants and a majestic beacon dancing in cosmic winds!");
                break;
            case EnumPlanets_1.default.Saturn:
                sb.push("No planet has better rings than me!");
                break;
            case EnumPlanets_1.default.Uranus:
                sb.push("I quietly roll through space - cold, tilted and too far to care what anyone thinks.");
                break;
            case EnumPlanets_1.default.Neptune:
                sb.push("I am blue and mysterious! I am so far away, even Pluto keeps refusing to call me!");
                break;
            case EnumPlanets_1.default.Pluto:
                sb.push("Though small, my existence is authentic. I stand apart with a refined sensibility, unlike those who mask their solitude with bluster.");
                break;
            default:
                sb.push("I am so mysterious even I don’t know which story to tell first.");
                break;
        }
        return sb.join("");
    }
    static randomPlanetIsTalkingToUs() {
        return this.certainPlanetIsTalkingToUs(this.getRandomPlanet());
    }
    static planetsInfo() {
        const value = 149597870.7; // value chosen by International Astronomical Union in 2012
        const planetsInfoArray = [];
        const planetsList = Object.values(EnumPlanets_1.default);
        for (const planetInfo of planetsList) {
            const km = value * PlanetDistance_1.planetDistancesAU[planetInfo];
            planetsInfoArray.push({
                name: planetInfo,
                distanceFromSunMillionKm: parseFloat(km.toFixed(2))
            });
        }
        return planetsInfoArray;
    }
    static infoAboutCertainPlanet(planet) {
        return this.planetsInfo().find((p) => p.name === planet);
    }
    static exportScenes(format, outputPath) {
        let dataToWrite = '';
        switch (format) {
            case 'json':
                dataToWrite = JSON.stringify(scenes_1.scenes, null, 2);
                break;
            case 'yaml':
                dataToWrite = yaml.dump(scenes_1.scenes);
                break;
            case 'csv':
                dataToWrite = 'scene_index,scene_title,character,line\n' + scenes_1.scenes.flatMap((scene, index) => scene.dialogues.map(d => `${index},"${scene.scene}","${d.character}","${d.line.replace(/"/g, '""')}"`)).join('\n');
                break;
            case 'txt':
                dataToWrite = scenes_1.scenes
                    .map((scene, index) => {
                    const header = `Scene ${index + 1}: ${scene.scene}`;
                    const dialogue = scene.dialogues.map(d => `${d.character}: ${d.line}`).join('\n');
                    return `${header}\n${dialogue}`;
                })
                    .join('\n\n');
                break;
            case 'xml':
                const root = (0, xmlbuilder2_1.create)({ version: '1.0' }).ele('scenes');
                scenes_1.scenes.forEach((scene, index) => {
                    const sceneNode = root.ele('scene', { index: index + 1 });
                    sceneNode.ele('title').txt(scene.scene);
                    const dialoguesNode = sceneNode.ele('dialogues');
                    scene.dialogues.forEach(dialogue => {
                        dialoguesNode.ele('line')
                            .ele('character').txt(dialogue.character).up()
                            .ele('text').txt(dialogue.line).up()
                            .up();
                    });
                });
                dataToWrite = root.end({ prettyPrint: true });
                break;
            default:
                throw new Error(`Unsupported export format: ${format}`);
        }
        fs_1.default.writeFileSync(outputPath, dataToWrite, 'utf8');
        console.log(`Exported scenes to ${outputPath}`);
    }
}
exports.PlanetsManager = PlanetsManager;
