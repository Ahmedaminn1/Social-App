import { Card, CardFooter, Divider, Input, useDisclosure} from "@heroui/react";
import { RiLiveFill } from "react-icons/ri";
import { HiMiniPhoto } from "react-icons/hi2";
import { FaYoutube } from "react-icons/fa";
import { FaSmile } from "react-icons/fa";
import CreatePostModal from "./CreatePostModal";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";

export default function CreatePost({getAllPosts}) {
const {isOpen, onOpen, onOpenChange} = useDisclosure();
const{userData , isLoading} = useContext(authContext)
return (
  <>
    <Card className="">
      <div className="flex items-center gap-2 p-3 ">
        <div className="size-12 rounded-full overflow-hidden">
        <img src= {userData.photo} alt="" />  
        </div>
        <Input type="email" isReadOnly placeholder={`Whats on your mind, ${userData.name} ?`} onClick={onOpen} />
      </div>
      <Divider />
      <CardFooter className="flex justify-around">
        <div className="flex items-center gap-2 p-3 cursor-pointer">
          <RiLiveFill className="text-yellow-400 text-2xl" />
          <p className="font-semibold">Go Live</p>
        </div>
        <div className="flex items-center gap-2 p-3 cursor-pointer">
          <HiMiniPhoto className="text-green-500 text-2xl"/>
          <p className="font-semibold">Photo</p>
        </div>
        <div className="flex items-center gap-2 p-3 cursor-pointer">
          <FaYoutube className="text-pink-600 text-2xl" />
          <p className="font-semibold">Vedio</p>
        </div>
        <div className="flex items-center gap-2 p-3 cursor-pointer">
          <FaSmile className="text-blue-500 text-2xl" />
          <p className="font-semibold">Feeling</p>
        </div>
      </CardFooter>
    </Card>
    <CreatePostModal callback={getAllPosts} isOpen={isOpen} onOpenChange={onOpenChange} />
  </>
  );
}

