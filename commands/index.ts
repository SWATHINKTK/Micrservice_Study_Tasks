import express,{Request,Response} from 'express';
import cors from 'cors';
import crypto,{randomBytes} from 'crypto';
import axios from 'axios';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

type user = {
    [key:string]:Array<{ 
        id: string; 
        content: string; 
        status:string;
    }>;
}

enum Status{
    PENDING = 'Pending',
    APPROVED = 'Approved',
    REJECTED = 'Rejected'
}

const commentsByPostId:user = {};

app.get('/posts/:id/comments',(req:Request,res:Response) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments',async(req:Request,res:Response) => {
    const { content } = req.body;
    const id = randomBytes(5).toString('hex');

    let comments = commentsByPostId[req.params.id] || [];
    comments.push({
        id:id,
        content:content,
        status:Status.PENDING
    });
    
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:5000/events',{
        type:'CommandCreated',
        data:{
            id,
            content,
            postID:req.params.id,
            status:Status.PENDING
        }
    }).catch((err):void => {
        console.log(err)
    })

    res.status(201).send(comments);

})

app.post('/events',async(req,res) => {
    const { type , data } = req.body;
    console.log(type,"hello")

    if(type == 'CommandModerated'){
        const { id, content, postId, status } = data;
        let commands =  commentsByPostId[data.postId] ;
        let command = commands.find(c => c.id == data.id)
        if(command) 
            command.status = data.status;

        await axios.post('http://localhost:5000/events',{
            type:'StatusUpdated',
            data:{
                id,
                content,
                postId:postId,
                status:command?.status
            }
        }).catch((err):void => {
            console.log(err)
        })

        
        console.log("alll",commentsByPostId)
    }

    res.send({});
})


app.listen(4001,() => {
    console.log(`server is running at http://localhost:4001`);
})