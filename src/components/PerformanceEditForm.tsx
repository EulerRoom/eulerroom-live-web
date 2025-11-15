import React, { ReactElement, useState } from "react";
import { MuxyStream } from "../types";
import { PerformanceCardMode } from "./PerformanceCard";

interface Props {
  streamUrl: string;
  currMuxyStream: MuxyStream;
  onSetInEditMode: (inEditMode: boolean) => void;
  setCurrMuxyStream: (muxyStream: MuxyStream) => void;
  setMode: (mode: PerformanceCardMode) => void;
}

function PerformanceEditForm({
  streamUrl,
  currMuxyStream,
  onSetInEditMode,
  setCurrMuxyStream,
  setMode,
}: Props): ReactElement {
  const [name, setName] = useState<string>(currMuxyStream.publisher_name);
  const [title, setTitle] = useState<string>(currMuxyStream.title);
  const [description, setDescription] = useState<string>(
    currMuxyStream.description
  );
  const [streamKey, setStreamKey] = useState<string>("");
  const [location, setLocation] = useState<string>(currMuxyStream.location);
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

    const body = JSON.stringify({
      publisher_name: name,
      title: title,
      description: description,
      location: location,
      ends_at: currMuxyStream.ends_at,
      starts_at: currMuxyStream.starts_at,
      event: currMuxyStream.event,
    });

    fetch(streamUrl, {
      method: "PUT",
      headers,
      body,
    })
      .then((res) => {
        if (res.ok) {
          setStreamKey("");
          onSetInEditMode(false);
          setCurrMuxyStream({
            ...currMuxyStream,
            publisher_name: name,
            title: title,
            description: description,
            location: location,
          });
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
      <form onSubmit={handleSubmit}>
        <p>
          Please enter your streaming key to edit your slot. It was e-mailed to
          you when you registered. If you've lost your streaming key, or you
          want to change your e-mail address, please contact the event
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
          placeholder="Stream-Key"
          value={streamKey}
          onChange={(e) => setStreamKey(e.target.value)}
          required
        />
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          id="description"
          placeholder="Description (used for archive videos)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          maxLength={1000}
        />
        <input
          id="location"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input type="submit" className="card-button" value="Save slot" />
        <input
          type="button"
          value="Remove slot"
          className="danger"
          onClick={() => setMode("remove")}
        />
        <nav>
          <input type="button" value="Cancel" onClick={() => setMode("view")} />
        </nav>
      </form>
    </>
  );
}

export default PerformanceEditForm;
