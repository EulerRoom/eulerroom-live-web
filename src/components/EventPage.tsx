import { ReactElement, useEffect, useState } from "react";
import PerformanceList from "../components/PerformanceList";
import { MuxyEvents } from "../types";
import EventHeader from "./EventHeader";

function EventPage(): ReactElement {
  const [muxyEvents, setMuxyEvents] = useState<MuxyEvents | null>(null);
  const [reservedStreamCount, setReservedStreamCount] = useState<number | null>(
    null
  );
  const [totalStreamCount, setTotalStreamCount] = useState<number | null>(null);

  const muxyApiKey: string = import.meta.env.VITE_MUXY_API_KEY as string;
  const muxyUrl: string = import.meta.env.VITE_MUXY_URL as string;
  const eventSlug: string = import.meta.env.VITE_EVENT_SLUG as string;

  useEffect(() => {
    fetch(`${muxyUrl}/events/?slug=${eventSlug}`, {
      method: "get",
      headers: new Headers({
        Authorization: `Api-Key ${muxyApiKey}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMuxyEvents(data);
      })
      .catch(console.error);
  }, [eventSlug, muxyApiKey, muxyUrl]);

  const event = muxyEvents?.results && muxyEvents?.results[0];

  return (
    <main className="App">
      <EventHeader
        event={event}
        reservedStreamCount={reservedStreamCount}
        totalStreamCount={totalStreamCount}
      />
      {event && (
        <PerformanceList
          slug={event.slug}
          eventUrl={event.url}
          startsAt={event.starts_at}
          endsAt={event.ends_at}
          setReservedStreamCount={setReservedStreamCount}
          setTotalStreamCount={setTotalStreamCount}
        />
      )}
    </main>
  );
}

export default EventPage;
