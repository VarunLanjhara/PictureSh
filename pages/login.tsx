import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { signInWithGoogle } from "../utils/functions";
import { useSession, getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

const Login = () => {
  const [displayLogin, setDisplayLogin] = useState(false);
  const words = [
    "PictureSh",
    "A place where you can",
    "share, collect and save images",
    "of anything you find intersting.",
  ];
  const { text } = useTypewriter({
    words,
    loop: 1,
    onLoopDone() {
      setDisplayLogin(true);
    },
    typeSpeed: 60,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Picturesh Login. A place where you can share, collect and save images of anything you find interesting. Please login to continue"
        />
        <link rel="icon" href="/ohno.ico" />
      </Head>
      <Flex
        width="100%"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        overflow="hidden"
      >
        <Flex
          position="relative"
          width="100%"
          height="100%"
          backgroundColor="#FF3CAC"
          backgroundImage="linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)"
        ></Flex>
        <Flex
          position="absolute"
          justifyContent="center"
          alignItems="center"
          gap="1rem"
          background="blackAlpha.500"
          width="100%"
          height="100%"
        >
          <Flex
            flexDirection="column"
            gap="2rem"
            width={{
              md: "80%",
              sm: "90%",
            }}
            alignItems="center"
          >
            <Heading
              color="white"
              fontSize={{
                md: "7xl",
                sm: "5xl",
              }}
              textAlign="center"
            >
              {text}
              <Cursor cursorStyle="_" />
            </Heading>
            {displayLogin ? (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -200,
                  y: 0,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  x: 0,
                  y: -100,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <Button
                  onClick={signInWithGoogle}
                  leftIcon={<FcGoogle />}
                  variant="solid"
                  size="lg"
                  borderRadius="lg"
                  backgroundColor="white"
                  color="#1a202c"
                  _hover={{
                    backgroundColor: "white",
                    color: "#1a202c",
                  }}
                  _focus={{
                    backgroundColor: "white",
                    color: "#1a202c",
                  }}
                >
                  Continue with google
                </Button>
              </motion.div>
            ) : null}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Login;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
