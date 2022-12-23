import './App.css';
import Main from './Components/Main/Main';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';

function App() {

  //use redux,
  const userStore = useSelector((state) => state.user)
  const peekModalStore = useSelector((state) => state.peekModal)


  useEffect(() => {
    (peekModalStore.showModal === true || peekModalStore.showPeekModal === true || userStore.isOpenFilter === true) ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
  }, [peekModalStore.showModal, peekModalStore.showPeekModal, userStore.isOpenFilter])

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
