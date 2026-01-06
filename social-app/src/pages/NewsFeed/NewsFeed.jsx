import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getAllPosts } from "../../services/postServices";
import PostSkeleton from "../../components/Skeletons/PostSkeleton";
import CreatePost from "../../components/CreatePost/CreatePost";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Pagination, Skeleton } from "@heroui/react";
import { data } from "react-router-dom";
import usePostQuery from "../../hooks/usePostQuery";


export default function NewsFeed() {

  const [page, setpage] = useState(1)
  const [totalPages, settotalPages] = useState(1)
  const [initialLoad, setinitialLoad] = useState(true)
  const {data , isLoading} = useQuery({
    queryKey:["getPosts" , page],
    queryFn: () => getAllPosts(page),
    staleTime:2000,
  })

  useEffect(() => {
    if(data?.data.paginationInfo.numberOfPages){
      settotalPages(data.data.paginationInfo.numberOfPages)
      setinitialLoad(false)
    }
  }, [data])
  

  useEffect(() => {
    window.scrollTo({top:0 , behavior:"smooth"})
  }, [page])
  

  return (
    <>
    <title>Home | Social App</title>
      <main className="min-h-screen bg-gray-200">
        <div className="container p-5">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1">
              <Sidebar />
            </div>
            <div className="col-span-2 space-y-5">
              <CreatePost />
              {isLoading ? [...Array(5)].map((skeleton , index) => <PostSkeleton key={index}/>) : <>
                {data?.data.posts && data?.data.posts.map((post) => <Post key={post.id} post={post} />)}
              </>}
              {initialLoad ? <Skeleton className="h-3 w-4/5 rounded-lg" /> : 
              <>
              <Pagination 
              key={data?.data.paginationInfo.numberOfPages} 
              onChange={setpage}
              page={page} 
              total={data?.data.paginationInfo.numberOfPages || totalPages} 
              showControls
              />
              
              </>}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
