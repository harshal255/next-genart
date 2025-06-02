/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "@/config";
import { IUser } from "./types";


type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    headers?: Record<string, string> //bsically key-value pair like an obj
}

const baseURL = config.server_url;

class ApiClient {
    private async centralizedFetch<T>(
        endpoint: string,
        options: FetchOptions = {}): Promise<T> {
        const { method = "GET", body = {}, headers = {} } = options;

        const defaultHeaders = {
            "Content-Type": "application/json", ...headers
        }

        const response = await fetch(`${baseURL}/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined
        });
        let json: any = {};
        try {
            json = await response.json();
        } catch (e) {
            json = {
                success: false,
                message: "Invalid response from server",
            };
        }
        return json as T;
    }

    async registerUser(data: IUser) {
        return this.centralizedFetch("/user/register", {
            method: "POST",
            body: data,
        });
    }
    async loginUser(data: IUser) {
        return this.centralizedFetch("/user/login", {
            method: "POST",
            body: data,
        });
    }

    async loadCreditData(token: string) {
        return this.centralizedFetch("/user/credits", {
            method: "POST",
            headers: { token },
        });
    }

    async generateImage(prompt: string, token: string) {
        return this.centralizedFetch("/image/generate-image", {
            method: "POST",
            body: { prompt },
            headers: { token },
        });
    }

    async createRazorpayOrder(planId: string, token: string) {
        return this.centralizedFetch("/user/pay-razor", {
            method: "POST",
            body: { planId },
            headers: {
                token,
            },
        });
    }

    async verifyRazorpayPayment(response: any, token: string) {
        return this.centralizedFetch("/user/verify-razorpay", {
            method: "POST",
            body: response,
            headers: {
                token,
            },
        });
    }
}

export const apiClient = new ApiClient();