function generatorCnpj(isMask) {
    const cnpjNumber = createCnpjNumber()

    if (isMask)
        return cnpjNumber.toString().replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')

    return cnpjNumber
}

function createCnpjNumber() {
    const lstNumbers = createListNumber()

    let digit1 = calculateDigitCpf(lstNumbers)
    let digit2 = calculateDigitCpf(lstNumbers, digit1)

    return `${lstNumbers.join('')}${digit1}${digit2}`
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

function calculateRestCpf(sumDigit) {
    return 11 - sumDigit % 11;
}

function calculateSumDigit(lstNumbers, digit) {
    var sumDigit = digit === undefined ? 0 : (digit * 2)
    var salt = digit === undefined ? 2 : 3

    for (let i = 12; i > 0; i--) {
        sumDigit += lstNumbers.indexOf(i) * salt++
        if (salt >= 9)
            salt = 2
    }

    return sumDigit
}

function calculateDigitCpf(lstNumbers, digit1) {
    let digit = calculateRestCpf(calculateSumDigit(lstNumbers, digit1))

    if (digit >= 10)
        return 0

    return digit
}