import React, { useState, useEffect, Fragment } from 'react'
import { usePosition } from 'use-position';

const ARLocation = ({value, validated, completed, onComplete, onChange }) => {

  const [cameraOpen, setCameraOpen] = useState(false);

  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    error
  } = usePosition(true, {enableHighAccuracy: true});


  const removeCamera = () => {
    setCameraOpen(false);
    let video = document.querySelector("#arjs-video");
    if (video) {
      document.body.removeChild(video);
    }
  }

  useEffect(() => {
      if (validated) {
        let scene = document.querySelector('a-scene');
    
        let latitude = value.latitude;
        let longitude = value.longitude;
        let model = document.createElement('a-sphere');
        model.setAttribute("id", "sphere");
        model.setAttribute("cursor-listener", "true");
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute("color","#4CC3D9");
        model.setAttribute("radius", "4");
        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });
    
        scene.appendChild(model);
      }
  }, [validated, value]);


  useEffect(() => {
    if (validated) return;
    if (latitude && longitude) {
      console.log("updated position")

      /*
      onChange({
        latitude,
        longitude
      })
      */
    }
  }, [latitude, longitude, validated]);

  useEffect(() => {
    window.AFRAME.registerComponent('target-object-clicked', {
        schema: {
          color: {default: 'red'}
        },
    
        init: function () {
            var el = this.el;  // <a-box>
            const onClick = () => {
                removeCamera();
                alert('hello');
            }
            //console.log("whats up nerds")
            el.addEventListener('click', function () {
                if (validated && !completed) onComplete();
            });
    
            el.addEventListener('touchstart', function () {
                if (validated && !completed) onComplete();
            });
        }
    });

    return () => removeCamera();
  }, []);

    return  cameraOpen ?
    <Fragment>
        <a-scene vr-mode-ui="enabled: false" embedded
            arjs='sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;'>
            <a-camera gps-camera rotation-reader>
                <a-entity cursor="fuse: true; fuseTimeout: 500"
                    position="0 0 -1"
                    geometry="primitive: ring; radiusInner: 0.04; radiusOuter: 0.07"
                    material="color: black; shader: flat">
                </a-entity>
            </a-camera>
        </a-scene>
        <button onClick={removeCamera} style={{ position: 'absolute', left: '50%', bottom: '50px'}} >
            Remove Camera
        </button>
    </Fragment> :
    <button onClick={setCameraOpen(true)} style={{ position: 'absolute', left: '50%', bottom: '50px'}} >
        Open Camera
    </button>
}        

export default ARLocation;