import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function Counter() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Test Counter</h1>
      <h2>Count : {count}</h2>
      <button onClick={() => setCount(count + 1)}>increase count</button>
      <br />
      <Link href="/">Home</Link>
      <br />
      <button onClick={() => router.replace("/")}>
        go to home with programmaticaly
      </button>
    </div>
  );
}

export default Counter;
