var brancas = [];
var pretas = [];

//pega o tamanho total do body para usar como tempo da animacao
var tamanhoBody = document.body.clientHeight;

//timeline do animejs com propriedades de tempo, e easing

var camera;
var box;
var sphere, target;
const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
  var light2 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 7, 0), scene);
  light.intensity = 1.5;
  light2.intensity = 150;
  light2.range = 5000;
  light2.shadowMinZ = 1;
  light2.shadowMaxZ = 5000;



  target = new BABYLON.TransformNode('target', scene);
  target.position.y = 0.5;

  camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 10, -15), scene);
  //camera.setTarget(target);


  BABYLON.SceneLoader.ImportMesh("", "assets/", "cenario2.glb", scene, function (newMeshes, particleSystems, skeletons) {

    for (i = 0; i < newMeshes.length; i++) {

      if (newMeshes[i].name.substring(0, 7) == "brancas") {
        newMeshes[i].pode = true;
        newMeshes[i].isPickable = true;
        //shadowGenerator.addShadowCaster(newMeshes[i]);
        brancas.push(newMeshes[i]);
      }
      if (newMeshes[i].name.substring(0, 6) == "pretas") {
        newMeshes[i].pode = true;
        //shadowGenerator.addShadowCaster(newMeshes[i]);
        pretas.push(newMeshes[i]);
      }
      if (newMeshes[i].name == "tabuleiro") {
        newMeshes[i].receiveShadows = true;
        newMeshes[i].isPickable = false;
      }
      if (newMeshes[i].name.substring(0, 4) == "tile") {
        newMeshes[i].isPickable = true;
        var mat = new BABYLON.StandardMaterial("mat", scene);
        mat.alpha = 0;
        newMeshes[i].material = mat;
        newMeshes[i].checkCollisions = true;
      }
    }
  });

  scene.onBeforeCameraRenderObservable.add(() => {
    camera.setTarget(target.position)
  })

  return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events


var tl = anime.timeline({
  duration: tamanhoBody,
  autoplay: false,
  easing: 'linear',
});

tl
  .add({
    targets: camera.position,
    x: 6,
    y: 6,
    z: -10,
    duration: 1000
  })
  .add({
    targets: target.position,
    x: 2,
    y: 0,
    z: 0,
    duration: 1000
  }, '-=1000')
  .add({
    targets: camera.position,
    x: -6,
    y: 6,
    z: -10,
    duration: 1000
  })
  .add({
    targets: target.position,
    x: -2,
    y: 0,
    z: 0,
    duration: 1000
  }, '-=1000')
  .add({
    targets: camera.position,
    x: -5,
    y: 6,
    z: 10,
    duration: 1000
  })
  .add({
    targets: target.position,
    x: -3,
    y: 0,
    z: 3,
    duration: 1000
  }, '-=1000')
  .add({
    targets: camera.position,
    x: 5,
    y: 6,
    z: 10,
    duration: 1000
  })
  .add({
    targets: target.position,
    x: 3,
    y: 0,
    z: 3,
    duration: 1000
  }, '-=1000')



//funcao que peguei pronta que calcula o tamanho total do body e converte em porcentagem
function getScrollPercent() {
  var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight'
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100
}

// pega evento de scroll
window.addEventListener('scroll', () => {
  const porcentagem = getScrollPercent();
  //seek é a propriedade da biblioteca 
  tl.seek(tl.duration * (porcentagem * 0.01))
})
window.addEventListener("resize", function () {
  engine.resize();
});