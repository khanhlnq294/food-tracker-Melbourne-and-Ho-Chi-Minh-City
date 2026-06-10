import { useState, useEffect } from "react";

const CUISINES = [
  { label: "Japanese", emoji: "🍱" },
  { label: "Chinese", emoji: "🍜" },
  { label: "Vietnamese", emoji: "🍲" },
  { label: "Thai", emoji: "🍛" },
  { label: "Indian", emoji: "🌶️" },
  { label: "Italian", emoji: "🍕" },
  { label: "Mediterranean", emoji: "🥗" },
  { label: "Middle Eastern", emoji: "🥙" },
  { label: "Mexican", emoji: "🌮" },
  { label: "American", emoji: "🍔" },
  { label: "Café", emoji: "☕" },
  { label: "Dessert", emoji: "🍰" },
  { label: "Seafood", emoji: "🦞" },
  { label: "Bar & Drinks", emoji: "🍷" },
  { label: "Australian", emoji: "🦘" },
  { label: "Other", emoji: "🍽️" },
];

const CUISINE_BG = {
  Japanese: "#e8f0f8", Chinese: "#fff3e8", Vietnamese: "#e8f8ee", Thai: "#f5e8f8",
  Indian: "#fff8e0", Italian: "#fce8e8", Mediterranean: "#e8fce8", "Middle Eastern": "#fdf3e0",
  Mexican: "#fff0d0", American: "#fce8ee", Café: "#f5ece0", Dessert: "#fce8f8",
  Seafood: "#e8f4fc", "Bar & Drinks": "#f0e8fc", Australian: "#eaf8e0", Other: "#f0f0f0",
};

const PRICE_RANGES = [
  { value: "$", label: "Under $15" },
  { value: "$$", label: "$15–$30" },
  { value: "$$$", label: "$30–$60" },
  { value: "$$$$", label: "$60+" },
];

const SAMPLE = [
  { id: 1, place: "Chin Chin", suburb: "CBD", cuisine: "Thai", dish: "Crying Tiger Beef", price: "$$$", status: "tried", rating: 5, notes: "Legendary spot. The larb salad is a must too.", date: "2026-05-15" },
  { id: 2, place: "Lune Croissanterie", suburb: "Fitzroy", cuisine: "Café", dish: "Cruffin", price: "$", status: "tried", rating: 5, notes: "Worth every minute of the queue. Pure perfection.", date: "2026-06-08" },
  { id: 3, place: "Tipo 00", suburb: "CBD", cuisine: "Italian", dish: "Cacio e Pepe", price: "$$$", status: "want", rating: 0, notes: "Handmade pasta. Been on my list for ages!", date: "2026-06-01" },
  { id: 4, place: "Hu Tong Dumpling Bar", suburb: "CBD", cuisine: "Chinese", dish: "Xiao Long Bao", price: "$$", status: "want", rating: 0, notes: "Best XLB in Melbourne, apparently.", date: "2026-06-05" },
];

function emptyForm() {
  return { place: "", suburb: "", cuisine: "Café", dish: "", price: "$$", status: "want", rating: 0, notes: "", date: new Date().toISOString().split("T")[0] };
}

const S = {
  navy: "#2b4d6f",
  navyDark: "#1a3452",
  amber: "#e8a063",
  amberDark: "#c4763d",
  green: "#3d7a5e",
  greenLight: "#a8d5c2",
  cream: "#f7f4ef",
  white: "#ffffff",
  textDark: "#1c1c1e",
  textMid: "#555",
  textMuted: "#999",
  border: "#ebebeb",
  gold: "#f0b429",
};

