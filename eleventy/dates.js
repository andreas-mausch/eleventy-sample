import { DateTime } from "luxon"

const date = dateObject => DateTime.fromJSDate(dateObject).setLocale("de").toLocaleString(DateTime.DATE_FULL)
const isoDate = dateObject => DateTime.fromJSDate(dateObject).toISODate()
const isoDateTime = dateObject => DateTime.fromJSDate(dateObject).toISO()

export {
  date,
  isoDate,
  isoDateTime
}
