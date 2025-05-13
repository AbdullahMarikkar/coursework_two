import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("User Name is Required"),
  email: Yup.string()
    .email("Invalid email Format")
    .required("Email is Required"),
  password: Yup.string().min(8, "Too Short!").required("Password is Required"),
});

export default SignUpSchema;
