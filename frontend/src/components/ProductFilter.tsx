import { useState } from 'react';

interface ProductFilterProps {
    onFilterChange: (filters: { category?: string; minPrice?: number; maxPrice?: number }) => void;
}

const categories = [
    'All',
    'Pottery',
    'Textiles',
    'Jewelry',
    'Woodwork',
    'Metalwork',
    'Paintings',
    'Other',
];

const ProductFilter = ({ onFilterChange }: ProductFilterProps) => {
    const [category, setCategory] = useState('All');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleApplyFilters = () => {
        const filters: any = {};
        if (category !== 'All') filters.category = category;
        if (minPrice) filters.minPrice = Number(minPrice);
        if (maxPrice) filters.maxPrice = Number(maxPrice);
        onFilterChange(filters);
    };

    const handleReset = () => {
        setCategory('All');
        setMinPrice('');
        setMaxPrice('');
        onFilterChange({});
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Filters</h3>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Price Range (₹)</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-1/2 border border-gray-300 rounded px-4 py-2"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-1/2 border border-gray-300 rounded px-4 py-2"
                    />
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={handleApplyFilters}
                    className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-semibold"
                >
                    Apply Filters
                </button>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default ProductFilter;
