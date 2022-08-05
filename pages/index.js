import Head from "next/head";
import Header from "../Components/Header";
import Feed from "../Components/Feed";
import Modal from "../Components/Modal";

const Home = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll">
      <Head>
        <title>Instargram Clone </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Feed />
      <Modal />
    </div>
  );
};

export default Home;
