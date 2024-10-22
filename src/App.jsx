import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyCalendar from './components/MyCalendar'
import Navbar from './components/Navbar'

function App() {
  

  return (
    <>
      <Navbar/>
      <MyCalendar></MyCalendar>
    </>
  )
}

export default App
