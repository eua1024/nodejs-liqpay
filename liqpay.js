// https://www.liqpay.ua/documentation/api/aquiring/checkout/doc

let base64 = require('js-base64').Base64;
let crypto = require('crypto');
let sha1 = crypto.createHash('sha1');
let cryptoRandomString = require('crypto-random-string');

let public_key = 'sandbox_i47596800000';
let private_key = 'sandbox_fFKSCg7jnc9lHrALlAFkcF0YrD1jBJwvfFvvvvv';

let timestamp = Date.now();

let raw_data = {
    'public_key': public_key,
    'action'         : 'pay',
    'language'       : 'en', // ru, uk, en
    'amount'         : '100',
    'currency'       : 'UAH',
    'description'    : 'Your payment description. №' + timestamp,
    'order_id'       : 'order-' + timestamp + '-' + cryptoRandomString({length: 6}),
    'version'        : '3',
    // 'result_url'     : 'http://site/purchase/success', // Not required
    // 'server_url'     : 'https://server1/callback', // URL API for payment creator, not required
    // 'split_rules'    : JSON.stringify([
    //     {
    //         'public_key': 'sandbox_i496024000000', // puclic_key receiver
    //         'amount': '100',
    //         'commission_payer': 'receiver',
    //         // 'server_url': 'https://server2/callback' // URL API for receiver, not required
    //     }
    // ])
};

let data = base64.encode(JSON.stringify(raw_data));
let signature = base64.encode(sha1
    .update(private_key + data + private_key)
    .digest()
);

let html = '<form method="POST" action="https://www.liqpay.ua/api/3/checkout" \n' +
    'accept-charset="utf-8">\n' +
    '<input type="hidden" name="data" value="' + data + '"/>\n' +
    '<input type="hidden" name="signature" value="' + signature + '"/>\n' +
    '<input type="image" \n' +
    'src="//static.liqpay.ua/buttons/p1ru.radius.png"/>\n' +
    '</form>';

console.log(html);
