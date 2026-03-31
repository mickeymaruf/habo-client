export interface AdminPayment {
  id: string;
  amount: number;
  currency: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  sessionId: string | null;
  paymentIntentId: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  challenge: {
    id: string;
    title: string;
    price: number;
    category: string;
  };
}

export interface RevenueStats {
  totalRevenue: number;
  successfulCount: number;
  failedCount: number;
  pendingCount: number;
}

export interface AdminPaymentData {
  payments: AdminPayment[];
  stats: RevenueStats;
}
