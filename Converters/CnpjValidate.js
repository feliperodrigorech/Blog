function isCnpjValid(value) {
    value = value.replace(/\D/g, '')
    value = value.padStart(14, '0')

    if (isExceptionCnpj(value))
        return false

    if (!isValidCnpjNumber(value))
        return false

    if (
        calculateRestCnpj(
            sumCnpjDigit(value, 12)
        ) !=
        parseInt(value.substring(12, 13))
    ) {
        return false
    }

    if (
        calculateRestCnpj(
            sumCnpjDigit(value.substring(0, 13), 13)
        ) !=
        parseInt(value.substring(13, 14))
    ) {
        return false
    }

    return true
}

function isExceptionCnpj(value) {
    var lstCpfException = new Array(
        '00000000000000',
        '11111111111111',
        '22222222222222',
        '33333333333333',
        '44444444444444',
        '55555555555555',
        '66666666666666',
        '77777777777777',
        '88888888888888',
        '99999999999999'
    )

    return lstCpfException.includes(value)
}

function isValidCnpjNumber(value) {
    if (value == '' || value === undefined || value === null || value.legth < 14)
        return false

    return true
}

function sumCnpjDigit(value, length) {
    var pos = length - 7
    var sumDigit = 0

    for (i = length; i >= 1; i--) {
        sumDigit += value.charAt(length - i) * pos--
        if (pos < 2)
            pos = 9
    }

    return sumDigit
}

function calculateRestCnpj(value) {
    return value % 11 < 2 ? 0 : 11 - value % 11
}