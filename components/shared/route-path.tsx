"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const RoutePath = ({href="/menu"}) => {
    const router = useRouter();
    return (
        <Button
          variant="outline"
          className="mb-8 cursor-pointer"
          onClick={() => router.push(href)}
        >
          ← Back
        </Button>
    )
}

export default RoutePath