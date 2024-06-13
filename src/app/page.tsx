import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Link href="/participant">Form Particpante</Link>
      <br />
      <Link href="/event">Form Evento</Link>
    </div>
  );
};

export default Home;
