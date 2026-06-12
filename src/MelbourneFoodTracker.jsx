import { useState, useEffect } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────
const CUISINES = ["Japanese","Chinese","Vietnamese","Thai","Indian","Italian","Mediterranean","Middle Eastern","Mexican","American","Café","Dessert","Seafood","Bar & Drinks","Australian","Other"];
const PRICE_RANGES = [{ value:"$", label:"$ · Under $15" },{ value:"$$", label:"$$ · $15–$30" },{ value:"$$$", label:"$$$ · $30–$60" },{ value:"$$$$", label:"$$$$ · $60+" }];
const PRICE_MAP = { "$":"Under $15","$$":"$15–$30","$$$":"$30–$60","$$$$":"$60+" };

const SAMPLE = [
  { id:1, place:"Chin Chin", suburb:"CBD", cuisine:"Thai", dish:"Crying Tiger Beef", price:"$$$", status:"tried", rating:5, notes:"Legendary spot. The larb salad is a must too.", date:"2026-05-15" },
  { id:2, place:"Lune Croissanterie", suburb:"Fitzroy", cuisine:"Café", dish:"Cruffin", price:"$", status:"tried", rating:5, notes:"Worth every minute of the queue. Pure perfection.", date:"2026-06-08" },
  { id:3, place:"Tipo 00", suburb:"CBD", cuisine:"Italian", dish:"Cacio e Pepe", price:"$$$", status:"want", rating:0, notes:"Handmade pasta. Been on my list for ages!", date:"2026-06-01" },
  { id:4, place:"Hu Tong Dumpling Bar", suburb:"CBD", cuisine:"Chinese", dish:"Xiao Long Bao", price:"$$", status:"want", rating:0, notes:"Best XLB in Melbourne, apparently.", date:"2026-06-05" },
];

