//COLORS
var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  brownDark: 0x23190f,
  pink: 0xf5986e,
  yellow: 0xf4ce93,
  blue: 0x68c3c0,
  purple: 0x800080,
  orange: 0xff5733,
  diamond: 0x9ac5db,
  golden: 0xdaa520,
}

///////////////

// GAME VARIABLES
var game
var deltaTime = 0
var newTime = new Date().getTime()
var oldTime = new Date().getTime()
var ennemiesPool = []
var giftCoinPool = []
var rareGiftCoinPool = []
var particlesPool = []
var particlesInUse = []
let intervalID = null
var eventArr = []
var collectedCoins = 0
var redBallCrashCount = 0
var inGameTimeInterval = null
var inGameTime = 0 // in ms
// let transactionIDs = []

// EVENT
const transactionsEvent = new Event('transactions')

// FPS
// var filterStrength = 50;
// var frameTime = 0, lastLoop = new Date, thisLoop;

function resetGame() {
  redBallCrashCount = 0
  collectedCoins = 0
  inGameTime = 0
  // transactionIDs = []
  game = {
    speed: 0,
    initSpeed: 0.00035,
    baseSpeed: 0.00035,
    targetBaseSpeed: 0.00035,
    incrementSpeedByTime: 0.0000025,
    incrementSpeedByLevel: 0.000005,
    distanceForSpeedUpdate: 100,
    speedLastUpdate: 0,

    distance: 0,
    ratioSpeedDistance: 50,
    energy: 100,
    ratioSpeedEnergy: 3,

    level: 1,
    levelLastUpdate: 0,
    distanceForLevelUpdate: 1000,

    planeDefaultHeight: 100,
    planeAmpHeight: 80,
    planeAmpWidth: 75,
    planeMoveSensivity: 0.005,
    planeRotXSensivity: 0.0008,
    planeRotZSensivity: 0.0004,
    planeFallSpeed: 0.001,
    planeMinSpeed: 1.2,
    planeMaxSpeed: 1.6,
    planeSpeed: 0,
    planeCollisionDisplacementX: 0,
    planeCollisionSpeedX: 0,

    planeCollisionDisplacementY: 0,
    planeCollisionSpeedY: 0,

    seaRadius: 600,
    seaLength: 800,
    //seaRotationSpeed:0.006,
    wavesMinAmp: 5,
    wavesMaxAmp: 20,
    wavesMinSpeed: 0.001,
    wavesMaxSpeed: 0.003,

    cameraFarPos: 500,
    cameraNearPos: 150,
    cameraSensivity: 0.002,

    coinDistanceTolerance: 15,
    coinValue: 3,
    coinsSpeed: 0.5,
    coinLastSpawn: 0,
    distanceForCoinsSpawn: 100,

    ennemyDistanceTolerance: 10,
    ennemyValue: 10,
    ennemiesSpeed: 0.6,
    ennemyLastSpawn: 0,
    distanceForEnnemiesSpawn: 50,

    giftCoinDistanceTolerance: 10,
    giftCoinValue: 10,
    giftCoinsSpeed: 0.8,
    giftCoinLastSpawn: 0,
    distanceForGiftCoinSpawn: Math.floor(Math.random() * (18000 - 3600) + 3600),

    rareGiftCoinDistanceTolerance: 10,
    rareGiftCoinValue: 10,
    rareGiftCoinsSpeed: 0.8,
    rareGiftCoinLastSpawn: 0,
    distanceForRareGiftCoinSpawn: Math.floor(
      Math.random() * (108000 - 18000) + 18000,
    ),

    status: 'playing',
  }

  fieldLevel.innerHTML = Math.floor(game.level)

  transactionNumber.innerHTML = 0
  window.clearInterval(intervalID)
  window.clearInterval(inGameTimeInterval)

  intervalID = setInterval(() => {
    const data = []
    eventArr.forEach((e) => {
      data.push({
        notes: [
          'Vaionex',
          'gaming',
          'The Aviator: The Game',
          game.distance,
          game.energy,
          game.level,
          collectedCoins,
          redBallCrashCount,
          inGameTime,
          // btoa(`Overlap: ${game.distance}, Energy: ${game.energy}, Level: ${game.level}`)
        ],
      })
    })
    sendPost(data)
  }, 2000)
}

//THREEJS RELATED VARIABLES

var scene,
  camera,
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane,
  renderer,
  container,
  controls

//SCREEN & MOUSE VARIABLES

var HEIGHT,
  WIDTH,
  mousePos = { x: 0, y: 0 }

// ANIMATE COUNTER

function animateValue(obj, start, end, duration) {
  let startTimestamp = null
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    obj.innerHTML = Math.floor(progress * (end - start) + start)

    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

// API CALL

function sendPost(data) {
  eventArr = []
  axios
    .post('/v1/post', {
      dataArray: data,
    })
    .then((res) => {
      // transactionIDs = [...transactionIDs, ...res.data?.data?.txIds]
      // console.log("🚀 ~ file: game.js ~ line 199 ~ sendPost ~ isDisplay", isDisplay)
      if (isDisplay) {
        transactionsEvent.data = res.data?.data?.txIds
        document.dispatchEvent(transactionsEvent)
      }
      const start = parseInt(transactionNumber.innerHTML)
      const end =
        parseInt(transactionNumber.innerHTML) + res.data?.data?.txIds?.length
      const dur = 2000
      animateValue(transactionNumber, start, end, dur)
      transactionNumber.innerHTML =
        parseInt(transactionNumber.innerHTML) + res.data?.data?.txIds?.length
    })
    .catch((err) => console.error(err))
}

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene() {
  HEIGHT = window.innerHeight - 88
  WIDTH = window.innerWidth

  scene = new THREE.Scene()
  aspectRatio = WIDTH / HEIGHT
  fieldOfView = 50
  nearPlane = 0.1
  farPlane = 10000
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
  )
  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)
  camera.position.x = 0
  camera.position.z = 200
  camera.position.y = game.planeDefaultHeight
  //camera.lookAt(new THREE.Vector3(0, 400, 0));

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(WIDTH, HEIGHT)

  renderer.shadowMap.enabled = true

  container = document.getElementById('world')
  container.appendChild(renderer.domElement)

  window.addEventListener('resize', handleWindowResize, false)

  /*
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minPolarAngle = -Math.PI / 2;
  controls.maxPolarAngle = Math.PI ;

  //controls.noZoom = true;
  //controls.noPan = true;
  //*/
}

