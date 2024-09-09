import React, { FC, useState } from "react";
import { style } from "../styled/style";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios"
import { Progress } from "../ui/progress";
import { HiDocumentArrowUp } from "react-icons/hi2";

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
    courseInfo,
    setCourseInfo,
    active,
    setActive,
}) => {
    const [dragging, setDragging] = useState(false);
    const [progressBar, setProgressBar] = useState<null | number>(null);
    const [videoDraging, setVideoDragging] = useState(false);
    const [videoFileName, setVideoFileName] = useState('')
    const categories = [
        { title: "Web Development" },
        { title: "App Development" },
        { title: "Machine Learning" },
    ];

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    };
    const handleVideoDragOver = (e: any) => {
        e.preventDefault();
        setVideoDragging(true);
    };

    const handleImageDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    };
    const handleVideoDragLeave = (e: any) => {
        e.preventDefault();
        setVideoDragging(false);
    };

    const handleImageDrop = (e: any) => {
        e.preventDefault();
        setVideoDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCourseInfo({ ...courseInfo, thumbnail: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVideoDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            setCourseInfo({ ...courseInfo, demoVideo: videoUrl });
        }
    };

    const handleVideoChange = (e: any) => {
        const file = e.target.files?.[0];
        setVideoFileName(`${file.name} (${(file.size / (124 * 1024)).toFixed(0)}mb)`)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "od7lpeqi");

        axios.post(`https://api.cloudinary.com/v1_1/ddhb3f9rg/video/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (event: any) => {
                setProgressBar(Math.round((100 * event.loaded) / event.total));
            }
        })
            .then((res: any) => {
                setCourseInfo({ ...courseInfo, demoUrl: res.data.secure_url });
                setProgressBar(null)
            })
            .catch((err: any) => {
                console.error("Error uploading the video: ", err.response?.data?.error?.message || err.message);
            });

        // setCourseInfo({ ...courseInfo, demoUrl: res.data.secure_url });
    };



    return (
        <div>
            <form onSubmit={handleSubmit} className={style.label}>
                {/* Course Name */}
                <div>
                    <label htmlFor="name">Course Name</label>
                    <Input
                        type="text"
                        id="name"
                        required
                        value={courseInfo.name}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, name: e.target.value })
                        }
                        placeholder="Course Name..."
                        className="mb-3"
                    />
                </div>

                {/* Course Description */}
                <div className="mb-5">
                    <label>Course Description</label>
                    <Textarea
                        id="description"
                        rows={8}
                        placeholder="Write something amazing..."
                        value={courseInfo.description}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, description: e.target.value })
                        }
                    />
                </div>

                {/* Course Title */}
                <div>
                    <label htmlFor="name">Course Title</label>
                    <Input
                        type="text"
                        id="title"
                        required
                        value={courseInfo.title}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, title: e.target.value })
                        }
                        placeholder="Course title..."
                        className="mb-3"
                    />
                </div>

                {/* Course Details */}
                <div className="flex flex-col-reverse md:flex-row gap-5 mb-3">
                    <div className="md:w-1/2 w-full">
                        <div className="w-full">
                            <label htmlFor="price">Course Price</label>
                            <Input
                                type="number"
                                id="price"
                                required
                                value={courseInfo.price}
                                onChange={(e: any) =>
                                    setCourseInfo({
                                        ...courseInfo,
                                        price: parseInt(e.target.value),
                                    })
                                }
                                placeholder="29"
                            />
                        </div>
                        <div className="w-full mt-2">
                            <label htmlFor="level">Course Level</label>
                            <Input
                                type="text"
                                id="level"
                                required
                                value={courseInfo.level}
                                onChange={(e: any) =>
                                    setCourseInfo({ ...courseInfo, level: e.target.value })
                                }
                                placeholder="Beginner/Intermediate/Expert"
                            />
                        </div>

                        {/* Course Category */}
                        <div className="w-full mt-2">
                            <label htmlFor="category">Course Categories</label>
                            <Select
                                value={courseInfo.category}
                                onValueChange={(value) =>
                                    setCourseInfo({ ...courseInfo, category: value })
                                }
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

                        {/* Course Language */}
                        <div className="w-full flex gap-2 mt-2">
                            <div className="w-full">
                                <label htmlFor="language">Language</label>
                                <Input
                                    type="text"
                                    id="language"
                                    required
                                    value={courseInfo.language}
                                    onChange={(e: any) =>
                                        setCourseInfo({ ...courseInfo, language: e.target.value })
                                    }
                                    placeholder="Enter Language"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Demo Video */}
                    <div className="w-full md:w-1/2 mt-2.5">
                        <h1 className="text-lg font-medium">Demo Video</h1>
                        <p className="text-sm text-gray-500">MP4, WEBM, OGG supported</p>
                        <div>
                            <input
                                type="file"
                                accept="video/*"
                                id="video"
                                className="hidden "
                                onChange={handleVideoChange}
                            />
                            <label
                                htmlFor="video"
                                className={`flex flex-col h-[220px] bg-white dark:bg-[#020817] ${courseInfo?.demoUrl ? '' : "border border-gray-500 border-dashed"} justify-center items-center gap-y-2 rounded-md ${videoDraging ? "bg-blue-500" : "bg-transparent"
                                    }`}
                                onDragOver={handleVideoDragOver}
                                onDragLeave={handleVideoDragLeave}
                                onDrop={handleVideoDrop}
                            >
                                {
                                    courseInfo?.demoUrl ? <video className="w-full h-full" controls>
                                        <source src={courseInfo?.demoUrl} type="video/mp4" />
                                    </video> : <>
                                        <FiUploadCloud size={50} />
                                        <p className="text-xs font-normal">
                                            Drag & drop your file here
                                        </p>
                                        <p className="text-xs font-normal">or</p>
                                        <p className="text-xs px-2.5 py-1 rounded bg-gray-400 dark:bg-[#111C43]">
                                            Browse Files
                                        </p>
                                    </>
                                }
                            </label>
                            {
                                progressBar !== null && <div className="flex items-center mt-3 gap-2">
                                    <h1><HiDocumentArrowUp size={25} /></h1>
                                    <div>
                                        <p className="text-sm font-normal text-gray-500">{videoFileName}</p>
                                        <Progress value={progressBar} className="w-full dark:bg-[#020817] h-[4px]" />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div >

                {/* Course Tags */}
                < div className="w-full" >
                    <label htmlFor="tags">Course Tags</label>
                    <Input
                        type="text"
                        id="tags"
                        required
                        value={courseInfo.tags}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, tags: e.target.value })
                        }
                        placeholder="MERN,Next 13,Socket io,tailwind css,LMS"
                    />
                </div >

                {/* Thumbnail Upload */}
                <div className="w-full mt-6">
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="file"
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
                            }`}
                        onDragOver={handleImageDragOver}
                        onDragLeave={handleImageDragLeave}
                        onDrop={handleImageDrop}
                    >
                        {courseInfo.thumbnail ? (
                            <Image
                                src={courseInfo.thumbnail}
                                alt="Thumbnail"
                                width={100}
                                height={100}
                                className="object-cover"
                            />
                        ) : (
                            <span>Drag & drop or click to upload</span>
                        )}
                    </label>
                </div>

                <button className="my-5 bg-blue-500 px-4 py-2 text-white rounded-md">
                    Save and Next
                </button>
            </form >
        </div >
    );
};

export default CourseInformation;
