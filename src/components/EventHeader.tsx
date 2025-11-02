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
    <header className="App-header">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <h2>Live Code Stream for Palestine</h2>
      <div class="flagbackground">
        <div class="flagtop"></div>
        <div class="flagmiddle"></div>
        <div class="flagtriangle"></div>
      </div>

      <hr />
      <p>Please note this is in test mode - signups will be deleted.</p>

      <hr />

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
        ,<br /> Israel is carrying out genocide through the systematic
        destruction of the Palestinian people in the Gaza strip.
      </p>
      <p>
        Together we can try to help by: <br />
        <br />
        <strong>
          Join the Palestinian-lead{" "}
          <a href="https://bdsmovement.net/campaigns#1">BDS movement.</a>
        </strong>
        <br />
        E.g. boycott Google, Amazon, Booking.com, Airbnb, Expedia, Teva,
        Chevron, Intel, Dell, Siemens, HP, Microsoft, Carrefour, <br />
        AXA, Reebok, Disney+, Sodastream, Re/max. <br /> Switching to ethical
        banking/pension can be the easiest and most effective individual action
        against the arms trade and climate breakdown.
      </p>
      <p>
        <strong>Write to your local/national government representative.</strong>
      </p>
      <p>
        <strong>Donate!</strong>
        <br /> e.g.{" "}
        <a href="https://www.map.org.uk/">Medical Aid for Palestinians</a>,
        <a href="https://eleelnaelak.org/">Ele Elna Enak </a>,
        <a href="https://chuffed.org/project/113222-tent-campaign-the-sameer-project">
          Sameer
        </a>
        ,{" "}
        <a href="https://chuffed.org/project/115245-dahnoun-mutual-aid">
          Dahnoun
        </a>
      </p>
      <p>
        <strong>Spread the word.</strong>
        <br />
        E.g. by sharing this stream in your community and/or contributing a
        performance.
      </p>
      <hr />

      <p>
        Register a performance slot below.
        <br />
        All live coders welcome, especially if this will be your first public
        performance.
        <br />
        Once you have registered, please check your email for further
        instructions.
      </p>
      <h4>
        {" "}
        {event &&
          DateTime.fromISO(event.starts_at).toFormat("dd. LLLL HH:mm")}{" "}
        - {event && DateTime.fromISO(event.ends_at).toFormat("dd. LLLL HH:mm")}{" "}
        {event && DateTime.fromISO(event.starts_at).toFormat("yyyy")}
      </h4>
      {/* {!event?.active && (
        <h4 style={{ color: "darkred" }}>
          Note: This event is not yet open for registration. Slot
          sign up opens Wed, May 8 for Asia/Pacific, May 15th globally.
        </h4>
      )} */}
      <hr />
      <ProgressBar
        className="wrapper"
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
      <hr />
      <p>Your timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
      <p className="link-paragraph">
        <b>
          Watch live here &gt;&gt;&gt;{" "}
          <a href={"https://live.eulerroom.com"}>https://live.eulerroom.com/</a>
        </b>
      </p>
    </header>
  );
}

export default EventHeader;
