export default async function CollectionImage(contract) {
  const res = await fetch(
    "https://api.covalenthq.com/v1/56/tokens/" +
      contract +
      "/nft_token_ids/?page-size=1&page-number=1&key=" +
      process.env.COVALENT_KEY
  );
  const tokenId = await res.json().then((r) => r.data.items[0].token_id);

  const getImage = await fetch(
    "https://api.covalenthq.com/v1/56/tokens/" +
      contract +
      "/nft_metadata/" +
      tokenId +
      "/?&key=" +
      process.env.COVALENT_KEY
  );
  const meta = await getImage.json().then((r) => r.data.items[0]);
  const image = meta.nft_data
    ? meta.nft_data[0].external_data
      ? meta.nft_data[0].external_data.image
      : ""
    : "";
  return image;
}
