export async function collectionSize(contract) {
  const res = await fetch(
    "https://api.covalenthq.com/v1/56/tokens/" +
      contract +
      "/nft_token_ids/?page-size=1&key=" +
      process.env.COVALENT_KEY
  );
  const size = await res.json().then((r) => r.data.pagination.total_count);
  return size;
}
