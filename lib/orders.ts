import { supabase } from "./supabase";
import { nanoid } from "nanoid";

export type OrderStatus = "pending" | "completed" | "failed" | "refunded";

export interface Order {
    id?: number; // BigInt ID from Supabase
    order_id: string; // e.g., ORD-XXXX-XXXX
    stripe_session_id: string;
    customer_email: string;
    product_id: string; // The string product_id (identifier)
    product_ref_id?: number; // Internal BigInt ID from products table
    amount_total: number;
    currency: string;
    status: OrderStatus;
    created_at?: string;
}

export interface DownloadToken {
    id?: number; // BigInt ID from Supabase
    token: string; // Token UUID
    order_id: string;
    order_ref_id?: number; // Internal BigInt ID from orders table
    customer_email: string;
    product_id: string;
    product_ref_id?: number; // Internal BigInt ID from products table
    expires_at: string;
    consumed_at: string | null;
}

export function generateOrderId(): string {
    // ORD-XXXX-XXXX
    return `ORD-${nanoid(4).toUpperCase()}-${nanoid(4).toUpperCase()}`;
}

export async function createOrder(orderData: Omit<Order, "created_at">) {
    const {data, error} = await supabase
        .from("orders")
        .insert([orderData])
        .select()
        .single();

    if (error) {
        console.error("Error creating order:", error);
        throw error;
    }

    return data;
}

export async function createDownloadToken(
    orderId: string,
    email: string,
    productId: string,
    orderRefId?: number,
    productRefId?: number
) {
    const tokenUuid = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 6);

    const {data, error} = await supabase
        .from("download_tokens")
        .insert([{
            token: tokenUuid,
            order_id: orderId,
            order_ref_id: orderRefId,
            customer_email: email,
            product_id: productId,
            product_ref_id: productRefId,
            expires_at: expiresAt.toISOString(),
        }])
        .select()
        .single();

    if (error) {
        console.error("Error creating download token:", error);
        throw error;
    }

    return data;
}

export async function validateAndConsumeToken(tokenValue: string) {
    const {data, error} = await supabase
        .from("download_tokens")
        .select("*")
        .eq("token", tokenValue)
        .single();

    if (error || !data) {
        console.log(`⚠️ Token validation failed: not found | Token: ${tokenValue}`);
        return null;
    }

    if (data.consumed_at) {
        console.log(`⚠️ Token already consumed | Token: ${tokenValue}`);
        return null;
    }

    if (new Date() > new Date(data.expires_at)) {
        console.log(`⚠️ Token expired | Token: ${tokenValue}`);
        return null;
    }

    // Mark as consumed
    const {error: updateError} = await supabase
        .from("download_tokens")
        .update({consumed_at: new Date().toISOString()})
        .eq("token", tokenValue);

    if (updateError) {
        console.error("Error consuming token:", updateError);
        return null;
    }

    return data;
}
