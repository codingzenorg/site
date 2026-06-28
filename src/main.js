import * as THREE from "three";

const phases = [
  {
    id: "shesha",
    title: "shesha",
    kind: "canvas game",
    status: "playable",
    world: "snake garden",
    description:
      "A modernized take on the old Nibbles-style loop, drafted from memory and then refined with AI-assisted iteration.",
    href: "apps/shesha/",
    github: "https://github.com/codingzenorg/site/tree/master/apps/shesha",
    position: new THREE.Vector3(-4.4, 0.42, 2.2),
    color: 0x9cff57,
    open: true,
  },
  {
    id: "mechanics",
    title: "mechanics studies",
    kind: "prompt sketch",
    status: "planning",
    world: "prototype cliffs",
    description:
      "Short experiments that start as prompts, rough notes, and tiny playable loops before becoming full phases.",
    href: "",
    github: "https://github.com/codingzenorg/site",
    position: new THREE.Vector3(-1.35, 0.5, 0.6),
    color: 0x73ffe1,
    open: false,
  },
  {
    id: "visual-direction",
    title: "visual direction",
    kind: "ai-assisted art",
    status: "drafting",
    world: "color lagoon",
    description:
      "Palette, screen, and motion studies that shape the next prototype while preserving the codingzen green identity.",
    href: "",
    github: "https://github.com/codingzenorg/site",
    position: new THREE.Vector3(1.75, 0.52, -0.45),
    color: 0xdcff97,
    open: false,
  },
  {
    id: "build-notes",
    title: "build notes",
    kind: "tooling",
    status: "research",
    world: "signal peak",
    description:
      "Notes about what works when a human taste-checks AI output and keeps the resulting browser game playable.",
    href: "",
    github: "https://github.com/codingzenorg/site",
    position: new THREE.Vector3(4.5, 0.6, -2.05),
    color: 0xf1ffc9,
    open: false,
  },
];

const canvas = document.querySelector("#game-map");
const panel = {
  status: document.querySelector("#phase-status"),
  title: document.querySelector("#phase-title"),
  description: document.querySelector("#phase-description"),
  kind: document.querySelector("#phase-kind"),
  world: document.querySelector("#phase-world"),
  github: document.querySelector("#phase-github"),
  open: document.querySelector("#phase-open"),
};

let selectedIndex = Math.max(
  0,
  phases.findIndex((phase) => phase.id === sessionStorage.getItem("codingzen:selected-phase")),
);
const interactiveNodes = [];
const nodeGroups = [];
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07130f);
scene.fog = new THREE.Fog(0x07130f, 18, 34);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
camera.position.set(0, 9.4, 10.8);
camera.lookAt(0, 0, 0);

const hemiLight = new THREE.HemisphereLight(0xdcff97, 0x0b2519, 2.4);
scene.add(hemiLight);

const keyLight = new THREE.DirectionalLight(0xf1ffc9, 2.6);
keyLight.position.set(-5, 8, 5);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x73ffe1, 1.1);
fillLight.position.set(4, 4, -5);
scene.add(fillLight);

const terrain = new THREE.Group();
scene.add(terrain);

const lowPolyMaterial = (color, roughness = 0.9) =>
  new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0,
    flatShading: true,
  });

const grass = lowPolyMaterial(0x286b37);
const grassLight = lowPolyMaterial(0x46a54a);
const shore = lowPolyMaterial(0x184d35);
const pathMaterial = lowPolyMaterial(0xd6c77b);
const waterMaterial = new THREE.MeshStandardMaterial({
  color: 0x0b4237,
  roughness: 0.6,
  metalness: 0,
  transparent: true,
  opacity: 0.82,
  flatShading: true,
});

function createIsland() {
  const water = new THREE.Mesh(new THREE.CircleGeometry(8.2, 9), waterMaterial);
  water.rotation.x = -Math.PI / 2;
  water.position.y = -0.13;
  terrain.add(water);

  const island = new THREE.Mesh(new THREE.CylinderGeometry(6.6, 7.4, 0.56, 11), grass);
  island.scale.set(1, 1, 0.72);
  island.rotation.y = 0.2;
  island.castShadow = true;
  island.receiveShadow = true;
  terrain.add(island);

  const rim = new THREE.Mesh(new THREE.CylinderGeometry(6.9, 7.8, 0.36, 11), shore);
  rim.scale.set(1.02, 1, 0.75);
  rim.position.y = -0.28;
  rim.rotation.y = 0.2;
  rim.receiveShadow = true;
  terrain.add(rim);

  [
    [-4.8, 0.2, 3.3, 1.25],
    [-2.3, 0.22, 2.1, 0.82],
    [0.6, 0.24, 1.2, 1.05],
    [2.9, 0.28, -0.6, 1.3],
    [4.9, 0.22, -2.3, 0.9],
  ].forEach(([x, y, z, scale], index) => {
    const hill = new THREE.Mesh(new THREE.ConeGeometry(scale, scale * 0.9, 6), index % 2 ? grass : grassLight);
    hill.position.set(x, y + scale * 0.24, z);
    hill.rotation.y = index * 0.65;
    hill.scale.z = 0.72;
    hill.castShadow = true;
    hill.receiveShadow = true;
    terrain.add(hill);
  });
}

