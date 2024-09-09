"use client"
import { useEffect, useState } from "react";
import CoursePreview from "@/components/course/CoursePreview";
import CourseInformation from "@/components/course/CourseInformation";
import CourseData from "@/components/course/CourseData";
import CourseContent from "@/components/course/CourseContent";
import CourseOptions from "@/components/course/CourseOptions";
import { useCreateCourseMutation } from "@/redux/feature/courses/coursesApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateCourse = () => {
    const [createCourse, { isError, isSuccess, isLoading, error }] = useCreateCourseMutation();
    const router = useRouter()
    const [moduleContentData, setModuleContentData] = useState([
        {
            moduleName: "",
            content: [
                {
                    videoName: "",
                    videoUrl: "",
                    videoLength: 0,
                    videoNo: 1
                },
            ],
        },
    ]);

    const [loadingToastId, setLoadingToastId] = useState<string | null>(null);

    useEffect(() => {
        if (isLoading) {
            const id = toast.loading("Loading...");
            setLoadingToastId(id as any);
        }
    }, [isLoading]);

    useEffect(() => {
        if (isSuccess) {
            if (loadingToastId) {
                toast.dismiss(loadingToastId);
            }
            toast.success("Course created successfully");
            router.push("/admin/courses");
        } else if (isError) {
            console.log(error);
            if (loadingToastId) {
                toast.dismiss(loadingToastId);
            }
            toast.error("Failed to create course");
        }
    }, [isSuccess, isError, loadingToastId, router, error]);

    const handleModuleSubmit = async () => {
        // formated Course Content Array
        const formattedCourseContentData = moduleContentData.map((courseContent) => ({
            moduleName: courseContent.moduleName,
            links: courseContent.content.map((link) => ({
                title: link.videoName,
                videoUrl: link.videoUrl,
                videoLength: link.videoLength,
                videoNo: link.videoNo
            })),
        }))
        console.log(formattedCourseContentData);
    }

    const [active, setActive] = useState(0)
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        title: "",
        price: "",
        tags: "",
        level: "",
        category: "",
        demoUrl: "",
        thumbnail: "",
        language: ""
    });
    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

    const handleCourseCreate = async () => {
        const data = { course: { ...courseInfo, benefits, prerequisites }, module: moduleContentData }
        await createCourse(data)
    }


    return (
        <div className="md:mx-2 mt-2 dark:bg-[#111C43] bg-gray-200 px-3 md:px-5 py-6 rounded-md">
            <CourseOptions active={active} setActive={setActive} />
            {active === 0 && (
                <CourseInformation
                    courseInfo={courseInfo}
                    setCourseInfo={setCourseInfo}
                    active={active}
                    setActive={setActive}
                />
            )}
            {active === 1 && (
                <CourseData
                    benefits={benefits}
                    setBenefits={setBenefits}
                    active={active}
                    setActive={setActive}
                    prerequisites={prerequisites}
                    setPrerequisites={setPrerequisites}
                />
            )}
            {active === 2 && (
                <CourseContent
                    active={active}
                    setActive={setActive}
                    courseContentData={moduleContentData}
                    setCourseContentData={setModuleContentData}
                    handleSubmit={handleModuleSubmit}
                />
            )}
            {active === 3 && (
                <CoursePreview
                    active={active}
                    setActive={setActive}
                    courseInfo={courseInfo}
                    handleCourseCreate={handleCourseCreate}
                    benefits={benefits}
                    prerequisites={prerequisites}
                    module={moduleContentData}
                />
            )}
        </div>
    );
};

export default CreateCourse;