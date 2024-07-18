import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EventPage: React.FC = () => {
  const router = useRouter();
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedEvent, setEditedEvent] = useState<any>({});

  useEffect(() => {
    if (router.query.events) {
      setCalendarEvents(JSON.parse(router.query.events as string));
    }
  }, [router.query.events]);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedEvent({ ...calendarEvents[index] });
  };

  const handleSave = (index: number) => {
    const updatedEvents = [...calendarEvents];
    updatedEvents[index] = editedEvent;
    setCalendarEvents(updatedEvents);
    setEditIndex(null);
  };

  const handleChange = (field: string, value: string) => {
    setEditedEvent((prev: any) => ({
      ...prev,
      [field]: { dateTime: value },
    }));
  };

  const handleChangeSubject = (value: string) => {
    setEditedEvent((prev: any) => ({
      ...prev,
      subject: value,
    }));
  };

  return (
    <div>
      <h2>Calendar Events</h2>
      <table style={{ textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Start</th>
            <th>End</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {calendarEvents.map((event, index) => (
            <tr key={index}>
              {editIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editedEvent.subject}
                      onChange={(e) => handleChangeSubject(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      value={new Date(editedEvent.start.dateTime).toISOString().slice(0, 16)}
                      onChange={(e) => handleChange('start', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      value={new Date(editedEvent.end.dateTime).toISOString().slice(0, 16)}
                      onChange={(e) => handleChange('end', e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(index)}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{event.subject}</td>
                  <td>{new Date(event.start.dateTime).toLocaleString()}</td>
                  <td>{new Date(event.end.dateTime).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventPage;
