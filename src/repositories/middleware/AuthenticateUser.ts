import router from '@/router';

// Services


// Enums
import HttpStatusCode from '@/enums/HttpStatusCode';

// Types
import type { ApiResponse } from '@/types/api';

export default function (response: ApiResponse): ApiResponse {
    if (response.status === HttpStatusCode.UNAUTHORIZED) {
        router.push({ name: 'Login' });
    }

    return response;
}