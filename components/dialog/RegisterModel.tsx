import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "sonner";
import { useRegisterMutation, useSocialLoginMutation } from "@/redux/feature/auth/authApi";
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useDispatch } from "react-redux";
import { userRegistationToken } from "@/redux/feature/auth/authSlice";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

type Props = {
    isRegisterOpen: boolean;
    setIsRegisterOpen: (isRegisterOpen: boolean) => void;
    setIsSignInOpen: (isSignInOpen: boolean) => void;
    setIsVerifyOpen: (isVerifyOpen: boolean) => void;
}

const schema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    email: Yup.string().email("Invalid Email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6)
});

type RegisterResponse = {
    success: boolean;
    message: string;
    data?: string;
};

const RegisterModel = ({ isRegisterOpen, setIsRegisterOpen, setIsSignInOpen, setIsVerifyOpen }: Props) => {
    const [register] = useRegisterMutation();
    const [socialLogoin] = useSocialLoginMutation()
    const dispatch = useDispatch()

    const handleModel = () => {
        setIsRegisterOpen(false);
        setIsSignInOpen(true);
    }

    const formik = useFormik({
        initialValues: { firstName: "", lastName: "", email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ firstName, lastName, email, password }) => {
            try {
                const response = await register({ name: `${firstName} ${lastName}`, email, password }).unwrap() as RegisterResponse;
                if (response.success) {
                    toast.success(response.message);
                    setIsRegisterOpen(false)
                    dispatch(userRegistationToken(response?.data))
                    setIsVerifyOpen(true)
                }
            } catch (err: any) {
                if (err.data && err.data.message) {
                    toast.error(err.data.message);
                }
                console.error(err);
            }
        }
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const { access_token } = tokenResponse;
                // Fetch user information from Google API
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                const userInfo = res.data;
                const data = await socialLogoin(userInfo).unwrap();
                setIsSignInOpen(false);
                toast.success(data?.message)
            } catch (err: any) {
                toast.error(err?.data?.message);
            }
        },
        onError: () => {
            console.log('Login Failed');
            toast.error('Google login failed');
        }
    });

    return (
        <Dialog open={isRegisterOpen} onOpenChange={() => setIsRegisterOpen(!isRegisterOpen)}>
            <DialogContent className="mx-auto max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-xl">Sign Up</DialogTitle>
                    <p className='text-sm text-gray-500'>Enter your information to create an account</p>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                type='text'
                                value={values.firstName}
                                onChange={handleChange}
                                id='firstName'
                                placeholder='Max'
                                className={`${errors.firstName && touched.firstName ? "border-red-500" : ""}`}
                                required
                            />
                            {errors.firstName && touched.firstName && <span className='text-red-500 pt-1 block'>{errors.firstName}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                type='text'
                                value={values.lastName}
                                onChange={handleChange}
                                id='lastName'
                                placeholder='Robinson'
                                className={`${errors.lastName && touched.lastName ? "border-red-500" : ""}`}
                                required
                            />
                            {errors.lastName && touched.lastName && <span className='text-red-500 pt-1 block'>{errors.lastName}</span>}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type='email'
                            value={values.email}
                            onChange={handleChange}
                            id='email'
                            placeholder='example@example.com'
                            className={`${errors.email && touched.email ? "border-red-500" : ""}`}
                            required
                        />
                        {errors.email && touched.email && <span className='text-red-500 pt-1 block'>{errors.email}</span>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                            id='password'
                            placeholder='••••••••'
                            className={`${errors.password && touched.password ? "border-red-500" : ""}`}
                            required
                        />
                        {errors.password && touched.password && <span className='text-red-500 pt-1 block'>{errors.password}</span>}
                    </div>
                    <div className="flex justify-center">
                        <Button className="w-full mt-3 rounded-lg" type="submit">Create an account</Button>
                    </div>
                    <Button variant="outline" className="w-full mt-3" onClick={() => googleLogin()}>
                        Sign up with Google
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account? <Button className="px-0 underline" onClick={handleModel} variant="link">Sign In</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterModel;
