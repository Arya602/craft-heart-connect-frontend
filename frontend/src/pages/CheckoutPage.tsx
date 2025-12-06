import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { clearCart } from "@/redux/features/cart/cartSlice";

import { useCreateOrderMutation } from "@/redux/api/ordersApiSlice";
import { Package, CreditCard, Wallet, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state: any) => state.auth);
    const { items, totalPrice } = useSelector((state: any) => state.cart);
    const [createOrder, { isLoading: isProcessing }] = useCreateOrderMutation();

    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState("");

    const [formData, setFormData] = useState({
        fullName: userInfo?.username || "",
        email: userInfo?.email || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        paymentMethod: "cod",
    });

    // Redirect if not logged in
    if (!userInfo) {
        navigate("/login?redirect=/checkout");
        return null;
    }

    // Redirect if cart is empty
    if (items.length === 0 && !orderPlaced) {
        navigate("/cart");
        return null;
    }

    const tax = totalPrice * 0.18;
    const shipping = totalPrice > 1000 ? 0 : 50;
    const finalTotal = totalPrice + tax + shipping;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await createOrder({
                orderItems: items.map((item: any) => ({
                    name: item.title,
                    qty: item.quantity,
                    image: item.image,
                    price: item.price,
                    // Omit product field for now since we're using mock data
                })),
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.pincode,
                    country: 'India', // Defaulting to India
                },
                paymentMethod: formData.paymentMethod === 'cod' ? 'COD' : 'Stripe',
                itemsPrice: totalPrice,
                taxPrice: tax,
                shippingPrice: shipping,
                totalPrice: finalTotal,
            }).unwrap();

            setOrderId(res._id);
            setOrderPlaced(true);
            dispatch(clearCart());
            toast.success("Order placed successfully!");
        } catch (err: any) {
            toast.error(err?.data?.message || err.error);
        }
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="max-w-2xl w-full">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
                            <p className="text-muted-foreground mb-6">
                                Thank you for your order. We'll send you a confirmation email shortly.
                            </p>

                            <Card className="bg-muted/30 mb-6">
                                <CardContent className="p-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Order ID:</span>
                                            <span className="font-bold">{orderId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Total Amount:</span>
                                            <span className="font-bold">₹{finalTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Payment Method:</span>
                                            <span className="font-medium">Cash on Delivery</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Delivery Address:</span>
                                            <span className="font-medium text-right max-w-xs">
                                                {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-blue-900">
                                    <strong>Order Tracking:</strong> You can track your order status in your profile under "Orders" section.
                                    You'll receive updates via email and SMS.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <Button onClick={() => navigate("/orders")} className="flex-1">
                                    View Orders
                                </Button>
                                <Button onClick={() => navigate("/explore")} variant="outline" className="flex-1">
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-bold font-serif mb-8">Checkout</h1>

                <form onSubmit={handlePlaceOrder}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Delivery Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Delivery Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName">Full Name *</Label>
                                            <Input
                                                id="fullName"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number *</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="+91 98765 43210"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Street Address *</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            placeholder="House no., Building name, Street"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City *</Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="state">State *</Label>
                                            <Input
                                                id="state"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="pincode">Pincode *</Label>
                                            <Input
                                                id="pincode"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Method */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Method</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup
                                        value={formData.paymentMethod}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, paymentMethod: value })
                                        }
                                    >
                                        <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                                            <RadioGroupItem value="cod" id="cod" />
                                            <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                                                <Package className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="font-medium">Cash on Delivery</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Pay when you receive your order
                                                    </p>
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3 border rounded-lg p-4 opacity-50 cursor-not-allowed">
                                            <RadioGroupItem value="online" id="online" disabled />
                                            <Label htmlFor="online" className="flex items-center gap-3 flex-1">
                                                <CreditCard className="h-5 w-5" />
                                                <div>
                                                    <p className="font-medium">Online Payment</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Coming soon
                                                    </p>
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3 border rounded-lg p-4 opacity-50 cursor-not-allowed">
                                            <RadioGroupItem value="upi" id="upi" disabled />
                                            <Label htmlFor="upi" className="flex items-center gap-3 flex-1">
                                                <Wallet className="h-5 w-5" />
                                                <div>
                                                    <p className="font-medium">UPI Payment</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Coming soon
                                                    </p>
                                                </div>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-4">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        {items.map((item: any) => (
                                            <div key={item.id} className="flex gap-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                                    <p className="text-sm font-bold text-primary">
                                                        ₹{(item.price * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Separator />

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>₹{totalPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Tax (18% GST)</span>
                                            <span>₹{tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        size="lg"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            "Place Order"
                                        )}
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground">
                                        By placing your order, you agree to our Terms & Conditions
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
