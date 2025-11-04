import { ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * CartIcon Component - Bietalreef
 * Shopping cart icon with item count badge for navbar
 */

interface CartIconProps {
  itemCount?: number;
}

export function CartIcon({ itemCount = 0 }: CartIconProps) {
  return (
    <Button variant="ghost" size="icon" className="relative" asChild>
      <Link href="/dashboard?tab=cart">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {itemCount > 9 ? '9+' : itemCount}
          </Badge>
        )}
        <span className="sr-only">سلة التسوق ({itemCount} عناصر)</span>
      </Link>
    </Button>
  );
}
