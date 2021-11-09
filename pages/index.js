import Head from "next/head";
import {
  Heading,
  Text,
  Box,
  Tooltip,
  Container,
  Stack,
  HStack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Radio,
  RadioGroup,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import data from "../collections.json";

import { collectionSize } from "@/utils/collectionSize";
import collectionImage from "@/utils/collectionImage";

export default function Home({ collections }) {
  return (
    <div>
      <Head>
        <title>BSC NFT Explorer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.md">
        <Stack spacing={4}>
          <Box mt={12} pb={8} borderRadius="lg" borderWidth={"1px"} p="4">
            <Heading as="h1" size="xl">
              BSC NFT Explorer
            </Heading>
            <Text color="gray.500" mt={4}>
              Explore NFTs and key NFT metrics on Binance Smart chain
            </Text>
          </Box>
          <Box borderRadius="lg" borderWidth={"1px"} p="4"></Box>
          <Box borderRadius="lg" borderWidth={"1px"} p="4">
            <StatGroup>
              <Stat>
                <StatLabel>h Volume</StatLabel>
                <StatNumber></StatNumber>
                <StatHelpText>
                  <StatArrow type={"increase"} />%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Box>
          <Box borderRadius="lg" borderWidth={"1px"} p="4">
            <Heading as="h2" size="sm" mb={3}>
              Collections
            </Heading>
            <SimpleGrid columns={4} spacing={10}>
              {collections.map((collection) => (
                <Box borderRadius="lg" borderWidth={"1px"} p="4">
                  <Image src={collection.image} />
                  <Box borderRadius="lg" boxSize="sm">
                    Size: {collection.size}
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <Box borderRadius="lg" borderWidth={"1px"} p="4">
            <Heading as="h2" size="sm" mb={3}>
              Top collections by volume
            </Heading>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let collections = [];
  for (let i in data) {
    let contract = data[i];
    const size = await collectionSize(contract);
    const image = await collectionImage(contract);
    collections.push({ contract, size, image });
  }
  console.log(collections);
  return { props: { collections } };
}
