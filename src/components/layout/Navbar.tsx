import React, { useState } from 'react';
import { ShieldAlert, Activity, Users, Layers, Compass, Mic, Menu, X, RotateCcw, Presentation } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onClearSession: () => void;
  onStartPitchDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onClearSession,
  onStartPitchDemo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
    { id: 'emergency', label: 'Emergency Mode', icon: <ShieldAlert className="w-4 h-4 text-red-400" /> },
    { id: 'hearing', label: 'Hearing 2-Way', icon: <Mic className="w-4 h-4 text-blue-400" /> },
    { id: 'dashboard', label: 'Access Dashboard', icon: <Users className="w-4 h-4 text-emerald-400" /> },
    { id: 'architecture', label: 'Architecture', icon: <Layers className="w-4 h-4" /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Compass className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070C18]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('landing')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-900/30 border border-blue-400/30">
            {/* Minimal abstract communication motif */}
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 8l5 5-5 5" />
              <path d="M13 8l5 5-5 5" opacity="0.6" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">KYNTRA</span>
              <Badge variant="prototype" size="sm">Prototype • ISL</Badge>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">Technology that understands.</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onStartPitchDemo}
            icon={<Presentation className="w-3.5 h-3.5 text-amber-400" />}
            className="text-xs text-amber-300 hover:text-amber-200 border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20"
          >
            2-Min Demo
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onSelectTab('emergency')}
            icon={<ShieldAlert className="w-4 h-4 animate-pulse" />}
            className="font-bold text-xs"
          >
            Emergency Mode
          </Button>

          <button
            onClick={onClearSession}
            title="Privacy First: Reset session context"
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="danger"
            size="sm"
            onClick={() => onSelectTab('emergency')}
            icon={<ShieldAlert className="w-4 h-4" />}
            className="text-xs"
          >
            Emergency
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0B1120] px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentTab === item.id
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => {
                onStartPitchDemo();
                setMobileMenuOpen(false);
              }}
              icon={<Presentation className="w-4 h-4 text-amber-400" />}
            >
              2-Min Pitch Demo
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onClearSession();
                setMobileMenuOpen(false);
              }}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
