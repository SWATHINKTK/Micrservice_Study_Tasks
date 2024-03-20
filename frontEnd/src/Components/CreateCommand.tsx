import axios from "axios";
import React, { useState } from "react";

interface CreateCommandProps {
  postId: string;
}

const CreateCommand: React.FC<CreateCommandProps> = ({ postId }) => {
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const response = await axios.post(
            `http://127.0.0.1:4001/posts/${postId}/comments`,
            { content }
            );
            console.log(response.data);
            setContent("");
    };

    return (
        <div className="p-2">
        <h6 className="font-bold">Comments</h6>
        <div className="flex justify-center pt-1 pb-3">
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="p-1 mr-5"
                placeholder="write something ?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button className="bg-red-400 p-1 px-2">Comment</button>
            </form>
        </div>
        </div>
    );
};

export default CreateCommand;
