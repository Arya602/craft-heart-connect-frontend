import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetSellerRequestsQuery, useApproveSellerRequestMutation, useRejectSellerRequestMutation, useGetUsersQuery, useGetAllOrdersQuery } from "@/redux/api/adminApiSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { Loader2, Users, ShoppingBag, Store, Check, X, ShieldCheck, Flag } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state: any) => state.auth);
    const [activeTab, setActiveTab] = useState("overview");

    const { data: sellerRequests, isLoading: requestsLoading, refetch: refetchRequests } = useGetSellerRequestsQuery('pending');
    const { data: users, isLoading: usersLoading } = useGetUsersQuery({});
    const { data: orders, isLoading: ordersLoading } = useGetAllOrdersQuery({});

    const [approveRequest, { isLoading: isApproving }] = useApproveSellerRequestMutation();
    const [rejectRequest, { isLoading: isRejecting }] = useRejectSellerRequestMutation();

    // Redirect if not admin
    if (!userInfo?.roles?.includes("admin")) {
        navigate("/");
        toast.error("Access denied. Admin only.");
        return null;
    }

    const handleApprove = async (id: string) => {
        try {
            await approveRequest(id).unwrap();
            toast.success("Seller request approved");
            refetchRequests();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to approve request");
        }
    };

    const handleReject = async (id: string) => {
        if (window.confirm("Are you sure you want to reject this request?")) {
            try {
                await rejectRequest(id).unwrap();
                toast.success("Seller request rejected");
                refetchRequests();
            } catch (err: any) {
                toast.error(err?.data?.message || "Failed to reject request");
            }
        }
    };

    // Calculate stats
    const totalUsers = users?.length || 0;
    const totalOrders = orders?.length || 0;
    const pendingRequests = sellerRequests?.length || 0;
    const totalRevenue = orders?.reduce((sum: number, order: any) => sum + (order.totalPrice || 0), 0) || 0;

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold font-serif">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-2">
                            Platform Overview & Management
                        </p>
                    </div>
                    <Button asChild>
                        <Link to="/admin/reports">
                            <Flag className="mr-2 h-4 w-4" /> View Reports
                        </Link>
                    </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="requests">Seller Requests</TabsTrigger>
                        <TabsTrigger value="users">Users</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalUsers}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalOrders}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                    <span className="font-bold text-muted-foreground">₹</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                                    <Store className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{pendingRequests}</div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Seller Requests Tab */}
                    <TabsContent value="requests" className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold">Seller Requests</h2>
                            <p className="text-muted-foreground">Review and manage seller applications</p>
                        </div>

                        {requestsLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : sellerRequests && sellerRequests.length > 0 ? (
                            <div className="grid gap-6">
                                {sellerRequests.map((user: any) => (
                                    <Card key={user._id}>
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle>{user.workshop?.name || 'Unknown Workshop'}</CardTitle>
                                                    <CardDescription>
                                                        Applicant: {user.username} ({user.email})
                                                    </CardDescription>
                                                </div>
                                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                                    Pending Review
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="font-semibold mb-1">Craft Type</h4>
                                                        <p>{user.craft}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold mb-1">Location</h4>
                                                        <p>{user.workshop?.location}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold mb-1">Artisan Story</h4>
                                                    <p className="text-muted-foreground bg-muted/30 p-3 rounded-md">
                                                        {user.story}
                                                    </p>
                                                </div>

                                                <div className="flex gap-3 pt-2">
                                                    <Button
                                                        onClick={() => handleApprove(user._id)}
                                                        disabled={isApproving || isRejecting}
                                                        className="bg-green-600 hover:bg-green-700"
                                                    >
                                                        <Check className="h-4 w-4 mr-2" />
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => handleReject(user._id)}
                                                        disabled={isApproving || isRejecting}
                                                    >
                                                        <X className="h-4 w-4 mr-2" />
                                                        Reject
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
                                        <ShieldCheck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
                                        <p className="text-muted-foreground">
                                            There are no pending seller requests at the moment.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    {/* Users Tab */}
                    <TabsContent value="users" className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold">User Management</h2>
                            <p className="text-muted-foreground">View and manage all platform users</p>
                        </div>

                        {usersLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="p-0">
                                    <div className="relative w-full overflow-auto">
                                        <table className="w-full caption-bottom text-sm">
                                            <thead className="[&_tr]:border-b">
                                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Roles</th>
                                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                                                </tr>
                                            </thead>
                                            <tbody className="[&_tr:last-child]:border-0">
                                                {users?.map((user: any) => (
                                                    <tr key={user._id} className="border-b transition-colors hover:bg-muted/50">
                                                        <td className="p-4 align-middle font-medium">{user.username}</td>
                                                        <td className="p-4 align-middle">{user.email}</td>
                                                        <td className="p-4 align-middle">
                                                            <div className="flex gap-1">
                                                                {user.roles?.map((role: string) => (
                                                                    <Badge key={role} variant="secondary" className="text-xs">
                                                                        {role}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="p-4 align-middle">
                                                            {new Date(user.createdAt).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
