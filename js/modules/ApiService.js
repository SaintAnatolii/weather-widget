const API_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = '804b983f241df45091b96987b50a53c6'
// https://api.openweathermap.org/data/2.5/weather?q=Москва&appid=804b983f241df45091b96987b50a53c6&lang=ru

export const fetchWeather = async (sity) => {
    
    try {
        const response = await fetch(`${API_URL}weather?units=metric&q=${sity}&appid=${API_KEY}&lang=ru`)
     
        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${API_URL}`)
        }
        const data = await response.json()
        console.log(data.data)
        return { 'success' : true, data }
    } catch (err) {
        return { 'success' : false, err }
    }
    

}

export const fetchForecast = async (sity) => {
    
    try {
        const response = await fetch(`${API_URL}forecast?units=metric&q=${sity}&appid=${API_KEY}&lang=ru`)
     
        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${API_URL}`)
        }
        const data = await response.json()
        return { 'success' : true, data }
    } catch (err) {
        return { 'success' : false, err }
    }
    

}

export const getCity = async () => {
    const url = 'https://ipapi.co/city/'

    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Ошибка получения города`)
        }
        const city = await response.text()
        console.log(city)
        return { 'success' : true, city }

    } catch (error) {

        console.log(error)
        return { 'success' : false, error }
    }
}




