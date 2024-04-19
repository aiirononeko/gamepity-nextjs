/**
 * 1週間分のDateオブジェクトを返します。
 * すべての日時は日本標準時（JST）で設定されます。
 */
export const getOneWeekDateTimes = () => {
  const timeZone = 'Asia/Tokyo'; // JSTを指定
  return [...Array(7)].map((_, i) => {
    // UTCの現在時刻に基づいて、日本標準時の日時を計算
    const today = new Date();
    today.setUTCDate(today.getUTCDate() + i);
    const formatted = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(today);

    // 日本標準時にフォーマットされた日時文字列からDateオブジェクトを再作成
    return new Date(formatted);
  })
}
