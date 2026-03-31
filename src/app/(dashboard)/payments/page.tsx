import { format } from "date-fns";
import {
  ExternalLink,
  Search,
  Filter,
  User as UserIcon,
  Target,
  Fingerprint,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { adminService } from "@/services/admin.service";

export default async function AdminPaymentsPage() {
  const { data } = await adminService.getAllPayments();
  const { payments } = data;

  return (
    <div className="min-h-screen space-y-8 bg-[#F3F4F6] p-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">
            Revenue <span className="text-[#A3E635]">Control</span>
          </h1>
          <p className="text-sm font-bold tracking-widest text-black/60 uppercase">
            Audit logs for all Habo financial transactions
          </p>
        </div>

        <div className="flex gap-4">
          <div className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[10px] font-black uppercase opacity-50">
              Total Revenue
            </p>
            <p className="text-2xl font-black">
              $
              {payments
                .reduce(
                  (acc, p) => acc + (p.status === "SUCCESS" ? p.amount : 0),
                  0,
                )
                .toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER BAR - COMING SOON STATE */}
      <div className="group relative flex items-center gap-4 opacity-60">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 stroke-[3px]" />
          <div className="w-full cursor-not-allowed border-4 border-black bg-white/50 p-4 pl-12 text-lg font-bold text-black/40 italic">
            Search functionality coming soon...
          </div>
        </div>
        <button
          disabled
          className="cursor-not-allowed border-4 border-black bg-black/20 p-4 px-6 font-black text-white uppercase"
        >
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* THE BRUTALIST TABLE */}
      <div className="overflow-hidden rounded-3xl border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-4 border-black bg-black text-white">
              <th className="p-5 font-black tracking-tighter uppercase italic">
                User & Mission Details
              </th>
              <th className="p-5 font-black tracking-tighter uppercase italic">
                Transaction & IDs
              </th>
              <th className="p-5 text-center font-black tracking-tighter uppercase italic">
                Status
              </th>
              <th className="p-5 text-right font-black tracking-tighter uppercase italic">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b-4 border-black transition-colors hover:bg-zinc-50"
              >
                {/* COLUMN 1: USER & CHALLENGE + IDS */}
                <td className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-black bg-[#A3E635]">
                      {payment.user.image ? (
                        <img
                          src={payment.user.image}
                          alt=""
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-black">
                          ?
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-3 w-3" />
                          <p className="leading-none font-black">
                            {payment.user.name}
                          </p>
                        </div>
                        <p className="mt-0.5 font-mono text-[9px] font-bold text-black/40">
                          UID: {payment.user.id}
                        </p>
                      </div>

                      <div className="inline-flex flex-col gap-1">
                        <div className="flex w-fit items-center gap-2 rounded bg-black px-2 py-0.5 text-xs font-bold text-[#A3E635] italic">
                          <Target className="h-3 w-3" />
                          <span>{payment.challenge.title}</span>
                        </div>
                        <p className="font-mono text-[9px] font-bold text-black/40">
                          CID: {payment.challenge.id}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>

                {/* COLUMN 2: FULL TRANSACTION INFO */}
                <td className="p-5">
                  <div className="space-y-2">
                    <p className="text-2xl leading-none font-black">
                      ${payment.amount.toFixed(2)}
                    </p>
                    <div className="space-y-1">
                      <div className="flex w-fit items-center gap-1.5 border border-black/10 bg-zinc-100 p-1 font-mono text-[10px] font-bold text-black/60 uppercase">
                        <Fingerprint className="h-3 w-3" />
                        ID: {payment.sessionId}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-black/40 uppercase">
                        <Hash className="h-3 w-3" />
                        {format(
                          new Date(payment.createdAt),
                          "MMM dd, yyyy · HH:mm",
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* COLUMN 3: STATUS BADGE */}
                <td className="p-5 text-center">
                  <div
                    className={cn(
                      "inline-block rounded-full border-2 border-black px-4 py-2 text-xs font-black tracking-widest uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                      payment.status === "SUCCESS" && "bg-[#A3E635]",
                      payment.status === "PENDING" && "bg-yellow-300",
                      payment.status === "FAILED" && "bg-red-400 text-white",
                    )}
                  >
                    {payment.status}
                  </div>
                </td>

                {/* COLUMN 4: STRIPE LINK */}
                <td className="p-5 text-right">
                  {payment.paymentIntentId && (
                    <a
                      href={`https://dashboard.stripe.com/payments/${payment.paymentIntentId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex translate-y-[-2px] items-center gap-2 border-2 border-black bg-white px-3 py-2 text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-black hover:text-white active:shadow-none"
                    >
                      STRIPE <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
