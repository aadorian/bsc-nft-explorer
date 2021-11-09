export default async function collectionName(contract) {
  const res = await fetch(
    "https://api.covalenthq.com/v1/56/tokens/" +
      contract +
      "/nft_token_ids/?page-size=1&key=" +
      process.env.COVALENT_KEY
  );
  const name = await res.json().then((r) => r.data.items[0].contract_name);
  return name;
}
