import Page from "@/components/Page";
import Nav from "@/components/Nav";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import data from "../../collections.json";

import CollectionSize from "@/utils/collectionSize";
import CollectionName from "@/utils/collectionName";
import CollectionImage from "@/utils/collectionImage";

function Collection(props) {
  return (
    <Page>
      <Nav />{" "}
      <Box mt={12} pb={8} borderRadius="lg" borderWidth={"1px"} p="4">
        <Heading as="h1" size="xl">
          {props.name}
        </Heading>
        <Text color="gray.500" mt={4}>
          {props.contract}
        </Text>
      </Box>
      <Box borderRadius="lg" borderWidth={"1px"} p="4">
        <Stat>
          <StatLabel>Items</StatLabel>
          <StatNumber>{props.size}</StatNumber>
          <StatHelpText></StatHelpText>
        </Stat>
      </Box>
      <SimpleGrid columns={2} spacing={10}></SimpleGrid>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const name = await CollectionName(params.collection);
  const size = await CollectionSize(params.collection);
  const image = await CollectionImage(params.collection);

  return {
    props: { name, contract: params.collection, size },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds };
  };
}

export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const paths = data.map((contract) => ({
    params: { collection: contract },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export default Collection;
