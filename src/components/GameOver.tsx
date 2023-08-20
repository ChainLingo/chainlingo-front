import { FC, useState } from 'react'
import { gameStats } from '../global-type'

type props = {
    stat: gameStats,
    setGameOver: () => void
}

const GameOver: FC<props> = ({ stat, setGameOver }) => {
    const [input, setInput] = useState<string>('')
    const [submit, setSubmit] = useState<boolean>(false);

    const handleSubmit: () => void = async () => {
        setSubmit(true);
        const data = {
            user_name: input,
            streak: stat.streak,
            max_len: stat.longest[0].length,
        }
        try {
            const response = await fetch("https://chain-lingo-back.onrender.com/record", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) { console.log("Record inserted successfully"); }
            else { console.error("Error inserting record"); }
        }
        catch (e) { console.error("Something went wrong...", e); }

        setSubmit(false)
    }
    return (<>
        <div className="gameover">
            <h1>Gameover</h1>
            <h2>Total score</h2>
            <div className='streak'>Streak:<br /> {stat.streak}<br /></div>
            <div className='longest'> Longest word:<br /> {stat.longest.join(', ')}<br /></div>
            {`(Length: ${stat.longest[0].length})`}<br />
        </div>
        <div className='name-input'>
            <div>Register your score!</div>
            <input type='text' onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { e.key === 'Enter' && handleSubmit() }}
                placeholder='Your name'
                disabled={submit} />
            <div className='submit'><button onClick={handleSubmit} >Submit</button></div>
        </div >
        <div><button onClick={setGameOver}>Play again?</button></div>
    </>)
}
export default GameOver