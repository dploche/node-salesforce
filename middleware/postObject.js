const axios = require('axios');
require('dotenv').config();
const env = process.env;

async function postObject(resource, data, accessToken, instanceUrl) {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };
        
        const externalServerResponse = await axios.post(`${instanceUrl}${resource}`, data, options);
        return { success: true, data: externalServerResponse.data };
    } catch (error) {
        console.log(error.response);
        console.error('Error sending data to external server:', error.message);
        return { success: false, message: 'Error sending data to external server' };
    }
}

module.exports = {
    postLead: (leadData, accessToken, instanceUrl) => postObject(env.leadResource, leadData, accessToken, instanceUrl),
    postCase: (caseData, accessToken, instanceUrl) => postObject(env.caseResource, caseData, accessToken, instanceUrl),
    postAccount: (accountData, accessToken, instanceUrl) => postObject(env.accountResource, accountData, accessToken, instanceUrl)
};
