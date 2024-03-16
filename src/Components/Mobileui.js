/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Fzj1CEzIahJ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Mobileui() {
    return (
      <div className="max-w-sm mx-auto">
        <div className="bg-[#3498db] text-white text-center py-4">
          <p className="mb-2">Sorry, your browser does not support screen capture.</p>
          <a className="underline" href="#">
            Learn how to allow
          </a>
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Free online screen recorder</h1>
          <p className="mb-4">Capture anything you want on your desktop</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Webcam</li>
            <li>Microphone</li>
            <li>System Sound</li>
            <li>Any screen, window or tab</li>
          </ul>
          <p className="text-sm mb-4">Supported browsers: Google Chrome, Mozilla Firefox, Microsoft Edge, Opera.</p>
          <div className="space-y-4">
            <div className="flex items-center">
              <ComputerIcon className="text-[#3498db] mr-2" />
              <span>Free screen recorder with no download</span>
            </div>
            <div className="flex items-center">
              <LockIcon className="text-[#3498db] mr-2" />
              <span>High privacy of recording process</span>
            </div>
            <div className="flex items-center">
              <GaugeIcon className="text-[#3498db] mr-2" />
              <span>Fast video saving in HD</span>
            </div>
            <div className="flex items-center">
              <HeartIcon className="text-[#3498db] mr-2" />
              <span>Free. Online. Yours.</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  function ComputerIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="14" height="8" x="5" y="2" rx="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" />
        <path d="M6 18h2" />
        <path d="M12 18h6" />
      </svg>
    )
  }
  
  
  function GaugeIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 14 4-4" />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      </svg>
    )
  }
  
  
  function HeartIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    )
  }
  
  
  function LockIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  }
  