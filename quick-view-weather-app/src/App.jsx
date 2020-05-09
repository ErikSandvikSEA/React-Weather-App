import React, { useState } from 'react'
import axios from 'axios'

const api = {
     key: `658a20fd39aab192eeb5356008b1940f`,
     base: `https://api.openweathermap.org/data/2.5/`
}


const App = () => {
     const [query, setQuery] = useState('')
     const [weather, setWeather] = useState({})

     const search = e => {
          if(e.key === 'Enter'){
               axios
                    .get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                    // .then(res => res.JSON())
                    .then(response => {
                         setWeather(response.data)
                         setQuery('')
                         console.log(response.data)
                    })
                    .catch(err => {
                         console.log(err)
                    })
          }
     }

     // const backgroundChanger = () => {
     //      let divClass = ''
     //      if ((typeof weather.main != 'undefined')) {
     //           if (((weather.main.temp*1.8)+32) > 60) {
     //               divClass = 'app warm'
     //           } else {
     //               divClass = 'app'
     //           }
     //      } else {
     //          divClass = 'app'
     //      }
     //      return divClass
     // }

const backgroundChanger = () => {
          let divClass = ''
          if ((typeof weather.main != 'undefined')) {
               if (weather.weather[0].main === 'Clear') {
                   divClass = 'app clear'
               } else if (weather.weather[0].main === 'Rain'){
                    divClass = 'app rain'
               } else if (weather.weather[0].main === 'Clouds'){
                    divClass = 'app clouds'
               } else if (weather.weather[0].main === 'Thunderstorm'){
                    divClass = 'app thunder'
               } else if (weather.weather[0].main === 'Snow'){
                    divClass = 'app snow'
               } else if (weather.weather[0].main === 'Haze'){
                    divClass = 'app haze'
               } else {
                   divClass = 'app'
               }
          } else {
              divClass = 'app'
          }
          return divClass
     }
    
     
     const dateBuilder = (d) => {
          let months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
          let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

          let day = days[d.getDay()]
          let date = d.getDate();
          let month = months[d.getMonth()];
          let year = d.getFullYear();

          return `${day} - ${month} ${date}, ${year}`
     }

     const handleChange = (e) => {
          setQuery(e.target.value)
     }

     return(
          //(typeof weather.main != 'undefined') ? ((((weather.main.temp*1.8)+32) > 60) ? 'app warm' : 'app') : 'app'
          <div className={backgroundChanger()}>
               <main>
                    <div className="search-box">
                         <input 
                              type='text'
                              className='search-bar'
                              placeholder='Search Locations'
                              onChange={handleChange}
                              value={query}
                              onKeyPress={search}
                         />
                    </div>
                    {(typeof weather.main != 'undefined') ? (
                    <div>
                         <div className="location-box">
                              <div className="location">{weather.name}, {weather.sys.country}</div>
                              <div className='date'>{dateBuilder(new Date())}</div>
                         </div>
                         <div className="weather-box">
                              <div className="temp">
                                   {Math.round(((weather.main.temp)*(1.8))+32)}°F
                              </div>
                              <div className="weather">{weather.weather[0].main}</div>
                         </div>
                    </div>
                    ) : ('') }
               </main>
          </div>
     )
}

export default App