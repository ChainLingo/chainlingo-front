export const getRandomChar = () => {
    const alphabet = "aabcdeefghiijklmnoprstuvwyz";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}

export const getUniqueChar = (arr: string[]): string => {
    const char = getRandomChar();
    console.log(char)
    if (!arr.includes(char)) return char;
    else return getUniqueChar(arr)
}

export const updatePlayerTiles = (prevTiles: string[], index: number) => {
    let copyArr = [...prevTiles]
    const uniqueChar = getUniqueChar(prevTiles)
    copyArr[index] = uniqueChar
    return copyArr;
}

export const getFullPlayerTiles = () => {
    const newTile = [getRandomChar()];
    for (let i = 1; i <= 3; i++) {
        newTile.push(getUniqueChar(newTile))
    }
    return newTile
}

