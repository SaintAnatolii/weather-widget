export const getCurrentDateTime = () => {
    const months = ['янd', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
    const weekdays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
    

    const date = new Date()
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const weekday = weekdays[date.getDay()]
    const day = date.getDate()

    const hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
    const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();

    // console.log(`Сегодня ${weekday} ${day} ${month} ${year}, Время ${hours}:${minutes}`)
    return { year, month, weekday, day, hours, minutes }
}

export const calculateDewPoint = (temp, humidity) => {
    const a = 17.27
    const b = 237.7

    const ft =  (a * temp) / (b + temp) + Math.log(humidity / 100) 
    return ((b*ft) / (a-ft)).toFixed(1)
}

export const calculatePressure = (pressure) => {

    return Math.floor(pressure * 0.750063755419211)
}


export const getWeatherForecastData = (data) => {
    const forecast = data.list.filter((item) => {

        return new Date(item.dt_txt).getHours() === 12 && new Date(item.dt_txt).getDate() > new Date().getDate() && new Date(item.dt_txt).getDate() < new Date().getDate() + 5
    })

    // console.log(forecast)

    const weekdays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    const days = forecast.map((item) => {
        const date = new Date(item.dt_txt)
        const weekday = weekdays[date.getDay()]

        let minTemp = Infinity
        let maxTemp = -Infinity

        for (let i = 0; i < data.list.length; i++) {
            const temp = data.list[i].main.temp;
            const tempDate = new Date(data.list[i].dt_txt);
            if (tempDate.getDate() === date.getDate()) {
              if (temp < minTemp) {
                minTemp = temp;
              } 
              if (temp > maxTemp) {
                maxTemp = temp;
              }
            }
          }
        
        return {
            weekday : weekday,
            icon : item.weather[0].icon,
            temp_min : minTemp.toFixed(1),
            temp_max : maxTemp.toFixed(1),
        }
    })

    return days
}

export const renderTimeInWidget = () => {

  function updateTime() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
  
      hours = hours < 10? "0" + hours : hours
      minutes = minutes < 10? "0" + minutes : minutes
      const timer = document.querySelector('.widget__time')
      timer.textContent = `${hours}:${minutes}`
  }
  
  setInterval(updateTime, 1000);
}