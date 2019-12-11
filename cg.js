// Imports
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/GLTFLoader.js';

var camera, cena, renderer, controls;
var modelPokebola, esfera, materialEsfera;
var mixerPokebola, actionPokebola;

var modelPokemon;
var mixerPokemon, actionPokemon;
var flyStatus = false;

var luzAmbiente, light;
var delta, clock; 

var speed = 0.05;
var rotateSpeed = 50*speed;
var opacitySpeed = 2*speed;
var pokemonMoveSpeed = .2*speed;
var pokemonSpeedVertical = .2*speed;

var modelBandeira;
var mixerBandeira, actionBandeira;


function onKeyDown(event) {
    //Opacidade
    if (event.key == 'o') {
        if(materialEsfera.opacity > 0) {
            materialEsfera.opacity -= opacitySpeed;
        }
    } else if(event.key == 'p'){
        if(materialEsfera.opacity < 1) {
            materialEsfera.opacity += opacitySpeed;
        }
    }

    if(event.key == 'z'){
        if(esfera.rotation.x > -0.56) esfera.rotation.x -= (rotateSpeed) * Math.PI / 180;

    } else if(event.key == 'x'){
        if(esfera.rotation.x < 0)  esfera.rotation.x += (rotateSpeed) * Math.PI / 180;

    }

    // Movimentação
    if(flyStatus){ //Apenas voando
        if(event.key == 'w'){
            modelPokemon.position.z -= pokemonMoveSpeed;
        } else if( event.key == 'a'){
            modelPokemon.position.x -= pokemonMoveSpeed;
        }else if( event.key == 's'){
            modelPokemon.position.z += pokemonMoveSpeed;
        }else if( event.key == 'd'){
            modelPokemon.position.x += pokemonMoveSpeed;
        }

        // Rotação em X
        if(event.key == '8'){
            modelPokemon.rotation.x += rotateSpeed * Math.PI / 180;
        }else if(event.key == '2'){
            modelPokemon.rotation.x -= rotateSpeed * Math.PI / 180;
        }

        if(event.key == '6'){
            modelPokemon.rotation.y -= rotateSpeed * Math.PI / 180;
        }else if(event.key == '4'){
            modelPokemon.rotation.y += rotateSpeed * Math.PI / 180;
        } 

        // Movimento vertical
        if(event.key == 'q'){
            modelPokemon.position.y -= pokemonSpeedVertical;
        } else if( event.key == 'e'){
            modelPokemon.position.y += pokemonSpeedVertical;
        }

       


    }


    if(event.key == 't'){
        console.log(light.position.y)
        light.position.y -= pokemonSpeedVertical*500;
    } else if( event.key == 'y'){
        light.position.y += pokemonSpeedVertical*500;
    }


    if(event.key == ' '){     
        flyStatus = !flyStatus;
        if(flyStatus){
            actionPokemon.play();
        } else {
            actionPokemon.stop();
        }
    }

   
};



// Inicial 
function createScene() {   
    // Cena       
    cena = new THREE.Scene();
    cena.background = new THREE.Color( 0x000000 );


    // Camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(2.6065302634881538, 9.458777001424812, 9.074338966644643);
    camera.lookAt(new THREE.Vector3( -0.29648430068836945, -0.6161579931206986, -0.7296892399911086 ));
    //camera.position.set( x , y , z );
    //camera.lookAt( new THREE.Vector3( x , y, z) );

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
    luzAmbiente = new THREE.AmbientLight( 0xffffff );
    cena.add( luzAmbiente );

    light = new THREE.PointLight( 0xffffff );
    light.position.set( 0, 20, 0);
    cena.add( light );

    light = new THREE.PointLight( 0xffffff );
    light.position.set( 0, -20, 10 );
    cena.add( light );

   

    // Models
    // Meia esfera
    var geometry = new THREE.SphereBufferGeometry(2.99, 50, 50, 0, 2*Math.PI, 0, 0.5 * Math.PI);
    materialEsfera = new THREE.MeshPhongMaterial({color: 0x000000, transparent: true, opacity: 1});
    materialEsfera.side = THREE.DoubleSide;
    esfera = new THREE.Mesh(geometry, materialEsfera);

    esfera.position.y += 2.3;
    esfera.position.x -= 0.97;
    esfera.position.z -= 0.3;
    esfera.castShadow = true;

    // Pokebola
    var loader = new GLTFLoader();

    loader.load( './Models/pokeball/scene.gltf', function ( gltf ) {
        modelPokebola = gltf.scene;
        cena.add(modelPokebola);
        modelPokebola.scale.set(1,1,1);
        //Add esfera ao objeto
        modelPokebola.add(esfera);
        
 
        // Animação
        mixerPokebola = new THREE.AnimationMixer(modelPokebola);
        var animation = gltf.animations[0];
        animation.loop = true
        actionPokebola = mixerPokebola.clipAction(animation);
        actionPokebola.play();
        
        gltf.scene.traverse( child => {
            if ( child.material ) child.material.metalness = 0.9;
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

        mixerPokemon = new THREE.AnimationMixer(modelPokemon);
        var animation = gltf.animations[0];
        animation.loop = true
        actionPokemon = mixerPokemon.clipAction(animation);
        

    }, undefined, function ( e ) {
        alert(e);
    } );


    document.addEventListener('keydown', onKeyDown, false);

    loader.load( './Models/animated_flag/scene.gltf', function ( gltf ) {
        modelBandeira = gltf.scene;
        cena.add(modelBandeira);
        modelBandeira.position.x = 0.15;
        modelBandeira.position.y = 1.77;
        modelBandeira.position.z = 1.1;
        modelBandeira.scale.set(0.03,0.03,0.03);

        mixerBandeira = new THREE.AnimationMixer(modelBandeira);
        var animation = gltf.animations[0];
        animation.loop = true;
        actionBandeira = mixerBandeira.clipAction(animation);
        actionBandeira.play();

        gltf.scene.traverse( function( node ) {

            if ( node instanceof THREE.Mesh ) {
                node.castShadow = true;
                node.receiveShadow = true;
             }
    
        } );
        

    }, undefined, function ( e ) {
        alert(e);
    } );

       
}

createScene();

function fly(){
    modelPokemon.position.x += (delta/2)*Math.sin(Date.now() / 240);
    modelPokemon.position.z += (delta/2)*Math.cos(Date.now() / 600);
}

// Main
function animate() {
    requestAnimationFrame( animate );
    delta = clock.getDelta();
    speed = delta;

    if (mixerPokebola) mixerPokebola.update(delta);
    if (mixerPokemon) mixerPokemon.update(delta);
    if (mixerBandeira) mixerBandeira.update(delta);
    //console.log(delta)

    if(flyStatus) {
        fly();
    }

    renderer.render(cena, camera);

 
    var vector = new THREE.Vector3();
    camera.getWorldDirection( vector );
    console.log(vector);
    console.log("camera =")
    console.log(camera.position.clone())
    
}

animate();


/*
skin pokemon
background
post online

add pokemon
animations
    pokemon
    open pokeball
background
glassmaterial


*/