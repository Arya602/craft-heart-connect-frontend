import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, MapPin, CreditCard, Clock, CheckCircle2, XCircle, Truck, ArrowLeft } from "lucide-react";

import { useState } from "react";
import { useGetOrderDetailsQuery, useCancelOrderMutation } from "@/redux/api/ordersApiSlice";
import { useCreateReviewMutation } from "@/redux/api/productsApiSlice";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OrderDetailPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state: any) => state.auth);

    const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);
    const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
    const [createReview, { isLoading: isReviewing }] = useCreateReviewMutation();

    const [reviewProduct, setReviewProduct] = useState<string>("");
    const [rating, setRating] = useState("5");
    const [comment, setComment] = useState("");
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

    const handleCancelOrder = async () => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            try {
                await cancelOrder(orderId).unwrap();
                toast.success("Order cancelled successfully");
                refetch();
            } catch (err: any) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createReview({
                productId: reviewProduct,
                rating: Number(rating),
                comment,
            }).unwrap();
            toast.success("Review submitted successfully");
            setIsReviewDialogOpen(false);
            setComment("");
            setRating("5");
        } catch (err: any) {
            toast.error(err?.data?.message || err.error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-red-500">
                    <p>Error loading order details</p>
                    <Button variant="outline" onClick={() => navigate("/orders")}>
                        Back to Orders
                    </Button>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
                    <p className="text-muted-foreground mb-6">
                        The order you're looking for doesn't exist.
                    </p>
                    <Button asChild>
                        <Link to="/orders">View All Orders</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="h-5 w-5" />;
            case 'confirmed':
                return <CheckCircle2 className="h-5 w-5" />;
            case 'shipped':
                return <Truck className="h-5 w-5" />;
            case 'delivered':
                return <CheckCircle2 className="h-5 w-5" />;
            case 'cancelled':
                return <XCircle className="h-5 w-5" />;
            default:
                return <Package className="h-5 w-5" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Orders
                </Button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Header */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">Order #{order._id}</CardTitle>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-2 text-base px-4 py-2`}>
                                        {getStatusIcon(order.status)}
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </Badge>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Order Tracking */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Tracking</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {order.trackingUpdates.map((update: any, index: number) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`rounded-full p-2 ${index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                                    }`}>
                                                    {getStatusIcon(update.status)}
                                                </div>
                                                {index < order.trackingUpdates.length - 1 && (
                                                    <div className="w-0.5 h-12 bg-border mt-2" />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-4">
                                                <p className="font-semibold">{update.status.charAt(0).toUpperCase() + update.status.slice(1)}</p>
                                                <p className="text-sm text-muted-foreground">{update.message}</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {new Date(update.timestamp).toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {order.estimatedDelivery && order.status !== 'delivered' && (
                                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-sm text-blue-900">
                                            <strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Order Items */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {order.orderItems.map((item: any) => (
                                        <div key={item._id} className="flex gap-4">
                                            <Link to={`/product/${item.id}`}>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                            </Link>
                                            <div className="flex-1">
                                                <Link to={`/product/${item.id}`}>
                                                    <h4 className="font-semibold hover:text-primary transition-colors">
                                                        {item.title}
                                                    </h4>
                                                </Link>

                                                <div className="flex items-center justify-between mt-2">
                                                    <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                                                    <p className="font-bold text-primary">₹{(item.price * item.qty).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Payment & Delivery Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹{order.itemsPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax (18% GST)</span>
                                        <span>₹{order.taxPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>{order.shippingPrice === 0 ? "FREE" : `₹${order.shippingPrice}`}</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-primary">₹{order.totalPrice.toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Method */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-medium">
                                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                                </p>
                                {order.paymentMethod === 'cod' && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Pay when you receive your order
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Delivery Address */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Delivery Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1">
                                    <p className="font-medium">{order.shippingAddress.address}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        {order.status === 'delivered' && (
                            <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full">Write a Review</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Write a Review</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmitReview} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="product">Select Product</Label>
                                            <Select onValueChange={setReviewProduct} required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a product" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {order.orderItems.map((item: any) => (
                                                        <SelectItem key={item.product} value={item.product}>
                                                            {item.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="rating">Rating</Label>
                                            <Select value={rating} onValueChange={setRating}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select rating" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1 - Poor</SelectItem>
                                                    <SelectItem value="2">2 - Fair</SelectItem>
                                                    <SelectItem value="3">3 - Good</SelectItem>
                                                    <SelectItem value="4">4 - Very Good</SelectItem>
                                                    <SelectItem value="5">5 - Excellent</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="comment">Comment</Label>
                                            <Textarea
                                                id="comment"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="w-full" disabled={isReviewing}>
                                            {isReviewing ? "Submitting..." : "Submit Review"}
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        )}
                        {order.status === 'pending' && (
                            <Button
                                variant="destructive"
                                className="w-full"
                                onClick={handleCancelOrder}
                                disabled={isCancelling}
                            >
                                {isCancelling ? "Cancelling..." : "Cancel Order"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
