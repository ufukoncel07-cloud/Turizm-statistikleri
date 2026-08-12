import { NavLink, Outlet } from 'react-router-dom';
import { BarChart3, Globe, Info } from 'lucide-react';

const Layout = () => {
  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <BarChart3 size={20} />
          </div>
          <div className="sidebar-brand-text">
            <h1>TurizmStats</h1>
            <span>Kültür ve Turizm Bakanlığı</span>
          </div>
        </div>

        <div className="sidebar-section-label" style={{ marginBottom: 8 }}>Bölgeler</div>
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <Globe size={16} className="nav-icon" />
            Antalya Verileri
          </NavLink>
          <NavLink
            to="/turkey"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <Globe size={16} className="nav-icon" />
            Türkiye Verileri
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 8 }}>
            <Info size={13} style={{ color: 'var(--text-muted)', marginTop: 1, flexShrink: 0 }} />
            <p>Veriler Kültür ve Turizm Bakanlığı aylık bültenleri ile TÜİK açıklamalarından derlenmektedir.</p>
          </div>
          <p style={{ color: 'var(--accent-teal)', fontWeight: 600, fontSize: 11 }}>Son veri: Haziran 2026</p>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
