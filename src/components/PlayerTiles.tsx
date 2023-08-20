import { FC } from 'react'

type Props = { playerTiles: string[] }

const PlayerTiles: FC<Props> = ({ playerTiles }: Props) => {
    const tilePlacement: string[] = ["top-right", "top-left", "bottom-left", "bottom-right"]
    return (<>
        {playerTiles[0] && <div className={`tile ${tilePlacement[0]}`} key={0}>{playerTiles[0]}</div>}
        {playerTiles[1] && <div className={`tile ${tilePlacement[1]}`} key={1}>{playerTiles[1]}</div>}
        {playerTiles[2] && <div className={`tile ${tilePlacement[2]}`} key={2}>{playerTiles[2]}</div>}
        {playerTiles[3] && <div className={`tile ${tilePlacement[3]}`} key={3}>{playerTiles[3]}</div>}
    </>)
}

export default PlayerTiles