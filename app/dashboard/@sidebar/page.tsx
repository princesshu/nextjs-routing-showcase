import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside>
      <p className="mb-2 text-xs font-semibold tracking-wide text-gray-400 uppercase">
        Sidebar (parallel slot)
      </p>
      <nav className="flex flex-col gap-1 text-sm">
        <Link href="/dashboard">Overview</Link>
        <Link href="/dashboard/settings">Settings</Link>
      </nav>
    </aside>
  );
}
