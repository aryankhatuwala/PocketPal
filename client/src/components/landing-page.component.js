import React, { useEffect } from 'react';
import '../App.css';

import Axios from 'axios';
import { Container, Col, Row } from 'react-bootstrap';

export default function HomePage() {
 
    const apiUrl = process.env.BACKEND_URL;

    useEffect(() => {

        const checkLoggedIn = async () => {
            if (localStorage.getItem('jwt')) {

                Axios({
                    method: 'get',
                    url: `${apiUrl}/api/users/isAuthenticated`,
                    headers: {
                        'Authorization': localStorage.getItem('jwt'),
                    }
                }).catch(err => {
                    window.location = '/';
                    localStorage.removeItem('jwt');
                });
            }

        }
        checkLoggedIn();
    }, []);




    return (
        <Container fluid>
            <div className="section-1">
                <Row>
                    <Col >``
                        <img className="section-1-img" src={require("../components/assets/banner.jpg")} alt="saving money graphic Designed by rawpixel.com / Freepik" />
         
                    </Col>
                    <Col xs={12} lg={6} >
                    
                <div className="text-container">
                        <Row>
                            <Col xs={12}>
                            <h1 id="Header">TRACK YOUR EXPENSES!</h1>

                            </Col>

                        </Row>
                        <Row>
                            <Col xs={12}>
                            <h2 id="Sub-Header">EXPLORE THE WORLD OF CRYPTO!</h2>

                            </Col>

                        </Row>
                        <Row>
                            <Col xs={12}>
                                <p id="description">Effortlessly track all your financial moves, from income to expenses, with our secure and editable platform. Dive into real-time cryptocurrency data and utilize our convenient currency converter for a comprehensive financial toolkit.</p>
                            </Col>
                        </Row>
                        </div>
                    {/* </div> */}
                    </Col>
                </Row>
            </div>
        </Container>




    );
}
