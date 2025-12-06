import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { removeFromWishlist, addToWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const WishlistPage = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state: any) => state.wishlist);

    const handleRemove = (id: string) => {
        dispatch(removeFromWishlist(id));
        toast.success("Removed from wishlist");
    };

    const handleAddToCart = (item: any) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
                    <p className="text-muted-foreground mb-6">
                        Save items you love to your wishlist
                    </p>
                    <Button asChild>
                        <Link to="/explore">Browse Products</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-serif">My Wishlist</h1>
                    <p className="text-muted-foreground">{items.length} items saved</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item: any) => (
                        <Card key={item.id} className="group hover:shadow-lg transition-all">
                            <CardContent className="p-4">
                                <Link to={`/product/${item.id}`}>
                                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                </Link>
                                <Link to={`/product/${item.id}`}>
                                    <h3 className="font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                </Link>
                                <p className="text-sm text-muted-foreground mb-2">{item.artisan}</p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-bold text-primary">₹{item.price.toLocaleString()}</span>
                                    <div className="flex items-center text-sm text-amber-500">
                                        <span>★</span>
                                        <span className="ml-1">{item.rating}</span>
                                        <span className="text-muted-foreground ml-1">({item.reviews})</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        <ShoppingCart className="h-4 w-4 mr-1" />
                                        Add to Cart
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
