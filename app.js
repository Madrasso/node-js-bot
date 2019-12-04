console.log('')
console.log('-------------------------------')
console.log('  Cookie Clicker.')
console.log('  Developer: madrasso')
console.log('  Contact: vk.com/e.madrasso')
console.log('-------------------------------')
console.log('')

const { VK }                = require('vk-io'),
      { con, timeConverter }
                            = require('./modules/chat'),
      fetch                 = require("node-fetch"),
      config                = require('./config.json')
      captchaHandler        = require('./modules/captchaHandler');

const vk            = new VK({
    token: process.argv[2], 
    apiVersion: 5.103
});

const service = 'rucaptcha.com'
const api = {
    in: 'https://' + service + '/in.php',
    res: 'https://' + service + '/res.php',
    key: config.api_rucaptcha,
    pollingInterval: 5000
}

// statistic;

let clicks = 0;
let captcha = 0;
let start = new Date().getTime()

// start clicks loop

sendClick(5e3)

async function sendClick(delay) {
    vk.api.messages.send({
        peer_id: -168888000,
        message: '👆 Клик',
        payload: '{"click":1}'
    }).then(() => {
        clicks++;
        con(`Сделано кликов: ${clicks};   Решено капчи: ${captcha};   Прошло: ${timeConverter(new Date().getTime() - start)}`, 'white')
        setTimeout(sendClick, delay, delay)
    }).catch((e) => {
        if(e.code == 14)  {
            setTimeout(sendClick, 10e3, delay)
        }        
    })
}

vk.captchaHandler = async (payload, retry) => {
    const response = await fetch(payload.src);
    const buffer = await response.buffer();

    let key = await captchaHandler.solveCaptcha(buffer.toString('base64'), api)

	try {
        await retry(key);
        captcha++
	} catch (error) {
	}
};

setInterval(() => {
    vk.api.messages.send({
        peer_id: -168888000,
        message: '💳 Баланс',
        payload: '{"location":9}'
    })
}, 180e3)