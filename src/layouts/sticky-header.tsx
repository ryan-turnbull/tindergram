import clsx from 'clsx';
import { ReactNode } from 'react';

interface StickyHeaderLayoutProps {
  headerContent: ReactNode;
  children: ReactNode;
  isActive: boolean;
}

export const StickyHeaderLayout = ({
  headerContent,
  children,
  isActive,
}: StickyHeaderLayoutProps) => {
  return (
    <div className="w-full min-h-screen relative z-10">
      <div
        className={clsx(
          'mb-8 sticky top-0 w-full bg-white z-50 transition-all',
          {
            'py-24': !isActive,
            'border-b': isActive,
          },
        )}
      >
        {headerContent}
      </div>
      <div className="max-w-3xl mx-auto px-4 relative">{children}</div>
    </div>
  );
};
