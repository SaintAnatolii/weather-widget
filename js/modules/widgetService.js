import { returnWidgetForecast, returnWidgetOther, returnWidgetToday, showError } from "./render.js"
import { fetchWeather, fetchForecast, getCity } from "./ApiService.js";

export const startWidget = async (city, widget) => {
    // console.log('it is work')
    if (!city) {
        const dataCity = await getCity()
        if (dataCity.success) {
            city = dataCity.city
        } else {
            showError(widget, 'Некорректно введен город')
        }

    }

    if (!widget) {
        widget = document.createElement('div')
        widget.className = 'widget'
    } 
        
    widget.textContent = ''

    const dataWeather = await fetchWeather(city)
    console.log(dataWeather.data)

    const dataForecast = await fetchForecast(city)
    console.log(dataForecast.data)

    if (dataWeather.success && dataForecast.success) {
        returnWidgetToday(widget, dataWeather)
        returnWidgetOther(widget, dataWeather)
        returnWidgetForecast(widget, dataForecast)
    } else {
        // ! добавить экран или что-то что будет говорить о проблеме связи с сервером
        showError(widget, 'Сервис временно недоступен. <br> Скоро виджет возобновит свою работу.')
    }
    

    return widget

}