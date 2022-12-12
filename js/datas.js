const apiKey = '5e8a5e01f8b985993142d81c6072df35'
const base_url = 'https://api.openweathermap.org/data/2.5/'
    
const fetchData = async (latitude, longitude, endpoint) => {
    try {
        const response = await fetch(`${base_url}${endpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`)
        const data = await response.json()
        return {data : data, error: ''}
    } catch (e) {
        return {data: '', error: e.message}
    }
}


const search_data = async (city) => {
    if(city !== '') {
        try {
            const response = await fetch(`${base_url}weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`)
            const data = await response.json()
            const search_weather = await fetchData(data.coord.lat, data.coord.lon, 'onecall')
            return {search_weather, data}
        } catch (e) { console.log('city not found', e) }
    }
}


function moment(unix=0) {
    
    const date = new Date(unix * 1000)
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    const months = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dés']
    
    return {
        ddd_mmm_ddd : `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`, // ddd_mmm_ddd === day_month_date
        mmm_ddd_hhh : `${months[date.getMonth()]} ${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`, // mmm_ddd_hhh === month_date_hours
        hhh_mmm : `${date.getHours()}h:${date.getMinutes() < 10 ? date.getMinutes() + '0' : date.getMinutes()}` // hhh_mmmm === hours_minutes
    }
}


export {fetchData, moment, search_data}
