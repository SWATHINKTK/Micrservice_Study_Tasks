import axios from 'axios';
import express from 'express';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

interface Event {
    type: string;
    data: { [key: string]: any };
}


const events:Event[] = [];

app.post('/events',async(req,res) => {
    const event = req.body;

    // Event Queueing
    events.push(event)

   try {
     // Event bus incoming Events and alerting the all Servers
     await axios.post('http://localhost:4000/events',event);
     await axios.post('http://localhost:4001/events',event);
     await axios.post('http://localhost:4002/events',event);
     await axios.post('http://localhost:4003/events',event);
   } catch (error) {
        console.log(error)
   }
    res.send({status:'OK'})
})

app.get('/events' ,(req,res) => {
    res.send(events);
})

app.listen(5000,() => {
    console.log(`server is running at http://localhost:5000`)
})