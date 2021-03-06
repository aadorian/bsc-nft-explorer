import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
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
  Input,
} from "@chakra-ui/react";
import data from "../collections.json";

import CollectionSize from "@/utils/collectionSize";
import CollectionName from "@/utils/collectionName";
import CollectionImage from "@/utils/collectionImage";

import BasicModal from "@/components/BasicModal";

export default function Home({ collections }) {
  const [addCollection, setAddCollection] = useState("");
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
          {/* <Box borderRadius="lg" borderWidth={"1px"} p="4"></Box>
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
          </Box> */}
          <Box borderRadius="lg" borderWidth={"1px"} p="4">
            <BasicModal
              buttonText={"Suggest a collection"}
              actionLink={
                "https://github.com/karlxlee/bsc-nft-explorer/issues/new?title=Add+new+collection&body=" +
                addCollection
              }
              actionTarget={"_blank"}
              title="Suggest a collection"
            >
              <Text pb={6}>
                Want to see a collection added to BSC NFT Explorer? Simply enter
                the contract address of the collection below.
              </Text>
              <Input
                value={addCollection}
                onChange={(e) => setAddCollection(e.target.value)}
                focusBorderColor="gray"
                placeholder="0x..."
              />
            </BasicModal>
          </Box>
          <Box borderRadius="lg" borderWidth={"1px"} p="4">
            <Heading as="h2" size="sm" mb={3}>
              Collections
            </Heading>
            <SimpleGrid columns={4} spacing={2}>
              {collections.map((collection) => (
                <Link
                  key={collection.contract}
                  href={"/collection/" + collection.contract}
                >
                  <a>
                    <Box h={"80%"} borderRadius="lg" borderWidth={"1px"} p="4">
                      <Image src={collection.image} />
                      <Box borderRadius="lg" boxSize="sm" pt="2">
                        {collection.name}
                        <br />
                        Items: {collection.size}
                      </Box>
                    </Box>
                  </a>
                </Link>
              ))}
            </SimpleGrid>
          </Box>

          {/* <Box borderRadius="lg" borderWidth={"1px"} p="4">
            <Heading as="h2" size="sm" mb={3}>
              Top collections by volume
            </Heading>
          </Box> */}
        </Stack>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  let collections = [];
  for (let i in data) {
    let contract = data[i];
    const name = await CollectionName(contract);
    const size = await CollectionSize(contract);
    const image = await CollectionImage(contract);
    collections.push({ name, contract, size, image });
  }
  console.log(collections);
  return { props: { collections } };
}
