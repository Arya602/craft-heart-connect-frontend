import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";
import textileImage from "@/assets/craft-textile.jpg";
import potteryImage from "@/assets/craft-pottery.jpg";
import woodImage from "@/assets/craft-wood.jpg";
import jewelryImage from "@/assets/craft-jewelry.jpg";

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category")?.toLowerCase() || "all";

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Update local state when URL param changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category")?.toLowerCase() || "all";
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  // Update URL when category changes
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };

  const products = [
    {
      id: "1",
      image: textileImage,
      title: "Handwoven Pochampally Saree",
      artisan: "Lakshmi Textiles",
      price: 4500,
      rating: 4.8,
      reviews: 124,
      category: "textiles",
      region: "south",
    },
    {
      id: "2",
      image: potteryImage,
      title: "Traditional Terracotta Pot Set",
      artisan: "Kumar Pottery",
      price: 1200,
      rating: 4.9,
      reviews: 89,
      category: "pottery",
      region: "east",
    },
    {
      id: "3",
      image: woodImage,
      title: "Channapatna Wooden Toys",
      artisan: "Ravi Crafts",
      price: 800,
      rating: 4.7,
      reviews: 156,
      category: "woodwork",
      region: "south",
    },
    {
      id: "4",
      image: jewelryImage,
      title: "Handcrafted Beaded Jewelry",
      artisan: "Meera Designs",
      price: 650,
      rating: 4.6,
      reviews: 203,
      category: "jewelry",
      region: "west",
    },
    {
      id: "5",
      image: textileImage,
      title: "Kashmiri Pashmina Shawl",
      artisan: "Aaliya Weaves",
      price: 8500,
      rating: 4.9,
      reviews: 67,
      category: "textiles",
      region: "north",
    },
    {
      id: "6",
      image: potteryImage,
      title: "Blue Pottery Vase",
      artisan: "Jaipur Ceramics",
      price: 2300,
      rating: 4.5,
      reviews: 98,
      category: "pottery",
      region: "north",
    },
    {
      id: "7",
      image: woodImage,
      title: "Sandalwood Carved Box",
      artisan: "Mysore Crafts",
      price: 1500,
      rating: 4.8,
      reviews: 142,
      category: "woodwork",
      region: "south",
    },
    {
      id: "8",
      image: jewelryImage,
      title: "Temple Jewelry Necklace",
      artisan: "Tamil Traditions",
      price: 3200,
      rating: 4.7,
      reviews: 176,
      category: "jewelry",
      region: "south",
    },
    // New Items for Paintings
    {
      id: "9",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60",
      title: "Madhubani Folk Painting",
      artisan: "Bihar Arts",
      price: 2800,
      rating: 4.6,
      reviews: 45,
      category: "paintings",
      region: "east",
    },
    {
      id: "10",
      image: "https://images.unsplash.com/photo-1582560475093-6f733202f7d5?w=800&auto=format&fit=crop&q=60",
      title: "Warli Tribal Art Canvas",
      artisan: "Maharashtra Tribal Art",
      price: 1800,
      rating: 4.5,
      reviews: 32,
      category: "paintings",
      region: "west",
    },
    // New Items for Metalwork
    {
      id: "11",
      image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&auto=format&fit=crop&q=60",
      title: "Brass Oil Lamp (Diya)",
      artisan: "Moradabad Brass",
      price: 950,
      rating: 4.8,
      reviews: 112,
      category: "metalwork",
      region: "north",
    },
    {
      id: "12",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=60",
      title: "Copper Water Dispenser",
      artisan: "Veda Copper",
      price: 3500,
      rating: 4.9,
      reviews: 78,
      category: "metalwork",
      region: "north",
    },
  ];

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // Category Filter
    if (selectedCategory !== "all" && product.category !== selectedCategory) return false;

    // Price Filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;

    // Search Filter
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase()) && !product.artisan.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    // Region Filter
    if (selectedRegion !== "all" && product.region !== selectedRegion) return false;

    // Rating Filter
    if (selectedRating !== "all" && product.rating < parseFloat(selectedRating)) return false;

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") return parseInt(b.id) - parseInt(a.id);
    return 0; // featured (default order)
  });

  const resetFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedRating("all");
    setSelectedRegion("all");
    setSortBy("featured");
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 font-serif text-foreground">Explore Crafts</h1>
          <p className="text-muted-foreground">Discover handmade treasures from artisans across India</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-soft border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Filters</h2>
                </div>
                {(selectedCategory !== "all" || searchQuery || selectedRegion !== "all" || selectedRating !== "all") && (
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="h-auto p-0 text-xs text-muted-foreground hover:text-primary">
                    Reset
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search crafts..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
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
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
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
                  <Select value={selectedRating} onValueChange={setSelectedRating}>
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

                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{sortedProducts.length}</span> products found
                {selectedCategory !== "all" && <span> in <span className="font-semibold text-primary capitalize">{selectedCategory}</span></span>}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
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

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-muted/20 rounded-lg border border-dashed border-border">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
                <Button onClick={resetFilters}>Clear All Filters</Button>
              </div>
            )}

            {sortedProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <Button variant="outline" size="lg">Load More Products</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Explore;
