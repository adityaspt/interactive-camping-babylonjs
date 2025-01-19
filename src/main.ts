import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, WebXRFeatureName, FreeCamera } from "@babylonjs/core";
import { MeshBuilder } from "@babylonjs/core/Meshes";
import { StandardMaterial } from "@babylonjs/core/Materials";
import { Texture } from "@babylonjs/core/Materials/Textures";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Color3 } from "@babylonjs/core/Maths/math";

import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Materials/Node/Blocks"

import { createButton } from "./sceneComponents/sceneButton";

var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

const createScene = async function (): Promise<Scene>
{
  const scene = new Scene(engine);

  // Camera
  const camera = new FreeCamera("camera", new Vector3(0, 5, -3), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);

  // Light
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.8;

  //Ground
  const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
  ground.position.y = 0;
  const groundMaterial = new StandardMaterial("groundMaterial", scene);
  //const groundTexture = new Texture("./assets/forest-ground-1024x1024.png", scene);
  groundMaterial.diffuseColor = new Color3(0.4, 0.4, 0.4);
  //groundTexture.uScale = 2; // Tile texture
  //groundTexture.vScale = 2;
  ground.material = groundMaterial;

  // Campfire (cylinder)
  const campfire = MeshBuilder.CreateCylinder("campfire", { diameter: 0.5, height: 0.25 }, scene);
  campfire.position.y = 0.25;
  const campfireMaterial = new StandardMaterial("campfireMaterial", scene);
  campfireMaterial.diffuseColor = new Color3(0.6, 0.3, 0); // Brownish color for logs
  campfire.material = campfireMaterial;

  // Skybox
  const skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0, sideOrientation: Mesh.BACKSIDE }, scene);
  const skyboxMaterial = new StandardMaterial("skyBoxMaterial", scene);
  skyboxMaterial.backFaceCulling = false;

  const skyboxTexture = new Texture("./assets/Rome_past_High.png", scene);
  skyboxMaterial.reflectionTexture = skyboxTexture;
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.EQUIRECTANGULAR_MODE;
  skyboxMaterial.disableLighting = true;

  skybox.material = skyboxMaterial;
  skybox.infiniteDistance = true;


  // Tablet
  const tablet = MeshBuilder.CreateBox("tablet", { width: 5, height: 1.15, depth: 0.85 }, scene);
  tablet.position.set(0, 0.65, -2.25);
  const tabletMaterial = new StandardMaterial("tabletMaterial", scene);
  tabletMaterial.diffuseColor = new Color3(1, 0.5, 0.8);
  tablet.material = tabletMaterial;

  createButton("button1", 0.2, 0.7, 0.02, new Color3(0, 1, 0), new Vector3(-1, 0.65, -2.25), scene);
  createButton("button2", 0.2, 0.7, 0.02, new Color3(0, 1, 0), new Vector3(1, 0.65, -2.25), scene);

  const xr = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [ground],
    uiOptions: { sessionMode: "immersive-vr" },
    optionalFeatures: ["hand-tracking"],
    disableTeleportation: true,
  });

  //Set camera to a seated position
  xr.baseExperience.camera.position = new Vector3(0, 1.5, 0);

  //Disable movement in VR
  xr.input.xrCamera.checkCollisions = false; //Prevent Collisions

  console.log("Hello from Babylon server");

  return scene;
};

createScene().then((sceneToRender) =>
{
  engine.runRenderLoop(() => sceneToRender.render());
});

window.addEventListener("resize", () =>
{
  engine.resize();
});




