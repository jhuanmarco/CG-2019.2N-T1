// Imports
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/GLTFLoader.js';

var camera, cena, renderer, controls;
var modelPokeball, esfera, materialGlass;
var mixer, action;
var luzAmbiente, luzDirecional, light;
var timer, clock; 

// Inicial 
function createScene() {   
    // Cena       
    cena = new THREE.Scene();
    cena.background = new THREE.Color( 0x333333 );

    // Camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //camera.position.set( x , y , z );
    //camera.lookAt( new THREE.Vector3( x , y, z) );
    camera.position.z = 15;

    // Rederizador
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2;
    document.body.appendChild( renderer.domElement );

    // Clock
    clock = new THREE.Clock();

    // Controls
    controls = new OrbitControls( camera, renderer.domElement );
    
    // Luzes
    luzAmbiente = new THREE.AmbientLight( 0xaaaaaa ); // soft white light
    cena.add( luzAmbiente );
    
    light = new THREE.HemisphereLight( 0x000000, 0x004400 );
    light.position.set( 0, 10, 0 );
    cena.add( light );

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 20, 10 );
    cena.add( light );



    // Models
    // Meia esfera
    var geometry = new THREE.SphereBufferGeometry(2.99, 50, 50, 0, 2*Math.PI, 0, 0.5 * Math.PI);
    materialGlass = new THREE.MeshToonMaterial({color: 0x333333, transparent: true, opacity: 1});
    esfera = new THREE.Mesh(geometry, materialGlass);
    esfera.position.y += 2.3;
    esfera.position.x -= 0.97;
    esfera.position.z -= 0.3;

    // Pokebola
    var loader = new GLTFLoader();
    loader.load( './Models/pokeball/scene.gltf', function ( gltf ) {
        modelPokeball = gltf.scene;
        cena.add(modelPokeball);
        modelPokeball.scale.set(1,1,1);
        modelPokeball.add(esfera); // Tentar removendo
 


        // Animação
        mixer = new THREE.AnimationMixer(modelPokeball);
        var animation = gltf.animations[0];
        animation.loop = true
        action = mixer.clipAction(animation);
        action.play();

    }, undefined, function ( e ) {
        alert(e);
    } );

       
}

createScene();

// Main
function animate() {
    requestAnimationFrame( animate );
    timer = clock.getDelta();
    if (mixer) mixer.update(timer);
    console.log(timer);

    if(materialGlass.opacity > 0.1){
        //materialGlass.opacity -= 0.01;
    }
    
    renderer.render(cena, camera);
}

animate();


/*
var clock = new THREE.Clock();
var speed = 2; //units a second
var delta = 0;

render();
function render(){
  requestAnimationFrame(render);

  delta = clock.getDelta();
  object.position.z += speed * delta;

  renderer.render(scene, camera);
}

add pokemon
animations
    pokemon
    open pokeball
background
glassmaterial

https://stackoverflow.com/questions/15478093/realistic-lighting-sunlight-with-three-js
https://github.com/mrdoob/three.js/issues/644
https://stackoverflow.com/questions/19731471/reflective-material-in-three-js
https://threejsfundamentals.org/threejs/lessons/threejs-backgrounds.html
https://jsfiddle.net/diatom/gn4d0j81/7/
*/