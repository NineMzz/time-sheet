import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { displayCalendarEvents } from '../function/ms-apis';
import "./homepage.scss";

interface CalendarEvent {
    subject: string;
    start: { dateTime: string };
    end: { dateTime: string };

  }

const HomePage: React.FC = () => {
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const Router = useRouter();
  const handleEventPage = () => {
      Router.push("/component/EventPage");
  };

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

  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    date.setHours(date.getHours() + 7);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="homepage-container">
      
        <div className="">
            <img src="./logo.png" className="logo" alt="logo" />
        </div>
        <header className="header">
            
        <div className="date-container">
            <DatePicker className="date-picker"
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            />
        </div>

        <button className="get-event" onClick={handleGetEvents}>Get Calendar Events</button>
        <button className="get-event" onClick={handleEventPage}>To Event Page</button>
      </header>
    </div>
  );
};

export default HomePage;


