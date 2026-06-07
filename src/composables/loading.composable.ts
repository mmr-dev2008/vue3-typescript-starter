import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';

interface UseLoading {
    isLoading: ComputedRef<boolean>,
    startLoading: () => void,
    endLoading: () => void,
    startFakeLoading: (delay?: number) => Promise<true>
}

export function useLoading(): UseLoading {
    const loading: Ref<number> = ref(0);
    const isLoading: ComputedRef<boolean> = computed(() => loading.value > 0);

    function startLoading(): void {
        loading.value++;
    }

    function endLoading(): void {
        loading.value--;
    }

    function startFakeLoading(delay: number = 500): Promise<true> {
        startLoading();

        return new Promise<true>(function (resolve): void {
            setTimeout(function () {
                endLoading();
                resolve(true);
            }, delay);
        });
    }

    return {
        isLoading,
        startLoading,
        endLoading,
        startFakeLoading
    };
}