// MOUSE AND SCREEN EVENTS

function handleWindowResize() {
  HEIGHT = window.innerHeight
  WIDTH = window.innerWidth
  renderer.setSize(WIDTH, HEIGHT)
  camera.aspect = WIDTH / HEIGHT
  camera.updateProjectionMatrix()
}

function handleMouseMove(event) {
  var tx = -1 + (event.clientX / WIDTH) * 2
  var ty = 1 - (event.clientY / HEIGHT) * 2
  mousePos = { x: tx, y: ty }
}

function handleTouchMove(event) {
  event.preventDefault()
  var tx = -1 + (event.touches[0].pageX / WIDTH) * 2
  var ty = 1 - (event.touches[0].pageY / HEIGHT) * 2
  mousePos = { x: tx, y: ty }
}

function handleMouseUp(event) {
  if (game.status == 'waitingReplay') {
    resetGame()
    hideReplay()
  }
}

function handleTouchEnd(event) {
  if (game.status == 'waitingReplay') {
    resetGame()
    hideReplay()
  }
}

// LIGHTS

var ambientLight, hemisphereLight, shadowLight

function createLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)

  ambientLight = new THREE.AmbientLight(0xdc8874, 0.5)

  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)
  shadowLight.position.set(150, 350, 350)
  shadowLight.castShadow = true
  shadowLight.shadow.camera.left = -400
  shadowLight.shadow.camera.right = 400
  shadowLight.shadow.camera.top = 400
  shadowLight.shadow.camera.bottom = -400
  shadowLight.shadow.camera.near = 1
  shadowLight.shadow.camera.far = 1000
  shadowLight.shadow.mapSize.width = 4096
  shadowLight.shadow.mapSize.height = 4096

  var ch = new THREE.CameraHelper(shadowLight.shadow.camera)

  //scene.add(ch);
  scene.add(hemisphereLight)
  scene.add(shadowLight)
  scene.add(ambientLight)
}

var Pilot = function () {
  this.mesh = new THREE.Object3D()
  this.mesh.name = 'pilot'
  this.angleHairs = 0

  var bodyGeom = new THREE.BoxGeometry(15, 15, 15)
  var bodyMat = new THREE.MeshPhongMaterial({
    color: Colors.brown,
    shading: THREE.FlatShading,
  })
  var body = new THREE.Mesh(bodyGeom, bodyMat)
  body.position.set(2, -12, 0)

  this.mesh.add(body)

  var faceGeom = new THREE.BoxGeometry(10, 10, 10)
  var faceMat = new THREE.MeshLambertMaterial({ color: Colors.pink })
  var face = new THREE.Mesh(faceGeom, faceMat)
  this.mesh.add(face)

  var hairGeom = new THREE.BoxGeometry(4, 4, 4)
  var hairMat = new THREE.MeshLambertMaterial({ color: Colors.brown })
  var hair = new THREE.Mesh(hairGeom, hairMat)
  hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 2, 0))
  var hairs = new THREE.Object3D()

  this.hairsTop = new THREE.Object3D()

  for (var i = 0; i < 12; i++) {
    var h = hair.clone()
    var col = i % 3
    var row = Math.floor(i / 3)
    var startPosZ = -4
    var startPosX = -4
    h.position.set(startPosX + row * 4, 0, startPosZ + col * 4)
    h.geometry.applyMatrix(new THREE.Matrix4().makeScale(1, 1, 1))
    this.hairsTop.add(h)
  }
  hairs.add(this.hairsTop)

  var hairSideGeom = new THREE.BoxGeometry(12, 4, 2)
  hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6, 0, 0))
  var hairSideR = new THREE.Mesh(hairSideGeom, hairMat)
  var hairSideL = hairSideR.clone()
  hairSideR.position.set(8, -2, 6)
  hairSideL.position.set(8, -2, -6)
  hairs.add(hairSideR)
  hairs.add(hairSideL)

  var hairBackGeom = new THREE.BoxGeometry(2, 8, 10)
  var hairBack = new THREE.Mesh(hairBackGeom, hairMat)
  hairBack.position.set(-1, -4, 0)
  hairs.add(hairBack)
  hairs.position.set(-5, 5, 0)

  this.mesh.add(hairs)

  var glassGeom = new THREE.BoxGeometry(5, 5, 5)
  var glassMat = new THREE.MeshLambertMaterial({ color: Colors.brown })
  var glassR = new THREE.Mesh(glassGeom, glassMat)
  glassR.position.set(6, 0, 3)
  var glassL = glassR.clone()
  glassL.position.z = -glassR.position.z

  var glassAGeom = new THREE.BoxGeometry(11, 1, 11)
  var glassA = new THREE.Mesh(glassAGeom, glassMat)
  this.mesh.add(glassR)
  this.mesh.add(glassL)
  this.mesh.add(glassA)

  var earGeom = new THREE.BoxGeometry(2, 3, 2)
  var earL = new THREE.Mesh(earGeom, faceMat)
  earL.position.set(0, 0, -6)
  var earR = earL.clone()
  earR.position.set(0, 0, 6)
  this.mesh.add(earL)
  this.mesh.add(earR)
}

Pilot.prototype.updateHairs = function () {
  //*
  var hairs = this.hairsTop.children

  var l = hairs.length
  for (var i = 0; i < l; i++) {
    var h = hairs[i]
    h.scale.y = 0.75 + Math.cos(this.angleHairs + i / 3) * 0.25
  }
  this.angleHairs += game.speed * deltaTime * 40
  //*/
}

