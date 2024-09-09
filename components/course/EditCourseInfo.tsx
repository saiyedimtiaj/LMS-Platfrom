"use client"
import { useGetCourseDetailsQuery, useUpdateCourseMutation } from "@/redux/feature/courses/coursesApi";
import { LuLayoutDashboard } from "react-icons/lu";
import { ICourse } from "@/types";
import Image from "next/image";
import { Edit2 } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "sonner";

type Props = {
    id: string
}

const EditCourseInfo = ({ id }: Props) => {
    const { data, isLoading } = useGetCourseDetailsQuery(id);
    const [isEdit, setIsEdit] = useState(false);
    const [updateCourse, { isSuccess, error }] = useUpdateCourseMutation()
    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        title: "",
        price: "",
        tags: "",
        level: "",
        category: "",
        demoUrl: "",
        image: "",
        language: ""
    });

    const [initialCourseInfo, setInitialCourseInfo] = useState(courseInfo);

    useEffect(() => {
        if (data?.data) {
            const fetcheddataInfo = {
                name: data.data.course.name || "",
                description: data.data.course.description || "",
                title: data.data.course.title || "",
                price: data.data.course.price || "",
                tags: data.data.course.tags || "",
                level: data.data.course.level || "",
                category: data.data.course.category || "",
                demoUrl: data.data.course.demoUrl || "",
                image: "",
                language: data.data.course.language || ""
            };
            setCourseInfo(fetcheddataInfo);
            setInitialCourseInfo(fetcheddataInfo); // Save the initial state
        }
    }, [data]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("course update sucessfull!")
        }
        if (error) {
            if ("data" in error!) {
                const errorData = error as any;
                toast.error(errorData.data.message)
            }
        }
    }, [isSuccess, error])

    if (isLoading) {
        return <p>Loading...</p>
    }

    const course = data?.data?.course as ICourse;

    const categories = [
        { title: "Web Development" },
        { title: "App Development" },
        { title: "Machine Learning" }
    ];

    const hasChanges = () => {
        return JSON.stringify(courseInfo) !== JSON.stringify(initialCourseInfo);
    };

    const handleUpdateInfo = async () => {
        updateCourse({ id: id, body: courseInfo })
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFileName(files[0].name);
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImage(result);
            };
            reader.readAsDataURL(files[0]);
            setCourseInfo({ ...courseInfo, image: reader.result as string });
        }
    };

    return (
        <div>
            <div className="flex items-center gap-2">
                <span><LuLayoutDashboard size={22} /></span>
                <p> Customize Course</p>
            </div>
            <div className="mt-4">
                <div>
                    <label className="text-sm font-medium">Course Name</label>
                    <input
                        onChange={(e) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        name="name"
                        defaultValue={course?.name}
                        className="px-4 py-2 rounded w-full text-sm bg-white dark:bg-[#020817] focus:outline-none"
                    />
                </div>
                <div className="mt-1.5">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        onChange={(e) => setCourseInfo({ ...courseInfo, description: e.target.value })}
                        rows={4}
                        defaultValue={course?.description}
                        className="px-4 py-2 rounded w-full bg-white dark:bg-[#020817] text-sm focus:outline-none"
                    />
                </div>
                <div className="mt-1.5">
                    <label className="text-sm font-medium">Course Title</label>
                    <input
                        name="name"
                        onChange={(e) => setCourseInfo({ ...courseInfo, title: e.target.value })}
                        defaultValue={course?.title}
                        className="px-4 py-2 rounded w-full text-sm bg-white dark:bg-[#020817] focus:outline-none"
                    />
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-1 cursor-pointer">
                        <label className="text-sm font-medium">Course Image</label>
                        <p onClick={() => setIsEdit(true)} className="flex items-center gap-1 text-sm font-medium"><Edit2 size={14} /> Edit Image</p>
                    </div>
                    {
                        isEdit ? <div
                            onClick={() => document.querySelector<HTMLInputElement>(".input-Field")?.click()}
                            className="mt-2 object-cover cursor-pointer mb-4"
                        >
                            <input
                                type="file"
                                hidden
                                name="files"
                                className="input-Field"
                                onChange={handleFileChange}
                            />
                            {image ? (
                                <Image
                                    className="w-full h-[200px] object-cover mt-1 rounded-md" width={200} height={200}
                                    src={image}
                                    alt={fileName || "Profile Image"}
                                />
                            ) : (
                                <div className="flex items-center flex-col gap-1 mb-2 border-dashed border-2 border-gray-500 py-8 rounded-md">
                                    <span><FaCloudUploadAlt size={85} /></span>
                                    <span className="font-medium">Change Course Image</span>
                                </div>
                            )}
                        </div> : <Image className="w-full h-[200px] object-cover mt-1 rounded-md" width={200} height={200} src={course?.thumbnail?.url} alt="banner" />
                    }
                </div>
                <div className="mt-3">
                    <label className="text-sm font-medium">Course Price</label>
                    <input
                        name="name"
                        onChange={(e) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                        defaultValue={course?.price}
                        className="px-4 py-2 rounded w-full text-sm bg-white dark:bg-[#020817] focus:outline-none"
                    />
                </div>
                <div className="mt-2">
                    <label className="text-sm font-medium">Course Level</label>
                    <input
                        name="name"
                        onChange={(e) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                        defaultValue={course?.level}
                        className="px-4 py-2 rounded w-full text-sm bg-white dark:bg-[#020817] focus:outline-none"
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor="category">Course Categories</label>
                    <Select
                        value={course?.category}
                        onValueChange={(value) => setCourseInfo({ ...courseInfo, category: value })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                {categories.map((item, index) => (
                                    <SelectItem value={item.title} key={index}>
                                        {item.title}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-2">
                    <label className="text-sm font-medium">Demo video url</label>
                    <input
                        name="name"
                        onChange={(e) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
                        defaultValue={course?.demoUrl}
                        className="px-4 py-2 rounded w-full text-sm bg-white dark:bg-[#020817] focus:outline-none"
                    />
                </div>
                <div className="mt-2">
                    <label className="text-sm font-medium">Course Language</label>
                    <input
                        name="name"
                        onChange={(e) => setCourseInfo({ ...courseInfo, language: e.target.value })}
                        defaultValue={course?.language}
                        className="px-4 py-2 rounded w-full text-sm bg-white dark:bg-[#020817] focus:outline-none"
                    />
                </div>
                <div className="mt-2">
                    <label className="text-sm font-medium">Course Tags</label>
                    <input
                        name="name"
                        onChange={(e) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                        defaultValue={course?.tags}
                        className="px-4 py-2 rounded w-full text-sm bg-white dark:bg-[#020817] focus:outline-none"
                    />
                </div>
                <Button onClick={handleUpdateInfo} className="mt-4" disabled={!hasChanges()}>Update Info</Button>
            </div>
        </div>
    );
};

export default EditCourseInfo;
