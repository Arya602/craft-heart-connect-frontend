import { useState } from 'react';
import { useGetProductsQuery, useDeleteProductMutation } from '../../redux/api/productsApiSlice';
import { formatCurrency } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SellerDashboard = () => {
    const { data, isLoading, refetch } = useGetProductsQuery({});
    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id).unwrap();
                toast.success('Product deleted successfully');
                refetch();
            } catch (err) {
                toast.error('Failed to delete product');
            }
        }
    };

    if (isLoading) return <div className="p-8">Loading...</div>;

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Seller Dashboard</h1>
                <Link
                    to="/seller/product/new"
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                    + Add Product
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left">Image</th>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Price</th>
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-left">Stock</th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.products?.map((product: any) => (
                            <tr key={product._id} className="border-t hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                </td>
                                <td className="px-6 py-4">{product.name}</td>
                                <td className="px-6 py-4 font-semibold">{formatCurrency(product.price)}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">{product.countInStock}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/seller/product/${product._id}/edit`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerDashboard;
