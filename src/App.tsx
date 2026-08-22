import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AccessibilityBar } from './components/layout/AccessibilityBar';
import { LandingPage } from './views/LandingPage';
import { EmergencyModeView } from './views/EmergencyModeView';
import { HearingPersonMode } from './components/hearing/HearingPersonMode';
import { DashboardView } from './components/dashboard/DashboardView';
import { SessionDetailModal } from './components/dashboard/SessionDetailModal';
import { ArchitectureView } from './views/ArchitectureView';
import { RoadmapView } from './views/RoadmapView';
import { PitchDeckView } from './views/PitchDeckView';
import { EmergencyContext } from './types/context';
import { EmergencySession, InstitutionalMetrics } from './types/session';
import { StorageService } from './services/StorageService';
import { ContextExtractionService } from './services/ContextExtractionService';
import { SpeechService } from './services/SpeechService';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [theme, setTheme] = useState<'default' | 'contrast' | 'clinical'>('default');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [ttsAnnouncements, setTtsAnnouncements] = useState(true);

  // Active session context
  const [context, setContext] = useState<EmergencyContext>(() => ContextExtractionService.createEmptyContext());
  const [sessions, setSessions] = useState<EmergencySession[]>(() => StorageService.getInitialSessions());
  const [metrics, setMetrics] = useState<InstitutionalMetrics>(() => StorageService.getMetrics());

  // Dashboard modal
  const [selectedSession, setSelectedSession] = useState<EmergencySession | null>(null);

  // Update context handler
  const handleUpdateContext = (updated: Partial<EmergencyContext>) => {
    setContext((prev) => {
      const next = {
        ...prev,
        ...updated,
        updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      if (ttsAnnouncements && updated.symptoms && updated.symptoms.length > 0) {
        // SpeechService.speak(`Added symptom: ${updated.symptoms[updated.symptoms.length - 1]}`);
      }
      return next;
    });
  };

  // Reset / Clear Session
  const handleClearSession = () => {
    StorageService.clearSession();
    setContext(ContextExtractionService.createEmptyContext());
  };

  // Theme application
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-contrast', 'theme-clinical');
    if (theme === 'contrast') root.classList.add('theme-contrast');
    if (theme === 'clinical') root.classList.add('theme-clinical');
  }, [theme]);

  // Font size scale class
  const fontScaleClass = {
    normal: 'text-base',
    large: 'text-lg',
    xl: 'text-xl',
  }[fontSize];

  return (
    <div className={`min-h-screen flex flex-col bg-[#070C18] text-slate-100 ${fontScaleClass}`}>
      {/* Top Accessibility Bar */}
      <AccessibilityBar
        theme={theme}
        onThemeChange={setTheme}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        ttsAnnouncements={ttsAnnouncements}
        onToggleTTS={() => setTtsAnnouncements(!ttsAnnouncements)}
      />

      {/* Main Brand Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onClearSession={handleClearSession}
        onStartPitchDemo={() => setCurrentTab('pitch_demo')}
      />

      {/* Content View Router */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-6">
        {currentTab === 'landing' && (
          <LandingPage
            onStartEmergency={() => setCurrentTab('emergency')}
            onSelectTab={setCurrentTab}
            onStartPitchDemo={() => setCurrentTab('pitch_demo')}
          />
        )}

        {currentTab === 'emergency' && (
          <EmergencyModeView
            context={context}
            onUpdateContext={handleUpdateContext}
            onClearSession={handleClearSession}
            onStartPitchDemo={() => setCurrentTab('pitch_demo')}
            onSwitchToHearingMode={() => setCurrentTab('hearing')}
          />
        )}

        {currentTab === 'hearing' && (
          <div className="py-6">
            <HearingPersonMode
              context={context}
              onUpdateContext={handleUpdateContext}
              onSendISLMessage={(msg) => handleUpdateContext({ symptoms: [...context.symptoms, msg] })}
            />
          </div>
        )}

        {currentTab === 'dashboard' && (
          <div className="py-6">
            <DashboardView
              sessions={sessions}
              metrics={metrics}
              onSelectSession={(s) => setSelectedSession(s)}
              onClearSession={handleClearSession}
            />
          </div>
        )}

        {currentTab === 'architecture' && (
          <div className="py-6">
            <ArchitectureView />
          </div>
        )}

        {currentTab === 'roadmap' && (
          <div className="py-6">
            <RoadmapView
              onStartEmergency={() => setCurrentTab('emergency')}
              onStartPitchDemo={() => setCurrentTab('pitch_demo')}
            />
          </div>
        )}

        {currentTab === 'pitch_demo' && (
          <div className="py-6">
            <PitchDeckView onReturnToApp={() => setCurrentTab('emergency')} />
          </div>
        )}
      </main>

      {/* Dashboard Session Detail Modal */}
      <SessionDetailModal
        isOpen={!!selectedSession}
        onClose={() => setSelectedSession(null)}
        session={selectedSession}
        onEscalate={() => {
          if (selectedSession) {
            setSessions((prev) =>
              prev.map((s) =>
                s.sessionId === selectedSession.sessionId ? { ...s, status: 'escalated_to_interpreter' } : s
              )
            );
            setSelectedSession(null);
          }
        }}
        onResolve={() => {
          if (selectedSession) {
            setSessions((prev) =>
              prev.map((s) =>
                s.sessionId === selectedSession.sessionId ? { ...s, status: 'resolved' } : s
              )
            );
            setSelectedSession(null);
          }
        }}
      />

      {/* Global Footer */}
      <Footer onSelectTab={setCurrentTab} />
    </div>
  );
};
