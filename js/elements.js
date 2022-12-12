import { moment } from './datas.js'

const hourly_slider = document.querySelector('.hourly-slider')
const daily_slider = document.querySelector('.daily-slider')
const current_weather = document.querySelector('.current')
const footer_date = document.querySelector('.footer-date')
//const daily_times_carousel = document.querySelector('.daily-times-carousel')

const search_form = document.querySelector('.search-form')
const search_input = document.querySelector('.search-input')
const search_btn = document.querySelector('.search-btn')
const body = document.querySelector('body')

//fonction pour afficher la forecast heure
const houly_slide_func = (time, temp, url = 'img/119.png',conditions, visibility, windspeed, pop  ) => {
    const section = document.createElement('section')
    section.classList.add('hourly-slide')
    section.innerHTML = `
        <p class="temp">${Math.round(temp)}°C <span class="time">${time}</span></p>
        <img src="http://openweathermap.org/img/wn/${url}@2x.png" alt="" class="icon">
        <p class="condition">${conditions}</p>
        <p class="visibility">Visibilité: <span>${visibility/1000}km</span></p>
        <p class="precipitation">Précipitation: <span>${pop}mm/h</span></p>
        <p class="windspeed">Vitesse du vent: <span>${windspeed}m/s ESE</span></p>
    `
    hourly_slider.appendChild(section)
}

//fonction pour afficher la forecast day
const daily_slide_func = (time, maxTemp, minTemp, description, iconUrl='img/119.png') => {
    const section = document.createElement('section')
    section.classList.add('daily-slide')
    section.innerHTML = `
        <p class="time">${time}</p>
        <p class="temp"> <img src="http://openweathermap.org/img/wn/${iconUrl}@2x.png" alt="icon"> ${Math.round(maxTemp)}°/${Math.round(minTemp)}°C</p>
        <p class="condition">${description}</p>
        <svg data-v-5ed3171e=""  width="28px" height="30px" viewBox="0 0 512 512" class="drop-down"><path fill="#FFC119" d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z"></path></svg>
    `
    daily_slider.appendChild(section)
}

//fonction pour afficher la météo courante
const current_fonc = (time, location, country, feels_like, temp, condition, pop, wind_speed, pressure, humidity, visibility, uv, dew_point, iconUrl='img/119.png' ) => {
    current_weather.classList.remove('squelette')
    body.classList.remove('desableScroll')
    current_weather.innerHTML = `
        <p class="time">${time}</p>
        <h3 class="location">${location} ${country}</h3>
        <p class="condition">Température ressentie ${Math.round(feels_like)}°C. <span class='condition-span'>${condition}</span></p>
        <section class="details">
            <section class="left">
                <img class='icon' src="http://openweathermap.org/img/wn/${iconUrl}@2x.png" alt="iconweader" /> <p class="temp">${Math.round(temp)}°C</p>
            </section>
            <section class="right">
                <p>Précipitation : <span>${pop}mm/h</span></p>
                <p>Vitesse du vent : <span>${wind_speed}m/s ESE</span></p>
                <p>Pression: <span>${pressure}hPa</span></p>
                <p>Humidité: <span>${humidity}%</span></p>
                <p>UV: <span>${uv}</span></p>
                <p>Dew point: <span>${dew_point}°C</span></p>
                <p>Visibilité: <span>${visibility/1000}km </span></p>
            </section>
        </section>
    `
    console.log(current_weather)
}

//afficher les détails quand l'utilisateur clique un élément daily-slide
function add_daily_details(data, i, parag_carousel, daily_times_carousel) {
    
    const { hhh_mmm: sunrise } = moment(data.sunrise)
    const { hhh_mmm: sunset } = moment(data.sunset)
    
    daily_slider.innerHTML = `
                <section class='daily_slide_details'>
                    <section class="details-one">
                      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="img119png">
                      <div class="right">
                          <p class='dity-slide-condition'>${data.weather[0].description}</p>
                          <p>Température maximale <span>${Math.round(data.temp.max)}°C</span>, température minimale <span>${Math.round(data.temp.min)}°C</span></p>
                      </div>
                  </section>
                  <section class="details-tow">
                      <p>Précipitation : <span>${data.pop}mm/h</span></p>
                      <p>Vitesse du vent : <span>${data.wind_speed}m/s ESE</span></p>
                      <p>Pression: <span>${data.pressure}hPa</span></p>
                      <p>Humidité: <span>${data.humidity}%</span></p>
                      <p>UV: <span>${data.uvi}</span></p>
                      <p>Dew point: <span>${Math.round(data.dew_point)}°C</span></p>
                      <p>Visibilité: <span>${10000/1000}km</span></p>
                  </section>
                  <section class="details-three">
                      <table class="daily-table-details">
                          <tr>
                              <td>&nbsp;</td>
                              <td>Matin</td>
                              <td>Après-midi</td>
                              <td>Soir</td>
                              <td>Nuit</td>
                          </tr>
                          <tr>
                              <td class="tab-maj">Tremp</td>
                              <td>${Math.round(data.temp.morn)}°C</td>
                              <td>${Math.round(data.temp.day)}°C</td>
                              <td>${Math.round(data.temp.eve)}°C</td>
                              <td>${Math.round(data.temp.night)}°C</td>
                          </tr>
                          <tr>
                              <td class="tab-maj">Temp ressentie</td>
                              <td>${Math.round(data.feels_like.morn)}°C</td>
                              <td>${Math.round(data.feels_like.day)}°C</td>
                              <td>${Math.round(data.feels_like.eve)}°C</td>
                              <td>${Math.round(data.feels_like.night)}°C</td>
                          </tr>
                      </table>
                      <table class="daily-table-sunmove">
                          <tr>
                              <th>Levée du soleil</th>
                              <th>Couchée du soleil</th>
                          </tr>
                          <tr>
                              <td>${sunrise}</td>
                              <td>${sunset}</td>
                          </tr>
                      </table>
                  </section>
                </section>
    `
    //afficher la slide des jours en horizontal
    daily_times_carousel.classList.add('active-flex')
    
    for(let index = 0; index < parag_carousel.length; index++) {
        if(index === i) continue;
        parag_carousel[index].classList.remove('active')
    }
    
    //SCROLL WIDTH
    const scroll_width = (daily_times_carousel.scrollWidth/parag_carousel.length)*i

    daily_times_carousel.scroll({
        top: 0,
        left: scroll_width,
        behavior: 'smooth'
    })
    //daily_slider.innerHTML = daily;
    //daily_slider.appendChild(daily)
}

export { daily_slide_func, current_fonc, add_daily_details, houly_slide_func, search_btn, search_form, search_input, daily_slider, hourly_slider, footer_date }
