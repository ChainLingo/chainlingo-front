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
            <h2>{"<Leader board>"}</h2>
            {leaderboardArray ?
                (<table className='lb-tb'>
                    <thead>
                        <tr className='th-row'>
                            <th>Streak</th>
                            <th>Word length</th>
                            <th>Player</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardArray.map(entry => (
                            (<tr key={entry.id} className='record'><td>{entry.streak}</td><td>{entry.max_len}</td><td>{entry.user_name}</td></tr>)
                        ))}
                    </tbody>
                </table>)
                : <p>Loading</p>}
        </div>)
}