var AirPlane = function () {
  this.mesh = new THREE.Object3D()
  this.mesh.name = 'airPlane'

  // Cabin

  var geomCabin = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1)
  var matCabin = new THREE.MeshPhongMaterial({
    color: Colors.red,
    shading: THREE.FlatShading,
  })

  geomCabin.vertices[4].y -= 10
  geomCabin.vertices[4].z += 20
  geomCabin.vertices[5].y -= 10
  geomCabin.vertices[5].z -= 20
  geomCabin.vertices[6].y += 30
  geomCabin.vertices[6].z += 20
  geomCabin.vertices[7].y += 30
  geomCabin.vertices[7].z -= 20

  var cabin = new THREE.Mesh(geomCabin, matCabin)
  cabin.castShadow = true
  cabin.receiveShadow = true
  this.mesh.add(cabin)

  // Engine

  var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1)
  var matEngine = new THREE.MeshPhongMaterial({
    color: Colors.white,
    shading: THREE.FlatShading,
  })
  var engine = new THREE.Mesh(geomEngine, matEngine)
  engine.position.x = 50
  engine.castShadow = true
  engine.receiveShadow = true
  this.mesh.add(engine)

  // Tail Plane

  var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1)
  var matTailPlane = new THREE.MeshPhongMaterial({
    color: Colors.red,
    shading: THREE.FlatShading,
  })
  var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane)
  tailPlane.position.set(-40, 20, 0)
  tailPlane.castShadow = true
  tailPlane.receiveShadow = true
  this.mesh.add(tailPlane)

  // Wings

  var geomSideWing = new THREE.BoxGeometry(30, 5, 120, 1, 1, 1)
  var matSideWing = new THREE.MeshPhongMaterial({
    color: Colors.red,
    shading: THREE.FlatShading,
  })
  var sideWing = new THREE.Mesh(geomSideWing, matSideWing)
  sideWing.position.set(0, 15, 0)
  sideWing.castShadow = true
  sideWing.receiveShadow = true
  this.mesh.add(sideWing)

  var geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1)
  var matWindshield = new THREE.MeshPhongMaterial({
    color: Colors.white,
    transparent: true,
    opacity: 0.3,
    shading: THREE.FlatShading,
  })
  var windshield = new THREE.Mesh(geomWindshield, matWindshield)
  windshield.position.set(5, 27, 0)

  windshield.castShadow = true
  windshield.receiveShadow = true

  this.mesh.add(windshield)

  var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1)
  geomPropeller.vertices[4].y -= 5
  geomPropeller.vertices[4].z += 5
  geomPropeller.vertices[5].y -= 5
  geomPropeller.vertices[5].z -= 5
  geomPropeller.vertices[6].y += 5
  geomPropeller.vertices[6].z += 5
  geomPropeller.vertices[7].y += 5
  geomPropeller.vertices[7].z -= 5
  var matPropeller = new THREE.MeshPhongMaterial({
    color: Colors.brown,
    shading: THREE.FlatShading,
  })
  this.propeller = new THREE.Mesh(geomPropeller, matPropeller)

  this.propeller.castShadow = true
  this.propeller.receiveShadow = true

  var geomBlade = new THREE.BoxGeometry(1, 80, 10, 1, 1, 1)
  var matBlade = new THREE.MeshPhongMaterial({
    color: Colors.brownDark,
    shading: THREE.FlatShading,
  })
  var blade1 = new THREE.Mesh(geomBlade, matBlade)
  blade1.position.set(8, 0, 0)

  blade1.castShadow = true
  blade1.receiveShadow = true

  var blade2 = blade1.clone()
  blade2.rotation.x = Math.PI / 2

  blade2.castShadow = true
  blade2.receiveShadow = true

  this.propeller.add(blade1)
  this.propeller.add(blade2)
  this.propeller.position.set(60, 0, 0)
  this.mesh.add(this.propeller)

  var wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1)
  var wheelProtecMat = new THREE.MeshPhongMaterial({
    color: Colors.red,
    shading: THREE.FlatShading,
  })
  var wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat)
  wheelProtecR.position.set(25, -20, 25)
  this.mesh.add(wheelProtecR)

  var wheelTireGeom = new THREE.BoxGeometry(24, 24, 4)
  var wheelTireMat = new THREE.MeshPhongMaterial({
    color: Colors.brownDark,
    shading: THREE.FlatShading,
  })
  var wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat)
  wheelTireR.position.set(25, -28, 25)

  var wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6)
  var wheelAxisMat = new THREE.MeshPhongMaterial({
    color: Colors.brown,
    shading: THREE.FlatShading,
  })
  var wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat)
  wheelTireR.add(wheelAxis)

  this.mesh.add(wheelTireR)

  var wheelProtecL = wheelProtecR.clone()
  wheelProtecL.position.z = -wheelProtecR.position.z
  this.mesh.add(wheelProtecL)

  var wheelTireL = wheelTireR.clone()
  wheelTireL.position.z = -wheelTireR.position.z
  this.mesh.add(wheelTireL)

  var wheelTireB = wheelTireR.clone()
  wheelTireB.scale.set(0.5, 0.5, 0.5)
  wheelTireB.position.set(-35, -5, 0)
  this.mesh.add(wheelTireB)

  var suspensionGeom = new THREE.BoxGeometry(4, 20, 4)
  suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0))
  var suspensionMat = new THREE.MeshPhongMaterial({
    color: Colors.red,
    shading: THREE.FlatShading,
  })
  var suspension = new THREE.Mesh(suspensionGeom, suspensionMat)
  suspension.position.set(-35, -5, 0)
  suspension.rotation.z = -0.3
  this.mesh.add(suspension)

  this.pilot = new Pilot()
  this.pilot.mesh.position.set(-10, 27, 0)
  this.mesh.add(this.pilot.mesh)

  this.mesh.castShadow = true
  this.mesh.receiveShadow = true
}

