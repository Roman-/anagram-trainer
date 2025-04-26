export const createHardAnagram = (word) => {
    for (let attempt = 0; attempt < 10; ++attempt) {
        const a = tryCreateHardAnagram(word)
        if (a !== word) {
            return a
        }
    }
    return word
}

const tryCreateHardAnagram = (word) => {
    let chars = word.split("");
    let result = [];

    while (chars.length > 0) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        let chosenChar = chars.splice(randomIndex, 1)[0];

        if (result.length === 0 || chosenChar !== result[result.length - 1]) {
            result.push(chosenChar);
        } else {
            let inserted = false;
            for (let i = result.length - 2; i >= 0; i--) {
                if (result[i] !== chosenChar) {
                    result.splice(i + 1, 0, chosenChar);
                    inserted = true;
                    break;
                }
            }
            if (!inserted) {
                result.unshift(chosenChar);
            }
        }
    }

    return result.join("");
}
