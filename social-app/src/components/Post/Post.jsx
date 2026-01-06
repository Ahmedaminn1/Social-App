import CardHeader from "../PostCard/CardHeader";
import CardBody from "../PostCard/CardBody";
import CardFooter from "../PostCard/CardFooter";
import { useState } from "react";

export default function Post({post}) {

  const [postComments, setpostComments] = useState(post.comments)

  return (
    <div className="mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <CardHeader post ={post} postUserId = {post.user._id} photo = {post.user.photo} name = {post.user.name} createdAt = {post.createdAt}/>

      <CardBody setpostComments = {setpostComments} id = {post._id}  body = {post.body}  image = {post.image} commentsLength = {postComments.length}/>

      {postComments.length > 0 &&  <>
      <CardFooter
      postUserId = {post.user._id} 
      postId = {post._id}
      comment={postComments[0]}
      setpostComments={setpostComments}
      />
      </> }

    </div>
  );
}
