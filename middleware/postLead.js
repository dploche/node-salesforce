const axios = require('axios');
require('dotenv').config();
const env = process.env;
const leadResource = env.leadResource;

async function postLead(leadData, accessToken, instanceUrl) {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };
        
        const externalServerResponse = await axios.post(`${instanceUrl}${leadResource}`, leadData, options);
        return { success: true, data: externalServerResponse.data };
    } catch (error) {
        console.log(error.response);
        console.error('Error sending data to external server:', error.message);
        return { success: false, message: 'Error sending data to external server' };
    }
}

module.exports = postLead;
