export const sortNumbersDescending  = (numbers) => {
    return numbers.sort((a, b) => {
        return Number(b - a);
    })
}

export const getHighestNumber = (numbers) => {
    return (Math.max(...numbers));
}