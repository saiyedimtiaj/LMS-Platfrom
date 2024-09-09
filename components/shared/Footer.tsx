import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const date = new Date()

    return (
        <div className='dark:bg-gray-950 border-t bg-gray-100 pt-16 md:pt-20 px-4 font-Poppins'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 md:pb-12'>
                <div>
                    <h1 className='font-medium text-lg text-gray-500'>Office Address</h1>
                    <div className='space-y-2 text-sm mt-5'>
                        <p className='tex-sm'>1234 Elm Street, Suite 567, San Francisco, CA 94102</p>
                        <p className='tex-sm'>Support: support@learningusa.com</p>
                        <p className='tex-sm'>Helpline: (415) 123-4567 , (415) 765-4321</p>
                        <p className='tex-sm'>(Available: Mon - Fri, 9:00 AM to 6:00 PM PST)</p>
                    </div>
                </div>
                <div>
                    <h1 className='font-medium text-lg text-gray-500'>Useful Links</h1>
                    <div className='flex flex-col gap-y-2 text-sm mt-5'>
                        <span className='hover:underline cursor-pointer'>Blog</span>
                        <span className='hover:underline cursor-pointer'>Success</span>
                        <span className='hover:underline cursor-pointer'>About us</span>
                        <span className='hover:underline cursor-pointer'>Refund policy</span>
                        <span className='hover:underline cursor-pointer'>Terms and Conditions</span>
                        <span className='hover:underline cursor-pointer'>Privacy & App Privacy Policy</span>
                    </div>
                </div>
                <div>
                    <h1 className='font-medium text-lg text-gray-500'>Follow Us</h1>
                    <div className='space-y-2 text-sm mt-5 flex flex-col'>
                        <div className='flex items-center gap-3'>
                            <span><FaFacebook size={25} className="cursor-pointer" /></span>
                            <span><FaInstagram size={25} className="cursor-pointer" /></span>
                            <span><FaLinkedin size={25} className="cursor-pointer" /></span>
                            <span><FaYoutube size={25} className="cursor-pointer" /></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center py-3">
                Copyright  © {date.getFullYear()} EXPO | All Rights Reserved
            </div>
        </div>
    );
};

export default Footer;
