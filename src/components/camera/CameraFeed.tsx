import React, { useRef, useState, useEffect } from 'react';
import { Camera, CameraOff, Video, ShieldCheck, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { GestureVisualizer } from './GestureVisualizer';

interface CameraFeedProps {
  isSigningActive: boolean;
  onFrameCapture?: () => void;
  detectedLandmarks?: boolean;
}

export const CameraFeed: React.FC<CameraFeedProps> = ({
  isSigningActive,
  detectedLandmarks = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const startCamera = async () => {
    setIsInitializing(true);
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user',
          },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setCameraActive(true);
      } else {
        setCameraError('Camera API not available in this environment. Running in simulated viewport mode.');
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError('Camera access not granted. You can communicate via Typing, Presets, or Speech.');
      setCameraActive(false);
    } finally {
      setIsInitializing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    // Auto start camera if available
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="relative w-full aspect-video md:aspect-[16/10] bg-[#090E1A] border-2 border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
      {/* Video Element / Simulated Viewport */}
      {cameraActive ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover transform -scale-x-100"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0F172A] to-[#070C18] p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-3 text-slate-400">
            <Camera className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-slate-200">ISL Visual Capture Viewport</h4>
          <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
            {cameraError || 'Camera inactive. Activate webcam for live gesture landmark visualization.'}
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={startCamera}
            icon={isInitializing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
          >
            {isInitializing ? 'Connecting Camera...' : 'Enable Live Camera'}
          </Button>
        </div>
      )}

      {/* Signing Guide Overlay & Hand Landmarks */}
      {cameraActive && detectedLandmarks && (
        <GestureVisualizer isSigningActive={isSigningActive} />
      )}

      {/* Upper Status Header */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isSigningActive ? 'bg-emerald-400' : 'bg-blue-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                isSigningActive ? 'bg-emerald-500' : 'bg-blue-500'
              }`}
            />
          </span>
          <span className="text-xs font-bold tracking-wide uppercase text-white drop-shadow">
            {isSigningActive ? '● RECOGNIZING ISL GESTURES' : '● READY • POSITION IN FRAME'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-300 border border-slate-700">
            Prototype Recognition Mode
          </span>
          {cameraActive && (
            <button
              onClick={stopCamera}
              className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-slate-300 hover:text-white transition-colors"
              title="Turn off camera"
            >
              <CameraOff className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Lower Guidelines & Privacy Badge */}
      <div className="relative z-10 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="flex items-center gap-1.5 text-xs text-slate-300 drop-shadow">
          <span className="font-semibold text-blue-300">Signing Space:</span>
          <span>Chest to head height, both hands visible.</span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Local processing • No video is recorded</span>
        </div>
      </div>
    </div>
  );
};
