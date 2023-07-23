const axios = require('axios');

async function postLead(leadData, accessToken, instanceUrl) {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };

        console.log("Sending JSON data to server:", JSON.stringify(leadData.data, null, 2));

        const externalServerResponse = await axios.post(`${instanceUrl}/services/data/v36.0/sobjects/Lead/`, leadData, options);
        return { success: true, data: externalServerResponse.data };
    } catch (error) {
        console.log(error.response);
        console.error('Error sending data to external server:', error.message);
        return { success: false, message: 'Error sending data to external server' };
    }
}

module.exports = postLead;
