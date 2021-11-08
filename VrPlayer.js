import fox1 from './sun_temple_stripe_stereo.jpg';
import React, { Component, useState, useEffect } from 'react';
import * as THREE from 'three';
 import video_file from './abijata_sun_set.mp4';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

var earthMesh, freedomMesh;

let camera;
let renderer;
let scene;
//var  video_file =`http://localhost:8000/uploads/VR/lion_unity_11_kDsZv74.mp4`;
function VrPlayer(props){
  const getTexturesFromAtlasFile = ( atlasImgUrl, tilesNum ) => {
   
    const textures = [];

    for ( let i = 0; i < tilesNum; i ++ ) {

      textures[ i ] = new THREE.Texture();

    }

    const loader = new THREE.ImageLoader();
    loader.load( atlasImgUrl, function ( imageObj ) {

      let canvas, context;
      const tileWidth = imageObj.height;

      for ( let i = 0; i < textures.length; i ++ ) {

        canvas = document.createElement( 'canvas' );
        context = canvas.getContext( '2d' );
        canvas.height = tileWidth;
        canvas.width = tileWidth;
        context.drawImage( imageObj, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
        textures[ i ].image = canvas;
        textures[ i ].needsUpdate = true;

      }

    } );

    return textures;

  }

  const onWindowResize = () => {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

  }

  const animate = () => {

    renderer.setAnimationLoop(  );

  }

  const rendera = () => {

    renderer.render( scene, camera );

  }
  


  useEffect(() => {
    const container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

				scene = new THREE.Scene();

				const geometry = new THREE.SphereGeometry( 500, 60, 40 );
				// invert the geometry on the x-axis so that all of the faces point inward
				geometry.scale( - 1, 1, 1 );

				const texture = new THREE.TextureLoader().load( '/IMG_20210514_172639_00_107.jpg' );
				const material = new THREE.MeshBasicMaterial( { map: texture } );

				const mesh = new THREE.Mesh( geometry, material );

				scene.add( mesh );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				container.style.touchAction = 'none';
				//container.addEventListener( 'pointerdown', onPointerDown );

			//	document.addEventListener( 'wheel', onDocumentMouseWheel );

				//

				document.addEventListener( 'dragover', function ( event ) {

					event.preventDefault();
					event.dataTransfer.dropEffect = 'copy';

				} );

				document.addEventListener( 'dragenter', function () {

					document.body.style.opacity = 0.5;

				} );

				document.addEventListener( 'dragleave', function () {

					document.body.style.opacity = 1;

				} );

				document.addEventListener( 'drop', function ( event ) {

					event.preventDefault();

					const reader = new FileReader();
					reader.addEventListener( 'load', function ( event ) {

						material.map.image.src = event.target.result;
						material.map.needsUpdate = true;

					} );
					reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

					document.body.style.opacity = 1;

				} );

				//

				window.addEventListener( 'resize', onWindowResize );

      animate()
    },[]);

  
  

    return (

      <>
      <div id="container">
    
  
      </div>
      </>
    );
  
 
}

export default VrPlayer;

