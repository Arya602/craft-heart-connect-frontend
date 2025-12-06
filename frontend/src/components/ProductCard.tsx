import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Star, ShoppingCart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { toast } from "react-toastify";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  artisan: string;
  price: number;
  rating: number;
  reviews: number;
}

const ProductCard = ({ id, image, title, artisan, price, rating, reviews }: ProductCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state: any) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item: any) => item.id === id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({ id, image, title, artisan, price }));
    toast.success("Added to cart!");
    navigate('/cart');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist({ id, image, title, artisan, price, rating, reviews }));
      toast.success("Added to wishlist!");
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/product/${id}`;
    navigator.clipboard.writeText(url);
    toast.info("Product link copied to clipboard!");
  };

  return (
    <Card className="group overflow-hidden hover:shadow-warm transition-all duration-300">
      <div className="relative overflow-hidden aspect-square">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`bg-background/80 backdrop-blur-sm hover:bg-background ${isInWishlist ? "text-red-500" : ""
              }`}
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">by {artisan}</p>
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviews})</span>
          </div>
          <p className="text-lg font-bold text-primary mt-2">₹{price.toLocaleString()}</p>
        </Link>
        <Button
          className="w-full mt-3"
          size="sm"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
