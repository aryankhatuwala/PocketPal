// import React, { useState, useEffect } from 'react';
// import '../App.css';
// import Axios from 'axios';
// import '../components/component.css';
// import "react-datepicker/dist/react-datepicker.css";
// import { Line } from 'react-chartjs-2';
// import ErrorModal from '../components/error-modal.component';
// import { Container, Button, Col, Row, InputGroup, FormControl } from 'react-bootstrap';

// export default function CryptoDashboard() {
//     const [searchItem, setSearchItem] = useState("");
//     const [coinName, setCoinName] = useState("");
//     const [weeklyHistory, setWeeklyHistory] = useState({ x: [], y: [] });
//     const [dailyHistory, setDailyHistory] = useState({ x: [], y: [] });
//     const [monthlyHistory, setMonthlyHistory] = useState({ x: [], y: [] });
//     const [errorModalShow, setErrorModalShow] = useState(false);
//     const [error, setError] = useState();
//     const [exchangeRate, setExchangeRate] = useState();
//     const [healthIndex, setHealthIndex] = useState({ fcasRating: "N/A", fcasScore: "N/A", developerScore: "N/A", utilityScore: "N/A", marketMaturityScore: "N/A" });
//     const [amountToConvert, setAmountToConvert] = useState({ currency: "", amount: 0 });
//     const [convertedAmount, setConvertedAmount] = useState({ currency: "USD", amount: 0 });

//     useEffect(() => {
//         const checkLoggedIn = async () => {
//             const token = localStorage.getItem('jwt');
//             if (!token) {
//                 console.log("No token found in localStorage");
//                 window.location = '/';
//                 return;
//             }

//             try {
//                 await Axios({
//                     method: 'get',
//                     url: 'http://localhost:5000/api/users/isAuthenticated',
//                     headers: {
//                         'Authorization': token,
//                     }
//                 });
//             } catch (err) {
//                 console.log("Error checking authentication:", err);
//                 window.location = '/';
//                 localStorage.removeItem('jwt');
//             }
//         };
//         checkLoggedIn();
//     }, []);

//     const getDailyPriceHistory = async () => {
//         try {
//             const res = await Axios({
//                 method: 'post',
//                 url: 'http://localhost:5000/api/protected/vantage-api/getHistory',
//                 headers: {
//                     'Authorization': localStorage.getItem('jwt'),
//                 },
//                 data: {
//                     "choice": "DAILY",
//                     "currencyFrom": searchItem,
//                     "currencyTo": "USD"
//                 }
//             });
//             const dailySeries = res.data["Time Series (Digital Currency Daily)"];
//             const series = Object.keys(dailySeries).map(day => {
//                 return { day: day, value: dailySeries[day]["4a. close (USD)"] };
//             });
//             var x_axis = [];
//             var y_axis = [];
//             var days = Math.min(series.length, 100);
//             for (var index = 0; index < days; index++) {
//                 x_axis.push(series[index].day);
//                 y_axis.push(series[index].value);
//             }
//             x_axis.reverse();
//             y_axis.reverse();
//             setDailyHistory({ x: x_axis, y: y_axis });
//         } catch (err) {
//             handleRequestError(err);
//         }
//     };

//     const getWeeklyPriceHistory = async () => {
//         try {
//             const res = await Axios({
//                 method: 'post',
//                 url: 'http://localhost:5000/api/protected/vantage-api/getHistory',
//                 headers: {
//                     'Authorization': localStorage.getItem('jwt'),
//                 },
//                 data: {
//                     "choice": "WEEKLY",
//                     "currencyFrom": searchItem,
//                     "currencyTo": "USD"
//                 }
//             });
//             const weeklySeries = res.data["Time Series (Digital Currency Weekly)"];
//             const series = Object.keys(weeklySeries).map(day => {
//                 return { day: day, value: weeklySeries[day]["4a. close (USD)"] };
//             });
//             var x_axis = [];
//             var y_axis = [];
//             var weeks = Math.min(series.length, 100);
//             for (var index = 0; index < weeks; index++) {
//                 x_axis.push(series[index].day);
//                 y_axis.push(series[index].value);
//             }
//             x_axis.reverse();
//             y_axis.reverse();
//             setWeeklyHistory({ x: x_axis, y: y_axis });
//         } catch (err) {
//             handleRequestError(err);
//         }
//     };

