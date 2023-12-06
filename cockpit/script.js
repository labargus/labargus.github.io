import * as THREE from 'three';
import * as BufferGeometryUtils from 'addons/utils/BufferGeometryUtils.js';

const cloudShader = {
  vertexShader:
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `,
  fragmentShader:
  `
  uniform sampler2D map;
  uniform vec3 fogColor;
  uniform float fogNear;
  uniform float fogFar;
  varying vec2 vUv;

  void main() {

    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = smoothstep( fogNear, fogFar, depth );

    gl_FragColor = texture2D( map, vUv );
    gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
    gl_FragColor = mix( gl_FragColor, vec4( fogColor , gl_FragColor.w ), fogFactor );

  }
  `
}

const container = document.querySelector('.container');
const sizes = {
  width:container.offsetWidth,
  height:container.offsetHeight
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000)
const renderer = new THREE.WebGLRenderer( { antialias: false, gammaOutput: true, alpha: true } );
const mouse = new THREE.Vector2();

let mesh, geometry, material;
let position

var mouseX = 0, mouseY = 0;
var start_time = Date.now();

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var tLoader = new THREE.TextureLoader()

tLoader.load('img/cloud10.png', (t)=> {
  t.colorSpace = THREE.SRGBColorSpace
  init(t)
})



function init(t){

  var canvas = document.createElement( 'canvas' );
  canvas.width = 32;
  canvas.height = window.innerHeight;

  var context = canvas.getContext( '2d' );

  var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
  gradient.addColorStop(0, "#1e4877");
  gradient.addColorStop(0.5, "#4584b4");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
  container.style.backgroundSize = '32px 100%';

  camera.position.z = 6000;

  geometry = new THREE.BufferGeometry();

  var texture = t
  texture.magFilter = THREE.LinearMipMapLinearFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  var fog = new THREE.Fog( 0x4584b4, - 100, 3000 );
  scene.fog = fog

  material = new THREE.ShaderMaterial( {

    uniforms: {

      "map": { type: "t", value: texture },
      "fogColor" : { type: "c", value: fog.color },
      "fogNear" : { type: "f", value: fog.near },
      "fogFar" : { type: "f", value: fog.far },

    },
    vertexShader: cloudShader.vertexShader,
    fragmentShader: cloudShader.fragmentShader,
    depthWrite: false,
    depthTest: false,
    transparent: true,
  } );
  
  const planeGeo = new THREE.PlaneGeometry( 64, 64 )
  var planeObj = new THREE.Object3D()
  const geometries = []

  for ( var i = 0; i < 8000; i++ ) {

    planeObj.position.x = Math.random() * 1000 - 500;
    planeObj.position.y = - Math.random() * Math.random() * 200 - 15;
    planeObj.position.z = i;
    planeObj.rotation.z = Math.random() * Math.PI;
    planeObj.scale.x = planeObj.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
    planeObj.updateMatrix()
    
    const clonedPlaneGeo = planeGeo.clone();
    clonedPlaneGeo.applyMatrix4(planeObj.matrix);

    geometries.push(clonedPlaneGeo)

  }
  
  const planeGeos = BufferGeometryUtils.mergeGeometries(geometries)
  const planesMesh = new THREE.Mesh(planeGeos, material)
  planesMesh.renderOrder = 2
  
  const planesMeshA = planesMesh.clone();
  planesMeshA.position.z = - 8000;
  planesMeshA.renderOrder = 1
  
  scene.add( planesMesh );
  scene.add( planesMeshA );

  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'resize', onWindowResize, false );

  animate()

}

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) * 0.25;
  mouseY = ( event.clientY - windowHalfY ) * 0.15;

}

function onWindowResize( event ) {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );

  position = ( ( Date.now() - start_time ) * 0.03 ) % 8000;

  camera.position.x += ( mouseX - camera.position.x ) * 0.01;
  camera.rotation.z += ( mouseX - camera.position.x ) /100000
  camera.position.y += ( - mouseY - camera.position.y ) * 0.01;
  camera.position.z = - position + 8000;

  renderer.render( scene, camera );

}


window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
    // Check if gyroscope information is supported
    if (event.alpha !== null || event.beta !== null || event.gamma !== null) {
      // Extract gyroscope data
      var alpha = event.alpha.toFixed(2); // Z-axis rotation in degrees
      var beta = event.beta.toFixed(2);   // X-axis rotation in degrees
      var gamma = event.gamma.toFixed(2); // Y-axis rotation in degrees

      // Update the HTML elements with the gyroscope data
      document.getElementById('alpha').textContent = 'Alpha: ' + alpha;
      document.getElementById('beta').textContent = 'Beta: ' + beta;
      document.getElementById('gamma').textContent = 'Gamma: ' + gamma;
    } else {
      // Gyroscope not supported
      document.getElementById('gyroscope-data').innerHTML = '<p>Gyroscope not supported on this device.</p>';
    }
  }