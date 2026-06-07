import axios from 'axios';

// Enums
import HttpMethod from '@/enums/HttpMethod';

// Types
import type {
    ApiRequestConfig,
    ApiResponseData,
    ApiResponse,
    RequestOnFulfilled,
    ResponseOnFulfilled,
    ResponseOnRejected
} from '@/types/api';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    timeout: Number(import.meta.env.VITE_API_TIMEOUT)
});

class ApiRepository {
    static setHeader(name: string, value: string, method?: HttpMethod): void {
        if (method === undefined) {
            instance.defaults.headers.common[name] = value;
            return;
        }

        (instance.defaults.headers as unknown as Record<HttpMethod, Record<string, string>>)[method][name] = value;
    }

    static deleteHeader(name: string, method?: HttpMethod): void {
        if (method === undefined) {
            delete instance.defaults.headers.common[name];
            return;
        }

        delete (instance.defaults.headers as unknown as Record<HttpMethod, Record<string, string>>)[method][name];
    }

    static addRequestMiddleware(onFulfilled: RequestOnFulfilled): number {
        return instance.interceptors.request.use(onFulfilled);
    }

    static removeRequestMiddleware(id: number): void {
        instance.interceptors.request.eject(id);
    }

    static addResponseMiddleware(onFulfilled: ResponseOnFulfilled, onRejected?: ResponseOnRejected): number {
        return instance.interceptors.response.use(onFulfilled, onRejected);
    }

    static removeResponseMiddleware(id: number): void {
        instance.interceptors.response.eject(id);
    }

    static request<T = unknown>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
        return instance.request<ApiResponseData<T>>(config);
    }

    static get<T = unknown>(url: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
        return instance.get<ApiResponseData<T>>(url, config);
    }

    static delete<T = unknown>(url: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
        return instance.delete<ApiResponseData<T>>(url, config);
    }

    static post<T = unknown>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
        return instance.post<ApiResponseData<T>>(url, data, config);
    }

    static put<T = unknown>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
        return instance.put<ApiResponseData<T>>(url, data, config);
    }

    static patch<T = unknown>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
        return instance.patch<ApiResponseData<T>>(url, data, config);
    }
}

export default ApiRepository;
