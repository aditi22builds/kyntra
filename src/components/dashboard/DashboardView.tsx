import React, { useState } from 'react';
import {
  Activity,
  Users,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Headphones,
  Eye,
  Search,
  Filter,
  RotateCcw,
} from 'lucide-react';
import { EmergencySession, InstitutionalMetrics } from '../../types/session';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ConfidenceIndicator } from '../confidence/ConfidenceIndicator';

interface DashboardProps {
  sessions: EmergencySession[];
  metrics: InstitutionalMetrics;
  onSelectSession: (session: EmergencySession) => void;
  onClearSession: () => void;
}

export const DashboardView: React.FC<DashboardProps> = ({
  sessions,
  metrics,
  onSelectSession,
  onClearSession,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = sessions.filter((s) => {
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchesSearch =
      s.sessionNumber.toString().includes(searchQuery) ||
      s.currentContext.person.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.currentContext.incident && s.currentContext.incident.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.currentContext.symptoms.some((sym) => sym.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-slate-100">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-blue-400">KYNTRA ACCESS</span>
            <Badge variant="prototype" size="sm">Demo Data Only</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
            Institutional Accessibility Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time emergency ISL communication triage, confidence monitoring, and interpreter escalation oversight.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onClearSession} icon={<RotateCcw className="w-3.5 h-3.5" />}>
            Reset Demo Data
          </Button>
          <div className="text-[11px] text-slate-400 font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            ● SYSTEM ACTIVE • REGION: IN-MUMBAI-ER
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Sessions */}
        <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Sessions</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">{metrics.activeSessions}</p>
          <p className="text-[11px] text-emerald-400 font-medium">● 3 active in triage bay</p>
        </div>

        {/* Emergency Sessions Today */}
        <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Emergencies Today</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">{metrics.emergencySessionsToday}</p>
          <p className="text-[11px] text-slate-400">Past 24 Hours</p>
        </div>

        {/* Interpreter Escalations */}
        <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Human Escalations</span>
            <Headphones className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold text-purple-300">{metrics.interpreterEscalations}</p>
          <p className="text-[11px] text-purple-400 font-medium">Auto-escalated (Low Conf / Request)</p>
        </div>

        {/* Avg Confirmation Time */}
        <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Confirm Time</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">{metrics.avgConfirmationTimeSec}s</p>
          <p className="text-[11px] text-slate-400">High-speed 1-tap UX</p>
        </div>
      </div>

      {/* Session Logs Table */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Live Emergency ISL Session Logs</h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any session row to inspect the complete audit trail.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-500 ml-1" />
              {['all', 'confirmed', 'escalated_to_interpreter', 'resolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                    filterStatus === st ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st.replace(/_/g, ' ')}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient / symptom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Session ID</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Reported Summary</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredSessions.map((s) => (
                <tr
                  key={s.sessionId}
                  onClick={() => onSelectSession(s)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono text-slate-400">{s.createdAt}</td>
                  <td className="py-3.5 px-4 font-bold text-white">Emergency #{s.sessionNumber}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">{s.currentContext.person}</td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-300">
                    {s.currentContext.incident || s.currentContext.symptoms.join(', ') || 'Medical consult'}
                  </td>
                  <td className="py-3.5 px-4">
                    <ConfidenceIndicator
                      tier={s.currentContext.confidenceTier}
                      score={s.currentContext.confidenceScore}
                      size="sm"
                    />
                  </td>
                  <td className="py-3.5 px-4">
                    {s.status === 'confirmed' && <Badge variant="success" size="sm">Confirmed</Badge>}
                    {s.status === 'escalated_to_interpreter' && <Badge variant="warning" size="sm">Relay Requested</Badge>}
                    {s.status === 'resolved' && <Badge variant="neutral" size="sm">Resolved</Badge>}
                    {s.status === 'active' && <Badge variant="info" size="sm">Active</Badge>}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 ml-auto">
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
