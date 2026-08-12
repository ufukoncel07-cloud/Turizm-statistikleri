import { useState, useMemo, useEffect } from "react";
import {
  AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  Users, DollarSign, BedDouble, Clock3, Wallet, MapPin, TrendingUp,
  TrendingDown, Globe2, SlidersHorizontal, Building2, Plane, Sparkles,
} from "lucide-react";
import { antalyaData, turkeyData } from './mockData';

const COLORS = {
  bg: "#F4FAFB",
  turkuaz: "#0AA8A0",
  turkuazKoyu: "#068078",
  deniz: "#1D6FA3",
  lacivert: "#0B2545",
  gunBatimi: "#FF8A5B",
  altin: "#E8B84B",
  mercan: "#FF6B6B",
  yesil: "#3BB273",
};

const PIE_PALETTE = ["#0AA8A0", "#1D6FA3", "#0B2545", "#FF8A5B", "#E8B84B", "#3BB273", "#FF6B6B", "#7C6FDB", "#4DA8DA"];
const FACILITY_PALETTE = ["#0B2545", "#1D6FA3", "#0AA8A0", "#E8B84B", "#FF8A5B"];

const MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const MONTHS_SHORT = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
const QUARTERS = [
  { id: "all", label: "Tüm Yıl", months: [1,2,3,4,5,6,7,8,9,10,11,12] },
  { id: "Q1", label: "1. Çeyrek", months: [1,2,3] },
  { id: "Q2", label: "2. Çeyrek", months: [4,5,6] },
  { id: "Q3", label: "3. Çeyrek", months: [7,8,9] },
  { id: "Q4", label: "4. Çeyrek", months: [10,11,12] },
];

function adaptData(sourceArray: any[]) {
  const out: any = {};
  sourceArray.forEach(yilVeri => {
    const aylar = yilVeri.months.map((m: any) => ({
      ayNo: m.month,
      ay: m.monthName,
      ayKisa: MONTHS_SHORT[m.month - 1],
      ziyaretci: m.visitors,
      gelirUSD: m.revenue * 1_000_000,
      gelirMilyonUSD: m.revenue,
      doluluk: m.occupancy,
      kalis: m.avgStayDays,
      harcama: m.avgSpendPerPerson,
      tesis: m.occupancyByType || { fiveStar: m.occupancy, fourStar: m.occupancy, threeStarAndLess: m.occupancy, holidayVillage: m.occupancy }
    }));
    const totalGelirUSD = yilVeri.totalRevenue * 1_000_000;
    out[yilVeri.year] = {
      aylar,
      ayMevcut: yilVeri.months.length,
      toplamZiyaretci: yilVeri.totalVisitors,
      toplamGelirUSD: totalGelirUSD,
      ortDoluluk: yilVeri.avgOccupancy,
      ortKalis: (aylar.reduce((a: number, b: any) => a + b.kalis, 0) / aylar.length) || 0,
      ortHarcama: yilVeri.totalVisitors > 0 ? Math.round(totalGelirUSD / yilVeri.totalVisitors) : 0,
      nationalities: yilVeri.nationalities,
      regions: yilVeri.regions,
    };
  });
  return out;
}

const ANTALYA_DATA = adaptData(antalyaData);
const TURKIYE_DATA = adaptData(turkeyData);
const YEARS = Object.keys(TURKIYE_DATA).map(Number).sort((a,b) => b-a);

const trFmt = (n: number) => Math.round(n).toLocaleString("tr-TR");
const trFmt1 = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function quarterMonthsFor(quarterId: string) {
  return QUARTERS.find((q) => q.id === quarterId)?.months || [];
}

