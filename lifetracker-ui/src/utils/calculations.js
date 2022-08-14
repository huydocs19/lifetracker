import moment from "moment"

export function calculateHoursDifference(startTime, endTime) {
  return moment(endTime).diff(moment(startTime), "hours")
}