import React, { useEffect, useState } from 'react';

interface GestureVisualizerProps {
  isSigningActive: boolean;
}

export const GestureVisualizer: React.FC<GestureVisualizerProps> = ({ isSigningActive }) => {
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((p) => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Simulated keypoints representing hands, wrists, face and torso bounds
  const leftWrist = { x: 38 + Math.sin(pulsePhase * 0.1) * 3, y: 65 + Math.cos(pulsePhase * 0.1) * 4 };
  const rightWrist = { x: 62 - Math.sin(pulsePhase * 0.1) * 3, y: 62 - Math.cos(pulsePhase * 0.1) * 4 };
  const nose = { x: 50, y: 32 };
  const leftEye = { x: 47, y: 28 };
  const rightEye = { x: 53, y: 28 };

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Upper Torso Alignment Bounding Frame */}
      <div className="absolute top-[18%] left-[22%] right-[22%] bottom-[15%] border-2 border-dashed border-blue-400/40 rounded-3xl transition-all duration-300 flex flex-col justify-between p-3">
        {/* Frame Corner Accents */}
        <div className="flex justify-between">
          <span className="w-3 h-3 border-t-2 border-l-2 border-blue-400 rounded-tl" />
          <span className="w-3 h-3 border-t-2 border-r-2 border-blue-400 rounded-tr" />
        </div>
        <div className="flex justify-between">
          <span className="w-3 h-3 border-b-2 border-l-2 border-blue-400 rounded-bl" />
          <span className="w-3 h-3 border-b-2 border-r-2 border-blue-400 rounded-br" />
        </div>
      </div>

      {/* Landmark keypoints and skeleton HUD */}
      <svg className="w-full h-full absolute inset-0">
        {/* Connection lines */}
        <line
          x1={`${nose.x}%`}
          y1={`${nose.y}%`}
          x2="50%"
          y2="50%"
          stroke="rgba(59, 130, 246, 0.4)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <line
          x1="50%"
          y1="50%"
          x2={`${leftWrist.x}%`}
          y2={`${leftWrist.y}%`}
          stroke={isSigningActive ? 'rgba(16, 185, 129, 0.7)' : 'rgba(59, 130, 246, 0.4)'}
          strokeWidth="2.5"
        />
        <line
          x1="50%"
          y1="50%"
          x2={`${rightWrist.x}%`}
          y2={`${rightWrist.y}%`}
          stroke={isSigningActive ? 'rgba(16, 185, 129, 0.7)' : 'rgba(59, 130, 246, 0.4)'}
          strokeWidth="2.5"
        />

        {/* Face points */}
        <circle cx={`${nose.x}%`} cy={`${nose.y}%`} r="4" fill="#60A5FA" opacity="0.8" />
        <circle cx={`${leftEye.x}%`} cy={`${leftEye.y}%`} r="3" fill="#60A5FA" opacity="0.8" />
        <circle cx={`${rightEye.x}%`} cy={`${rightEye.y}%`} r="3" fill="#60A5FA" opacity="0.8" />

        {/* Hand Landmark clusters */}
        {/* Left hand */}
        <circle
          cx={`${leftWrist.x}%`}
          cy={`${leftWrist.y}%`}
          r="8"
          fill={isSigningActive ? '#10B981' : '#3B82F6'}
          className="landmark-dot"
          opacity="0.9"
        />
        <circle cx={`${leftWrist.x - 3}%`} cy={`${leftWrist.y - 6}%`} r="4" fill="#38BDF8" opacity="0.8" />
        <circle cx={`${leftWrist.x + 2}%`} cy={`${leftWrist.y - 8}%`} r="4" fill="#38BDF8" opacity="0.8" />
        <circle cx={`${leftWrist.x + 6}%`} cy={`${leftWrist.y - 5}%`} r="4" fill="#38BDF8" opacity="0.8" />

        {/* Right hand */}
        <circle
          cx={`${rightWrist.x}%`}
          cy={`${rightWrist.y}%`}
          r="8"
          fill={isSigningActive ? '#10B981' : '#3B82F6'}
          className="landmark-dot"
          opacity="0.9"
        />
        <circle cx={`${rightWrist.x - 5}%`} cy={`${rightWrist.y - 6}%`} r="4" fill="#38BDF8" opacity="0.8" />
        <circle cx={`${rightWrist.x}%`} cy={`${rightWrist.y - 8}%`} r="4" fill="#38BDF8" opacity="0.8" />
        <circle cx={`${rightWrist.x + 5}%`} cy={`${rightWrist.y - 5}%`} r="4" fill="#38BDF8" opacity="0.8" />
      </svg>

      {/* Floating Detection Status tag */}
      {isSigningActive && (
        <div className="absolute top-[22%] left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur border border-emerald-500/40 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          TRACKING: 42 3D KEYPOINTS • 60 FPS
        </div>
      )}
    </div>
  );
};