function aggregate(dataset: any, yil: number, quarterId: string, ay: string) {
  const yilVeri = dataset[yil];
  if (!yilVeri) return null;
  let monthsSet: number[];
  if (ay !== "all") monthsSet = [Number(ay)];
  else monthsSet = quarterMonthsFor(quarterId);
  
  const aylar = yilVeri.aylar.filter((a: any) => monthsSet.includes(a.ayNo));
  if (aylar.length === 0) return null;
  
  let ziyaretci = 0;
  let gelirUSD = 0;
  
  if (ay === "all" && quarterId === "all") {
    // Tüm yıl seçildiğinde resmi toplamları kullan
    ziyaretci = yilVeri.toplamZiyaretci;
    gelirUSD = yilVeri.toplamGelirUSD;
  } else {
    // Belirli bir dönem seçildiğinde ayları topla
    ziyaretci = aylar.reduce((a: number, b: any) => a + b.ziyaretci, 0);
    gelirUSD = aylar.reduce((a: number, b: any) => a + b.gelirUSD, 0);
  }

  const doluluk = Math.round(aylar.reduce((a: number, b: any) => a + b.doluluk, 0) / aylar.length);
  const kalis = +(aylar.reduce((a: number, b: any) => a + b.kalis, 0) / aylar.length).toFixed(1);
  const harcama = ziyaretci > 0 ? Math.round(gelirUSD / ziyaretci) : 0;
  
  return { aylar, ziyaretci, gelirUSD, gelirMilyonUSD: gelirUSD / 1_000_000, doluluk, kalis, harcama };
}

function delta(current: number, previous: number) {
  if (previous === undefined || previous === null || previous === 0) return null;
  return +(((current - previous) / previous) * 100).toFixed(1);
}

