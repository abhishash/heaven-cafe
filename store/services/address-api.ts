import { fetchHandler } from "@/lib/fetch-handler";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const useAddNewAddressMutation = () => {
    const { data: session } = useSession();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (payload: any) => {
            return await fetchHandler({
                endpoint: "add-new-address",
                method: "POST",
                data: payload,
                token: session?.user?.accessToken || "",
            });
        },
    });

    const addNewAddress = async (payload: any) => {
        try {
            const res = await mutateAsync(payload);

            if (res?.status) {
                toast.success(res?.message || "Address added successfully");
                return res?.data;
            } else {
                toast.warning(res?.message || "Failed to add address");
                return null;
            }
        } catch (error) {
            toast.error("Something went wrong");
            return null;
        }
    };

    return [
        addNewAddress,
        { isLoading: isPending },
    ] as const;
};