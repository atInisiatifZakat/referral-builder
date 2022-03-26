import {
  Button,
  Input,
  SimpleGrid,
  useClipboard,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";

const Home: NextPage = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [referral, setReferral] = useState("");
  const [result, setResult] = useState("");

  const { hasCopied, onCopy } = useClipboard(result);

  const handleGenerate = useCallback(() => {
    const url = new URL(baseUrl);

    const params = url.searchParams;

    params.append("referral", referral);

    setResult(`https://${url.hostname}${url.pathname}?${params.toString()}`);
  }, [baseUrl, referral, setResult]);

  return (
    <VStack
      bg="whiteAlpha.50"
      align="center"
      justify="center"
      minH="100vh"
      w={{ base: "full" }}
      spacing="10"
    >
      <Head>
        <title>Zakatpedia - Referral Builder</title>
        <meta name="description" content="Create url with referral code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SimpleGrid w={{ base: "full", md: "container.lg" }} gap="4" p="2">
        <SimpleGrid
          w={{ base: "full", md: "container.lg" }}
          gap="4"
          columns={{ base: 1, md: 2 }}
        >
          <Input
            placeholder="Url zakatpedia disini"
            variant="filled"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.currentTarget.value)}
          />
          <Input
            placeholder="Kode referral disini."
            variant="filled"
            value={referral}
            onChange={(e) => setReferral(e.currentTarget.value)}
          />
        </SimpleGrid>
        <Button colorScheme="red" onClick={handleGenerate}>
          Generate
        </Button>
      </SimpleGrid>

      <SimpleGrid w={{ base: "full", md: "container.lg" }} gap="4" p="2">
        <Input
          placeholder="Url zakatpedia disini"
          variant="filled"
          value={result}
          readOnly
        />
        <Button
          colorScheme="blue"
          onClick={onCopy}
          disabled={result === "" || result === null}
        >
          {hasCopied ? "Berhasil di Copy" : "Copy"}
        </Button>
      </SimpleGrid>
    </VStack>
  );
};

export default Home;
