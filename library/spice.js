'use strict'

let request = require('request')
let myConfig = require('./config.js')
let pass_lib = require('./password.js')

let spice_username = myConfig.spice_username
let spice_password = myConfig.spice_password
let spice_app_id = myConfig.spice_app_id
let post_method = '/'

let create_session = () => new Promise((resolve, reject) => {
    let start_process = new Date()
    let method = 'CreateSession'
    let encrypted_password = pass_lib.encrypt_password_spice(spice_username, spice_password)
    let url = myConfig.spice_url + method
    let postdata = {
        EncryptedPassword: encrypted_password,
        LoginName: spice_username,
        MessageRequestHeader: {
            ApplicationId: spice_app_id,
            SessionKey: "",
            MarketCode: myConfig.spice_market_code
        }
    }
    let options = {
        url: url + post_method,
        method: 'POST',
        json: postdata
    }
    // request_ws(options)
    request(options, function (error, response, body) {
        let end_process = new Date()
        if(body == undefined) {
            reject("An error occured, please try again later [SPICE].")
        }else if(body.error !== undefined) {
            reject(body.error)
        }else{
            resolve(response)
        }
    })
})

let request_ws = (options) => new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
        let end_process = new Date()
        if(body == undefined) {
            reject("An error occured, please try again later [SPICE].")
        }else if(body.error !== undefined) {
            reject(body.error)
        }else{
            resolve(response)
        }
    })
})

module.exports.create_session = create_session
require('make-runnable')