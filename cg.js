// Imports
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/GLTFLoader.js';

var camera, cena, renderer, controls;
var modelPokeball, esfera, materialGlass, modelPokemon;
var mixer, action, mixer2, action2;
var luzAmbiente, luzDirecional, light;
var delta, clock; 
var geometry
var animateBool = false;

var speed = 1;
var rotateSpeed = 100*speed;
var opacitySpeed = 2*speed;
var pokemonSpeed = 0.02*speed 
var pokemonSpeedVertical = 0.01*speed

var animaPokemon = false

function onKeyDown(event) {

    if (event.key == 'o') {
        if(materialGlass.opacity > 0) {
            materialGlass.opacity -= opacitySpeed*delta;
        }
    } else if(event.key == 'p'){
        if(materialGlass.opacity < 1) {
            materialGlass.opacity += opacitySpeed*delta;
        }
    }

    if(event.key == 'z'){
        esfera.rotation.x -= (delta*rotateSpeed) * Math.PI / 180;
    }

    if(event.key == 'w'){
        modelPokemon.position.z -= pokemonSpeed*1;
    } else if( event.key == 'a'){
        modelPokemon.position.x -= pokemonSpeed*1;
    }else if( event.key == 's'){
        modelPokemon.position.z += pokemonSpeed*1;
    }else if( event.key == 'd'){
        modelPokemon.position.x += pokemonSpeed*1;
    }

    if( event.key == '5'){
        if(animateBool == true){
            action2.stop();
            animateBool = false;
        } else {
            action2.play()
            animateBool = true;
        }
    }

    if(event.key == '6'){
        modelPokemon.rotation.y -= (delta*rotateSpeed) * Math.PI / 180;
    }else if(event.key == '4'){
        modelPokemon.rotation.y += (delta*rotateSpeed) * Math.PI / 180;
    }else if(event.key == '8'){
        modelPokemon.rotation.x += (delta*rotateSpeed) * Math.PI / 180;
    }else if(event.key == '2'){
        modelPokemon.rotation.x -= (delta*rotateSpeed) * Math.PI / 180;
    }
    
    if(event.key == 'q'){
        modelPokemon.position.y -= pokemonSpeedVertical*1;
    } else if( event.key == 'e'){
        modelPokemon.position.y += pokemonSpeedVertical*1;
    }

    if(event.key == 'n'){

        animatePokemon();
    }
 
};



// Inicial 
function createScene() {   
    // Cena       
    cena = new THREE.Scene();
    cena.background = new THREE.Color( 0xffffff );

    // Camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //camera.position.set( x , y , z );
    //camera.lookAt( new THREE.Vector3( x , y, z) );
    camera.position.z = 15;

    camera.position.set(1.7780375322268238, 4.666367111566359, 4.603324703102395)

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
    luzAmbiente = new THREE.AmbientLight( 0xffffff ); // soft white light
    cena.add( luzAmbiente );
    
    light = new THREE.HemisphereLight( 0x000000, 0x004400 );
    light.position.set( 0, -20, 0 );
    cena.add( light );

    light = new THREE.PointLight( 0xffffff );
    light.position.set( 0, -20, 10 );
    cena.add( light );

    light = new THREE.PointLight( 0xffffff );
    light.position.set( 0, 20, 0);
    cena.add( light );

    // Models
    // Meia esfera
    geometry = new THREE.SphereBufferGeometry(2.99, 50, 50, 0, 2*Math.PI, 0, 0.5 * Math.PI);
    materialGlass = new THREE.MeshPhongMaterial({color: 0x000000, transparent: true, opacity: 1});
    materialGlass.side = THREE.DoubleSide;
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
        modelPokeball.add(esfera);
        
 
        // Animação
        mixer = new THREE.AnimationMixer(modelPokeball);
        var animation = gltf.animations[0];
        animation.loop = true
        action = mixer.clipAction(animation);
        action.play();
        
        gltf.scene.traverse( child => {

            if ( child.material ) child.material.metalness = .9;
        
        } );

        gltf.scene.traverse( function( node ) {

            if ( node instanceof THREE.Mesh ) {
                node.castShadow = true;
                node.receiveShadow = true;
             }
    
        } );

    


    }, undefined, function ( e ) {
        alert(e);
    } );

    loader.load( './Models/articuno_maya_rig_free/scene.gltf', function ( gltf ) {
        modelPokemon = gltf.scene;
        cena.add(modelPokemon);
        modelPokemon.scale.set(0.005,0.005,0.005);
        modelPokemon.position.x = -1.48;
        modelPokemon.position.y = 2.62;
        modelPokemon.position.z = 0.46;

        mixer2 = new THREE.AnimationMixer(modelPokemon);
        console.log(gltf.animations);
        var animation = gltf.animations[0];
        animation.loop = true
        action2 = mixer2.clipAction(animation);
        

    }, undefined, function ( e ) {
        alert(e);
    } );


    document.addEventListener('keydown', onKeyDown, false);

       
}

createScene();

function autoFly(){
    modelPokemon.position.x += (delta/2)*Math.sin(Date.now() / 240);
    modelPokemon.position.z += (delta/2)*Math.cos(Date.now() / 600);
}

// Main
function animate() {
    requestAnimationFrame( animate );
    delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    if (mixer2) mixer2.update(delta);
    //console.log(delta)

    if(materialGlass.opacity > 0.1){
        materialGlass.opacity -= 0.01;
    }
    
    if(animaPokemon) {
        if(animateBool == false){
            action2.play();
            animateBool = true;
        }
        autoFly();
    }
    


    console.log(modelPokemon.position)
    
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