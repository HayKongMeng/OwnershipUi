"use client";

import { useEffect } from 'react';
import { useState } from "react";
import { AppIcon } from "./components/app-icon";
import LoginPopup from "./components/components/LoginPopup";
import Meng from "./components/app-icon/meng.jpg"
import Hong from "./components/app-icon/hong.jpg"
import Dalen from "./components/app-icon/dalen.jpg"
import Illustration from "./components/app-icon/Illustration.svg"
import MultipleAsset from "./components/app-icon/multipleAsset.svg"
import Decentrailize from "./components/app-icon/decentrailize.svg"
import RealTime from "./components/app-icon/realTime.svg"
import UserFriendly from "./components/app-icon/userFriendly.svg"
import PowerAsset from "./components/app-icon/powerAsset.svg"
import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function IndexPage() {
  const router = useRouter();
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,
    });
    AOS.refresh();
  }, []);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const { data: session } = useSession();
  const handleLoginClick = () => {
    if (session) {
      console.log("session", session)
      if(session.user.role == "ADMIN")
        router.push("/admin/dashboard");
      else
        router.push("/user/asset");
    } else {
      setIsLoginVisible(true);
    }
  };
  const closeLogin = () => {
    setIsLoginVisible(false);
  };

  return (
    <>
      <nav className="mx-auto bg-white border-gray-200 dark:bg-gray-900 max-w-[1024px]">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto py-4">
          {/* Logo and Title Section */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <AppIcon />
            <div>
              <span style={{ color: "#151D48", fontWeight: 'bold' }}>OWNER</span>
              <span style={{ color: "#4B68FF", fontWeight: 'bold', width: "100px" }}>SHIP</span>
            </div>
          </div>

          {/* Menu and Login Button Section */}
          <div className="flex items-center space-x-4 md:space-x-8 rtl:space-x-reverse">
            {/* Navigation Links */}
            <ul className="hidden mb-0 md:flex flex-row font-medium space-x-4 rtl:space-x-reverse md:space-x-8">
              <li>
                <a href="#feature" className="text-[#4b68ff] font-bold dark:text-blue-500 hover:text-blue-800">
                  Feature
                </a>
              </li>
              <li>
                <a href="#member"
                  className="text-[#273240] font-bold dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
                  Member
                </a>
              </li>
              <li>
                <a href="#about-us"
                  className="text-[#273240] font-bold dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
                  About us
                </a>
              </li>
            </ul>
            {/* Login Button */}
            <button
              onClick={handleLoginClick}
              type="button"
              className="font-bold px-10 py-3 text-white bg-[#4b68ff] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md text-sm  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
            {/* Mobile Menu Toggle */}
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className={"bg-gray-50"}>
        <div id="about-us"
          className="flex items-center justify-between max-w-[1024px] mx-auto py-16 my-auto">
          <div className="max-w-lg text-left">
            <h1 className="text-4xl font-semibold text-gray-800 leading-[1.5]">
              <span className="text-blue-600">Ownership</span> offers secure, transparent asset management for
              efficient operations.
            </h1>
          </div>

          <div className="hidden md:block">
            <Image src={Illustration} className="w-72 h-auto" alt="test" />
          </div>
        </div>
      </div>


      <div className="mt-10" id="feature">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl text-[#4d4d4d] font-bold  leading-tight">
            Ownership featuring bring you
          </h1>
          <h1 className="text-3xl text-[#4d4d4d] font-bold  leading-tight">
            to digital management
          </h1>
          <p className="text-xs font-thin leading-relaxed text-[#8f8f8f]">
            Who is Ownership suitable for?
          </p>
        </div>
        <div className="flex justify-center items-center gap-5 mt-5" data-aos="fade-up-right" data-aos-duration="2500">
          <div className="max-w-96 w-72 h-48 border border-[#b7c8c87d] rounded-xl p-5 pb-7 hover:scale-105 duration-150 ease-in-out">
            <Image src={MultipleAsset} alt="" className="w-10 h-auto" />
            <h1 className="text-xl font-medium text-[#061c3d] mt-3">Multiple Asset Support</h1>
            <p className="text-xs font-thin text-[#687589]">Manage and transfer a wide range of assets
              including real estate, digital goods, intellectual
              property, and more.</p>
          </div>
          <div className="max-w-96 w-72 h-48 border border-[#b7c8c87d] rounded-xl p-5 pb-7 hover:scale-105 duration-150 ease-in-out">
            <Image src={Decentrailize} alt="" className="w-10 h-auto" />
            <h1 className="text-xl font-medium text-[#061c3d] mt-3">Decentralized Identity and
              Privacy Control</h1>
            <p className="text-xs font-thin text-[#687589]">Give users control over their personal data and
              ownership identity with decentralized identity
              features.</p>
          </div>
          <div className="max-w-96 w-72 h-48 border border-[#b7c8c87d] rounded-xl p-5 pb-7 shadow-xl  hover:scale-105 duration-150 ease-in-out ">
            <Image src={RealTime} alt="" className="w-10 h-auto" />
            <h1 className="text-xl font-medium text-[#061c3d] mt-3">Real-Time Verification</h1>
            <p className="text-xs font-thin text-[#687589]">Instantly verify the authenticity and ownership
              of any asset with blockchain-backed proof.</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 mt-10 " data-aos="fade-up-left" data-aos-duration="2500">
          <div className="max-w-96 w-72 h-48 border border-[#b7c8c87d] rounded-xl p-5 pb-7 shadow-xl hover:scale-105 duration-150 ease-in-out">
            <Image src={UserFriendly} alt="" className="w-10 h-auto " />
            <h1 className="text-xl font-medium text-[#061c3d] mt-3">User-Friendly Interface</h1>
            <p className="text-xs font-thin text-[#687589]">Easily manage, transfer, and verify ownership
              with an intuitive, user-centric design.</p>
          </div>
          <div className="max-w-96 w-72  h-48 border border-[#b7c8c87d] rounded-xl p-5 pb-7 shadow-xl hover:scale-105 duration-150 ease-in-out">
            <Image src={PowerAsset} alt="" className="w-10 h-auto" />
            <h1 className="text-xl font-medium text-[#061c3d] mt-3">Powered Asset Ownership</h1>
            <p className="text-xs font-thin text-[#687589]">Ensure secure, transparent, and decentralized
              ownership records for all types of assets.</p>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-[#f5f7fa] pt-10" id="member">
        <div className="mb-14">
          <h1 className="text-4xl font-bold text-center text-[#061c3d]">
            Ownership high-skilled team member
          </h1>
        </div>
        <div className="flex justify-center items-center gap-7 pb-20" data-aos="fade-up" data-aos-duration="3000" >
          <div className="max-w-96 w-56 h-60 bg-white p-[1px] rounded-2xl">
            <div className="mb-5 leading-loose">
              <div className="relative overflow-hidden rounded-2xl w-20 h-20 m-auto mt-7">
                <Image
                  src={Meng}
                  alt=""
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <h1 className="text-center font-bold">Hay Kongmeng</h1>
              <p className="text-center text-xs">Backend Developer</p>
            </div>
            <hr />
            <div className="flex justify-center items-center gap-3 mt-[5%]">

              {/* Telegram icon  */}
              <a href="https://t.me/KongMeng_Hay" target="_blank"><svg className="hover:scale-110 duration-150 ease-in-out" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M21.1011 4.61455C21.3585 4.5062 21.6403 4.46884 21.917 4.50634C22.1938 4.54383 22.4554 4.65483 22.6747 4.82776C22.894 5.00069 23.063 5.22925 23.164 5.48963C23.265 5.75002 23.2943 6.03271 23.249 6.3083L20.8865 20.6385C20.6573 22.0208 19.1407 22.8135 17.873 22.125C16.8125 21.5489 15.2375 20.6614 13.8209 19.7354C13.1125 19.2718 10.9428 17.7875 11.2094 16.7312C11.4386 15.8281 15.0844 12.4343 17.1678 10.4166C17.9855 9.62392 17.6125 9.16663 16.6469 9.8958C14.249 11.7062 10.399 14.4593 9.12609 15.2343C8.00317 15.9177 7.41775 16.0343 6.71775 15.9177C5.44067 15.7052 4.2563 15.376 3.28963 14.975C1.98338 14.4333 2.04692 12.6375 3.28859 12.1145L21.1011 4.61455Z" fill="#50508F" />
              </svg></a>

              {/* Email icon  */}
              <a href="mailto:hkongmeng50@gmail.com" target="_blank"><svg className="hover:scale-110 duration-150 ease-in-out" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3335 8.33329L13.0002 13.5416L4.66683 8.33329V6.24996L13.0002 11.4583L21.3335 6.24996M21.3335 4.16663H4.66683C3.51058 4.16663 2.5835 5.09371 2.5835 6.24996V18.75C2.5835 19.3025 2.80299 19.8324 3.19369 20.2231C3.58439 20.6138 4.1143 20.8333 4.66683 20.8333H21.3335C21.886 20.8333 22.4159 20.6138 22.8066 20.2231C23.1973 19.8324 23.4168 19.3025 23.4168 18.75V6.24996C23.4168 5.69742 23.1973 5.16752 22.8066 4.77682C22.4159 4.38612 21.886 4.16663 21.3335 4.16663Z" fill="#50508F" />
              </svg></a>

              {/* facebook icon  */}
              <a href="https://www.facebook.com/Meng0000.Cc" target="_blank"> <svg className="hover:scale-110 duration-150 ease-in-out" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.4168 12.5C23.4168 6.75004 18.7502 2.08337 13.0002 2.08337C7.25016 2.08337 2.5835 6.75004 2.5835 12.5C2.5835 17.5417 6.16683 21.7396 10.9168 22.7084V15.625H8.8335V12.5H10.9168V9.89587C10.9168 7.88546 12.5522 6.25004 14.5627 6.25004H17.1668V9.37504H15.0835C14.5106 9.37504 14.0418 9.84379 14.0418 10.4167V12.5H17.1668V15.625H14.0418V22.8646C19.3022 22.3438 23.4168 17.9063 23.4168 12.5Z" fill="#50508F" />
              </svg></a>

            </div>
          </div>
          <div className="max-w-96 w-56 h-60 bg-white p-[1px] rounded-2xl">
            <div className="mb-5 leading-loose">
              <div className="relative overflow-hidden rounded-2xl w-20 h-20 m-auto mt-7">
                <Image
                  src={Hong}
                  alt=""
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <h1 className="text-center font-bold">Thon Rithyhong</h1>
              <p className="text-center text-xs">Front-end Developer</p>
            </div>
            <hr />
            <div className="flex justify-center items-center gap-3 mt-[5%]">

              {/* Telegram icon  */}
              <a href="https://t.me/RithyhongT" target="_blank"><svg className="hover:scale-110 duration-150 ease-in-out" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M21.1011 4.61455C21.3585 4.5062 21.6403 4.46884 21.917 4.50634C22.1938 4.54383 22.4554 4.65483 22.6747 4.82776C22.894 5.00069 23.063 5.22925 23.164 5.48963C23.265 5.75002 23.2943 6.03271 23.249 6.3083L20.8865 20.6385C20.6573 22.0208 19.1407 22.8135 17.873 22.125C16.8125 21.5489 15.2375 20.6614 13.8209 19.7354C13.1125 19.2718 10.9428 17.7875 11.2094 16.7312C11.4386 15.8281 15.0844 12.4343 17.1678 10.4166C17.9855 9.62392 17.6125 9.16663 16.6469 9.8958C14.249 11.7062 10.399 14.4593 9.12609 15.2343C8.00317 15.9177 7.41775 16.0343 6.71775 15.9177C5.44067 15.7052 4.2563 15.376 3.28963 14.975C1.98338 14.4333 2.04692 12.6375 3.28859 12.1145L21.1011 4.61455Z" fill="#50508F" />
              </svg></a>

              {/* Email icon  */}
              <a href="mailto:rithyhong8998@gmail.com" target="_blank"><svg className="hover:scale-110 duration-150 ease-in-out" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3335 8.33329L13.0002 13.5416L4.66683 8.33329V6.24996L13.0002 11.4583L21.3335 6.24996M21.3335 4.16663H4.66683C3.51058 4.16663 2.5835 5.09371 2.5835 6.24996V18.75C2.5835 19.3025 2.80299 19.8324 3.19369 20.2231C3.58439 20.6138 4.1143 20.8333 4.66683 20.8333H21.3335C21.886 20.8333 22.4159 20.6138 22.8066 20.2231C23.1973 19.8324 23.4168 19.3025 23.4168 18.75V6.24996C23.4168 5.69742 23.1973 5.16752 22.8066 4.77682C22.4159 4.38612 21.886 4.16663 21.3335 4.16663Z" fill="#50508F" />
              </svg></a>

              {/* facebook icon  */}
              <a href="https://www.facebook.com/Rithyhong.T/" target="_blank"> <svg className="hover:scale-110 duration-150 ease-in-out" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.4168 12.5C23.4168 6.75004 18.7502 2.08337 13.0002 2.08337C7.25016 2.08337 2.5835 6.75004 2.5835 12.5C2.5835 17.5417 6.16683 21.7396 10.9168 22.7084V15.625H8.8335V12.5H10.9168V9.89587C10.9168 7.88546 12.5522 6.25004 14.5627 6.25004H17.1668V9.37504H15.0835C14.5106 9.37504 14.0418 9.84379 14.0418 10.4167V12.5H17.1668V15.625H14.0418V22.8646C19.3022 22.3438 23.4168 17.9063 23.4168 12.5Z" fill="#50508F" />
              </svg></a>

            </div>
          </div>
          <div className="max-w-96 w-56 h-60 bg-white p-[1px] rounded-2xl">
            <div className="mb-5 leading-loose">
              <div className="relative overflow-hidden rounded-2xl w-20 h-20 m-auto mt-7">
                <Image
                  src={Dalen}
                  alt=""
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <h1 className="text-center font-bold">Phea Dalen</h1>
              <p className="text-center text-xs">Backend Developer</p>
            </div>
            <hr />
            <div className="flex justify-center items-center gap-3 mt-[5%]">

              {/* Telegram icon  */}
              <a href="https://t.me/dear0011" target="_blank"><svg className="hover:scale-110 duration-150 ease-in-out" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M21.1011 4.61455C21.3585 4.5062 21.6403 4.46884 21.917 4.50634C22.1938 4.54383 22.4554 4.65483 22.6747 4.82776C22.894 5.00069 23.063 5.22925 23.164 5.48963C23.265 5.75002 23.2943 6.03271 23.249 6.3083L20.8865 20.6385C20.6573 22.0208 19.1407 22.8135 17.873 22.125C16.8125 21.5489 15.2375 20.6614 13.8209 19.7354C13.1125 19.2718 10.9428 17.7875 11.2094 16.7312C11.4386 15.8281 15.0844 12.4343 17.1678 10.4166C17.9855 9.62392 17.6125 9.16663 16.6469 9.8958C14.249 11.7062 10.399 14.4593 9.12609 15.2343C8.00317 15.9177 7.41775 16.0343 6.71775 15.9177C5.44067 15.7052 4.2563 15.376 3.28963 14.975C1.98338 14.4333 2.04692 12.6375 3.28859 12.1145L21.1011 4.61455Z" fill="#50508F" />
              </svg></a>

              {/* Email icon  */}
              <a href="mailto:dalensophea34@gmail.com" target="_blank"><svg className="hover:scale-110 duration-150 ease-in-out" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3335 8.33329L13.0002 13.5416L4.66683 8.33329V6.24996L13.0002 11.4583L21.3335 6.24996M21.3335 4.16663H4.66683C3.51058 4.16663 2.5835 5.09371 2.5835 6.24996V18.75C2.5835 19.3025 2.80299 19.8324 3.19369 20.2231C3.58439 20.6138 4.1143 20.8333 4.66683 20.8333H21.3335C21.886 20.8333 22.4159 20.6138 22.8066 20.2231C23.1973 19.8324 23.4168 19.3025 23.4168 18.75V6.24996C23.4168 5.69742 23.1973 5.16752 22.8066 4.77682C22.4159 4.38612 21.886 4.16663 21.3335 4.16663Z" fill="#50508F" />
              </svg></a>

              {/* facebook icon  */}
              <a href="https://www.facebook.com/dear.E009" target="_blank"> <svg className="hover:scale-110 duration-150 ease-in-out" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.4168 12.5C23.4168 6.75004 18.7502 2.08337 13.0002 2.08337C7.25016 2.08337 2.5835 6.75004 2.5835 12.5C2.5835 17.5417 6.16683 21.7396 10.9168 22.7084V15.625H8.8335V12.5H10.9168V9.89587C10.9168 7.88546 12.5522 6.25004 14.5627 6.25004H17.1668V9.37504H15.0835C14.5106 9.37504 14.0418 9.84379 14.0418 10.4167V12.5H17.1668V15.625H14.0418V22.8646C19.3022 22.3438 23.4168 17.9063 23.4168 12.5Z" fill="#50508F" />
              </svg></a>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#263238]">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <span className="block text-xs font-bold sm:text-center !text-center text-white">
            Copyright © 2024{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Ownership™
            </a>
            .<br />
            <span className="font-thin text-[8px]">All Rights Reserved.</span>
          </span>
        </div>
      </footer>
      {isLoginVisible && <LoginPopup onClose={closeLogin} />}
    </>
  );
}
