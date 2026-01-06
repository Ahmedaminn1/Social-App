import React, { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiCamera, BiMessageRounded, BiShareAlt } from 'react-icons/bi'
import { BsEmojiSmile } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { LuSend } from "react-icons/lu";
import {Button, ButtonGroup} from "@heroui/button";
import { createComment } from '../../services/commentsServices'
import {toast} from "react-toastify"
import { useMutation } from '@tanstack/react-query'

export default function CardBody({id ,body , image , commentsLength , isPostDetails , setpostComments}) {
  const [commentMsg, setcommentMsg] = useState("")
  const [isLoading, setisLoading] = useState(false)



  const {mutate,isPending} = useMutation({
    mutationFn: createComment,
    onSuccess:(data) => {
      console.log(data);
      setpostComments(data?.data.comments)
      setcommentMsg("")
      toast.success("Comment Added Successfully")
    },
    onError:(error)=>{
      console.log(error);
    }
  })

  // async function addComment(comment) {
  //   setisLoading(true)
  //   try {
  //     const {data} = await createComment(comment)
  //     console.log(data);
  //     setpostComments(data.comments)
  //     setcommentMsg("")
  //     toast.success("Comment Added Successfully")
  //   } catch (error) {
  //     console.log(error);
  //   }finally{
  //     setisLoading(false)
  //   }
  // }

  function sendComment(e) {
    setcommentMsg(e.target.value)
    console.log(commentMsg);
  }
  return (
    <>
    <div className="px-4 pb-3">
        <p className="text-gray-800">
          {body}
        </p>
    </div>

    <div className="w-full">
        <img
          src={image || "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"}
          alt="Post content"
          className= {`w-full object-cover ${isPostDetails ? "" : "h-80"}`} 
        />
    </div>
      <div className="flex items-center gap-6 px-4 py-3 border-b border-gray-100">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
          <AiOutlineHeart className="w-6 h-6" />
          <span className="font-medium">1200</span>
        </button>
        <Link to={`/post-details/${id}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
          <BiMessageRounded className="w-6 h-6" />
          <span className="font-medium">{commentsLength}</span>
        </Link>
        <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
          <BiShareAlt className="w-6 h-6" />
          <span className="font-medium">17</span>
        </button>
      </div>
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <input
          onChange={(e)=>{sendComment(e)}}
          value={commentMsg}
          type="text"
          placeholder="Write your comment"
          className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button isLoading={isPending} onPress={()=>{mutate({
          content:commentMsg,
          post:id
        })}} disabled={commentMsg ? false : true} size='sm' radius='full' variant='shadow' color='primary' className="disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer">
          <LuSend className="w-5 h-5" />
        </Button>
        <button className="text-gray-400 hover:text-gray-600">
          <BiCamera className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <BsEmojiSmile className="w-5 h-5" />
        </button>
      </div>
    </>
  )
}