function emptyForm() {
  return { place:"", suburb:"", cuisine:"Café", dish:"", price:"$$", status:"want", rating:0, notes:"", date:new Date().toISOString().split("T")[0] };
}

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const A  = "#27506E"; // accent — Melbourne teal
const BG = "#FBF9F4"; // warm off-white
const TK = "#1A1815"; // near-black text
const B1 = "#E7E1D5"; // light border
const B2 = "#DAD2C4"; // medium border

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function MelbourneFoodTracker({ onSwitch = () => {} }) {
  const [entries, setEntries]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all");
  const [search, setSearch]     = useState("");
  const [cuisineF, setCuisineF] = useState("All");
  const [priceF, setPriceF]     = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(emptyForm());
  const [photos, setPhotos]     = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("melb-food-v2");
      setEntries(raw ? (JSON.parse(raw).length ? JSON.parse(raw) : SAMPLE) : SAMPLE);
    } catch { setEntries(SAMPLE); }
    setLoading(false);
  }, []);

  function persist(next) {
    setEntries(next);
    try { localStorage.setItem("melb-food-v2", JSON.stringify(next)); } catch {}
  }

  function cycleStatus(id) {
    persist(entries.map(e => e.id !== id ? e : { ...e, status: e.status === "want" ? "tried" : "want" }));
  }

  function setRating(id, n) {
    persist(entries.map(e => e.id !== id ? e : {
      ...e,
      rating: e.rating === n ? 0 : n,
      status: e.status === "want" && n > 0 ? "tried" : e.status,
    }));
  }

  function handlePhoto(id, file) {
    if (!file) return;
    setPhotos(p => ({ ...p, [id]: URL.createObjectURL(file) }));
  }

  function handleSubmit() {
    if (!form.place.trim()) return;
    if (editId !== null) {
      persist(entries.map(e => e.id === editId ? { ...form, id: editId } : e));
    } else {
      persist([{ ...form, id: Date.now() }, ...entries]);
    }
    setEditId(null); setShowForm(false); setForm(emptyForm());
  }

  function startEdit(e) { setForm({ ...emptyForm(), ...e }); setEditId(e.id); setShowForm(true); }
  function deleteEntry(id) { persist(entries.filter(e => e.id !== id)); if (editId === id) setShowForm(false); }

  const counts = {
    all: entries.length,
    tried: entries.filter(e => e.status === "tried").length,
    want: entries.filter(e => e.status === "want").length,
  };
  const pct = entries.length ? Math.round((counts.tried / entries.length) * 100) : 0;

  const filtered = entries.filter(e => {
    if (filter !== "all" && e.status !== filter) return false;
    if (cuisineF !== "All" && e.cuisine !== cuisineF) return false;
    if (priceF !== "All" && e.price !== priceF) return false;
    if (search && ![e.place, e.suburb, e.cuisine, e.dish, e.notes].some(f => f?.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Archivo:wght@400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    ::selection{background:${A};color:${BG};}
    input::placeholder,textarea::placeholder{color:#B3A998;}
    input,select,textarea,button{font-family:'Archivo',sans-serif;}
    select{appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%2327506E' stroke-width='1.4' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 2px center;padding-right:20px;}
    ::-webkit-scrollbar{width:9px;}::-webkit-scrollbar-thumb{background:#DAD2C4;border-radius:0;}::-webkit-scrollbar-track{background:transparent;}
    @keyframes modalIn{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    .card{transition:box-shadow .2s ease,transform .2s ease;}
    .card:hover{box-shadow:0 16px 34px -20px rgba(45,33,15,.4);transform:translateY(-3px);}
    .photo-slot:hover .photo-hint{opacity:1!important;}
    .tab-btn:not(.active):hover{background:rgba(26,24,21,.06);}
    .row-btn:hover{background:${TK}!important;color:${BG}!important;border-color:${TK}!important;}
    .icon-btn:hover{border-color:${TK}!important;color:${TK}!important;}
    .del-btn:hover{border-color:#C0442B!important;color:#C0442B!important;}
    .star:hover{transform:scale(1.22);}
    .map-link:hover{color:${A}!important;}
    .clear-btn:hover{background:${TK}!important;color:${BG}!important;}
    .save-btn:hover{background:${A}!important;border-color:${A}!important;}
    .cancel-btn:hover{border-color:${TK}!important;}
    .remove-link:hover{text-decoration:underline;}
    .switch-btn:hover{border-color:${TK}!important;color:${TK}!important;}
  `;

  const inputStyle = { border:`1px solid ${B2}`, background:"#FFF", borderRadius:2, padding:"11px 12px", fontSize:14, color:TK, outline:"none", width:"100%" };

  if (loading) return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:BG,fontFamily:"'Archivo',sans-serif",color:"#8E867A",fontSize:14 }}>
      Loading journal…
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:BG, fontFamily:"'Archivo',sans-serif", color:TK, WebkitFontSmoothing:"antialiased" }}>
      <style>{css}</style>

      {/* ── UTILITY BAR ── */}
      <div style={{ borderBottom:`1px solid ${B1}`, background:BG }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 40px", height:54, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:A, display:"inline-block" }} />
            <span style={{ fontWeight:700, fontSize:12, letterSpacing:".22em", textTransform:"uppercase" }}>The Passport</span>
            <span style={{ fontSize:12, letterSpacing:".18em", textTransform:"uppercase", color:"#A89E8E" }}>— Eating Journals</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:11, letterSpacing:".16em", textTransform:"uppercase", color:"#A89E8E", marginRight:4 }}>Journal</span>
            <button style={{ background:TK, border:`1px solid ${TK}`, color:BG, borderRadius:999, padding:"6px 14px", fontSize:12, fontWeight:600, cursor:"default", letterSpacing:".02em" }}>Melbourne</button>
            <button className="switch-btn" onClick={onSwitch} style={{ background:"transparent", border:`1px solid ${B2}`, color:"#8E867A", borderRadius:999, padding:"6px 14px", fontSize:12, fontWeight:500, cursor:"pointer", letterSpacing:".02em", transition:"all .15s" }}>Hồ Chí Minh</button>
          </div>
        </div>
      </div>

      {/* ── MASTHEAD ── */}
      <header style={{ maxWidth:1200, margin:"0 auto", padding:"62px 40px 0" }}>
        <div style={{ fontWeight:600, fontSize:13, letterSpacing:".24em", textTransform:"uppercase", color:A }}>A Dining Journal&nbsp;&nbsp;·&nbsp;&nbsp;Melbourne, Victoria</div>
        <h1 style={{ fontFamily:"'Newsreader',serif", fontWeight:500, fontSize:78, lineHeight:.96, letterSpacing:"-.02em", color:TK, marginTop:20 }}>
          Food <em style={{ fontStyle:"italic", fontWeight:400, color:A }}>Explorer</em>
        </h1>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"flex-end", gap:36, marginTop:30 }}>
          <p style={{ maxWidth:430, fontSize:16, lineHeight:1.6, color:"#5A544B" }}>
            A running journal of the city's tables — laneway cafés, dumpling bars and long lunches. Note what to order, mark them as you go, rate the ones worth returning to.
          </p>
          <div style={{ display:"flex", alignItems:"stretch" }}>
            {[["Places", counts.all, TK], ["Visited", counts.tried, A], ["To Try", counts.want, TK]].map(([lbl, val, col]) => (
              <div key={lbl} style={{ padding:"0 22px", borderLeft:`1px solid ${B1}` }}>
                <div style={{ fontFamily:"'Newsreader',serif", fontSize:34, fontWeight:500, lineHeight:1, color:col }}>{val}</div>
                <div style={{ fontSize:10, fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082", marginTop:6 }}>{lbl}</div>
              </div>
            ))}
            <div style={{ padding:"0 0 0 22px", borderLeft:`1px solid ${B1}`, display:"flex", flexDirection:"column", justifyContent:"flex-end", minWidth:140 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:7 }}>
                <span style={{ fontSize:10, fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Visited</span>
                <span style={{ fontFamily:"'Newsreader',serif", fontSize:17, color:TK }}>{pct}%</span>
              </div>
              <div style={{ width:"100%", height:4, background:B1, overflow:"hidden" }}>
                <div style={{ height:"100%", background:A, width:`${pct}%`, transition:"width .5s ease" }} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderBottom:`1px solid ${TK}`, marginTop:34 }} />
      </header>

      {/* ── STICKY CONTROLS ── */}
      <div style={{ position:"sticky", top:0, zIndex:30, background:"rgba(251,249,244,.92)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", borderBottom:`1px solid ${B1}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"13px 40px", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:4, flexWrap:"wrap" }}>
            {[["all","All",counts.all],["tried","Visited",counts.tried],["want","To Try",counts.want]].map(([key,lbl,cnt]) => {
              const active = filter === key;
              return (
                <button key={key} className={active?"":"tab-btn"} onClick={() => setFilter(key)} style={{ display:"inline-flex", alignItems:"center", gap:7, background:active?TK:"transparent", color:active?BG:"#6E675E", border:`1px solid ${active?TK:"transparent"}`, borderRadius:2, padding:"7px 13px", fontSize:13, fontWeight:600, letterSpacing:".02em", cursor:"pointer", transition:"all .15s ease" }}>
                  <span>{lbl}</span>
                  <span style={{ fontSize:11, color:active?"rgba(251,249,244,.6)":"#B3A998" }}>{cnt}</span>
                </button>
              );
            })}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, borderBottom:`1px solid ${B2}`, paddingBottom:4 }}>
              <span style={{ color:A, fontSize:14 }}>⌕</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search places, suburbs, dishes…" style={{ border:"none", background:"transparent", fontSize:14, color:TK, width:200, outline:"none" }} />
            </div>
            <select value={cuisineF} onChange={e => setCuisineF(e.target.value)} style={{ border:"none", borderBottom:`1px solid ${B2}`, background:"transparent", fontSize:13, fontWeight:500, color:TK, padding:"0 20px 4px 0", cursor:"pointer", outline:"none" }}>
              <option value="All">All Cuisines</option>
              {CUISINES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={priceF} onChange={e => setPriceF(e.target.value)} style={{ border:"none", borderBottom:`1px solid ${B2}`, background:"transparent", fontSize:13, fontWeight:500, color:TK, padding:"0 20px 4px 0", cursor:"pointer", outline:"none" }}>
              <option value="All">All Prices</option>
              {PRICE_RANGES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
            <button onClick={() => { setEditId(null); setForm(emptyForm()); setShowForm(true); }} style={{ background:TK, color:BG, border:"none", borderRadius:2, padding:"10px 16px", fontSize:13, fontWeight:600, letterSpacing:".02em", cursor:"pointer", transition:"background .15s" }}
              onMouseEnter={e => e.currentTarget.style.background = A} onMouseLeave={e => e.currentTarget.style.background = TK}>
              + Add spot
            </button>
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <main style={{ maxWidth:1200, margin:"0 auto", padding:"26px 40px 96px" }}>
        <div style={{ fontSize:11, fontWeight:600, letterSpacing:".16em", textTransform:"uppercase", color:"#9A9082", marginBottom:22 }}>
          {filtered.length === entries.length ? `${entries.length} places` : `Showing ${filtered.length} of ${entries.length} places`}
        </div>

        {filtered.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))", gap:22 }}>
            {filtered.map(entry => (
              <article key={entry.id} className="card" style={{ display:"flex", flexDirection:"column", background:"#FFF", border:`1px solid ${B1}`, borderRadius:2, overflow:"hidden" }}>

                {/* Photo slot */}
                <div className="photo-slot" onClick={() => document.getElementById(`mph-${entry.id}`).click()} style={{ position:"relative", width:"100%", aspectRatio:"4/3", background:"#F1EBDF", borderBottom:`1px solid ${B1}`, overflow:"hidden", cursor:"pointer" }}>
                  {photos[entry.id]
                    ? <img src={photos[entry.id]} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} alt="" />
                    : <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:6 }}>
                        <span style={{ fontSize:22, color:B2 }}>+</span>
                        <span className="photo-hint" style={{ fontSize:10, color:"#B3A998", letterSpacing:".12em", textTransform:"uppercase", fontWeight:600, opacity:0, transition:"opacity .15s" }}>Add photo</span>
                      </div>
                  }
                  <input id={`mph-${entry.id}`} type="file" accept="image/*" style={{ display:"none" }} onChange={e => handlePhoto(entry.id, e.target.files?.[0])} onClick={e => e.stopPropagation()} />
                  {entry.status === "tried" && (
                    <span style={{ position:"absolute", top:12, left:12, background:TK, color:BG, fontSize:10, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", padding:"5px 9px", borderRadius:2 }}>Visited</span>
                  )}
                </div>

                {/* Body */}
                <div style={{ display:"flex", flexDirection:"column", gap:13, padding:"18px 18px 16px", flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:10 }}>
                    <span style={{ fontWeight:600, fontSize:11, letterSpacing:".16em", textTransform:"uppercase", color:A }}>{entry.cuisine}</span>
                    {entry.status === "tried"
                      ? <span style={{ fontWeight:600, fontSize:10, letterSpacing:".13em", textTransform:"uppercase", padding:"4px 9px", borderRadius:2, background:TK, color:BG, border:`1px solid ${TK}` }}>Visited</span>
                      : <span style={{ fontWeight:600, fontSize:10, letterSpacing:".13em", textTransform:"uppercase", padding:"4px 9px", borderRadius:2, background:"transparent", color:"#8E867A", border:`1px solid ${B2}` }}>To Try</span>
                    }
                  </div>

                  <h3 style={{ fontFamily:"'Newsreader',serif", fontWeight:500, fontSize:22, lineHeight:1.14, letterSpacing:"-.01em", color:TK }}>{entry.place}</h3>

                  <div style={{ display:"flex", flexDirection:"column", borderTop:`1px solid #EFEAE0`, marginTop:2 }}>
                    {[
                      ["Suburb", entry.suburb || "—"],
                      ["Price", entry.price ? `${entry.price}  ·  ${PRICE_MAP[entry.price] || entry.price}` : "—"],
                      ["Dish", entry.dish || "—"],
                    ].map(([lbl, val]) => (
                      <div key={lbl} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:12, padding:"9px 0", borderBottom:`1px solid #EFEAE0` }}>
                        <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#A89E8E", flexShrink:0 }}>{lbl}</span>
                        <span style={{ fontSize:13, color:"#3A352E", textAlign:"right" }}>{val}</span>
                      </div>
                    ))}
                    {entry.notes && (
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:12, padding:"9px 0", borderBottom:`1px solid #EFEAE0` }}>
                        <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#A89E8E", flexShrink:0 }}>Notes</span>
                        <span style={{ fontSize:13, color:"#3A352E", textAlign:"right", fontStyle:"italic" }}>{entry.notes}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:12, marginTop:"auto", borderTop:`1px solid #EFEAE0` }}>
                    <div style={{ display:"flex", gap:3 }}>
                      {[1,2,3,4,5].map(n => (
                        <span key={n} className="star" onClick={() => setRating(entry.id, n)} style={{ cursor:"pointer", fontSize:16, lineHeight:1, color:n<=(entry.rating||0)?A:"#D8D0C2", transition:"transform .12s ease", display:"inline-block" }}>
                          {n <= (entry.rating||0) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    {entry.mapsUrl && (
                      <a href={entry.mapsUrl} target="_blank" rel="noopener noreferrer" className="map-link" style={{ fontSize:12, fontWeight:600, letterSpacing:".04em", color:TK, textDecoration:"none", borderBottom:`1px solid ${A}`, paddingBottom:1, transition:"color .12s" }}>Map ↗</a>
                    )}
                  </div>

                  <div style={{ display:"flex", gap:7 }}>
                    <button className="row-btn" onClick={() => cycleStatus(entry.id)} style={{ flex:1, border:`1px solid ${B2}`, background:BG, fontWeight:600, fontSize:12, letterSpacing:".03em", color:TK, padding:"9px 12px", borderRadius:2, cursor:"pointer", transition:"all .15s ease" }}>
                      {entry.status === "want" ? "Mark visited" : "Reset to to-try"}
                    </button>
                    <button className="icon-btn" onClick={() => startEdit(entry)} title="Edit" style={{ width:36, border:`1px solid ${B2}`, background:BG, color:"#6E675E", fontSize:14, borderRadius:2, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .15s ease" }}>✎</button>
                    <button className="del-btn" onClick={() => deleteEntry(entry.id)} title="Remove" style={{ width:36, border:`1px solid ${B2}`, background:BG, color:"#6E675E", fontSize:13, borderRadius:2, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .15s ease" }}>✕</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"90px 20px", border:`1px dashed ${B2}`, borderRadius:2 }}>
            <div style={{ fontFamily:"'Newsreader',serif", fontStyle:"italic", fontSize:28, color:TK }}>Nothing on the table.</div>
            <p style={{ fontSize:14, color:"#8E867A", marginTop:10 }}>No spots match these filters. Try clearing your search.</p>
            <button className="clear-btn" onClick={() => { setFilter("all"); setCuisineF("All"); setPriceF("All"); setSearch(""); }} style={{ marginTop:22, background:"transparent", border:`1px solid ${TK}`, color:TK, padding:"10px 20px", fontSize:13, fontWeight:600, borderRadius:2, cursor:"pointer", transition:"all .15s" }}>
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* ── MODAL ── */}
      {showForm && (
        <div onClick={() => setShowForm(false)} style={{ position:"fixed", inset:0, zIndex:60, background:"rgba(26,24,21,.55)", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"48px 20px", overflow:"auto", animation:"fadeIn .15s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width:"min(560px,100%)", background:BG, border:`1px solid ${TK}`, borderRadius:3, padding:34, animation:"modalIn .22s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
              <div>
                <div style={{ fontWeight:600, fontSize:11, letterSpacing:".2em", textTransform:"uppercase", color:A }}>{editId ? "Edit entry" : "New entry"}</div>
                <h2 style={{ fontFamily:"'Newsreader',serif", fontWeight:500, fontSize:30, color:TK, marginTop:6 }}>{editId ? "Edit spot" : "Add a spot"}</h2>
              </div>
              <button onClick={() => setShowForm(false)} style={{ background:"transparent", border:"none", fontSize:22, color:"#8E867A", cursor:"pointer", lineHeight:1 }}
                onMouseEnter={e => e.target.style.color = TK} onMouseLeave={e => e.target.style.color = "#8E867A"}>✕</button>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Place name</span>
                <input value={form.place} onChange={e => setForm(f => ({...f, place:e.target.value}))} placeholder="e.g. Tipo 00" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
              </label>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Cuisine</span>
                  <select value={form.cuisine} onChange={e => setForm(f => ({...f, cuisine:e.target.value}))} style={inputStyle}>
                    {CUISINES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Status</span>
                  <select value={form.status} onChange={e => setForm(f => ({...f, status:e.target.value}))} style={inputStyle}>
                    <option value="want">To Try</option>
                    <option value="tried">Visited</option>
                  </select>
                </label>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Suburb</span>
                  <input value={form.suburb||""} onChange={e => setForm(f => ({...f, suburb:e.target.value}))} placeholder="e.g. CBD, Fitzroy…" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
                </label>
                <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Price range</span>
                  <select value={form.price} onChange={e => setForm(f => ({...f, price:e.target.value}))} style={inputStyle}>
                    {PRICE_RANGES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </label>
              </div>

              <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Dish to order</span>
                <input value={form.dish||""} onChange={e => setForm(f => ({...f, dish:e.target.value}))} placeholder="e.g. Cacio e Pepe" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
              </label>

              <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Notes</span>
                <textarea value={form.notes||""} onChange={e => setForm(f => ({...f, notes:e.target.value}))} rows={2} placeholder="What to order, who to bring…" style={{ ...inputStyle, resize:"vertical", fontFamily:"'Archivo',sans-serif" }}
                  onFocus={e => e.target.style.borderColor = TK} onBlur={e => e.target.style.borderColor = B2} />
              </label>

              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontWeight:600, fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#9A9082" }}>Your rating</span>
                <div style={{ display:"flex", gap:4 }}>
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className="star" onClick={() => setForm(f => ({...f, rating: f.rating === n ? 0 : n}))} style={{ cursor:"pointer", fontSize:22, lineHeight:1, color:n<=(form.rating||0)?A:"#D8D0C2", display:"inline-block" }}>
                      {n <= (form.rating||0) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, marginTop:28, paddingTop:20, borderTop:`1px solid ${B1}` }}>
              {editId !== null && (
                <button className="remove-link" onClick={() => { deleteEntry(editId); setShowForm(false); }} style={{ background:"transparent", border:"none", color:"#C0442B", fontSize:13, fontWeight:600, cursor:"pointer", letterSpacing:".02em" }}>
                  Remove spot
                </button>
              )}
              <div style={{ display:"flex", gap:10, marginLeft:"auto" }}>
                <button className="cancel-btn" onClick={() => setShowForm(false)} style={{ background:"transparent", border:`1px solid ${B2}`, color:TK, padding:"11px 18px", fontSize:13, fontWeight:600, borderRadius:2, cursor:"pointer", transition:"border-color .15s" }}>Cancel</button>
                <button className="save-btn" onClick={handleSubmit} style={{ background:TK, border:`1px solid ${TK}`, color:BG, padding:"11px 22px", fontSize:13, fontWeight:600, borderRadius:2, cursor:"pointer", letterSpacing:".02em", transition:"all .15s" }}>
                  {editId !== null ? "Save changes" : "Add to journal"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}