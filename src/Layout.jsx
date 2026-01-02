import React from 'react'
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import Slider from './components/Slider.jsx'
import Loan from './components/Loan.jsx'
import MutualFund from './components/MutualFund.jsx'
import Insurance from './components/Insurance.jsx'
import OtherServices from './components/OtherServices.jsx'
import AboutUs from './components/AboutUs.jsx'
//import ContactUs from './components/ContactUs.jsx'
import Feedback from './components/Feedback.jsx'
import Footer from './components/Footer.jsx'
import Contact from './components/pages/Contact.jsx'
export default function Layout() {
  return (
    <>
    <section id='layout'>
    <Header />
    <Navbar />
    <Slider />
    <Insurance />
    <MutualFund />
    <Loan />
    <OtherServices />
    <AboutUs />
    <Contact />
    <Feedback/>
    <Footer />
    </section>
    
    </>
  )
}
