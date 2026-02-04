import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Order, OrderItem } from '../../../lib/api';
import { ORDER_STATUS_COLORS } from '../../../constants/shop';
import { formatDateTime } from '../../../utils/dateFormat';

interface OrderCardProps {
  order: Order;
  index?: number;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, index = 0 }) => {
  const statusColor = ORDER_STATUS_COLORS[order.status as keyof typeof ORDER_STATUS_COLORS] || ORDER_STATUS_COLORS.pending;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-black/30 border border-white/5 rounded-xl p-5 hover:border-white/10 hover:bg-black/40 transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
              {order.status.toUpperCase()}
            </span>
            <p className="text-sm text-gray-500">Order #{order.id}</p>
          </div>
          <p className="text-xs text-gray-600 flex items-center">
            <Calendar size={12} className="mr-1" />
            {formatDateTime(order.created_at)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-400">-{order.total_amount}</p>
          <p className="text-xs text-gray-500">points</p>
        </div>
      </div>
      
      {order.items && order.items.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
          {order.items.map((item: OrderItem, itemIdx: number) => (
            <div key={itemIdx} className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-2 flex-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">{item.product_name || item.product?.name || 'Product'}</span>
                <span className="text-gray-600">×{item.quantity}</span>
              </div>
              <span className="text-gray-400 font-medium">{item.price_at_time} pts</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
