"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const BackPath = () => {
    const router = useRouter();
    return (
        <Button
          variant="outline"
          className="mb-8 cursor-pointer"
          onClick={() => router.back()}
        >
          ← Back
        </Button>
    )
}

export default BackPath