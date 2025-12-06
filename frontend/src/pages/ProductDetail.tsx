import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, ShoppingCart, MapPin, Share2, User, Flag } from "lucide-react";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import potteryImage from "@/assets/craft-pottery.jpg";
import ReportModal from "@/components/ReportModal";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: any) => state.wishlist.items);
  const [quantity, setQuantity] = useState(1);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Mock product data
  const product = {
    id: id || "2",
    title: "Traditional Terracotta Pot Set",
    artisan: "Kumar Pottery",
    artisanImage: potteryImage,
    price: 1200,
    rating: 4.9,
    reviews: 89,
    description: "Handcrafted terracotta pottery made using traditional techniques passed down through generations. Each piece is unique and showcases the natural beauty of clay. Perfect for home decor or as planters.",
    region: "Tamil Nadu, India",
    materials: "Natural terracotta clay",
    dimensions: "Various sizes (Set of 5)",
    images: [potteryImage, potteryImage, potteryImage, potteryImage],
  };

  const reviews = [
    {
      id: 1,
      user: "Priya S.",
      rating: 5,
      comment: "Absolutely beautiful! The craftsmanship is exceptional.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      user: "Rajesh M.",
      rating: 4.8,
      comment: "Great quality and arrived safely packed. Highly recommend!",
      date: "1 month ago",
    },
  ];

  const isInWishlist = wishlistItems.some((item: any) => item.id === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        artisan: product.artisan,
      }));
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
    navigate('/cart');
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        artisan: product.artisan,
        rating: product.rating,
        reviews: product.reviews,
      }));
      toast.success("Added to wishlist!");
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/product/${product.id}`;
    navigator.clipboard.writeText(url);
    toast.info("Product link copied to clipboard!");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden shadow-warm">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-primary mb-4">₹{product.price}</p>
            </div>

            <p className="text-foreground leading-relaxed">{product.description}</p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-5 w-5" />
                <span>Crafted by <span className="font-semibold text-foreground">{product.artisan}</span></span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{product.region}</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm"><span className="font-semibold">Materials:</span> {product.materials}</p>
              <p className="text-sm"><span className="font-semibold">Dimensions:</span> {product.dimensions}</p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-r-none"
                >
                  -
                </Button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-l-none"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button size="lg" className="flex-1" variant="hero" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleToggleWishlist}
                className={isInWishlist ? "text-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
              </Button>
              <Button size="lg" variant="outline" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={() => setIsReportModalOpen(true)}>
                <Flag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          entityId={product.id}
          entityType="Product"
          entityName={product.title}
        />

        {/* Reviews Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.user}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <p className="text-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
