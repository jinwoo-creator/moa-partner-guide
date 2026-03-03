interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-moa-500 text-white flex items-center justify-center text-sm font-bold">
        {number}
      </div>
      <div className="flex-1 pb-6">
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <div className="text-sm text-gray-600">{children}</div>
      </div>
    </div>
  );
}

interface StepGuideProps {
  children: React.ReactNode;
}

export function StepGuide({ children }: StepGuideProps) {
  return (
    <div className="my-6 not-prose border-l-2 border-moa-100 pl-2">
      {children}
    </div>
  );
}
