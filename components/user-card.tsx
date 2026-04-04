"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserIcon } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserCard() {
  const { data: session } = useSession();
  const router = useRouter();
   const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        await signOut({callbackUrl: "/login" });
    }

  return (
    <HoverCard openDelay={100} closeDelay={150}>
      <HoverCardTrigger asChild>
        <UserIcon
          className="text-primary-foreground cursor-pointer hover:opacity-80 transition"
          size={24}
        />
      </HoverCardTrigger>

      <HoverCardContent className="flex w-64 flex-col gap-2">
        {/* 👤 User Info */}
        <div className="font-semibold">
          {session?.user?.name || "Guest"}
        </div>

        <div className="text-sm text-muted-foreground">
          {session?.user?.email}
        </div>

        {/* 🔥 Logout Button */}
        {session ? (
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full cursor-pointer"
            onClick={()=>router.push("/login")}
          >
            Login
          </Button>}
      </HoverCardContent>
    </HoverCard>
  );
}