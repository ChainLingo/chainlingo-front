import { useState } from 'react'
import logo from '/assets/chainlingo_logo.svg'
import '../css/App.css'
import LeaderBoard from './LeaderBoard';
import Rule from './Rule';
import Game from './Game';


function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <header>
        <div className='header'>
          <div className='title'>
            <a href="https://github.com/ChainLingo/chainlingo-front" target="_blank">
              <img src={logo} className="logo" alt="Moving chainlingo logo" />
            </a><p>ChainLingo 1.0</p>
          </div>
        </div>
      </header>
      <main>
        <div className="game">
          {!isPlaying ?
            (<><Rule />
              <button className='start' onClick={() => setIsPlaying(true)} disabled={isPlaying}>
                {isPlaying ? 'loading...' : 'Start'}
              </button></>)
            : <><Game /></>
          }
        </div>
      </main>
      <footer>
        <div className='bottom'>
          <LeaderBoard />
        </div>
      </footer>
    </>
  )
}

export default App
