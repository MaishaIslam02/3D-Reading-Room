const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
let angle = 0;

//Light
const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.position.set(40, 80, 4);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLightProbe(0xffffff, 0.6);
ambientLight.position.set(40, 80, 4);
scene.add(ambientLight);

//Floor
const tilesTexture = new THREE.TextureLoader().load("textures/pink-square-tiled-texture-background.jpg");
tilesTexture.wrapS = THREE.RepeatWrapping;
tilesTexture.wrapT = THREE.RepeatWrapping;
tilesTexture.repeat.set(15, 15);
tilesTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

let floor = new THREE.PlaneGeometry(80, 80);
const floorMaterial = new THREE.MeshStandardMaterial({
  map: tilesTexture,
});
floor = new THREE.Mesh(floor, floorMaterial);
floor.rotation.x = (-90 * Math.PI) / 180;
floor.receiveShadow = true;
scene.add(floor);

//Walls
const wallTexture = new THREE.TextureLoader().load("textures/wall.jpg");
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(4, 4);
wallTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const wallMaterial = new THREE.MeshStandardMaterial({
  map: wallTexture,
  side: THREE.DoubleSide,
});

// Back wall
let backWall = new THREE.PlaneGeometry(80, 40);
backWall = new THREE.Mesh(backWall, wallMaterial);
backWall.position.set(0, 20, -40);
backWall.rotation.y = Math.PI;
backWall.receiveShadow = true;
scene.add(backWall);

// Left wall
let leftWall = new THREE.PlaneGeometry(80, 40);
leftWall = new THREE.Mesh(leftWall, wallMaterial);
leftWall.position.set(-40, 20, 0);
leftWall.rotation.y = Math.PI / 2;
leftWall.receiveShadow = true;
scene.add(leftWall);

// Right wall
let rightWall = new THREE.PlaneGeometry(80, 40);
rightWall = new THREE.Mesh(rightWall, wallMaterial);
rightWall.position.set(40, 20, 0);
rightWall.rotation.y = -Math.PI / 2;
rightWall.receiveShadow = true;
scene.add(rightWall);



//Table
const tableTextures = [
  "textures/table (1).jpg",
  "textures/table (2).jpg",
  "textures/table (3).jpg",
  "textures/table (4).jpg",
  "textures/table (5).jpg",
];
let tableTextureNo = 4;
let tableTexture = new THREE.TextureLoader().load(tableTextures[tableTextureNo]);
tableTexture.wrapS = THREE.RepeatWrapping;
tableTexture.wrapT = THREE.RepeatWrapping;
tableTexture.repeat.set(1, 1);
tableTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const tableMaterial = new THREE.MeshStandardMaterial({
  map: tableTexture,
});

let tableTop = new THREE.BoxGeometry(24, 0.4, 14);
tableTop = new THREE.Mesh(tableTop, tableMaterial);
tableTop.position.set(0, 10, 0);
tableTop.castShadow = true;
scene.add(tableTop);

// Table Legs
let tableBottomRight = new THREE.BoxGeometry(0.6, 10, 13.9);
tableBottomRight = new THREE.Mesh(tableBottomRight, tableMaterial);
tableBottomRight.position.set(11.7, -5, 0);
tableBottomRight.castShadow = true;
tableTop.add(tableBottomRight);

let tableBottomLeft = new THREE.BoxGeometry(0.6, 10, 13.98);
tableBottomLeft = new THREE.Mesh(tableBottomLeft, tableMaterial);
tableBottomLeft.position.set(-11.7, -5, 0);
tableBottomLeft.castShadow = true;
tableTop.add(tableBottomLeft);


//Books
const bookTextures = [
  "textures/book1.jpg",
  "textures/book2.jpg",
  "textures/book3.jpg",
];

