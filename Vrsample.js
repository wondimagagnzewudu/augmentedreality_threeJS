import React, { Component } from "react";
import ReactDOM from "react-dom";
import fox from './sample.gltf';
import fox1 from './royal_esplanade_1k.hdr';
import { v4 as uuidv4 } from 'uuid';
import {
  Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  HemisphereLight,
  Vector3,
  Clock,
  AnimationMixer
} from "three";
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
var earthMesh, freedomMesh;

let scene;
let container;
var camera, controls, rotateSpeed, zoomSpeed;
class Vrsample extends Component {
  componentDidMount() {
    scene = new THREE.Scene();
     scene.background = new Color("skyblue");
     var renderer = new THREE.WebGLRenderer({ });
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);
    container = document.querySelector("#scene-container");
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    const mixers = [];


    this.renderer = new THREE.WebGLRenderer({ antialias: true });
 
    renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;
  
 
    var camera = new THREE.PerspectiveCamera(
     50,
      (this.mount.clientWidth) / (this.mount.clientHeight),
      0.1,
      20
    );
    camera.position.z = 5;
    camera.position.x = -12;
    
    
 
    const light = new THREE.DirectionalLight( 0xdfebff, 1 );
 
				light.position.set( 50, 200, 100 );
				light.position.multiplyScalar( 1.3 );

				light.castShadow = true;

				light.shadow.mapSize.width = 1024;
				light.shadow.mapSize.height = 1024;
    const d = 300;
    light.shadow.camera.left = - d;
				light.shadow.camera.right = d;
				light.shadow.camera.top = d;
				light.shadow.camera.bottom = - d;
        light.shadow.camera.far = 1000;
    var lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[3] = new THREE.PointLight(0xffffff, 1, 0);
    lights[4] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    lights[3].position.set(-50, -100, -50);
    lights[4].position.set(-150, -50, -150);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
    scene.add(lights[3]);
    scene.add(lights[4]);
    scene.add( light );
   // const loader = new GLTFLoader();
   const onLoad = (result, position) => {
     console.log(result.scene.children[0]);
    const model = result.scene.children[0];

    model.position.copy(position);
    model.scale.set(0.65, 1.35, 0.65);



    scene.add(model);
  };
  const loadertwo = new RGBELoader().setDataType( THREE.UnsignedByteType );
  
  loadertwo.load( fox1, function ( texture ) {

    var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

    scene.background = envMap;
    scene.environment = envMap;

  } );
  var pmremGenerator = new THREE.PMREMGenerator( renderer );
				pmremGenerator.compileEquirectangularShader();
   const loader = new GLTFLoader();
  //  this.renderer.setSize(width, height);
 
  const parrotPosition = new Vector3(0, -9, 0);
  console.log( 'model2' );  
  loader.load(
      
      fox, 
      function ( gltf ) {   
        onLoad(gltf,parrotPosition)
      }
      
    );
    function usesMouse(e) {
      if(!e.targetTouches) {
          console.log('Mouse detected!');
          rotateSpeed = 0.2;
          zoomSpeed = 0.0001;
      }
      window.removeEventListener('touchstart', usesMouse, true);
      window.removeEventListener('mousemove', usesMouse, true);
      window.removeEventListener('mousedown', usesMouse, true);
      window.removeEventListener('wheel', usesMouse, true);
  }
    window.addEventListener('touchstart', usesMouse, true);
    window.addEventListener('mousemove', usesMouse, true);
    window.addEventListener('mousedown', usesMouse, true);
    window.addEventListener('wheel', usesMouse, true);

  var animate = function() {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.zoomSpeed = 0.0001;
    controls.rotateSpeed = 0.002;
    controls.update();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
   requestAnimationFrame(animate);
  

    renderer.render(scene, camera);
  };
  animate();
  }
  


  render() {
    return (
      <div style={{paddingTop:'5%'}}
       
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
  
 
}

export default Vrsample;

