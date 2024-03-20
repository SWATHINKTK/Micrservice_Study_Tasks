
import './App.css'
import Post from './Components/Post.tsx';
import PostList from './Components/PostList.tsx';



function App() {


  return (
    <div className='bg-green-300 p-3 m-3'>
      <h1 className='text-center text-3xl font-bold '>Blog Post</h1>
      <Post/>
      <hr className='my-4'></hr>
      <PostList/>
    </div>
  )
}

export default App
