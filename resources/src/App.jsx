import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import './App.css'

function App() {

  const [place, setPlace] = useState("");
  const [weatherResponse, setWeatherResponse] = useState([]);

  const getWeather = async () => {
    console.log(place)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/weather/${place}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      const data = await response.json();

      if (response.ok) {
        console.log("response is ok");
        setWeatherResponse(data)
      } else {
        console.log("Internal server error")
      }

      console.log(data)

    } catch (error) {
      console.log(error);
    }
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    const formattedTime = now.toLocaleTimeString('en-US');
    return { formattedDate, formattedTime };
  };

  const pressure = weatherResponse.weather?.main.pressure;

  const weatherStatus = {
    day: '/static/images/day.png',
    fewcloudsday: '/static/images/fewcloudsday.png',
    fogyday: '/static/images/fogyday.png',
    rainyday: '/static/images/rainyday.png',
    snowyday: '/static/images/snowyday.png',
    stormyday: '/static/images/stormyday.png',
    night: '/static/images/night.png',
    fewcloudsnight: '/static/images/fewcloudsnight.png',
    fogynight: '/static/images/fogynight.png',
    rainynight: '/static/images/rainynight.png',
    snowynight: '/static/images/snowynight.png',
    stormynight: '/static/images/stormynight.png',
  }

  const getWeatherStatus = () => {
    const condition = weatherResponse.weather?.weather[0].icon;
    switch (condition) {
      case '01d':
        return weatherStatus.day;
      case '02d':
        return weatherStatus.fewcloudsday;
      case '03d':
        return weatherStatus.fewcloudsday;
      case '04d':
        return weatherStatus.fewcloudsday;
      case '09d':
        return weatherStatus.rainyday;
      case '10d':
        return weatherStatus.rainyday;
      case '11d':
        return weatherStatus.stormyday;
      case '13d':
        return weatherStatus.snowyday;
      case '50d':
        return weatherStatus.fogyday;
      case '01n':
        return weatherStatus.night;
      case '02n':
        return weatherStatus.fewcloudsnight;
      case '03n':
        return weatherStatus.fewcloudsnight;
      case '04n':
        return weatherStatus.fewcloudsnight;
      case '09n':
        return weatherStatus.rainynight;
      case '10n':
        return weatherStatus.rainynight;
      case '11n':
        return weatherStatus.stormynight;
      case '13n':
        return weatherStatus.snowynight;
      case '50n':
        return weatherStatus.fogynight
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-secondaryColor">
        <div className="flex">
          <div className="bg-white rounded-l-lg">
            <div className="m-10 bg-transparent flex-col flex items-center justify-center">

              {/* search bar */}
              <div className="flex gap-2 bg-transparent">
                <input
                  placeholder="Search Place"
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      getWeather();
                    }
                  }}
                  className="w-full bg-tertiaryColor rounded-full px-4 py-1 outline-none"
                />
                <button
                  onClick={getWeather}
                  className="bg-transparent"><CiSearch size="30px" className="bg-transparent" /></button>
              </div>

              {/* Weather */}
              {weatherResponse.weather ? (
                <>
                  <img
                    src={getWeatherStatus()}
                    className="bg-transparent p-10 w-60"
                  />
                  <h1 className=" text-7xl">{Math.ceil(weatherResponse.weather?.main.temp - 273.15)} °C</h1>
                  <p>{weatherResponse.weather?.weather[0].description}</p>
                  <hr className="my-5 border-2 w-full border-tertiaryColor" />
                  <p className=" text-sm">{getCurrentDateTime().formattedDate}</p>
                  <p>{getCurrentDateTime().formattedTime}</p>
                  <h2 className=" text-2xl">{weatherResponse.weather?.name}</h2>
                </>
              ) : (
                <>
                  <img
                    src="/static/images/day.png"
                    alt="weather"
                    className=" p-10 w-60"
                  />
                  <h1 className="text-5xl">Welcome</h1>
                  <p>to Weather Weather App</p>
                </>
              )}
            </div>
          </div>
          <div className="bg-tertiaryColor rounded-r-lg">
            <div className="m-10 ">
              <div className=" flex gap-5">
                <h1 className="">Today</h1>
                {/* <h1 className="">Forecast</h1> */}
              </div>
              <div className=" py-8 gap-5 grid-cols-2 grid">
                <div className="h-[200px] w-[250px] rounded-lg bg-primaryColor p-5 flex flex-col gap-2 text-white">
                  {weatherResponse.weather ? (
                    <>
                      <p className="bg-primaryColor">Wind Speed</p>
                      <h1 className="text-3xl bg-primaryColor">{weatherResponse.weather.wind.speed} km/h</h1>
                    </>
                  ) : (
                    <>
                      <p className="bg-primaryColor">Wind Speed</p>
                      <h1 className="text-3xl">No Data</h1>
                    </>
                  )}
                </div>
                <div className="h-[200px] w-[250px] rounded-lg bg-primaryColor p-5 flex flex-col gap-2 text-white">
                  {weatherResponse.weather ? (
                    <>
                      <p className="bg-primaryColor">Humidity</p>
                      <h1 className="text-3xl bg-primaryColor">{weatherResponse.weather?.main.humidity} %</h1>
                    </>
                  ) : (
                    <>
                      <p className="bg-primaryColor">Humidity</p>
                      <h1 className="text-3xl">No Data</h1>
                    </>
                  )}
                </div>
                <div className="h-[200px] w-[250px] rounded-lg bg-primaryColor p-5 flex flex-col gap-2 text-white">
                  {weatherResponse.weather ? (
                    <>
                      <p className="bg-primaryColor">Feels Like</p>
                      <h1 className="text-3xl bg-primaryColor">{Math.ceil(weatherResponse.weather?.main.feels_like - 273.15)} °C</h1>
                    </>
                  ) : (
                    <>
                      <p className="bg-primaryColor">Feels Like</p>
                      <h1 className="text-3xl">No Data</h1>
                    </>
                  )}
                </div>
                <div className="h-[200px] w-[250px] rounded-lg bg-primaryColor p-5 flex flex-col gap-2 text-white">
                  {weatherResponse.weather ? (
                    <>
                      <p className="bg-primaryColor">Pressure</p>
                      {pressure >= 1013 ? (
                        <h1 className="text-3xl bg-primaryColor">High Pressure</h1>
                      ) : pressure <= 1009 ? (
                        <h1 className="text-3xl bg-primaryColor">Low Pressure</h1>
                      ) : (
                        <h1 className="text-3xl bg-primaryColor">Normal Pressure</h1>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="bg-primaryColor">Pressure</p>
                      <h1 className="text-3xl">No Data</h1>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
