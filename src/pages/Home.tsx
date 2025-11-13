import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Sparkles, MapPin, Heart } from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";
import textileImage from "@/assets/craft-textile.jpg";
import potteryImage from "@/assets/craft-pottery.jpg";
import woodImage from "@/assets/craft-wood.jpg";
import jewelryImage from "@/assets/craft-jewelry.jpg";

const Home = () => {
  const featuredProducts = [
    {
      id: "1",
      image: textileImage,
      title: "Handwoven Pochampally Saree",
      artisan: "Lakshmi Textiles",
      price: 4500,
      rating: 4.8,
      reviews: 124,
    },
    {
      id: "2",
      image: potteryImage,
      title: "Traditional Terracotta Pot Set",
      artisan: "Kumar Pottery",
      price: 1200,
      rating: 4.9,
      reviews: 89,
    },
    {
      id: "3",
      image: woodImage,
      title: "Channapatna Wooden Toys",
      artisan: "Ravi Crafts",
      price: 800,
      rating: 4.7,
      reviews: 156,
    },
    {
      id: "4",
      image: jewelryImage,
      title: "Handcrafted Beaded Jewelry",
      artisan: "Meera Designs",
      price: 650,
      rating: 4.6,
      reviews: 203,
    },
  ];

  const categories = [
    { name: "Textiles", icon: "🧶", count: 234 },
    { name: "Pottery", icon: "🏺", count: 156 },
    { name: "Woodwork", icon: "🪵", count: 189 },
    { name: "Jewelry", icon: "💍", count: 312 },
    { name: "Paintings", icon: "🎨", count: 98 },
    { name: "Metalwork", icon: "⚒️", count: 127 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Artisan marketplace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Where Hands Meet Hearts
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            Discover the Soul of Craft — Connect with artisans and their timeless traditions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/explore">
                Explore Crafts <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-background/20 backdrop-blur-sm border-primary-foreground text-primary-foreground hover:bg-background/30" asChild>
              <Link to="/artisans">Meet Artisans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Authentic Crafts</h3>
            <p className="text-muted-foreground">
              Each piece tells a story of tradition and skilled craftsmanship
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
              <MapPin className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Local Artisans</h3>
            <p className="text-muted-foreground">
              Support local communities and preserve cultural heritage
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
              <Heart className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
            <p className="text-muted-foreground">
              Every item is handcrafted with care and attention to detail
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Crafts</h2>
            <p className="text-muted-foreground">Handpicked treasures from our artisans</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/explore">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/categories/${category.name.toLowerCase()}`}
                className="bg-card rounded-lg p-6 text-center hover:shadow-warm transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-warm rounded-2xl p-12 text-center text-primary-foreground shadow-warm">
          <h2 className="text-4xl font-bold mb-4">Become an Artisan Partner</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Share your crafts with the world. Join our community of talented artisans.
          </p>
          <Button variant="outline" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Start Selling
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
