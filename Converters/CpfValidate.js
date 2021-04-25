function isCpfValid(value) {
    value = value.replace(/\D/g, '')
    value = value.padStart(11, '0')

    if (isExceptionCpf(value))
        return false

    if (!isValidCpfNumber(value))
        return false

    if (
        validateRestValue(
            calculateRestCpf(
                sumCpfDigit(value, 9, 11)
            )
        ) !=
        parseInt(value.substring(9, 10))
    ) {
        return false
    }

    if (
        validateRestValue(
            calculateRestCpf(
                sumCpfDigit(value, 10, 12)
            )
        ) !=
        parseInt(value.substring(10, 11))
    ) {
        return false
    }

    return true
}

function isExceptionCpf(value) {
    var lstCpfException = new Array(
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    )

    return lstCpfException.includes(value)
}

function isValidCpfNumber(value) {
    if (value == '' || value === undefined || value === null || value.legth < 11)
        return false

    return true
}

function sumCpfDigit(value, repeat, length) {
    var sumDigit = 0

    for (i = 1; i <= repeat; i++) {
        sumDigit += parseInt(value.substring(i - 1, i)) * (length - i)
    }

    return sumDigit
}

function calculateRestCpf(sumDigit) {
    return (sumDigit * 10) % 11
}

function validateRestValue(rest) {
    if (rest == 10 || rest == 11)
        return 0

    return rest
}