import '../css/Rule.css'
export default function Rule() {
    return (<>
        <p>Welcome to ChainLingo, a unique word-chaining game that challenges your vocabulary and strategic thinking!</p>
        <div className="rule-description">Here's how to play:
            <ol>
                <li>Press "Start" to begin. One round is 60 seconds.</li>
                <li>Type words that begin with the letter in the Game Tile, and end with any letter from your Letter Tiles.</li>
                <li>The chosen Letter Tile you becomes the new Game Tile.</li>
                <li>Letter Tiles will refresh until the round ends.</li>
                <li>Type your name at the end to submit your score!</li>
            </ol >
        </div>
        <p>Ready to show off your word skills?<br />Press the "Start" button to begin the game!</p>
    </>)
}