// Imports

import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/GLTFLoader.js';

var camera, scene, renderer, model, cube, face, controls;

// Inicial 

function createScene() {
    

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xFFFFFF );
                
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.translateX += 0;
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
   /*
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube ); */ 
    
    camera.position.z = 10;
   

    controls = new OrbitControls( camera, renderer.domElement );
  
    var loader = new GLTFLoader();
    loader.load( './Models/zubat/scene.gltf', function ( gltf ) {
        model = gltf.scene;
        scene.add( model );
        model.scale.set(0.01, 0.01, 0.01);
    }, undefined, function ( e ) {
        console.error( e );
        } );
       

}

createScene();



function animate() {
    requestAnimationFrame( animate );


    renderer.render( scene, camera );
}

animate();