// handTracking.onHandAddedObservable.add((hand) => {
//     console.log("Hand added:", hand);
// });

// handTracking.onHandRemovedObservable.add((hand) => {
//     console.log("Hand removed:", hand);
// });

// // Check for collisions
// scene.onBeforeRenderObservable.add(() => {
//     handTracking.trackedHands.forEach((hand) => {
//         const indexTip = hand.getJointMesh("index-finger-tip");
//         if (indexTip) {
//             if (indexTip.intersectsMesh(button1, true)) {
//                 button1.material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Turn red on press
//                 console.log("Button 1 Pressed!");
//             } else {
//                 button1.material.diffuseColor = new BABYLON.Color3(0.2, 0.7, 0.2); // Reset to green
//             }
//             if (indexTip.intersectsMesh(button2, true)) {
//                 button2.material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Turn red on press
//                 console.log("Button 2 Pressed!");
//             } else {
//                 button2.material.diffuseColor = new BABYLON.Color3(0.2, 0.7, 0.2); // Reset to green
//             }
//         }
//     });
// });