function createPath() {
  for (let i = 0; i < phases.length - 1; i += 1) {
    const start = phases[i].position;
    const end = phases[i + 1].position;
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    const path = new THREE.Mesh(new THREE.BoxGeometry(distance, 0.08, 0.34), pathMaterial);
    path.position.set(midpoint.x, 0.43, midpoint.z);
    path.rotation.y = -Math.atan2(end.z - start.z, end.x - start.x);
    path.castShadow = true;
    path.receiveShadow = true;
    terrain.add(path);
  }
}

function createPhaseNode(phase, index) {
  const group = new THREE.Group();
  group.position.copy(phase.position);
  group.userData.index = index;

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.42, 0.16, 6), lowPolyMaterial(phase.color));
  base.castShadow = true;
  base.receiveShadow = true;
  base.userData.index = index;
  group.add(base);

  const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.58, 5), lowPolyMaterial(0xe9f5ee));
  flagPole.position.set(0.1, 0.34, -0.06);
  flagPole.castShadow = true;
  group.add(flagPole);

  const flag = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.26, 3), lowPolyMaterial(phase.open ? 0x9cff57 : 0xb7d0c1));
  flag.position.set(0.23, 0.55, -0.06);
  flag.rotation.z = -Math.PI / 2;
  flag.castShadow = true;
  group.add(flag);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.48, 0.026, 5, 16),
    lowPolyMaterial(phase.open ? 0xdcff97 : 0x50685a),
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -0.03;
  ring.userData.index = index;
  group.add(ring);

  if (!phase.open) {
    const lock = new THREE.Group();
    lock.position.set(-0.18, 0.3, 0.24);
    lock.rotation.y = -0.28;

    const shackle = new THREE.Mesh(
      new THREE.TorusGeometry(0.13, 0.018, 5, 14, Math.PI),
      lowPolyMaterial(0xf1ffc9),
    );
    shackle.position.y = 0.08;
    shackle.castShadow = true;
    lock.add(shackle);

    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.13, 5), lowPolyMaterial(0xf1ffc9));
    leftLeg.position.set(-0.13, 0.03, 0);
    leftLeg.castShadow = true;
    lock.add(leftLeg);

    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 0.13;
    lock.add(rightLeg);

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.24, 0.12), lowPolyMaterial(0xb7d0c1));
    body.position.y = -0.1;
    body.castShadow = true;
    lock.add(body);

    const keyhole = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.13, 6), lowPolyMaterial(0x50685a));
    keyhole.position.set(0, -0.08, 0.065);
    keyhole.rotation.x = Math.PI / 2;
    lock.add(keyhole);

    group.add(lock);
  }

  interactiveNodes.push(base, ring);
  nodeGroups.push(group);
  terrain.add(group);
}

function createTree(x, z, scale = 1) {
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.34 * scale, 5), lowPolyMaterial(0x6c4528));
  trunk.position.set(x, 0.56, z);
  trunk.castShadow = true;
  terrain.add(trunk);

  const crown = new THREE.Mesh(new THREE.ConeGeometry(0.27 * scale, 0.62 * scale, 6), lowPolyMaterial(0x65c85d));
  crown.position.set(x, 0.9 * scale, z);
  crown.castShadow = true;
  terrain.add(crown);
}

