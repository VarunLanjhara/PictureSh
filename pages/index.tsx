import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Flex, useColorMode } from "@chakra-ui/react";
import Feed from "../components/Feed";
import variants from "../utils/variants";
import { getSession, useSession } from "next-auth/react";
import { UserType } from "../utils/types";
import { wrapper } from "../redux/store";
import { getAllImages } from "../redux/actions/imageActions";

type Props = {
  cookie: string;
};

const Home = (props: Props) => {
  const { colorMode } = useColorMode();
  const { data: session } = useSession();
  return (
    <motion.div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: colorMode === "light" ? "#f9f9f9" : "#030303",
      }}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear" }}
    >
      <Head>
        <title>PictureSh</title>
        <meta
          name="description"
          content="Picturesh - A place where you can share, collect and save images of anything you find interesting"
        />
        <link rel="icon" href="/ohno.ico" />
      </Head>
      <Navbar user={session?.user as UserType} category="all" />
      <Flex paddingLeft="25px" paddingRight="10px">
        <Feed cookie={props.cookie} />
      </Flex>
    </motion.div>
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
    const cookie = context?.req?.cookies["__Secure-next-auth.session-token"];
    await store.dispatch(getAllImages(cookie));
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    return {
      props: {
        session,
        cookie,
      },
    };
  }
);
