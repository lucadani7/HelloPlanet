import EnumPlanets from "./EnumPlanets";
import PlanetInfo from "./PlanetInfo";
import {planetDistancesAU} from "./PlanetDistance";
import {scenes} from "./scenes";
import * as yaml from 'js-yaml';
import {create} from 'xmlbuilder2';
import fs from 'fs';

export class PlanetsManager {
    // list with all planets
    static listAllPlanets(): string[] {
        return Object.values(EnumPlanets);
    }

    // checking if a string is a valid planet
    static isPlanet(name: string): boolean {
        return this.listAllPlanets().includes(name as EnumPlanets);
    }

    // getting random planet based on EnumPlanets enum
    static getRandomPlanet(): EnumPlanets {
        const arr: string[] = Object.values(EnumPlanets);
        const pick: number = Math.floor(Math.random() * arr.length);
        return arr[pick] as EnumPlanets;
    }

    // returning index of planet in EnumPlanets enum
    static indexOfPlanet(planet: EnumPlanets): number {
        return this.listAllPlanets().indexOf(planet);
    }

    // returning next planet
    static getNextPlanet(current: EnumPlanets): EnumPlanets {
        const planets: string[] = Object.values(EnumPlanets);
        const idx: number = planets.indexOf(current);
        const nextId: number = (idx + 1) % planets.length;
        return planets[nextId] as EnumPlanets;
    }

    // returning previous planet
    static getPreviousPlanet(current: EnumPlanets): EnumPlanets {
        const planets: string[] = Object.values(EnumPlanets);
        let idx: number = planets.indexOf(current);
        if (idx - 1 < 0) {
            idx += planets.length;
        }
        const previousId: number = (idx - 1) % planets.length;
        return planets[previousId] as EnumPlanets;
    }

    // saying hello to a certain planet
    static sayHelloToPlanet(planet: EnumPlanets): string {
        return "Hello " + planet + "!";
    }

    static certainPlanetIsTalkingToUs(planet: EnumPlanets): string {
        const sb: string[] = [];
        sb.push("Hello astronaut!");
        sb.push(" ");
        switch (planet) {
            case EnumPlanets.Earth:
                sb.push("Home sweet home! I am the original space station for humanity since forever.");
                break;
            case EnumPlanets.Mercury:
                sb.push("Hot days, freezing nights - talk about weird. Each spin takes 59 Earth days... I seriously need sleep. Coffee, please?");
                break;
            case EnumPlanets.Mars:
                sb.push("I am dry, cold and still more hospitable than Twitter!");
                break;
            case EnumPlanets.Venus:
                sb.push("Feel free to try my atmosphere if you think your office is a sauna!");
                break;
            case EnumPlanets.Jupiter:
                sb.push("I am the king of the giants and a majestic beacon dancing in cosmic winds!");
                break;
            case EnumPlanets.Saturn:
                sb.push("No planet has better rings than me!");
                break;
            case EnumPlanets.Uranus:
                sb.push("I quietly roll through space - cold, tilted and too far to care what anyone thinks.")
                break;
            case EnumPlanets.Neptune:
                sb.push("I am blue and mysterious! I am so far away, even Pluto keeps refusing to call me!");
                break;
            case EnumPlanets.Pluto:
                sb.push("Though small, my existence is authentic. I stand apart with a refined sensibility, unlike those who mask their solitude with bluster.")
                break;
            default:
                sb.push("I am so mysterious even I don’t know which story to tell first.")
                break;
        }
        return sb.join("");
    }

    static randomPlanetIsTalkingToUs(): string {
        return this.certainPlanetIsTalkingToUs(this.getRandomPlanet());
    }

    static planetsInfo(): PlanetInfo[] {
        const value: number = 149_597_870.7; // value chosen by International Astronomical Union in 2012
        const planetsInfoArray: PlanetInfo[] = [];
        const planetsList: string[] = Object.values(EnumPlanets);
        for (const planetInfo of planetsList) {
            const km: number = value * planetDistancesAU[planetInfo as EnumPlanets];
            planetsInfoArray.push({
                name: planetInfo as EnumPlanets,
                distanceFromSunMillionKm: parseFloat(km.toFixed(2))
            });
        }
        return planetsInfoArray;
    }

    static infoAboutCertainPlanet(planet: EnumPlanets): PlanetInfo {
        return <PlanetInfo>this.planetsInfo().find((p) => p.name === planet);
    }

    static exportScenes(format: 'json' | 'txt' | 'csv' | 'yaml' | 'xml', outputPath: string): void {
        let dataToWrite: string = '';
        switch (format) {
            case 'json':
                dataToWrite = JSON.stringify(scenes, null, 2);
                break;
            case 'yaml':
                dataToWrite = yaml.dump(scenes);
                break;
            case 'csv':
                dataToWrite = 'scene_index,scene_title,character,line\n' + scenes.flatMap((scene, index) => scene.dialogues.map(d => `${index},"${scene.scene}","${d.character}","${d.line.replace(/"/g, '""')}"`)).join('\n');
                break;
            case 'txt':
                dataToWrite = scenes
                    .map((scene, index) => {
                        const header = `Scene ${index + 1}: ${scene.scene}`;
                        const dialogue = scene.dialogues.map(d => `${d.character}: ${d.line}`).join('\n');
                        return `${header}\n${dialogue}`;
                    })
                    .join('\n\n');
                break;
            case 'xml':
                const root = create({version: '1.0'}).ele('scenes');
                scenes.forEach((scene, index) => {
                    const sceneNode = root.ele('scene', {index: index + 1});
                    sceneNode.ele('title').txt(scene.scene);
                    const dialoguesNode = sceneNode.ele('dialogues');
                    scene.dialogues.forEach(dialogue => {
                        dialoguesNode.ele('line')
                            .ele('character').txt(dialogue.character).up()
                            .ele('text').txt(dialogue.line).up()
                            .up();
                    });
                });
                dataToWrite = root.end({prettyPrint: true});
                break;
            default:
                throw new Error(`Unsupported export format: ${format}`);
        }
        fs.writeFileSync(outputPath, dataToWrite, 'utf8');
        console.log(`Exported scenes to ${outputPath}`);
    }
}