import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {

  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <span className='text-gray-700 font-semibold'>CONTACTANOS</span>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className=' font-semibold text-lg text-gray-600'>DIRECCIÓN</p>
          <p className=' text-gray-500'>200 metros norte del parque <br /> Ciudad Quesada, San Carlos, Alajuela</p>
          <p className=' text-gray-500'>Tel: (506) 2060-0101 <br /> Correo: saludnova@gmail.com</p>
          <p className=' font-semibold text-lg text-gray-600'>EMPLEOS DISPONIBLES</p>
          <p className=' text-gray-500'>Aprende más sobre nuestro equipo y puestos de trabajo.</p>
          <button className='border border-gray-600 px-8 py-4 text-sm hover:bg-celeste hover:text-white transition-all duration-500'>Explorar Trabajos</button>
        </div>
      </div>

    </div>
  )
}

export default Contact
