function generatorCpf(isMask) {
    const cpfNumber = createCpfNumber()

    if (isMask)
        return cpfNumber.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

    return cpfNumber
}

function createCpfNumber() {
    const segment1 = randomSegments()
    const segment2 = randomSegments()
    const segment3 = randomSegments()

    const dig1 = verifyDigit(segment1, segment2, segment3)
    const dig2 = verifyDigit(segment1, segment2, segment3, dig1)

    return `${segment1}${segment2}${segment3}${dig1}${dig2}`
}

function verifyDigit(num1, num2, num3, num4) {
    let sumDigit

    if (num4 !== undefined) {
        sumDigit = sumDigitCpf(`${num1}${num2}${num3}${num4}`, 11)
        return calculateRestCpf(sumDigit)
    }

    sumDigit = sumDigitCpf(`${num1}${num2}${num3}`, 10)
    return calculateRestCpf(sumDigit)
}

function randomSegments() {
    const aleat = Math.floor(Math.random() * 999)
    return aleat.toString().padStart(3, '0')
}

function sumDigitCpf(value, length) {
    var sumDigit = 0

    for (let i = length, j = 0; i >= 2; i--, j++)
        sumDigit += parseInt(value.charAt(j)) * i

    return sumDigit;
}

function calculateRestCpf(sumDigit) {
    const rest = sumDigit % 11;
    return rest < 2 ? 0 : 11 - rest;
}