// Exchange rates from the European Central Bank via frankfurter.dev (free, no key).
// The whole table is fetched once and cached, so currency conversion is instant
// and keeps working offline with the last rates that were seen.
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

import { loadJSON, saveJSON } from './storage';

const CACHE_KEY = 'jc.rates.v1';
const URL = 'https://api.frankfurter.dev/v1/latest?base=EUR';
const STALE_AFTER_MS = 3 * 60 * 60 * 1000;

async function fetchRates() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const res = await fetch(URL, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data || typeof data.rates !== 'object' || !Object.keys(data.rates).length) throw new Error('empty rate table');
    return { rates: data.rates, date: data.date, fetchedAt: Date.now() };
  } finally {
    clearTimeout(timer);
  }
}

// status: 'loading' (nothing to show yet), 'live' (fresh), 'cached' (showing saved
// rates because the refresh failed), 'unavailable' (no rates at all).
export function useRates() {
  const [table, setTable] = useState(null);
  const [status, setStatus] = useState('loading');
  const tableRef = useRef(null);
  const busy = useRef(false);

  const refresh = useCallback(async (force) => {
    if (busy.current) return;
    const current = tableRef.current;
    if (!force && current && Date.now() - current.fetchedAt < STALE_AFTER_MS) return;
    busy.current = true;
    try {
      const fresh = await fetchRates();
      tableRef.current = fresh;
      setTable(fresh);
      setStatus('live');
      saveJSON(CACHE_KEY, fresh);
    } catch (e) {
      setStatus(tableRef.current ? 'cached' : 'unavailable');
    } finally {
      busy.current = false;
    }
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      const cached = await loadJSON(CACHE_KEY, null);
      if (alive && cached && cached.rates) {
        tableRef.current = cached;
        setTable(cached);
        setStatus(Date.now() - cached.fetchedAt < STALE_AFTER_MS ? 'live' : 'cached');
      }
      if (alive) refresh(false);
    })();
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') refresh(false);
    });
    return () => {
      alive = false;
      sub.remove();
    };
  }, [refresh]);

  return { rates: table ? table.rates : null, date: table ? table.date : null, status, refresh };
}
