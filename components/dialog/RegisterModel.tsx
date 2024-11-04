"use client"
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "sonner";
import { useRegisterMutation, useSocialLoginMutation } from "@/redux/feature/auth/authApi";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaArrowLeft, FaGoogle } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

const RegisterModel = () => {
    const [register] = useRegisterMutation();
    const [socialLogoin] = useSocialLoginMutation();
    const router = useRouter();

    const formik = useFormik({
        initialValues: { firstName: "", lastName: "", email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ firstName, lastName, email, password }) => {
            try {
                const response = await register({ name: `${firstName} ${lastName}`, email, password }).unwrap() as RegisterResponse;
                if (response.success) {
                    toast.success(response.message);
                    router.push(`/verify?activationCode=${response?.data}`)
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
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                const userInfo = res.data;
                const data = await socialLogoin(userInfo).unwrap();
                toast.success(data?.message);
            } catch (err: any) {
                toast.error(err?.data?.message || 'Google login failed');
            }
        },
        onError: () => {
            toast.error('Google login failed');
        }
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
            <Button
                className="absolute top-4 left-4 flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                variant="link"
                onClick={() => router.push('/')}
            >
                <FaArrowLeft className="mr-1" /> Back to Home
            </Button>
            <Card className="w-full max-w-md shadow-lg rounded-lg border-0">
                <CardContent>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>Enter your information to create an account</p>
                    </CardHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                {errors.firstName && touched.firstName && <span className='text-red-500 text-sm'>{errors.firstName}</span>}
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
                                {errors.lastName && touched.lastName && <span className='text-red-500 text-sm'>{errors.lastName}</span>}
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
                            {errors.email && touched.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
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
                            {errors.password && touched.password && <span className='text-red-500 text-sm'>{errors.password}</span>}
                        </div>
                        <Button className="w-full mt-4 rounded-lg" type="submit">Create an account</Button>
                        <Button className="w-full mt-2 flex items-center justify-center border-gray-300" variant="outline" onClick={() => googleLogin()}>
                            <FaGoogle size={18} className="mr-2" /> Continue with Google
                        </Button>
                    </form>
                    <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-300">
                        Already have an account? <Link href='/signin'><Button className="px-0 underline" variant="link">Sign In</Button></Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterModel;
