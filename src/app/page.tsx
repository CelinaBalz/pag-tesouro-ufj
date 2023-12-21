'use client'

import { useState } from 'react'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Modal  from './components/Modal'
import FormInputs from './components/FormInputs'


export default function Home() {
  return (
    <main className="   text-black bg-white min-h-screen flex-col items-center justify-between ">
      <div className="lg:text-xl font-body z-10  w-full items-center justify-between text-sm ">  

        <Header></Header>
        <FormInputs></FormInputs>  
        <Footer></Footer>
      </div>
    </main>
  )
}
