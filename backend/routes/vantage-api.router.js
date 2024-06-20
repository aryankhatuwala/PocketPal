// const express = require('express');
// const fs = require('fs').promises;
// const path = require('path');
// const router = express.Router();

// router.post('/getHistory', async (req, res) => {
//     const choice = req.body.choice;
//     const currencyFrom = req.body.currencyFrom;
//     const currencyTo = req.body.currencyTo;

//     console.log("from ", currencyFrom);
//     console.log("to ", currencyTo);

//     let filePath;

//     // Determine the file path based on the choice
//     switch (choice) {
//         case 'DAILY':
//             filePath = path.resolve(__dirname, 'Daily.json');
//             break;
//         case 'WEEKLY':
//             filePath = path.resolve(__dirname, 'Weekly.json');
//             break;
//         case 'MONTHLY':
//             filePath = path.resolve(__dirname, 'Monthly.json');
//             break;
//         default:
//             return res.status(400).json({ Error: "Invalid choice" });
//     }

//     try {
//         // Read the response from the file
//         const fileData = await fs.readFile(filePath, 'utf8');
//         console.log("Resolved file path:", filePath);
//         console.log("Current working directory:", process.cwd());
//         // Parse the file data and send it as JSON response
//         return res.json(JSON.parse(fileData));
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ Error: "Internal Server Error" });
//     }
// });

// // Function to handle fetching data from a file
// async function fetchDataFromFile(filePath, res) {
//     try {
//         // Read the response from the file
//         const fileData = await fs.readFile(filePath, 'utf8');

//         // Parse the file data and send it as JSON response
//         return res.json(JSON.parse(fileData));
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ Error: "Internal Server Error" });
//     }
// }

// router.post('/getExchangeRate', async (req, res) => {
//     const currencyFrom = req.body.currencyFrom;
//     const currencyTo = req.body.currencyTo;

//     // Assuming your JSON file is named 'exchangeRates.json' and located in the same directory
//     const filePath = path.resolve(__dirname, 'exchangeRates.json');

//     return fetchDataFromFile(filePath, res);
// });

// router.post('/getCryptoRating', async (req, res) => {
//     const currencyName = req.body.currencyName;

//     // Assuming your JSON file is named 'cryptoRatings.json' and located in the same directory
//     const filePath = path.resolve(__dirname, 'cryptoRatings.json');

//     return fetchDataFromFile(filePath, res);
// });

// module.exports = router;


const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

router.post('/getHistory', async (req, res) => {
    const choice = req.body.choice;
    const currencyFrom = req.body.currencyFrom;
    const currencyTo = req.body.currencyTo;

    console.log("from ", currencyFrom);
    console.log("to ", currencyTo);

    let filePath;

    // Determine the file path based on the choice
    switch (choice) {
        case 'DAILY':
            filePath = path.resolve(__dirname, 'Daily.json');
            break;
        case 'WEEKLY':
            filePath = path.resolve(__dirname, 'Weekly.json');
            break;
        case 'MONTHLY':
            filePath = path.resolve(__dirname, 'Monthly.json');
            break;
        default:
            return res.status(400).json({ Error: "Invalid choice" });
    }

    try {
        // Read the response from the file
        const fileData = await fs.readFile(filePath, 'utf8');
        console.log("Resolved file path:", filePath);
        console.log("Current working directory:", process.cwd());
        // Parse the file data and send it as JSON response
        return res.json(JSON.parse(fileData));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Internal Server Error" });
    }
});

// Function to handle fetching data from a file
async function fetchDataFromFile(filePath, res) {
    try {
        // Read the response from the file
        const fileData = await fs.readFile(filePath, 'utf8');

        // Parse the file data and send it as JSON response
        return res.json(JSON.parse(fileData));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Internal Server Error" });
    }
}

router.post('/getExchangeRate', async (req, res) => {
    const currencyFrom = req.body.currencyFrom;
    const currencyTo = req.body.currencyTo;

    // Assuming your JSON file is named 'exchangeRates.json' and located in the same directory
    const filePath = path.resolve(__dirname, 'exchangeRates.json');

    return fetchDataFromFile(filePath, res);
});

router.post('/getCryptoRating', async (req, res) => {
    const currencyName = req.body.currencyName;

    // Assuming your JSON file is named 'cryptoRatings.json' and located in the same directory
    const filePath = path.resolve(__dirname, 'cryptoRatings.json');

    return fetchDataFromFile(filePath, res);
});

module.exports = router;
