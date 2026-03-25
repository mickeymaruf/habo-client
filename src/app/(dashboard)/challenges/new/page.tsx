import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CreateChallengeForm from "./_components/create-challenge-form";

export default function CreateChallengePage() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Back Button */}
      <Link href="/challenges">
        <button className="mb-6 flex cursor-pointer items-center gap-2 font-bold text-black duration-200 hover:-translate-x-2">
          <ArrowLeft className="h-5 w-5" /> Back
        </button>
      </Link>

      <div className="rounded-4xl bg-white px-6 py-8">
        <div className="mb-10 space-y-2">
          <h1 className="text-3xl font-bold text-black">New Challenge</h1>
          <p className="text-gray-700">
            Define a habit and invite others to join you.
          </p>
        </div>

        <CreateChallengeForm />
      </div>
    </div>
  );
}
