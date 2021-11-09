export default async function CollectionTotalVolume(contract, hourFrame) {
  const startDate = new Date(
    new Date().getTime() - hourFrame * 60 * 60 * 1000
  ).toISOString();
  const res = await fetch(
    "https://api.covalenthq.com/v1/56/address/" +
      contract +
      `/transactions_v2/?match={"block_signed_at":{"$gt":"` +
      startDate +
      `"}}&group={"_id":{"year":{"$year":"block_signed_at"},"month":{"$month":"block_signed_at"},"day":{"$dayOfMonth": "block_signed_at"}},"count":{"$sum":1},"volume":{"$sum":"value_quote"}}&key=` +
      process.env.COVALENT_KEY
  );
  const dailyVolumes = await res.json().then((r) => r.data.items);
  let volume = 0;
  dailyVolumes.map((entry) => (volume += entry.volume));
  return volume;
}
