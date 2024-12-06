import React from 'react'
import { assets } from '../assets/assets'

const Encabezado = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-verde rounded-lg px-6 md:px-10 lg:px-20 '>

            {/*Este es el header de la izquierda (imagen pequeña y texto)*/}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Reserva tu Cita <br /> Excelentes Médicos
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-semibold'>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p>Contamos con una lista larga de profesionales de la salud. <br className='hidden sm:block' /> Información sin costo alguno.</p>
                </div>
                <a href='/appointments/new' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                    Reserva tu cita <img className='w-3' src={assets.arrow_icon} alt="" />
                </a>
            </div>

            {/*Este es el header de la derecha (imagen grande)*/}
            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Encabezado