Sky = function () {
  this.mesh = new THREE.Object3D()
  this.nClouds = 20
  this.clouds = []
  var stepAngle = (Math.PI * 2) / this.nClouds
  for (var i = 0; i < this.nClouds; i++) {
    var c = new Cloud()
    this.clouds.push(c)
    var a = stepAngle * i
    var h = game.seaRadius + 150 + Math.random() * 200
    c.mesh.position.y = Math.sin(a) * h
    c.mesh.position.x = Math.cos(a) * h
    c.mesh.position.z = -300 - Math.random() * 500
    c.mesh.rotation.z = a + Math.PI / 2
    var s = 1 + Math.random() * 2
    c.mesh.scale.set(s, s, s)
    this.mesh.add(c.mesh)
  }
}

Sky.prototype.moveClouds = function () {
  for (var i = 0; i < this.nClouds; i++) {
    var c = this.clouds[i]
    c.rotate()
  }
  this.mesh.rotation.z += game.speed * deltaTime
}

Sea = function () {
  var geom = new THREE.CylinderGeometry(
    game.seaRadius,
    game.seaRadius,
    game.seaLength,
    40,
    10,
  )
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2))
  geom.mergeVertices()
  var l = geom.vertices.length

  this.waves = []

  for (var i = 0; i < l; i++) {
    var v = geom.vertices[i]
    //v.y = Math.random()*30;
    this.waves.push({
      y: v.y,
      x: v.x,
      z: v.z,
      ang: Math.random() * Math.PI * 2,
      amp:
        game.wavesMinAmp +
        Math.random() * (game.wavesMaxAmp - game.wavesMinAmp),
      speed:
        game.wavesMinSpeed +
        Math.random() * (game.wavesMaxSpeed - game.wavesMinSpeed),
    })
  }
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.blue,
    transparent: true,
    opacity: 0.8,
    shading: THREE.FlatShading,
  })

  this.mesh = new THREE.Mesh(geom, mat)
  this.mesh.name = 'waves'
  this.mesh.receiveShadow = true
}

Sea.prototype.moveWaves = function () {
  var verts = this.mesh.geometry.vertices
  var l = verts.length
  for (var i = 0; i < l; i++) {
    var v = verts[i]
    var vprops = this.waves[i]
    v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp
    v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp
    vprops.ang += vprops.speed * deltaTime
    this.mesh.geometry.verticesNeedUpdate = true
  }
}

Cloud = function () {
  this.mesh = new THREE.Object3D()
  this.mesh.name = 'cloud'
  var geom = new THREE.CubeGeometry(20, 20, 20)
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.white,
  })

  //*
  var nBlocs = 3 + Math.floor(Math.random() * 3)
  for (var i = 0; i < nBlocs; i++) {
    var m = new THREE.Mesh(geom.clone(), mat)
    m.position.x = i * 15
    m.position.y = Math.random() * 10
    m.position.z = Math.random() * 10
    m.rotation.z = Math.random() * Math.PI * 2
    m.rotation.y = Math.random() * Math.PI * 2
    var s = 0.1 + Math.random() * 0.9
    m.scale.set(s, s, s)
    this.mesh.add(m)
    m.castShadow = true
    m.receiveShadow = true
  }
  //*/
}

Cloud.prototype.rotate = function () {
  var l = this.mesh.children.length
  for (var i = 0; i < l; i++) {
    var m = this.mesh.children[i]
    m.rotation.z += Math.random() * 0.005 * (i + 1)
    m.rotation.y += Math.random() * 0.002 * (i + 1)
  }
}

Ennemy = function () {
  var geom = new THREE.TetrahedronGeometry(8, 2)
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.red,
    shininess: 0,
    specular: 0xffffff,
    shading: THREE.FlatShading,
  })
  this.mesh = new THREE.Mesh(geom, mat)
  this.mesh.castShadow = true
  this.angle = 0
  this.dist = 0
}

EnnemiesHolder = function () {
  this.mesh = new THREE.Object3D()
  this.ennemiesInUse = []
}
GiftCoin = function () {
  var geom = new THREE.TetrahedronGeometry(6, 1)
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.orange,
    shininess: 0,
    specular: 0xffffff,
    shading: THREE.FlatShading,
  })
  this.mesh = new THREE.Mesh(geom, mat)
  this.mesh.castShadow = true
  this.angle = 0
  this.dist = 0
}
GiftCoinHolder = function () {
  this.mesh = new THREE.Object3D()
  this.giftCoinInUse = []
}

GiftCoinHolder.prototype.spawnGiftCoin = function () {
  var nGiftCoin = 1

  for (let k = 0; k < nGiftCoin; k++) {
    var giftCoin

    if (giftCoinPool.length) {
      giftCoin = giftCoinPool.pop()
    } else {
      giftCoin = new GiftCoin()
    }

    giftCoin.angle = k * 0.1
    giftCoin.distance =
      game.seaRadius +
      game.planeDefaultHeight +
      (-1 + Math.random() * 2) * (game.planeAmpHeight - 20)
    giftCoin.mesh.position.y =
      -game.seaRadius + Math.sin(giftCoin.angle) * giftCoin.distance
    giftCoin.mesh.position.x = Math.cos(giftCoin.angle) * giftCoin.distance

    this.mesh.add(giftCoin.mesh)
    this.giftCoinInUse.push(giftCoin)
  }
}

EnnemiesHolder.prototype.spawnEnnemies = function () {
  var nEnnemies = game.level

  for (var i = 0; i < nEnnemies; i++) {
    var ennemy
    if (ennemiesPool.length) {
      ennemy = ennemiesPool.pop()
    } else {
      ennemy = new Ennemy()
    }

    ennemy.angle = -(i * 0.1)
    ennemy.distance =
      game.seaRadius +
      game.planeDefaultHeight +
      (-1 + Math.random() * 2) * (game.planeAmpHeight - 20)
    ennemy.mesh.position.y =
      -game.seaRadius + Math.sin(ennemy.angle) * ennemy.distance
    ennemy.mesh.position.x = Math.cos(ennemy.angle) * ennemy.distance

    this.mesh.add(ennemy.mesh)
    this.ennemiesInUse.push(ennemy)
  }
}

const giftCoinHitByPlane = () => {
  if (localStorage.getItem('auth__token')) {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((response) => {
        // console.log('Test api called when user is logged in', response)
        alert('logged in')
      })
  } else {
    alert('not logged in')
  }
}

