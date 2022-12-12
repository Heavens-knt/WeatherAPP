import { fetchData, moment, search_data } from './datas.js'
import { daily_slide_func, current_fonc, houly_slide_func, add_daily_details, search_form, search_btn, search_input, daily_slider, hourly_slider, footer_date } from './elements.js'

const daily_global_slide = document.querySelectorAll('.daily-global-slide')
const daily_times_carousel = document.querySelector('.daily-times-carousel')
const icon_up = document.querySelector('.daily .icon-up')
const date = new Date()
footer_date.textContent = date.getFullYear()

window.onload = () => geolocation()

function geolocation() {
    navigator.geolocation.getCurrentPosition(position_success_cb, position_error_cb, 
    {
        enableHighAccuracy: true,
        timeout: 20000
    })
}

async function fetchUserIp() {
    //const response = await fetch('https://json.geoiplookup.io')
    const response = await fetch('http://ip-api.com/json/?lang=fr')
    const data = await response.json()
    return data
}

//géolocalisation callbacks
async function position_success_cb(position) {
    
    const { latitude, longitude } = position.coords
    const { data } = await fetchData(latitude, longitude, 'onecall')
    const { data: current_weather } = await fetchData(latitude, longitude, 'weather')
    const {mmm_ddd_hhh} = moment(data.current.dt)
    
    current_fonc(mmm_ddd_hhh, current_weather.name, current_weather.sys.country, data.current.feels_like, data.current.temp, data.current.weather[0].description, 50, data.current.wind_speed, data.current.pressure, data.current.humidity, data.current.visibility, data.current.uvi, data.current.dew_point, data.current.weather[0].icon)
    displayData(data, display_daily_details)
}

async function position_error_cb(error) {
    
    const position = await fetchUserIp()
    const {data} = await fetchData(position.lat, position.lon, 'onecall')
    const {data: current_weather} = await fetchData(position.lat, position.lon, 'weather')
    const {mmm_ddd_hhh} = moment(data.current.dt)
    
    current_fonc(mmm_ddd_hhh, current_weather.name, current_weather.sys.country, data.current.feels_like, data.current.temp, data.current.weather[0].description, 50, data.current.wind_speed, data.current.pressure, data.current.humidity, data.current.visibility, data.current.uvi, data.current.dew_point, data.current.weather[0].icon)
    displayData(data, display_daily_details)
}

search_form.addEventListener('submit', async function(event) {
    event.preventDefault()
    
    if(search_input.value !== '') {
        const {search_weather: data, data: location} = await search_data(search_input.value)
        const {mmm_ddd_hhh} = moment(data.data.current.dt)
        
        current_fonc(mmm_ddd_hhh, location.name, location.sys.country, data.data.current.feels_like, data.data.current.temp, data.data.current.weather[0].description, 50, data.data.current.wind_speed, data.data.current.pressure, data.data.current.humidity, data.data.current.visibility, data.data.current.uvi, data.data.current.dew_point, data.data.current.weather[0].icon)
    
        daily_slider.innerHTML = '';
        daily_times_carousel.innerHTML = '';
        hourly_slider.innerHTML = ''
        search_input.value = ''
        displayData(data.data, display_daily_details)
    } else {
        alert('Remplissez la case s\'il vous plaît')
    }
    
})

function displayData(data, callback) {
    //console.log(data)
    data.hourly.forEach(hour => {
        const { hhh_mmm: time } = moment(hour.dt)
        houly_slide_func(time, hour.temp, hour.weather[0].icon, hour.weather[0].description, hour.visibility, hour.wind_speed, hour.pop)
    })
        
    /*data.daily.forEach(day => {
      const paragraph = document.createElement('p')
        const {ddd_mmm_ddd: time} = moment(day.dt)
        daily_slide_func(time, day.temp.max, day.temp.min, day.weather[0].description, day.weather[0].icon)
        paragraph.textContent = time;
        daily_times_carousel.appendChild(paragraph)
    })*/
    
    display_daily_forecast(data.daily)
    
    callback(data)
}

function display_daily_forecast(daily_forecast) {
    daily_forecast.forEach(day => {
        const paragraph = document.createElement('p')
        const {ddd_mmm_ddd: time} = moment(day.dt)
        daily_slide_func(time, day.temp.max, day.temp.min, day.weather[0].description, day.weather[0].icon)
        paragraph.textContent = time;
        daily_times_carousel.appendChild(paragraph)
    })
}

function display_daily_details(data) {
    const daily_slide = document.querySelectorAll('.daily-slide')
    const parag_carousel = document.querySelectorAll('.daily .daily-times-carousel p')
    
    daily_slide.forEach((element, i) => {
        element.onclick = () => {
            parag_carousel[i].classList.add('active')
            icon_up.classList.add('active-icon-up')
            add_daily_details(data.daily[i], i, parag_carousel, daily_times_carousel)
        }
        element.classList.remove('active')
    })
    
    
    icon_up.addEventListener('click', function() {
        this.classList.remove('active-icon-up')
        daily_slider.innerHTML=''
        daily_times_carousel.innerHTML=''
        //display_daily_forecast(data.daily)
        data.daily.forEach(day => {
            const {ddd_mmm_ddd: time} = moment(day.dt)
            daily_slide_func(time, day.temp.max, day.temp.min, day.weather[0].description, day.weather[0].icon)
        })
    })
    
    parag_carousel.forEach((element, i) =>  {
        element.onclick = () => {
            element.classList.add('active')
            add_daily_details(data.daily[i], i, parag_carousel, daily_times_carousel)
        }
    })
    
}
