import React, { useState } from 'react'
import { useEffect } from 'react';



function ScreenCam() {

  const [localCamStream, setlocalCamStream] = useState(null);
  const [localScreenStream, setlocalScreenStream] = useState(null);
  const [videocam, setvideocam] = useState(null);
  const [camerarec, setcamerarec] = useState(null);
  const [canvaselm, setcanvaselm] = useState(null);
  const [auidodata, setauidodata] = useState([]);

  useEffect(() => {
    async function startWebcamFn() {
      try {
        const localCamStreamdata = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: {
            deviceId: {
              exact: "communications"
            }
          }
        });

        setlocalCamStream(localCamStreamdata)
        const videocam = attachToDOM("justcam", localCamStreamdata);
        setcamerarec(videocam);

        const localScreenStreamdata = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        setlocalScreenStream(localScreenStreamdata);
        const storestate = attachToDOM("justvideo", localScreenStreamdata);
        setvideocam(storestate);

      } catch (error) {
        console.error(error)
      }
    }
    startWebcamFn()
  }, [])

  useEffect(() => {
    try {
      //(videocam, camerarec, "localScreenStreamlocalScreenStream");
      if (localCamStream && localScreenStream) {
        const videoWidth = "1920";
        const videoHeight = "1080";
        let canvasElement = document.createElement("canvas");
        let canvasCtx = canvasElement.getContext("2d");
        console.log(videocam, "for videocam",  videocam.width);
        canvasCtx.save();
        console.log(videocam, "For video cam");
        canvasElement.setAttribute("width", `${videocam.width}px`);
        canvasElement.setAttribute("height", `${videocam.height}px`);
        console.log(canvasElement, "For  canvaselment")
        canvasCtx.clearRect(0, 0, videocam.width, videocam.height);
        canvasCtx.drawImage(videocam, 0, 0, videoWidth, videoHeight);
        canvasCtx.drawImage(
          camerarec,
          0,
          Math.floor(videocam.height - videocam.height / 4),
          Math.floor(videocam.videoWidth / 4),
          Math.floor(videocam.videoHeight / 4)
        );
        console.log(canvasElement, canvasCtx);
        setcanvaselm(canvasElement)
        if (canvasElement) {
          mergeStreamsFn();
        }
        else {
          console.log("CANVASELM IS NULL");
        }
        let imageData = canvasCtx.getImageData(
          0,
          0,
          videocam.videoWidth,
          videocam.videoHeight
        );
        canvasCtx.putImageData(imageData, 0, 0);
        canvasCtx.restore();
      }
    } catch (error) {
      console.error(error, "for error");
    }


  }, [localCamStream, localScreenStream, canvaselm])


  function attachToDOM(id, stream) {
    let videoElem = document.createElement("video");
    videoElem.id = id;
    videoElem.width = 640;
    videoElem.height = 360;
    videoElem.autoplay = true;
    videoElem.setAttribute("playsinline", true);
    videoElem.srcObject = new MediaStream(stream.getTracks());
    document.body.appendChild(videoElem);
    return videoElem;
  }

  async function mergeStreamsFn() {
    try {
      const audioContext = new AudioContext();
      const audioDestination = audioContext.createMediaStreamDestination();
      let fullVideoStream = await canvaselm.captureStream();
      let existingAudioStreams = [
        ...(localCamStream ? localCamStream.getAudioTracks() : []),
        ...(localScreenStream ? localScreenStream.getAudioTracks() : [])
      ];
      const audiodata = audioContext.createMediaStreamSource(
        new MediaStream([existingAudioStreams[0]])
      )
      console.log(audiodata, "FOR AUDIODATA");
      const audioStream = audioContext.createMediaStreamSource(
        new MediaStream([existingAudioStreams[0]])
      );
      console.log(audioStream,"FO raudioStream ")
      setauidodata([audioStream]);

     
      if (existingAudioStreams.length > 1) {
        const audioStreamtwo = audioContext.createMediaStreamSource(
          new MediaStream([existingAudioStreams[1]])
        );
        console.log(audioStreamtwo)
        setauidodata([audioStreamtwo]);
      }
      auidodata.map((track) => track.connect(audioDestination));
    } catch (error) {
      console.log(error)
    }
   
  }

  // async function startWebcamFn() {
  //   const localCamStream = await navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: {
  //       deviceId: {
  //         exact: "communications"
  //       }
  //     }
  //   });
  //   if (localCamStream) {
  //     cam = await attachToDOM("justWebcam", localCamStream);
  //   }
  // }

  // async function startScreenShareFn() {
  //   const localScreenStream = await navigator.mediaDevices.getDisplayMedia({
  //     video: true,
  //     audio: true
  //   });
  //   if (localScreenStream) {
  //     screen = await attachToDOM("justScreenShare", localScreenStream);
  //   }
  // }
  return (
    <div>
      data

    </div>
  )
}

export default ScreenCam