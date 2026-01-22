import { cn } from '@/lib/utils';

interface CornerBracketsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  corners?: 'all' | 'top' | 'bottom' | 'diagonal';
}

export function CornerBrackets({
  className,
  size = 'md',
  corners = 'all',
}: CornerBracketsProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const cornerSize = sizeClasses[size];
  const showTopLeft = corners === 'all' || corners === 'top' || corners === 'diagonal';
  const showTopRight = corners === 'all' || corners === 'top';
  const showBottomLeft = corners === 'all' || corners === 'bottom';
  const showBottomRight = corners === 'all' || corners === 'bottom' || corners === 'diagonal';

  return (
    <>
      {/* Top Left */}
      {showTopLeft && (
        <div
          className={cn(
            'absolute -top-1 -left-1 border-l-2 border-t-2 border-sl-cyan',
            cornerSize,
            'pointer-events-none z-10',
            className
          )}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))',
          }}
        />
      )}

      {/* Top Right */}
      {showTopRight && (
        <div
          className={cn(
            'absolute -top-1 -right-1 border-r-2 border-t-2 border-sl-cyan',
            cornerSize,
            'pointer-events-none z-10',
            className
          )}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))',
          }}
        />
      )}

      {/* Bottom Left */}
      {showBottomLeft && (
        <div
          className={cn(
            'absolute -bottom-1 -left-1 border-l-2 border-b-2 border-sl-cyan',
            cornerSize,
            'pointer-events-none z-10',
            className
          )}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))',
          }}
        />
      )}

      {/* Bottom Right */}
      {showBottomRight && (
        <div
          className={cn(
            'absolute -bottom-1 -right-1 border-r-2 border-b-2 border-sl-cyan',
            cornerSize,
            'pointer-events-none z-10',
            className
          )}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))',
          }}
        />
      )}
    </>
  );
}
