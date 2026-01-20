"use client"
import { useRef, useCallback } from 'react';

/**
 * Custom hook for throttling a function call
 * @param callback The function to throttle
 * @param delay The delay in milliseconds
 * @param options Configuration options (leading: whether to execute on the leading edge)
 * @returns The throttled function
 */
function useThrottle<T extends (...args: any[]) => any>(
    callback: T,
    delay: number,
    options: { leading?: boolean } = { leading: true }
): T {
    const lastRun = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const throttledFunction = useCallback(
        (...args: Parameters<T>) => {
            const now = Date.now();
            const timeSinceLastRun = now - lastRun.current;

            if (options.leading && timeSinceLastRun >= delay) {
                lastRun.current = now;
                callback(...args);
            } else if (!options.leading) {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                    lastRun.current = Date.now();
                    callback(...args);
                }, delay - timeSinceLastRun);
            }
        },
        [callback, delay, options.leading]
    );

    return throttledFunction as T;
}

export default useThrottle;
