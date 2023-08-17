import { record } from '../global-type'
import { useState, useEffect } from 'react'
import '../css/LeaderBoard.css'

export default function LeaderBoard() {
    let [leaderboardArray, setLeaderboardArray] = useState<null | record[]>();

    async function getLeaderBoard(): Promise<void> {
        try {
            let leaderBoard = await fetch('https://chain-lingo-back.onrender.com/record/leaderboard', { method: 'GET' })
                .then(res => res.json());
            setLeaderboardArray(leaderBoard);
        }
        catch (err) { console.error(err); }
    }

    useEffect(() => { getLeaderBoard() }, [])

    return (
    <div className='leader-board'>
        {"<Leader board>"}
        {leaderboardArray ?
            (<ul>
                {leaderboardArray.map(entry => (
                    <li key={entry.id} className='record'>{entry.user_name} - Streak: {entry.streak} | Max word length {entry.max_len}</li>
                ))}
            </ul>)
            : <p>Loading</p>}
    </div>)
}