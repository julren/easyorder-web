import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
  password: Yup.string().required("password is required!")
});

export default validationSchema;
