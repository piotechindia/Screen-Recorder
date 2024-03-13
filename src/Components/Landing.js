
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../AuthProvider '
function Landing() {
  const {state1, setState1, state2, setState2} = useContext(MyContext);
  const navigate = useNavigate();
  const [screen, setscreen] = useState(false);
  const [camera, setcamera] = useState(false);
  const [screencam, setscreencam] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [getcamera, setgetcamera] = useState(false);
  const [getscreen, setgetscreen] = useState(false);
  const [recordon, setrecordon] = useState(false);
  const handleOnChange = (event) => {
    console.log(event.target.value);
    setrecordon(event.target.checked);
};
  function Handleclickscreen() {
    setscreen(true);
    setcamera(false);
    setgetcamera(true)
  }

  function Handleclickcamera() {
    setcamera(true);
    setscreencam(false);
    setscreen(false);
    setgetcamera(true)
    setgetscreen(false);
  }

  function Handlerecording() {
    setState1(selectedValue);
    setState2({getcamera, getscreen});
    if (screen) {
      navigate('./screen')
    }
    else{
      navigate('/camera');
    }
  }
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
  };
  return (
    <div className="bg-[#2c3e50] p-8 text-white fullpage">
      <div className="flex items-center justify-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round" className="text-[#3498db] h-8 w-8">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
        <circle cx="12" cy="13" r="3"></circle>
      </svg>
        <h1 className="text-4xl font-bold">Web Screen Recorder</h1>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="flex flex-col pointer items-center justify-center p-4 bg-[#3498db] rounded-lg" onClick={Handleclickscreen}><svg
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-16 w-16 mb-2">
          <rect width="20" height="14" x="2" y="3" rx="2"></rect>
          <line x1="8" x2="16" y1="21" y2="21"></line>
          <line x1="12" x2="12" y1="17" y2="21"></line>
        </svg>
          <p>Capture with Screen</p>
        </div>
        <div onClick={Handleclickcamera} className="flex flex-col pointer items-center justify-center p-4 bg-[#3498db] rounded-lg"><svg
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-16 w-16 mb-2">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
          <circle cx="12" cy="13" r="3"></circle>
        </svg>
          <p>Capture with Camera</p>
        </div>
      </div>
      <p className="mt-4 text-center">Select any of the following options above to start recording.</p>
      

      {screen || screencam ? <div className="display_none" id="block1">
        <div className="switch_button">
          <p className="toogle_head">Record Audio</p>
          <label className="switch">
            <input type="checkbox" onChange={handleOnChange} id="check" />
            <span className="slider round"></span>
          </label>
        </div>
       {recordon ? <div className=" mic_btn">
          <form className="form_mic">
            <input
              type="radio"
              id="checkbox1"
              name="fav_language"
              value="Mic"
              className="mic"
              checked={selectedValue === "Mic"}
              onChange={handleRadioChange}
            />
            <label htmlFor="checkbox1" className="mic_label">
              Mic
            </label>
            <br />

            <input
              type="radio"
              id="checkbox2"
              name="fav_language"
              value="System"
              className="mic"
              checked={selectedValue === "System"}
              onChange={handleRadioChange}
            />
            <label htmlFor="checkbox2" className="mic_label">
              System
            </label>
            <br />

            <input
              type="radio"
              id="checkbox3"
              name="fav_language"
              value="Mic+system"
              className="mic"
              checked={selectedValue === "Mic+system"}
              onChange={handleRadioChange}
            />
            <label htmlFor="checkbox3" className="mic_label">
              Mic+system
            </label>
          </form>
        </div> : ''}
        <div className="btn_strt">
          <button className="btn_record" id="btn_record1" onClick={Handlerecording}> Start Recording </button>
        </div>
      </div> : ""}


      {camera ? <div className="display_none" id="block2">
        <div className="switch_button">
          <p className="toogle_head">Record Audio</p>
          <label className="switch">
            <input type="checkbox"  onChange={handleOnChange} id="check1" />
            <span className="slider round"></span>
          </label>
        </div>
        {recordon ?<div className="mic_btn mic_btn1">
          <form action="/action_page.php" className="form_mic">
            <div className="wrap">
              <input
                type="radio"
                id="checkbox3"
                name="fav_language"
                value="camMic"
                className="mic"
                checked={selectedValue === "camMic"}
                onChange={handleRadioChange}
              />
              <label for="checkboxx2" htmlFor='' className="mic_label">Mic</label><br />
            </div>
          </form>
        </div> : ''}
        <div className="btn_strt">
          <button className="btn_record" id="btn_record2" onClick={Handlerecording}> Start Recording </button>
        </div>
      </div> : ""}
    </div>
  )
}

export default Landing