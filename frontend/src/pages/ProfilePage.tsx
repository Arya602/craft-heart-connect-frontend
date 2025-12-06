import { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, MapPin, Phone, Package, Settings } from "lucide-react";
import { toast } from "react-toastify";

import { useGetMyOrdersQuery } from "@/redux/api/ordersApiSlice";

const ProfilePage = () => {
    const { userInfo } = useSelector((state: any) => state.auth);
    const { data: orders } = useGetMyOrdersQuery();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: userInfo?.username || "",
        email: userInfo?.email || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const handleSave = () => {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
    };

    if (!userInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-serif">My Profile</h1>
                    <p className="text-muted-foreground">Manage your account settings and preferences</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Profile Sidebar */}
                    <Card className="md:col-span-1 h-fit">
                        <CardContent className="pt-6 text-center">
                            <Avatar className="h-24 w-24 mx-auto mb-4">
                                <AvatarImage src={userInfo.profileImage} alt={userInfo.username} />
                                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                                    {userInfo.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-bold">{userInfo.username}</h2>
                            <p className="text-sm text-muted-foreground mb-4">{userInfo.email}</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {userInfo.roles?.map((role: string) => (
                                    <span
                                        key={role}
                                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                                    >
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Profile Content */}
                    <div className="md:col-span-2">
                        <Tabs defaultValue="account" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="orders">Orders</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                            </TabsList>

                            <TabsContent value="account">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Personal Information</CardTitle>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setIsEditing(!isEditing)}
                                            >
                                                {isEditing ? "Cancel" : "Edit"}
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="username">Full Name</Label>
                                                <Input
                                                    id="username"
                                                    value={formData.username}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, username: e.target.value })
                                                    }
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, email: e.target.value })
                                                    }
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, phone: e.target.value })
                                                }
                                                disabled={!isEditing}
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Input
                                                id="address"
                                                value={formData.address}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, address: e.target.value })
                                                }
                                                disabled={!isEditing}
                                                placeholder="Street address"
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City</Label>
                                                <Input
                                                    id="city"
                                                    value={formData.city}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, city: e.target.value })
                                                    }
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state">State</Label>
                                                <Input
                                                    id="state"
                                                    value={formData.state}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, state: e.target.value })
                                                    }
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="pincode">Pincode</Label>
                                                <Input
                                                    id="pincode"
                                                    value={formData.pincode}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, pincode: e.target.value })
                                                    }
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>

                                        {isEditing && (
                                            <Button onClick={handleSave} className="w-full">
                                                Save Changes
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="orders">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Recent Orders</CardTitle>
                                            <Button variant="outline" asChild>
                                                <a href="/orders">View All Orders</a>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {orders && orders.length > 0 ? (
                                            <div className="space-y-4">
                                                {orders.slice(0, 3).map((order: any) => (
                                                    <div key={order._id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                                        <div>
                                                            <p className="font-medium">Order #{order._id}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {new Date(order.createdAt).toLocaleDateString()} • {order.orderItems.length} items
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                    'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                            </span>
                                                            <Button variant="ghost" size="sm" asChild>
                                                                <a href={`/orders/${order._id}`}>View</a>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                                <p className="text-muted-foreground">No orders yet</p>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    Start shopping to see your orders here
                                                </p>
                                                <Button asChild>
                                                    <a href="/explore">Browse Products</a>
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="settings">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Account Settings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Email Notifications</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive updates about your orders
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Manage
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Change Password</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Update your account password
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Update
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Delete Account</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Permanently delete your account
                                                </p>
                                            </div>
                                            <Button variant="destructive" size="sm">
                                                Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
