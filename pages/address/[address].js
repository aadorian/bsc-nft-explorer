import Page from "@/components/Page";
import { Box, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react";

function Address(props) {
  return (
    <Page>
      {" "}
      <Box mt={12} pb={8} borderRadius="lg" borderWidth={"1px"} p="4">
        <Heading as="h1" size="xl">
          {props.address}
        </Heading>
        <Text color="gray.500" mt={4}>
          Last updated: {props.updated_at}
        </Text>
      </Box>
      <SimpleGrid columns={2} spacing={10}>
        {props.items.map((item) => (
          <Box borderRadius="lg" borderWidth={"1px"} p="4">
            {item.contract_name}
            <br />
            {item.nft_data && item.nft_data[0].token_id}
            {item.nft_data && item.nft_data[0].external_data && (
              <Box borderRadius="lg" boxSize="sm">
                <Image src={item.nft_data[0].external_data.image} />
              </Box>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Page>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    "https://api.covalenthq.com/v1/1/address/" +
      params.address +
      "/balances_v2/" +
      "?key=" +
      process.env.COVALENT_KEY +
      '&nft=true&match={$or:[{supports_erc:{$elemmatch:"erc721"}},{supports_erc:{$elemmatch:"erc1155"}}]}'
  );
  const jsonData = await res.json().then((r) => r.data);
  console.log(jsonData.items[0].nft_data);

  return { props: jsonData };
}

export default Address;
