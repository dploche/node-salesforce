require('dotenv').config();
const env = process.env;
const axios = require('axios');
const qs = require('qs');

const config = {
    grant_type : 'password',
    client_id : env.consumerKey,
    client_secret : env.consumerSecret,
    username : env.username,
    password : env.password + env.securityToken,
};

function authorizeSF(req, res, next){
    const authData = config;
    const data = qs.stringify(authData);

    axios.post('https://login.salesforce.com/services/oauth2/token', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        req.authorization = {
            success: true,
            accessToken: response.data.access_token,
            instanceUrl: response.data.instance_url
        };
        next();
    })
    .catch(error => {
        req.authorization = {
            success: false,
            message: 'An error occurred during authorization',
            error: error.response ? error.response.data : error.message
        };
        next();
    });
}

module.exports = authorizeSF;