//     const getMonthlyPriceHistory = async () => {
//         try {
//             const res = await Axios({
//                 method: 'post',
//                 url: 'http://localhost:5000/api/protected/vantage-api/getHistory',
//                 headers: {
//                     'Authorization': localStorage.getItem('jwt'),
//                 },
//                 data: {
//                     "choice": "MONTHLY",
//                     "currencyFrom": searchItem,
//                     "currencyTo": "USD"
//                 }
//             });
//             const monthlySeries = res.data["Time Series (Digital Currency Monthly)"];
//             const series = Object.keys(monthlySeries).map(day => {
//                 return { day: day, value: monthlySeries[day]["4a. close (USD)"] };
//             });
//             var x_axis = [];
//             var y_axis = [];
//             var months = Math.min(series.length, 100);
//                         for (var index = 0; index < months; index++) {
//                 x_axis.push(series[index].day);
//                 y_axis.push(series[index].value);
//             }
//             x_axis.reverse();
//             y_axis.reverse();
//             setMonthlyHistory({ x: x_axis, y: y_axis });
//         } catch (err) {
//             handleRequestError(err);
//         }
//     };

//     const resetGraphs = (err) => {
//         setCoinName("Invalid Coin");
//         setError(err.response ? err.response.data.Error : "An error occurred");
//         setErrorModalShow(true);
//         setDailyHistory({ x: [], y: [] });
//         setWeeklyHistory({ x: [], y: [] });
//         setMonthlyHistory({ x: [], y: [] });
//         setAmountToConvert({ amount: 0 });
//         setConvertedAmount({ amount: 0, currency: "USD" });
//     };

//     const handleRequestError = (err) => {
//         console.error("Error fetching data:", err);
//         resetGraphs(err);
//     };

//     const getHealthIndex = async () => {
//         try {
//             const res = await Axios({
//                 method: 'post',
//                 url: 'http://localhost:5000/api/protected/vantage-api/getCryptoRating',
//                 headers: {
//                     'Authorization': localStorage.getItem('jwt'),
//                 },
//                 data: {
//                     "currencyName": searchItem
//                 }
//             });
//             const data = res.data["Crypto Rating (FCAS)"];
//             setHealthIndex({
//                 fcasRating: data["3. fcas rating"],
//                 fcasScore: data["4. fcas score"],
//                 developerScore: data["5. developer score"],
//                 marketMaturityScore: data["6. market maturity score"],
//                 utilityScore: data["7. utility score"]
//             });
//         } catch (err) {
//             handleRequestError(err);
//         }
//     };

//     const getExchangeRate = async () => {
//         try {
//             const token = localStorage.getItem('jwt');
//             if (!token) {
//                 console.log("No token found in localStorage");
//                 return;
//             }

//             const res = await Axios({
//                 method: 'post',
//                 url: 'http://localhost:5000/api/protected/vantage-api/getExchangeRate',
//                 headers: {
//                     'Authorization': `${token}`,
//                 },
//                 data: {
//                     "currencyFrom": searchItem,
//                     "currencyTo": "USD"
//                 }
//             });
//             const data = res.data["Realtime Currency Exchange Rate"];
//             setExchangeRate(data["5. Exchange Rate"]);
//             console.log(data["5. Exchange Rate"]);
//         } catch (err) {
//             handleRequestError(err);
//         }
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             setCoinName(searchItem);
//             setAmountToConvert({ currency: searchItem });
//             getDailyPriceHistory();
//             getWeeklyPriceHistory();
//             getMonthlyPriceHistory();
//             getHealthIndex();
//             getExchangeRate();
//             setSearchItem("");
//         } catch (err) {
//             console.error("Error on form submit:", err);
//             handleRequestError(err);
//         }
//     };

//     const swapConversion = () => {
//         const amountToSwap = amountToConvert;
//         setAmountToConvert({ currency: convertedAmount.currency, amount: amountToConvert.amount });
//         setConvertedAmount({ currency: amountToSwap.currency, amount: 0 });
//     };

