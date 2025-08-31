// import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
// import { gsap } from "https://cdn.skypack.dev/gsap";

// const container3D = document.getElementById("container3D");
// if (!container3D) {
//   console.warn("#container3D not found.");
// } else {
//   const camera = new THREE.PerspectiveCamera(
//     50,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   camera.position.z = 25;

//   const scene = new THREE.Scene();
//   let bee, mixer;

//   // Load bee
//   const loader = new GLTFLoader();
//   loader.load(
//     "https://raw.githubusercontent.com/DennysDionigi/bee-glb/94253437c023643dd868592e11a0fd2c228cfe07/demon_bee_full_texture.glb",
//     (gltf) => {
//       bee = gltf.scene;
//       bee.scale.set(0.8, 0.8, 0.8);

//       bee.position.set(-24, 0, 0);
//       bee.visible = false; //  hidden by default
//       scene.add(bee);

//       if (gltf.animations?.length) {
//         mixer = new THREE.AnimationMixer(bee);
//         mixer.clipAction(gltf.animations[0]).play();
//       }

//       bee.rotation.y = Math.PI;
//       hoverMovement();
//     },
//     (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
//     (error) => console.error("Bee load error:", error)
//   );

//   // Renderer
//   const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   container3D.appendChild(renderer.domElement);

//   // Lights
//   scene.add(new THREE.AmbientLight(0xffffff, 1.2));
//   const dir = new THREE.DirectionalLight(0xffffff, 1);
//   dir.position.set(500, 500, 500);
//   scene.add(dir);

//   // Animation loop
//   const clock = new THREE.Clock();
//   function animate() {
//     requestAnimationFrame(animate);
//     if (mixer) mixer.update(clock.getDelta());

//     if (bee) bee.lookAt(camera.position);

//     renderer.render(scene, camera);
//   }
//   animate();

//   // Hover movement
//   function hoverMovement() {
//     if (!bee) return;
//     const minX = -27, maxX = -18, minY = -3, maxY = 3, minZ = -1, maxZ = 1;

//     function moveNext() {
//       if (!bee) return;
//       const targetX = Math.random() * (maxX - minX) + minX;
//       const targetY = Math.random() * (maxY - minY) + minY;
//       const targetZ = Math.random() * (maxZ - minZ) + minZ;

//       gsap.to(bee.position, {
//         x: targetX,
//         y: targetY,
//         z: targetZ,
//         duration: 2 + Math.random() * 1.5,
//         ease: "power1.inOut",
//         onComplete: moveNext
//       });
//     }

//     moveNext();
//   }

//   // Toggle listener
//   const toggle = document.getElementById("beeToggle");
//   if (toggle) {
//     toggle.addEventListener("change", (e) => {
//       if (bee) {
//         bee.visible = e.target.checked; // show when ON, hide when OFF
//       }
//     });
//   }

//   // Resize
//   window.addEventListener("resize", () => {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//   });
// }



// import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
// import { gsap } from "https://cdn.skypack.dev/gsap";

// // Camera
// const camera = new THREE.PerspectiveCamera(
//   15,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.z = 15;

// // Scene
// const scene = new THREE.Scene();
// let bee, mixer;
// const loader = new GLTFLoader();

// // Load Model
// loader.load(
//   "https://raw.githubusercontent.com/DennysDionigi/bee-glb/94253437c023643dd868592e11a0fd2c228cfe07/demon_bee_full_texture.glb",
//   (gltf) => {
//     bee = gltf.scene;
//     bee.scale.set(0.2, 0.2, 0.2);

//     // ✅ Show bee immediately if toggle is ON
//     const toggle = document.getElementById("beeToggle");
//     bee.visible = toggle?.checked ?? true;

//     scene.add(bee);

//     if (gltf.animations?.length) {
//       mixer = new THREE.AnimationMixer(bee);
//       mixer.clipAction(gltf.animations[0]).play();
//     }

//     // Start flying loop
//     flyAround();
//   },
//   undefined,
//   (err) => console.error("Error loading model:", err)
// );

// // Renderer
// const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById("container3D").appendChild(renderer.domElement);

// // Lights
// scene.add(new THREE.AmbientLight(0xffffff, 1.3));
// const topLight = new THREE.DirectionalLight(0xffffff, 1);
// topLight.position.set(500, 500, 500);
// scene.add(topLight);

// // Render loop
// const clock = new THREE.Clock();
// const animate = () => {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
//   if (mixer) mixer.update(clock.getDelta());

//   if (bee && bee.visible) {
//     bee.lookAt(camera.position); // bee always faces camera
//   }
// };
// animate();

