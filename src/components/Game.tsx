import { useState, useEffect } from 'react';
import { getRandomChar, getFullPlayerTiles } from '../util/helper';
import { gameStats } from '../global-type';
import { GameOver, PlayerTiles, PlayerInput } from './index';
import '../css/Game.css';

const initialChar: string = getRandomChar();
const initialPlayerTiles: string[] = getFullPlayerTiles();


export default function Game() {
    const initialStat: gameStats = {
        fieldTile: initialChar,
        history: [''],
        streak: 0,
        longest: [''],
        playerTiles: initialPlayerTiles
    }
    const [stat, setStat] = useState<gameStats>(initialStat);
    const [verMessage, setVerMessage] = useState<string>('Pess "Enter" key to submit');
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState(60); // Initial time in seconds

    useEffect(() => {//count down timer
        if (timeLeft > 0) {
            const timer = setInterval(() => { setTimeLeft(timeLeft - 1); }, 1000);
            return () => clearInterval(timer); // Clean up interval when component unmounts
        }
        else setGameOver(true)
    }, [timeLeft]);

    const updateStats = (newStat: gameStats): void => {
        setStat({ ...newStat })
        console.log('stat', stat)
    }
    const updateMessage = (newMessage: string): void => {
        setVerMessage(newMessage)
        setTimeout(() => {
            setVerMessage('Pess "Enter" key to submit')
        }, 2000)
    }

    const updateGameOver = (): void => {
        setGameOver(false)
        setTimeLeft(60)
    }

    return (
        <>{gameOver ?
            <GameOver stat={stat} setGameOver={updateGameOver} />
            : (<div className="container">
                <div className="timer">Time remaining: {timeLeft} seconds</div>
                <div className="score">
                    <p>Streak: {stat.history.length - 1}<br />{`Longest: ${stat.longest} (${stat.longest[0].length} letters)`}</p></div>
                <div className="field-tile">{stat.fieldTile.toUpperCase()}</div>
                <div className='player-tile'><PlayerTiles playerTiles={stat.playerTiles} /></div>
                <div className="input">
                    <div className='desc'>{verMessage}</div>
                    <PlayerInput stat={stat} updateStat={updateStats} updateMessage={updateMessage} /></div>
                <div className="history">{stat.history.join(' 👉 ')}</div>
            </div >)
        }
        </>
    )
}