import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CornerBrackets } from './corner-brackets';

interface SystemWindowProps {
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  className?: string;
  headerClassName?: string;
  showCorners?: boolean;
}

export function SystemWindow({
  children,
  title,
  icon,
  className,
  headerClassName,
  showCorners = true,
}: SystemWindowProps) {
  return (
    <div className={cn('system-window relative', className)}>
      {showCorners && <CornerBrackets size="lg" />}

      {title && (
        <div className={cn('system-header', headerClassName)}>
          {icon && <span className="text-sl-cyan">{icon}</span>}
          <h3 className="text-sm font-bold uppercase tracking-wider text-sl-cyan">
            {title}
          </h3>
        </div>
      )}

      <div className="relative z-[5] p-6">
        {children}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sl-cyan/30 to-transparent" />
    </div>
  );
}
