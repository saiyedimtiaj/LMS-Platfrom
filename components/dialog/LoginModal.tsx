"use client"
import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useLoginMutation } from '@/redux/feature/auth/authApi';
import { toast } from 'sonner';
import { FaGoogle } from 'react-icons/fa';

type Props = {
    setIsSignInOpen: (isSignInOpen: boolean) => void;
    isSignInOpen: boolean;
    setIsRegisterOpen: (isRegisterOpen: boolean) => void;
}

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters")
});

const LoginModal = ({ setIsSignInOpen, isSignInOpen, setIsRegisterOpen }: Props) => {
    const [login, { isSuccess, error }] = useLoginMutation();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setIsSignInOpen(false);
            toast.success("Login successfully!");
        }
        if (error) {
            if ("data" in error!) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error, setIsSignInOpen]);

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({ email, password });
        }
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    const handleModel = () => {
        setIsSignInOpen(false);
        setIsRegisterOpen(true);
    }

    return (
        <Dialog open={isSignInOpen} onOpenChange={() => setIsSignInOpen(!isSignInOpen)}>
            <DialogContent className="sm:max-w-[370px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Sign In</DialogTitle>
                    <p className='text-sm text-gray-500'>Enter your email below to login to your account</p>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        id="email"
                        placeholder="loginmail@gmail.com"
                        className={`border-gray-300 mb-2 mt-1 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && touched.email && <span className='text-red-500 pt-2 block'>{errors.email}</span>}

                    <div className='relative'>
                        <Label>Password</Label>
                        <Input
                            type={!show ? "password" : "text"}
                            value={values.password}
                            onChange={handleChange}
                            id="password"
                            placeholder="********"
                            className={`border-gray-300 mt-1 ${errors.password && touched.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && touched.password && <span className='text-red-500 pt-2 block'>{errors.password}</span>}
                        <span
                            className="absolute bottom-2.5 right-2 z-1 cursor-pointer"
                            onClick={() => setShow(!show)}
                        >
                            {!show ? '👁️' : '👁️‍🗨️'}
                        </span>
                    </div>

                    <Button className="w-full mt-4" type="submit">Login</Button>
                </form>
                <div className="-mb-1">
                    <Button className="w-full border-gray-300" variant="outline" onClick={() => toast.success("Comming Soon")}>
                        <FaGoogle size={18} /> <span className="ml-1 text-base">Continue with Google</span>
                    </Button>
                </div>
                <p className="text-center">
                    Dont have an account? <Button className="px-0 underline" onClick={handleModel} variant="link">Sign Up</Button>
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
