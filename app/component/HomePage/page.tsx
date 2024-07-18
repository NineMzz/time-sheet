import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { displayCalendarEvents } from '../function/ms-apis';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const router = useRouter();

  const handleGetEvents = async () => {
    try {
      if (selectedDate) {
        selectedDate.setHours(0, 0, 0, 0);
        const eventsData = await displayCalendarEvents(selectedDate.toISOString());
        setCalendarEvents(eventsData);
      }
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    }
  };

  const handleNavigateToEventsPage = () => {
    router.push({
      pathname: '/events',
      query: { events: JSON.stringify(calendarEvents) },
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Home Page</h1>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
        />
        <button onClick={handleGetEvents}>Get Calendar Events</button>
        <button onClick={handleNavigateToEventsPage} disabled={calendarEvents.length === 0}>
          Go to Events Page
        </button>
      </header>
    </div>
  );
};

export default HomePage;