const createBook = (width, height, depth, position, textureIndex) => {
  const bookTexture = new THREE.TextureLoader().load(bookTextures[textureIndex]);
  const bookMaterial = new THREE.MeshStandardMaterial({ map: bookTexture });

  const bookGeometry = new THREE.BoxGeometry(width, height, depth);
  const book = new THREE.Mesh(bookGeometry, bookMaterial);
  book.position.set(...position);
  book.castShadow = true;
  book.receiveShadow = true;
  return book;
};

const book1 = createBook(3, 0.5, 5, [-6, 10.5, 2], 0); 
const book2 = createBook(3, 0.5, 5, [-6, 11.0, 2], 1); 
const book3 = createBook(3, 0.5, 5, [-6, 11.5, 2], 2); 

scene.add(book1);
scene.add(book2);
scene.add(book3);


// Penholder 
const penholderTexture = new THREE.TextureLoader().load("textures/metal.jpg"); 
const penholderMaterial = new THREE.MeshStandardMaterial({ map: penholderTexture });
 
const penholderGeometry = new THREE.CylinderGeometry(1, 1, 4, 32, 1, true); 
const penholder = new THREE.Mesh(penholderGeometry, penholderMaterial);
penholder.position.set(0, 12, -4); 
penholder.castShadow = true;
penholder.receiveShadow = true;
scene.add(penholder);

const penTexture = new THREE.TextureLoader().load("textures/plastic.jpg"); 
const penMaterial = new THREE.MeshStandardMaterial({ map: penTexture });

const createPen = (position, rotation) => {
  const penGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 32); 
  const pen = new THREE.Mesh(penGeometry, penMaterial);
  pen.position.set(...position);
  pen.rotation.set(...rotation);
  pen.castShadow = true;
  pen.receiveShadow = true;
  return pen;
};

const pen1 = createPen([0.5, 13, -4], [Math.PI / 8, 0, 0]); 
const pen2 = createPen([-0.5, 13, -4], [Math.PI / 6, 0, 0]); 
const pen3 = createPen([0, 13, -4], [0, 0, 0]); 

scene.add(pen1);
scene.add(pen2);
scene.add(pen3);

// Chair
const chairSeatTexture = new THREE.TextureLoader().load("textures/chair.jpg");
const chairSeatMaterial = new THREE.MeshStandardMaterial({
  map: chairSeatTexture,
});


//  chair seat
const seatGeometry = new THREE.BoxGeometry(8, 0.5, 8); 
const seat = new THREE.Mesh(seatGeometry, chairSeatMaterial);
seat.position.set(0, 7, 15); 
seat.castShadow = true;
scene.add(seat);

// Chair Legs
const chairLegTexture = new THREE.TextureLoader().load("textures/chair.jpg");
const chairLegMaterial = new THREE.MeshStandardMaterial({
  map: chairLegTexture,
});

const legGeometry = new THREE.CylinderGeometry(0.3, 0.3, 7, 32);
const leg1 = new THREE.Mesh(legGeometry, chairLegMaterial);
leg1.position.set(-3, 3.5, 15); 
leg1.castShadow = true;
scene.add(leg1);

const leg2 = new THREE.Mesh(legGeometry, chairLegMaterial);
leg2.position.set(3, 3.5, 15); 
leg2.castShadow = true;
scene.add(leg2);

//Camera
const camera = new THREE.PerspectiveCamera(
  60,
  sizes.width / sizes.height,
  1,
  100
);
camera.position.set(0, 20, 30);
camera.lookAt(0, 10, 0);
scene.add(camera);

// Orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setClearColor(0x0, 1);
renderer.clear();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  renderer.render(scene, camera);

  // Rotate light
  pointLight.position.x = Math.sin(angle) * 40;
  pointLight.position.z = Math.cos(angle) * 40;
  angle += 0.01;

  requestAnimationFrame(loop);
};

loop();

// On click Texture
addEventListener("click", (event) => {
  tableTextureNo = (tableTextureNo + 1) % tableTextures.length;
  tableTexture.dispose();
  tableTexture = new THREE.TextureLoader().load(tableTextures[tableTextureNo]);
  tableMaterial.map = tableTexture;
});
