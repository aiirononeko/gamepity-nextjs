/**
 * 1週間分のDateオブジェクトを返します.
 * タイムゾーン: ローカル
 */
export const getOneWeekDateTimes = () => {
  return [...Array(7)].map((_, i) => {
    const today = new Date()
    today.setDate(today.getDate() + i)
    return today
  })
}
