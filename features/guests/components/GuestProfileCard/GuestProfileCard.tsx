import type { GuestProfile } from "@/features/guests/types";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { formatDate } from "@/shared/lib/formatDate";

type Props = {
  guest: GuestProfile;
};

export const GuestProfileCard: React.FC<Props> = ({ guest }) => {
  return (
    <article
      className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm"
      data-testid="guest-profile-card"
    >
      <header className="flex items-center justify-between mb-1">
        <div>
          <h3 className="font-medium">{guest.name}</h3>
          <p className="text-[11px] text-slate-400">
            {guest.city && guest.country
              ? `${guest.city}, ${guest.country}`
              : "Location unknown"}
          </p>
        </div>
        <div className="text-right">
          <span className="block text-xs text-slate-400">LTV</span>
          <span className="text-xs font-semibold">
            {formatCurrency(guest.lifetimeValue)}
          </span>
        </div>
      </header>
      <p className="text-xs text-slate-400 mb-1">{guest.email}</p>
      <p className="text-xs text-slate-400 mb-2">
        Last stay: {formatDate(guest.lastStay)}{" "}
        {guest.channel && <span>· {guest.channel}</span>}
      </p>
      <div className="flex flex-wrap gap-1">
        {guest.segments.map((seg) => (
          <span
            key={seg}
            className="text-[10px] rounded-full border border-slate-700 px-2 py-0.5 text-slate-300"
          >
            {seg}
          </span>
        ))}
      </div>
    </article>
  );
};
