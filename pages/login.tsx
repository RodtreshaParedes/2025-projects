import Head from "next/head";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

function Login() {
  return (
    <div className="relative flex h-screen w-screen">
      <Head>
        <title>CinemaVault</title>
      </Head>
      <div className="relative hidden w-1/2 md:flex">
        <Image
          src="/auth.jpg"
          alt="Auth Image"
          layout="fill"
          objectFit="cover"
          className="rounded-4xl px-2 py-2"
        />
        <div className="absolute left-10 top-10 flex items-center text-white">
          <h2 className="text-xl font-light">A WISE QUOTE</h2>
          <div className="w-25 ml-5 h-0.5 rounded-full bg-white"></div>{" "}
        </div>
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="cantata-one text-4xl font-bold">Life Is Too Short</h1>
          <p className="mt-2 font-light">
            Don&apos;t waste your time on negative people. Focus on those who
            uplift and inspire you.
          </p>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center p-8 sm:p-16 md:w-1/2">
        <div className="absolute top-0 flex items-center justify-center p-8">
          <div className="flex items-center justify-center">
            <Image
              src="/cinemavault.png"
              alt="Main Logo"
              width={70}
              height={70}
            />
          </div>
        </div>
        <div className="mb-8 flex justify-end"></div>
        <h1 className="cantata-one mb-4 text-3xl font-bold">Welcome Back</h1>
        <p className="mb-6 text-center font-light text-gray-600">
          Enter your email and password to access your account.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="authInput" // Added focus styles
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="authInput" // Added focus styles
        />
        <div className="mb-6 flex w-full items-center justify-between md:w-[30vw]">
          <label className="flex items-center font-light">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="font-light text-blue-500">
            Forgot Password
          </a>
        </div>
        <button
          className="mb-4 w-full rounded-md bg-black py-3 text-white transition-colors duration-200 hover:bg-gray-800 md:w-[30vw]" // Added hover effect
        >
          Sign In
        </button>
        <button
          className="flex w-full items-center justify-center rounded-md border border-gray-300 py-3 transition-colors duration-200 hover:bg-gray-100 md:w-[30vw]" // Added hover effect
        >
          <FcGoogle // Replace with your Google logo
            width={30}
            height={30}
            className="mr-2"
          />
          Sign In with Google
        </button>
        <div className="mt-6 text-center font-light">
          <p>
            Don&apos;t have an account?{" "}
            <a href="#" className="text-blue-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