//     const convertCurrency = () => {
//         if (convertedAmount.currency === "USD") {
//             setConvertedAmount({ amount: exchangeRate * amountToConvert.amount, currency: convertedAmount.currency });
//         } else {
//             setConvertedAmount({ amount: amountToConvert.amount / exchangeRate, currency: convertedAmount.currency });
//         }
//     };

//     return (
//         <Container>
//             <ErrorModal
//                 show={errorModalShow}
//                 onHide={() => setErrorModalShow(false)}
//                 error={error}
//             />
//             <form onSubmit={onSubmit} className="form-search-coin-group">
//                 <Row>
//                     <Col xs={8}>
//                         <div className="form-group">
//                             <input type="text" className="form-control currency-search" placeholder="Enter ISO currency code e.g BTC" onChange={(e) => setSearchItem(e.target.value)} />
//                         </div>
//                     </Col>
//                     <Col xs={4}>
//                         <Button className="text-uppercase search-btn" variant="dark" type="submit" disabled={searchItem <= 0}>Search</Button>
//                     </Col>
//                 </Row>
//             </form>
//             <Row>
//                 <Col>
//                     <div className="card conversion-input-card">
//                         <div className="card-body">
//                             <h5 className="card-title text-center">Currency Conversion</h5>
//                             <form className="form-signin">
//                                 <Row>
//                                     <Col xs={12} >
//                                         <InputGroup className="mb-3 amount-to-convert">
//                                             <FormControl
//                                                 placeholder="Amount"
//                                                 aria-label="Amount"
//                                                 aria-describedby="Amount"
//                                                 onChange={(e) => setAmountToConvert({ amount: e.target.value, currency: amountToConvert.currency })}
//                                                 type="number"
//                                                 step="any"
//                                                 min="0"
//                                             />
//                                             <InputGroup.Append >
//                                                 <InputGroup.Text id="Amount" >{amountToConvert.currency}</InputGroup.Text>
//                                             </InputGroup.Append>
//                                         </InputGroup>
//                                     </Col>
//                                     <Col xs={12} >
//                                         <Button type="button" className="swap-button" onClick={swapConversion}><img alt="" src="https://www.pngrepo.com/png/55685/180/transfer-arrows.png" width="30px"></img></Button>
//                                     </Col>
//                                     <Col xs={12} >
//                                         <InputGroup className="mb-3">
//                                             <FormControl
//                                                 // placeholder="Amount"
//                                                 aria-label="Amount"
//                                                 aria-describedby="Amount"
//                                                 value={convertedAmount.amount || 0}
//                                                 readOnly
//                                                 step="any"
//                                             />
//                                             <InputGroup.Append>
//                                                 <InputGroup.Text id="Amount">{convertedAmount.currency}</InputGroup.Text>
//                                             </InputGroup.Append>
//                                         </InputGroup>
//                                     </Col>
//                                 </Row>
//                                 <button className="btn btn-lg btn-primary btn-block text-uppercase input-expense-btn" type="button" onClick={convertCurrency} disabled={!coinName || coinName === "Invalid Coin"}>Convert</button>
//                             </form>
//                         </div>
//                     </div>
//                 </Col>
//                 <Col xs={12} md={6}>
//                     <div className="card health-index-card">
//                         <div className="card-body">
//                             <h4 className="card-title text-center">{coinName} Health Index</h4>
//                             <h6>Fcas rating: {healthIndex.fcasRating}</h6>
//                             <h6>Fcas score: {healthIndex.fcasScore}</h6>
//                             <h6>Developer Score: {healthIndex.developerScore}</h6>
//                             <h6>Market maturity score: {healthIndex.marketMaturityScore}</h6>
//                             <h6>Utility score: {healthIndex.utilityScore}</h6>
//                             <div className="healthIndexDescription">
//                                 <p>*All scores out of 1000</p>
//                             </div>
//                         </div>
//                     </div>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col xs={12} >
//                     <div className="history
// -chart">
//                     <Line
//                         data={{
//                             labels: dailyHistory.x,
//                             datasets: [
//                                 {
//                                     label: 'Amount (USD)',
//                                     fill: false,
//                                     lineTension: 0,
//                                     backgroundColor: 'rgba(75,192,192,1)',
//                                     borderColor: 'rgba(0,0,0,1)',
//                                     borderWidth: 2,
//                                     data: dailyHistory.y
//                                 }
//                             ]
//                         }}
//                         options={{
//                             title: {
//                                 display: true,
//                                 text: coinName + ' Daily price (past 100 days)',
//                                 fontSize: 20
//                             },
//                             legend: {
//                                 display: false,
//                             },
//                             responsive: true,
//                             maintainAspectRatio: false,
//                         }}
//                         width={600}
//                         height={600}
//                         className="charts"
//                     />
//                 </div>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col xs={12} >
//                     <div className="history-chart">
//                         <Line
//                             data={{
//                                 labels: weeklyHistory.x,
//                                 datasets: [
//                                     {
//                                         label: 'Amount (USD)',
//                                         fill: false,
//                                         lineTension: 0,
//                                         backgroundColor: 'rgba(75,192,192,1)',
//                                         borderColor: 'rgba(0,0,0,1)',
//                                         borderWidth: 2,
//                                         data: weeklyHistory.y
//                                     }
//                                 ]
//                             }}
//                             options={{
//                                 title: {
//                                     display: true,
//                                     text: coinName + ' Weekly price (past 100 weeks)',
//                                     fontSize: 20
//                                 },
//                                 legend: {
//                                     display: false,
//                                 },
//                                 responsive: true,
//                                 maintainAspectRatio: false,
//                             }}
//                             width={600}
//                             height={600}
//                             className="charts"
//                         />
//                     </div>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col xs={12} >
//                     <div className="history-chart month-chart">
//                         <Line
//                             data={{
//                                 labels: monthlyHistory.x,
//                                 datasets: [
//                                     {
//                                         label: 'Amount (USD)',
//                                         fill: false,
//                                         lineTension: 0,
//                                         backgroundColor: 'rgba(75,192,192,1)',
//                                         borderColor: 'rgba(0,0,0,1)',
//                                         borderWidth: 2,
//                                         data: monthlyHistory.y
//                                     }
//                                 ]
//                             }}
//                             options={{
//                                 title: {
//                                     display: true,
//                                     text: coinName + ' Monthly price',
//                                     fontSize: 20
//                                 },
//                                 legend: {
//                                     display: false,
//                                 },
//                                 responsive: true,
//                                 maintainAspectRatio: false,
//                             }}
//                             width={600}
//                             height={600}
//                             className="charts"
//                         />
//                     </div>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }


