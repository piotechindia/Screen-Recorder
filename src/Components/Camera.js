import React from 'react'
import { useRef, useEffect, useState, useCallback, useContext } from 'react'
import { MyContext } from '../AuthProvider ';
import {UseDownloadVideo} from '../utlis/UseDownloadVideo'
import {UseHandlePause} from '../utlis/UseHandlePause'
import {UseHandleplay} from '../utlis/UseHandleplay'

function Camera() {
  const videoref = useRef(null);
  const scondref = useRef(null);
  const context = useContext(MyContext);

  const [getvideo, setgetvideo] = useState(null);
  const [mediaRecorder, setmediaRecorder] = useState(null);
  const [chunks, setchunks] = useState([]);
  const [blobdata, setblobdata] = useState(null);
  const [pausevideo, setpausevideo] = useState(true);
  const [showdownload, setshowdownload] = useState(true);


  const handledatavailble = useCallback((e) => {
    setchunks((prevChunks) => {
      const newChunks = [...prevChunks, e.data];
      return newChunks;
    });
  }, []);
  useEffect(() => {
    async function onserver() {
      try {
        const micval = context.state1 === "camMic" ? true : false;
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: micval,
        }).then(async (data) => {
          setgetvideo(data);
          videoref.current.srcObject = data;
        });
      } catch (error) {
        console.log(error);
      }
    }
    onserver();
  }, [])

  useEffect(() => {
    try {
      let mediaRecorder = new MediaRecorder(getvideo);
      setmediaRecorder(mediaRecorder);
      mediaRecorder.start(1000);
      mediaRecorder.ondataavailable = handledatavailble;
    } catch (error) {
      console.log(error, "For Error");
    }
  }, [getvideo]);

  function Handleclick() {
    setshowdownload(false)

    try {
      setTimeout(() => {
        const blob = new Blob(chunks, {
          type: "video/webm"
        });
        setblobdata(blob)
  
        mediaRecorder.stop()
        getvideo.getTracks()
          .forEach(track => track.stop());
        const showvideodata = URL.createObjectURL(blob);
        scondref.current.src = showvideodata;
      }, 1000);
      
    } catch (error) {
      console.log(error)
    }
  }

  function Downloadvideo() {
    UseDownloadVideo(blobdata)
  }

  function Pausevideo() {
    UseHandlePause(mediaRecorder, videoref);
    setpausevideo(true)
  }

  function Resumeideo() {
    UseHandleplay(mediaRecorder, videoref);
  }

  return (
    <div>
      {/* <video src="" ref={videoref} autoPlay={true} muted controls height={400} width={400} />
      <video src="" ref={scondref} autoPlay={true} muted controls height={400} width={400} />
      <button type='button' onClick={Handleclick}>Stop</button>
      <button type='button' onClick={Downloadvideo}>Download</button>
      <button type='button' onClick={Pausevideo}>Pause</button>
      <button type='button' onClick={Resumeideo}>Resume</button> */}



      <div>
            <div className="flex h-screen w-full items-center justify-center bg-[#2c3e4e] p-8">
                <div className="relative flex w-full max-w-4xl flex-col items-center rounded-lg bg-white p-4 shadow-lg">
                    <div className="absolute top-4 right-4"><button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"><svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            className="h-6 w-6">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                            <line x1="3" x2="21" y1="9" y2="9"></line>
                            <path d="m9 16 3-3 3 3"></path>
                        </svg></button></div>
                    <div className="mb-4 flex w-full items-center justify-between"><svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" className="h-8 w-8 text-[#374151]">
                        <path
                            d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z">
                        </path>
                        <circle cx="12" cy="13" r="3"></circle>
                    </svg>
                        {/* <h1 className="text-xl font-bold">Real Screen Recorder</h1> */}
                    </div>
                    <div className="mb-8 flex w-full justify-center">
                        <div className="flex w-full max-w-md flex-col items-center rounded-lg  p-4">
                            <div className="mb-4 flex w-full items-center justify-between">
                                {/* <h2 className="text-lg font-semibold">Real Screen Recorder</h2> */}
                            </div>
                            {showdownload ? (
                                <>
                                    <video
                                        src=""
                                        ref={videoref}
                                        autoPlay={true}
                                        className="setvideo"
                                        muted
                                        controls
                                        height={300}
                                        width={384}
                                    />
                                    <div className="flex w-full justify-between">
                                        <div className="flex w-full justify-between">
                                            <button
                                                className="inline-flex mt-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-red-600 text-white" onClick={Handleclick}
                                            >
                                                Stop Recording
                                            </button>
                                        </div>
                                        {pausevideo ? (
                                            <button
                                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-gray-300 mt-10 text-gray-700"
                                                onClick={Pausevideo}
                                            >
                                                Pause
                                            </button>
                                        ) : (
                                            <button
                                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-gray-300 mt-10 text-gray-700"
                                                onClick={Resumeideo}
                                            >
                                                Resume
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="showvideodiv">
                                    <video
                                        src=""
                                        ref={scondref}
                                        autoPlay={true}
                                        className="setvideo"
                                        
                                        controls
                                        height={300}
                                        width={384}

                                    />
                                    <button
                                        className="inline-flex items-center downloadbtn justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-gray-300 mt-10 text-gray-700"
                                        onClick={Downloadvideo}
                                    >
                                        Download
                                    </button>
                                </div>

                            )}

                        </div>
                    </div>

                </div>
            </div>
        </div>


    </div>
  )
}

export default Camera