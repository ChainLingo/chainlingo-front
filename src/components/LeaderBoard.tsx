import { record } from '../global-type'
import { useState } from 'react'

export default function LeaderBoard() {
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

    return <div className='leader-board'>
        Current top record:
        {leaderboardArray ?
            (<ul>
                {leaderboardArray.map(entry => (
                    <li key={entry.id}>{entry.user_name} - Streak: {entry.streak} | Max word length {entry.max_len}</li>
                ))}
            </ul>)
            : <p>No leaderboard data available.</p>}
        <button onClick={getLeaderBoard} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Reflesh leader board'}
        </button>
    </div>
}