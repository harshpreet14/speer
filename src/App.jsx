import Header from './components/Header'
import AllCalls from './components/AllCalls';
import Footer from './components/Footer';
import { RecoilRoot, useRecoilValue } from 'recoil';
import Inbox from './components/Inbox';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Archived from './components/Archived';

function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
      <div className="max-h-screen">
      <Header/>
      <Routes>
        <Route path='/' element={<AllCalls/>} />
        <Route path='/inbox' element ={<Inbox/>}/>
        <Route path='/archived' element ={<Archived/>}/>
      </Routes>
      <Footer/>
      </div>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
