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
import CollectionTotalVolume from "@/utils/collectionTotalVolume";
import CollectionDailyStats from "@/utils/collectionDailyStats";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("@/components/LineChart"), {
  ssr: false,
});
// import ApexChart from "@/components/LineChart";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

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
        <StatGroup>
          <Stat>
            <StatLabel>Items</StatLabel>
            <StatNumber>{props.size}</StatNumber>
            <StatHelpText></StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>24hr Volume (USD)</StatLabel>
            <StatNumber>{formatter.format(props.volume24hr)}</StatNumber>
            <StatHelpText></StatHelpText>
          </Stat>
        </StatGroup>
      </Box>
      <Box borderRadius="lg" borderWidth={"1px"} p="4">
        <Heading as="h2" size="md" pb={2}>
          Volume (BNB)
        </Heading>
        <ApexChart data={props.dailyVolume} minDate={props.minDate} />
      </Box>
      <Box borderRadius="lg" borderWidth={"1px"} p="4">
        <Heading as="h2" size="md" pb={2}>
          Number of transactions
        </Heading>
        <ApexChart data={props.dailyCount} minDate={props.minDate} />
      </Box>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const name = await CollectionName(params.collection);
  const size = await CollectionSize(params.collection);
  const image = await CollectionImage(params.collection);
  const volume24hr = await CollectionTotalVolume(params.collection, 24);
  const { dailyVolume, dailyCount, minDate } = await CollectionDailyStats(
    params.collection,
    24 * 7 * 5
  );
  // console.log(volumeWeek);

  return {
    props: {
      name,
      contract: params.collection,
      size,
      volume24hr,
      dailyVolume,
      dailyCount,
      minDate,
    },
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
