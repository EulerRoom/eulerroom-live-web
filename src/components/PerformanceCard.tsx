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

const PerformanceCard = ({
  muxyStream,
  eventUrl,
  active,
}: Props): ReactElement => {
  const [inCreateMode, setInCreateMode] = useState<boolean>(false);
  const [currMuxyStream, setCurrMuxyStream] = useState<
    MuxyStream | EmptyMuxyStream
  >(muxyStream);
  const [inRemoveMode, setInRemoveMode] = useState<boolean>(false);
  const [inEditMode, setInEditMode] = useState<boolean>(false);
  const [removed, setRemoved] = useState<boolean>(false);

  const startsAtHs = DateTime.fromISO(muxyStream.starts_at).toFormat(
    "HH:mm LLL dd"
  );
  const endsAtHs = DateTime.fromISO(muxyStream.ends_at).toFormat(
    "HH:mm LLL dd"
  );

  const isRegistered = "publisher_name" in currMuxyStream;
  // let text = null;
  // if ("publisher_name" in currMuxyStream) {
  //   const { publisher_name, location, title, timezone } = currMuxyStream;
  //   text = [publisher_name, location, title, timezone].join(" / ");
  // }

  const resetFormStates = () => {
    setInCreateMode(false);
    setInRemoveMode(false);
    setInEditMode(false);
  };

  const handleEditClick = () => {
    resetFormStates();
    setInEditMode((prevState) => !prevState);
  };

  const handleRemoveClick = () => {
    resetFormStates();
    setInRemoveMode((prevState) => !prevState);
  };
  const handleRemove = () => setRemoved(true);

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
      {active && !inCreateMode && !isRegistered && (
        <button onClick={() => setInCreateMode(true)}>
          Register for this slot
        </button>
      )}
      {removed && <p>You have removed your slot succesfully.</p>}
      {inCreateMode ? (
        <PerformanceCreateForm
          eventUrl={eventUrl}
          startsAt={currMuxyStream.starts_at}
          endsAt={currMuxyStream.ends_at}
        />
      ) : (
        isRegistered && (
          <>
            <PerformanceCardContent muxyStream={currMuxyStream} />
            {!removed && isRegistered && (
              <nav>
                <button onClick={handleEditClick} className="card-button">
                  Edit
                </button>
                <button onClick={handleRemoveClick} className="card-button">
                  Remove
                </button>
                {inEditMode && "url" in currMuxyStream && (
                  <PerformanceEditForm
                    streamUrl={currMuxyStream.url}
                    currMuxyStream={currMuxyStream}
                    onSetInEditMode={setInEditMode}
                    setCurrMuxyStream={setCurrMuxyStream}
                  />
                )}
                {inRemoveMode && "url" in currMuxyStream && (
                  <PerformanceDestroyForm
                    streamUrl={currMuxyStream.url}
                    onRemove={handleRemove}
                  />
                )}
              </nav>
            )}
          </>
        )
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
