import { useState } from "react";
import axios from "axios";

const Post = () => {

  const [title,setTitle] = useState('');

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post('http://127.0.0.1:4000/posts',{title});
    console.log(response.data)
  }

  return (
    <div className='bg-green-200 p-3 m-3'>
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold font-mono py-2">Create Post</h2>
            <input type="text" className="p-1 mr-5" onChange={(e) => setTitle(e.target.value)} placeholder="write something" />
            <button className="bg-red-400 p-1 px-2">submit</button>
        </form>
    </div>
  )
}

export default Post
