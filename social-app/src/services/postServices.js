import axios from "axios";

export function getAllPosts(page) {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/posts`, {
    headers: {
      "token": localStorage.getItem("userToken"),
    },
    params:{
      limit : 5,
      sort : "-createdAt",
      page
      }
  });
}

export async function getSinglePost(id) {
  const data  = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`,
    {
      headers: {
        "token": localStorage.getItem("userToken"),
      },
    });
    return data
}

export async function createPost(formData) {
  const data  = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts/`,formData,
    {
      headers: {
        "token": localStorage.getItem("userToken"),
      },
    });
    return data
}

export async function updatePost(postId , formData) {
  const data  = await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, formData,
    {
      headers: {
        "token": localStorage.getItem("userToken"),
      },
    });
    return data
}
