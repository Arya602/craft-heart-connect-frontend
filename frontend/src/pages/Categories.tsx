import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Palette, Hammer, Scissors, Gem, Shirt, HardHat, Scroll, Mountain } from 'lucide-react';

const Categories = () => {
    const featuredCategories = [
        {
            id: 'textiles',
            name: 'Textiles & Fabrics',
            description: 'Handwoven sarees, shawls, and traditional fabrics from master weavers.',
            image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop&q=60',
            icon: Shirt,
            regions: ['Pochampally', 'Varanasi', 'Kanchipuram', 'Chanderi'],
            count: 234,
            color: 'bg-orange-100 text-orange-700',
        },
        {
            id: 'pottery',
            name: 'Pottery & Ceramics',
            description: 'Terracotta, blue pottery, and ceramic pieces crafted with ancient techniques.',
            image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=60',
            icon: HardHat, // Placeholder icon
            regions: ['Khurja', 'Jaipur', 'Azamgarh'],
            count: 156,
            color: 'bg-amber-100 text-amber-700',
        },
        {
            id: 'woodwork',
            name: 'Woodwork & Toys',
            description: 'Channapatna toys, carved furniture, and wooden decor selections.',
            image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=60',
            icon: Hammer,
            regions: ['Channapatna', 'Saharanpur', 'Nagina'],
            count: 189,
            color: 'bg-brown-100 text-brown-700',
        },
        {
            id: 'jewelry',
            name: 'Jewelry & Accessories',
            description: 'Traditional and contemporary handcrafted jewelry from skilled artisans.',
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=60',
            icon: Gem,
            regions: ['Jaipur', 'Kolhapur', 'Nagercoil'],
            count: 312,
            color: 'bg-rose-100 text-rose-700',
        },
    ];

    const moreCategories = [
        {
            id: 'paintings',
            name: 'Paintings & Art',
            description: 'Madhubani, Warli, Tanjore and other traditional Indian painting styles.',
            image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60',
            icon: Palette,
            count: 98,
        },
        {
            id: 'metalwork',
            name: 'Metalwork & Brass',
            description: 'Handcrafted brass, copper, and metal artifacts with intricate designs.',
            image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&auto=format&fit=crop&q=60',
            icon: Hammer,
            count: 127,
        },
        {
            id: 'leather',
            name: 'Leather Goods',
            description: 'Traditional leather bags, footwear, and accessories.',
            image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=800&auto=format&fit=crop&q=60',
            icon: Scissors,
            count: 87,
        },
        {
            id: 'stone',
            name: 'Stone & Marble',
            description: 'Marble inlay work, stone carvings, and sculptural pieces.',
            image: 'https://images.unsplash.com/photo-1517260739337-6799d239ce83?w=800&auto=format&fit=crop&q=60',
            icon: Mountain,
            count: 64,
        },
        {
            id: 'paper',
            name: 'Paper Crafts',
            description: 'Handmade paper products, cards, and decorative items.',
            image: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&auto=format&fit=crop&q=60',
            icon: Scroll,
            count: 73,
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-gradient-hero text-white py-20 px-4">
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Explore by Category</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
                        Discover authentic handcrafted items across diverse traditional craft categories from artisans all over India
                    </p>
                </div>
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            </section>

            {/* Featured Categories */}
            <section className="container mx-auto px-4 py-20">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold font-serif mb-2 text-foreground">Featured Categories</h2>
                    <p className="text-muted-foreground">Our most popular craft traditions</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredCategories.map((category) => (
                        <Card key={category.id} className="overflow-hidden hover:shadow-warm transition-all duration-300 group border-border/50">
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="md:w-2/5 relative overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                                        <category.icon className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold font-serif mb-2 text-foreground">{category.name}</h3>
                                        <p className="text-muted-foreground mb-4">{category.description}</p>

                                        <div className="mb-4">
                                            <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Popular Regions:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {category.regions.map((region) => (
                                                    <Badge key={region} variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80">
                                                        {region}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                                        <span className="text-sm font-medium text-foreground">
                                            <span className="text-primary font-bold text-lg">{category.count}</span> items available
                                        </span>
                                        <Button asChild className="bg-primary hover:bg-primary/90">
                                            <Link to={`/explore?category=${category.id}`}>
                                                Browse {category.name.split(' ')[0]} <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* More Categories */}
            <section className="container mx-auto px-4 pb-20">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold font-serif mb-2 text-foreground">More Categories</h2>
                    <p className="text-muted-foreground">Explore additional craft traditions</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {moreCategories.map((category) => (
                        <Link key={category.id} to={`/explore?category=${category.id}`} className="group">
                            <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <div className="flex items-center gap-2 mb-1">
                                            <category.icon className="h-5 w-5" />
                                            <h3 className="text-xl font-bold font-serif">{category.name}</h3>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="pt-4">
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{category.description}</p>
                                    <div className="flex items-center text-xs font-medium text-primary">
                                        {category.count} items
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-primary-foreground py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold font-serif mb-4">Can't Find What You're Looking For?</h2>
                    <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
                        Browse all our crafts or contact us to help you discover the perfect handmade item.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" variant="secondary" asChild>
                            <Link to="/explore">Browse All Products</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                            Contact Us
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Categories;
