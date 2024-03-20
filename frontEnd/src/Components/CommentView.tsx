import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Comments{
  id:string,
  content:string
}


interface CommentViewProbs{
    postId:string,
    comments:Comments[]
}

interface Comments{
    id:string,
    content:string,
    status:string
}

const CommentView:React.FC<CommentViewProbs> = ({ postId , comments}) => {

    const renderComments = comments.map(comment => {
        let content;   
            
        switch (comment.status) {
            case 'Approved':
                content = comment.content;
                break;
            case 'Pending':
                content = 'Comment waiting for moderation';
                break;
            case 'Rejected':
                content = 'Comment was rejected';
                console.log('Rejected:', comment.content);
                break;
            default:
                content = 'Unknown status';
        }
        return(<li key={comment.id} className='list-disc font-serif'>{content}</li>)
    })
    
    return (
        <div className='flex justify-center'>
          <ul>
            {
              renderComments
            }
          </ul>
        </div>
      );
      
}

export default CommentView
