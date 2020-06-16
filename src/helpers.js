export const getDateFormat = (timestamp) => {
  const date = new Date(parseFloat(timestamp))
  let hours = date.getHours()
  if (hours < 10) hours = `0${hours}`
  let minutes = date.getMinutes()
  if (minutes < 10) minutes = `0${minutes}}`

  return `${hours}:${minutes}`
}
