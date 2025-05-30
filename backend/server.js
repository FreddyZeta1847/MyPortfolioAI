const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

app.use(cors());
app.use(express.json());

// Ensure messages.json exists
if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]));
}

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newMessage = {
        id: Date.now().toString(),
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
    };

    fs.readFile(MESSAGES_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading messages file:', err);
            return res.status(500).json({ error: 'Failed to save message' });
        }

        const messages = JSON.parse(data);
        messages.push(newMessage);

        fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                console.error('Error writing messages file:', err);
                return res.status(500).json({ error: 'Failed to save message' });
            }
            res.status(201).json({ success: true, message: 'Message sent successfully!', data: newMessage });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});