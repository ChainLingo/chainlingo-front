import { useState, useEffect } from 'react'
import '../css/App.css'
import { Rule, Game, LeaderBoard, Header } from './index';


function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => { fetch('https://chain-lingo-back.onrender.com/', { method: 'GET' }) }, []) //waking up the API (deployed on render and it sleeps in 15 min of no action)
  return (
    <>
      <header><Header /></header>
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
