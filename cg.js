// Imports

import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/GLTFLoader.js';

var camera, scene, renderer, model, cube, face, controls;

// Inicial 

function createScene() {
    

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x888888 );
                
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
   
   

   
    

    var light = new THREE.AmbientLight( 0xffffff ); // soft white light
    scene.add( light );
    


    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light );

    

    var light = new THREE.DirectionalLight( 0xffffff, 1, 1 );
    light.position.set( 0, -20, 0 ); 			//default; light shining from top
    light.castShadow = true;            // default false
    scene.add( light );


    //var geometry1 = new THREE.SphereGeometry(0.95,50,50);
    var geometry1 = new THREE.SphereBufferGeometry(2.99, 50, 50, 0, 2*Math.PI, 0, 0.5 * Math.PI);
    var material1 = new THREE.MeshLambertMaterial({color: 0xffffff, transparent: true, opacity: 0.1});
    var sphere1 = new THREE.Mesh(geometry1, material1);
    sphere1.position.y += 2.3;
    sphere1.position.x -= 0.97;
    sphere1.position.z -= 0.4;
    
   
        


    controls = new OrbitControls( camera, renderer.domElement );
  
    var loader = new GLTFLoader();
    loader.load( './Models/pokeball/scene.gltf', function ( gltf ) {
        model = gltf.scene;
        scene.add( model );
        model.scale.set(1,1,1);
        model.add(sphere1);
        
    }, undefined, function ( e ) {
        console.error( e );
        } );
       
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

}

createScene();



function animate() {
    requestAnimationFrame( animate );
    model.position.x += 1;

    renderer.render( scene, camera );
}

animate();