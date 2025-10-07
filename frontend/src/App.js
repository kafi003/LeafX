import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import Marketplace from './components/Marketplace';
import Advising from './components/Advising';
import FreeTierVoiceChat from './components/FreeTierVoiceChat';
import SupplyChainOptimizer from './components/SupplyChainOptimizer';
import AuthPage from './components/AuthPage';
import './App.css';
import './components/styles.css';
import './components/Layout.css';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('leafx_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('leafx_user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('leafx_user');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div className='App'>
                <Navbar user={user} onLogout={handleLogout} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route
                        path='/auth'
                        element={
                            <AuthPage
                                onLogin={handleLogin}
                                user={user}
                            />
                        }
                    />
                    <Route path='/chatbot' element={<Chatbot user={user} />} />
                    <Route path='/marketplace' element={<Marketplace user={user} />} />
                    <Route path='/advising' element={<Advising user={user} />} />
                    <Route path='/voice-chat' element={<FreeTierVoiceChat user={user} />} />
                    <Route path='/supply-chain' element={<SupplyChainOptimizer user={user} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
