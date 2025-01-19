import { MeshBuilder, StandardMaterial, Color3, Scene, Vector3 } from "@babylonjs/core";

// Buttons
const createButton = (name: string, width: number, height: number, depth: number, color: Color3, position: Vector3, scene: Scene) =>
{
    const button = MeshBuilder.CreateBox(name, { width: width, height: height, depth: depth }, scene);
    button.position = position;
    const buttonMaterial = new StandardMaterial(`${name}Material`, scene);
    buttonMaterial.diffuseColor = color; // Green button
    button.material = buttonMaterial;
    return button;
};

export { createButton };