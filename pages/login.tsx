import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

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
        <div className="absolute left-10 top-10 flex items-center text-gray-900">
          <h2 className="text-xl font-light">A WISE QUOTE</h2>
          <div className="w-25 ml-5 h-0.5 rounded-full bg-[#101828]"></div>
        </div>
        <div className="absolute bottom-10 left-10 text-gray-900">
          <h1 className="abril-fatface-regular text-4xl font-bold tracking-wider">
            Life Is Too Short
          </h1>
          <p className="mt-2 font-light">
            Don&apos;t waste your time on negative people. Focus on those who
            uplift and inspire you.
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full flex-col items-center justify-center p-8 sm:p-16 md:w-1/2"
      >
        <div className="absolute top-0 flex items-center p-8">
          <Image
            src="/cinemavault.png"
            alt="Main Logo"
            width={70}
            height={70}
          />
        </div>

        {/* Centered content */}
        <div className="flex w-full flex-col items-center">
          <h1 className="abril-fatface-regular mb-4 text-center text-3xl font-bold tracking-wider">
            Welcome Back
          </h1>
          <p className="mb-6 text-center font-light text-gray-600">
            Enter your email and password to access your account.
          </p>

          {/* Inputs and error messages */}
          <div className="w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="authInput w-full"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div className="mt-1 text-left">
                <span className="block p-1 text-[13px] font-light text-[#FFA500]">
                  This field is required
                </span>
              </div>
            )}

            <input
              type="password"
              placeholder="Enter your password"
              className="authInput mt-4 w-full"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <div className="mt-1 text-left">
                <span className="block p-1 text-[13px] font-light text-[#FFA500]">
                  This field is required
                </span>
              </div>
            )}
          </div>

          {/* Remember me and Forgot Password */}
          <div className="mb-6 mt-2 flex w-full max-w-md items-center justify-between">
            <label className="flex items-center font-light">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="font-light text-[#1e90ff]">
              Forgot Password
            </a>
          </div>

          {/* Buttons */}
          <button className="mb-4 w-full max-w-md rounded-md bg-black py-3 text-white transition-colors duration-200 hover:bg-[#1e232999]">
            Sign In
          </button>
          <button
            onClick={() => setLogin(true)}
            className="flex w-full max-w-md items-center justify-center rounded-md border border-gray-300 py-3 transition-colors duration-200 hover:bg-gray-100"
          >
            <FcGoogle width={30} height={30} className="mr-2" />
            Sign In with Google
          </button>

          {/* Signup Link */}
          <div className="mt-6 text-center font-light">
            <p>
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="underline-offset-6 text-[#1e90ff] hover:underline"
                onClick={() => setLogin(false)}
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
