const axios = require('axios');
require('dotenv').config();
const env = process.env;
const caseResource = env.caseResource;

async function postCase(caseData, accessToken, instanceUrl){
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };
        
        const externalServerResponse = await axios.post(`${instanceUrl}${caseResource}`, caseData, options);
        return { success: true, data: externalServerResponse.data };
    } catch (error) {
        console.log(error.response);
        console.error('Error sending data to external server:', error.message);
        return { success: false, message: 'Error sending data to external server' };
    }
};

module.exports = postCase;