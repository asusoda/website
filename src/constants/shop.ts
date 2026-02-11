// Shop-related constants

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export const ORDER_STATUS_COLORS = {
  completed: "bg-green-500/20 text-green-400 border border-green-500/30",
  pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  processing: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  shipped: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  delivered: "bg-green-500/20 text-green-400 border border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border border-red-500/30",
} as const;

export const FALLBACK_IMAGES = {
  product: "/teddy-laptop.webp",
  user: "/logo/Soda_Logo_Dark_Mode.svg",
} as const;
