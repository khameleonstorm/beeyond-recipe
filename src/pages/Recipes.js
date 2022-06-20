import './Recipes.css'
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import useTheme from '../hooks/useTheme'
import { projectFirestore } from "../firebase/config"
import loader from '../assets/loading3.gif'


export default function Recipes() {
    const [recipe, setRecipe] = useState([])
    const [isPending, setIsPending] = useState(false)
    const [error, SetError] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const { mode } = useTheme()

    useEffect(() => {
        setIsPending(true)

        const unSub = projectFirestore.collection('recipes').doc(id).onSnapshot(doc => {
            setIsPending(true)
            if (doc.exists) {
                setTimeout(() => {
                    setIsPending(false)
                    setRecipe(doc.data())
                }, 1000)
            } else {
                setIsPending(false)

                SetError(true)
                setTimeout(() => {
                        navigate('/')
                }, 2000)
            }
        })

        return () => unSub()

    }, [error, id, navigate])

    const handleClick = () => {
        projectFirestore.collection('recipes').doc(id).update({title: 'Strawberry'})
    }


  return (
    <div className="recipes">
            <div className="recipe-card">
                <div className={`card-wrapper2 ${mode}`}>

                    {isPending && 
                    <div className="loading3">
                        <img src={loader} alt="loading3" />
                    </div>
                    }

                    {error && 
                        <div className="error2">
                            <p>Couldn't fetch data!</p>
                        </div>
                    }


                    {recipe && 
                    <div className="card2" key={recipe.id} >
                        <h2>{recipe.title}</h2>
                        <p>{recipe.cookingTime}</p>
                        <div>{recipe.method}</div>
                        <button 
                        className='button' 
                        onClick={handleClick}>Update
                        </button>
                    </div>
                    }

                </div>
            </div> 

    </div>
  )
}
