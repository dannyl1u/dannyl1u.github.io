import './App.css'

import Doggo from './components/Doggo'
import Liudogg from './components/Header'
import Weather from './components/Weather'

function App() {

  return (
    <>
      <div>
        <Liudogg />
        <video
        className="full-width-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/flying-squirrel-crop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <Weather />
        <Doggo />
      </div>
    </>
  )
}

export default App
