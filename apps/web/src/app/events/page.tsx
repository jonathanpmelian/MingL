import Image from "next/image";
import style from "./Events.module.scss";
import Link from "next/link";
import React from "react";

const EVENTS = [
  {
    id: 1,
    title: "First event",
    type: "Online",
    date: "2024-12-06T13:22:02.290Z",
  },
  {
    id: 2,
    title: "Second event",
    type: "Offline",
    location: "Santa Cruz",
    date: "2024-12-06T13:22:02.290Z",
  },
  {
    id: 3,
    title: "Third event",
    type: "Online",
    date: "2024-12-06T13:22:02.290Z",
  },
  {
    id: 4,
    title: "Fourth event",
    type: "Offline",
    location: "Santa Cruz",
    date: "2024-12-06T13:22:02.290Z",
  },
];

function TagComponent({ children }: { children: React.ReactNode }) {
  return <span className={style.tag}>{children}</span>;
}

function EventsPage() {
  return (
    <main className={style.eventPage}>
      <h2>Upcoming Events</h2>

      <section className={style.eventList}>
        {EVENTS.map((event) => (
          <article key={event.id} className={style.event}>
            <Image
              src=""
              alt={`${event.title} image`}
              height={150}
              className={style["event-image"]}
            ></Image>

            <div className={style["event-date"]}>10 Dec</div>

            <section className={style["event-content"]}>
              <h3 style={{ paddingTop: "10px" }}>{event.title}</h3>

              <TagComponent>{event.type}</TagComponent>

              <span>{event.date}</span>

              {event?.location && <span>{event.location}</span>}

              <Link
                href={`/events/${event.id}`}
                className={style["event-button"]}
              >
                View details
              </Link>
            </section>
          </article>
        ))}
      </section>
    </main>
  );
}

export default EventsPage;
