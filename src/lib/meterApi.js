import { supabase, isSupabaseConfigured } from './supabase';
import {
    TID_METER_BUCKET,
    normalizeMeterNumber,
    formatMeterNumber,
} from '../data/tidTokenContent';

/**
 * Cloud lookup layer for TID rollover meter records.
 *
 * Backend table shape (see `supabase/tid-token.sql`):
 *
 *     ID | Meter No | KCT1 | KCT2
 *     ---+----------+------+------
 *
 * A visitor types a meter number on the TID Token page and we read that
 * customer's row back from Supabase, returning the two key change tokens
 * (KCT1 and KCT2) to load onto the meter.
 *
 * Two read paths are supported so the page works no matter how the records
 * were provisioned:
 *   1. `tid_meters` table   — one row per meter (preferred, queryable).
 *   2. `tid-meter-records`  — a public storage bucket of `<meter>.json` files.
 *
 * Like `lib/cmsApi.js`, every function *fails soft*: when Supabase is not
 * configured or a request errors it returns null and the caller renders its
 * guidance state. Nothing here ever throws into a React render.
 */

export const TID_METERS_TABLE = 'tid_meters';

const isReady = () => isSupabaseConfigured && Boolean(supabase);

/** Pick the first present value for a logical field from a raw record. */
function pick(record, keys = []) {
    for (const key of keys) {
        const value = record?.[key];
        if (value !== undefined && value !== null && value !== '') return value;
    }
    return undefined;
}

/* The exact table columns, plus tolerant aliases in case a column is renamed. */
const ID_KEYS = ['id', 'ID'];
const METER_KEYS = ['meter_no', 'meterNo', 'meter_number', 'meterNumber', 'meter'];
const KCT1_KEYS = ['kct1', 'KCT1', 'kct_1', 'kct1_token', 'key_change_token_1'];
const KCT2_KEYS = ['kct2', 'KCT2', 'kct_2', 'kct2_token', 'key_change_token_2'];

/* Optional extras surfaced only when the table grows beyond the core four. */
const EXTRA_ALIASES = {
    customerName: ['customer_name', 'customerName', 'name', 'account_name'],
    address: ['address', 'premises', 'location'],
    feeder: ['feeder', 'feeder_name'],
    businessUnit: ['business_unit', 'businessUnit', 'region'],
    meterType: ['meter_type', 'meterType', 'type'],
    tariffBand: ['tariff_band', 'tariffBand', 'band'],
};

/** Flatten a raw table row / JSON file into the shape the page renders. */
export function shapeMeterRecord(raw = {}) {
    const record = {};

    const id = pick(raw, ID_KEYS);
    if (id !== undefined) record.id = id;

    const meterNumber = pick(raw, METER_KEYS);
    if (meterNumber !== undefined) record.meterNumber = formatMeterNumber(meterNumber);

    const kct1 = pick(raw, KCT1_KEYS);
    if (kct1) record.kct1 = String(kct1).trim();

    const kct2 = pick(raw, KCT2_KEYS);
    if (kct2) record.kct2 = String(kct2).trim();

    for (const [field, aliases] of Object.entries(EXTRA_ALIASES)) {
        const value = pick(raw, aliases);
        if (value !== undefined) record[field] = value;
    }

    return record;
}

/**
 * Path 1 — read the `tid_meters` table by meter number.
 * Returns a shaped record or null.
 */
export async function fetchMeterFromTable(meterNumber) {
    if (!isReady()) return null;
    const normalized = normalizeMeterNumber(meterNumber);
    if (!normalized) return null;
    try {
        // Match regardless of spacing/dashes by normalising `meter_no` in SQL.
        const { data, error } = await supabase
            .from(TID_METERS_TABLE)
            .select('*')
            .eq('meter_no', normalized)
            .limit(1);
        if (error) throw error;
        const row = Array.isArray(data) ? data[0] : data;
        return row ? shapeMeterRecord(row) : null;
    } catch (err) {
        console.warn('[meterApi] table lookup failed:', err?.message || err);
        return null;
    }
}

/**
 * Path 2 — read `<meter>.json` from the public storage bucket.
 * Returns a shaped record or null.
 */
export async function fetchMeterFromStorage(meterNumber) {
    if (!isReady()) return null;
    const normalized = normalizeMeterNumber(meterNumber);
    if (!normalized) return null;
    // Try a couple of common key layouts before giving up.
    const candidates = [`${normalized}.json`, `meters/${normalized}.json`];
    for (const path of candidates) {
        try {
            const { data, error } = await supabase.storage
                .from(TID_METER_BUCKET)
                .download(path);
            if (error || !data) continue;
            const text = await data.text();
            const parsed = JSON.parse(text);
            const record = Array.isArray(parsed) ? parsed[0] : parsed;
            if (record) return shapeMeterRecord(record);
        } catch (err) {
            // Try the next candidate path.
        }
    }
    return null;
}

/**
 * Primary entry point used by the page: look the meter up in the table, then
 * fall back to the storage bucket.
 *
 * @returns {Promise<{ record: object|null, source: 'table'|'storage'|null } | null>}
 *          `null` means Supabase is not configured at all.
 */
export async function lookupMeterRecord(meterNumber) {
    const normalized = normalizeMeterNumber(meterNumber);
    if (!normalized) return null;

    if (!isReady()) {
        // Backend not configured — let the caller render its guidance state.
        return null;
    }

    const fromTable = await fetchMeterFromTable(normalized);
    if (fromTable) return { record: fromTable, source: 'table' };

    const fromStorage = await fetchMeterFromStorage(normalized);
    if (fromStorage) return { record: fromStorage, source: 'storage' };

    return { record: null, source: null };
}

export default {
    TID_METERS_TABLE,
    shapeMeterRecord,
    fetchMeterFromTable,
    fetchMeterFromStorage,
    lookupMeterRecord,
};
