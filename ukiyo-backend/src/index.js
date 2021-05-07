import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Environment variables
dotenv.config();

// Server instance
const app = express();

// Headers
app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.send('Ukiyo API');
})

const PORT = process.env.PORT || 5000;

// MongoDB connection
try {
    await mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
} catch (error) {
    console.error(error.message);
}