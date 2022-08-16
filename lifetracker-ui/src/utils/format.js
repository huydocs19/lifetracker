import moment from "moment"

export const formatDate = (date) => {
  const d = new Date(date)
  return moment(d).format("MMM Do, YYYY")
}

export const formatCalendar = (date) => {
  const d = new Date(date)
  return moment(d).calendar()
}

export const formatDateAndTime = (date) => {
  const d = new Date(date)
  return moment(d).format("MMM Do, YYYY [at] hh:mm A")
}

export const formatSleepTime = (date) => {
  const d = new Date(date)
  return moment(d).format("yyyy-MM-DDTHH:mm")
}

export const formatTimeStat = (date) => {
  const d = new Date(date)
  return moment(d).format("h:mm A")
}

const averageFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatAverage = (stat) => {
  return stat ? averageFormatter.format(stat) : 0
}

const statFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export const formatStatistic = (stat) => {
  return stat ? statFormatter.format(stat) : 0
}
