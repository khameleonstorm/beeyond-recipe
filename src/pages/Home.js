import React from 'react'
import Recipe from '../components/Recipe'
import './Home.css'

export default function Home({ value }) {
  return (
    <React.Fragment>
      <Recipe value={ value } />
    </React.Fragment>
  )
}
