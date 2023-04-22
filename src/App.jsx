import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRamdomLocation from './utils/getRandomLocation'

function App() {
  const [location, setlocation] = useState()
  const [numberLocation, setnumberLocation] = useState(getRamdomLocation())
  const [hasError, sethasError] = useState(false)
  const [listLocation, setlistLocation] = useState()
  const [isShow, setisShow] = useState(true)

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`
    axios.get(url)
      .then(res => {
        setlocation(res.data)
        sethasError(false)
      })
      .catch(err => {
        sethasError(true)
        console.log(err)
      })
  }, [numberLocation])

  const handleSubmit = e => {
    e.preventDefault()
    if (e.target.inputLocation.value.trim().length === 0) {
      setnumberLocation(getRamdomLocation())
    } else {
      setnumberLocation(e.target.inputLocation.value)
    }
    e.target.inputLocation.value = e.target.inputLocation.value.trim()

  }
  const handleChange = e => {
    setlistLocation(e.target.value.trim())
    const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
    axios.get(url)
      .then(res => setlistLocation(res.data.results))
      .catch(err => console.log(err))
  }
  // const handleFocus = () => setisShow(true)
  // const handleBlur = () => setisShow(false)



  return (
    <div className="app">
      <div className="portada">
        <img className='portada__img' src='/5.jpg' alt="portada" />
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <input
          // onBlur={handleBlur}
          // onFocus={handleFocus}
          onChange={handleChange}
          className='form__input'
          id='inputLocation' type="text"
          placeholder='choose a world from 1 to 126'
        />
        <button className='form__btn'>Search</button>
      </form>
      {/* {
          isShow &&
          <ul>
            {
            listLocation?.map((loc) => (
              <li onClick={()=> setnumberLocation(loc.id)} key={loc.id}>{loc.name}</li>
            ))
            }
          </ul>  
        } */}

      {
        hasError ?
          <h2 className='app__error' >❌ Hey! you must provide an id from 1 to 126 🥺</h2>
          :
          <>
            <LocationInfo location={location} />
            <div className='resident__container'>
              {
                location?.residents.map(url => (
                  <ResidentInfo
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
    </div>
  )
}
export default App
