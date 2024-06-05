"use client";

import Logout from "@/components/Logout";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function HomePage() {

  const { user } = useAuthContext()
  const router = useRouter()

  const handleClick = () => {
    router.push("/login")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Hannah's Hikes
        </h1>

        { user ? <Logout/> : <button onClick={handleClick}>Log in</button>}
        
      </div>
    </main>
  );
}
