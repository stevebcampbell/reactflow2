'use client';

import { Button } from '@/components/ui/button';

interface FlowControlsProps {
  controlMode: 'default' | 'design';
  onControlModeChange: (mode: 'default' | 'design') => void;
}

export function FlowControls({
  controlMode,
  onControlModeChange,
}: FlowControlsProps) {
  return (
    <div className="w-80 border-r bg-white dark:bg-slate-900 p-4 space-y-4 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">
          🔧 React Flow Configuration
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Configure viewport, interactions, and behavior
        </p>
      </div>

      <div className="space-y-3">
        <Button
          onClick={() => onControlModeChange('default')}
          variant={controlMode === 'default' ? 'default' : 'outline'}
          className="w-full justify-start"
          size="sm"
        >
          <span className="mr-2">🎯</span>
          Default Controls
        </Button>

        <Button
          onClick={() => onControlModeChange('design')}
          variant={controlMode === 'design' ? 'default' : 'outline'}
          className="w-full justify-start"
          size="sm"
        >
          <span className="mr-2">🎨</span>
          Design Tool Controls
        </Button>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Current mode: <strong>{controlMode}</strong>
        </p>
      </div>
    </div>
  );
}
