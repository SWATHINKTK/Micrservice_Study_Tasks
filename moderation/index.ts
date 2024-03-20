import express from "express";
import axios from 'axios';

const app = express();

app.use(express.json({}));
app.use(express.urlencoded({extended:true}))

enum Status{
    PENDING = 'Pending',
    APPROVED = 'Approved',
    REJECTED = 'Rejected'
}



app.post('/events',async(req,res) => {
    console.log('hello welcome');
    
    const {type,data} = req.body;
    if(type == 'CommandCreated'){
        const status = data.content.includes('orange') ? Status.REJECTED : Status.APPROVED;

        await axios.post('http://localhost:5000/events',{
            type:'CommandModerated',
            data:{
                id:data.id,
                postId:data.postID,
                status:status,
                content:data.content
            }
        })
    }

    res.send({})
})


app.listen(4003,() =>{
    console.log(`server is running @ http://localhost:4003`);
})