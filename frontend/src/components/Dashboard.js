// Dashboard.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import 'react-calendar/dist/Calendar.css';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, [date]);

    const fetchBookings = async () => {
        setBookings([
            { id: 1, time: '10:00 AM', details: 'Meeting with John' },
            { id: 2, time: '2:00 PM', details: 'Dentist Appointment' },
        ]);
    };

    const handleAddBooking = async () => {
        const newBooking = { id: Date.now(), time: '11:00 AM', details: 'New Booking' };
        setBookings([...bookings, newBooking]);
        alert('Booking added!');
    };

    const handleEditBooking = (id) => {
        const booking = bookings.find(b => b.id === id);
        setSelectedBooking(booking);
    };

    const handleUpdateBooking = async (updatedBooking) => {
        setBookings(bookings.map(b => (b.id === updatedBooking.id ? updatedBooking : b)));
        setSelectedBooking(null);
        alert('Booking updated!');
    };

    const handleDeleteBooking = async (id) => {
        setBookings(bookings.filter(b => b.id !== id));
        alert('Booking deleted!');
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign the user out
            alert("You have been logged out.");
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return (
        <div className="dashboard">
            <h2>Welcome to your Dashboard!</h2>
            <p>Here you can manage your bookings, view available slots, and more.</p>

            <button onClick={handleLogout} style={{ marginBottom: "20px" }}>Log Out</button>

            <div className="calendar-container">
                <Calendar onChange={setDate} value={date} />
                <h3>Selected Date: {date.toDateString()}</h3>
            </div>

            <div className="bookings">
                <h3>Bookings for {date.toDateString()}</h3>
                {bookings.length ? (
                    bookings.map(booking => (
                        <div key={booking.id} className="booking-item">
                            <p>Time: {booking.time}</p>
                            <p>Details: {booking.details}</p>
                            <button onClick={() => handleEditBooking(booking.id)}>Edit</button>
                            <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No bookings for this date.</p>
                )}
                <button onClick={handleAddBooking}>Add Booking</button>
            </div>

            {selectedBooking && (
                <div className="edit-booking">
                    <h3>Edit Booking</h3>
                    <input
                        type="text"
                        value={selectedBooking.details}
                        onChange={(e) =>
                            setSelectedBooking({ ...selectedBooking, details: e.target.value })
                        }
                    />
                    <button onClick={() => handleUpdateBooking(selectedBooking)}>Update</button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
