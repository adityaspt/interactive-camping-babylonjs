import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight } from "@babylonjs/core";
import { MeshBuilder } from "@babylonjs/core/Meshes";
import { StandardMaterial } from "@babylonjs/core/Materials";
import { CubeTexture } from "@babylonjs/core/Materials/Textures";
import { Texture } from "@babylonjs/core/Materials/Textures";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Color3 } from "@babylonjs/core/Maths/math";


const canvas = document.getElementById("app") as HTMLCanvasElement;
const engine = new Engine(canvas, true);
const scene = new Scene(engine);
//const xrHelper = await scene.createDefaultXRExperienceAsync();
const camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);
camera.lowerRadiusLimit = camera.upperRadiusLimit = 10; // Lock distance from the center

const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
light.intensity = 0.8;

//Ground
const ground = MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);
const groundMaterial = new StandardMaterial("groundMaterial", scene);
const groundTexture = new Texture("/src/assets/forest-ground-1024x1024.png", scene);
groundMaterial.diffuseTexture = groundTexture;
groundTexture.uScale = 10; // Tile texture
groundTexture.vScale = 10;
ground.material = groundMaterial;

// Campfire (cylinder)
const campfire = MeshBuilder.CreateCylinder("campfire", { diameter: 1, height: 0.5 }, scene);
campfire.position.y = 0.25;
const campfireMaterial = new StandardMaterial("campfireMaterial", scene);
campfireMaterial.diffuseColor = new Color3(0.6, 0.3, 0); // Brownish color for logs
campfire.material = campfireMaterial;

//Main loop that updates the scene
engine.runRenderLoop(() =>
{
  scene.render();
});

// Resize the babylon engine when the window is resized
window.addEventListener("resize", () =>
{
  engine.resize();
});

const skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0, sideOrientation: Mesh.BACKSIDE }, scene);
const skyboxMaterial = new StandardMaterial("skyBoxMaterial", scene);
skyboxMaterial.backFaceCulling = false;

const skyboxTexture = new Texture("/src/assets/Rome_past_High.png", scene);
skyboxMaterial.reflectionTexture = skyboxTexture;
skyboxMaterial.reflectionTexture.coordinatesMode = Texture.EQUIRECTANGULAR_MODE;
skyboxMaterial.disableLighting = true;

skybox.material = skyboxMaterial;
skybox.infiniteDistance = true;

