import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@heroui/react'
import { useContext, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { authContext } from '../../context/AuthContext'
import { deleteComment, getPostComments } from '../../services/commentsServices'


export default function CardFooter({comment , postUserId , postId , setpostComments }) {
  const{userData} = useContext(authContext)
  const [isLoading, setisLoading] = useState(false)


  async function deleteUserComment(commentId) {
    setisLoading(true)
    try {
      const {data} = await deleteComment(commentId)
      console.log(data);
      getNewComments(postId)
    } catch (error) {
      console.log(error);
    }finally{
      setisLoading(false)
    }
  }

  async function getNewComments(postId) {
    try {
      const {data} = await getPostComments(postId)
      console.log(data);
      setpostComments(data.comments)
    } catch (error) {
      console.log(error);
    }
  }

return (
    <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={comment.commentCreator.photo.includes("/undefined") ? "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80" : comment.commentCreator.photo}
            alt={comment.commentCreator.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="grow bg-gray-50 rounded-2xl px-4 py-3">
            <h4 className="font-semibold text-sm text-gray-900">
              {comment.commentCreator.name}
            </h4>
            <p className="text-sm text-gray-700 mt-1">
              {comment.content}
            </p>
          </div>
          {isLoading ? <Spinner/> :
          <>
          {userData._id == postUserId && userData._id == comment.commentCreator._id && <Dropdown placement="bottom-end">
          
          <DropdownTrigger className="cursor-pointer">
            <BsThreeDotsVertical className="w-5 h-5" />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings">Edit</DropdownItem>
            <DropdownItem color="danger" onClick={()=>{
              deleteUserComment(comment._id)
            }} className="text-danger-500" key="delete">Delete</DropdownItem>
        </DropdownMenu>
        </Dropdown>}
          </>}
        </div>
      </div>
  )
}
