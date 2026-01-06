import * as z from "zod";

export const regSchema = z.object({
  name: z.string().nonempty("Name is Required").min(5, "Name must be At Least 5 Characters").max(20, "Name must not exceed 10 characters"),
  email:z.string().nonempty("Email is Required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Enter is invalid "),
  password:z.string().nonempty("Password is Required").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Password must be at Least 4 chars and not exceed 12"),
  rePassword:z.string().nonempty("Confirm password is Required"),
  dateOfBirth:z.coerce.string().refine((date) => {
    const currentYear = new Date().getFullYear()
    const birthYear = new Date(date).getFullYear()
    const age =  currentYear - birthYear
    return age >= 18
  },{message: "Age Must Be At Least 18 Years Old"}),
  gender : z.string().nonempty("You must  choose gender").regex(/^(male|female)$/i,"Gender must be one of male or female")
}).refine(data => data.password === data.rePassword,{
  path:["rePassword"],
  message:"password must match"
})


export const loginSchema = z.object({
  email:z.string().nonempty("Email is Required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Enter is invalid "),
  password:z.string().nonempty("Password is Required").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Password must be at Least 4 chars and not exceed 12"),
})