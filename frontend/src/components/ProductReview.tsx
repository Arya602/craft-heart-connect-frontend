import { useState } from 'react';
import { useCreateReviewMutation } from '../redux/api/productsApiSlice';
import { toast } from 'react-toastify';

interface ProductReviewProps {
    productId: string;
    onReviewAdded?: () => void;
}

const ProductReview = ({ productId, onReviewAdded }: ProductReviewProps) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [createReview, { isLoading }] = useCreateReviewMutation();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createReview({ productId, rating, comment }).unwrap();
            toast.success('Review submitted successfully');
            setComment('');
            setRating(5);
            if (onReviewAdded) onReviewAdded();
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to submit review');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Rating</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    >
                        <option value={5}>5 - Excellent</option>
                        <option value={4}>4 - Very Good</option>
                        <option value={3}>3 - Good</option>
                        <option value={2}>2 - Fair</option>
                        <option value={1}>1 - Poor</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Comment</label>
                    <textarea
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        placeholder="Share your experience with this product..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-semibold disabled:bg-gray-400"
                >
                    {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default ProductReview;
