import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>SOBRE <span className='text-teal-500 font-semibold'>NOSOTROS</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>En Salud Nova nos dedicamos a cuidar tu salud con un enfoque integral, atendiendo no solo las enfermedades, sino también promoviendo el bienestar general de nuestros pacientes.</p>
          <p>En nuestro centro, cada paciente es una prioridad y trabajamos para brindarle un servicio cercano, humano y eficiente en un ambiente cómodo y seguro, nos enorgullecemos de nuestro enfoque centrado en el paciente, ofreciendo servicios de salud accesibles y de alta calidad. Conozca más sobre nuestra misión, nuestros valores y el comprometido equipo que hace posible la excelencia en el cuidado de la salud.</p>
          <b className='text-gray-800'>Nuestra Visión</b>
          <p>Nuestra visión es ser un centro médico líder en atención integral, reconocido por nuestra excelencia en el cuidado de la salud, la innovación en nuestros servicios y el compromiso con el bienestar de nuestros pacientes.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>NUESTROS  <span className='text-teal-500 font-semibold'>VALORES</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-celeste hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>COMPROMISO:</b>
          <p>Nos dedicamos a brindar atención médica de la más alta calidad.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-celeste hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>RESPONSABILIDAD: </b>
          <p>Estamos comprometidos con la responsabilidad, contribuyendo activamente al bienestar.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-celeste hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>INTEGRIDAD:</b>
          <p >Mantenemos altos estándares de integridad y ética en nuestras operaciones.</p>
        </div>
      </div>

    </div>
  )
}

export default About
