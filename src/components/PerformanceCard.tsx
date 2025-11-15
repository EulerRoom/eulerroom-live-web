import { DateTime } from "luxon";
import { ReactElement, useState } from "react";
import { EmptyMuxyStream, MuxyStream } from "../types";
import PerformanceCreateForm from "./PerformanceCreateForm";
import PerformanceDestroyForm from "./PerformanceDestroyForm";
import PerformanceEditForm from "./PerformanceEditForm";

interface Props {
  muxyStream: MuxyStream | EmptyMuxyStream;
  eventUrl: string;
  active: boolean;
}

export type PerformanceCardMode = "view" | "create" | "edit" | "remove";

const PerformanceCard = ({
  muxyStream,
  eventUrl,
  active,
}: Props): ReactElement => {
  const [mode, setMode] = useState<PerformanceCardMode>("view");

  const [currMuxyStream, setCurrMuxyStream] = useState<
    MuxyStream | EmptyMuxyStream
  >(muxyStream);
  const [removed, setRemoved] = useState<boolean>(false);

  const startsAtHs = DateTime.fromISO(muxyStream.starts_at).toFormat(
    "HH:mm LLL dd"
  );
  const endsAtHs = DateTime.fromISO(muxyStream.ends_at).toFormat(
    "HH:mm LLL dd"
  );

  const isRegistered = "publisher_name" in currMuxyStream;

  return (
    <article className="card">
      <h3>
        {muxyStream.slot_stop == muxyStream.slot_start
          ? "Cycle #" + muxyStream.slot_start
          : "Cycles #" +
            muxyStream.slot_start +
            "-#" +
            muxyStream.slot_stop}{" "}
      </h3>
      <p className="card-time">
        {startsAtHs} - {endsAtHs}{" "}
      </p>
      {active && mode === "view" && !isRegistered && (
        <button onClick={() => setMode("create")}>
          Register for this slot
        </button>
      )}
      {removed && <p>You have removed your slot succesfully.</p>}
      {mode === "edit" && "url" in currMuxyStream && (
        <PerformanceEditForm
          streamUrl={currMuxyStream.url}
          currMuxyStream={currMuxyStream}
          onSetInEditMode={() => setMode("edit")}
          setCurrMuxyStream={setCurrMuxyStream}
          setMode={setMode}
        />
      )}
      {mode === "remove" && "url" in currMuxyStream && (
        <PerformanceDestroyForm
          streamUrl={currMuxyStream.url}
          onRemove={() => setRemoved(true)}
          setMode={setMode}
        />
      )}
      {mode === "create" && (
        <PerformanceCreateForm
          eventUrl={eventUrl}
          startsAt={currMuxyStream.starts_at}
          endsAt={currMuxyStream.ends_at}
          setMode={setMode}
        />
      )}
      {mode === "view" && isRegistered && (
        <>
          <PerformanceCardContent muxyStream={currMuxyStream} />
          {!removed && isRegistered && (
            <nav>
              <button onClick={() => setMode("edit")}>Edit</button>
            </nav>
          )}
        </>
      )}
    </article>
  );
};

function PerformanceCardContent({ muxyStream }: { muxyStream: MuxyStream }) {
  return (
    <>
      <span>“{muxyStream.title}”</span>
      <h4>{muxyStream.publisher_name}</h4>
      <small>{muxyStream.location}</small>
    </>
  );
}

export default PerformanceCard;
