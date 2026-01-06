import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import NewsFeed from "./pages/NewsFeed/NewsFeed";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import UserProfile from "./pages/UserProfile/UserProfile";
import AppProtectedRoutes from "./components/ProtectedRoutes/AppProtectedRoutes";
import AuthProtectedRoutes from "./components/ProtectedRoutes/AuthProtectedRoutes";
import PostDetails from "./pages/PostDetails/PostDetails";




export default function App() {
  const router = createBrowserRouter([
    {
      path: "" , element :<AppProtectedRoutes><MainLayout/></AppProtectedRoutes> , children:[
      {index:true , element : <Navigate to={"/home"}/>},
      {path:"/home" , element : <AppProtectedRoutes><NewsFeed/></AppProtectedRoutes>},
      {path:"/profile" , element:<AppProtectedRoutes><UserProfile/></AppProtectedRoutes>},
      {path:"post-details/:id" , element:<AppProtectedRoutes><PostDetails/></AppProtectedRoutes>},
      {path : "*" , element:<NotFound/>}
    ]},

    {
      path:"", element : <AuthProtectedRoutes><AuthLayout/></AuthProtectedRoutes>, children:[
      {path:"register", element:<AuthProtectedRoutes><Register/></AuthProtectedRoutes> },
      {path:"login" , element:<AuthProtectedRoutes><Login/></AuthProtectedRoutes>}
    ]},
  ])
  
  return (
  <>
  <RouterProvider router={router}/>
  
  </>
  )
}
