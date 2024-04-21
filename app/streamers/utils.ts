import { addDay, date, format, parse, tzDate } from "@formkit/tempo"

/**
 * 1週間分のDateオブジェクトを取得します.
 * Timezone: UTC
 */
export const getOneWeekDateTimes = () => {
  const today = date(new Date())
  return [...Array(7)].map((_, i) => {
    return addDay(today, i)
  })
}

export const nowUtc = () => {
  return tzDate(parse(new Date().toUTCString(), "ddd, DD MMM YYYY HH:mm:ss"), 'UTC')
}

export const parseISOFormat = (utcDateString: string) => {
  return parse(utcDateString, "ddd, DD MMM YYYY HH:mm:ss")
}
