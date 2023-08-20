import { FC, useState } from 'react'
import { gameStats } from '../global-type'

const GameOver: FC<{ stat: gameStats }> = ({ stat }) => {
    const [input, setInput] = useState<string>('')
    const [submit, setSubmit] = useState<boolean>(false);

    const handleSubmit: () => void = () => {
        setSubmit(true);
        console.log(input)
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
    </>)
}
export default GameOver