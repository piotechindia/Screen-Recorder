import { useRef, useContext, useEffect, useState, useCallback } from "react";
import { MyContext } from "../AuthProvider ";
import {UseDownloadVideo} from '../utlis/UseDownloadVideo'
import {UseHandlePause} from '../utlis/UseHandlePause'
import {UseHandleplay} from '../utlis/UseHandleplay'


function Screen() {
    const context = useContext(MyContext);
    const videoref = useRef(null);
    const scondref = useRef(null);
    const [blobData, setblobData] = useState(null);
    const [mixstream, setmixstream] = useState(null);
    const [recorder, setrecorder] = useState(null);
    const [chunks, setchunks] = useState([]);
    const [audiodata, setaudiodata] = useState(null)
    const [fromdata, setfromdata] = useState(null);
    const [pausevideo, setpausevideo] = useState(true);
    const [showdownload, setshowdownload] = useState(true);



    const handledatavailble = useCallback((e) => {
        setchunks((prevChunks) => {
            const newChunks = [...prevChunks, e.data];
            return newChunks;
        });
    }, []);
    useEffect(() => {
        console.log(context.state2, "for s");
        localStorage.setItem("micval", context.state1);
        const localdata = localStorage.getItem("micval");
        const micval = localdata === "Mic" ? "Mic" : false;
        const systemval = localdata === "System" ? "System" : false;
        const micsysval = localdata === "Mic+system" ? "Mic+system" : false;
        async function onScreenRec() {
            try {
                const getvideodata = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: systemval || micsysval,
                });
                if (micval) {
                    const audio = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            echoCancellation: true,
                            noiseSuppression: true,
                            samplerate: 44100
                        }
                    });
                    setaudiodata(audio);
                }
                setrecorder(getvideodata);
                videoref.current.srcObject = getvideodata;

            } catch (error) {
                console.log(error)
            }
        }
        onScreenRec();
    }, []);
    useEffect(() => {
        try {
            if (audiodata) {
                const mixstreamData = new MediaStream([
                    ...recorder.getTracks(),
                    ...audiodata.getTracks()
                ]);
                const recorder1 = new MediaRecorder(mixstreamData);
                setmixstream(recorder1);
                recorder1.start(200);
                recorder1.ondataavailable = handledatavailble;
            } else {
                const mixstreamData = new MediaStream([
                    ...recorder.getTracks()
                ]);
                const recorder1 = new MediaRecorder(mixstreamData);
                setmixstream(recorder1);
                recorder1.start(200);
                recorder1.ondataavailable = handledatavailble;
            }
        } catch (error) {
            console.log(error, "For Error");
        }
    }, [recorder]);

    const DownloadVideo = () => {
        UseDownloadVideo(blobData);
    }

    const stopRecoding = () => {
       
        try {
            setshowdownload(false)
            setTimeout(() => {
                const blob = new Blob(chunks, {
                    type: 'video/mp4'
                });
                setblobData(blob);
                const showvideodata = URL.createObjectURL(blob);
                // videoref.current.srcObject = showvideodata;
                scondref.current.src = showvideodata;
                recorder.getTracks().forEach(element => {
                    element.stop();
                });
                mixstream.stop();
            }, 1000);
           
        } catch (error) {
            console.log(error)
        }
    }

   

    const HandlePause = () => {
        UseHandlePause(mixstream, videoref)
        setpausevideo(false);
    }

    const HandleResume = () => {
        UseHandleplay(mixstream, videoref)
        setpausevideo(true);
        
    }


    return (
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
                    <div className="mb-4 flex w-full items-center justify-between"><svg  className='svgicon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-16 w-16 mb-2"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>
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
                                                className="inline-flex mt-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-red-600 text-white" onClick={stopRecoding}
                                            >
                                                Stop Recording
                                            </button>
                                        </div>
                                        {pausevideo ? (
                                            <button
                                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-gray-300 mt-10 text-gray-700"
                                                onClick={HandlePause}
                                            >
                                                Pause
                                            </button>
                                        ) : (
                                            <button
                                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-gray-300 mt-10 text-gray-700"
                                                onClick={HandleResume}
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
                                        muted
                                        controls
                                        height={300}
                                        width={384}

                                    />
                                    <button
                                        className="inline-flex items-center downloadbtn justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-gray-300 mt-10 text-gray-700"
                                        onClick={DownloadVideo}
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
    )
}

export default Screen

