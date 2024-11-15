import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>En Salud Nova, nos comprometemos a ofrecer atención médica de calidad, personalizada y accesible para cada uno de nuestros pacientes.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPAÑÍA</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Inicio</li>
            <li>Sobre nosotros</li>
            <li>Politica de privacidad</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>CONTACTO</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+(506)-2460-0101</li>
            <li>saludnova@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @SaludNova.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