function GlassTooltip({ active, payload, label, unit = "", formatter }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: "rgba(11,37,69,0.92)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 14,
        padding: "12px 16px",
        boxShadow: "0 12px 32px rgba(11,37,69,0.35)",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        minWidth: 150,
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 13.5, padding: "2px 0" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: p.color, display: "inline-block" }} />
            {p.name}
          </span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 600 }}>
            {formatter ? formatter(p.value) : trFmt(p.value)}{unit}
          </span>
        </div>
      ))}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, unit, deltaVal, accent, delayMs }: any) {
  const isUp = deltaVal !== null && deltaVal >= 0;
  return (
    <div
      className="hover-lift animate-fadeUp"
      style={{
        animationDelay: `${delayMs}ms`,
        background: "linear-gradient(155deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.7)",
        borderRadius: 22,
        padding: "20px 22px",
        boxShadow: "0 8px 28px rgba(11,37,69,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}33, transparent 70%)`,
        }}
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(135deg, ${accent}, ${accent}bb)`, boxShadow: `0 6px 16px ${accent}55`,
        }}>
          <Icon size={20} color="#fff" strokeWidth={2.2} />
        </div>
        {deltaVal !== null && (
          <div style={{
            display: "flex", alignItems: "center", gap: 3, fontSize: 12.5, fontWeight: 700,
            color: isUp ? COLORS.yesil : COLORS.mercan,
            background: isUp ? "rgba(59,178,115,0.12)" : "rgba(255,107,107,0.12)",
            padding: "3px 8px", borderRadius: 999,
          }}>
            {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            %{Math.abs(deltaVal)}
          </div>
        )}
      </div>
      <div style={{ fontSize: 13, color: COLORS.lacivert, opacity: 0.65, fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 24, fontWeight: 700, color: COLORS.lacivert, letterSpacing: -0.5 }}>
        {value}
        <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.55, marginLeft: 4 }}>{unit}</span>
      </div>
    </div>
  );
}

function SectionCard({ title, subtitle, icon: Icon, children, delayMs = 0, style = {} }: any) {
  return (
    <div
      className="animate-fadeUp"
      style={{
        animationDelay: `${delayMs}ms`,
        background: "linear-gradient(160deg, rgba(255,255,255,0.88), rgba(255,255,255,0.6))",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.75)",
        borderRadius: 26,
        padding: "24px 24px 12px",
        boxShadow: "0 10px 34px rgba(11,37,69,0.07)",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        {Icon && (
          <div style={{
            width: 34, height: 34, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center",
            background: `linear-gradient(135deg, ${COLORS.turkuaz}, ${COLORS.deniz})`,
          }}>
            <Icon size={17} color="#fff" />
          </div>
        )}
        <div>
          <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 16.5, color: COLORS.lacivert }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12.5, color: COLORS.lacivert, opacity: 0.55 }}>{subtitle}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

function PillSelect({ value, onChange, options, icon: Icon }: any) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      background: "rgba(255,255,255,0.7)", border: "1px solid rgba(11,37,69,0.08)",
      borderRadius: 999, padding: "6px 8px 6px 12px",
    }}>
      {Icon && <Icon size={14} color={COLORS.deniz} />}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          border: "none", background: "transparent", fontFamily: "Inter, sans-serif",
          fontSize: 13, fontWeight: 600, color: COLORS.lacivert, outline: "none", cursor: "pointer",
          appearance: "none", paddingRight: 4,
        }}
      >
        {options.map((o: any) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export default function TurizmDashboard() {
  const [sekme, setSekme] = useState("antalya"); // antalya | turkiye
  const [yil, setYil] = useState(2026);
  const [ceyrek, setCeyrek] = useState("all");
  const [ay, setAy] = useState("all");
  const [karsilastirYil, setKarsilastirYil] = useState("none");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const dataset = sekme === "antalya" ? ANTALYA_DATA : TURKIYE_DATA;
  const bolgeAdi = sekme === "antalya" ? "Antalya" : "Türkiye";
  const yilVeri = dataset[yil];
  const maxAy = yilVeri ? yilVeri.ayMevcut : 12;

  const mevcutAgg = useMemo(() => aggregate(dataset, yil, ceyrek, ay), [dataset, yil, ceyrek, ay]);
  const karsilastirAgg = useMemo(
    () => (karsilastirYil !== "none" ? aggregate(dataset, Number(karsilastirYil), ceyrek, ay) : null),
    [dataset, karsilastirYil, ceyrek, ay]
  );

  const trendData = useMemo(() => {
    const secilenAylar = yilVeri ? yilVeri.aylar : [];
    const karsYilVeri = karsilastirYil !== "none" ? dataset[Number(karsilastirYil)] : null;
    return secilenAylar.map((a: any) => ({
      ay: a.ayKisa,
      ayNo: a.ayNo,
      ziyaretci: a.ziyaretci,
      gelir: a.gelirMilyonUSD,
      ziyaretciKarsi: karsYilVeri ? karsYilVeri.aylar.find((x: any) => x.ayNo === a.ayNo)?.ziyaretci : undefined,
    }));
  }, [yilVeri, dataset, karsilastirYil]);

  const seciliAyNolar = ay !== "all" ? [Number(ay)] : quarterMonthsFor(ceyrek);

  const milliyetPie = useMemo(() => {
    if (!yilVeri || !mevcutAgg) return [];
    const totalYearlyVisitors = yilVeri.aylar.reduce((acc: number, m: any) => acc + m.ziyaretci, 0);
    const scaleFactor = totalYearlyVisitors > 0 ? mevcutAgg.ziyaretci / totalYearlyVisitors : 0;
    
    return yilVeri.nationalities.map((m: any) => {
      const scaledVal = Math.round(m.visitors * scaleFactor);
      return {
        name: m.country,
        value: scaledVal,
        pay: mevcutAgg.ziyaretci > 0 ? ((scaledVal / mevcutAgg.ziyaretci) * 100).toFixed(1) : 0
      };
    }).sort((a: any, b: any) => b.value - a.value);
  }, [mevcutAgg, yilVeri]);

  const sehirBar = useMemo(() => {
    if (sekme !== "turkiye" || !yilVeri || !mevcutAgg || !yilVeri.regions) return [];
    const totalYearlyVisitors = yilVeri.aylar.reduce((acc: number, m: any) => acc + m.ziyaretci, 0);
    const scaleFactor = totalYearlyVisitors > 0 ? mevcutAgg.ziyaretci / totalYearlyVisitors : 0;
    
    return yilVeri.regions.map((s: any) => ({
      name: s.region,
      ziyaretci: Math.round(s.visitors * scaleFactor),
    })).sort((a: any, b: any) => b.ziyaretci - a.ziyaretci);
  }, [sekme, mevcutAgg, yilVeri]);

  const tesisBar = useMemo(() => {
    if (!mevcutAgg || mevcutAgg.aylar.length === 0) return [];
    
    const sum = mevcutAgg.aylar.reduce((acc: any, m: any) => {
        acc.fiveStar += m.tesis?.fiveStar || m.doluluk;
        acc.fourStar += m.tesis?.fourStar || m.doluluk;
        acc.threeStarAndLess += m.tesis?.threeStarAndLess || m.doluluk;
        acc.holidayVillage += m.tesis?.holidayVillage || m.doluluk;
        return acc;
    }, { fiveStar: 0, fourStar: 0, threeStarAndLess: 0, holidayVillage: 0 });
    
    const count = mevcutAgg.aylar.length;
    return [
      { name: "Tatil Köyü", doluluk: Math.round(sum.holidayVillage / count * 10) / 10 },
      { name: "5 Yıldız Otel", doluluk: Math.round(sum.fiveStar / count * 10) / 10 },
      { name: "4 Yıldız Otel", doluluk: Math.round(sum.fourStar / count * 10) / 10 },
      { name: "Butik/Apart", doluluk: Math.round(sum.threeStarAndLess / count * 10) / 10 },
    ].sort((a: any,b: any) => b.doluluk - a.doluluk);
  }, [mevcutAgg]);

  const fmtGelir = (agg: any) => {
    if (!agg) return "—";
    return agg.gelirMilyonUSD >= 1000
      ? trFmt1(agg.gelirMilyonUSD / 1000) + " Mlyr"
      : trFmt(agg.gelirMilyonUSD) + " Mn";
  };

  const yilSecenekleri = YEARS.map((y) => ({ value: String(y), label: String(y) }));
  const karsSecenekleri = [{ value: "none", label: "Karşılaştırma Yok" }, ...YEARS.filter((y) => y !== yil).map((y) => ({ value: String(y), label: `${y} ile Kıyasla` }))];
  const ceyrekSecenekleri = QUARTERS.map((q) => ({ value: q.id, label: q.label }));
  const aySecenekleri = [{ value: "all", label: "Tüm Aylar" }, ...MONTHS.slice(0, maxAy).map((m, i) => ({ value: String(i + 1), label: m }))];

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(1200px 600px at 10% -10%, #E4F6F5 0%, transparent 60%),
                   radial-gradient(1000px 700px at 110% 10%, #E1EEF9 0%, transparent 55%),
                   ${COLORS.bg}`,
      fontFamily: "Inter, sans-serif",
      paddingBottom: 40,
    }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform: translateY(18px); } to { opacity:1; transform: translateY(0); } }
        .animate-fadeUp { opacity:0; animation: fadeUp .7s cubic-bezier(.22,1,.36,1) forwards; }
        .hover-lift { transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
        .hover-lift:hover { transform: translateY(-7px); box-shadow: 0 20px 44px rgba(11,37,69,0.16); }
        select:focus { outline: 2px solid ${COLORS.turkuaz}55; }
        ::selection { background: ${COLORS.turkuaz}55; }
        .tab-btn { transition: all .4s cubic-bezier(.22,1,.36,1); }
        table.veri-tablosu tbody tr { transition: background .2s ease; }
        table.veri-tablosu tbody tr:hover { background: rgba(10,168,160,0.07); }
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeUp, .hover-lift, .tab-btn { animation: none !important; transition: none !important; }
        }
        @media (max-width: 768px) {
          .mobile-header { padding: 12px 16px !important; flex-direction: column !important; align-items: stretch !important; gap: 16px !important; }
          .mobile-logo-container { justify-content: center !important; }
          .mobile-tabs { justify-content: center !important; }
          .mobile-hero { padding: 24px 16px 40px !important; }
          .mobile-hero-flex { flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
          .mobile-main { padding: 0 16px !important; }
          .mobile-charts-grid { grid-template-columns: 1fr !important; }
          .mobile-filters { justify-content: center !important; }
        }
        @media (max-width: 480px) {
          .mobile-metric-grid { grid-template-columns: 1fr !important; }
          .mobile-hero-number { font-size: 42px !important; }
        }
      `}</style>

      {/* ================= HEADER ================= */}
      <header className="mobile-header" style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(244,250,251,0.78)", backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(11,37,69,0.06)",
        padding: "14px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14,
      }}>
        <div className="mobile-logo-container" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src="./logo.jpg" alt="Turizm İstatistikleri Logo" style={{ width: 68, height: 68, objectFit: "contain" }} />
          <div style={{ paddingLeft: 4 }}>
            <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: 19, color: COLORS.lacivert, letterSpacing: -0.3 }}>
              Turizm İstatistikleri
            </div>
            <div style={{ fontSize: 12, color: COLORS.deniz, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
              Antalya & Türkiye · 2019–2026
            </div>
          </div>
        </div>

        {/* Sekme geçişi */}
        <div className="mobile-tabs" style={{
          display: "flex", background: "rgba(11,37,69,0.06)", borderRadius: 999, padding: 4, gap: 4,
        }}>
          {[{ id: "antalya", label: "Antalya", icon: MapPin }, { id: "turkiye", label: "Türkiye", icon: Globe2 }].map((t) => (
            <button
              key={t.id}
              className="tab-btn"
              onClick={() => setSekme(t.id)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                border: "none", cursor: "pointer", padding: "9px 20px", borderRadius: 999,
                fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 13.5,
                background: sekme === t.id ? `linear-gradient(135deg, ${COLORS.turkuaz}, ${COLORS.deniz})` : "transparent",
                color: sekme === t.id ? "#fff" : COLORS.lacivert,
                boxShadow: sekme === t.id ? `0 6px 18px ${COLORS.turkuaz}55` : "none",
              }}
            >
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="mobile-hero" style={{ position: "relative", padding: "36px 28px 56px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div className="animate-fadeUp mobile-hero-flex" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.turkuazKoyu, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>
                {bolgeAdi} · {ay !== "all" ? MONTHS[Number(ay) - 1] : QUARTERS.find(q => q.id === ceyrek)?.label} {yil}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                <span className="mobile-hero-number" style={{
                  fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: "clamp(38px, 6vw, 66px)",
                  color: COLORS.lacivert, letterSpacing: -1.5, lineHeight: 1,
                }}>
                  {mevcutAgg ? trFmt(mevcutAgg.ziyaretci) : "—"}
                </span>
                <span style={{ fontSize: 18, fontWeight: 600, color: COLORS.deniz, paddingBottom: 8 }}>gelen turist</span>
              </div>
              <p style={{ fontSize: 14.5, color: COLORS.lacivert, opacity: 0.65, maxWidth: 560, marginTop: 10, lineHeight: 1.6 }}>
                Seçili döneme ait {trFmt(mevcutAgg ? mevcutAgg.gelirUSD / 1_000_000 : 0)} milyon $ turizm geliri,
                %{mevcutAgg?.doluluk ?? "—"} ortalama otel doluluğu ile {sekme === "turkiye" ? "Türkiye genelinde" : "Antalya ili sınırları içerisinde"} kaydedilmiştir.
              </p>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.8)", borderRadius: 20, padding: "14px 20px",
              boxShadow: "0 10px 30px rgba(11,37,69,0.08)",
            }}>
              <Plane size={26} color={COLORS.gunBatimi} />
              <div>
                <div style={{ fontSize: 11, color: COLORS.lacivert, opacity: 0.55, fontWeight: 600 }}>Veri Kaynağı</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.lacivert }}>KTB & TÜİK Raporları</div>
              </div>
            </div>
          </div>
        </div>

        {/* dalga ayracı */}
        <svg viewBox="0 0 1440 90" style={{ position: "absolute", bottom: -2, left: 0, width: "100%", height: 90, zIndex: 1 }} preserveAspectRatio="none">
          <path d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,45 L1440,120 L0,120 Z" fill="rgba(10,168,160,0.08)" />
          <path d="M0,60 C240,20 480,90 720,55 C960,20 1200,80 1440,50 L1440,120 L0,120 Z" fill="rgba(29,111,163,0.06)" />
        </svg>
      </section>

      <main className="mobile-main" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 28px", display: "flex", flexDirection: "column", gap: 22 }}>

        {/* ================= FİLTRE ÇUBUĞU ================= */}
        <div className="animate-fadeUp mobile-filters" style={{
          display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.7)", borderRadius: 999, padding: "10px 16px",
          boxShadow: "0 8px 24px rgba(11,37,69,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: COLORS.deniz, paddingRight: 4 }}>
            <SlidersHorizontal size={15} /> Filtreler
          </div>
          <PillSelect value={String(yil)} onChange={(v: string) => setYil(Number(v))} options={yilSecenekleri} />
          <PillSelect value={ceyrek} onChange={setCeyrek} options={ceyrekSecenekleri} />
          <PillSelect value={ay} onChange={setAy} options={aySecenekleri} />
          <div style={{ width: 1, height: 22, background: "rgba(11,37,69,0.12)", margin: "0 4px" }} />
          <PillSelect value={karsilastirYil} onChange={setKarsilastirYil} options={karsSecenekleri} icon={TrendingUp} />
        </div>

        {/* ================= METRİK KARTLARI ================= */}
        <div className="mobile-metric-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <MetricCard icon={Users} label="Gelen Turist Sayısı" value={mevcutAgg ? trFmt(mevcutAgg.ziyaretci) : "—"} unit="kişi"
            deltaVal={mevcutAgg && karsilastirAgg ? delta(mevcutAgg.ziyaretci, karsilastirAgg.ziyaretci) : null} accent={COLORS.turkuaz} delayMs={40} />
          <MetricCard icon={DollarSign} label="Turizm Geliri" value={mevcutAgg ? fmtGelir(mevcutAgg) : "—"} unit="$"
            deltaVal={mevcutAgg && karsilastirAgg ? delta(mevcutAgg.gelirUSD, karsilastirAgg.gelirUSD) : null} accent={COLORS.deniz} delayMs={90} />
          <MetricCard icon={BedDouble} label="Otel Doluluk Oranı" value={mevcutAgg ? mevcutAgg.doluluk : "—"} unit="%"
            deltaVal={mevcutAgg && karsilastirAgg ? delta(mevcutAgg.doluluk, karsilastirAgg.doluluk) : null} accent={COLORS.lacivert} delayMs={140} />
          <MetricCard icon={Clock3} label="Ort. Kalış Süresi" value={mevcutAgg ? trFmt1(mevcutAgg.kalis) : "—"} unit="gün"
            deltaVal={mevcutAgg && karsilastirAgg ? delta(mevcutAgg.kalis, karsilastirAgg.kalis) : null} accent={COLORS.gunBatimi} delayMs={190} />
          <MetricCard icon={Wallet} label="Kişi Başı Harcama" value={mevcutAgg ? trFmt(mevcutAgg.harcama) : "—"} unit="$"
            deltaVal={mevcutAgg && karsilastirAgg ? delta(mevcutAgg.harcama, karsilastirAgg.harcama) : null} accent={COLORS.altin} delayMs={240} />
        </div>

        {/* ================= AYLIK TREND ================= */}
        <SectionCard title="Aylık Ziyaretçi & Gelir Trendi" subtitle={`${yil} yılı ${karsilastirYil !== "none" ? `· ${karsilastirYil} ile karşılaştırmalı` : ""}`} icon={TrendingUp} delayMs={100}>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={trendData} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="gTurkuaz" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.turkuaz} stopOpacity={0.55} />
                  <stop offset="100%" stopColor={COLORS.turkuaz} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gLacivert" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.lacivert} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={COLORS.lacivert} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 8" stroke="rgba(11,37,69,0.08)" vertical={false} />
              <XAxis dataKey="ay" tick={{ fontSize: 12, fill: COLORS.lacivert, fontFamily: "Inter" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: COLORS.lacivert, fontFamily: "Inter" }} axisLine={false} tickLine={false}
                tickFormatter={(v) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : v >= 1000 ? `${(v/1000).toFixed(0)}B` : v} />
              <Tooltip content={<GlassTooltip formatter={(v: any) => trFmt(v)} />} />
              <Legend wrapperStyle={{ fontSize: 12.5, fontWeight: 600, paddingTop: 10 }} />
              <Area type="monotone" dataKey="ziyaretci" name={`${yil} Ziyaretçi`} stroke={COLORS.turkuazKoyu} strokeWidth={2.5} fill="url(#gTurkuaz)" dot={false} activeDot={{ r: 5 }} />
              {karsilastirYil !== "none" && (
                <Area type="monotone" dataKey="ziyaretciKarsi" name={`${karsilastirYil} Ziyaretçi`} stroke={COLORS.lacivert} strokeWidth={2} strokeDasharray="6 4" fill="url(#gLacivert)" dot={false} activeDot={{ r: 5 }} />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* ================= PASTA + BAR GRID ================= */}
        <div className="mobile-charts-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 22, alignItems: "stretch" }}>
          <SectionCard title="Milliyete Göre Dağılım" subtitle="Seçili döneme göre ziyaretçi payı" icon={Globe2} delayMs={150}>
            <ResponsiveContainer width="100%" height={340}>
              <PieChart>
                <Tooltip content={<GlassTooltip formatter={(v: any) => trFmt(v) + " kişi"} />} />
                <Pie
                  data={milliyetPie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="48%"
                  innerRadius={62}
                  outerRadius={110}
                  paddingAngle={2}
                  labelLine={{ stroke: COLORS.lacivert, strokeWidth: 1, opacity: 0.35 }}
                  label={({ name, pay }: any) => `${name} · %${pay}`}
                >
                  {milliyetPie.map((_: any, i: number) => <Cell key={i} fill={PIE_PALETTE[i % PIE_PALETTE.length]} stroke="#fff" strokeWidth={2} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </SectionCard>

          <SectionCard title="Tesis Tipine Göre Doluluk" subtitle="Ortalama doluluk oranı (%)" icon={Building2} delayMs={200}>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={tesisBar} layout="vertical" margin={{ top: 6, right: 24, left: 10, bottom: 6 }}>
                <CartesianGrid strokeDasharray="4 8" stroke="rgba(11,37,69,0.08)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: COLORS.lacivert }} axisLine={false} tickLine={false} unit="%" />
                <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12.5, fill: COLORS.lacivert, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip content={<GlassTooltip formatter={(v: any) => v} unit="%" />} cursor={{ fill: "rgba(10,168,160,0.06)" }} />
                <Bar dataKey="doluluk" radius={[0, 10, 10, 0]} barSize={22}>
                  {tesisBar.map((_, i) => <Cell key={i} fill={FACILITY_PALETTE[i % FACILITY_PALETTE.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>

        {/* ================= ŞEHİR DAĞILIMI (yalnızca Türkiye) ================= */}
        {sekme === "turkiye" && (
          <SectionCard title="Şehirlere Göre Ziyaretçi Dağılımı" subtitle="Seçili dönem, öne çıkan turizm illeri" icon={MapPin} delayMs={220}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sehirBar} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 8" stroke="rgba(11,37,69,0.08)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12.5, fill: COLORS.lacivert, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: COLORS.lacivert }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => v >= 1_000_000 ? `${(v/1_000_000).toFixed(1)}M` : v} />
                <Tooltip content={<GlassTooltip formatter={(v: any) => trFmt(v) + " kişi"} />} cursor={{ fill: "rgba(10,168,160,0.06)" }} />
                <Bar dataKey="ziyaretci" radius={[10, 10, 0, 0]} barSize={54}>
                  {sehirBar.map((_: any, i: number) => <Cell key={i} fill={PIE_PALETTE[i % PIE_PALETTE.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        )}

        {/* ================= VERİ TABLOSU ================= */}
        <SectionCard title="Aylık Ayrıntılı Veri Tablosu" subtitle={`${bolgeAdi} · ${yil}`} icon={Sparkles} delayMs={260} style={{ paddingBottom: 8 }}>
          <div style={{ overflowX: "auto", marginTop: 6 }}>
            <table className="veri-tablosu" style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: 720 }}>
              <thead>
                <tr>
                  {["Ay", "Turist Sayısı", "Gelir (Mn $)", "Doluluk (%)", "Ort. Kalış (gün)", "Kişi Başı Harcama ($)"].map((h, i) => (
                    <th key={h} style={{
                      textAlign: i === 0 ? "left" : "right", padding: "10px 14px", fontSize: 11.5,
                      textTransform: "uppercase", letterSpacing: 0.6, color: COLORS.deniz, fontWeight: 700,
                      borderBottom: `2px solid rgba(29,111,163,0.15)`, position: "sticky", top: 0, background: "rgba(255,255,255,0.9)",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {yilVeri && yilVeri.aylar.map((a: any, i: number) => {
                  const vurgulu = seciliAyNolar.includes(a.ayNo);
                  return (
                    <tr key={a.ayNo} style={{ background: vurgulu ? "rgba(10,168,160,0.09)" : i % 2 === 0 ? "rgba(11,37,69,0.015)" : "transparent" }}>
                      <td style={{ padding: "9px 14px", fontSize: 13.5, fontWeight: vurgulu ? 700 : 600, color: COLORS.lacivert }}>{a.ay}</td>
                      <td style={{ padding: "9px 14px", fontSize: 13, textAlign: "right", fontFamily: "JetBrains Mono, monospace", color: COLORS.lacivert }}>{trFmt(a.ziyaretci)}</td>
                      <td style={{ padding: "9px 14px", fontSize: 13, textAlign: "right", fontFamily: "JetBrains Mono, monospace", color: COLORS.lacivert }}>{trFmt(a.gelirMilyonUSD)}</td>
                      <td style={{ padding: "9px 14px", fontSize: 13, textAlign: "right", fontFamily: "JetBrains Mono, monospace", color: COLORS.lacivert }}>%{a.doluluk}</td>
                      <td style={{ padding: "9px 14px", fontSize: 13, textAlign: "right", fontFamily: "JetBrains Mono, monospace", color: COLORS.lacivert }}>{trFmt1(a.kalis)}</td>
                      <td style={{ padding: "9px 14px", fontSize: 13, textAlign: "right", fontFamily: "JetBrains Mono, monospace", color: COLORS.lacivert }}>${trFmt(a.harcama)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* ================= FOOTER ================= */}
        <footer className="animate-fadeUp" style={{
          marginTop: 14, textAlign: "center", padding: "26px 20px",
          background: "linear-gradient(135deg, rgba(11,37,69,0.04), rgba(10,168,160,0.06))",
          borderRadius: 24, border: "1px solid rgba(11,37,69,0.06)",
        }}>
          <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 13.5, color: COLORS.lacivert, marginBottom: 4 }}>
            Hazırlayan: Ufuk Öncel
          </div>
          <div style={{ fontSize: 11.5, color: COLORS.lacivert, opacity: 0.5, lineHeight: 1.6, maxWidth: 640, margin: "6px auto 0" }}>
            Tüm veriler, Türkiye Cumhuriyeti Kültür ve Turizm Bakanlığı (KTB) ile Türkiye İstatistik Kurumu (TÜİK) tarafından kamuoyuna sunulan 
            aylık raporlardan derlenmiştir. Bu panel, resmi kaynakları en şeffaf ve anlaşılır biçimde sunmayı amaçlar.
          </div>
        </footer>
      </main>
    </div>
  );
}
