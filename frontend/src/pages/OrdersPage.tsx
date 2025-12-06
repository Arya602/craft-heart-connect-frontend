import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Clock, CheckCircle2, XCircle, Truck, Loader2 } from "lucide-react";
import { useGetMyOrdersQuery } from "@/redux/api/ordersApiSlice";

const OrdersPage = () => {
    const { userInfo } = useSelector((state: any) => state.auth);
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

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
                    <p>Error loading orders</p>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    if (!userInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Please log in to view your orders.</p>
                    <Button asChild>
                        <Link to="/login">Sign In</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const currentOrders = orders?.filter((order: any) =>
        ['pending', 'processing', 'shipped'].includes(order.status)
    ) || [];
    const pastOrders = orders?.filter((order: any) =>
        ['delivered', 'cancelled'].includes(order.status)
    ) || [];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="h-4 w-4" />;
            case 'confirmed':
                return <CheckCircle2 className="h-4 w-4" />;
            case 'shipped':
                return <Truck className="h-4 w-4" />;
            case 'delivered':
                return <CheckCircle2 className="h-4 w-4" />;
            case 'cancelled':
                return <XCircle className="h-4 w-4" />;
            default:
                return <Package className="h-4 w-4" />;
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

    const OrderCard = ({ order }: { order: any }) => (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-lg">Order #{order._id}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-2">
                        {order.orderItems.slice(0, 2).map((item: any) => (
                            <div key={item._id} className="flex gap-3">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                                    <p className="text-sm font-bold text-primary">₹{item.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                        {order.orderItems.length > 2 && (
                            <p className="text-sm text-muted-foreground">
                                +{order.orderItems.length - 2} more item(s)
                            </p>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="border-t pt-3">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">Total Amount:</span>
                            <span className="text-lg font-bold text-primary">
                                ₹{order.totalPrice.toFixed(2)}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                        </p>
                        {order.estimatedDelivery && order.status !== 'delivered' && (
                            <p className="text-sm text-muted-foreground">
                                Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-IN')}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        <Button asChild className="flex-1" variant="outline">
                            <Link to={`/orders/${order._id}`}>View Details</Link>
                        </Button>
                        {order.status === 'delivered' && (
                            <Button variant="outline">Review</Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const EmptyState = ({ type }: { type: 'current' | 'past' }) => (
        <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
                No {type === 'current' ? 'Current' : 'Past'} Orders
            </h3>
            <p className="text-muted-foreground mb-6">
                {type === 'current'
                    ? "You don't have any ongoing orders"
                    : "You haven't completed any orders yet"}
            </p>
            <Button asChild>
                <Link to="/explore">Start Shopping</Link>
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-serif">My Orders</h1>
                    <p className="text-muted-foreground">Track and manage your orders</p>
                </div>

                <Tabs defaultValue="current" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="current">
                            Current Orders ({currentOrders.length})
                        </TabsTrigger>
                        <TabsTrigger value="past">
                            Order History ({pastOrders.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="current">
                        {currentOrders.length > 0 ? (
                            <div className="grid gap-6">
                                {currentOrders.map((order: any) => (
                                    <OrderCard key={order._id} order={order} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState type="current" />
                        )}
                    </TabsContent>

                    <TabsContent value="past">
                        {pastOrders.length > 0 ? (
                            <div className="grid gap-6">
                                {pastOrders.map((order: any) => (
                                    <OrderCard key={order._id} order={order} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState type="past" />
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default OrdersPage;
