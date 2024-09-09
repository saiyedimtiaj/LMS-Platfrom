"use client";

import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";

const ReviewCard = ({
    items,
    className,
}: {
    items: {
        quote: string;
        name: string;
        title: string;
        role: string;
        image: string
    }[];
    className?: string;
}) => {
    const gradientColors = [
        "linear-gradient(180deg, #2f3640, #353b48)",
        "linear-gradient(180deg, #1e90ff, #3742fa)",
        "linear-gradient(180deg, #371CE2, #25064b)",
    ];

    return (
        <div className="mb-40 mt-40">
            <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight mb-14">
                Our Student Says
            </h1>
            <div className={`relative container mx-auto ${className || ""}`}>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay]}
                    breakpoints={{
                        500: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={item.name}>
                            <div
                                className="rounded-2xl min-h-[420px] flex flex-col justify-between border border-b-0 flex-shrink-0 px-8 py-6"
                                style={{
                                    background: gradientColors[index % gradientColors.length],
                                }}
                            >
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <h1 className="text-white"><FaQuoteLeft size={29} /></h1>
                                    </div>
                                    <h1 className="text-sm font-Poppins leading-[1.6] text-gray-100 font-medium">
                                        {item.quote.slice(0, 220)}...
                                    </h1>
                                </div>
                                <div className="flex items-center gap-2 font-Poppins">
                                    <Image width={50} height={50} alt="user" src={item.image} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <h4 className="text-lg font-medium text-white"> {item?.name}</h4>
                                        <p className="text-sm font-normal text-white">{item?.role}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ReviewCard;
