import { InterpreterProfile, InterpreterEscalationState } from '../types/interpreter';
import { EmergencyContext } from '../types/context';

const SAMPLE_INTERPRETERS: InterpreterProfile[] = [
  {
    id: 'INT-8842',
    name: 'Priya Sharma',
    certification: 'Certified Master ISL Interpreter (ISLRTC Reg #8842)',
    languages: ['Indian Sign Language (ISL)', 'English', 'Hindi'],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    rating: 4.96,
    status: 'available',
    avgResponseSec: 12,
  },
  {
    id: 'INT-9104',
    name: 'Rahul Verma',
    certification: 'Emergency Medical Sign Relay Specialist (AIIMS / NAB Reg #9104)',
    languages: ['Indian Sign Language (ISL)', 'English', 'Marathi'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    rating: 4.94,
    status: 'available',
    avgResponseSec: 8,
  },
];

export class InterpreterService {
  public static async requestEscalation(
    _context: EmergencyContext,
    onStatusChange: (state: InterpreterEscalationState) => void
  ): Promise<InterpreterProfile> {
    // 1. Searching
    onStatusChange({
      status: 'searching',
      queuePosition: 1,
      estimatedWaitSec: 6,
    });

    await new Promise((res) => setTimeout(res, 1200));

    // 2. Connecting
    const selected = SAMPLE_INTERPRETERS[0];
    onStatusChange({
      status: 'connecting',
      assignedInterpreter: selected,
      queuePosition: 0,
      estimatedWaitSec: 2,
    });

    await new Promise((res) => setTimeout(res, 1400));

    // 3. Connected
    onStatusChange({
      status: 'connected',
      assignedInterpreter: selected,
      connectedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    return selected;
  }
}
