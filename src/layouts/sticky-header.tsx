import { ReactNode } from 'react';

export const StickyHeaderLayout = ({
  headerContent,
  children,
}: {
  headerContent: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="w-full min-h-screen relative z-10">
      <div className="mb-8 border-b sticky top-0 w-full pb-2 bg-white z-50">
        {headerContent}
      </div>
      <div className="max-w-2xl mx-auto px-4 relative">{children}</div>
    </div>
  );
};
