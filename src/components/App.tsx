import { useState } from 'react'
import logo from '/assets/chainlingo_logo.svg'
import '../css/App.css'
import LeaderBoard from './LeaderBoard';


function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <div>
        <h1>ChainLingo 1.0</h1>
        <a href="https://github.com/ChainLingo/chainlingo-front" target="_blank">
          <img src={logo} className="logo" alt="chainlingo logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={logo} className="logo react" alt="Moving chainlingo logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setIsPlaying(true)} disabled={isPlaying}>
          {isPlaying ? 'loading...' : 'Start'}
        </button>
      </div>
      {!isPlaying && <LeaderBoard />}
    </>
  )
}

export default App
