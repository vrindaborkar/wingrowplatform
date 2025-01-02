import dayjs from 'dayjs'
export const DATE_STRATEGY = {
  DATE_AND_TIME: 'DATE_AND_TIME',
  DATE_ONLY: 'DATE_ONLY',
  TIME_ONLY: 'TIME_ONLY',
}
export const formatDate = (value, strategy = DATE_STRATEGY.DATE_AND_TIME) => {
  let format
  switch (strategy) {
    case DATE_STRATEGY.DATE_AND_TIME:
      format = 'DD/MM/YY h:mm A'
      break
    case DATE_STRATEGY.DATE_ONLY:
      format = 'DD/MM/YY'
      break
    case DATE_STRATEGY.TIME_ONLY:
      format = 'h:mm A'
      break
    default:
      format = 'DD/MM/YY h:mm A'
  }
  return dayjs(value).format(format)
}

export const isValidTimeStamp = timestamp => {
  return dayjs(timestamp).isValid()
}
