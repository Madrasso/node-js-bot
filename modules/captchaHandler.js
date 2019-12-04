const fetch = require("node-fetch")

const submitCaptcha = async (captchaParams, api) => {
    const body = {
        body: (typeof captchaParams === 'string') ? captchaParams : null,
        json: true
    }
    const response = await fetch(`${api.in}?key=${api.key}&method=base64`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
    let buffer = await response.buffer()
    return JSON.parse(buffer.toString()).request
}

const getAnswer = (id, api) => {
    return new Promise((resolve, reject) => {
        const polling = setInterval(async () => {
            const response = await fetch(`${api.res}?key=${api.key}&json=1&action=get&id=${id}`);
            let buffer = await response.buffer();
            buffer = buffer.toString();
            const res = toJson(buffer)
            if (res.status && res.status === 1) {
                clearInterval(polling)
                resolve(res.request)
            }
        })
    })
}

const solveCaptcha = async (params, api) => {
    try {
        let id = await submitCaptcha(params, api)
        let answer = await getAnswer(id, api)
        return answer
    } catch (e) {
        return e
    }
}

function toJson(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
}

module.exports = {
    submitCaptcha,
    getAnswer,
    solveCaptcha
}