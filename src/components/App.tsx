import { useState } from 'react'
import logo from '/assets/chainlingo_logo.svg'
import '../css/App.css'
import { record } from '../global-type'

function App() {
  const [count, setCount] = useState(0);
  const [leaderboardArray, setLeaderboardArray] = useState<null | record[]>();
  const [isLoading, setIsLoading] = useState(false);

    async function getLeaderBoard(): Promise<void> {
    try {
      setIsLoading(true);
      let leaderBoard = await fetch('https://chain-lingo-back.onrender.com/record/leaderboard', { method: 'GET' })
        .then(res => res.json());
      setLeaderboardArray(leaderBoard);
    }
    catch (err) { console.error(err); }
    finally { setIsLoading(false); }
  }

  return (
    <>
      <div>
        <a href="https://github.com/ChainLingo/chainlingo-front" target="_blank">
          <img src={logo} className="logo" alt="chainlingo logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={logo} className="logo react" alt="Moving chainlingo logo" />
        </a>
      </div>
      <h1>ChainLingo 1.0</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className='leader-board'>
        <button onClick={getLeaderBoard} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Fetch Leaderboard'}
        </button>
        {leaderboardArray ?
          (<ul>
            {leaderboardArray.map(entry => (
              <li key={entry.id}>{entry.user_name} - Streak: {entry.streak} | Max word length {entry.max_len}</li>
            ))}
          </ul>)
          : <p>No leaderboard data available.</p>}
      </div>
    </>
  )
}

export default App
