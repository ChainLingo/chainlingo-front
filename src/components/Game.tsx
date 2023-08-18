import { useState, useRef, useEffect } from 'react'
import { randomNum26 } from '../util/helper'
import '../css/Game.css'

const tilePlacement: string[] = ["top-right", "top-left", "bottom-left", "bottom-right"]

function Game() {
    const initialCharIndex: number = randomNum26();
    const [count, setCount] = useState<number>(1)
    const allChar = ["w", "o", "m", "k", "s", "n", "f", "b", "d", "c", "l", "a", "g", "u", "z", "y", "r", "j", "p", "t", "v", "e", "h", "i"];
    const [gameTile, setGameTile] = useState<string>(allChar[initialCharIndex]);
    let [playerTiles, setPlayerTiles] = useState<string[]>(["n", "f", "b", "d"]);
    const [verMessage, setVerMessage] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [longest, setLongest] = useState<string>('');
    const [submit, setSubmit] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [timeLeft, setTimeLeft] = useState(60); // Initial time in seconds

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearInterval(timer); // Clean up interval when component unmounts
        }
    }, [timeLeft]);

    useEffect(() => {
        for (let i = 1; i <= 3; i++) {
            let index = randomNum26()
            console.log('randomNum', index)
            setPlayerTiles([...playerTiles, allChar[index]])
        }
        setCount(count + 1)
    }, [history])

    const handleSubmit = async () => {
        console.log('varidating')
        setSubmit(true);
        const lastChar = input[input.length - 1].toLowerCase();
        console.log('input', input, lastChar)
        const tileIndex = playerTiles.indexOf(lastChar);

        try {
            if (tileIndex < 0) {
                setVerMessage('The last letter does not match any of your Letter Tiles.')
                console.log(verMessage)
            }
            else if (history.length > 0 && history.includes(input)) {
                setVerMessage('Word already used');
                console.log(verMessage)
            }
            else {
                await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
                    .then(response => {
                        if (response.status === 200) {// Word is valid
                            (true);
                            setVerMessage('Awesome!');
                            setHistory([...history, input]);
                            setGameTile(lastChar.toUpperCase());
                            setPlayerTiles(playerTiles.filter((crrChar) => crrChar !== lastChar))
                            if (playerTiles.length && playerTiles.length < 4) {
                                setPlayerTiles([...playerTiles, allChar[randomNum26()]])
                            }
                            if (longest === '') { setLongest(input) }
                            else if (longest.length < input.length) {
                                setLongest(input);
                                console.log('longest', longest)
                            }
                        }
                        else if (response.status === 404) {// Word is not valid
                            setVerMessage('Invalid word!');
                            (false);
                        }
                        else { console.error('Dictionary API response format was neither array or object:', response.body); }// Invalid response format
                    })
            }
        }
        catch (error) { console.error('Something went wrong...', error); }
        finally {
            setSubmit(false)
            setTimeout(() => {
                (null)
                setVerMessage(null)
            }, 1000)
        }
    }
    return (
        <>{timeLeft > 0 ? (
            <div className="container">
                <div className="timer"><p>Time remaining: {timeLeft} seconds</p></div>
                <div className="field-tile">{gameTile}</div>
                <div className="score">
                    <p>Streak: {history.length}<br />Longest: {longest}({longest.length != 0 && `${longest.length} letters`})</p></div>
                <div className="player-tile">
                    {playerTiles[0] && <div className={`tile ${tilePlacement[0]}`} key={0}>{playerTiles[0]}</div>}
                    {playerTiles[1] && <div className={`tile ${tilePlacement[1]}`} key={1}>{playerTiles[1]}</div>}
                    {playerTiles[2] && <div className={`tile ${tilePlacement[2]}`} key={2}>{playerTiles[2]}</div>}
                    {playerTiles[3] && <div className={`tile ${tilePlacement[3]}`} key={3}>{playerTiles[3]}</div>}
                </div>
                <div className="History">{history.join(' 👉 ')}</div>
                <div className="input">
                    <div className='desc'>Pess "Enter" key to submit</div>
                    <input
                        className='player-input'
                        placeholder='Type here!'
                        type='text'
                        ref={inputRef}
                        onChange={(e) => { setInput(e.target.value.toUpperCase()) }}
                        onKeyDown={(e) => {
                            e.key === 'Enter' && handleSubmit()
                             
                            console.log(input)
                        }}
                        disabled={submit}
                    />
                    <p>{verMessage && verMessage}</p>
                </div>
            </div >)
            : <div>Game over</div>
        }
        </>
    )
}
export default Game;