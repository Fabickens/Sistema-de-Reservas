import React from 'react';
import { Link } from 'react-router-dom';
import Encabezado from '../components/Encabezado';
import Banner from '../components/Banner';

const HomePage = () =>{
    return(
        <div>
            <Encabezado/>
            <Banner/>
        </div>
    )
}

export default HomePage
