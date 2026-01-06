import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../services/postServices";
import CardHeader from "../../components/PostCard/CardHeader";
import CardBody from "../../components/PostCard/CardBody";
import CardFooter from "../../components/PostCard/CardFooter";
import PostSkeleton from "../../components/Skeletons/PostSkeleton";

export default function PostDetails() {

  const { id } = useParams();
  const [post, setpost] = useState("")
  const [isLoading, setisLoading] = useState(true)
  const [postComments, setpostComments] = useState([])


  async function getPostDetails(postId) {
    try {
    const { data } = await getSinglePost(postId);
    console.log(data);
    setpost(data.post)
    setpostComments(data.post.comments)
    } catch (error) {
      console.log(error);
    }finally{
      setisLoading(false)
    }
  }

  useEffect(() => {
    getPostDetails(id);
  }, []);

  return ( 
    <>

    <div className="max-w-3xl mx-auto m-5 bg-white rounded-lg shadow-sm border border-gray-200">
    {isLoading ? <PostSkeleton/> : <>
      <CardHeader photo = {post.user.photo} name = {post.user.name} createdAt = {post.createdAt}/>

      <CardBody setpostComments={setpostComments} isPostDetails = {true} id={id} body = {post.body}  image = {post.image} commentsLength = {postComments.length}/>

   {postComments.length > 0 && (
  <>
    {postComments.map((comment) => (
      comment?.commentCreator ? (
        <CardFooter 
          key={comment._id} 
          postUserId={post.user._id}
          postId={post._id}
          comment={comment}
          setpostComments={setpostComments}
        />
      ) : null
    ))}
  </>
)}
    </>}
    </div>
    </>
  );
}
