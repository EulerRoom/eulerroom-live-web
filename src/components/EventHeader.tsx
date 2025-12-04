import ProgressBar from "@ramonak/react-progress-bar";
import { DateTime } from "luxon";
import { ReactElement } from "react";
// import logo from "../assets/images/ICLC2024_Satellite.jpg";
import { MuxyEvent } from "../types";

interface Props {
  event: MuxyEvent | undefined;
  reservedStreamCount: number | null;
  totalStreamCount: number | null;
}

interface ProgressType {
  reserved: number;
  total: number;
  percent: number;
}

function EventHeader({
  event,
  reservedStreamCount,
  totalStreamCount,
}: Props): ReactElement {
  const calcProgressbar = (
    reservedStreamCount: number | null,
    totalStreamCount: number | null
  ): ProgressType => {
    if (reservedStreamCount === null || totalStreamCount === null) {
      return { reserved: 0, total: 0, percent: 0 };
    }

    return {
      reserved: reservedStreamCount,
      total: totalStreamCount,
      percent: (reservedStreamCount * 100) / totalStreamCount,
    };
  };

  const progressBarValues = calcProgressbar(
    reservedStreamCount,
    totalStreamCount
  );

  return (
    <>
      <header>
        <h1>15 years of From Scratch</h1>
        {/* <a className="cta" href="https://live.eulerroom.com" target="_blank">
          Watch the stream
        </a> */}
      </header>

      <section>
        <p>
15 years have passed from the first from scratch session held on December 7th at Centro Multimedia in Mexico City. <br>

In a from scratch live coders have to: <br>

1. Start from a blank screen<br>
2. Play for 9 minutes. On this stream slots are 12 minutes long 3 for setting up and 9 to play!<br>
3. Everyone must virtually clap at the end no matter the result!<br>
<br>
You can find more information at the 
<a href="https://www.toplap.cat/posts/from-scratch/">toplap barcelona page</a>
        </p>
      </section>
      <hr />

      <section>
        <h2>Event information</h2>
        <p>
          <strong>
            You will be able to watch live here:{" "}
            <a href={"https://live.eulerroom.com"}>live.eulerroom.com</a>
          </strong>
        </p>
        <p>
          <span>
            {" "}
            Start:{" "}
            {event &&
              DateTime.fromISO(event.starts_at).toFormat("HH:mm, LLLL dd")}{" "}
            <br />
            End:{" "}
            {event &&
              DateTime.fromISO(event.ends_at).toFormat("HH:mm, LLLL dd")}{" "}
          </span>
        </p>
        <p>
          <em>
            All times are listed for the timezone:{" "}
            {Intl.DateTimeFormat().resolvedOptions().timeZone} (automatically
            detected)
          </em>
        </p>
      </section>
      <hr />

      <section>
        <h2>Schedule</h2>
        <p>
          Register for a performance slot below.
          <br />
          All live coders are welcome.
          <br />
          Once you've registered, please check your email for further
          instructions.
        </p>
        <p>
          <em>
            All times are listed for the timezone:{" "}
            {Intl.DateTimeFormat().resolvedOptions().timeZone} (automatically
            detected)
          </em>
        </p>
        <ProgressBar
          bgColor={"#a9c27c"}
          baseBgColor={"#ffffff"}
          labelClassName="label"
          labelAlignment={"outside"}
          width={"100%"}
          height={"28px"}
          margin={"8px"}
          customLabel={`${progressBarValues.reserved}/${progressBarValues.total} slots are filled`}
          completed={progressBarValues.percent}
        />
      </section>
    </>
  );
}

export default EventHeader;
