import { supabase } from './supabaseClient';

// ── HELPERS: map between React camelCase ↔ Postgres snake_case ───────────────

function rowToEntry(row) {
  return {
    id:               row.id,
    place:            row.place,
    area:             row.area,
    cuisine:          row.cuisine,
    budget:           row.budget,
    budgetTier:       row.budget_tier,
    mustTry:          row.must_try,
    vibe:             row.vibe,
    mapsUrl:          row.maps_url,
    status:           row.status,
    rating:           row.rating,
    tier:             row.tier,
    notes:            row.notes,
    googleRating:     row.google_rating,
    googleReviewCount:row.google_review_count,
  };
}

function entryToRow(e) {
  return {
    id:                 e.id,
    place:              e.place            || '',
    area:               e.area             || 'HCMC',
    cuisine:            e.cuisine          || 'Vietnamese 🇻🇳',
    budget:             e.budget           || '',
    budget_tier:        e.budgetTier       || 'Mid-range',
    must_try:           e.mustTry          || '',
    vibe:               e.vibe             || '',
    maps_url:           e.mapsUrl          || '',
    status:             e.status           || 'want',
    rating:             e.rating           || 0,
    tier:               e.tier             || '',
    notes:              e.notes            || '',
    google_rating:      e.googleRating     || '',
    google_review_count:e.googleReviewCount|| '',
  };
}

// ── HCMC ──────────────────────────────────────────────────────────────────────

export async function getHCMCEntries() {
  const { data, error } = await supabase
    .from('hcmc_spots')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return (data || []).map(rowToEntry);
}

export async function syncHCMC(toUpsert = [], toDeleteIds = []) {
  if (toUpsert.length) {
    const { error } = await supabase
      .from('hcmc_spots')
      .upsert(toUpsert.map(entryToRow), { onConflict: 'id' });
    if (error) console.error('HCMC upsert error:', error.message);
  }
  for (const id of toDeleteIds) {
    const { error } = await supabase
      .from('hcmc_spots')
      .delete()
      .eq('id', id);
    if (error) console.error('HCMC delete error:', error.message);
  }
}

// ── MELBOURNE ─────────────────────────────────────────────────────────────────

export async function getMelbourneEntries() {
  const { data, error } = await supabase
    .from('melbourne_entries')
    .select('id, data')
    .order('id', { ascending: false });
  if (error) throw error;
  return (data || []).map(r => ({ ...r.data, id: r.id }));
}

export async function syncMelbourne(toUpsert = [], toDeleteIds = []) {
  if (toUpsert.length) {
    const { error } = await supabase
      .from('melbourne_entries')
      .upsert(toUpsert.map(e => ({ id: e.id, data: e })), { onConflict: 'id' });
    if (error) console.error('Melbourne upsert error:', error.message);
  }
  for (const id of toDeleteIds) {
    const { error } = await supabase
      .from('melbourne_entries')
      .delete()
      .eq('id', id);
    if (error) console.error('Melbourne delete error:', error.message);
  }
}