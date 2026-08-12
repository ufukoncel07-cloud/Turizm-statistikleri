import { useState, useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
  LineChart, Line, ComposedChart
} from 'recharts';
import {
  Users, DollarSign, BedDouble, Globe, TrendingUp, TrendingDown,
  Calendar, Clock, MapPin
} from 'lucide-react';
import { turkeyData, getQuarterMonths } from '../mockData';

const COLORS = ['#0891b2', '#0e7490', '#06b6d4', '#1d4ed8', '#3b82f6', '#0284c7', '#2563eb', '#67e8f9'];

const fmt = (n: number) => new Intl.NumberFormat('tr-TR').format(Math.round(n));
const fmtPct = (n: number) => `%${n.toFixed(1)}`;
const calcChange = (curr: number, prev: number) => {
  if (!prev) return null;
  return ((curr - prev) / prev) * 100;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'white', border: '1px solid #e2e8f0', borderRadius: 10,
        padding: '10px 14px', boxShadow: '0 4px 16px rgba(15,23,42,0.1)', fontSize: 13, minWidth: 160
      }}>
        <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{label}</div>
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontWeight: 600 }}>
            <span style={{ color: '#64748b', fontWeight: 500 }}>{p.name}</span>
            <span style={{ color: p.color }}>{typeof p.value === 'number' ? fmt(p.value) : p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const OccTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', boxShadow: '0 4px 16px rgba(15,23,42,0.1)', fontSize: 13 }}>
        <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{label}</div>
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontWeight: 600 }}>
            <span style={{ color: '#64748b', fontWeight: 500 }}>{p.name}</span>
            <span style={{ color: p.color }}>%{Number(p.value).toFixed(1)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const YEARS = turkeyData.map(d => d.year);
const MONTHS_ALL = [
  { label: 'Ocak', val: 1 }, { label: 'Şubat', val: 2 }, { label: 'Mart', val: 3 },
  { label: 'Nisan', val: 4 }, { label: 'Mayıs', val: 5 }, { label: 'Haziran', val: 6 },
  { label: 'Temmuz', val: 7 }, { label: 'Ağustos', val: 8 }, { label: 'Eylül', val: 9 },
  { label: 'Ekim', val: 10 }, { label: 'Kasım', val: 11 }, { label: 'Aralık', val: 12 }
];

export default function Turkey() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [periodType, setPeriodType] = useState<'yearly' | 'quarterly' | 'monthly'>('yearly');
  const [selectedQuarter, setSelectedQuarter] = useState<number>(2);
  const [selectedMonth, setSelectedMonth] = useState<number>(8);
  const [compareYears, setCompareYears] = useState<number[]>([2025, 2024]);

  const toggleCompareYear = (y: number) => {
    if (y === selectedYear) return;
    setCompareYears(prev =>
      prev.includes(y) ? prev.filter(x => x !== y) : [...prev.slice(-2), y].slice(-3)
    );
  };

  const currentYearData = useMemo(() => turkeyData.find(d => d.year === selectedYear), [selectedYear]);
  const prevYearData = useMemo(() => turkeyData.find(d => d.year === selectedYear - 1), [selectedYear]);

  const filteredMonths = useMemo(() => {
    if (!currentYearData) return [];
    if (periodType === 'yearly') return currentYearData.months;
    if (periodType === 'quarterly') {
      const qMonths = getQuarterMonths(selectedQuarter);
      return currentYearData.months.filter(m => qMonths.includes(m.month));
    }
    return currentYearData.months.filter(m => m.month === selectedMonth);
  }, [currentYearData, periodType, selectedQuarter, selectedMonth]);

  const kpiData = useMemo(() => {
    const visitors = filteredMonths.reduce((s, m) => s + m.visitors, 0);
    const revenue = filteredMonths.reduce((s, m) => s + m.revenue, 0);
    const validOcc = filteredMonths.filter(m => m.occupancy > 0);
    const avgOcc = validOcc.length ? validOcc.reduce((s, m) => s + m.occupancy, 0) / validOcc.length : 0;
    const avgStay = validOcc.length ? validOcc.reduce((s, m) => s + m.avgStayDays, 0) / validOcc.length : 0;
    const avgSpend = validOcc.length ? validOcc.reduce((s, m) => s + m.avgSpendPerPerson, 0) / validOcc.length : 0;
    return { visitors, revenue, avgOcc, avgStay, avgSpend };
  }, [filteredMonths]);

  const prevKpiData = useMemo(() => {
    if (!prevYearData) return null;
    let months = prevYearData.months;
    if (periodType === 'quarterly') {
      const qMonths = getQuarterMonths(selectedQuarter);
      months = months.filter(m => qMonths.includes(m.month));
    } else if (periodType === 'monthly') {
      months = months.filter(m => m.month === selectedMonth);
    }
    const visitors = months.reduce((s, m) => s + m.visitors, 0);
    const revenue = months.reduce((s, m) => s + m.revenue, 0);
    const validOcc = months.filter(m => m.occupancy > 0);
    const avgOcc = validOcc.length ? validOcc.reduce((s, m) => s + m.occupancy, 0) / validOcc.length : 0;
    return { visitors, revenue, avgOcc };
  }, [prevYearData, periodType, selectedQuarter, selectedMonth]);

  // Annual totals for long-term trend
  const annualTrend = useMemo(() =>
    turkeyData.map(d => ({ year: String(d.year), visitors: d.totalVisitors, revenue: d.totalRevenue })),
    []
  );

  // Comparison data
  const comparisonData = useMemo(() => {
    const years = [selectedYear, ...compareYears].sort((a, b) => a - b);
    return MONTHS_ALL.map(m => {
      const row: any = { monthName: m.label.slice(0, 3) };
      years.forEach(y => {
        const yd = turkeyData.find(d => d.year === y);
        const md = yd?.months.find(mo => mo.month === m.val);
        row[`${y}`] = md?.visitors ?? 0;
      });
      return row;
    });
  }, [selectedYear, compareYears]);

  const comparisonYears = [selectedYear, ...compareYears].sort((a, b) => a - b);
  const yearColors: Record<number, string> = {};
  comparisonYears.forEach((y, i) => { yearColors[y] = COLORS[i]; });

  const natData = useMemo(() => {
    if (!currentYearData) return [];
    const total = currentYearData.nationalities.reduce((s, n) => s + n.visitors, 0);
    return currentYearData.nationalities.map(n => ({
      ...n,
      pct: total > 0 ? ((n.visitors / total) * 100).toFixed(1) : '0.0'
    }));
  }, [currentYearData]);

  const regionData = useMemo(() => {
    if (!currentYearData) return [];
    const total = currentYearData.regions.reduce((s, r) => s + r.visitors, 0);
    return currentYearData.regions.map(r => ({
      ...r,
      pct: total > 0 ? ((r.visitors / total) * 100).toFixed(1) : '0.0'
    }));
  }, [currentYearData]);

  const occByTypeData = useMemo(() => {
    return filteredMonths.filter(m => m.occupancy > 0).map(m => ({
      name: m.monthName.slice(0, 3),
      '5 Yıldız': m.occupancyByType.fiveStar,
      '4 Yıldız': m.occupancyByType.fourStar,
      '3★ ve altı': m.occupancyByType.threeStarAndLess,
      'Tatil Köyü': m.occupancyByType.holidayVillage,
    }));
  }, [filteredMonths]);

  const renderChange = (curr: number, prev: number | undefined) => {
    if (!prev) return null;
    const pct = calcChange(curr, prev);
    if (pct === null) return null;
    const isPos = pct >= 0;
    return (
      <div className={`stat-card-change ${isPos ? 'positive' : 'negative'}`}>
        {isPos ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {isPos ? '+' : ''}{pct.toFixed(1)}% geçen yıla göre
      </div>
    );
  };

  const periodLabel = periodType === 'yearly'
    ? `${selectedYear} Yılı Tümü`
    : periodType === 'quarterly'
      ? `${selectedYear} ${selectedQuarter}. Çeyrek`
      : `${selectedYear} ${MONTHS_ALL.find(m => m.val === selectedMonth)?.label}`;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title">
          <h2>Türkiye Turizm İstatistikleri</h2>
          <p>{periodLabel} · Kültür ve Turizm Bakanlığı Verileri</p>
        </div>
        <div className="page-actions">
          <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Clock size={13} /> Son veri: Haziran 2026
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">Yıl</span>
          <select className="filter-select" value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))}>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="filter-divider" />
        <div className="filter-group">
          <span className="filter-label">Dönem</span>
          <select className="filter-select" value={periodType} onChange={e => setPeriodType(e.target.value as any)}>
            <option value="yearly">Yıllık</option>
            <option value="quarterly">Çeyreklik</option>
            <option value="monthly">Aylık</option>
          </select>
        </div>
        {periodType === 'quarterly' && (
          <div className="filter-group">
            <span className="filter-label">Çeyrek</span>
            <select className="filter-select" value={selectedQuarter} onChange={e => setSelectedQuarter(Number(e.target.value))}>
              <option value={1}>1. Çeyrek (Oca-Mar)</option>
              <option value={2}>2. Çeyrek (Nis-Haz)</option>
              <option value={3}>3. Çeyrek (Tem-Eyl)</option>
              <option value={4}>4. Çeyrek (Eki-Ara)</option>
            </select>
          </div>
        )}
        {periodType === 'monthly' && (
          <div className="filter-group">
            <span className="filter-label">Ay</span>
            <select className="filter-select" value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))}>
              {MONTHS_ALL.map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-card-accent" />
          <div className="stat-card-icon" style={{ background: 'rgba(8,145,178,0.1)' }}>
            <Users size={18} style={{ color: 'var(--accent-teal)' }} />
          </div>
          <div className="stat-card-label">Gelen Ziyaretçi</div>
          <div className="stat-card-value">{fmt(kpiData.visitors)}</div>
          {renderChange(kpiData.visitors, prevKpiData?.visitors)}
        </div>

        <div className="stat-card">
          <div className="stat-card-accent" style={{ background: 'linear-gradient(90deg, #1d4ed8, #3b82f6)' }} />
          <div className="stat-card-icon" style={{ background: 'rgba(29,78,216,0.1)' }}>
            <DollarSign size={18} style={{ color: 'var(--accent-blue)' }} />
          </div>
          <div className="stat-card-label">Turizm Geliri</div>
          <div className="stat-card-value">${fmt(kpiData.revenue)}<span className="unit">mln</span></div>
          {renderChange(kpiData.revenue, prevKpiData?.revenue)}
        </div>

        <div className="stat-card">
          <div className="stat-card-accent" style={{ background: 'linear-gradient(90deg, #0284c7, #06b6d4)' }} />
          <div className="stat-card-icon" style={{ background: 'rgba(2,132,199,0.1)' }}>
            <BedDouble size={18} style={{ color: '#0284c7' }} />
          </div>
          <div className="stat-card-label">Ort. Doluluk Oranı</div>
          <div className="stat-card-value">{fmtPct(kpiData.avgOcc)}</div>
          {renderChange(kpiData.avgOcc, prevKpiData?.avgOcc)}
        </div>

        <div className="stat-card">
          <div className="stat-card-accent" style={{ background: 'linear-gradient(90deg, #0e7490, #0891b2)' }} />
          <div className="stat-card-icon" style={{ background: 'rgba(14,116,144,0.1)' }}>
            <Clock size={18} style={{ color: '#0e7490' }} />
          </div>
          <div className="stat-card-label">Ort. Kalış Süresi</div>
          <div className="stat-card-value">{kpiData.avgStay.toFixed(1)}<span className="unit">gün</span></div>
        </div>

        <div className="stat-card">
          <div className="stat-card-accent" style={{ background: 'linear-gradient(90deg, #2563eb, #1d4ed8)' }} />
          <div className="stat-card-icon" style={{ background: 'rgba(37,99,235,0.1)' }}>
            <Globe size={18} style={{ color: '#2563eb' }} />
          </div>
          <div className="stat-card-label">Kişi Başı Harcama</div>
          <div className="stat-card-value">${fmt(kpiData.avgSpend)}</div>
        </div>
      </div>

      {/* Annual Long-Term Trend */}
      <div className="chart-card" style={{ marginBottom: 20 }}>
        <div className="chart-card-header">
          <div>
            <div className="chart-card-title">Yıllık Uzun Vadeli Trend (2019–2026)</div>
            <div className="chart-card-subtitle">Türkiye Toplam Ziyaretçi Sayısı ve Geliri</div>
          </div>
        </div>
        <div className="chart-area" style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={annualTrend} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} />
              <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false}
                tickFormatter={v => v >= 1000000 ? (v / 1000000).toFixed(0) + 'M' : v} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}B`} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12.5 }}
                formatter={(v: number, n: string) => [n === 'visitors' ? fmt(v) + ' kişi' : `$${fmt(v)} mln`, n === 'visitors' ? 'Ziyaretçi' : 'Gelir']} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="visitors" name="Ziyaretçi" fill="rgba(8,145,178,0.15)" stroke="#0891b2" strokeWidth={1} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" name="Gelir (mln $)" stroke="#1d4ed8" strokeWidth={2.5} dot={{ r: 4, fill: '#1d4ed8' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Visitor + Comparison */}
      <div className="charts-row charts-row-2" style={{ marginBottom: 20 }}>
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Aylık Ziyaretçi Sayısı</div>
              <div className="chart-card-subtitle">{periodLabel}</div>
            </div>
          </div>
          {filteredMonths.filter(m => m.visitors > 0).length === 0
            ? <div className="no-data"><Calendar size={24} /> Seçilen dönem için veri bulunmamaktadır.</div>
            : (
              <div className="chart-area" style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredMonths} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="tkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="monthName" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false}
                      tickFormatter={v => v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : v >= 1000 ? (v / 1000).toFixed(0) + 'K' : v} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="visitors" name="Ziyaretçi" stroke="#1d4ed8" strokeWidth={2.5}
                      fill="url(#tkGrad)" dot={{ fill: '#1d4ed8', r: 3 }} activeDot={{ r: 5 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
        </div>

        {/* Comparison */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Yıllara Göre Karşılaştırma</div>
              <div className="chart-card-subtitle">Aylık Ziyaretçi (Kişi)</div>
            </div>
          </div>
          <div className="comparison-bar">
            <span className="comparison-label">Karşılaştır:</span>
            <div className="comparison-years">
              {YEARS.filter(y => y !== selectedYear).map(y => (
                <button key={y} className={`year-btn ${compareYears.includes(y) ? 'selected' : ''}`}
                  onClick={() => toggleCompareYear(y)}
                  style={compareYears.includes(y) ? { background: yearColors[y], borderColor: yearColors[y] } : {}}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-area" style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparisonData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="monthName" stroke="#94a3b8" tick={{ fontSize: 11 }} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} tickLine={false} axisLine={false}
                  tickFormatter={v => v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : v >= 1000 ? (v / 1000).toFixed(0) + 'K' : v} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {comparisonYears.map(y => (
                  <Line key={y} type="monotone" dataKey={String(y)} name={String(y)} stroke={yearColors[y]}
                    strokeWidth={y === selectedYear ? 2.5 : 1.5}
                    strokeDasharray={y === selectedYear ? undefined : '5 3'}
                    dot={false} activeDot={{ r: 4 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Nationality + Region Pies */}
      <div className="charts-row charts-row-equal" style={{ marginBottom: 20 }}>
        {/* Nationality */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Milliyetlere Göre Ziyaretçi Dağılımı</div>
              <div className="chart-card-subtitle">{selectedYear} · Toplam</div>
            </div>
          </div>
          <div className="chart-area" style={{ height: 190 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={natData} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                  paddingAngle={3} dataKey="visitors" nameKey="country" stroke="none"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, pct }) => {
                    const R = Math.PI / 180;
                    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + r * Math.cos(-midAngle * R);
                    const y = cy + r * Math.sin(-midAngle * R);
                    if (parseFloat(pct) < 4) return null;
                    return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={700}>{pct}%</text>;
                  }}
                  labelLine={false}
                >
                  {natData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number, n: string) => [fmt(v) + ' kişi', n]}
                  contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12.5 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="custom-legend">
            {natData.map((n, i) => (
              <div key={n.country} className="legend-item">
                <div className="legend-left">
                  <div className="legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="legend-label">{n.country}</span>
                </div>
                <span className="legend-value">{fmt(n.visitors)}<span className="legend-pct">({n.pct}%)</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Region */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Bölgelere Göre Turist Dağılımı</div>
              <div className="chart-card-subtitle">{selectedYear} · Toplam</div>
            </div>
          </div>
          <div className="chart-area" style={{ height: 190 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 11 }} tickLine={false} axisLine={false}
                  tickFormatter={v => v >= 1000000 ? (v / 1000000).toFixed(0) + 'M' : v >= 1000 ? (v / 1000).toFixed(0) + 'K' : v} />
                <YAxis type="category" dataKey="region" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={70} />
                <Tooltip formatter={(v: number) => [fmt(v) + ' kişi', 'Turist']}
                  contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12.5 }} />
                <Bar dataKey="visitors" radius={[0, 4, 4, 0]}>
                  {regionData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="custom-legend" style={{ marginTop: 8 }}>
            {regionData.map((r, i) => (
              <div key={r.region} className="legend-item">
                <div className="legend-left">
                  <div className="legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="legend-label">{r.region}</span>
                </div>
                <span className="legend-value">{fmt(r.visitors)}<span className="legend-pct">({r.pct}%)</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Occupancy by Tesis Type */}
      {occByTypeData.length > 0 && (
        <div className="chart-card" style={{ marginBottom: 20 }}>
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Tesis Tiplerine Göre Doluluk Oranları</div>
              <div className="chart-card-subtitle">{periodLabel} · %</div>
            </div>
          </div>
          <div className="chart-area" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occByTypeData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} />
                <YAxis domain={[0, 105]} stroke="#94a3b8" tick={{ fontSize: 11 }} tickLine={false} axisLine={false}
                  tickFormatter={v => `%${v}`} />
                <Tooltip content={<OccTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11.5 }} />
                <Bar dataKey="5 Yıldız" fill={COLORS[0]} radius={[3, 3, 0, 0]} />
                <Bar dataKey="4 Yıldız" fill={COLORS[1]} radius={[3, 3, 0, 0]} />
                <Bar dataKey="3★ ve altı" fill={COLORS[4]} radius={[3, 3, 0, 0]} />
                <Bar dataKey="Tatil Köyü" fill={COLORS[2]} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Monthly Detail Table */}
      <div className="chart-card">
        <div className="chart-card-header">
          <div>
            <div className="chart-card-title">Aylık Ayrıntılı Tablo</div>
            <div className="chart-card-subtitle">{periodLabel}</div>
          </div>
        </div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ay</th>
                <th className="right">Ziyaretçi Sayısı</th>
                <th className="right">Gelir (mln $)</th>
                <th>Genel Doluluk</th>
                <th className="right">5★ Doluluk</th>
                <th className="right">4★ Doluluk</th>
                <th className="right">Tatil Köyü</th>
                <th className="right">Ort. Kalış (gün)</th>
                <th className="right">Kişi Başı ($)</th>
              </tr>
            </thead>
            <tbody>
              {filteredMonths.map(m => (
                <tr key={m.month}>
                  <td>{m.monthName}</td>
                  <td className="right">{m.visitors > 0 ? fmt(m.visitors) : <span style={{ color: '#94a3b8' }}>—</span>}</td>
                  <td className="right">{m.revenue > 0 ? fmt(m.revenue) : <span style={{ color: '#94a3b8' }}>—</span>}</td>
                  <td>
                    {m.occupancy > 0 ? (
                      <div className="occupancy-bar-cell">
                        <div className="occ-bar-bg">
                          <div className="occ-bar-fill" style={{ width: `${m.occupancy}%` }} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 12.5, minWidth: 38 }}>%{m.occupancy.toFixed(1)}</span>
                      </div>
                    ) : <span style={{ color: '#94a3b8' }}>Kapalı/Veri yok</span>}
                  </td>
                  <td className="right">{m.occupancyByType.fiveStar > 0 ? `%${m.occupancyByType.fiveStar.toFixed(1)}` : '—'}</td>
                  <td className="right">{m.occupancyByType.fourStar > 0 ? `%${m.occupancyByType.fourStar.toFixed(1)}` : '—'}</td>
                  <td className="right">{m.occupancyByType.holidayVillage > 0 ? `%${m.occupancyByType.holidayVillage.toFixed(1)}` : '—'}</td>
                  <td className="right">{m.avgStayDays > 0 ? m.avgStayDays.toFixed(1) : '—'}</td>
                  <td className="right">{m.avgSpendPerPerson > 0 ? `$${fmt(m.avgSpendPerPerson)}` : '—'}</td>
                </tr>
              ))}
              {filteredMonths.length > 1 && (
                <tr style={{ background: 'rgba(8,145,178,0.04)', fontWeight: 700 }}>
                  <td>TOPLAM / ORT.</td>
                  <td className="right">{fmt(kpiData.visitors)}</td>
                  <td className="right">{fmt(kpiData.revenue)}</td>
                  <td>
                    <div className="occupancy-bar-cell">
                      <div className="occ-bar-bg">
                        <div className="occ-bar-fill" style={{ width: `${kpiData.avgOcc}%` }} />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: 12.5, minWidth: 38 }}>%{kpiData.avgOcc.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="right" colSpan={5} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
