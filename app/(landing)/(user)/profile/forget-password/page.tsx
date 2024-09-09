"use client"
import { Button } from "@/components/ui/button";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/feature/auth/authApi";
import { useEffect } from "react";

const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("New password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], "Passwords must match")
        .required("Confirm password is required"),
});

const Page = () => {
    const [updatePassword, { isSuccess, error }] = useChangePasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password change sucessfully!")
        }
        if (error) {
            if ("data" in error!) {
                const errorData = error as any;
                toast.error(errorData.data.message)
            }
        }
    }, [isSuccess, error])

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            await updatePassword({ oldPassword: values.currentPassword, newPassword: values.newPassword })
        },
    });

    return (
        <div>
            <div className="dark:bg-[#141d2e] bg-gray-100 p-5 rounded-lg font-Poppins">
                <h1 className="text-purple-500 text-lg font-medium border-dashed border-b-2 pb-1 border-gray-600">Password</h1>
                <form className="mt-7" onSubmit={formik.handleSubmit}>
                    <h1 className="flex items-center text-sm gap-1">
                        <AiOutlineLock size={20} /> Current Password
                    </h1>
                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        className="px-4 py-2 rounded w-full mt-2 bg-white dark:bg-[#2c1f3e] focus:outline-none"
                        value={formik.values.currentPassword}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.currentPassword && formik.touched.currentPassword && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.currentPassword}</div>
                    )}
                    <div className="mt-5 flex flex-col md:flex-row gap-3">
                        <div className="w-full">
                            <h1 className="flex items-center text-sm gap-1">
                                <AiOutlineLock size={20} /> New Password
                            </h1>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                className="px-4 py-2 rounded w-full mt-2 bg-white dark:bg-[#2c1f3e] focus:outline-none"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.newPassword && formik.touched.newPassword && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</div>
                            )}
                        </div>
                        <div className="w-full">
                            <h1 className="flex text-sm gap-1">
                                <AiOutlineLock size={20} /> Confirm New Password
                            </h1>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm New Password"
                                className="px-4 py-2 rounded w-full mt-2 bg-white dark:bg-[#2c1f3e] focus:outline-none"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
                            )}
                        </div>
                    </div>
                    <Button className="mt-4 mb-4" type="submit">Change Password</Button>
                </form>
            </div>
        </div>
    );
};

export default Page;
