import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CreateCommand from './CreateCommand';
import CommentView from './CommentView';

interface Comments{
    id:string,
    content:string
}

interface Post {
    id: string;
    title: string;
    comments:Comments[]
}




const PostList:React.FC = () => {

    const [ posts , setPosts] = useState<{ [key: string]: Post }>({});

    const fetchPosts = async() => {
        const res = await axios.get('http://127.0.0.1:4002/posts');
        setPosts(res.data);
    }


    useEffect(() => {
        fetchPosts();
    },[])
   
    return (
        <div className='bg-green-200 p-4 m-3'>
            <h2 className="text-xl font-bold font-mono py-2">Post List</h2>
            <div className='flex items-center flex-wrap justify-start gap-9 p-3'>
                {Object.values(posts).map((post:Post) => (
                    <div className='bg-violet-300 w-80 my-2' key={post.id}>
                        <h3 className='px-2 font-bold font-serif mt-1'>{post.title}</h3>
                        <CreateCommand postId={post.id}/>
                        <CommentView postId={post.id}  comments={post.comments}/>
                    </div>
                ))}
                
            </div>
        </div>
    )

 
}

export default PostList
