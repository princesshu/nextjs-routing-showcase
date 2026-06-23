import Breadcrumb from './_components/breadcrumb';

export default function DashboardLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen gap-6 p-8">
      <div className="w-48 shrink-0 border-r pr-6">{sidebar}</div>
      <div className="flex-1">
        <Breadcrumb />
        <h2 className="mb-2 text-xl font-semibold">Dashboard</h2>
        {children}
      </div>
    </div>
  );
}
