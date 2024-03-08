const express = require('express')
const app = express()
const ethers = require('ethers')
require('dotenv').config()

app.use(express.json());

app.post('/signMessage', (req, res) => {
    const { validationKey: providedValidationKey, message } = req.body;


    if (providedValidationKey && providedValidationKey === process.env.VALIDATION_KEY) {

        // Handle the request
        // try catch
        const ethersWallet = new ethers.Wallet(process.env.PRIVATE_KEY);

        const signature = ethersWallet.signMessageSync(message);

        res.status(200).json({signature});
    } else {
        // Return an error response if validation fails
        res.status(400).send('Validation key is missing or invalid.');
    }
});

app.listen(process.env.PORT || 3000)