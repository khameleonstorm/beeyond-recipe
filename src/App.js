import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from "react"

// page components
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Create from './pages/Create'
import Recipes from './pages/Recipes'
import useTheme from './hooks/useTheme'

// styles
import './App.css'

function App() {
  const [value, setValue] = useState('')
  const { color, mode } = useTheme()
  
  return (
    <BrowserRouter>
      <div className={`app ${mode}`}>
      <Navbar  value={ value } setValue={ setValue } />
            <Routes>
                <Route exact path='/' element={<Home value={ value }/>} />
                <Route path='/create' element={<Create />} />
                <Route path='/Recipes/:id' element={<Recipes />} />
            </Routes>
            <div className="svg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path style={{fill: color}} fillOpacity="1" d="M0,64L80,96C160,128,320,192,480,197.3C640,203,800,149,960,154.7C1120,160,1280,224,1360,256L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            </div>
      </div>
    </BrowserRouter>
  );
}

export default App