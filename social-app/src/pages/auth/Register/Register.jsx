import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { regSchema } from "../../../lib/validationSchemas/authSchema";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import { registerUser } from "../../../services/authServices";
import {Alert} from "@heroui/alert";
import {toast} from "react-toastify"

export default function Register() {

  const [successMsg, setsuccessMsg] = useState("")
  const [errorMessage, seterrorMessage] = useState("")
  const [showPassword, setshowPassword] = useState(false)
  const navigate = useNavigate()

  const {register ,handleSubmit,formState: { errors , isSubmitting }} = useForm({
    resolver:zodResolver(regSchema),
    mode:"all",
    defaultValues:{
      name: "",
      email: "",
      password: "",
      rePassword:"",
      dateOfBirth:"",
      gender:""
    }
  })

  async function onSubmit(formData){
    seterrorMessage("")
    setsuccessMsg("")
    try {
      const {data} = await registerUser(formData)
      setsuccessMsg(data?.message)
      toast.success(data?.message)
      navigate("/login")
    } catch (error){
      console.log(error);
      seterrorMessage(error.response.data?.error)
      toast.error(error.response.data?.error)
    }
  }

  return (
    <>
      <form className="w-full max-w-4xl space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-header">
          <h1 className="text-4xl font-bold mb-5 capitalize">join nexify today 🚀</h1>
          <p className="capitalize">create your free account and start connecting</p>
        </div>
        <div className="inputs-form space-y-5">
          <Input  {...register("name")} label="Name" isRequired variant="faded" type="text"  
            isInvalid={Boolean(errors.name)} errorMessage={errors.name?.message}/>

          <Input {...register("email")} label="Email" isRequired variant="faded" type="email" 
            isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message}/>

          <Input {...register("password")} label="Password" isRequired variant="faded" type={showPassword ? "text" : "password"} 
            isInvalid={Boolean(errors.password)} errorMessage ={errors.password?.message} 
            endContent={showPassword ? <IoIosEyeOff className="text-3xl" onClick={()=> {setshowPassword(!showPassword)}} />
            : <IoIosEye onClick={()=>{setshowPassword(!showPassword)}} className="text-3xl"/>}/>

          <Input {...register("rePassword")} label="Re-Password" isRequired variant="faded" type="password"
            isInvalid={Boolean(errors.rePassword)} errorMessage ={errors.rePassword?.message}/>

          <div className="flex gap-2 items-center">
            <Input {...register("dateOfBirth")} isRequired label="Birth date" type="date"
            isInvalid={Boolean(errors.dateOfBirth)} errorMessage={errors.dateOfBirth?.message}/>
            <Select {...register("gender")} isRequired label="Select Your Gender"
              isInvalid={Boolean(errors.gender)} errorMessage={errors.gender?.message}>
              <SelectItem key="male">Male</SelectItem>
              <SelectItem key="female" >Female</SelectItem>
            </Select>
          </div>

          <div className="flex justify-between items-end">
            <Button type="submit" isLoading={isSubmitting} color="primary">Submit</Button>
            <span className="text-gray-500 ">Already have an account?<Link to="/login" className="font-bold ms-1 text-primary-500 underline underline-offset-3">Login Now</Link> </span>
          </div>
          {errorMessage && <Alert color="danger"  title={errorMessage} className="w-1/2" />}
          {successMsg && <Alert color="success"  title={successMsg} className="w-1/2" />}
        </div>
      </form>
    </>
  );
}