import React, { useState, useEffect } from 'react';

import '../App.css';
import Axios from 'axios';
import '../components/component.css';
import "react-datepicker/dist/react-datepicker.css";
import { Line } from 'react-chartjs-2';
import ErrorModal from '../components/error-modal.component';

import { Container, Button, Col, Row, InputGroup, FormControl } from 'react-bootstrap';

export default function CryptoDashboard() {
    const [searchItem, setSearchItem] = useState("");

    const [coinName, setCoinName] = useState("");
    const [weeklyHistory, setWeeklyHistory] = useState({ x: [], y: [] });
    const [dailyHistory, setDailyHistory] = useState({ x: [], y: [] });
    const [monthlyHistory, setMonthlyHistory] = useState({ x: [], y: [] });
    const [errorModalShow, setErrorModalShow] = useState(false);
    const [error, setError] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    const [healthIndex, setHealthIndex] = useState({ fcasRating: "N/A", fcasScore: "N/A", developerScore: "N/A", utilityScore: "N/A", marketMaturityScore: "N/A" });

    const [amountToConvert, setAmountToConvert] = useState({ currency: coinName, amount: 0 });
    const [convertedAmount, setConvertedAmount] = useState({ currency: "USD", amount: 0 });

    useEffect(() => {

        const checkLoggedIn = async () => {
            if (localStorage.getItem('jwt')) {

                Axios({
                    method: 'get',
                    url: 'http://localhost:5000/api/users/isAuthenticated',
                    headers: {
                        'Authorization': localStorage.getItem('jwt'),
                    }
                }).catch(err => {
                    window.location = '/';
                    localStorage.removeItem('jwt');
                });
            } else {
                window.location = '/';

            }

        }
        checkLoggedIn();



    }, []);

   const getDailyPriceHistory = async () => {
    try {
        const response = await Axios({
            method: 'post',
            url: 'http://localhost:5000/api/protected/vantage-api/getHistory',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            },
            data: {
                choice: "DAILY",
                currencyFrom: searchItem,
                currencyTo: "USD"
            }
        });

        const dailySeries = response.data["Time Series (Digital Currency Daily)"];
        console.log('daily series: ',dailySeries)
        if (dailySeries) {
            const series = Object.keys(dailySeries).map(day => {
                return { day, value: dailySeries[day]["4. close"] };
            });

            const days = series.length < 100 ? series.length : 100;

            const x_axis = [];
            const y_axis = [];
            for (let index = 0; index < days; index++) {
                x_axis.push(series[index].day);
                y_axis.push(series[index].value);
            }

            x_axis.reverse();
            y_axis.reverse();
            setDailyHistory({ x: x_axis, y: y_axis });
        } else {
            console.error('Daily series data not found');
        }
    } catch (err) {
        console.error(err);
        // Handle the error properly
        // For example, you can show the error in the UI or reset graphs
        resetGraphs(err);
    }
}


    const getWeeklyPriceHistory = async () => {
        try {
            await Axios({
                method: 'post',
                url: 'http://localhost:5000/api/protected/vantage-api/getHistory',
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
                },
                data: {
                    "choice": "WEEKLY",
                    "currencyFrom": searchItem,
                    "currencyTo": "USD"
                }
            }).then(res => {
                // console.log(res.data);
                const weeklySeries = res.data["Time Series (Digital Currency Weekly)"]
                const series = Object.keys(weeklySeries).map(day => {
                    return { day: day, value: weeklySeries[day]["4. close"] }
                });
                var x_axis = [];
                var y_axis = [];
                var weeks;
                if (series.length < 100) {
                    weeks = series.length;
                } else {
                    weeks = 100;
                }
                for (var index = 0; index < weeks; index++) {
                    x_axis.push(series[index].day);
                    y_axis.push(series[index].value)

                }
                x_axis.reverse();
                y_axis.reverse();
                setWeeklyHistory({ x: x_axis, y: y_axis });



            });
        } catch (err) {
            // setError(err.response.data.Error);
            // setErrorModalShow(true);
            // resetGraphs(err);

        }
    }
    const getMonthlyPriceHistory = async () => {
        try {
            await Axios({
                method: 'post',
                url: 'http://localhost:5000/api/protected/vantage-api/getHistory',
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
                },
                data: {
                    "choice": "MONTHLY",
                    "currencyFrom": searchItem,
                    "currencyTo": "USD"
                }
            }).then(res => {
                console.log(res.data);
                const monthlySeries = res.data["Time Series (Digital Currency Monthly)"]
                const series = Object.keys(monthlySeries).map(day => {
                    return { day: day, value: monthlySeries[day]["4. close"] }
                });
                var x_axis = [];
                var y_axis = [];
                var months;
                if (series.length < 100) {
                    months = series.length;
                } else {
                    months = 100;
                }
                for (var index = 0; index < months; index++) {
                    x_axis.push(series[index].day);
                    y_axis.push(series[index].value)

                }
                x_axis.reverse();
                y_axis.reverse();
                setMonthlyHistory({ x: x_axis, y: y_axis });



            });

        } catch (err) {
            // setError(err.response.data.Error);
            // setErrorModalShow(true);
            // resetGraphs(err);
        }
    }
    const resetGraphs = (err) => {
        setCoinName("Invalid Coin");

        // console.log(err.response.data.Error+" in reset");
        setError(err.response.data.Error);
        setErrorModalShow(true);

        setDailyHistory({ x: [], y: [] });

        setWeeklyHistory({ x: [], y: [] });
        setMonthlyHistory({ x: [], y: [] });
        setAmountToConvert({ amount: 0 });
        setConvertedAmount({ amount: 0, currency: "USD" });


    }


    const getHealthIndex = async () => {

        try {
            await Axios({
                method: 'post',
                url: 'http://localhost:5000/api/protected/vantage-api/getCryptoRating',
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
                },
                data: {
                    "currencyName": searchItem
                }
            }).then(res => {
                setHealthIndex({
                    fcasRating: res.data[searchItem]["3. fcas rating"], fcasScore: res.data[searchItem]["4. fcas score"],
                    developerScore: res.data[searchItem]["5. developer score"], marketMaturityScore: res.data[searchItem]["6. market maturity score"],
                    utilityScore: res.data[searchItem]["7. utility score"]
                });
            });

        } catch (err) {
            // console.log(err.response.data.Error+" in health");

            // setError(err.response.data.Error);
            // setErrorModalShow(true);
            // resetGraphs(err);
        }
    }
    const getExchangeRate = async () => {
        try {
            await Axios({
                method: 'post',
                url: 'http://localhost:5000/api/protected/vantage-api/getExchangeRate',
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
                },
                data: {
                    "currencyFrom": searchItem,
                    "currencyTo": "USD"
                }
            }).then(res => {
                setExchangeRate(res.data[searchItem]["5. Exchange Rate"]);
                console.log(res.data[searchItem]["5. Exchange Rate"]);
            });

        } catch (err) {
            console.log(err.response.data.Error + " in exchange");
            // setError(err.response.data.Error);
            // setErrorModalShow(true);
            // resetGraphs(err);
        }
    }
    const onSubmit = async (e) => {
        try {
            setCoinName(searchItem);
            setAmountToConvert({ currency: searchItem });
            e.preventDefault();
            e.target.reset();

            console.log(coinName);
            getDailyPriceHistory();
            getWeeklyPriceHistory();
            getMonthlyPriceHistory();
            getHealthIndex();
            getExchangeRate();
            setSearchItem("");
        } catch (err) {
            console.log("reach");
            console.log(err);
            // setError(err.response.data.Error);
            // setModalShow(true);
        }

    }
    const swapConversion = () => {
        console.log("REACHHHHHHHHHH in swap");

        var amountToSwap = amountToConvert;
        setAmountToConvert({ currency: convertedAmount.currency, amount: amountToConvert.amount });
        setConvertedAmount({ currency: amountToSwap.currency, amount: 0 });

    }
    const convertCurrency = () => {

        console.log("REACHHHHHHHHHH");
        // setAmountToConvert({amount:amountToConvert,currency:amountToConvert.currency});

        if (convertedAmount.currency === "USD") {
            setConvertedAmount({ amount: exchangeRate * amountToConvert.amount, currency: convertedAmount.currency });
        } else {
            console.log("REACHHHHHHHHHH in else");

            setConvertedAmount({ amount: amountToConvert.amount / exchangeRate, currency: convertedAmount.currency });

        }

    }



