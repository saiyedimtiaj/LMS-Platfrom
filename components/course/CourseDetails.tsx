"use client"
import { useGetCourseDetailsQuery } from "@/redux/feature/courses/coursesApi";
import { BsPatchExclamation, BsBarChartFill, BsDot } from "react-icons/bs";
import { MdOutlineAccessTime, MdOutlineOndemandVideo } from "react-icons/md";
import { IoLanguageOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TContent, TModule, TPrerequisites } from "@/types";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useCreatePaymentIntentMutation } from "@/redux/feature/orders/ordersApi";
import CheckOutForm from "../payment/Checkoutfrom";
import LoginModal from "../dialog/LoginModal";
import RegisterModel from "../dialog/RegisterModel";
import VerifyModel from "../dialog/VerifyModel";
import { useAppSelector } from "@/redux/hooks";
import Loader from "../Loader/Loader";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
const stripePromise = loadStripe("pk_test_51OECa6JppFDY8B5jfeGOAt0HVDsH1z8BZu6NSWOsW99PJxw0EOfetFMN9MvhEsirRD6UHDNyKqotJ7V5bHqbmBc300bsjMYMxS");

type Props = {
    id: string
}

const CourseDetails = ({ id }: Props) => {
    const { data, isLoading } = useGetCourseDetailsQuery(id);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const { user } = useAppSelector(state => state.auth);
    const { theme } = useTheme();
    const router = useRouter()


    useEffect(() => {
        if (data) {
            const amount = Math.round(data?.data?.course?.price * 100);
            createPaymentIntent(amount).then(stripeData => {
                console.log(stripeData?.data?.data);
                setClientSecret(stripeData?.data?.data as string);
            })
        }
    }, [data, createPaymentIntent]);


    if (isLoading) {
        return <Loader />
    }

    const totalContentCount = data?.data?.courseModule?.reduce((total: number, module: TModule) => total + module.content.length, 0);

    const totalVideoLengthInMinutes = data?.data?.courseModule?.reduce((total: number, module: TModule) =>
        total + module.content.reduce((subTotal: number, content: TContent) => subTotal + content.videoLength, 0),
        0);

    // Convert minutes to hours and minutes
    const hours = Math.floor(totalVideoLengthInMinutes / 60);
    const minutes = totalVideoLengthInMinutes % 60;


    const filterCourse = user?.courses?.find((course: any) => course?.courseId === id)
    const handlOrder = () => {
        if (user) {
            setPaymentModalOpen(true)
        } else {
            router.push('/signin')
        }
    }


    return (
        <div className="font-Josefin container px-4 py-14">
            <div className="flex flex-col lg:flex-row">

                <div className="flex gap-8">
                    <div className="flex flex-col gap-y-3 h-full">
                        <h1 className="font-semibold uppercase text-[#C0C4FC]">#{data?.data?.course?.category || "web development"}</h1>
                        <h1 className="text-4xl font-bold ">{data?.data?.course?.name}</h1>
                        <h1 className="font-medium max-w-[720px] text-[18px]">{data?.data?.course?.title}</h1>
                        <p className="flex items-center gap-3"><BsPatchExclamation /><span> Last Update  {data?.data?.course?.updatedAt.slice(0, 10)}</span></p>
                        <div className="mt-2 flex flex-col gap-y-2 max-w-[350px]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <span><MdOutlineAccessTime size={20} /></span>
                                    <span>Course Duration</span>
                                </div>
                                <p>30-40 Hours</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <span><BsBarChartFill size={20} /></span>
                                    <span>Course Level</span>
                                </div>
                                <p>{data?.data?.course?.level}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <span><IoLanguageOutline size={20} /></span>
                                    <span>Course Language</span>
                                </div>
                                <p>{data?.data?.course?.language}</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="h-full mt-10 lg:mt-0 w-full lg:w-[500px]">
                    <iframe src={data?.data?.course?.demoUrl} className="w-full h-[250px]" allowFullScreen={true}></iframe>
                    <h3 className="mt-4 mb-3 ml-2 font-bold"><span>Price:</span> <span className="text-lg">${data?.data?.course?.price}</span></h3>
                    {
                        filterCourse ? <Link href={`/profile/my-courses`} className="bg-blue-500 text-white px-7 py-[13px] font-medium rounded-lg">Continue</Link> : <button onClick={handlOrder} className="bg-blue-500 text-white px-7 py-2.5 rounded-lg" >Bay Now</button>
                    }

                </div>
            </div>

            <div className="max-w-[650px] px-4 pb-4 pt-9 border mt-14">
                <h3 className="text-2xl font-semibold">What you&aposll learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                    {
                        data?.data?.course?.benefits?.map((item: any, index: number) => <div className="flex gap-1" key={index}>
                            <span><IoCheckmark /></span>
                            <span className="font-Poppins text-sm font-light">{item?.title}</span>
                        </div>)
                    }
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-semibold">Course content</h3>
                <p className="text-gray-500 mt-5">{data?.data?.courseModule?.length} module {totalContentCount} lectures {`${hours}h ${minutes}m total length`}</p>
                <Accordion type="single" collapsible className="max-w-[650px] mt-1">
                    {
                        data?.data?.courseModule?.map((module: TModule, index: number) => {
                            const videoLength = module.content.reduce((total: number, content) => (total + content.videoLength), 0)
                            return (
                                <AccordionItem key={index} value={`item-${index}`} className="border-t border-r border-l px-4">
                                    <AccordionTrigger>
                                        <div className="flex justify-between w-full">
                                            <h3>{module.moduleName}</h3>
                                            <h5>
                                                <div className="flex items-center gap-3">
                                                    <span> {module.content.length} lectures</span>
                                                    <span>{videoLength} min</span>
                                                </div>
                                            </h5>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-3">
                                        {
                                            module?.content?.map((content, index) => <div key={index} className="flex items-center justify-between">
                                                <div className="flex gap-3 items-center">
                                                    <span><MdOutlineOndemandVideo /> </span>
                                                    <span>{content.videoName}</span>
                                                </div>
                                                <p>{content.videoLength}min</p>
                                            </div>
                                            )
                                        }
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })
                    }
                </Accordion>
            </div>

            <div className="max-w-[650px] mt-10">
                <h3 className="text-2xl font-semibold mb-5">Requirements</h3>
                {
                    data?.data?.course?.prerequisites?.map((item: TPrerequisites, index: number) => <div className="flex items-center gap-3" key={index}>
                        <span><Dot /></span>
                        <span className="font-light font-Poppins text-sm">{item?.title}</span>
                    </div>)
                }
            </div>

            <Dialog open={paymentModalOpen} onOpenChange={() => setPaymentModalOpen(!paymentModalOpen)}>
                <DialogContent className="sm:max-w-[370px] md:max-w-[410px] max-h-[450px] overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Payment</DialogTitle>
                    </DialogHeader>
                    <div>
                        {stripePromise && clientSecret && (
                            <Elements stripe={stripePromise} options={{
                                clientSecret: clientSecret, appearance: {
                                    theme: theme === "dark" ? "night" : "flat"
                                }
                            }}>
                                <CheckOutForm setOpen={setPaymentModalOpen} data={data} />
                            </Elements>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default CourseDetails;