export function formatedDateNow() {
  const date = new Date()

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const dataCalendar = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`
  const dataTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  
  const formattedDate = `${dataCalendar} ${dataTime}`

  return formattedDate
}