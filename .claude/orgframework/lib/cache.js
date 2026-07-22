// lib/cache.js — Shared TTL cache utility for orgframework engine modules
// Replaces duplicated cache patterns across similarity/search.js and relationship-map/relationship-map.js.

/**
 * @template T
 * @typedef {{ timestamp: number, data: T | null }} CacheEntry
 */

/**
 * Create a TTL-based cache.
 * @template T
 * @param {number} ttlMs - Cache time-to-live in milliseconds
 * @returns {{ get: () => T | null, set: (data: T) => void, clear: () => void, isValid: () => boolean }}
 */
export function createCache(ttlMs) {
  /** @type {CacheEntry<T>} */
  let entry = { timestamp: 0, data: null };

  return {
    /** Return cached data if still fresh, or null. */
    get() {
      return (entry.data && (Date.now() - entry.timestamp) < ttlMs) ? entry.data : null;
    },

    /** Store data with current timestamp. */
    set(data) {
      entry = { timestamp: Date.now(), data };
    },

    /** Invalidate the cache. */
    clear() {
      entry = { timestamp: 0, data: null };
    },

    /** True if cache holds fresh data. */
    isValid() {
      return entry.data !== null && (Date.now() - entry.timestamp) < ttlMs;
    },
  };
}