GiftCoinHolder.prototype.rotateGiftCoins = function () {
  for (var i = 0; i < this.giftCoinInUse.length; i++) {
    var giftCoin = this.giftCoinInUse[i]
    giftCoin.angle += game.speed * deltaTime * game.giftCoinsSpeed

    if (giftCoin.angle > Math.PI * 2) giftCoin.angle -= Math.PI * 2

    giftCoin.mesh.position.y =
      -game.seaRadius + Math.sin(giftCoin.angle) * giftCoin.distance
    giftCoin.mesh.position.x = Math.cos(giftCoin.angle) * giftCoin.distance
    giftCoin.mesh.rotation.z += Math.random() * 0.2
    giftCoin.mesh.rotation.y += Math.random() * 0.2

    //var globalEnnemyPosition =  ennemy.mesh.localToWorld(new THREE.Vector3());
    var diffPos = airplane.mesh.position
      .clone()
      .sub(giftCoin.mesh.position.clone())
    var d = diffPos.length()
    if (d < game.giftCoinDistanceTolerance) {
      particlesHolder.spawnParticles(
        giftCoin.mesh.position.clone(),
        15,
        Colors.blue,
        1,
      )

      giftCoinPool.unshift(this.giftCoinInUse.splice(i, 1)[0])
      this.mesh.remove(giftCoin.mesh)
      game.planeCollisionSpeedX = (100 * diffPos.x) / d
      game.planeCollisionSpeedY = (100 * diffPos.y) / d
      ambientLight.intensity = 2

      giftCoinHitByPlane()
      i--
    } else if (giftCoin.angle > Math.PI) {
      giftCoinPool.unshift(this.giftCoinInUse.splice(i, 1)[0])
      this.mesh.remove(giftCoin.mesh)
      i--
    }
  }
}

EnnemiesHolder.prototype.rotateEnnemies = function () {
  for (var i = 0; i < this.ennemiesInUse.length; i++) {
    var ennemy = this.ennemiesInUse[i]
    ennemy.angle += game.speed * deltaTime * game.ennemiesSpeed

    if (ennemy.angle > Math.PI * 2) ennemy.angle -= Math.PI * 2

    ennemy.mesh.position.y =
      -game.seaRadius + Math.sin(ennemy.angle) * ennemy.distance
    ennemy.mesh.position.x = Math.cos(ennemy.angle) * ennemy.distance
    ennemy.mesh.rotation.z += Math.random() * 0.1
    ennemy.mesh.rotation.y += Math.random() * 0.1

    //var globalEnnemyPosition =  ennemy.mesh.localToWorld(new THREE.Vector3());
    var diffPos = airplane.mesh.position
      .clone()
      .sub(ennemy.mesh.position.clone())
    var d = diffPos.length()
    if (d < game.ennemyDistanceTolerance) {
      particlesHolder.spawnParticles(
        ennemy.mesh.position.clone(),
        15,
        Colors.red,
        3,
      )

      ennemiesPool.unshift(this.ennemiesInUse.splice(i, 1)[0])
      this.mesh.remove(ennemy.mesh)
      game.planeCollisionSpeedX = (100 * diffPos.x) / d
      game.planeCollisionSpeedY = (100 * diffPos.y) / d
      ambientLight.intensity = 2

      removeEnergy()
      i--
    } else if (ennemy.angle > Math.PI) {
      ennemiesPool.unshift(this.ennemiesInUse.splice(i, 1)[0])
      this.mesh.remove(ennemy.mesh)
      i--
    }
  }
}

RareGiftCoin = function () {
  THREE.ImageUtils.crossOrigin = '*'
  const texture = new THREE.TextureLoader().load(
    '/static/aviator/img/bitcoin.png',
  )
  const material = new THREE.MeshStandardMaterial({
    color: Colors.golden,
    bumpMap: texture, // can be used alphaMap also for light texture.
    metalness: 0.7,
    roughness: 0.3,
  })
  var geometry = new THREE.CylinderGeometry(6, 6, 1, 50)
  this.mesh = new THREE.Mesh(geometry, material)
  this.mesh.castShadow = true
  this.angle = 0
  this.dist = 0
}
RareGiftCoinHolder = function () {
  this.mesh = new THREE.Object3D()
  this.rareGiftCoinInUse = []
}

RareGiftCoinHolder.prototype.spawnRareGiftCoin = function () {
  var nRareGiftCoin = 1

  for (let k = 0; k < nRareGiftCoin; k++) {
    var rareGiftCoin

    if (rareGiftCoinPool.length) {
      rareGiftCoin = rareGiftCoinPool.pop()
    } else {
      rareGiftCoin = new RareGiftCoin()
    }

    rareGiftCoin.angle = k * 0.1
    rareGiftCoin.distance =
      game.seaRadius +
      game.planeDefaultHeight +
      (-1 + Math.random() * 2) * (game.planeAmpHeight - 20)
    rareGiftCoin.mesh.position.y =
      -game.seaRadius + Math.sin(rareGiftCoin.angle) * rareGiftCoin.distance
    rareGiftCoin.mesh.position.x =
      Math.cos(rareGiftCoin.angle) * rareGiftCoin.distance

    this.mesh.add(rareGiftCoin.mesh)
    this.rareGiftCoinInUse.push(rareGiftCoin)
  }
}

const rareGiftCoinHitByPlane = () => {
  // alert('rare coin hit');
}

