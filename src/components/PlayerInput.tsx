import { useState, useRef, FC } from 'react'
import { updatePlayerTiles} from '../util/helper';
import { gameStats } from '../global-type';

type props = {
    stat: gameStats,
    updateStat: (newStat: gameStats) => void
    updateMessage: (newMessage: string) => void
}

const PlayerInput: FC<props> = ({ stat, updateStat, updateMessage }) => {
    const [submit, setSubmit] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        setSubmit(true);
        const lastChar = input[input.length - 1].toLowerCase();
        const tileIndex = stat.playerTiles.indexOf(lastChar);
        try {
            if (input === '') { updateMessage('Input a word then press Enter') }
            else if (input[0].toLowerCase() !== stat.fieldTile) { updateMessage('The first letter should match the Field Tile') }
            else if (tileIndex < 0) { updateMessage('The last letter should match one of your Letter Tiles.') }
            else if (stat.history.length > 0 && stat.history.includes(input)) { updateMessage('Word already used'); }
            else {
                await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`).then(response => {
                    if (response.status === 200) {// Word is valid
                        const prevStat = Object.assign(stat);
                        let newHistory = [...prevStat.history, input]
                        let newLongest = [...prevStat.longest]; // Create a copy of the longest array
                        if (newLongest[0].length < input.length) { newLongest = [input]; }
                        else { [...newLongest, input]; }
                        updateStat({
                            streak: prevStat.streak + 1,
                            longest: newLongest,
                            history: newHistory,
                            fieldTile: lastChar,
                            playerTiles: updatePlayerTiles(prevStat.playerTiles, tileIndex)
                        })
                        updateMessage('ChainedLingo!!');
                        inputRef.current && (inputRef.current.value = '');
                    }
                    else if (response.status === 404) { updateMessage('Invalid word!'); }// Word is not valid
                    else { console.error('Dictionary API response format was neither array or object:', response.body); }// Invalid response format
                })
            }
        }
        catch (error) { console.error('Something went wrong...', error); }
        finally {
            setSubmit(false)
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 10);
        }
    }
    return (<>
        <input
            autoFocus={true}
            className='player-input'
            placeholder='Type here!'
            type='text'
            ref={inputRef}
            onChange={(e) => { setInput(e.target.value.toUpperCase()) }}
            onKeyDown={(e) => { e.key === 'Enter' && handleSubmit() }}
            disabled={submit} />
    </>)
}

export default PlayerInput;