return (
    <Container className="gradient-background">
        <ErrorModal
            show={errorModalShow}
            onHide={() => setErrorModalShow(false)}
            error={error}
        />
        <form onSubmit={onSubmit} className="form-search-coin-group">
            <Row>
                <Col xs={8}>
                    <div className="form-group">
                        <input type="text" className="form-control currency-search" placeholder="Enter ISO currency code e.g BTC" onChange={(e) => setSearchItem(e.target.value)} />
                    </div>
                </Col>
                <Col xs={4}>
                    <Button className="text-uppercase search-btn" variant="dark" type="submit" disabled={searchItem <= 0}>Search</Button>
                </Col>
            </Row>
        </form>
        <Row>
            <Col>
                <div className="card conversion-input-card">
                    <div className="card-body">
                        <h5 className="card-title text-center">Currency Conversion</h5>
                        <form className="form-signin">
                            <Row>
                                <Col xs={12} >
                                    <InputGroup className="mb-3 amount-to-convert">
                                        <FormControl
                                            placeholder="Amount"
                                            aria-label="Amount"
                                            aria-describedby="Amount"
                                            onChange={(e) => setAmountToConvert({ amount: e.target.value, currency: amountToConvert.currency })}
                                            type="number"
                                            step="any"
                                            min="0"
                                        />
                                        <InputGroup.Append >
                                            <InputGroup.Text id="Amount" >{amountToConvert.currency}</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                                <Col xs={12} >
                                    <Button type="button" className="swap-button" onClick={swapConversion}><img alt="" src="https://www.pngrepo.com/png/55685/180/transfer-arrows.png" width="30px"></img></Button>
                                </Col>
                                <Col xs={12} >
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            aria-label="Amount"
                                            aria-describedby="Amount"
                                            value={convertedAmount.amount || 0}
                                            readOnly
                                            step="any"
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text id="Amount">{convertedAmount.currency}</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <button className="btn btn-lg btn-primary btn-block text-uppercase input-expense-btn" type="button" onClick={convertCurrency} disabled={!coinName || coinName === "Invalid Coin"}>Convert</button>
                        </form>
                    </div>
                </div>
            </Col>
            <Col xs={12} md={6}>
                <div className="card health-index-card">
                    <div className="card-body">
                        <h4 className="card-title text-center">{coinName} Health Index</h4>
                        <h6>Fcas rating: {healthIndex.fcasRating}</h6>
                        <h6>Fcas score: {healthIndex.fcasScore}</h6>
                        <h6>Developer Score: {healthIndex.developerScore}</h6>
                        <h6>Market maturity score: {healthIndex.marketMaturityScore}</h6>
                        <h6>Utility score: {healthIndex.utilityScore}</h6>
                        <div className="healthIndexDescription">
                            <p>*All scores out of 1000</p>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs={12} >
                <div className="history-chart">
                    <Line
                        data={{
                            labels: dailyHistory.x,
                            datasets: [
                                {
                                    label: 'Amount (USD)',
                                    fill: false,
                                    lineTension: 0,
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    borderColor: 'rgba(255, 255, 255, 1)',
                                    borderWidth: 2,
                                    data: dailyHistory.y
                                }
                            ]
                        }}
                        options={{
                            title: {
                                display: true,
                                text: coinName + ' Daily price (past 100 days)',
                                fontSize: 20,
                                fontColor: 'white'
                            },
                            legend: {
                                display: false,
                            },
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        fontColor: 'white'
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        fontColor: 'white'
                                    }
                                }]
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                        width={600}
                        height={600}
                        className="charts"
                    />
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs={12} >
                <div className="history-chart">
                    <Line
                        data={{
                            labels: weeklyHistory.x,
                            datasets: [
                                {
                                    label: 'Amount (USD)',
                                    fill: false,
                                    lineTension: 0,
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    borderColor: 'rgba(255, 255, 255, 1)',
                                    borderWidth: 2,
                                    data: weeklyHistory.y
                                }
                            ]
                        }}
                        options={{
                            title: {
                                display: true,
                                text: coinName + ' Weekly price (past 100 weeks)',
                                fontSize: 20,
                                fontColor: 'white'
                            },
                            legend: {
                                display: false,
                            },
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        fontColor: 'white'
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        fontColor: 'white'
                                    }
                                }]
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                        width={600}
                        height={600}
                        className="charts"
                    />
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs={12} >
                <div className="history-chart month-chart">
                    <Line
                        data={{
                            labels: monthlyHistory.x,
                            datasets: [
                                {
                                    label: 'Amount (USD)',
                                    fill: false,
                                    lineTension: 0,
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    borderColor: 'rgba(255, 255, 255, 1)',
                                    borderWidth: 2,
                                    data: monthlyHistory.y
                                }
                            ]
                        }}
                        options={{
                            title: {
                                display: true,
                                text: coinName + ' Monthly price',
                                fontSize: 20,
                                fontColor: 'white'
                            },
                            legend: {
                                display: false,
                            },
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        fontColor: 'white'
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        fontColor: 'white'
                                    }
                                }]
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                        width={600}
                        height={600}
                        className="charts"
                    />
                </div>
            </Col>
        </Row>
    </Container>
);

}