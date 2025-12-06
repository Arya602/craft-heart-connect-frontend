import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { removeFromCart, updateQuantity, clearCart } from "@/redux/features/cart/cartSlice";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, totalItems, totalPrice } = useSelector((state: any) => state.cart);
    const { userInfo } = useSelector((state: any) => state.auth);

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
        toast.success("Removed from cart");
    };

    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) {
            handleRemove(id);
            return;
        }
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.success("Cart cleared");
    };

    const handleCheckout = () => {
        if (!userInfo) {
            toast.info("Please log in to proceed with checkout");
            navigate("/login?redirect=/checkout");
        } else {
            navigate("/checkout");
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
                    <p className="text-muted-foreground mb-6">
                        Add items to your cart to get started
                    </p>
                    <Button asChild>
                        <Link to="/explore">Browse Products</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const tax = totalPrice * 0.18; // 18% GST
    const shipping = totalPrice > 1000 ? 0 : 50;
    const finalTotal = totalPrice + tax + shipping;

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-serif">Shopping Cart</h1>
                        <p className="text-muted-foreground">{totalItems} items in cart</p>
                    </div>
                    <Button variant="outline" onClick={handleClearCart}>
                        Clear Cart
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item: any) => (
                            <Card key={item.id}>
                                <CardContent className="p-4">
                                    <div className="flex gap-4">
                                        <Link to={`/product/${item.id}`}>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />
                                        </Link>
                                        <div className="flex-1">
                                            <Link to={`/product/${item.id}`}>
                                                <h3 className="font-semibold mb-1 hover:text-primary transition-colors">
                                                    {item.title}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                by {item.artisan}
                                            </p>
                                            <p className="text-lg font-bold text-primary">
                                                ₹{item.price.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end justify-between">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleUpdateQuantity(item.id, item.quantity - 1)
                                                    }
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                                                    }
                                                    className="w-16 text-center"
                                                    min="1"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleUpdateQuantity(item.id, item.quantity + 1)
                                                    }
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax (18% GST)</span>
                                        <span className="font-medium">₹{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="font-medium">
                                            {shipping === 0 ? "FREE" : `₹${shipping}`}
                                        </span>
                                    </div>
                                    {totalPrice < 1000 && (
                                        <p className="text-xs text-muted-foreground">
                                            Add ₹{(1000 - totalPrice).toFixed(2)} more for free shipping
                                        </p>
                                    )}
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full mb-3" size="lg" onClick={handleCheckout}>
                                    Proceed to Checkout
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link to="/explore">Continue Shopping</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
