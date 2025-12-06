import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Flame, TrendingUp } from "lucide-react";
import textileImage from "@/assets/craft-textile.jpg";
import potteryImage from "@/assets/craft-pottery.jpg";
import woodImage from "@/assets/craft-wood.jpg";
import jewelryImage from "@/assets/craft-jewelry.jpg";

const Trending = () => {
    // Mock trending products (high rating/reviews)
    const products = [
        {
            id: "1",
            image: textileImage,
            title: "Handwoven Pochampally Saree",
            artisan: "Lakshmi Textiles",
            price: 4500,
            rating: 4.8,
            reviews: 124,
            trending: true
        },
        {
            id: "4",
            image: jewelryImage,
            title: "Handcrafted Beaded Jewelry",
            artisan: "Meera Designs",
            price: 650,
            rating: 4.6,
            reviews: 203,
            trending: true
        },
        {
            id: "5",
            image: textileImage,
            title: "Kashmiri Pashmina Shawl",
            artisan: "Aaliya Weaves",
            price: 8500,
            rating: 4.9,
            reviews: 67,
            trending: true
        },
        {
            id: "8",
            image: jewelryImage,
            title: "Temple Jewelry Necklace",
            artisan: "Tamil Traditions",
            price: 3200,
            rating: 4.7,
            reviews: 176,
            trending: true
        },
        {
            id: "3",
            image: woodImage,
            title: "Channapatna Wooden Toys",
            artisan: "Ravi Crafts",
            price: 800,
            rating: 4.7,
            reviews: 156,
            trending: true
        },
        {
            id: "11",
            image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&auto=format&fit=crop&q=60",
            title: "Brass Oil Lamp (Diya)",
            artisan: "Moradabad Brass",
            price: 950,
            rating: 4.8,
            reviews: 112,
            trending: true
        }
    ];

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-4">
                        <Flame className="h-8 w-8 text-orange-600" />
                    </div>
                    <h1 className="text-4xl font-bold font-serif mb-4">Trending Now</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        See what everyone is talking about. These are our most popular and highly-rated items this week.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="relative group">
                            <div className="absolute -top-2 -right-2 z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> HOT
                            </div>
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-muted/30 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold font-serif mb-4">Don't Miss Out!</h2>
                    <p className="text-muted-foreground mb-6">
                        Trending items sell out fast. Grab your favorites before they're gone.
                    </p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                        Shop All Trending
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Trending;
