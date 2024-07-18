"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./homepage.scss";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// interface CalendarEvent {
//     id: number;
//     title: string;
//     date: string;
// }

interface CalendarEvent {
    subject: string;
    start: {
      dateTime: string;
    };
    end: {
      dateTime: string;
    };
  }

const HomePage: React.FC = () => {
    const Router = useRouter();
    const handleGetEvent = () => {
        Router.push("/component/EventPage");
    };

    const initialEvents: CalendarEvent[] = []; // Declare and initialize the 'initialEvents' variable
    const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[] | null>(initialEvents);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    // const handleGetEvents = async () => {
    //     try {
    //       selectedDate.setHours(0, 0, 0, 0);
    //       const eventsData = await displayCalendarEvents(selectedDate.toISOString());
    //       setCalendarEvents(eventsData);
    //     } catch (error) {
    //       console.error('Error fetching calendar events:', error);
    //     }
    //   };

    const formatDate = (dateTimeString: string): string => {
        const date = new Date(dateTimeString);
        date.setHours(date.getHours() + 7);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours() % 12 || 12; // Handle 0 (midnight) and 12 (noon)
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
    };


    return (
        <>
            <div className="homepage-container">
                <img src="./logo.png" className="logo" alt="logo" />

                {/* Date Picker */}
                <DatePicker className="date-picker"
                    selected={selectedDate}
                    onChange={(date: Date | null, event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement> | undefined) => setSelectedDate(date || new Date())}
                    dateFormat="dd/MM/yyyy" // Format the date picker to match your desired output
                />

                <div>
                    <button onClick={handleGetEvent} className="get-event">Get Calendar Event</button>
                </div>

                {/* {calendarEvents && (
                    <div>
                        <h2>Calendar Events:</h2>
                        <table style={{ textAlign: 'left' }}>
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
                                        <td>{event.subject}</td>
                                        <td>{formatDate(event.start.dateTime)}</td>
                                        <td>{formatDate(event.end.dateTime)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )} */}
            </div>
        </>
    );
};

export default HomePage;
