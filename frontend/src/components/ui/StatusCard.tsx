type StatusCardProps = {
  title: string;
  loading: boolean;
  ok: boolean;
  detail: string;
};

export function StatusCard({ title, loading, ok, detail }: StatusCardProps) {
  const badgeClass = loading
    ? "bg-[rgba(242,169,0,0.2)] text-[#ffd37a]"
    : ok
      ? "bg-[rgba(50,205,50,0.18)] text-[#9ff59f]"
      : "bg-[rgba(255,99,71,0.2)] text-[#ffb2a3]";

  return (
    <section className="p-6 rounded-2xl bg-white/8 border border-white/10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="m-0 text-[1.2rem]">{title}</h2>
        <span className={`px-3 py-1 rounded-full text-[0.85rem] font-bold ${badgeClass}`}>
          {loading ? "Checking" : ok ? "Online" : "Error"}
        </span>
      </div>
      <p className="mt-4 mb-0 text-[rgba(245,239,230,0.82)] leading-relaxed">{detail}</p>
    </section>
  );
}
