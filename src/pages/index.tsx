import DateDiff from "date-diff";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dateFormat from "dateformat";
var df = require("date-formatter");

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (server: Date, client: Date) => {
  const timeDifference = new DateDiff(server, client);
  const day = timeDifference.days;
  const hours = timeDifference.hours;
  const second = timeDifference.seconds;
  const minutes = timeDifference.minutes;
  return {
    day,
    hours,
    second,
    minutes,
  };
};

interface Itime {
  day: number;
  hours: number;
  minutes: number;
  second: number;
}

export default function Home({ serverTime }: any) {
  const [browserTime, setBrowserTime] = useState<Date>();
  const [userTime, setUserTime] = useState<Itime>();
  const [day, setDay] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [hour, setHour] = useState(0);

  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  };
  useEffect(() => {
    const browserNow = new Date();
    const serverNow = new Date(serverTime);
    setBrowserTime(browserNow);
    const date = calculateTimeDifference(browserNow, serverNow);
    setDay(date.day);
    setMinute(date.minutes);
    setSecond(date.second);
    setHour(date.hours);
  }, []);

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">
              {dateFormat(serverTime, "d-MM-yyyy HH:mm")}
            </span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">
              {day.toString()} jour : {hour.toString()} heures :
              {minute.toString()} : minutes : {second.toString()} second{" "}
            </span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
export async function getServerSideProps() {
  const serverTime = new Date().toJSON();
  return { props: { serverTime } };
}
