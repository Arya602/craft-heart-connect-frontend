import { useState } from 'react';
import { useGetUsersQuery, useUpdateUserMutation } from '../../redux/api/adminApiSlice';
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '../../redux/api/adminApiSlice';
import { formatCurrency } from '../../utils/formatCurrency';
import { toast } from 'react-toastify';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'orders'>('users');

    const { data: users, refetch: refetchUsers } = useGetUsersQuery({});
    const { data: orders, refetch: refetchOrders } = useGetAllOrdersQuery({});
    const [updateUser] = useUpdateUserMutation();
    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    const handleApproveSellerRequest = async (userId: string) => {
        try {
            await updateUser({
                userId,
                sellerRequest: { status: 'approved' },
            }).unwrap();
            toast.success('Seller approved');
            refetchUsers();
        } catch (err) {
            toast.error('Failed to approve seller');
        }
    };

    const handleUpdateOrderStatus = async (orderId: string, status: string) => {
        try {
            await updateOrderStatus({ orderId, status }).unwrap();
            toast.success('Order status updated');
            refetchOrders();
        } catch (err) {
            toast.error('Failed to update order status');
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            <div className="mb-6 border-b">
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-4 py-2 font-semibold ${activeTab === 'users'
                                ? 'border-b-2 border-blue-500 text-blue-500'
                                : 'text-gray-600'
                            }`}
                    >
                        Users
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-4 py-2 font-semibold ${activeTab === 'orders'
                                ? 'border-b-2 border-blue-500 text-blue-500'
                                : 'text-gray-600'
                            }`}
                    >
                        Orders
                    </button>
                </div>
            </div>

            {activeTab === 'users' && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Roles</th>
                                <th className="px-6 py-3 text-left">Seller Request</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user: any) => (
                                <tr key={user._id} className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4">{user.username}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                            {user.roles?.join(', ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.sellerRequest?.status === 'pending' && (
                                            <span className="text-yellow-600">Pending</span>
                                        )}
                                        {user.sellerRequest?.status === 'approved' && (
                                            <span className="text-green-600">Approved</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.sellerRequest?.status === 'pending' && (
                                            <button
                                                onClick={() => handleApproveSellerRequest(user._id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                                            >
                                                Approve Seller
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left">Order ID</th>
                                <th className="px-6 py-3 text-left">User</th>
                                <th className="px-6 py-3 text-left">Total</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order: any) => (
                                <tr key={order._id} className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm">{order._id}</td>
                                    <td className="px-6 py-4">{order.user?.username}</td>
                                    <td className="px-6 py-4 font-semibold">{formatCurrency(order.totalPrice)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-2 py-1 rounded text-sm ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                            className="border rounded px-2 py-1 text-sm"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
