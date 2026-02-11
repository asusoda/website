import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  glowColor?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  glowColor = "bg-red-500/10",
}) => {
  const ActionComponent = action?.href ? "a" : "button";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-20"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-32 h-32 ${glowColor} rounded-full blur-3xl`}></div>
        </div>
        <Icon size={80} className="mx-auto mb-4 text-gray-700 relative z-10" />
      </div>
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      <p className="text-gray-400 mb-8">{description}</p>
      {action && (
        <ActionComponent
          {...(action.href ? { href: action.href } : { onClick: action.onClick })}
          className="inline-block bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10 text-lg"
        >
          {action.label}
        </ActionComponent>
      )}
    </motion.div>
  );
};
