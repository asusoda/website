// Number and currency formatting utilities

export const formatPoints = (points: number): string => {
  return points.toLocaleString('en-US');
};

export const formatPrice = (price: number): string => {
  return `${formatPoints(price)} pts`;
};

export const calculateTotal = (items: Array<{ price: number; quantity: number }>): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
