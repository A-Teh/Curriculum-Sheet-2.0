import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CircleHelp,
  GraduationCap,
  List,
  ListChecks,
  PanelLeftClose,
  PanelLeftOpen,
  Upload,
} from "lucide-react";
import "./Sidebar.css";

type NavItemProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  isOpen: boolean;
  active?: boolean;
};

function NavItem({ href, label, icon: Icon, isOpen, active = false }: NavItemProps) {
  return (
    <li>
      <a
        href={href}
        className={`nav-item ${active ? "active" : ""}`}
        title={isOpen ? undefined : label}
      >
        <Icon className="nav-icon" size={18} />
        {isOpen && <span>{label}</span>}
      </a>
    </li>
  );
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  function toggleSidebar() {
    setIsOpen((prev) => !prev);
  }

  const ToggleIcon = isOpen ? PanelLeftClose : PanelLeftOpen;

  return (
    <aside className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      <div className="sidebar-top">
        <button
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isOpen}
        >
          <ToggleIcon size={20} />
        </button>

        {isOpen && (
          <div className="brand">
            <div className="brand-mark">
              <GraduationCap size={20} />
            </div>
            <div className="brand-text">
              <span className="brand-name">Curriculum Sheet</span>
              <span className="brand-sub">University of Rhode Island</span>
            </div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {isOpen && <span className="nav-label">Views</span>}
        <ul>
          <NavItem href="#major" label="Major View" icon={ListChecks} isOpen={isOpen} />
          <NavItem href="#semester" label="Semester View" icon={CalendarDays} isOpen={isOpen} />
          <NavItem href="#classlist" label="Class List" icon={List} isOpen={isOpen} active />
        </ul>

        {isOpen && <span className="nav-label">Data</span>}
        <ul>
          <NavItem href="#import" label="Import Transcript" icon={Upload} isOpen={isOpen} />
        </ul>
      </nav>

      <div className="sidebar-footer">
        <ul>
          <NavItem href="#faq" label="FAQ" icon={CircleHelp} isOpen={isOpen} />
        </ul>
        <div className="user-chip">
          <div className="avatar">G</div>
          {isOpen && (
            <div className="user-info">
              <span className="user-name">Guest</span>
              <span className="user-sub">Sign in to save progress</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}