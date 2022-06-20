import { useState } from 'react'
import useTheme from '../hooks/useTheme'
import './Create.css'
import { projectFirestore } from "../firebase/config"


export default function Create() {
  const [title, setTitle] = useState('')
  const [cookingTime, setTime] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [method, setMethod] = useState('')
  const { mode } = useTheme()


  const handleClick = (e) => {
    e.preventDefault()
    if (ingredient) {
      setIngredients(
        (prev) => [...prev, ingredient] 
      )
    }
    setIngredient('')
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const recipe = {title, cookingTime, ingredients, method}

    try {
      await projectFirestore.collection('recipes').add(recipe)
    } catch (error) {
      console.log(error)
    }


    setTitle('')
    setTime('')
    setIngredient('')
    setIngredients([])
    setMethod('')
    
    console.log(recipe)
  }


  return (
    <div className='create'>
      <div className={`form-bg ${mode}`}>
      <div className="form-container">
        <h2>Add New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          placeholder="Recipe Title" 
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          />
          <input type="text" 
          placeholder="Cooking Time" 
          required
          onChange={(e) => setTime(e.target.value)}
          value={cookingTime}
          />
          <div className="ingredients">
            <input 
            type="text" 
            placeholder="Recipe ingredients" 
            onChange={(e) => setIngredient(e.target.value)}
            value={ingredient}
            />
            <button className='button' onClick={handleClick}>Add</button>
          </div>
            {
              ingredients && ingredients.map((item) =>
              <li key={Math.random() + 1}>
                {item}
              </li>
            )}
          <textarea placeholder='Method' 
          required
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          >
          </textarea>
          <button className='button'>Add Recipe</button>
        </form>
      </div>
      </div>
    </div>
  )
}
