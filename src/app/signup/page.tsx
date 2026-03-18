import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import SignupForm from "@/components/auth/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen w-full">
      <div className="absolute top-0 left-[12%] z-10">
        <p className="text-9xl font-extrabold text-white opacity-30">
          Habits and
        </p>
      </div>

      {/* Left Side: Form */}
      <div className="w-4/6 overflow-hidden bg-linear-to-tr from-[#BFDAE6] to-[#A9D9E7] p-24 pr-0">
        <div className="relative ml-auto flex h-full max-h-225 max-w-7xl flex-col overflow-hidden rounded-l-[30px] bg-white/80 p-12 shadow-2xl md:p-20">
          <div className="z-40 max-w-md">
            <div className="mb-12">
              <h1 className="text-xl font-bold">Habo</h1>
              <p className="text-xs text-gray-400">Orely.co</p>
            </div>

            <div className="mb-10 space-y-2">
              <p className="text-2xl font-medium">Start your journey</p>
              <h2 className="text-4xl font-semibold">Create your account</h2>
            </div>

            <SignupForm />

            {/* Social Signups */}
            <div className="mt-10">
              <div className="relative mb-8 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200"></span>
                </div>
                <span className="relative px-4 text-sm font-medium text-gray-500">
                  Or sign up with
                </span>
              </div>

              <div className="flex justify-center gap-6">
                <div className="cursor-pointer rounded-xl border p-3 transition-colors hover:bg-gray-50">
                  <FcGoogle className="h-6 w-6" />
                </div>
                <div className="cursor-pointer rounded-xl border p-3 transition-colors hover:bg-gray-50">
                  <FaApple className="h-6 w-6 text-gray-700" />
                </div>
                <div className="cursor-pointer rounded-xl border p-3 transition-colors hover:bg-gray-50">
                  <FaFacebookF className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="cursor-pointer text-gray-500 hover:underline"
              >
                Log in here.
              </Link>
            </p>
          </div>

          <div className="absolute top-1/2 right-0 z-10 h-100 w-100 translate-x-2/6 -translate-y-1/2 rounded-full bg-orange-200/40 blur-3xl"></div>
          <div className="absolute top-0 left-0 z-10 h-100 w-100 rounded-full bg-white blur-3xl"></div>
        </div>
      </div>

      {/* Right Side: Illustration */}
      <div className="relative hidden w-2/6 bg-linear-to-br from-[#52A8E1] to-[#76CAD0] p-24 pl-0 lg:block">
        <div className="h-full max-h-225 w-100">
          <img
            src="/urban-park-runner-illustration.png"
            alt="Person running in park"
            className="h-full rounded-r-[30px] object-cover"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 border-l-12 border-[#89CFF0]/20"></div>
      </div>
    </div>
  );
}
