import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { openModal, openPeekModal } from '../redux/peekModalSlice';
import { useDispatch } from 'react-redux';
import Nav from '../Components/Nav/Nav';
import Footer from '../Components/Footer/Footer';
import ServiceChat from '../Components/ServiceChat/ServiceChat';
import ProductDetailContainer from '../Components/ProductDetails/ProductDetailContainer';
import { ToastContainer } from 'react-toastify';

function ProductDetail() {

  const params = useParams();
  const dispatch = useDispatch();

  //close cart & peekmodal
  useEffect(() => {
    dispatch(openPeekModal(false))
    dispatch(openModal(false))
  }, [])

  useEffect(() => {
    document.title = params.name;
  }, [params.name])



  return (
    <div>
      <Nav />
      <ToastContainer
        autoClose={2000} />
      <ProductDetailContainer name={params.name} />
      <ServiceChat />
      <Footer />
    </div>
  );
}

export default ProductDetail;
