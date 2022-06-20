import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import lightDark from "../assets/light-dark.svg"
import "./Navbar.css"


export default function Navbar({ value, setValue }) {
  const { color, changeColor, changeMode, mode } = useTheme()

  const handleMode = () => {
    changeMode(mode === 'dark'? 'light' : 'dark')
  }

  console.log(mode)
  
  const handleValue = (e) => {
    setValue(e.target.value.toLowerCase())
  }
 
  console.log(value)


  return (
    <div className="nav-wraper">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path style={{fill: color}} fillOpacity="1" d="M0,64L80,96C160,128,320,192,480,197.3C640,203,800,149,960,154.7C1120,160,1280,224,1360,256L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
        </path>
      </svg>
      <div className="colors">
        <div onClick={() => changeColor('#00c073')}></div>
        <div onClick={() => changeColor('#ffd700')}></div>
        <div onClick={() => changeColor('#ff00cc')}></div>
      </div>

      <nav>
        <div className="logo">
          <Link to="/">
            <h1 className="logo-h2">B</h1>
            <h2 className="logo-h1"> Recipes</h2>
          </Link>
        </div>

        <div className="mode-switch">
          <img src={lightDark}
           alt="light-dark"
           onClick={handleMode}
           style={{filter: mode === 'dark'? 'invert(100%)' : 'invert(10%)'}}
           />
        </div>

        <div className="menu">
          <div className="search">
            <input type="text" 
            placeholder="Search..."
            onChange={handleValue}
            value={value} 
            />
          </div>
          <div className="create">
              <Link 
              className="button" to="/Create">Create</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
