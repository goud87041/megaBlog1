import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
// import Post from "../pages/Post"

function PostCard({$id, title, featuredImage}) {

  console.log("image : " ,featuredImage);
  
    
  return (

    <div className="mx-2">
      <Link to={`/Post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4 '>
            <div className='w-full justify-center mb-4'>
                <img  src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className=' rounded-xl  object-fill' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
    </div>
  )
}


export default PostCard