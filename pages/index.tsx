import { Box, Card, Divider, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Container from "../components/Container";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>My todolist</title>
        <meta name="description" content="todolist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center flex-col gap-4 h-screen">
        <Card sx={{ width: "100%", maxWidth: "25rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: 2,
            }}
          >
            <Typography variant="h4">My To-do List</Typography>
          </Box>
          <Divider />
          <Container />
        </Card>
        <a
          className="fixed w-full text-center bottom-4 text-white"
          href="https://www.tomwhitticase.com"
        >
          Made by Tom Whitticase
        </a>
      </main>
    </>
  );
}
