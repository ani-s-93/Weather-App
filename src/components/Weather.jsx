import React ,{useEffect, useRef, useState} from 'react'

import './Weather.css'

import search_icon from'../assets/search.png'
import cloudy_icon from'../assets/cloudy.jpeg'
import windy_icon from'../assets/windy.png'
import snow_icon from'../assets/snow.jpeg'
import sun_icon from'../assets/sun.jpeg'
import wiggle_icon from'../assets/wiggle.jpg'
const Weather = () => {
  const inputRef=useRef()
  const [weatherData , setWeatherData] =useState(false);
  const [aiAdvice, setAiAdvice] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [askLoading, setAskLoading] = useState(false);
  const allIcons = {
  "01d": "https://openweathermap.org/img/wn/01d@2x.png",
  "01n": "https://openweathermap.org/img/wn/01n@2x.png",

  "02d": "https://openweathermap.org/img/wn/02d@2x.png",
  "02n": "https://openweathermap.org/img/wn/02n@2x.png",

  "03d": "https://openweathermap.org/img/wn/03d@2x.png",
  "03n": "https://openweathermap.org/img/wn/03n@2x.png",

  "04d": "https://openweathermap.org/img/wn/04d@2x.png",
  "04n": "https://openweathermap.org/img/wn/04n@2x.png",

  "09d": "https://openweathermap.org/img/wn/09d@2x.png",
  "09n": "https://openweathermap.org/img/wn/09n@2x.png",

  "10d": "https://openweathermap.org/img/wn/10d@2x.png",
  "10n": "https://openweathermap.org/img/wn/10n@2x.png",

  "13d": "https://openweathermap.org/img/wn/13d@2x.png",
  "13n": "https://openweathermap.org/img/wn/13n@2x.png",
};
;
const askQuestion = async () => {
  if (!userQuestion.trim()) return;
  if (!weatherData) {
    alert("Search for a city first!");
    return;
  }

  setAskLoading(true);
  setAiAnswer("");

  try {
    const res = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: userQuestion,
        weatherData: weatherData,
      }),
    });

    const data = await res.json();
    setAiAnswer(data.result);
  } catch (err) {
    setAiAnswer("Something went wrong. Try again.");
  } finally {
    setAskLoading(false);
  }
};

  const search=async(city)=>{
    if (city==""){
      alert("Enter City Name")
      return;
    }
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      
      const response=await fetch(url);
      const data=await response.json();
      if (!response.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      
      const icon=allIcons[data.weather[0].icon]|| cloudy_icon;
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location:data.name,
        icon:icon,
      })
      const aiRes = await fetch("http://localhost:5000/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weatherData: {
            temperature: Math.floor(data.main.temp),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
          },
        }),
      });

      const aiData = await aiRes.json();
      setAiAdvice(aiData.result);
            
    } catch(error) {
      setWeatherData(false);
      console.error("Error:", error.message);
      alert("Something went wrong: " + error.message); // ADD THIS
    }
  }
  useEffect(()=>{
    search("London");

  },[])
  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt=""onClick={()=>search(inputRef.current.value)}/>
        </div>
        
        {weatherData?<>
        
        <img src={weatherData?.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={cloudy_icon} alt=""/>
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={windy_icon} alt=""/>
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
        {aiAdvice && (
  <div className="ai-box">
    <h3>🤖 AI Suggestions</h3>
    <div className="ai-content">
      {aiAdvice.split('\n').map((line, i) => {
        const cleaned = line.replace(/\*\*(.*?)\*\*/g, '$1').trim();
        if (!cleaned) return null;
        const isHeader = line.includes('**') && line.endsWith('**');
        return (
          <p key={i} className={isHeader ? 'ai-header' : 'ai-line'}>
            {cleaned}
          </p>
        );
      })}
    </div>
  </div>
  
)}
{weatherData && (
  <div className="ask-box">
    <h3>💬 Ask About Today's Weather</h3>

    <div className="ask-input-row">
      <input
        type="text"
        placeholder="e.g. Can I play football today?"
        value={userQuestion}
        onChange={(e) => setUserQuestion(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && askQuestion()}
        className="ask-input"
      />
      <button
        onClick={askQuestion}
        disabled={askLoading}
        className="ask-btn"
      >
        {askLoading ? "..." : "Ask"}
      </button>
    </div>

    {aiAnswer && (
      <div className="ask-answer">
        <span>🤖</span>
        <p>{aiAnswer}</p>
      </div>
    )}
  </div>
)}
        
        </>:<></>}

    </div>
    


  )
}

export default Weather
