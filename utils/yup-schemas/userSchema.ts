import * as yup from 'yup';

const signInUserSchema = yup.object().shape({
    email: yup.string().required("User email is required").email("User email does not match an email format"),
    password: yup.string().required("User password is required").min(4, "User password must be at least 4 characters long"),
}).noUnknown(true, "Unknown params found in user").strict(true);

const signUpUserSchema = yup.object().shape({
    email: yup.string().required("User email is required").email("User email does not match an email format"),
    password: yup.string().required("User password is required").min(4, "User password must be at least 4 characters long"),
    name: yup.string().required("User name is required").matches(/^[a-zA-Z]+( [a-zA-Z]+)*$/, "User name may only have words and spaces between them"),
}).noUnknown(true, "Unknown params found in user").strict(true);

export const isValidSignInUser = async (user: Object) => {
    return await signInUserSchema.validate(user, { abortEarly: false });
}

export const isValidSignUpUser = async (user: Object) => {
    return await signUpUserSchema.validate(user, { abortEarly: false });
}