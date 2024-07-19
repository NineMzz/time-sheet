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
  // const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]); when you need to test
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedEvent, setEditedEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    const events = searchParams.get('events');
    if (events) {
      setCalendarEvents(JSON.parse(events));
    }
  }, [searchParams]);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedEvent(calendarEvents[index]);
  };

  const handleSave = () => {
    if (editIndex !== null && editedEvent !== null) {
      const updatedEvents = [...calendarEvents];
      updatedEvents[editIndex] = editedEvent;
      setCalendarEvents(updatedEvents);
      setEditIndex(null);
      setEditedEvent(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedEvent(null);
  };

  const handleEventChange = (key: string, value: string) => {
    if (editedEvent) {
      setEditedEvent({
        ...editedEvent,
        [key]: key === 'subject' ? value : { dateTime: value }
      });
    }
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
      <div className="body">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>

        <div className="event-container shadow-xl">
          <div className="tittle">
            <h1>Event Details</h1>
          </div>

          <div >
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
          <table className="shadow-xl">
            {/* <colgroup>
              <col style={{ width: '15%' }} /> 
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: 'auto' }} />
            </colgroup> */}
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Start Time Date</th>
                <th>End Time Date</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {calendarEvents.map((event, index) => (
                <tr key={index}>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editedEvent?.subject || ''}
                        onChange={(e) => handleEventChange('subject', e.target.value)}
                      />
                    ) : (
                      event.subject
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editedEvent?.start.dateTime || ''}
                        onChange={(e) => handleEventChange('start', e.target.value)}
                      />
                    ) : (
                      formatDate(event.start.dateTime)
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editedEvent?.end.dateTime || ''}
                        onChange={(e) => handleEventChange('end', e.target.value)}
                      />
                    ) : (
                      formatDate(event.end.dateTime)
                    )}
                  </td>
                  <td className="edit">
                    {editIndex === index ? (
                      <>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => handleEdit(index)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination text-left text-sm text-gray-600">
            Showing 1 to {calendarEvents.length} of {calendarEvents.length} results
          </div>
        </div>

        <div className="update-container">
            <button className="btn update-button">Update to ClickUp</button>
          </div>
      </div>
  );
};

export default EventPage;
