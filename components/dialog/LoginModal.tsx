"use client"
import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useLoginMutation, useSocialLoginMutation } from '@/redux/feature/auth/authApi';
import { toast } from 'sonner';
import { FaGoogle } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters")
});

const LoginModal = () => {
    const [login, { isSuccess, error }] = useLoginMutation();
    const [socialLogin] = useSocialLoginMutation();
    const [show, setShow] = useState(false);
    const [select, setSelect] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login successfully!");
            router.push('/');
        }
        if (error) {
            if ("data" in error!) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error]);

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({ email, password });
        },
    });

    const { errors, touched, values, handleChange, handleSubmit, setFieldValue } = formik;

    // Set default credentials based on the selected role
    useEffect(() => {
        if (select === "user") {
            setFieldValue("email", "user@gmail.com");
            setFieldValue("password", "123456");
        } else if (select === "admin") {
            setFieldValue("email", "jegib29182@brinkc.com");
            setFieldValue("password", "123456");
        } else {
            setFieldValue("email", "");
            setFieldValue("password", "");
        }
    }, [select, setFieldValue]);

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
                const data = await socialLogin(userInfo).unwrap();
                toast.success(data?.message);
                router.push('/'); // Redirect after successful social login
            } catch (err: any) {
                toast.error(err?.data?.message || 'An error occurred');
            }
        },
        onError: () => {
            toast.error('Google login failed');
        }
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
            <Button
                className="absolute top-4 left-4 text-white hover:text-gray-300"
                variant="link"
                onClick={() => router.push('/')}
            >
                Back to Home
            </Button>
            <Card className="w-full max-w-md p-6 shadow-lg border-0">
                <CardContent>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold mb-2">Sign In</CardTitle>
                        <p className="text-sm text-gray-500 mb-4">Enter your email below to login to your account</p>
                    </CardHeader>
                    <div className="border-dashed border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-4">
                        <h2 className="text-center font-semibold text-gray-700 dark:text-gray-300 mb-2">Demo Credentials</h2>
                        <div className="flex justify-center gap-2">
                            <Button variant="outline" onClick={() => setSelect("user")}>User</Button>
                            <Button variant="outline" onClick={() => setSelect("admin")}>Admin</Button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="loginmail@gmail.com"
                                className={`border-gray-300 mt-1 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && touched.email && (
                                <span className="text-red-500 text-sm">{errors.email}</span>
                            )}
                        </div>
                        <div className="relative">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type={!show ? "password" : "text"}
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                placeholder="********"
                                className={`border-gray-300 mt-1 ${errors.password && touched.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && touched.password && (
                                <span className="text-red-500 text-sm">{errors.password}</span>
                            )}
                            <span
                                className="absolute bottom-2.5 right-2 cursor-pointer text-gray-500"
                                onClick={() => setShow(!show)}
                            >
                                {!show ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </div>
                        <Button type="submit" className="w-full mt-4">Login</Button>
                    </form>
                    <Button className="w-full mt-4 flex items-center justify-center" variant="outline" onClick={() => googleLogin()}>
                        <FaGoogle size={18} className="mr-2" /> Continue with Google
                    </Button>
                    <p className="text-center mt-4">
                        Don't have an account? <Link href="/register"><Button className="underline px-0" variant="link">Sign Up</Button></Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginModal;
