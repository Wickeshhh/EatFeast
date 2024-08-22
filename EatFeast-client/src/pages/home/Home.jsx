import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import Specials from './SpecialDishes'
import Testimonials from './Testimonials'
import OurServices from './OurServices'
// import Footer from '../../components/Footer'
const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <Specials />
      <Testimonials />
      <OurServices />
      {/* <Footer /> */}
    </div>
  )
}

export default Home
