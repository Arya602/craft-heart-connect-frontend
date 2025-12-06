import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Stories = () => {
    const stories = [
        {
            id: 1,
            title: "The Legacy of Pochampally Ikat",
            excerpt: "Discover the intricate process behind the geometric patterns of Telangana's famous weave.",
            image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop&q=60",
            author: "Lakshmi Textiles",
            date: "Oct 15, 2023"
        },
        {
            id: 2,
            title: "Reviving Blue Pottery in Jaipur",
            excerpt: "How a community of artisans is bringing a dying art form back to life with modern designs.",
            image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=60",
            author: "Jaipur Ceramics",
            date: "Nov 02, 2023"
        },
        {
            id: 3,
            title: "From Clay to Art: A Potter's Journey",
            excerpt: "Meet Rajesh, a third-generation potter who is redefining terracotta craftsmanship.",
            image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&auto=format&fit=crop&q=60",
            author: "Tinker Tryst Team",
            date: "Nov 20, 2023"
        }
    ];

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold font-serif mb-4">Artisan Stories</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Behind every handmade product is a story of tradition, skill, and dedication.
                        Read about the people and processes that make our crafts unique.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story) => (
                        <Card key={story.id} className="overflow-hidden hover:shadow-warm transition-all duration-300">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between text-xs text-muted-foreground mb-3">
                                    <span>{story.date}</span>
                                    <span>{story.author}</span>
                                </div>
                                <h3 className="text-xl font-bold font-serif mb-3">{story.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{story.excerpt}</p>
                                <Button variant="link" className="p-0 h-auto text-primary font-semibold" asChild>
                                    <Link to={`/stories/${story.id}`}>
                                        Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stories;
