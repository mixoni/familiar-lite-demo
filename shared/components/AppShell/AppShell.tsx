type Props = {
  children: React.ReactNode;
};

export const AppShell: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Familiar Lite – Hotel CRM Demo
          </h1>
          <p className="text-sm text-slate-400">
            Unified guest profiles &amp; marketing insights (mock data).
          </p>
        </div>
        <div className="hidden md:flex gap-4 text-xs text-slate-400">
          <span>Environment: Demo</span>
          <span>Data source: In-memory mock</span>
        </div>
      </header>
      <main className="px-8 py-6 max-w-6xl mx-auto">{children}</main>
    </div>
  );
};
