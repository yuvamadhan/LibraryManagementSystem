import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Loginsignup from './Loginsignup/Loginsignup.jsx';
import Footer from './Footer/Footer.jsx';
import Nav from './Header/Header.jsx';
import Library from './Library/Library.jsx'

function App() {
  return (
    <div>
      <Router>
        <Nav/>
        <Routes>
          <Route path='/login' element={<Loginsignup/>} />
          <Route path='/library' element= {<Library/>}></Route>
        </Routes>
        <Footer/>
      </Router>
         
    </div>
  );
}

export default App;



