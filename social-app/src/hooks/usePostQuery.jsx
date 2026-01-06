import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllPosts } from '../services/postServices'

export default function usePostQuery() {
    
    const queryOptions = useQuery({
    queryKey:["getPosts"],
    queryFn:  getAllPosts,
  })

  return queryOptions
}
