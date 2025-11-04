import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

/**
 * AddToCartButton Component - Bietalreef
 * Button to add items to shopping cart
 */

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  onSuccess?: () => void;
}

export function AddToCartButton({ 
  productId, 
  productName, 
  price,
  onSuccess 
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      // TODO: Replace with actual tRPC mutation when backend is ready
      // await trpc.cart.addItem.mutate({ productId, qty: 1, unitPrice: price });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsAdded(true);
      toast({
        title: "تمت الإضافة إلى السلة",
        description: `تم إضافة ${productName} إلى سلة التسوق بنجاح`,
      });
      
      onSuccess?.();
      
      // Reset after 2 seconds
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة المنتج إلى السلة",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button 
      onClick={handleAddToCart}
      disabled={isAdding || isAdded}
      className="w-full"
      variant={isAdded ? "outline" : "default"}
    >
      {isAdded ? (
        <>
          <Check className="ml-2 h-4 w-4" />
          تمت الإضافة
        </>
      ) : (
        <>
          <ShoppingCart className="ml-2 h-4 w-4" />
          {isAdding ? "جاري الإضافة..." : "أضف إلى السلة"}
        </>
      )}
    </Button>
  );
}
