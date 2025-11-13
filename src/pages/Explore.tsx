import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal } from "lucide-react";
import textileImage from "@/assets/craft-textile.jpg";
import potteryImage from "@/assets/craft-pottery.jpg";
import woodImage from "@/assets/craft-wood.jpg";
import jewelryImage from "@/assets/craft-jewelry.jpg";

const Explore = () => {
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const products = [
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
    {
      id: "5",
      image: textileImage,
      title: "Kashmiri Pashmina Shawl",
      artisan: "Aaliya Weaves",
      price: 8500,
      rating: 4.9,
      reviews: 67,
    },
    {
      id: "6",
      image: potteryImage,
      title: "Blue Pottery Vase",
      artisan: "Jaipur Ceramics",
      price: 2300,
      rating: 4.5,
      reviews: 98,
    },
    {
      id: "7",
      image: woodImage,
      title: "Sandalwood Carved Box",
      artisan: "Mysore Crafts",
      price: 1500,
      rating: 4.8,
      reviews: 142,
    },
    {
      id: "8",
      image: jewelryImage,
      title: "Temple Jewelry Necklace",
      artisan: "Tamil Traditions",
      price: 3200,
      rating: 4.7,
      reviews: 176,
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Crafts</h1>
          <p className="text-muted-foreground">Discover handmade treasures from artisans across India</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Filters</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search crafts..." className="pl-9" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="textiles">Textiles</SelectItem>
                      <SelectItem value="pottery">Pottery</SelectItem>
                      <SelectItem value="woodwork">Woodwork</SelectItem>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="paintings">Paintings</SelectItem>
                      <SelectItem value="metalwork">Metalwork</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Region</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="north">North India</SelectItem>
                      <SelectItem value="south">South India</SelectItem>
                      <SelectItem value="east">East India</SelectItem>
                      <SelectItem value="west">West India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Rating</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4">4★ & above</SelectItem>
                      <SelectItem value="4.5">4.5★ & above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full">
                  Reset Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">{products.length} products found</p>
              <Select defaultValue="featured">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Explore;
