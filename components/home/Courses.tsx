"use client"
import CourseCard from "./CourseCard";
import { useGetUserAllCoursesQuery } from "@/redux/feature/courses/coursesApi";
import CoursesLoading from "../Loader/CoursesLoading";

type Props = {};

const Courses = (props: Props) => {
    const { data, isLoading } = useGetUserAllCoursesQuery({});

    return (
        <div>
            <div className="container mx-auto px-4 mt-20">
                <h1 className="text-center font-Poppins md:text-3xl lg:text-5xl text-2xl leading-[35px]  dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
                    Expand Your Career <span className="text-gradient">Opportunity</span>{" "}
                    <br />
                    Opportunity With Our Courses
                </h1>
                <br />
                <br />
                {
                    isLoading ? <CoursesLoading /> : <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                        {
                            data?.data?.map((item: any, index: number) => (
                                <CourseCard item={item} key={index} />
                            ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default Courses;