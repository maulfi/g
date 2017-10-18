'use strict'
let crypto = require('crypto')

let encrypt_password_spice = (username = '', password = '') => {
    username = username.toLowerCase()
    while(username.length < 30) {
        username += " "
    }
    username = username.substr(0, 30)
    let merge = password + username
    let encrypt_sha1 = crypto.createHash('sha1').update(merge).digest('binary')
    let new_string = encrypt_sha1 + username
    let final_encrypt = new Buffer(new_string, 'binary').toString('Base64')
    return final_encrypt
}
console.log(encrypt_password_spice('geronimo', 'geronimo'))
exports.encrypt_password_spice = encrypt_password_spice