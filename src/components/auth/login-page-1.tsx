import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOff, Mail, Lock, Chrome, Apple, Facebook } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-linear-to-tr from-sky-200 to-blue-300 px-4 py-22 font-sans">
      <div className="absolute top-0 left-[12%] z-10">
        <p className="text-9xl font-extrabold text-white opacity-30">
          Habits and
        </p>
      </div>

      {/* Main Container */}
      <div className="z-20 flex min-h-175 w-full max-w-5xl overflow-hidden rounded-[40px] bg-white shadow-2xl">
        {/* Left Side: Form */}
        <div className="flex w-full flex-col p-12 md:p-20 lg:w-3/5">
          <div className="mb-12">
            <h1 className="text-xl font-bold text-gray-800">Habo</h1>
            <p className="text-xs text-gray-400">Orely.co</p>
          </div>

          <div className="mb-10 space-y-2">
            <p className="text-2xl font-medium">Habits and Activities</p>
            <h2 className="text-4xl font-semibold">Welcome Back, Habo!</h2>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email/Username
              </Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  placeholder="Email Address or Username"
                  className="rounded-full border-gray-300 bg-white py-6 pl-12 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="rounded-full border-gray-300 bg-white py-6 pl-12 focus-visible:ring-blue-500"
                />
                <EyeOff className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400" />
              </div>
            </div>

            <div className="flex justify-start">
              <button
                type="button"
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <Button className="w-full rounded-full bg-[#5D78F0] py-7 text-lg font-bold tracking-wide uppercase shadow-lg shadow-blue-200 hover:bg-[#4A63D8]">
              Log In
            </Button>
          </form>

          {/* Social Logins */}
          <div className="mt-10">
            <div className="relative mb-8 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200"></span>
              </div>
              <span className="relative bg-white px-4 text-sm font-medium text-gray-500">
                Or log in with
              </span>
            </div>

            <div className="flex justify-center gap-6">
              <div className="cursor-pointer rounded-xl border p-3 transition-colors hover:bg-gray-50">
                <Chrome className="h-6 w-6 text-gray-700" />
              </div>
              <div className="cursor-pointer rounded-xl border p-3 transition-colors hover:bg-gray-50">
                <Apple className="h-6 w-6 fill-current text-gray-700" />
              </div>
              <div className="cursor-pointer rounded-xl border p-3 transition-colors hover:bg-gray-50">
                <Facebook className="h-6 w-6 fill-current text-blue-600" />
              </div>
            </div>
          </div>

          <p className="mt-auto text-center text-sm font-medium text-gray-500">
            Don't have an account?{" "}
            <span className="cursor-pointer text-gray-400 hover:underline">
              Sign up here.
            </span>
          </p>
        </div>

        {/* Right Side: Illustration */}
        <div className="relative hidden w-2/5 lg:block">
          <img
            src="/urban-park-runner-illustration.png"
            alt="Person running in park"
            className="h-full w-full object-cover"
          />
          {/* If using the image exactly as provided, the blue border is part of the image container */}
          <div className="pointer-events-none absolute inset-0 border-l-12 border-[#89CFF0]/20"></div>
        </div>
      </div>
    </div>
  );
}
