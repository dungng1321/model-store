import Nav from '../Components/Nav/Nav'
import Banner from '../Components/Banner/Banner'
import HomeInfo from '../Components/HomeInfo/HomeInfo'
import Footer from '../Components/Footer/Footer'
import ServiceChat from '../Components/ServiceChat/ServiceChat'
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

function Homepage({ title }) {

  useEffect(() => {
    document.title = title;
  }, [title])


  return (
    <div>
      <Nav />
      <Banner />
      <ToastContainer
        autoClose={2000} />
      <HomeInfo />
      <ServiceChat />
      <Footer />
    </div>
  )
}

export default Homepage