// // Get visible area boundaries (so bee never leaves screen)
// function getScreenBounds() {
//   const distance = camera.position.z - 0; // bee is near z=0
//   const vFOV = (camera.fov * Math.PI) / 180; // radians
//   const height = 2 * Math.tan(vFOV / 2) * distance;
//   const width = height * camera.aspect;

//   return {
//     minX: -width / 2 + 1,
//     maxX: width / 2 - 1,
//     minY: -height / 2 + 1,
//     maxY: height / 2 - 1,
//     minZ: -5,
//     maxZ: 5,
//   };
// }

// // Random flying within screen bounds
// function flyAround() {
//   if (!bee) return;
//   const bounds = getScreenBounds();

//   const x = THREE.MathUtils.randFloat(bounds.minX, bounds.maxX);
//   const y = THREE.MathUtils.randFloat(bounds.minY, bounds.maxY);
//   const z = THREE.MathUtils.randFloat(bounds.minZ, bounds.maxZ);

//   gsap.to(bee.position, {
//     x,
//     y,
//     z,
//     // duration: 4.5, //  slower movement for natural feel
//     duration: 5.5,
//     ease: "power1.inOut",
//     onComplete: flyAround,
//   });

//   gsap.to(bee.rotation, {
//     x: THREE.MathUtils.randFloat(-0.5, 0.5),
//     y: THREE.MathUtils.randFloat(-1, 1),
//     z: THREE.MathUtils.randFloat(-0.2, 0.2),
//     // duration: 3.5, //  rotation smoother
//     duration: 4.5,
//     ease: "sine.inOut",
//   });
// }

// // ✅ Toggle ON/OFF
// const toggle = document.getElementById("beeToggle");
// if (toggle) {
//   toggle.addEventListener("change", (e) => {
//     if (bee) {
//       bee.visible = e.target.checked;
//     }
//   });
// }

// // Resize
// window.addEventListener("resize", () => {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// });




// import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
// import { gsap } from "https://cdn.skypack.dev/gsap";

// // Camera
// const camera = new THREE.PerspectiveCamera(
//   15,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.z = 15;

// // Scene
// const scene = new THREE.Scene();
// let bee, mixer;
// const loader = new GLTFLoader();

// // Load Model
// loader.load(
//   "https://raw.githubusercontent.com/DennysDionigi/bee-glb/94253437c023643dd868592e11a0fd2c228cfe07/demon_bee_full_texture.glb",
//   (gltf) => {
//     bee = gltf.scene;
//     bee.scale.set(0.2, 0.2, 0.2);

//     // ✅ Show bee immediately if toggle is ON
//     const toggle = document.getElementById("beeToggle");
//     bee.visible = toggle?.checked ?? true;

//     scene.add(bee);

//     if (gltf.animations?.length) {
//       mixer = new THREE.AnimationMixer(bee);
//       mixer.clipAction(gltf.animations[0]).play();
//     }

//     // Start flying loop
//     flyAround();
//   },
//   undefined,
//   (err) => console.error("Error loading model:", err)
// );

// // Renderer
// const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById("container3D").appendChild(renderer.domElement);

// // Lights
// scene.add(new THREE.AmbientLight(0xffffff, 1.3));
// const topLight = new THREE.DirectionalLight(0xffffff, 1);
// topLight.position.set(500, 500, 500);
// scene.add(topLight);

// // Render loop
// const clock = new THREE.Clock();
// const animate = () => {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
//   if (mixer) mixer.update(clock.getDelta());
// };
// animate();

// // Get visible area boundaries (so bee never leaves screen)
// function getScreenBounds() {
//   const distance = camera.position.z - 0; // bee is near z=0
//   const vFOV = (camera.fov * Math.PI) / 180; // radians
//   const height = 2 * Math.tan(vFOV / 2) * distance;
//   const width = height * camera.aspect;

//   return {
//     minX: -width / 2 + 1,
//     maxX: width / 2 - 1,
//     minY: -height / 2 + 1,
//     maxY: height / 2 - 1,
//     minZ: -5,
//     maxZ: 5,
//   };
// }

// // Random flying within screen bounds
// function flyAround() {
//   if (!bee) return;
//   const bounds = getScreenBounds();

//   const x = THREE.MathUtils.randFloat(bounds.minX, bounds.maxX);
//   const y = THREE.MathUtils.randFloat(bounds.minY, bounds.maxY);
//   const z = THREE.MathUtils.randFloat(bounds.minZ, bounds.maxZ);

