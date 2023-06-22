import React from 'react';
import Alerts from "./alert/Alert.List";
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className='home'>
            <Navbar/>
            <h1>Animal perdu</h1>
            <Alerts/>
        </div>
    );
};

export default Home;