import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useGetMyProductsQuery, useDeleteProductMutation } from "@/redux/api/sellerProductsApiSlice";
import { useGetSellerOrdersQuery, useUpdateOrderStatusMutation } from "@/redux/api/sellerOrdersApiSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ProductForm from "@/components/ProductForm";
import WorkshopProfile from "@/components/WorkshopProfile";
import SalesChart from "@/components/SalesChart";
import ArtisanList from "@/components/ArtisanList";
import WorkshopList from "@/components/WorkshopList";
import { toast } from "react-toastify";
import { Loader2, Package, ShoppingCart, TrendingUp, Plus, Edit, Trash2, Eye } from "lucide-react";

const SellerDashboardPage = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state: any) => state.auth);
    const [activeTab, setActiveTab] = useState("overview");
    const [productFormOpen, setProductFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const { data: products, isLoading: productsLoading, refetch: refetchProducts } = useGetMyProductsQuery({});
    const { data: orders, isLoading: ordersLoading, refetch: refetchOrders } = useGetSellerOrdersQuery({});
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
    const [updateOrderStatus, { isLoading: isUpdatingStatus }] = useUpdateOrderStatusMutation();

    // Redirect if not a seller - using useEffect to prevent toast on logout
    useEffect(() => {
        if (userInfo && !userInfo.roles?.includes("seller")) {
            toast.error("You must be a seller to access this page");
            navigate("/");
        } else if (!userInfo) {
            navigate("/login");
        }
    }, [userInfo, navigate]);

    // Don't render anything if user is not a seller
    if (!userInfo?.roles?.includes("seller")) {
        return null;
    }

    const handleDeleteProduct = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                await deleteProduct(id).unwrap();
                toast.success("Product deleted successfully");
                refetchProducts();
            } catch (err: any) {
                toast.error(err?.data?.message || "Failed to delete product");
            }
        }
    };

    const handleOpenCreateForm = () => {
        setSelectedProduct(null);
        setProductFormOpen(true);
    };

    const handleOpenEditForm = (product: any) => {
        setSelectedProduct(product);
        setProductFormOpen(true);
    };

    const handleCloseForm = () => {
        setProductFormOpen(false);
        setSelectedProduct(null);
    };

    const handleFormSuccess = () => {
        refetchProducts();
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await updateOrderStatus({ id, status: newStatus }).unwrap();
            toast.success(`Order status updated to ${newStatus}`);
            refetchOrders();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update status");
        }
    };

    // Calculate stats
    const totalProducts = products?.length || 0;
    const totalOrders = orders?.length || 0;
    const totalRevenue = orders?.reduce((sum: number, order: any) => sum + (order.totalPrice || 0), 0) || 0;
    const pendingOrders = orders?.filter((order: any) => order.status === "pending").length || 0;

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold font-serif">Seller Dashboard</h1>
                        <p className="text-muted-foreground mt-2">
                            Welcome back, {userInfo.username}!
                        </p>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="artisans">Artisans</TabsTrigger>
                        <TabsTrigger value="workshops">Workshops</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalProducts}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalOrders}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{pendingOrders}</div>
                                </CardContent>
                            </Card>
                        </div>

                        <SalesChart />

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                                <CardDescription>Your latest customer orders</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {ordersLoading ? (
                                    <div className="flex justify-center py-8">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    </div>
                                ) : orders && orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {orders.slice(0, 5).map((order: any) => (
                                            <div key={order._id} className="flex items-center justify-between border-b pb-4 last:border-0">
                                                <div>
                                                    <p className="font-medium">Order #{order._id.slice(-8)}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <Badge>{order.status}</Badge>
                                                    <p className="font-bold">₹{order.totalPrice.toFixed(2)}</p>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link to={`/orders/${order._id}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-muted-foreground py-8">No orders yet</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Products Tab */}
                    <TabsContent value="products" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold">My Products</h2>
                                <p className="text-muted-foreground">Manage your product listings</p>
                            </div>
                            <Button onClick={handleOpenCreateForm}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Product
                            </Button>
                        </div>

                        {productsLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : products && products.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {products.map((product: any) => (
                                    <Card key={product._id}>
                                        <CardHeader>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-48 object-cover rounded-md mb-4"
                                            />
                                            <CardTitle className="text-lg">{product.name}</CardTitle>
                                            <CardDescription>{product.category}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Price:</span>
                                                    <span className="font-bold">₹{product.price}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Stock:</span>
                                                    <span>{product.countInStock}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Rating:</span>
                                                    <span>{product.rating || 0} ⭐</span>
                                                </div>
                                                <div className="flex gap-2 pt-4">
                                                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleOpenEditForm(product)}>
                                                        <Edit className="h-4 w-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        className="flex-1"
                                                        onClick={() => handleDeleteProduct(product._id, product.name)}
                                                        disabled={isDeleting}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="py-12">
                                    <div className="text-center">
                                        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">No products yet</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Start by adding your first product
                                        </p>
                                        <Button onClick={handleOpenCreateForm}>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Your First Product
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    {/* Orders Tab */}
                    <TabsContent value="orders" className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold">My Orders</h2>
                            <p className="text-muted-foreground">Orders containing your products</p>
                        </div>

                        {ordersLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : orders && orders.length > 0 ? (
                            <div className="space-y-4">
                                {orders.map((order: any) => (
                                    <Card key={order._id}>
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle>Order #{order._id.slice(-8)}</CardTitle>
                                                    <CardDescription>
                                                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                                    </CardDescription>
                                                </div>
                                                <Badge className="text-base px-4 py-2">
                                                    {order.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Customer:</span>
                                                    <span className="font-medium">{order.user?.username || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Items:</span>
                                                    <span className="font-medium">{order.orderItems?.length || 0}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Total:</span>
                                                    <span className="font-bold text-lg">₹{order.totalPrice?.toFixed(2)}</span>
                                                </div>

                                                <div className="pt-2">
                                                    <Select
                                                        defaultValue={order.status}
                                                        onValueChange={(value) => handleStatusUpdate(order._id, value)}
                                                        disabled={isUpdatingStatus}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Update Status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pending">Pending</SelectItem>
                                                            <SelectItem value="processing">Processing</SelectItem>
                                                            <SelectItem value="shipped">Shipped</SelectItem>
                                                            <SelectItem value="delivered">Delivered</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <Button variant="outline" className="w-full" asChild>
                                                    <Link to={`/orders/${order._id}`}>
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="py-12">
                                    <div className="text-center">
                                        <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                                        <p className="text-muted-foreground">
                                            Orders containing your products will appear here
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                    {/* Artisans Tab */}
                    <TabsContent value="artisans" className="space-y-6">
                        <ArtisanList />
                    </TabsContent>

                    {/* Workshops Tab */}
                    <TabsContent value="workshops" className="space-y-6">
                        <WorkshopList />
                    </TabsContent>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        <WorkshopProfile />
                    </TabsContent>
                </Tabs>

                <ProductForm
                    open={productFormOpen}
                    onClose={handleCloseForm}
                    product={selectedProduct}
                    onSuccess={handleFormSuccess}
                />
            </div>
        </div>
    );
};

export default SellerDashboardPage;
