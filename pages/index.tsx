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
        <div className="rounded p-4 shadow-lg bg-white">
          <div className="flex justify-center items-center p-4">
            <h1 className="text-3xl font-bold">My To-do List</h1>
          </div>

          <Container />
        </div>
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
