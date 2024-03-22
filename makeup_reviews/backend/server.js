import express from 'express';
import cors from 'cors';
import makeupRouter from './api/makeup.route.js'; 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/np69/makeup', makeupRouter); 


app.use('*', (req, res) => {
  res.status(404).json({error: "not found"});
});

export default app;