RareGiftCoinHolder.prototype.rotateRareGiftCoins = function () {
  for (var i = 0; i < this.rareGiftCoinInUse.length; i++) {
    var rareGiftCoin = this.rareGiftCoinInUse[i]
    rareGiftCoin.angle += game.speed * deltaTime * game.rareGiftCoinsSpeed

    if (rareGiftCoin.angle > Math.PI * 2) rareGiftCoin.angle -= Math.PI * 2

    rareGiftCoin.mesh.position.y =
      -game.seaRadius + Math.sin(rareGiftCoin.angle) * rareGiftCoin.distance
    rareGiftCoin.mesh.position.x =
      Math.cos(rareGiftCoin.angle) * rareGiftCoin.distance
    rareGiftCoin.mesh.rotation.z += Math.random() * 0.2
    rareGiftCoin.mesh.rotation.y += Math.random() * 0.2

    //var globalEnnemyPosition =  ennemy.mesh.localToWorld(new THREE.Vector3());
    var diffPos = airplane.mesh.position
      .clone()
      .sub(rareGiftCoin.mesh.position.clone())
    var d = diffPos.length()
    if (d < game.rareGiftCoinDistanceTolerance) {
      particlesHolder.spawnParticles(
        rareGiftCoin.mesh.position.clone(),
        15,
        Colors.golden,
        1,
      )

      rareGiftCoinPool.unshift(this.rareGiftCoinInUse.splice(i, 1)[0])
      this.mesh.remove(rareGiftCoin.mesh)
      rareGiftCoinHitByPlane()
      i--
    } else if (rareGiftCoin.angle > Math.PI) {
      rareGiftCoinPool.unshift(this.rareGiftCoinInUse.splice(i, 1)[0])
      this.mesh.remove(rareGiftCoin.mesh)
      i--
    }
  }
}

Particle = function () {
  var geom = new THREE.TetrahedronGeometry(3, 0)
  var mat = new THREE.MeshPhongMaterial({
    color: 0x009999,
    shininess: 0,
    specular: 0xffffff,
    shading: THREE.FlatShading,
  })
  this.mesh = new THREE.Mesh(geom, mat)
}

Particle.prototype.explode = function (pos, color, scale) {
  var _this = this
  var _p = this.mesh.parent
  this.mesh.material.color = new THREE.Color(color)
  this.mesh.material.needsUpdate = true
  this.mesh.scale.set(scale, scale, scale)
  var targetX = pos.x + (-1 + Math.random() * 2) * 50
  var targetY = pos.y + (-1 + Math.random() * 2) * 50
  var speed = 0.6 + Math.random() * 0.2
  TweenMax.to(this.mesh.rotation, speed, {
    x: Math.random() * 12,
    y: Math.random() * 12,
  })
  TweenMax.to(this.mesh.scale, speed, { x: 0.1, y: 0.1, z: 0.1 })
  TweenMax.to(this.mesh.position, speed, {
    x: targetX,
    y: targetY,
    delay: Math.random() * 0.1,
    ease: Power2.easeOut,
    onComplete: function () {
      if (_p) _p.remove(_this.mesh)
      _this.mesh.scale.set(1, 1, 1)
      particlesPool.unshift(_this)
    },
  })
}

ParticlesHolder = function () {
  this.mesh = new THREE.Object3D()
  this.particlesInUse = []
}

ParticlesHolder.prototype.spawnParticles = function (
  pos,
  density,
  color,
  scale,
) {
  var nPArticles = density
  for (var i = 0; i < nPArticles; i++) {
    var particle
    if (particlesPool.length) {
      particle = particlesPool.pop()
    } else {
      particle = new Particle()
    }
    this.mesh.add(particle.mesh)
    particle.mesh.visible = true
    var _this = this
    particle.mesh.position.y = pos.y
    particle.mesh.position.x = pos.x
    particle.explode(pos, color, scale)
  }
}

Coin = function () {
  var geom = new THREE.TetrahedronGeometry(5, 0)
  var mat = new THREE.MeshPhongMaterial({
    color: 0x009999,
    shininess: 0,
    specular: 0xffffff,

    shading: THREE.FlatShading,
  })
  this.mesh = new THREE.Mesh(geom, mat)
  this.mesh.castShadow = true
  this.angle = 0
  this.dist = 0
}

CoinsHolder = function (nCoins) {
  this.mesh = new THREE.Object3D()
  this.coinsInUse = []
  this.coinsPool = []
  for (var i = 0; i < nCoins; i++) {
    var coin = new Coin()
    this.coinsPool.push(coin)
  }
}

CoinsHolder.prototype.spawnCoins = function () {
  var nCoins = 1 + Math.floor(Math.random() * 10)
  var d =
    game.seaRadius +
    game.planeDefaultHeight +
    (-1 + Math.random() * 2) * (game.planeAmpHeight - 20)
  var amplitude = 10 + Math.round(Math.random() * 10)
  for (var i = 0; i < nCoins; i++) {
    var coin
    if (this.coinsPool.length) {
      coin = this.coinsPool.pop()
    } else {
      coin = new Coin()
    }
    this.mesh.add(coin.mesh)
    this.coinsInUse.push(coin)
    coin.angle = -(i * 0.02)
    coin.distance = d + Math.cos(i * 0.5) * amplitude
    coin.mesh.position.y =
      -game.seaRadius + Math.sin(coin.angle) * coin.distance
    coin.mesh.position.x = Math.cos(coin.angle) * coin.distance
  }
}

CoinsHolder.prototype.rotateCoins = function () {
  for (var i = 0; i < this.coinsInUse.length; i++) {
    var coin = this.coinsInUse[i]
    if (coin.exploding) continue
    coin.angle += game.speed * deltaTime * game.coinsSpeed
    if (coin.angle > Math.PI * 2) coin.angle -= Math.PI * 2
    coin.mesh.position.y =
      -game.seaRadius + Math.sin(coin.angle) * coin.distance
    coin.mesh.position.x = Math.cos(coin.angle) * coin.distance
    coin.mesh.rotation.z += Math.random() * 0.1
    coin.mesh.rotation.y += Math.random() * 0.1

    //var globalCoinPosition =  coin.mesh.localToWorld(new THREE.Vector3());
    var diffPos = airplane.mesh.position.clone().sub(coin.mesh.position.clone())
    var d = diffPos.length()
    if (d < game.coinDistanceTolerance) {
      this.coinsPool.unshift(this.coinsInUse.splice(i, 1)[0])
      this.mesh.remove(coin.mesh)
      particlesHolder.spawnParticles(
        coin.mesh.position.clone(),
        5,
        0x009999,
        0.8,
      )
      addEnergy()
      i--
    } else if (coin.angle > Math.PI) {
      this.coinsPool.unshift(this.coinsInUse.splice(i, 1)[0])
      this.mesh.remove(coin.mesh)
      i--
    }
  }
}

