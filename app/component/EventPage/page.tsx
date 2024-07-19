"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./eventpage.scss";

interface Event {
    id: string;
    startTime: string;
    endTime: string;
    note: string;
    isEditing: boolean;
}

const EventPage: React.FC = () => {
    const Router = useRouter();
    const [events, setEvents] = useState<Event[]>([
        { id: "0101010", startTime: "00/00/2024", endTime: "00/00/2024", note: "note", isEditing: false },
        { id: "0101010", startTime: "00/00/2024", endTime: "00/00/2024", note: "note", isEditing: false },
        { id: "0101010", startTime: "00/00/2024", endTime: "00/00/2024", note: "note", isEditing: false },
        // You can add more initial events here
    ]);

    const handleEdit = (index: number) => {
        const updatedEvents = events.map((event, i) =>
            i === index ? { ...event, isEditing: true } : event
        );
        setEvents(updatedEvents);
    };

    const handleSave = (index: number) => {
        const updatedEvents = events.map((event, i) =>
            i === index ? { ...event, isEditing: false } : event
        );
        setEvents(updatedEvents);
    };

    const handleChange = (index: number, field: keyof Event, value: string) => {
        const updatedEvents = events.map((event, i) =>
            i === index ? { ...event, [field]: value } : event
        );
        setEvents(updatedEvents);
    };

    return (
        <div className="eventpage-container flex justify-center items-center min-h-screen bg-gray-100">
            <div className="event-box bg-white p-8 rounded-lg shadow-md w-11/12 max-w-4xl">
                <h1 className="event-text">Events</h1>
                <table className="event-table w-full border-collapse mb-4">
                    <thead>
                        <tr>
                            <th className="p-4 text-left border-b-2 border-gray-200">Project ID</th>
                            <th className="p-4 text-left border-b-2 border-gray-200">Date time start</th>
                            <th className="p-4 text-left border-b-2 border-gray-200">Date time end</th>
                            <th className="p-4 text-left border-b-2 border-gray-200">Project Note</th>
                            <th className="p-4 text-left border-b-2 border-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr key={index}>
                                <td className="p-4 border-b border-gray-200">
                                    {event.isEditing ? (
                                        <input
                                            value={event.id}
                                            onChange={(e) => handleChange(index, "id", e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        event.id
                                    )}
                                </td>
                                <td className="p-4 border-b border-gray-200">
                                    {event.isEditing ? (
                                        <input
                                            value={event.startTime}
                                            onChange={(e) => handleChange(index, "startTime", e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        event.startTime
                                    )}
                                </td>
                                <td className="p-4 border-b border-gray-200">
                                    {event.isEditing ? (
                                        <input
                                            value={event.endTime}
                                            onChange={(e) => handleChange(index, "endTime", e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        event.endTime
                                    )}
                                </td>
                                <td className="p-4 border-b border-gray-200 whitespace-pre-wrap break-words">
                                    {event.isEditing ? (
                                        <input
                                            value={event.note}
                                            onChange={(e) => handleChange(index, "note", e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        event.note
                                    )}
                                </td>
                                <td className="p-4 border-b border-gray-200">
                                    {event.isEditing ? (
                                        <button
                                            onClick={() => handleSave(index)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="update-bar">
                    <div className="pagination text-left text-sm text-gray-600 flex-1">
                        Showing 1 to {events.length} of {events.length} results
                    </div>

                    <div>
                        <button className="btn">Update to ClickUp</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPage;