export default function FoodTracker({ onSwitch = () => {} }) {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm());
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = localStorage.getItem("melb-food-v2");
        if (res) {
          const parsed = JSON.parse(res);
          setEntries(parsed.length ? parsed : SAMPLE);
        } else {
          setEntries(SAMPLE);
        }
      } catch {
        setEntries(SAMPLE);
      }
      setLoading(false);
    })();
  }, []);

  async function persist(next) {
    setEntries(next);
    try { localStorage.setItem("melb-food-v2", JSON.stringify(next)); } catch {}
  }

  function handleSubmit() {
    if (!form.place.trim()) return;
    if (editId !== null) {
      persist(entries.map(e => e.id === editId ? { ...form, id: editId } : e));
      setEditId(null);
    } else {
      persist([{ ...form, id: Date.now() }, ...entries]);
    }
    setForm(emptyForm());
    setShowForm(false);
  }

  function startEdit(entry) {
    setForm({ ...entry });
    setEditId(entry.id);
    setShowForm(true);
  }

  function deleteEntry(id) {
    if (!window.confirm("Remove this entry?")) return;
    persist(entries.filter(e => e.id !== id));
  }

  function toggleTried(id) {
    persist(entries.map(e =>
      e.id === id ? { ...e, status: e.status === "tried" ? "want" : "tried", rating: e.status === "tried" ? 0 : e.rating } : e
    ));
  }

  const counts = {
    all: entries.length,
    want: entries.filter(e => e.status === "want").length,
    tried: entries.filter(e => e.status === "tried").length,
  };

  const filtered = entries
    .filter(e => filter === "all" || e.status === filter)
    .filter(e => !searchQuery || [e.place, e.suburb, e.cuisine, e.dish, e.notes].some(f => f?.toLowerCase().includes(searchQuery.toLowerCase())));

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Inter:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${S.cream}; }
    .card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
    .card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.10) !important; }
    .stamp {
      position: absolute; top: 14px; right: 14px;
      border: 2.5px solid ${S.green}; border-radius: 5px;
      padding: 3px 8px; color: ${S.green};
      font-weight: 700; font-size: 9px; letter-spacing: 2.5px;
      text-transform: uppercase; opacity: 0.65;
      transform: rotate(9deg); pointer-events: none;
      font-family: 'Inter', sans-serif;
    }
    .tab { cursor: pointer; transition: all 0.15s; background: none; border: none; font-family: 'Inter', sans-serif; }
    .icon-btn { background: none; border: none; cursor: pointer; border-radius: 6px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; transition: background 0.1s; font-size: 14px; }
    .icon-btn:hover { background: rgba(0,0,0,0.06); }
    .star { cursor: pointer; transition: transform 0.1s; display: inline-block; }
    .star:hover { transform: scale(1.25); }
    input, select, textarea { font-family: 'Inter', sans-serif; color: ${S.textDark}; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: ${S.navy} !important; }
    .add-btn:hover { background: ${S.navyDark} !important; }
    .submit-btn:hover { background: ${S.navyDark} !important; }
    .toggle-btn { transition: all 0.15s; cursor: pointer; }
    .toggle-btn:hover { opacity: 0.85; }
    ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
    .city-btn { cursor: pointer; border: none; font-family: 'Inter', sans-serif; transition: all 0.15s; }
    .city-btn:hover { opacity: 0.85; }
  `;

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Inter, sans-serif", color: S.textMuted, background: S.cream }}>
      Loading your food journal…
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: S.cream, fontFamily: "'Inter', sans-serif" }}>
      <style>{css}</style>

      {/* ── City Nav ── */}
      <div style={{ background: "#111d2b", padding: "0 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", alignItems: "center", gap: 8, height: 38 }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 2, fontWeight: 600, marginRight: 4 }}>
            My Journals
          </span>
          <button className="city-btn" style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700, color: "white" }}>
            🇦🇺 Melbourne
          </button>
          <button className="city-btn" onClick={onSwitch}
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
            🇻🇳 HCMC
          </button>
        </div>
      </div>

      {/* ── Header ── */}
      <div style={{ background: S.navy, color: "white", padding: "28px 24px 22px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", opacity: 0.55, marginBottom: 5, fontWeight: 500 }}>Melbourne, VIC</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.3px" }}>Food Explorer</h1>
              <div style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>Your personal dining journal</div>
            </div>
            <button className="add-btn" onClick={() => { setForm(emptyForm()); setEditId(null); setShowForm(true); }}
              style={{ background: S.amber, border: "none", color: "white", borderRadius: 10, padding: "11px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif", letterSpacing: "0.2px" }}>
              + Add Place
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 28, marginTop: 22 }}>
            {[["Total Places", counts.all, "white"], ["Tried", counts.tried, S.greenLight], ["Want to Try", counts.want, "#f8d5a8"]].map(([lbl, val, col]) => (
              <div key={lbl} style={{ textAlign: "left" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: col, fontFamily: "'Playfair Display', serif" }}>{val}</div>
                <div style={{ fontSize: 10, opacity: 0.6, textTransform: "uppercase", letterSpacing: 1.5, marginTop: 1, fontWeight: 500 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Controls Bar ── */}
      <div style={{ background: S.white, borderBottom: `1px solid ${S.border}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            {[["all", "All"], ["want", "🗺️ Want to Try"], ["tried", "✓ Tried"]].map(([val, lbl]) => (
              <button key={val} className="tab" onClick={() => setFilter(val)} style={{
                padding: "14px 16px", fontWeight: 600, fontSize: 13,
                color: filter === val ? S.navy : "#999",
                borderBottom: filter === val ? `2.5px solid ${S.navy}` : "2.5px solid transparent",
              }}>
                {lbl} <span style={{ fontWeight: 400, fontSize: 12 }}>({counts[val]})</span>
              </button>
            ))}
          </div>
          <input
            placeholder="Search places, cuisine…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ border: `1.5px solid ${S.border}`, borderRadius: 8, padding: "7px 12px", fontSize: 13, width: 200, background: "#fafafa" }}
          />
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "70px 0", color: S.textMuted }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>🍽️</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 8, color: "#666" }}>
              {searchQuery ? "No matches found" : "Nothing here yet"}
            </div>
            <div style={{ fontSize: 14 }}>{searchQuery ? "Try a different search" : "Add your first Melbourne food spot!"}</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 16 }}>
            {filtered.map(entry => {
              const cuisineData = CUISINES.find(c => c.label === entry.cuisine);
              return (
                <div key={entry.id} className="card" style={{ background: S.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 14px rgba(0,0,0,0.06)", position: "relative" }}>
                  {/* Status stripe */}
                  <div style={{ height: 5, background: entry.status === "tried" ? S.green : S.amber }} />

                  <div style={{ padding: "16px 16px 12px" }}>
                    {entry.status === "tried" && <div className="stamp">✓ Visited</div>}

                    {/* Badges */}
                    <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 10 }}>
                      <span style={{ background: CUISINE_BG[entry.cuisine] || "#f0f0f0", borderRadius: 20, padding: "4px 11px", fontSize: 12, fontWeight: 500, color: "#444" }}>
                        {cuisineData?.emoji} {entry.cuisine}
                      </span>
                      <span style={{ background: "#f5f5f5", borderRadius: 20, padding: "4px 11px", fontSize: 12, fontWeight: 700, color: "#555", letterSpacing: "0.5px" }}>
                        {entry.price}
                      </span>
                    </div>

                    {/* Place Name */}
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: S.textDark, paddingRight: entry.status === "tried" ? 68 : 0, lineHeight: 1.2, marginBottom: 3 }}>
                      {entry.place}
                    </h3>

                    {entry.suburb && (
                      <div style={{ fontSize: 12, color: S.textMuted, marginBottom: entry.dish ? 6 : 8 }}>📍 {entry.suburb}</div>
                    )}

                    {entry.dish && (
                      <div style={{ fontSize: 13.5, color: "#666", fontStyle: "italic", marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>
                        &ldquo;{entry.dish}&rdquo;
                      </div>
                    )}

                    {/* Rating */}
                    {entry.status === "tried" && entry.rating > 0 && (
                      <div style={{ fontSize: 17, marginBottom: 8, letterSpacing: 1 }}>
                        {"★".repeat(entry.rating)}<span style={{ color: "#ddd" }}>{"★".repeat(5 - entry.rating)}</span>
                      </div>
                    )}

                    {entry.notes && (
                      <div style={{ fontSize: 13, color: "#666", lineHeight: 1.55, background: "#fafafa", borderRadius: 8, padding: "9px 11px", marginTop: 4 }}>
                        {entry.notes}
                      </div>
                    )}

                    <div style={{ fontSize: 11, color: "#ccc", marginTop: 10, letterSpacing: "0.3px" }}>{entry.date}</div>
                  </div>

                  {/* Card Footer */}
                  <div style={{ borderTop: `1px solid ${S.border}`, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button className="toggle-btn" onClick={() => toggleTried(entry.id)} style={{
                      background: entry.status === "tried" ? "#f0faf5" : "#fff8f0",
                      border: `1.5px solid ${entry.status === "tried" ? "#a8d5c2" : "#f8d5a8"}`,
                      borderRadius: 7, padding: "6px 14px", fontSize: 12, fontWeight: 600,
                      color: entry.status === "tried" ? S.green : S.amberDark,
                      fontFamily: "'Inter', sans-serif",
                    }}>
                      {entry.status === "tried" ? "✓ Tried" : "Mark as Tried"}
                    </button>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="icon-btn" onClick={() => startEdit(entry)} title="Edit">✏️</button>
                      <button className="icon-btn" onClick={() => deleteEntry(entry.id)} title="Delete">🗑️</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Modal Form ── */}
      {showForm && (
        <div onClick={e => e.target === e.currentTarget && setShowForm(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 200 }}>
          <div style={{ background: S.white, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 560, padding: "26px 24px 30px", maxHeight: "92vh", overflowY: "auto" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: S.navy }}>
                {editId ? "Edit Entry" : "Add a Food Spot"}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: S.textMuted, lineHeight: 1 }}>✕</button>
            </div>

            {/* Status Toggle */}
            <div style={{ display: "flex", background: "#f2f2f2", borderRadius: 10, padding: 4, marginBottom: 18 }}>
              {[["want", "🗺️ Want to Try"], ["tried", "✓ Already Tried"]].map(([val, lbl]) => (
                <button key={val} onClick={() => setForm(f => ({ ...f, status: val }))} style={{
                  flex: 1, padding: "10px", borderRadius: 8, border: "none",
                  fontWeight: 600, fontSize: 13,
                  background: form.status === val ? (val === "tried" ? S.green : S.amber) : "transparent",
                  color: form.status === val ? "white" : "#999",
                  cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
                }}>{lbl}</button>
              ))}
            </div>

            {/* Fields */}
            {[
              { label: "Place Name *", key: "place", placeholder: "e.g. Chin Chin, Lune Croissanterie…" },
              { label: "Suburb", key: "suburb", placeholder: "e.g. CBD, Fitzroy, Collingwood…" },
              { label: "Dish / What to Order", key: "dish", placeholder: "e.g. Cruffin, Butter Chicken…" },
            ].map(({ label, key, placeholder }) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
                <input placeholder={placeholder} value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{ width: "100%", border: `1.5px solid ${S.border}`, borderRadius: 9, padding: "11px 13px", fontSize: 14 }} />
              </div>
            ))}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Cuisine</label>
                <select value={form.cuisine} onChange={e => setForm(f => ({ ...f, cuisine: e.target.value }))}
                  style={{ width: "100%", border: `1.5px solid ${S.border}`, borderRadius: 9, padding: "11px 13px", fontSize: 14, background: S.white }}>
                  {CUISINES.map(c => <option key={c.label} value={c.label}>{c.emoji} {c.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Price Range</label>
                <select value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  style={{ width: "100%", border: `1.5px solid ${S.border}`, borderRadius: 9, padding: "11px 13px", fontSize: 14, background: S.white }}>
                  {PRICE_RANGES.map(p => <option key={p.value} value={p.value}>{p.value} — {p.label}</option>)}
                </select>
              </div>
            </div>

            {form.status === "tried" && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Rating</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <span key={n} className="star" onClick={() => setForm(f => ({ ...f, rating: n }))}
                      style={{ fontSize: 30, color: n <= form.rating ? S.gold : "#ddd" }}>★</span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Notes</label>
              <textarea placeholder="What makes it special? Dish recommendations, tips…" value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3}
                style={{ width: "100%", border: `1.5px solid ${S.border}`, borderRadius: 9, padding: "11px 13px", fontSize: 14, resize: "vertical" }} />
            </div>

            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Date</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                style={{ width: "100%", border: `1.5px solid ${S.border}`, borderRadius: 9, padding: "11px 13px", fontSize: 14 }} />
            </div>

            <button className="submit-btn" onClick={handleSubmit} style={{
              width: "100%", background: S.navy, color: "white", border: "none",
              borderRadius: 11, padding: "15px", fontWeight: 700, fontSize: 15,
              cursor: "pointer", fontFamily: "'Inter', sans-serif", letterSpacing: "0.2px",
              transition: "background 0.15s",
            }}>
              {editId ? "Save Changes" : "Add to Journal"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
