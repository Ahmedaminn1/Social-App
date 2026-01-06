import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../lib/validationSchemas/authSchema";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import { loginUser } from "../../../services/authServices";
import { Alert } from "@heroui/alert";
import { toast } from "react-toastify";
import { useContext } from "react";
import { authContext } from "../../../context/AuthContext";

export default function Login() {
  const [successMsg, setsuccessMsg] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const {settoken} = useContext(authContext)

  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData) {
    seterrorMessage("");
    setsuccessMsg("");
    console.log(formData);
    try {
      const {data} = await loginUser(formData);
      console.log(data);
      setsuccessMsg(data?.message);
      toast.success(data?.message);
      localStorage.setItem("userToken",data?.token)
      settoken(data?.token)
    } catch (error) {
      console.log(error);
      seterrorMessage(error.data.error);
      toast.error(error.data.error);
    }
  }

  return (
    <>
      <form
        className="w-full max-w-4xl space-y-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-header">
          <h1 className="text-4xl font-bold mb-5 capitalize">
            {" "}
            welcome back ! ,sign in now 🚀
          </h1>
          <p className="capitalize">welcome back sign in into your account</p>
        </div>
        <div className="inputs-form space-y-5">
          <Input
            {...register("email")}
            label="Email"
            isRequired
            variant="faded"
            type="email"
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
          />
          <Input
            {...register("password")}
            label="Password"
            isRequired
            variant="faded"
            type={showPassword ? "text" : "password"}
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
            endContent={
              showPassword ? (
                <IoIosEyeOff
                  className="text-3xl"
                  onClick={() => {
                    setshowPassword(!showPassword);
                  }}
                />
              ) : (
                <IoIosEye
                  onClick={() => {
                    setshowPassword(!showPassword);
                  }}
                  className="text-3xl"
                />
              )
            }
          />
          <div className="flex justify-between items-end">
            <Button type="submit" isLoading={isSubmitting} color="primary">
              Submit
            </Button>
            <span>
              Don't have an account?
              <Link
                to="/register"
                className="font-bold ms-1 text-primary-500 underline underline-offset-3"
              >
                Sign Up
              </Link>
            </span>
          </div>
          {errorMessage && (
            <Alert color="danger" title={errorMessage} className="w-1/2" />
          )}
          {successMsg && (
            <Alert color="success" title={successMsg} className="w-1/2" />
          )}
        </div>
      </form>
    </>
  );
}
