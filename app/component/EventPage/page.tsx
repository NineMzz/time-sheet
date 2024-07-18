import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import "./eventpage.scss";

interface CalendarEvent {
  subject: string;
  start: { dateTime: string };
  end: { dateTime: string };
}

const mockEvents: CalendarEvent[] = [
  {
    subject: "Meeting with Team",
    start: { dateTime: "2024-07-18T09:00:00Z" },
    end: { dateTime: "2024-07-18T10:00:00Z" },
  },
  {
    subject: "Lunch with Client",
    start: { dateTime: "2024-07-18T12:00:00Z" },
    end: { dateTime: "2024-07-18T13:00:00Z" },
  },
  {
    subject: "Project Presentation",
    start: { dateTime: "2024-07-18T15:00:00Z" },
    end: { dateTime: "2024-07-18T16:30:00Z" },
  },
];

const EventPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(mockEvents);

  useEffect(() => {
    const events = searchParams.get('events');
    if (events) {
      setCalendarEvents(JSON.parse(events));
    }
  }, [searchParams]);

  const handleEventChange = (index: number, key: string, value: string) => {
    const updatedEvents = [...calendarEvents];
    if (key === 'subject') {
      updatedEvents[index].subject = value;
    } else if (key === 'start') {
      updatedEvents[index].start.dateTime = value;
    } else if (key === 'end') {
      updatedEvents[index].end.dateTime = value;
    }
    setCalendarEvents(updatedEvents);
  };

  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div>
      <h2>Calendar Events:</h2>
      <table style={{ textAlign: 'left', width: '100%', border: '1px solid black' }}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {calendarEvents.map((event, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={event.subject}
                  onChange={(e) => handleEventChange(index, 'subject', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formatDate(event.start.dateTime)}
                  onChange={(e) => handleEventChange(index, 'start', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formatDate(event.end.dateTime)}
                  onChange={(e) => handleEventChange(index, 'end', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventPage;
