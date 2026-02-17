/**
 * Safe API fetching utilities to prevent build-time failures.
 * Used by server components to gracefully handle API unavailability during builds.
 */

export interface SafeFetchOptions extends RequestInit {
  timeout?: number;
  fallback?: any;
}

/**
 * Safe fetch wrapper that handles errors gracefully
 * Never throws — returns null or fallback value on error
 */
export async function safeFetch<T>(
  url: string,
  options: SafeFetchOptions = {}
): Promise<T | null> {
  const { timeout = 10000, fallback = null, ...fetchOptions } = options;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const res = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`API fetch failed: ${url} - Status ${res.status}`);
      return fallback;
    }

    return res.json() as Promise<T>;
  } catch (error) {
    console.error(`API fetch error for ${url}:`, error instanceof Error ? error.message : String(error));
    return fallback;
  }
}

/**
 * Safe JSON fetch with proper cache headers for ISR
 */
export async function safeFetchJSON<T>(
  url: string,
  revalidateSeconds: number = 60
): Promise<T | null> {
  return safeFetch<T>(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: revalidateSeconds },
    cache: 'default',
  });
}

/**
 * Safe fetch with no cache (always fresh)
 */
export async function safeFetchNoCache<T>(url: string): Promise<T | null> {
  return safeFetch<T>(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
}

/**
 * Resolve dynamic base URL from environment
 */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

/**
 * Resolve API base URL from environment
 */
export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || getBaseUrl();
}
