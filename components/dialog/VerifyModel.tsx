"use client"
import { useRef, useState, useEffect } from 'react';
import { Verified } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useActivationMutation } from '@/redux/feature/auth/authApi';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


type TVerificationNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
};

const VerifyModel = ({ token }: { token: string }) => {
    const [activation, { isSuccess, error }] = useActivationMutation();
    const [invalidError, setInvalidError] = useState<boolean>(false);
    const [verifyNumber, setVerifyNumber] = useState<TVerificationNumber>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
    });
    const router = useRouter()

    useEffect(() => {
        if (isSuccess) {
            router.push('/signin')
            toast.success("Account activated successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
                setInvalidError(true);
            } else {
                console.error("An error occurred", error);
            }
        }
    }, [isSuccess, error]);

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const verificationHandler = async () => {
        const verificationNumber = Object.values(verifyNumber).join("");
        if (verificationNumber.length !== 4) {
            setInvalidError(true);
            return;
        }
        await activation({ activation_token: token, activation_code: verificationNumber });
    };

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerifiedNumber = { ...verifyNumber, [index]: value };
        setVerifyNumber(newVerifiedNumber);
        if (value === "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <Card className="mx-auto max-w-sm p-6 rounded-lg shadow-md">
                <CardHeader className="flex flex-col items-center">
                    <div className='w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-4'>
                        <Verified size={30} className="text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">Verify Your Account</CardTitle>
                    <p className="text-center text-gray-500 mt-1">Enter the 4-digit code sent to your email</p>
                </CardHeader>
                <CardContent className="mt-4">
                    <div className='flex items-center justify-between mb-4'>
                        {Object.keys(verifyNumber).map((key, index) => (
                            <input
                                type='text'
                                key={key}
                                ref={inputRefs[index]}
                                className={`w-12 h-12 border-2 text-center rounded-lg text-lg font-semibold outline-none ${invalidError ? "border-red-500" : "border-gray-300 dark:border-gray-700"}`}
                                maxLength={1}
                                value={verifyNumber[key as keyof TVerificationNumber]}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        ))}
                    </div>
                    {invalidError && <p className="text-center text-red-500 mb-4">Invalid code, please try again</p>}
                    <Button className="w-full mt-4" onClick={verificationHandler}>Verify OTP</Button>
                    <p className="text-center text-sm mt-4 text-gray-500">
                        Go back to{" "}
                        <Link href="/signin"
                            className="text-blue-500 cursor-pointer font-semibold"
                        >
                            Sign In
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
};

export default VerifyModel;
