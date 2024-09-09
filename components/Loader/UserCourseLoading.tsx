import React from 'react';

const UserCourseLoading = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
            <div className="w-full  dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner flex flex-col">
                <div className="animate-pulse">
                    <div className="rounded-md bg-slate-200 dark:bg-slate-100 h-[200px] w-full"></div>
                    <div className="flex-1 py-1">
                        <div className="h-2 bg-slate-200 dark:bg-slate-100 mt-3 rounded-sm"></div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-100 mt-3 rounded-sm"></div>
                        <div className="h-8 bg-slate-200 mb-1 dark:bg-slate-100 mt-3 rounded-sm"></div>
                    </div>
                </div>
            </div>
            <div className="w-full  dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner flex flex-col">
                <div className="animate-pulse">
                    <div className="rounded-md bg-slate-200 dark:bg-slate-100 h-[200px] w-full"></div>
                    <div className="flex-1 py-1">
                        <div className="h-2 bg-slate-200 dark:bg-slate-100 mt-3 rounded-sm"></div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-100 mt-3 rounded-sm"></div>
                        <div className="h-8 bg-slate-200 mb-1 dark:bg-slate-100 mt-3 rounded-sm"></div>
                    </div>
                </div>
            </div>
            <div className="w-full  dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner flex flex-col">
                <div className="animate-pulse">
                    <div className="rounded-md bg-slate-200 dark:bg-slate-100 h-[200px] w-full"></div>
                    <div className="flex-1 py-1">
                        <div className="h-2 bg-slate-200 dark:bg-slate-100 mt-3 rounded-sm"></div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-100 mt-3 rounded-sm"></div>
                        <div className="h-8 bg-slate-200 mb-1 dark:bg-slate-100 mt-3 rounded-sm"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCourseLoading;