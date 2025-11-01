const express = require('express');
const app = express();
app.use(express.json());

const seats = {
    "1": {"status": "available"},
    "2": {"status": "available"},
    "3": {"status": "available"},
    "4": {"status": "available"},
    "5": {"status": "available"}
};

// GET all seats
app.get('/seats', (req, res) => {
    res.json(seats);
});

// POST lock a seat
app.post('/lock/:seatId', (req, res) => {
    const seatId = req.params.seatId;
    const seat = seats[seatId];

    if (!seat) return res.status(404).json({ message: 'Seat does not exist' });
    if (seat.status === 'locked') return res.status(400).json({ message: 'Seat already locked' });
    if (seat.status === 'booked') return res.status(400).json({ message: 'Seat already booked' });

    seat.status = 'locked';
    // Automatically unlock after 1 minute
    setTimeout(() => {
        if (seat.status === 'locked') seat.status = 'available';
    }, 60000);

    res.json({ message: `Seat ${seatId} locked successfully. Confirm within 1 minute.` });
});

// POST confirm a seat
app.post('/confirm/:seatId', (req, res) => {
    const seatId = req.params.seatId;
    const seat = seats[seatId];

    if (!seat) return res.status(404).json({ message: 'Seat does not exist' });
    if (seat.status !== 'locked') return res.status(400).json({ message: 'Seat is not locked and cannot be booked' });

    seat.status = 'booked';
    res.json({ message: `Seat ${seatId} booked successfully!` });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
