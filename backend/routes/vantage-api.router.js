// // // const router = require('express').Router();
// // // const axios = require('axios');

// // // router.post('/getExchangeRate', async (req, res) => {
// // //     const currencyFrom=req.body.currencyFrom;
// // //     const currencyTo=req.body.currencyTo;
 
// // //   const apiRes = await axios.get('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='+currencyFrom+'&to_currency='+currencyTo+'&apikey='+process.env.VANTAGE_KEY)
// // //     .then(res => { return res });
// // //     console.log(apiRes.data['Error Message']);
// // //     if(apiRes.data.Note){
// // //       return res.status(429).json({ Error: "Too many requests, slow down (one search a minute)"});

// // //     }
    
// // //     if(apiRes.data["Error Message"]){
// // //       console.log("reach into invalid")
// // //       return res.status(422).json({ Error: "Invalid ISO currency code"});
// // //     }
// // //   return res.json(apiRes.data);

// // // });

// // // router.post('/getCryptoRating', async (req, res) => {
// // //     const currencyName=req.body.currencyName;

 
// // //   const apiRes = await axios.get('https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol='+currencyName+'&apikey='+process.env.VANTAGE_KEY)
// // //     .then(res => { return res });
// // //     if(apiRes.data.Note){
// // //       return res.status(429).json({ Error: "Too many requests, slow down (one search a minute)"});

// // //     }
// // //     if(apiRes.data["Error Message"]){
// // //       return res.status(422).json({ Error: "Invalid ISO currency code"});
// // //     }
// // //   return res.json(apiRes.data);

// // // });

// // // router.post('/getHistory', async (req, res) => {
// // //     const choice=req.body.choice;

// // //     const currencyFrom=req.body.currencyFrom;
// // //     const currencyTo=req.body.currencyTo;

// // //     const apiRes= await axios.get('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_'+choice+'&symbol='+currencyFrom+'&market='+currencyTo+'&apikey='+process.env.VANTAGE_KEY)
// // //     .then(res => { return res });
// // //     if(apiRes.data.Note){
// // //       return res.status(429).json({ Error: "Too many requests, slow down (one search a minute)"});

// // //     }
// // //     if(apiRes.data["Error Message"]){
// // //       return res.status(422).json({ Error: "Invalid ISO currency code"});
// // //     }
 

// // //   return res.json(apiRes.data);

// // // });

// // // module.exports = router;

// // const router = require('express').Router();
// // const axios = require('axios');

// // router.post('/getExchangeRate', async (req, res) => {
// //     try {
// //         const { currencyFrom, currencyTo } = req.body;
// //         console.log("currencyFrom: "+currencyFrom);
// //         console.log("currencyTo: "+currencyTo);
// //         console.log("Vantage Key:", process.env.VANTAGE_KEY);


// //         // const apiUrl = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currencyFrom}&to_currency=${currencyTo}&apikey=${process.env.VANTAGE_KEY}`;
// //         const apiUrl='https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=RYLY342S5MPCI4LS';
// //         console.log("API URL:", apiUrl);


// //         const apiRes = await axios.get(apiUrl);
        
// //         const responseData = apiRes.data['Realtime Currency Exchange Rate'];
        
// //         if (apiRes.data.Note) {
// //             return res.status(429).json({ error: "Too many requests, slow down (one search a minute)" });
// //         }
        
// //         if (responseData.hasOwnProperty('Error Message')) {
// //             return res.status(422).json({ error: "Invalid ISO currency code" });
// //         }
// //         console.log("AAAAAA");
// //         console.log(responseData);
        
// //         return res.json(responseData);
// //     } catch (error) {
// //         // console.log("currencyFrom: "+currencyFrom);
// //         // console.log("currencyTo: "+currencyTo);
// //         console.error("Error fetching exchange rate:", error);
// //         return res.status(500).json({ error: "Internal server error" });
// //     }
// // });






// // router.post('/getCryptoRating', async (req, res) => {
// //     try {
// //         const { currencyName } = req.body;
// //         const apiRes = await axios.get(`https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=${currencyName}&apikey=${process.env.VANTAGE_KEY}`);
        
// //         if (apiRes.data.Note) {
// //             return res.status(429).json({ error: "Too many requests, slow down (one search a minute)" });
// //         }
        
// //         if (apiRes.data.hasOwnProperty('Error Message')) {
// //             return res.status(422).json({ error: "Invalid ISO currency code" });
// //         }
        
