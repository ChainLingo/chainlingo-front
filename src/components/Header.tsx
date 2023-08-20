import logo from '/assets/chainlingo_logo.svg'

export default function header() {
    return (<>
        <div className='header'>
            <div className='title'>
                <a href="https://github.com/ChainLingo/chainlingo-front" target="_blank">
                    <img src={logo} className="logo" alt="Moving chainlingo logo" />
                </a>
                <a href="https://main--chainlingo.netlify.app/" target="_blank">ChainLingo 1.0</a>
            </div>
        </div></>)
}