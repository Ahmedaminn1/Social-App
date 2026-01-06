import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Link,
  Divider,
  Textarea,
} from "@heroui/react";
import { useRef, useState } from "react";

import { IoMdPhotos } from "react-icons/io";
import { createPost, updatePost } from "../../services/postServices";
import { useQueryClient } from "@tanstack/react-query";

export default function CreatePostModal({post,isOpen , onOpenChange }) {

  const [isLoading, setisLoading] = useState(false)
  const [formDataFile, setformDataFile] = useState("")
  const [selectedPhoto, setselectedPhoto] = useState(post?.image || "")
  const fileInput = useRef()
  const postMsg = useRef()
  const queryClient = useQueryClient()

  function getfile() {
    const file = fileInput.current.files[0]
    setselectedPhoto(URL.createObjectURL(file))
    setformDataFile(file)
  }

  async function editPost() {
    const formData = new FormData()
    formData.append("body", postMsg.current.value || " ")
    if(formDataFile){
      formData.append("image", formDataFile)
    }
    setisLoading(true)
    try {
      if(post){
        const {data} = await updatePost(post._id , formData)
        console.log(data);
      }else{
        const {data} = await createPost(formData)
        console.log(data);
      }
      onOpenChange(false)
      queryClient.invalidateQueries({queryKey:["getPosts"]})
    } catch (error) {
      console.log(error);
    }finally{
      setisLoading(false)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={()=>{
        onOpenChange(false)
        if(!post){
          setselectedPhoto("")
        }
      }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">{post? "Update Post" : "Create Post"}</ModalHeader>
              <Divider/>
              <ModalBody className="p-4">
                <Textarea defaultValue={post?.body || ""} ref={postMsg} minRows={`${selectedPhoto ? "" : 50}`} placeholder="What's on your mind, Ahmed?" />
                {selectedPhoto && <img src={selectedPhoto} alt="" />}
              </ModalBody>
              <Divider/>
              <div className="p-4 flex items-center gap-2 ">
                <span className="font-semibold">Add to your Post:</span>
                <IoMdPhotos onClick={()=>fileInput.current.click()} className="text-2xl text-green-500 cursor-pointer" />
                <input onChange={getfile} ref={fileInput} type="file" className="hidden" />
              </div>
              <Divider/>

              <Button isLoading={isLoading} className="m-4" color="primary" onPress={editPost}>{post? "Update" : "Post"}</Button>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
