import React from 'react';
import { trpc } from '../lib/trpc';

/**
 * Cart Component - Bietalreef
 * Displays cart items with add/remove/update functionality
 */

export const Cart: React.FC = () => {
  const { data: cartData, isLoading, refetch } = trpc.cart.getCart.useQuery();
  const addItem = trpc.cart.addItem.useMutation();
  const updateItem = trpc.cart.updateItem.useMutation();
  const removeItem = trpc.cart.removeItem.useMutation();
  const clearCart = trpc.cart.clearCart.useMutation();

  const handleUpdateQty = async (itemId: number, qty: number) => {
    if (qty < 1) return;
    await updateItem.mutateAsync({ itemId, qty });
    refetch();
  };

  const handleRemove = async (itemId: number) => {
    await removeItem.mutateAsync({ itemId });
    refetch();
  };

  const handleClearCart = async () => {
    if (confirm('هل أنت متأكد من حذف جميع المنتجات من السلة؟')) {
      await clearCart.mutateAsync();
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!cartData || !cartData.items || cartData.items.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-24 w-24 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">السلة فارغة</h3>
        <p className="mt-2 text-sm text-gray-500">ابدأ بإضافة منتجات إلى سلتك</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">سلة التسوق</h2>
        <button
          onClick={handleClearCart}
          className="text-sm text-red-600 hover:text-red-800"
        >
          حذف الكل
        </button>
      </div>

      <div className="space-y-4">
        {cartData.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
          >
            {/* Product Image */}
            {item.product?.images && item.product.images.length > 0 && (
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
            )}

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.product?.name}</h3>
              <p className="text-sm text-gray-500">SKU: {item.product?.sku}</p>
              <p className="text-lg font-bold text-green-600 mt-1">
                {item.unitPrice} AED
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                disabled={item.qty <= 1}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                -
              </button>
              <span className="w-12 text-center font-semibold">{item.qty}</span>
              <button
                onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                disabled={item.qty >= (item.product?.stock || 0)}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                +
              </button>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <p className="text-sm text-gray-500">الإجمالي</p>
              <p className="text-lg font-bold text-gray-900">{item.totalPrice} AED</p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">الإجمالي الكلي</span>
          <span className="text-2xl font-bold text-green-600">
            {cartData.cart.total} AED
          </span>
        </div>

        <button
          onClick={() => (window.location.href = '/checkout')}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          إتمام الطلب
        </button>
      </div>
    </div>
  );
};
