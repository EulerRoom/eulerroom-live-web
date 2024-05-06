import { DateTime } from "luxon";
import { ReactElement, useEffect, useMemo, useState } from "react";
import "../assets/css/PerformanceList.css";
import { EmptyMuxyStream, MuxyStream, MuxyStreams } from "../types";
import PerformanceCard from "./PerformanceCard";

interface Props {
  slug: string;
  eventUrl: string;
  startsAt: string;
  endsAt: string;
  active: boolean;
  setReservedStreamCount: (reservedStreamCount: number | null) => void;
  setTotalStreamCount: (ttalStreamCount: number | null) => void;
}

const SLOT_DURATION_MIN = 20;

const PerformanceList = ({
  slug,
  eventUrl,
  startsAt,
  endsAt,
  active,
  setReservedStreamCount,
  setTotalStreamCount,
}: Props): ReactElement => {
  const muxyApiKey: string = import.meta.env.VITE_MUXY_API_KEY as string;
  const muxyUrl: string = import.meta.env.VITE_MUXY_URL as string;
  const [muxyStreams, setMuxyStreams] = useState<MuxyStreams | null>(null);

  useEffect(() => {
    fetch(`${muxyUrl}/streams/?event__slug=${slug}`, {
      method: "get",
      headers: new Headers({
        Authorization: `Api-Key ${muxyApiKey}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMuxyStreams(data);
      })
      .catch(console.error);
  }, [slug]);

  const allStreams: (MuxyStream | EmptyMuxyStream)[] = useMemo(() => {
    if (!startsAt || !endsAt) return [];
    if (!muxyStreams) return [];

    const results = muxyStreams?.results || [];

    // Sort streams by start time (just in case)
    const sortedStreams = results.sort((a, b) => {
      return a.starts_at.localeCompare(b.starts_at);
    });

    const startsAtDt = DateTime.fromISO(startsAt);
    const endsAtDt = DateTime.fromISO(endsAt);

    const allSlots = [];

    // Try to create empty slots for every SLOT_DURATION_MIN minutes If there is
    // already a stream that fits in the slot (or overlaps with it), use it and
    // continue from the end of it. Otherwise create an empty slot.
    let slotAt = startsAtDt;
    while (slotAt < endsAtDt) {
      const nextSlotAt = slotAt.plus({ minutes: SLOT_DURATION_MIN });

      // Find the first stream that fits in the slot or overlaps with it
      const stream = sortedStreams.find((stream) => {
        const streamStartsAtDt = DateTime.fromISO(stream.starts_at);
        const streamEndsAtDt = DateTime.fromISO(stream.ends_at);
        return slotAt >= streamStartsAtDt && nextSlotAt <= streamEndsAtDt;
      });

      // If no stream fits in the slot, create an empty slot
      if (!stream) {
        allSlots.push({
          starts_at: slotAt.toUTC().toFormat("yyyy-MM-dd'T'HH:mm:ss'Z"),
          ends_at: nextSlotAt.toUTC().toFormat("yyyy-MM-dd'T'HH:mm:ss'Z"),
        });
        slotAt = nextSlotAt;
      } else {
        allSlots.push(stream);
        slotAt = DateTime.fromISO(stream.ends_at);
      }
    }

    return allSlots;
  }, [endsAt, muxyStreams, startsAt]);

  setReservedStreamCount(muxyStreams ? muxyStreams.results.length : 0);
  setTotalStreamCount(allStreams ? allStreams.length : 0);

  return (
    <div className="performance-list">
      {allStreams &&
        allStreams.map((muxyStream, index) => (
          <PerformanceCard
            key={index}
            eventUrl={eventUrl}
            muxyStream={muxyStream}
            cycleNo={index + 1}
            active={active}
          />
        ))}
    </div>
  );
};
export default PerformanceList;
