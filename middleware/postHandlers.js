async function handlePost(postHandler, successMessage, req, res) {
    if (req.authorization && req.authorization.success) {
        const data = req.body;
        console.log('Data in app.js:', data);
        const accessToken = req.authorization.accessToken;
        const instanceUrl = req.authorization.instanceUrl;
        const postResult = await postHandler(data, accessToken, instanceUrl);
        if (postResult.success) {
            console.log(postResult.data);
            res.status(201).send(successMessage);
        } else {
            console.log(postResult.message);
            res.status(500).send(postResult.message);
        }
    } else {
        console.log('Authorization Error:', req.authorization.error);
        res.status(500).send(req.authorization.message);
    }
}

module.exports = handlePost;
