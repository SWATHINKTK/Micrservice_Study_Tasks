import express from 'express';
import cors from 'cors';
import axios from 'axios'


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

interface Comments{
    id:string,
    content:string,
    status:string
}


interface Post{
    id:string,
    title:string,
    comments:Comments[]
}

interface Posts{
    [PostId:string]:Post
}


enum Status{
    PENDING = 'Pending',
    APPROVED = 'Approved',
    REJECTED = 'Rejected'
}


const posts:Posts = {}


const handleEvents = (type:string, data:{[key:string]:any}) => {
    if(type === 'PostCreated'){
        const { id, title } = data;
        posts[id] = {id, title, comments:[]}
    }

    if(type === 'CommandCreated'){
        const { id, content, postID, status } = data;

        const post = posts[postID];
        post.comments.push({
            id,
            content,
            status:Status.PENDING
        });
    }

    if(type == 'StatusUpdated'){
        const {id, postId, content, status} = data;

        let post =  posts[postId] ;
        let comment = post.comments.find(c => c.id == id);

        if(comment) 
            comment.status = status;

        console.log(posts[postId].comments)
    }

}


app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post('/events',(req,res)=>{
    const { type , data } = req.body;

    // events coming from event bus is handled using septate function
    handleEvents(type,data);

    res.send({});
})

app.listen(4002,async()=>{
    console.log(`Server is running @  http://localhost:4002`);

    const res = await axios.get('http://localhost:5000/events').catch(er=> console.log(er))

    for(let event of res?.data){
        console.log('Response',event)
        handleEvents(event.type, event.data);
    }

    console.log("ALL",posts)

})
