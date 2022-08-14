import moment from "moment"

export function calculateSleepData({ years, days, hours, minutes }) {
  let total = 0
  if (years) {
    total += 365 * 24 * years
  }
  if (days) {
    total += 24 * days
  }
  if (hours) {
    total += hours
  }
  if (minutes) {
    total += minutes / 60
  }

  return total
}

export function calculateHoursDifference(startTime, endTime) {
  return moment(endTime).diff(moment(startTime), "hours")
}