import { date, range } from '@formkit/tempo'

/**
 * 1週間分のDateオブジェクトを返します.
 * タイムゾーン: ローカル
 */
export const getOneWeekDateTimes = () => {
  return range('dddd', 'ja').map((dateTime) => {
    return date(dateTime)
  })
}
