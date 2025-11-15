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
        <h1>Live Code Stream for Palestine</h1>
        <div className="flagbackground">
          <div className="flagtop"></div>
          <div className="flagmiddle"></div>
          <div className="flagtriangle"></div>
        </div>
        {/* We could show this button when the event is about to start? */}
        {/* <a className="cta" href="https://live.eulerroom.com">
          Watch the stream
        </a> */}
      </header>

      <section>
        <p>
          According to e.g.{" "}
          <a href="https://genocidescholars.org/wp-content/uploads/2025/08/IAGS-Resolution-on-Gaza-FINAL.pdf">
            leading scholars
          </a>
          , <a href="https://pchrgaza.org/">Palestinian</a>,{" "}
          <a href="https://www.btselem.org/publications/202507_our_genocide">
            Israeli
          </a>{" "}
          and{" "}
          <a href="https://www.amnesty.org/en/latest/news/2024/12/amnesty-international-concludes-israel-is-committing-genocide-against-palestinians-in-gaza/">
            International
          </a>{" "}
          human rights organisations, and{" "}
          <a href="https://www.ohchr.org/en/press-releases/2025/09/israel-has-committed-genocide-gaza-strip-un-commission-finds">
            the UN
          </a>
          , Israel is carrying out genocide through the systematic destruction
          of the Palestinian people in the Gaza strip.
        </p>
        <p style={{ paddingTop: "18px" }}>
          Together we can take active steps to help:
        </p>
        <p>
          <strong>
            ➔ &nbsp;Join the Palestinian-led{" "}
            <a href="https://bdsmovement.net/campaigns#1">BDS movement</a>.
          </strong>
          <br />
          e.g. Boycott Google, Amazon, Booking.com, Airbnb, Expedia, Teva,
          Chevron, Intel, Dell, Siemens, HP, Microsoft, Carrefour, AXA, Reebok,
          Disney+, Sodastream, Re/max. Switching to ethical banking/pension can
          be the easiest and most effective individual action against the arms
          trade and climate breakdown.
        </p>
        <p>
          <strong>
            ➔ &nbsp;Write to your local/national government representative.
          </strong>
          <br />
          Depending on where you live, you could raise the issues of e.g. arms
          sales to Israel, humanitarian aid, campaigns to end Israels aid
          blockades, and your government's obligations to take all available
          steps to end genocide under international humanitarian law.
        </p>
        <p>
          <strong>➔ &nbsp;Donate!</strong>
          <br />
          e.g. To{" "}
          <a href="https://www.map.org.uk/">
            Medical Aid for Palestinians
          </a>, <a href="https://eleelnaelak.org/">Ele Elna Enak </a>,{" "}
          <a href="https://chuffed.org/project/113222-tent-campaign-the-sameer-project">
            Sameer
          </a>
          ,{" "}
          <a href="https://chuffed.org/project/115245-dahnoun-mutual-aid">
            Dahnoun
          </a>
        </p>
        <p>
          <strong>➔ &nbsp;Spread the word.</strong>
          <br />
          e.g. By sharing this stream in your community and/or contributing a
          performance.
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
      </section>
      <hr />

      <section>
        <h2>Schedule</h2>
        <p>
          Register for a performance slot below.
          <br />
          All live coders are welcome, especially if this will be your first
          public performance.
          <br />
          Once you've registered, please check your email for further
          instructions.
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
