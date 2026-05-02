import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddToCartApi, DeleteAllCartItemsApi, DeleteCartItemApi, GetCartListApi, UpdateCartItemApi } from "./CartApi";
import { CartResponse } from "./types";



// Get Cart List
export const useGetCartList = () => {
    return useQuery<CartResponse>({

        queryKey: ["cart-list"],

        queryFn: async () => {

            return await GetCartListApi() as CartResponse;

        },

        staleTime: 0,

    });

};




// Add to Cart
export const useAddToCart = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await AddToCartApi(data);

        },

        onSuccess: (data) => {

            queryClient.invalidateQueries({ queryKey: ["cart-list"] });

            toast.success(data?.message || "Added to cart successfully!");

        },

        onError: (error: any) => {

            toast.error(error?.message || "Failed to add to cart");

        }

    });

};




// Delete Cart Item
export const useDeleteCartItem = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ cart_item_id, product_type }: { cart_item_id: string, product_type: string }) => {

            return await DeleteCartItemApi(cart_item_id, product_type);

        },

        onSuccess: (data) => {

            queryClient.invalidateQueries({ queryKey: ["cart-list"] });
            toast.success(data?.message || "Item removed from cart");

        },

        onError: (error: any) => {

            toast.error(error?.message || "Failed to remove item");

        }

    });

};




// Update Cart Item
export const useUpdateCartItem = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await UpdateCartItemApi(data);

        },

        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["cart-list"] });

        },

        onError: (error: any) => {

            toast.error(error?.message || "Failed to update cart");

        }

    });

};



// Delete All Cart Items
export const useDeleteAllCartItems = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async () => {

            return await DeleteAllCartItemsApi();

        },

        onSuccess: (data) => {

            queryClient.invalidateQueries({ queryKey: ["cart-list"] });
            toast.success(data?.message || "Cart cleared");

        },

        onError: (error: any) => {

            toast.error(error?.message || "Failed to clear cart");

        }

    });

};
