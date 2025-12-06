import { useGetMyOrdersQuery } from '../redux/api/ordersApiSlice';
import { formatCurrency } from '../utils/formatCurrency';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
    const { data: orders, isLoading, error } = useGetMyOrdersQuery({});

    if (isLoading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading orders</div>;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Order History</h1>

            {orders && orders.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No orders yet</p>
                    <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders?.map((order: any) => (
                        <div key={order._id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                                    <p className="text-sm text-gray-600">
                                        Date: {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold">{formatCurrency(order.totalPrice)}</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-2">Items:</h3>
                                <div className="space-y-2">
                                    {order.orderItems.map((item: any, index: number) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span>{item.name} x {item.qty}</span>
                                            <span>{formatCurrency(item.price * item.qty)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <div className="text-sm">
                                    <p className="text-gray-600">Payment: {order.paymentMethod}</p>
                                    <p className="text-gray-600">
                                        {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString('en-IN')}` : 'Not Paid'}
                                    </p>
                                </div>
                                <Link
                                    to={`/order/${order._id}`}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistoryPage;
