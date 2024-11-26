import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const Especialidad = () => {
    return (
        <div id='especialidad' className='flex flex-col items-center gap-4 py-16 text-gray-800'>
            <h1 className='text-3xl font-medium'>Encuentra por especialidad</h1>
            <p className='sm:w-1/3 text-center text-sm'>Contamos con un personal altamente capacitado para atenderle.</p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full  '>
                {specialityData.map((item, index) => (
                    <Link to={`/doctors/${item.especialidad}`} onClick={() => scrollTo(0, 0)} className='flex flex-col text-center items-center p-5 bg-fondo m-2 rounded-lg gap-2 hover:translate-y-[-10px] ransition-all duration-500' key={index}>
                        <img className='w-16 sm:w-24 mb-2 ' src={item.image} alt="" />
                        <p>{item.especialidad}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Especialidad