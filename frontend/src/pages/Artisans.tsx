import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Star, Package, Heart, Award, ShieldCheck } from 'lucide-react';
import { getAllArtisans, type ArtisanProfile } from '@/data/mockArtisans';

const Artisans = () => {
    const [artisans, setArtisans] = useState<ArtisanProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call with mock data
        // TODO: Replace with real API call when backend is ready
        // const fetchArtisans = async () => {
        //     const response = await fetch('http://localhost:5000/api/users/artisans');
        //     const data = await response.json();
        //     setArtisans(data);
        // };

        const loadMockData = () => {
            setTimeout(() => {
                const mockArtisans = getAllArtisans();
                setArtisans(mockArtisans);
                setLoading(false);
            }, 500); // Simulate network delay
        };

        loadMockData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-gradient-hero text-white py-20 px-4">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Meet Our Artisans</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Discover the talented craftspeople preserving India's rich heritage
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: ShieldCheck, label: 'Verified Artisans', value: '250+' },
                        { icon: Award, label: 'Craft Traditions', value: '15' },
                        { icon: MapPin, label: 'States Covered', value: '28' },
                        { icon: Heart, label: 'Happy Customers', value: '50K+' },
                    ].map((stat, index) => (
                        <Card key={index} className="text-center py-6 shadow-soft border-none">
                            <CardContent className="pt-6">
                                <stat.icon className="h-10 w-10 mx-auto text-primary mb-4" />
                                <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                                <p className="text-muted-foreground">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Featured Artisans */}
            <section className="container mx-auto px-4 py-20">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold font-serif mb-2 text-foreground">Featured Artisans</h2>
                    <p className="text-muted-foreground">Discover the masters behind the crafts</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artisans.map((artisan) => (
                        <Card key={artisan._id} className="hover:shadow-warm transition-all duration-300 border-border/50 overflow-hidden group">
                            <CardHeader className="flex flex-row items-start gap-4 pb-2">
                                <Avatar className="h-16 w-16 border-2 border-primary/20">
                                    <AvatarImage src={artisan.profileImage} alt={artisan.username} className="object-cover" />
                                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
                                        {artisan.username.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                            {artisan.username}
                                        </h3>
                                        {artisan.verified && (
                                            <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-green-100 text-green-700 hover:bg-green-100">
                                                <ShieldCheck className="h-3 w-3 mr-0.5" /> Verified
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <MapPin className="h-3.5 w-3.5 mr-1" />
                                        {artisan.workshop.location}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {artisan.specialties.slice(0, 2).map((specialty, i) => (
                                        <Badge key={i} variant="outline" className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10">
                                            {specialty}
                                        </Badge>
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                    {artisan.bio}
                                </p>
                                <div className="flex items-center justify-between text-sm border-t border-border pt-4">
                                    <div className="flex items-center text-amber-500 font-medium">
                                        <Star className="h-4 w-4 fill-current mr-1" />
                                        {artisan.rating} <span className="text-muted-foreground ml-1 font-normal">({artisan.reviewCount})</span>
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                        <Package className="h-4 w-4 mr-1" />
                                        {artisan.yearsOfExperience}+ years
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                                    <Link to={`/artisans/${artisan._id}`}>View Profile</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-muted/30 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold font-serif mb-4">Are You an Artisan?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Join our community and showcase your crafts to thousands of appreciative customers.
                        Get support, grow your business, and preserve your cultural heritage.
                    </p>
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                        <Link to="/become-seller">Join as Artisan</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Artisans;
