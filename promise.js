function getRandomNumber() {
    return new Promise(resolve => {
        setTimeout(() => resolve(Math.floor(Math.random() * 100) + 1), 1000);
    });
}
async function processNumber() {
    try {
        const num = await getRandomNumber();
        console.log("Рандомне число:", num);
        
        if (num < 50) {
            const result = num + 20;
            console.log("Результат:", result);
            return result;
        } else {
            throw new Error("Число завелике!");
        }
    } catch (error) {
        console.log("Помилка:", error.message);
        return "лнаеплнешщгшлг";
    }
}
processNumber();