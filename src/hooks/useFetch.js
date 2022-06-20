import { useEffect, useState } from "react"


export default function useFetch(url) {
    const [recipes, setRecipes] = useState([])
    const [isPending, setIspending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = 
            async() => {
                setIspending(true)

                try {
                    const res = await fetch(url)
                    if(!res.ok){
                        throw new Error(res.statusText)
                    }
                    const data = await res.json()
                    setTimeout(() => {
                        setRecipes(data)
                        setIspending(false)
                    }, 2000)

                } catch (err) {
                    if (err.name === "AbortError") {
                        console.log("the fetch was aborted")
                      } else {
                        setIspending(false)
                        setError('Could not fetch the data')
                      }
                }
            }

            fetchData()



    }, [url])



  return { recipes, isPending, error }
}
