import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <Card className="group overflow-hidden hover:shadow-warm transition-all duration-300">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <Heart className="h-4 w-4" />
        </Button>
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
          <p className="text-lg font-bold text-primary mt-2">₹{price}</p>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
