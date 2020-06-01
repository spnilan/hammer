import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { usePosition } from 'use-position';

// useposition
// beautiful react hooks



const ARTest = props => {


  let validated = true;
  const [cameraOpen, setCameraOpen] = useState(false);

  const removeCamera = () => {
    setCameraOpen(false);
    let video = document.querySelector("#arjs-video");
    if (video) {
      document.body.removeChild(video);
    }
  }


  window.AFRAME.registerComponent('target-object-clicked', {
    schema: {
      color: {default: 'red'}
    },

  init: function () {
    //var data = this.data;
    var el = this.el;  // <a-box>
    //var defaultColor = el.getAttribute('material').color;


    const onClick = () => {
      removeCamera();
      alert('hello');
    }
    //console.log("whats up nerds")
    el.addEventListener('click', function () {
      onClick();
    });

    el.addEventListener('touchstart', function () {
      onClick();
    });
  }
});


/*
  let location = {
    latitude: "43.668420",
    longitude: "-70.247750"
  };
*/
/*
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    error,
  } = usePosition(true, {enableHighAccuracy: true});
*/
  // update 


  const latitude = "43.668420";
  const longitude = "-70.247750";

  console.log(`lat: ${latitude}, long: ${longitude}`);
  return <a-scene arjs='sourceType: webcam; debugUIEnabled: false'>
          <a-anchor hit-testing-enabled="true">
          <a-sphere 
              position="0 1.25 -5" 
              radius="1.25" 
              color="#EF2D5E" />
          </a-anchor>
          <a-camera-static>
              <a-cursor></a-cursor>
          </a-camera-static>
        </a-scene>;

  /*
  if (!cameraOpen) {
    return <button style={{ position: 'absolute', left: '50%', bottom: '50px' }} onClick={() => setCameraOpen(true)}>Open Camera</button>
  } else {
    return  <div>
              <a-scene vr-mode-ui="enabled: false" embedded
                arjs='sourceType: webcam; debugUIEnabled: false;'>
                  <a-box 
                  position="0 0 0" 
                  color="#4CC3D9" />
              <a-camera-static />
              </a-scene>

              <div style={{ position: 'absolute', left: '50%', bottom: '50px' }}>
                Lat: {latitude}
                Long: {longitude}
                <button onClick={() => removeCamera()}>Close Camera</button>
              </div>
          </div>
  }



  

*/
/*
<a-entity gltf-model="/assets/magnemite/scene.gltf" rotation="0 180 0" scale="0.15 0.15 0.15" gps-entity-place={`longitude: ${longitude}; latitude: ${latitude}`} animation-mixer/>
*/
  
            

}

export default ARTest
/*
<a-scene arjs='sourceType: webcam; debugUIEnabled: false'>
          <a-anchor hit-testing-enabled="true">
              <a-entity position='0 0 0' scale='0.05 0.05 0.05' rotation='200 0 0' obj-model='obj: url(models/dog.obj); mtl: url(models/dog.mtl)'></a-entity>
              </a-anchor>
              <a-camera-static preset="hiro" />
            </a-scene>;
*/

/*
let g =  (
  <a-scene>
    <a-box 
      position="-1 0.5 -3" 
      rotation="0 45 0" 
      color="#4CC3D9" />
    <a-sphere 
      position="0 1.25 -5" 
      radius="1.25" 
      color="#EF2D5E" />
    <a-cylinder 
      position="1 0.75 -3" 
      radius="0.5" 
      height="1.5" 
      color="#FFC65D" />
    <a-plane 
      position="0 0 -4" 
      rotation="-90 0 0" 
      width="4" 
      height="4" 
      color="#7BC8A4" />
  </a-scene>
);
*/