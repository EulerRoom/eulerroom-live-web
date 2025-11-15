import React, { ReactElement, useState } from "react";
import { PerformanceCardMode } from "./PerformanceCard";

interface Props {
  streamUrl: string;
  onRemove: () => void;
  setMode: (mode: PerformanceCardMode) => void;
}

function PerformanceDestroyForm({
  streamUrl,
  onRemove,
  setMode,
}: Props): ReactElement {
  const [streamKey, setStreamKey] = useState<string>("");
  const [failed, setFailed] = useState<boolean>(false);
  const muxyApiKey: string = import.meta.env.VITE_MUXY_API_KEY as string;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFailed(false);

    const headers = new Headers({
      Authorization: `Api-Key ${muxyApiKey}`,
      "X-Stream-Key": streamKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    fetch(streamUrl, {
      method: "DELETE",
      headers,
    })
      .then((res) => {
        if (res.ok) {
          setStreamKey("");
          onRemove && onRemove();
        } else {
          setFailed(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setFailed(true);
      });
  };

  return (
    <>
      {
        <form onSubmit={handleSubmit}>
          <p>
            Enter your streaming key to confirm you want to remove your slot. If
            you do not remember your streaming key, please contact the event
            organizer.
          </p>

          {failed && (
            <p style={{ color: "red" }}>
              Something went wrong, did you entered the incorrect stream key?
              Please try again.
            </p>
          )}
          <input
            id="key"
            type="text"
            placeholder="Stream key"
            value={streamKey}
            onChange={(e) => setStreamKey(e.target.value)}
            required
          />
          <input type="submit" className="danger" value="Remove slot" />
          <nav>
            <input
              type="button"
              value="Cancel"
              onClick={() => setMode("view")}
            />
          </nav>
        </form>
      }
    </>
  );
}

export default PerformanceDestroyForm;