// 3D Models
var sea
var airplane

function createPlane() {
  airplane = new AirPlane()
  airplane.mesh.scale.set(0.25, 0.25, 0.25)
  airplane.mesh.position.y = game.planeDefaultHeight
  scene.add(airplane.mesh)
}

function createSea() {
  sea = new Sea()
  sea.mesh.position.y = -game.seaRadius
  scene.add(sea.mesh)
}

function createSky() {
  sky = new Sky()
  sky.mesh.position.y = -game.seaRadius
  scene.add(sky.mesh)
}

function createCoins() {
  coinsHolder = new CoinsHolder(20)
  scene.add(coinsHolder.mesh)
}

function createEnnemies() {
  for (var i = 0; i < 10; i++) {
    var ennemy = new Ennemy()
    ennemiesPool.push(ennemy)
  }
  ennemiesHolder = new EnnemiesHolder()
  //ennemiesHolder.mesh.position.y = -game.seaRadius;
  scene.add(ennemiesHolder.mesh)
}

function createGiftCoin() {
  for (var i = 0; i < 5; i++) {
    var giftCoin = new GiftCoin()
    giftCoinPool.push(giftCoin)
  }
  giftCoinHolder = new GiftCoinHolder()
  scene.add(giftCoinHolder.mesh)
}

function createRareGiftCoin() {
  for (var i = 0; i < 5; i++) {
    var rareGiftCoin = new RareGiftCoin()
    rareGiftCoinPool.push(rareGiftCoin)
  }
  rareGiftCoinHolder = new RareGiftCoinHolder()
  scene.add(rareGiftCoinHolder.mesh)
}

function createParticles() {
  for (var i = 0; i < 10; i++) {
    var particle = new Particle()
    particlesPool.push(particle)
  }
  particlesHolder = new ParticlesHolder()
  //ennemiesHolder.mesh.position.y = -game.seaRadius;
  scene.add(particlesHolder.mesh)
}

