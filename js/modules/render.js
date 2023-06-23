import { getCurrentDateTime, calculateDewPoint, calculatePressure, getWeatherForecastData } from "./utils.js";
import { startWidget } from "./widgetService.js";

export const returnWidgetToday = (widget, data) => {

    const { year, month, weekday, day, hours, minutes } = getCurrentDateTime();
    const weatherData = data.data

    widget.insertAdjacentHTML('beforeend',`
        <div class="widget__today">
            <div class="widget__date-block">
            <p class="widget__date">${day} ${month} ${year}</p>
            <p class="widget__time">${hours}:${minutes}</p>
            <p class="widget__day">${weekday}</p>
            </div>
            <div class="widget__icon">
                <img class="widget__img" src="./icon/${weatherData.weather[0].icon}.svg" alt="Погода">
                <p class="widget__date">${weatherData.weather[0].description}</p>
            </div>
            <div class="widget__wheather">
            <div class="widget__city">
                <p>${weatherData.name}</p>
                <button class="widget__change-city" aria-label="Изменить город"></button>
            </div>
            <p class="widget__temp-big">${(weatherData.main.temp).toFixed(1)} °C</p>
            <p class="widget__felt">ощущается</p>
            <p class="widget__temp-small">${(weatherData.main.feels_like).toFixed(1)} °C</p>
            </div>
        </div>
    `)
}
export const returnWidgetOther = (widget, data) => {

    const weatherData = data.data

    // # widget__wind-text изменен !!!
    widget.insertAdjacentHTML('beforeend',`
        <div class="widget__other">
            <div class="widget__wind">
                <p class="widget__wind-title">Ветер</p>
                <p class="widget__wind-speed">${weatherData.wind.speed} м/с</p>
                <p class="widget__wind-text" style="transform: rotate(${weatherData.wind.deg + 180}deg);">&#8593;</p>
            </div>
            <div class="widget__humidity">
                <p class="widget__humidity-title">Влажность</p>
                <p class="widget__humidity-value">${weatherData.main.humidity}%</p>
                <p class="widget__humidity-text">Т.Р: ${calculateDewPoint(weatherData.main.temp, weatherData.main.humidity)} °C</p>
            </div>
            <div class="widget__pressure">
                <p class="widget__pressure-title">Давление</p>
                <p class="widget__pressure-value">${calculatePressure(weatherData.main.pressure)}</p>
                <p class="widget__pressure-text">мм рт.ст.</p>
            </div>
        </div>
    `)

}
export const returnWidgetForecast = (widget ,data) => {


    const widgetForecast = document.createElement('ul')
    widgetForecast.className = 'widget__forecast'
    widget.append(widgetForecast)

    const forecastData = data.data
    const days = getWeatherForecastData(forecastData)
    // console.log(days)

    const items = days.map((item)=>{
        const widgetDayItem = document.createElement('li')
        widgetDayItem.className = 'widget__day-item'

        widgetDayItem.insertAdjacentHTML('beforeend', `
            <p class="widget__day-text">${item.weekday}</p>
            <img class="widget__day-img" src="./icon/${item.icon}.svg" alt="Погода">
            <p class="widget__day-temp">${item.temp_min}°/${item.temp_max}°</p>
        `)
        return widgetDayItem
    })

    widgetForecast.append(...items)

}

export const showError = (widget, text) => {
    widget.insertAdjacentHTML('beforeend', `
        <div class="widget__error">
            <img src="./icon/sad.png" alt="">
            <h3>${text}</h3>
        </div>
    `)

    setTimeout(()=> {
        startWidget(null, widget)
    },3000)
}