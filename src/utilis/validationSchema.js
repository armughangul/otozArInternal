import * as Yup from 'yup';
export const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .required('Phone number is Required')
    .matches(/^[0-9 && +]+$/, 'please enter valid number')
    .min(7),
  name: Yup.string()
    .required('User Name is Required')
    // .matches(/^[a-z ]+$/, 'please enter your name')
    .min(3),
});
