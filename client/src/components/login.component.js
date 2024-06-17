import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Axios from 'axios';
import ErrorModal from '../components/error-modal.component';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('jwt');
            if (token) {
                try {
                    const res = await Axios.get(`${apiUrl}/api/users/isAuthenticated`, {
                        headers: {
                            'Authorization': token,
                        },
                    });
                    if (res.data) {
                        window.location = '/app';
                    }
                } catch (err) {
                    window.location = '/login';
                    localStorage.removeItem('jwt');
                }
            }
        };
        checkLoggedIn();
    }, [apiUrl]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { username, password };
            const loginRes = await Axios.post(`${apiUrl}/api/users/login`, loginUser);
            localStorage.setItem('jwt', loginRes.data.token);
            window.location = '/app';
        } catch (err) {
            setError(err.response.data.Error);
            setModalShow(true);
        }
    };

    return (
        <div className="row">
            <div className="col-sm-12 d-flex">
                <div className="card signin-card">
                    <div className="card-body">
                        <ErrorModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            error={error}
                        />
                        <h5 className="card-title text-center">Sign In</h5>
                        <form onSubmit={onSubmit} className="form-signin">
                            <div className="form-group">
                                <label htmlFor="inputUsername">Username</label>
                                <input
                                    type="text"
                                    id="inputUsername"
                                    className="form-control"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword">Password</label>
                                <input
                                    type="password"
                                    id="inputPassword"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block text-uppercase signin-btn" type="submit">
                                Sign in
                            </button>
                            <Link to="/register">Register</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
