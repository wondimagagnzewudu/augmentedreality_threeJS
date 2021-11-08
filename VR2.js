
import React, { Component, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useHistory } from "react-router-dom";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fox2 from './oromia_green.glb';
import wonchi from './wonchi_stick.glb';
import dendi from './Dandi_stick.glb';
import grass from './grasslight-big.jpg';
import balemountains from './balemountains.glb';

import SofOmar from './SofOmar.glb';
import AbbaJifar from './AbbaJifar.glb';
import {
  Vector3,
} from "three";
import {

  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  Row,
} from 'reactstrap';
let camera, scene, renderer;
var group = [];
group = new THREE.Group;

let sky, sun;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2;
let isUserInteracting = false,
onPointerDownMouseX = 0, onPointerDownMouseY = 0,
onPointerDownLon = 0,
lat = 0, onPointerDownLat = 0,
phi = 0, theta = 0;
// const parrotPosition = new Vector3(0, 0, 0);
//var  video_file =`http://localhost:8000/uploads/VR/lion_unity_11_kDsZv74.mp4`;
function VR2(props) {
  const [lon, setlon] = useState(150);
  const [up, setup] = useState(0);
  let history = useHistory();
  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    animate();

  }
  const handle_see_down= async () => {
    
    if ( isUserInteracting === false ) {

      setup (up-5 );

       }

       lat = Math.max( - 85, Math.min( 85, lat ) );
       phi = THREE.MathUtils.degToRad( 90 - lat );
       theta = THREE.MathUtils.degToRad( lon );
       const x = 500 * Math.sin( phi ) * Math.cos( theta );
       const y = 500 * Math.cos( phi )+up;
       const z = 500 * Math.sin( phi ) * Math.sin( theta );
       camera.lookAt( x, y, z );
       update();

 }
  const handle_see_top = async () => {
    
    if ( isUserInteracting === false ) {

      setup (up+5 );

       }

       lat = Math.max( - 85, Math.min( 85, lat ) );
       phi = THREE.MathUtils.degToRad( 90 - lat );
       theta = THREE.MathUtils.degToRad( lon );
       const x = 500 * Math.sin( phi )* Math.cos( theta ); 
       const y = 500 * Math.cos( phi )+up;
       const z = 500 * Math.sin( phi ) * Math.sin( theta );
       camera.lookAt( x, y, z );
       update();

 }
  const handle_see_vrleft = async () => {
    console.log('camera',camera)
    requestAnimationFrame( animate );
    if ( isUserInteracting === false ) {

           setlon (lon- 5);

       }
       group.rotateY(0.01 );
       lat = Math.max( - 85, Math.min( 85, lat ) );
       phi = THREE.MathUtils.degToRad( 90 - lat );
       theta = THREE.MathUtils.degToRad( lon );

       const x = 500 * Math.sin( phi ) * Math.cos( theta );
       const y = 500 * Math.cos( phi )+up;
       const z = 500 * Math.sin( phi ) * Math.sin( theta );

       camera.lookAt( x, y, z );
       update();

 }
  const handle_see_vr = async () => {
    requestAnimationFrame( animate );
   if ( isUserInteracting === false ) {
    setlon (lon+ 5)

      }
      group.rotateY(0.01 );
      lat = Math.max( - 85, Math.min( 85, lat ) );
      phi = THREE.MathUtils.degToRad( 90 - lat );
      theta = THREE.MathUtils.degToRad( lon );

      const x = 500 * Math.sin( phi ) * Math.cos( theta );
      const y = 500 * Math.cos( phi )+up;
      const z = 500 * Math.sin( phi ) * Math.sin( theta );
console.log( x, y, z)
      camera.lookAt( x, y, z );
      update();

}
  function animate() {

    requestAnimationFrame(animate);
    raycaster.setFromCamera(mouse, camera);
  
    // And checking if it intersects with an array object
    
    var intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
      
      if (intersects[0].object.parent.name === 'glob') {
      
        scene.children[5].scale.set(5, 5, 5);
      }
      else{
        if(scene.children[5]){
          scene.children[5].scale.set(1, 1, 1);
        }
       
      }
      if (intersects[0].object.parent.name === 'wonchi') {
      
          scene.children[4].scale.set(7, 7, 7);
        }
        else{
          if(scene.children[4]){
            scene.children[4].scale.set(3, 3, 3);
          }
         
        }
    }
    
  
    update()
  
   
  }
  function update() {

  
    renderer.render( scene, camera );

}
  function initSky() {

    // Add Sky
    sky = new Sky();
    sky.scale.setScalar(450000);
    scene.add(sky);

    sun = new THREE.Vector3();

    /// GUI

    const effectController = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 2,
      azimuth: 180,
      exposure: renderer.toneMappingExposure
    };

    function guiChanged() {

      const uniforms = sky.material.uniforms;
      uniforms['turbidity'].value = effectController.turbidity;
      uniforms['rayleigh'].value = effectController.rayleigh;
      uniforms['mieCoefficient'].value = effectController.mieCoefficient;
      uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

      const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
      const theta = THREE.MathUtils.degToRad(effectController.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);

      uniforms['sunPosition'].value.copy(sun);

      renderer.toneMappingExposure = effectController.exposure;
      renderer.render(scene, camera);

    }

    // const gui = new GUI();

    // gui.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
    // gui.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
    // gui.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
    // gui.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
    // gui.add( effectController, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
    // gui.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
    // gui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );

    guiChanged();

  }
  const onLoad = (result) => {


    const model = result.scene.children[0];
    model.scale.set(5, 5, 5);

    model.position.set(-250, -245, 0);
    model.name = 'orom-eth';

    // model.rotateX( -(Math.PI) /2 );
    //    model.rotateZ( Math.PI/2  );

    scene.add(model);
  };
  const onLoad2 = (result) => {

    console.log(result.scene.children[0]);
    const model2 = result.scene.children[0];

    model2.position.set(-250, -250, 0);
    model2.scale.set(5, 5.3, 5);
    //model.rotateY( (Math.PI)  );
    //    model.rotateZ( Math.PI/2  );

    scene.add(model2);
  };
  const onLoad3 = (result) => {

    const model3 = result.scene.children[0];
    model3.name = 'glob';

    model3.position.set(-400, -65, 0);
    model3.scale.set(5, 5, 5);

    //  model.rotateY( (Math.PI/2)  );
    // model3.rotateZ( Math.PI/2  );

    scene.add(model3)
    // group.position.set(-400,-125, 0 );


    //  scene.add(model);
  };
  const onLoad4 = (result) => {

    const model4 = result.scene.children[0];
    model4.name = 'wonchi';

    model4.position.set(-600, -125, -100);
    model4.scale.set(3, 3, 3);

    //  model.rotateY( (Math.PI/2)  );
    // model3.rotateZ( Math.PI/2  );

    scene.add(model4)
    // group.position.set(-400,-125, 0 );


    //  scene.add(model);
  };
  const onLoad5 = (result) => {

    const model5 = result.scene.children[0];
    model5.name = 'bale';

    model5.position.set(-400, -175, 0);
    model5.scale.set(3, 3, 3);

    //  model.rotateY( (Math.PI/2)  );
    // model3.rotateZ( Math.PI/2  );

    scene.add(model5)
    // group.position.set(-400,-125, 0 );


    //  scene.add(model);
  };
  const onLoad6 = (result) => {

    const model6 = result.scene.children[0];
    model6.name = 'SofOmar';

    model6.position.set(-500, -175, 0);
    model6.scale.set(3, 3, 3);

    //  model.rotateY( (Math.PI/2)  );
    // model3.rotateZ( Math.PI/2  );

    scene.add(model6)
    // group.position.set(-400,-125, 0 );


    //  scene.add(model);
  };
  const onLoad7 = (result) => {

    const model7 = result.scene.children[0];
    model7.name = 'abbajifar';

    model7.position.set(-700, -175, -50);
    model7.scale.set(3, 3, 3);

    //  model.rotateY( (Math.PI/2)  );
    // model3.rotateZ( Math.PI/2  );

    scene.add(model7)
    // group.position.set(-400,-125, 0 );


    //  scene.add(model);
  };
  function onClick(event) {
    var rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / (rect.width - rect.left)) * 2 - 1;
    mouse.y = - ((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
    // This is basically converting 2d coordinates to 3d Space:
    raycaster.setFromCamera(mouse, camera);
    // And checking if it intersects with an array object
    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      if (intersects[0].object.parent.name === 'glob') {
        history.push("/Vr_360");

      }
      if (intersects[0].object.parent.name === 'wonchi') {
        history.push("/Vr_wonchi");

      }
    }
  }
  function onMouseMove(event) {
    event.preventDefault();
  
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  useEffect(() => {



    scene = new THREE.Scene();

    const container = document.getElementById('container');
    scene.background = new THREE.Color(0xcce0ff);

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 550, 2000);
    scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);
    // lights

    scene.add(new THREE.AmbientLight(0xffffff));


    // const helper = new THREE.GridHelper( 10000, 2, 0xffffff, 0xffffff );
    // scene.add( helper );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', animate);
    //controls.maxPolarAngle = Math.PI / 2;
    controls.enableZoom = true;
    controls.enablePan = true;
    const light = new THREE.DirectionalLight(0xffffff, 1, 0);
    light.position.set(50, 200, 100);
    light.position.multiplyScalar(1.3);

    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    const d = 300;

    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;

    light.shadow.camera.far = 1000;

    // scene.add( light );
    var lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    scene.add(lights[0]);
    

    const loader1 = new THREE.TextureLoader();
    const groundTexture = loader1.load(grass);
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    const groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });

    let mesh = new THREE.Mesh(new THREE.PlaneGeometry(20000, 20000), groundMaterial);
    mesh.position.y = - 250;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // initSky();
    const loader = new GLTFLoader();
    loader.load(

      fox2,
      function (gltf) {
        onLoad(gltf)
      }

    );
    // loader.load(

    //   fox3, 
    //   function ( gltf ) {   
    //     onLoad2(gltf)
    //   }

    // );
    loader.load(

      dendi,
      function (gltf) {
        onLoad3(gltf)
      }

    );
    loader.load(

      wonchi,
      function (gltf) {
        onLoad4(gltf)
      }

    );
    loader.load(

      balemountains,
      function (gltf) {
        onLoad5(gltf)
      }

    );
    loader.load(

      SofOmar,
      function (gltf) {
        onLoad6(gltf)
      }

    );
    loader.load(

      AbbaJifar,
      function (gltf) {
        onLoad7(gltf)
      }

    );

    window.addEventListener('click', onClick);
    window.addEventListener('resize', onWindowResize);
    window.addEventListener("mousemove", onMouseMove, false)
    animate();
  }, []);


  return (

    <>
         <div  id="container">
     

     </div>
    
     <div style={{backgroundColor: 'rgba(52, 52, 52, 0.0)', alignItems: 'center',position: 'absolute',bottom:200, }}>
     <p style={{color:'#FFFFFF'}}> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  360°</p>
   
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Button onClick={() => { handle_see_top() }} color="danger" >▲   
  </Button>
  <br/>
  <Button color="danger"  onClick={() => { handle_see_vrleft() }} > ◀    </Button>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <Button  color="danger" onClick={() => { handle_see_vr() }} > 
▶  </Button>
  <br/>
 &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Button onClick={() => { handle_see_down() }}   color="danger" > ▼
  </Button>
  </div>


    </>
  );


}

export default VR2;