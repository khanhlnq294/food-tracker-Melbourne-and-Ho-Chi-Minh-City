import { supabase } from './supabase';

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

// ── HCMC ──────────────────────────────────────────────────────────────────────

export async function getHCMCEntries() {
  const { data, error } = await supabase
    .from('hcmc_entries')
    .select('id, data')
    .order('id', { ascending: true });
  if (error) throw error;
  return (data || []).map(r => ({ ...r.data, id: r.id }));
}

export async function syncHCMC(toUpsert = [], toDeleteIds = []) {
  if (toUpsert.length) {
    const { error } = await supabase
      .from('hcmc_entries')
      .upsert(toUpsert.map(e => ({ id: e.id, data: e })), { onConflict: 'id' });
    if (error) console.error('HCMC upsert error:', error.message);
  }
  for (const id of toDeleteIds) {
    const { error } = await supabase
      .from('hcmc_entries')
      .delete()
      .eq('id', id);
    if (error) console.error('HCMC delete error:', error.message);
  }
}