function loop() {
  newTime = new Date().getTime()
  deltaTime = newTime - oldTime
  oldTime = newTime

  // FPS
  // var thisFrameTime = (thisLoop = new Date) - lastLoop;
  // frameTime += (thisFrameTime - frameTime) / filterStrength;
  // lastLoop = thisLoop;

  if (game.status == 'playing') {
    // Add energy coins every 100m;
    if (
      Math.floor(game.distance) % game.distanceForCoinsSpawn == 0 &&
      Math.floor(game.distance) > game.coinLastSpawn
    ) {
      game.coinLastSpawn = Math.floor(game.distance)
      coinsHolder.spawnCoins()
    }

    if (
      Math.floor(game.distance) % game.distanceForSpeedUpdate == 0 &&
      Math.floor(game.distance) > game.speedLastUpdate
    ) {
      game.speedLastUpdate = Math.floor(game.distance)
      game.targetBaseSpeed += game.incrementSpeedByTime * deltaTime
    }

    if (
      Math.floor(game.distance) % game.distanceForEnnemiesSpawn == 0 &&
      Math.floor(game.distance) > game.ennemyLastSpawn
    ) {
      game.ennemyLastSpawn = Math.floor(game.distance)
      ennemiesHolder.spawnEnnemies()
    }

    if (
      Math.floor(game.distance) % game.distanceForGiftCoinSpawn == 0 &&
      Math.floor(game.distance) > game.giftCoinLastSpawn
    ) {
      game.giftCoinLastSpawn = Math.floor(game.distance)
      giftCoinHolder.spawnGiftCoin()
    }

    if (
      Math.floor(game.distance) % game.distanceForRareGiftCoinSpawn == 0 &&
      Math.floor(game.distance) > game.rareGiftCoinLastSpawn
    ) {
      game.rareGiftCoinLastSpawn = Math.floor(game.distance)
      rareGiftCoinHolder.spawnRareGiftCoin()
    }

    if (
      Math.floor(game.distance) % game.distanceForLevelUpdate == 0 &&
      Math.floor(game.distance) > game.levelLastUpdate
    ) {
      game.levelLastUpdate = Math.floor(game.distance)
      game.level++
      eventArr.push('level increase')
      fieldLevel.innerHTML = Math.floor(game.level)

      game.targetBaseSpeed =
        game.initSpeed + game.incrementSpeedByLevel * game.level
    }

    updatePlane()
    updateDistance()
    updateEnergy()
    game.baseSpeed += (game.targetBaseSpeed - game.baseSpeed) * deltaTime * 0.02
    game.speed = game.baseSpeed * game.planeSpeed
  } else if (game.status == 'gameover') {
    game.speed *= 0.99
    airplane.mesh.rotation.z +=
      (-Math.PI / 2 - airplane.mesh.rotation.z) * 0.0002 * deltaTime
    airplane.mesh.rotation.x += 0.0003 * deltaTime
    game.planeFallSpeed *= 1.05
    airplane.mesh.position.y -= game.planeFallSpeed * deltaTime

    if (airplane.mesh.position.y < -200) {
      showReplay()
      game.status = 'waitingReplay'
    }
  } else if (game.status == 'waitingReplay') {
  }

  airplane.propeller.rotation.x += 0.2 + game.planeSpeed * deltaTime * 0.005
  sea.mesh.rotation.z += game.speed * deltaTime //*game.seaRotationSpeed;

  if (sea.mesh.rotation.z > 2 * Math.PI) sea.mesh.rotation.z -= 2 * Math.PI

  ambientLight.intensity += (0.5 - ambientLight.intensity) * deltaTime * 0.005

  coinsHolder.rotateCoins()
  ennemiesHolder.rotateEnnemies()
  giftCoinHolder.rotateGiftCoins()
  rareGiftCoinHolder.rotateRareGiftCoins()

  sky.moveClouds()
  sea.moveWaves()

  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

function updateDistance() {
  game.distance += game.speed * deltaTime * game.ratioSpeedDistance
  fieldDistance.innerHTML = Math.floor(game.distance)
  var d =
    125 *
    (1 -
      (game.distance % game.distanceForLevelUpdate) /
        game.distanceForLevelUpdate)
  levelCircle.setAttribute('stroke-dashoffset', d)
}

var blinkEnergy = false

function updateEnergy() {
  game.energy -= game.speed * deltaTime * game.ratioSpeedEnergy
  game.energy = Math.max(0, game.energy)
  energyBar.style.right = 100 - game.energy + '%'
  energyBar.style.backgroundColor = game.energy < 50 ? '#f25346' : '#68c3c0'

  if (game.energy < 30) {
    energyBar.style.animationName = 'blinking'
  } else {
    energyBar.style.animationName = 'none'
  }

  eventArr.push('updateEnergy')
  if (game.energy < 1) {
    game.status = 'gameover'
    // transactionIDs = []
    window.clearInterval(intervalID)
    stopTimer()
  }
}

function addEnergy() {
  collectedCoins += 1
  game.energy += game.coinValue
  game.energy = Math.min(game.energy, 100)
  eventArr.push('addEnergy')
}

function removeEnergy() {
  redBallCrashCount += 1
  game.energy -= game.ennemyValue
  game.energy = Math.max(0, game.energy)
  eventArr.push('removeEnergy')
}

function updatePlane() {
  game.planeSpeed = normalize(
    mousePos.x,
    -0.5,
    0.5,
    game.planeMinSpeed,
    game.planeMaxSpeed,
  )
  var targetY = normalize(
    mousePos.y,
    -0.75,
    0.75,
    game.planeDefaultHeight - game.planeAmpHeight,
    game.planeDefaultHeight + game.planeAmpHeight,
  )
  var targetX = normalize(
    mousePos.x,
    -1,
    1,
    -game.planeAmpWidth * 0.7,
    -game.planeAmpWidth,
  )

  game.planeCollisionDisplacementX += game.planeCollisionSpeedX
  targetX += game.planeCollisionDisplacementX

  game.planeCollisionDisplacementY += game.planeCollisionSpeedY
  targetY += game.planeCollisionDisplacementY

  airplane.mesh.position.y +=
    (targetY - airplane.mesh.position.y) * deltaTime * game.planeMoveSensivity
  airplane.mesh.position.x +=
    (targetX - airplane.mesh.position.x) * deltaTime * game.planeMoveSensivity

  airplane.mesh.rotation.z =
    (targetY - airplane.mesh.position.y) * deltaTime * game.planeRotXSensivity
  airplane.mesh.rotation.x =
    (airplane.mesh.position.y - targetY) * deltaTime * game.planeRotZSensivity
  var targetCameraZ = normalize(
    game.planeSpeed,
    game.planeMinSpeed,
    game.planeMaxSpeed,
    game.cameraNearPos,
    game.cameraFarPos,
  )
  camera.fov = normalize(mousePos.x, -1, 1, 40, 80)
  camera.updateProjectionMatrix()
  camera.position.y +=
    (airplane.mesh.position.y - camera.position.y) *
    deltaTime *
    game.cameraSensivity

  game.planeCollisionSpeedX +=
    (0 - game.planeCollisionSpeedX) * deltaTime * 0.03
  game.planeCollisionDisplacementX +=
    (0 - game.planeCollisionDisplacementX) * deltaTime * 0.01
  game.planeCollisionSpeedY +=
    (0 - game.planeCollisionSpeedY) * deltaTime * 0.03
  game.planeCollisionDisplacementY +=
    (0 - game.planeCollisionDisplacementY) * deltaTime * 0.01

  airplane.pilot.updateHairs()
}

function showReplay() {
  replayMessage.style.display = 'block'
}

function hideReplay() {
  replayMessage.style.display = 'none'
  startTimer()
}

function normalize(v, vmin, vmax, tmin, tmax) {
  var nv = Math.max(Math.min(v, vmax), vmin)
  var dv = vmax - vmin
  var pc = (nv - vmin) / dv
  var dt = tmax - tmin
  var tv = tmin + pc * dt
  return tv
}

var fieldDistance,
  energyBar,
  replayMessage,
  fieldLevel,
  levelCircle,
  transactionNumber,
  fpsOut
let gameStarted = false
function init(event) {
  // UI

  fieldDistance = document.getElementById('distValue')
  energyBar = document.getElementById('energyBar')
  replayMessage = document.getElementById('replayMessage')
  fieldLevel = document.getElementById('levelValue')
  levelCircle = document.getElementById('levelCircleStroke')
  transactionNumber = document.getElementById('transactionNumber')

  // FPS
  // fpsOut = document.getElementById('fps');

  // if(!fieldDistance || !energyBar || !replayMessage || !fieldLevel || !levelCircle){
  //   return null ;
  // }
  resetGame()
  createScene()

  createLights()
  createPlane()
  createSea()
  createSky()
  createCoins()
  createGiftCoin()
  createRareGiftCoin()
  createEnnemies()
  createParticles()

  document.addEventListener('mousemove', handleMouseMove, false)
  document.addEventListener('touchmove', handleTouchMove, false)
  document.addEventListener('mouseup', handleMouseUp, false)
  document.addEventListener('touchend', handleTouchEnd, false)
  startTimer()
  loop()

  // FPS
  // setInterval(function () {
  //   fpsOut.innerHTML = (1000 / frameTime).toFixed(1) + " fps";
  // }, 1000);
}

function startTimer() {
  inGameTimeInterval = setInterval(() => {
    inGameTime += 10
  }, 10)
}

function stopTimer() {
  inGameTime = 0
  window.clearInterval(inGameTimeInterval)
}

function startTheGame(ev) {
  var docs = document.getElementById('gameStarterAviator')
  // console.log('starting')
  if (docs && docs.value === '2') {
    document.getElementById('gameStarterAviator').value = '3'
    // console.log('starting the game')
    window.removeEventListener('DOMNodeInserted', startTheGame, false)
    init()
  }
}
window.addEventListener('DOMNodeInserted', startTheGame, false)