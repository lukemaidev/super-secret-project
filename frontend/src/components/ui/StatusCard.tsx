type StatusCardProps = {
  title: string;
  loading: boolean;
  ok: boolean;
  detail: string;
};

export function StatusCard({ title, loading, ok, detail }: StatusCardProps) {
  const badgeClassName = loading
    ? "status-card__badge status-card__badge--loading"
    : ok
      ? "status-card__badge status-card__badge--ok"
      : "status-card__badge status-card__badge--error";

  return (
    <section className="status-card">
      <div className="status-card__header">
        <h2>{title}</h2>
        <span className={badgeClassName}>{loading ? "Checking" : ok ? "Online" : "Error"}</span>
      </div>
      <p>{detail}</p>
    </section>
  );
}