function createAlien() {
  const alien = new THREE.Group();
  alien.scale.setScalar(0.68);
  const bodyMaterial = lowPolyMaterial(0x9cff57);
  const blushMaterial = lowPolyMaterial(0xffa8c7);
  const eyeMaterial = lowPolyMaterial(0x07130f);

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.34, 9, 7), bodyMaterial);
  body.scale.set(0.9, 1.15, 0.78);
  body.position.y = 0.42;
  body.castShadow = true;
  alien.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 9, 7), bodyMaterial);
  head.scale.set(1.05, 0.9, 0.9);
  head.position.y = 0.88;
  head.castShadow = true;
  alien.add(head);

  [
    [-0.18, 1.22, 0],
    [0.18, 1.22, 0],
  ].forEach(([x, y, z]) => {
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.024, 0.36, 5), bodyMaterial);
    antenna.position.set(x, y, z);
    antenna.rotation.z = x < 0 ? 0.4 : -0.4;
    antenna.castShadow = true;
    alien.add(antenna);

    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 7, 5), bodyMaterial);
    tip.position.set(x * 1.55, y + 0.2, z);
    tip.castShadow = true;
    alien.add(tip);
  });

  [
    [-0.14, 0.94, 0.33],
    [0.14, 0.94, 0.33],
  ].forEach(([x, y, z]) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), eyeMaterial);
    eye.scale.y = 1.35;
    eye.position.set(x, y, z);
    alien.add(eye);
  });

  [
    [-0.27, 0.8, 0.3],
    [0.27, 0.8, 0.3],
  ].forEach(([x, y, z]) => {
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.055, 7, 5), blushMaterial);
    cheek.scale.set(1.3, 0.72, 0.28);
    cheek.position.set(x, y, z);
    alien.add(cheek);
  });

  alien.position.copy(phases[selectedIndex].position).add(new THREE.Vector3(0, 0.34, 0.62));
  scene.add(alien);
  return alien;
}

createIsland();
createPath();
phases.forEach(createPhaseNode);
[
  [-5.4, 0.9, 0.9],
  [-3.3, 3.1, 0.65],
  [-0.2, 2.7, 0.8],
  [2.5, 2.2, 0.7],
  [3.6, -3.0, 0.78],
  [5.4, 0.1, 0.62],
].forEach(([x, z, scale]) => createTree(x, z, scale));

const alien = createAlien();

function setSelectedPhase(index) {
  selectedIndex = (index + phases.length) % phases.length;
  const phase = phases[selectedIndex];
  sessionStorage.setItem("codingzen:selected-phase", phase.id);

  panel.status.textContent = phase.status;
  panel.title.textContent = phase.title;
  panel.description.textContent = phase.description;
  panel.kind.textContent = phase.kind;
  panel.world.textContent = phase.world;
  panel.github.href = phase.github;
  panel.open.textContent = phase.open ? "open phase" : "phase locked";
  panel.open.href = phase.open ? phase.href : "#world-map";
  panel.open.toggleAttribute("aria-disabled", !phase.open);
  panel.open.classList.toggle("is-locked", !phase.open);

  nodeGroups.forEach((group, groupIndex) => {
    group.scale.setScalar(groupIndex === selectedIndex ? 1.12 : 0.92);
  });
}

function openSelectedPhase() {
  const phase = phases[selectedIndex];
  if (!phase.open) return;

  sessionStorage.setItem("codingzen:return-root", window.location.href.split("#")[0]);
  window.location.href = phase.href;
}

panel.open.addEventListener("click", (event) => {
  if (!phases[selectedIndex].open) {
    event.preventDefault();
    return;
  }
  sessionStorage.setItem("codingzen:return-root", window.location.href.split("#")[0]);
});

canvas.addEventListener("pointerdown", (event) => {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  const hit = raycaster.intersectObjects(interactiveNodes, false)[0];
  if (hit?.object.userData.index !== undefined) {
    setSelectedPhase(hit.object.userData.index);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    setSelectedPhase(selectedIndex + 1);
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    setSelectedPhase(selectedIndex - 1);
  }
  if (event.key === "Enter" && document.activeElement !== panel.open) {
    openSelectedPhase();
  }
});

function resize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const aspect = width / height;

  renderer.setSize(width, height, false);
  camera.aspect = aspect;
  camera.fov = aspect < 0.78 ? 58 : aspect < 1.2 ? 50 : 42;
  camera.position.set(0, aspect < 0.78 ? 12.2 : 9.8, aspect < 0.78 ? 13.4 : 11.2);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
}

function animate(time = 0) {
  const target = phases[selectedIndex].position;
  const desired = new THREE.Vector3(target.x, target.y + 0.34, target.z + 0.62);
  alien.position.lerp(desired, 0.09);
  alien.rotation.y = Math.sin(time * 0.002) * 0.18;
  alien.position.y += Math.sin(time * 0.004) * 0.006;

  nodeGroups.forEach((group, index) => {
    group.rotation.y += index === selectedIndex ? 0.012 : 0.004;
  });
  terrain.rotation.y = Math.sin(time * 0.00028) * 0.055;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);
setSelectedPhase(selectedIndex);
resize();
animate();
