import React from 'react';
import Encabezado from '../components/Encabezado';
import Banner from '../components/Banner';
import Especialidad from '../components/Especialidad';


const HomePage = () =>{
    return(
        <div>
            <Encabezado/>
            <Especialidad/>
            <Banner/>
        </div>
    )
}

export default HomePage
