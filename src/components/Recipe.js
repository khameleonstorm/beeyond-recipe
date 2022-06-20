import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useTheme from "../hooks/useTheme"
import { projectFirestore } from "../firebase/config"
import deleteIcon from '../assets/delete.svg'

export default function Recipe({ value }) {
  const [recipes, setRecipes] = useState([])
  const [isPending, setIsPending] = useState(false)
  const [error, SetError] = useState(false)
  const { mode } = useTheme()

  const filteredRecipes = recipes.filter((recipe) => {
    if (value === '') {
      return recipe
    } else {
      return recipe.title.toLowerCase().includes(value)
    }
  }
  )

  useEffect(() => {
    setIsPending(true)

    const unSub = projectFirestore.collection('recipes').onSnapshot(snapShot => {
      if (snapShot.empty) {
        SetError("Could not fetch data from database")
        setIsPending(false)
      } else {
        let results = []
        snapShot.docs.forEach(doc => {
          results.push({id: doc.id, ...doc.data()})
        })

        setTimeout(() => {
          setRecipes(results)
          setIsPending(false)
      }, 1000)
      }
    }, (err) => {
      SetError(err.message)
      setIsPending(false)
    })

    return () => unSub()

  }, [])

  const handleDelete = (id) => {
    projectFirestore.collection('recipes').doc(id).delete()
  }



  return (
    <div className="container">
      {isPending &&
      <div className="loading">
       <img src="./img/loading2.gif" alt="loader" />
      </div>}
      {error && 
      <div className="error">
        <img src="./img/animated-error.gif" alt="error" />
      </div>}

      {recipes && filteredRecipes.map((recipe) =>
        <div className={`card-wrapper ${mode}`} key={recipe.id}>
          <div className="card">
            <h2>{recipe.title}</h2>
            <p>{recipe.cookingTime}</p>
            <div>{recipe.method.substring(0, 100)}...</div>
            <div className="buttons-wrapper">
              <Link className="button" to={`/recipes/${recipe.id}`}>
                Cook This
              </Link>
              <img 
              className="delete"
              src={deleteIcon} 
              alt="delete"
              onClick={() => handleDelete(recipe.id)}
              />
            </div>
          </div>
        </div>
        )
      }
    </div>
  )
}
