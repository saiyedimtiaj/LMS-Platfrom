"use client"
import { useRef, useState, useEffect } from 'react';
import { Verified } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { useActivationMutation } from '@/redux/feature/auth/authApi';
import { useAppSelector } from '@/redux/hooks';
import { toast } from 'sonner';

type Props = {
    isVerifyOpen: boolean;
    setIsVerifyOpen: (isVerifyOpen: boolean) => void;
    setIsSignInOpen: (isSignInOpen: boolean) => void
};

type TVerificationNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
};

const VerifyModel = ({ isVerifyOpen, setIsVerifyOpen, setIsSignInOpen }: Props) => {
    const { token } = useAppSelector(state => state.auth);
    const [activation, { isSuccess, error }] = useActivationMutation();
    const [invalidError, setInvalidError] = useState<boolean>(false);
    const [verifyNumber, setVerifyNumber] = useState<TVerificationNumber>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Account activated successfully");
            setIsVerifyOpen(false);
            setIsSignInOpen(true);
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
                setInvalidError(true);
            } else {
                console.log("An error occurred", error);
            }
        }
    }, [isSuccess, error, setIsVerifyOpen, setIsSignInOpen]);


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
        <Dialog open={isVerifyOpen} onOpenChange={() => setIsVerifyOpen(!isVerifyOpen)} >
            <DialogContent className="sm:max-w-[370px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Verify Your Account</DialogTitle>
                </DialogHeader>
                <div>
                    <div className='w-full flex items-center justify-center mt-2'>
                        <div className='w-20 h-20 rounded-full bg-[#497df2] flex items-center justify-center'>
                            <Verified size={40} />
                        </div>
                    </div>
                    <div className='m-auto flex items-center justify-around mt-6'>
                        {Object.keys(verifyNumber).map((key, index) => (
                            <input
                                type='number'
                                key={key}
                                ref={inputRefs[index]}
                                className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center font-Poppins outline-none text-center ${invalidError ? "shake border-red-500" : "dark:border-white border-[#00000042]"}`}
                                placeholder=''
                                maxLength={1}
                                minLength={1}
                                max={1}
                                value={verifyNumber[key as keyof TVerificationNumber]}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        ))}
                    </div>
                    <div className='w-full flex justify-center mt-6'>
                        <Button onClick={verificationHandler}>Verify OTP</Button>
                    </div>
                    <h5 className='text-center pt-4 font-Poppins text-[14px]'>
                        Go back to sign in
                        <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setIsVerifyOpen(false)}>Sign In</span>
                    </h5>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VerifyModel;
