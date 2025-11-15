import { DateTime } from "luxon";
import { ReactElement, useEffect, useMemo, useState } from "react";
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

const SLOT_DURATION_MIN = 15;

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
  }, [slug, setMuxyStreams, muxyApiKey, muxyUrl]);

  const startsAtDt = DateTime.fromISO(startsAt);
  const endsAtDt = DateTime.fromISO(endsAt);

  const allStreams: (MuxyStream | EmptyMuxyStream)[] = useMemo(() => {
    if (!startsAt || !endsAt) return [];
    if (!muxyStreams) return [];

    const results = muxyStreams?.results || [];

    // Sort streams by start time (just in case)
    const sortedStreams = results.sort((a, b) => {
      return a.starts_at.localeCompare(b.starts_at);
    });

    const allSlots = [];

    // Try to create empty slots for every SLOT_DURATION_MIN minutes If there is
    // already a stream that fits in the slot (or overlaps with it), use it and
    // continue from the end of it. Otherwise create an empty slot.
    let slot_n = 0;
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
          slot_start: slot_n + 1,
          slot_stop: slot_n + 1,
          used: 0,
        });
        slot_n++;
        slotAt = nextSlotAt;
      } else {
        // Hack to cope with streams that last for more than one slot
        const slots =
          DateTime.fromISO(stream.ends_at).diff(
            DateTime.fromISO(stream.starts_at)
          ).milliseconds /
          1000 /
          60 /
          SLOT_DURATION_MIN;
        stream.slot_start = slot_n + 1;
        stream.slot_stop = slot_n + slots;
        stream.used = slots;
        slot_n += slots;
        slotAt = DateTime.fromISO(stream.ends_at);

        allSlots.push(stream);
      }
    }

    return allSlots;
  }, [endsAt, muxyStreams, startsAt, endsAtDt, startsAtDt]);

  const usedSlots = allStreams.map((x) => x.used).reduce((a, b) => a + b, 0);

  setReservedStreamCount(usedSlots);
  setTotalStreamCount(
    endsAtDt.diff(startsAtDt).milliseconds / 1000 / 60 / SLOT_DURATION_MIN
  );

  return (
    <section className="performance-list">
      {allStreams &&
        allStreams.map((muxyStream, index) => (
          <PerformanceCard
            key={index}
            eventUrl={eventUrl}
            muxyStream={muxyStream}
            active={active}
          />
        ))}
    </section>
  );
};
export default PerformanceList;
