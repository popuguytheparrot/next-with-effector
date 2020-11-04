import React from "react";
import Link from "next/link";
import { useEvent } from "effector-react/ssr";
import { useEffect } from "react";

import Clock from "./Clock";
import { start, stopTimer } from "../src/model";

const Page = ({ title, linkTo }) => {
  const startEvent = useEvent(start);
  const stopTimerEvent = useEvent(stopTimer);

  useEffect(() => {
    startEvent();
    return () => stopTimerEvent();
  });

  return (
    <div>
      <h1>{title}</h1>
      <Clock />
      <nav>
        <Link href={linkTo}>
          <a>Navigate</a>
        </Link>
      </nav>
    </div>
  );
};

export default Page;
