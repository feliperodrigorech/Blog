function generatorCnpj(isMask) {
    const cnpjNumber = createCnpjNumber()

    if (isMask)
        return cnpjNumber.toString().replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')

    return cnpjNumber
}

function createCnpjNumber() {
    const lstNumbers = createListNumber()

    lstNumbers.push(calculateDigitCnpj(lstNumbers))
    return `${lstNumbers.join('')}${calculateDigitCnpj(lstNumbers)}`
}

function createListNumber() {
    const lstNumbers = new Array()

    for (let i = 0; i < 8; i++)
        lstNumbers.push(randomNumber())

    for (let i = 0; i < 3; i++)
        lstNumbers.push(0)

    lstNumbers.push(1)

    return lstNumbers
}

function randomNumber() {
    return Math.floor(Math.random() * 9)
}

function calculateRestCnpj(sumDigit) {
    return sumDigit % 11;
}

function calculateSumDigit(lstNumbers) {
    let sumDigit = 0
    let salt = 9

    for (let i = lstNumbers.length - 1; i >= 0; i--) {
        sumDigit += lstNumbers[i] * salt--
        if (salt < 2)
            salt = 9
    }

    return sumDigit
}

function calculateDigitCnpj(lstNumbers) {
    let digit = calculateRestCnpj(calculateSumDigit(lstNumbers))

    if (digit >= 10)
        return 0

    return digit
}