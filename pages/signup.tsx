import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function Signup() {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false); // Track loading state
  const methods = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const { navigateTo } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true); // Start loading
    await signUp(data.firstName, data.lastName, data.email, data.password);
    setLoading(false); // Stop loading
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
      <Form {...methods}>
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
          <h1 className="mb-4 text-center text-3xl font-bold">
            Create an account
          </h1>
          <p className="mb-6 text-center text-gray-500">
            By creating an account, you will be able to join CinemaVault!
          </p>
          <div className="w-full max-w-md">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-2">First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="authInput !important bg-gray-300 py-5 focus:bg-gray-200"
                        style={{
                          outline: "none",
                          boxShadow: "none",
                        }}
                        placeholder="Enter your first name"
                        {...field}
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                      />
                    </FormControl>
                    <FormMessage className="text-orange-500">
                      {errors.firstName?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-2">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        className="authInput !important bg-gray-300 py-5 focus:bg-gray-200"
                        style={{
                          outline: "none",
                          boxShadow: "none",
                        }}
                        placeholder="Enter your last name"
                        {...field}
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                      />
                    </FormControl>
                    <FormMessage className="text-orange-500">
                      {errors.lastName?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="authInput !important bg-gray-300 py-5 focus:bg-gray-200"
                      style={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                      placeholder="example@website.com"
                      {...field}
                      {...register("email", { required: "Email is required" })}
                    />
                  </FormControl>
                  <FormMessage className="text-orange-500">
                    {errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="authInput !important bg-gray-300 py-5 focus:bg-gray-200"
                      style={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                      placeholder="Enter your password"
                      {...field}
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </FormControl>
                  <FormMessage className="text-orange-500">
                    {errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4 flex w-full max-w-md text-sm">
            <input type="checkbox" className="mr-2" />
            <span>
              I agree to the <strong>Terms of Service</strong> and{" "}
              <strong>Privacy Policy</strong>
            </span>
          </div>
          <button
            type="submit"
            className="mt-6 flex w-full max-w-md items-center justify-center rounded-md bg-black py-3 text-white hover:bg-[#1e232999]"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Create account"
            )}
          </button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <a
              onClick={() => navigateTo("/login")}
              className="cursor-pointer text-[#1e90ff] underline-offset-2 hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default Signup;
