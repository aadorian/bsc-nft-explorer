export default async function CollectionDailyVolume(contract, hourFrame) {
  const startDate = new Date(
    new Date().getTime() - hourFrame * 60 * 60 * 1000
  ).toISOString();
  console.log(startDate);

  const res = await fetch(
    "https://api.covalenthq.com/v1/56/address/" +
      contract +
      `/transactions_v2/?no-logs=true&page-number=1&page-size=5000&match={"block_signed_at":{"$gt":"` +
      startDate +
      `"}}&group={"_id":{"year":{"$year":"block_signed_at"},"month":{"$month":"block_signed_at"},"day":{"$dayOfMonth": "block_signed_at"}},"count":{"$sum":1},"volume":{"$sum":"value"}}&key=` +
      process.env.COVALENT_KEY
  );
  let dailyVolume = [];
  let allDates = [];
  const jsonData = await res.json();
  if (jsonData.data.items.length) {
    let volumeData = jsonData.data.items;
    for (let i in volumeData) {
      let entry = volumeData[i];
      console.log(entry.id.day);
      dailyVolume.push({
        x: entry.id.year + " " + entry.id.month + " " + entry.id.day,
        y: entry.volume / 10 ** 18,
      });
      allDates.push(
        Date.parse(entry.id.year + " " + entry.id.month + " " + entry.id.day)
      );
    }
  }
  let minDate = new Date(Math.min(...allDates)).getTime();
  return { data: dailyVolume, minDate };
}