//   gsap.to(bee.position, {
//     x,
//     y,
//     z,
//     duration: 5.5,
//     ease: "power1.inOut",
//     onComplete: flyAround,
//   });
  

//   // Bee rotates naturally (not locked to camera)
//   gsap.to(bee.rotation, {
//     x: THREE.MathUtils.randFloat(-0.3, 0.3),
//     y: THREE.MathUtils.randFloat(-1.5, 1.5),
//     z: THREE.MathUtils.randFloat(-0.2, 0.2),
//     duration: 4.5,
//     ease: "sine.inOut",
//   });
// }

// // Toggle ON/OFF
// const toggle = document.getElementById("beeToggle");
// if (toggle) {
//   toggle.addEventListener("change", (e) => {
//     if (bee) {
//       bee.visible = e.target.checked;
//     }
//   });
// }

// // Resize
// window.addEventListener("resize", () => {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// });



import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "https://cdn.skypack.dev/gsap";

// Camera
const camera = new THREE.PerspectiveCamera(
  15,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 15;

// Scene
const scene = new THREE.Scene();
let bee, mixer;
const loader = new GLTFLoader();

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 1.3));
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// Clock
const clock = new THREE.Clock();

// Render loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if (mixer) mixer.update(clock.getDelta());
};
animate();

// Get visible area boundaries (so bee never leaves screen)
function getScreenBounds() {
  const distance = camera.position.z - 0; // bee is near z=0
  const vFOV = (camera.fov * Math.PI) / 180; // radians
  const height = 2 * Math.tan(vFOV / 2) * distance;
  const width = height * camera.aspect;

  return {
    minX: -width / 2 + 1,
    maxX: width / 2 - 1,
    minY: -height / 2 + 1,
    maxY: height / 2 - 1,
    minZ: -5,
    maxZ: 5,
  };
}

// Random flying within screen bounds
function flyAround() {
  if (!bee) return;
  const bounds = getScreenBounds();

  const x = THREE.MathUtils.randFloat(bounds.minX, bounds.maxX);
  const y = THREE.MathUtils.randFloat(bounds.minY, bounds.maxY);
  const z = THREE.MathUtils.randFloat(bounds.minZ, bounds.maxZ);

  gsap.to(bee.position, {
    x: THREE.MathUtils.clamp(x, bounds.minX, bounds.maxX),
    y: THREE.MathUtils.clamp(y, bounds.minY, bounds.maxY),
    z: THREE.MathUtils.clamp(z, bounds.minZ, bounds.maxZ),
    duration: 5.5,
    ease: "power1.inOut",
    onComplete: flyAround,
  });

  // Bee rotates naturally
  gsap.to(bee.rotation, {
    x: THREE.MathUtils.randFloat(-0.3, 0.3),
    y: THREE.MathUtils.randFloat(-1.5, 1.5),
    z: THREE.MathUtils.randFloat(-0.2, 0.2),
    duration: 4.5,
    ease: "sine.inOut",
  });
}

// Load Model
loader.load(
  "https://raw.githubusercontent.com/DennysDionigi/bee-glb/94253437c023643dd868592e11a0fd2c228cfe07/demon_bee_full_texture.glb",
  (gltf) => {
    bee = gltf.scene;
    bee.scale.set(0.25, 0.25, 0.25);

    //  Show bee immediately if toggle is ON
    const toggle = document.getElementById("beeToggle");
    bee.visible = toggle?.checked ?? true;

    //  Start position: right edge of screen, random Y/Z
    const bounds = getScreenBounds();
    bee.position.set(
      bounds.maxX, // always from right edge
      THREE.MathUtils.randFloat(bounds.minY, bounds.maxY),
      THREE.MathUtils.randFloat(bounds.minZ, bounds.maxZ)
    );

    scene.add(bee);

    if (gltf.animations?.length) {
      mixer = new THREE.AnimationMixer(bee);
      mixer.clipAction(gltf.animations[0]).play();
    }

    // Start flying loop
    flyAround();
  },
  undefined,
  (err) => console.error("Error loading model:", err)
);

// Toggle ON/OFF
const toggle = document.getElementById("beeToggle");

// Ensure bee is visible by default
if (typeof bee !== "undefined" && bee) {
  bee.visible = true; // Bee flies by default
}

// Listen for toggle changes
if (toggle) {
  toggle.addEventListener("change", (e) => {
    if (typeof bee !== "undefined" && bee) {
      bee.visible = e.target.checked; // Show/hide bee based on toggle
      console.log("Bee visibility:", bee.visible);
    }
  });
}


// Resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
