import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight } from "@babylonjs/core";
import { MeshBuilder } from "@babylonjs/core/Meshes";
import { StandardMaterial } from "@babylonjs/core/Materials";
import { Texture } from "@babylonjs/core/Materials/Textures";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Color3 } from "@babylonjs/core/Maths/math";

import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Materials/Node/Blocks"

var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

const createScene = async function (): Promise<Scene>
{
  const scene = new Scene(engine);

  // Camera
  const camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 5, new Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = camera.upperRadiusLimit = 10; // Lock distance from the center

  // Light
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.8;

  //Ground
  const ground = MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);
  const groundMaterial = new StandardMaterial("groundMaterial", scene);
  const groundTexture = new Texture("./assets/forest-ground-1024x1024.png", scene);
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

  const xr = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [ground],
    optionalFeatures: true,
    //disableDefaultUI: false,
    disableTeleportation: true,
  });

  //Set camera to a seated position
  xr.baseExperience.camera.position = new Vector3(0, 1.5, 0);

  //Disable movement in VR
  xr.input.xrCamera.checkCollisions = false; //Prevent Collisions
 
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




