const { DateTime } = require("luxon")

module.exports = {
  date: dateObject => DateTime.fromJSDate(dateObject).setLocale("de").toLocaleString(DateTime.DATE_FULL),
  isoDate: dateObject => DateTime.fromJSDate(dateObject).toISODate(),
  isoDateTime: dateObject => DateTime.fromJSDate(dateObject).toISO()
}