// //         return res.json(apiRes.data);
// //     } catch (error) {
// //         console.error("Error fetching crypto rating:", error);
// //         return res.status(500).json({ error: "Internal server error" });
// //     }
// // });

// // router.post('/getHistory', async (req, res) => {
// //     try {
// //         const { choice, currencyFrom, currencyTo } = req.body;
// //         const apiRes = await axios.get(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_${choice}&symbol=${currencyFrom}&market=${currencyTo}&apikey=${process.env.VANTAGE_KEY}`);
        
// //         if (apiRes.data.Note) {
// //             return res.status(429).json({ error: "Too many requests, slow down (one search a minute)" });
// //         }
        
// //         if (apiRes.data.hasOwnProperty('Error Message')) {
// //             return res.status(422).json({ error: "Invalid ISO currency code" });
// //         }
        
// //         return res.json(apiRes.data);
// //     } catch (error) {
// //         console.error("Error fetching currency history:", error);
// //         return res.status(500).json({ error: "Internal server error" });
// //     }
// // });

// // module.exports = router;


// const router = require('express').Router();
// const axios = require('axios');
// const express = require('express');


// router.post('/getExchangeRate', async (req, res) => {
//     const currencyFrom=req.body.currencyFrom;
//     const currencyTo=req.body.currencyTo;
 
//     console.log("from ",currencyFrom);
//     console.log("to ",currencyTo);

//     apiUrl='https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='+currencyFrom+'&to_currency='+currencyTo+'&apikey='+process.env.VANTAGE_KEY;

//     console.log(apiUrl);

//   const apiRes = await axios.get(apiUrl)
//     .then(res => { return res });
//     console.log(apiRes.data['Error Message']);
//     if(apiRes.data.Note){
//       return res.status(429).json({ Error: "Too many requests, slow down (one search a minute)"});

//     }
    
//     if(apiRes.data["Error Message"]){
//       console.log("reach into invalid")
//       return res.status(422).json({ Error: "Invalid ISO currency code"});
//     }
//   return res.json(apiRes.data);

// });

// router.post('/getCryptoRating', async (req, res) => {
//     const currencyName=req.body.currencyName;

 
//   const apiRes = await axios.get('https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol='+currencyName+'&apikey='+process.env.VANTAGE_KEY)
//     .then(res => { return res });
//     if(apiRes.data.Note){
//       return res.status(429).json({ Error: "Too many requests, slow down (one search a minute)"});

//     }
//     if(apiRes.data["Error Message"]){
//       return res.status(422).json({ Error: "Invalid ISO currency code"});
//     }
//   return res.json(apiRes.data);

// });

// router.post('/getHistory', async (req, res) => {
//     const choice=req.body.choice;

//     const currencyFrom=req.body.currencyFrom;
//     const currencyTo=req.body.currencyTo;

//     console.log("from ",currencyFrom);
//     console.log("to ",currencyTo);

//     apiUrl='https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_'+choice+'&symbol='+currencyFrom+'&market='+currencyTo+'&apikey='+process.env.VANTAGE_KEY;

//     console.log("getHistory ",apiUrl);

//     const apiRes= await axios.get(apiUrl)
//     .then(res => { return res });
//     if(apiRes.data.Note){
//       return res.status(429).json({ Error: "Too many requests, slow down (one search a minute)"});

//     }
//     if(apiRes.data["Error Message"]){
//       return res.status(422).json({ Error: "Invalid ISO currency code"});
//     }
 

//   return res.json(apiRes.data);

// });

// module.exports = router;

const express = require('express');
const fs = require('fs').promises;
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
            filePath = './Daily.json';
            break;
        case 'WEEKLY':
            filePath = './Weekly.json';
            break;
        case 'MONTHLY':
            filePath = './Monthly.json';
            break;
        default:
            return res.status(400).json({ Error: "Invalid choice" });
    }

    try {
        // Read the response from the file
        const fileData = await fs.readFile(filePath, 'utf8');

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
    const filePath = './exchangeRates.json';

    return fetchDataFromFile(filePath, res);
});

router.post('/getCryptoRating', async (req, res) => {
    const currencyName = req.body.currencyName;

    // Assuming your JSON file is named 'cryptoRatings.json' and located in the same directory
    const filePath = './cryptoRatings.json';

    return fetchDataFromFile(filePath, res);
});


module.exports = router;