import React, { useEffect, useRef, useState } from 'react';

const ScreenAndCameraRecorder = () => {
  const [localCamStream, setLocalCamStream] = useState(null);
  const [localScreenStream, setLocalScreenStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    async function startRecording() {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        setLocalScreenStream(screenStream);

        const camStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: { deviceId: { exact: "communications" } }
        });
        setLocalCamStream(camStream);

        const combinedStream = new MediaStream([...screenStream.getTracks(), ...camStream.getTracks()]);
        videoRef.current.srcObject = combinedStream;

        const recorder = new MediaRecorder(combinedStream);
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
          }
        };
        recorder.start();
        setRecording(true);

        // Stop recording after some duration (you can adjust this as needed)
        setTimeout(() => {
          recorder.stop();
          setRecording(false);
          screenStream.getTracks().forEach(track => track.stop());
          camStream.getTracks().forEach(track => track.stop());
        }, 10000); // Recording duration: 10 seconds (adjust as needed)
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }

    if (!recording) {
      startRecording();
    }

    return () => {
      recordedChunks.forEach(chunk => URL.revokeObjectURL(chunk));
    };
  }, [recording]);

  // Function to merge recorded chunks into a single Blob
  const mergeRecordedChunks = () => {
    const mergedBlob = new Blob(recordedChunks, { type: recordedChunks[0].type });
    // Now you can do something with the mergedBlob, such as uploading it to a server or displaying it to the user
    console.log("Merged Blob:", mergedBlob);
  };

  return (
    <div>
      {recording ? <p>Recording...</p> : <p>Not recording</p>}
      <video ref={videoRef} controls></video>
      <button onClick={mergeRecordedChunks}>Merge Recordings</button>
    </div>
  );
};

export default ScreenAndCameraRecorder;
