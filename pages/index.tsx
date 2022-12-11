import Head from "next/head";
import Image from "next/image";
import Container from "../components/Container";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My todolist</title>
        <meta name="description" content="todolist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center flex-col p-4 gap-4 bg-gradient-to-r from-cyan-500 to-blue-500 h-screen">
        <div className="rounded p-4 shadow-lg bg-white w-full max-w-[40rem]">
          <div className="flex justify-center items-center p-4">
            <h1 className="text-3xl font-bold">My To-do List</h1>
          </div>

          <Container />
        </div>
      </main>
    </div>
  );
}
