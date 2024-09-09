import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <div className="h-[calc(100vh-80px)] w-full relative flex items-center justify-center">
            <div className="absolute inset-0 h-full w-full dark:bg-[#080B11] bg-white">
                <div className="absolute bottom-0 left-0 right-0 top-0 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:14px_24px] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            </div>
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-[#080B11] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="relative z-20 bg-clidiv-text flex gap-y-4 items-center flex-col text-transparent py-8">
                <h1 className='text-black text-center font-semibold font-Josefin dark:text-white md:text-7xl text-2xl'>Transform Your Knowledge</h1>
                <p className='text-[#5A5B62] text-sm md:text-xl text-center font-medium max-w-[770px]'>Access High-Quality Educational Resources, Interactive Learning Modules, and Collaborative Tools to Enhance Knowledge and Achieve Goals on EXPO</p>
                <Link href="/courses">
                    <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2.5 bg-[#0070f3] rounded-md text-white font-medium transition duration-200 ease-linear">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
