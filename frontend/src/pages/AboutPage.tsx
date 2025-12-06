import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Users, Award, MapPin, Target, Eye, ArrowRight } from 'lucide-react';

const AboutPage = () => {
    const team = [
        {
            name: 'Ananya Sharma',
            role: 'Founder & CEO',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60',
            bio: 'Passionate about preserving craft traditions and empowering artisans.',
        },
        {
            name: 'Rajesh Kumar',
            role: 'Head of Artisan Relations',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
            bio: 'Connecting with artisan communities across India to build partnerships.',
        },
        {
            name: 'Priya Menon',
            role: 'Chief Design Officer',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60',
            bio: 'Ensuring our platform beautifully showcases traditional craftsmanship.',
        },
        {
            name: 'Vikram Singh',
            role: 'Operations Lead',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
            bio: 'Making sure every order reaches customers with care and on time.',
        },
    ];

    const values = [
        {
            icon: Heart,
            title: 'Authenticity',
            description: 'Every craft tells a greater story of tradition, skill, and cultural heritage passed down through generations.',
        },
        {
            icon: Users,
            title: 'Community',
            description: 'We believe in building strong connections between artisans and customers, fostering appreciation for handmade crafts.',
        },
        {
            icon: Award,
            title: 'Quality',
            description: 'Each item is carefully curated to ensure the highest standards of craftsmanship and attention to detail.',
        },
        {
            icon: MapPin,
            title: 'Local Impact',
            description: 'Supporting local artisans helps preserve cultural traditions and provides sustainable livelihoods for communities.',
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-gradient-hero text-white py-24 px-4">
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">About Tinker Tryst</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white/90 font-light">
                        Where Hands Meet Hearts — Discover the Soul of Craft
                    </p>
                    <p className="text-lg max-w-2xl mx-auto text-white/80">
                        We're on a mission to preserve India's rich craft heritage by connecting talented artisans with appreciative customers worldwide.
                    </p>
                </div>
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            </section>

            {/* Our Story */}
            <section className="container mx-auto px-4 py-20">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold font-serif mb-6 text-foreground">Our Story</h2>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            Tinker Tryst was born from a simple observation: India's incredible craft traditions were fading, and talented artisans were struggling to find markets for their work.
                        </p>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            Founded in 2023, we started by visiting small villages and meeting artisans who had been practicing their crafts for generations. We heard their stories, saw their incredible work, and knew we had to create a platform that could help them thrive.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Today, we work with over 250 verified artisans across 28 states, helping them reach customers who truly appreciate handmade, authentic crafts. Every purchase on Tinker Tryst supports a family, preserves a tradition, and keeps cultural heritage alive.
                        </p>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full z-0"></div>
                        <img
                            src="https://images.unsplash.com/photo-1459749411177-287ce3288789?w=800&auto=format&fit=crop&q=60"
                            alt="Potter working on wheel"
                            className="rounded-lg shadow-warm relative z-10 w-full"
                        />
                        <div className="absolute bottom-8 left-8 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-20">
                            <p className="text-3xl font-bold">250+</p>
                            <p className="text-sm opacity-90">Active Patrons</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-muted/30 py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-none shadow-soft hover:shadow-warm transition-all duration-300">
                            <CardContent className="p-8">
                                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-primary">
                                    <Target className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold font-serif mb-4">Our Mission</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    To empower artisans by providing them with a digital platform that connects their crafts with appreciative customers worldwide, while preserving India's rich cultural heritage and traditional craftsmanship for future generations.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-soft hover:shadow-warm transition-all duration-300">
                            <CardContent className="p-8">
                                <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-secondary">
                                    <Eye className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold font-serif mb-4">Our Vision</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    To become the world's most trusted marketplace for authentic handmade crafts, where every purchase makes a meaningful difference in an artisan's life and contributes to preserving cultural traditions that have existed for centuries.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-serif mb-4">Our Values</h2>
                    <p className="text-muted-foreground">These principles guide everything we do at Tinker Tryst</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <Card key={index} className="text-center border-border/50 hover:border-primary/30 transition-colors h-full">
                            <CardContent className="pt-8 pb-8 px-6">
                                <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
                                    <value.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {value.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Meet Our Team */}
            <section className="bg-muted/30 py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold font-serif mb-4">Meet Our Team</h2>
                        <p className="text-muted-foreground">Passionate individuals working to make a difference in artisans' lives</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <Card key={index} className="text-center border-none shadow-sm hover:shadow-md transition-all">
                                <CardContent className="pt-8 pb-8">
                                    <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-white shadow-md">
                                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">{member.role}</p>
                                    <p className="text-sm text-muted-foreground px-2">
                                        {member.bio}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-serif mb-4">Our Impact</h2>
                    <p className="text-muted-foreground">Together, we're making a real difference</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: '250+', label: 'Artisan Families Supported' },
                        { value: '1200+', label: 'Unique Crafts Listed' },
                        { value: '50K+', label: 'Happy Customers' },
                        { value: '28', label: 'States Covered' },
                    ].map((stat, index) => (
                        <div key={index}>
                            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 pb-20">
                <div className="bg-gradient-warm rounded-2xl p-12 text-center text-white shadow-warm">
                    <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                        <Award className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Join Our Mission</h2>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                        Whether you're an artisan looking to showcase your crafts or a customer who appreciates authentic handmade items, we'd love to have you be part of our community.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold" asChild>
                            <Link to="/register">Become an Artisan</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold bg-transparent" asChild>
                            <Link to="/explore">Start Shopping <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
