import express from 'express';
import cors from 'cors';
import makeupRouter from './api/makeup.route.js'; // Assuming you have a makeup route file

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/np69/makeup', makeupRouter); // Use the makeup route instead of movies

app.use('*', (req, res) => {
  res.status(404).json({error: "not found"});
});

export default app;
