import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { authContext } from "../../context/AuthContext";
import CreatePostModal from "../CreatePost/CreatePostModal";

export default function CardHeader({ post ,photo, name, createdAt,postUserId ,getAllPosts }) {
  const{userData , isLoading} = useContext(authContext)
  const {isOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img src={photo} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
        {userData._id == postUserId && 
        <Dropdown placement="bottom-end">
          
          <DropdownTrigger className="cursor-pointer">
            <BsThreeDotsVertical className="w-5 h-5" />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem onPress={onOpenChange} key="settings">Edit</DropdownItem>
            <DropdownItem color="danger" className="text-danger-500" key="delete">Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>}
      </div>
      
      <CreatePostModal post={post} isOpen={isOpen} onOpenChange={onOpenChange} />

    </>
  );
}
