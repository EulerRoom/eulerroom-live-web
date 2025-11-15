import React, { ReactElement, useState } from "react";
import { PerformanceCardMode } from "./PerformanceCard";

interface Props {
  eventUrl: string;
  startsAt: string;
  endsAt: string;
  setMode: (mode: PerformanceCardMode) => void;
}

function PerformanceCreateForm({
  eventUrl,
  startsAt,
  endsAt,
  setMode,
}: Props): ReactElement {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [streamkey, setStreamKey] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const muxyApiKey: string = import.meta.env.VITE_MUXY_API_KEY as string;
  const muxyUrl: string = import.meta.env.VITE_MUXY_URL as string;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${muxyUrl}/streams/`, {
      method: "post",
      headers: new Headers({
        Authorization: `Api-Key ${muxyApiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        publisher_name: name,
        publisher_email: email,
        title: title,
        description: description,
        location: location,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        event: eventUrl, // This needs to come from the muxy event (isn't available right now)
        starts_at: startsAt, // This needs to be calculated before
        ends_at: endsAt, // This needs to be calculated before
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStreamKey(data.key);
      })
      .catch(console.error);
  };

  return (
    <>
      {streamkey && (
        <div>
          <p>
            You have successfully registered for the event. Your streamkey is{" "}
            <b>{streamkey}</b>{" "}
          </p>
          <p>You should have received this as an email too. </p>
          <p>
            Save this key well, you will need it for the event and also to
            delete your slot again.{" "}
          </p>
          <p>
            When this page is reloaded, the key will no longer be displayed.{" "}
          </p>
        </div>
      )}
      {!streamkey && (
        <form onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            id="email"
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input type="submit" value="Register" />
          <nav>
            <input
              type="button"
              value="Cancel"
              onClick={() => setMode("view")}
            />
          </nav>
        </form>
      )}
    </>
  );
}

export default PerformanceCreateForm;
