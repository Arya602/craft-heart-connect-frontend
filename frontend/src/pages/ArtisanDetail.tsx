import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Star, ShieldCheck, Mail, Calendar, Award, Phone, Globe, Package, IndianRupee, CheckCircle2, Flag } from "lucide-react";
import { toast } from "react-toastify";
import ProductCard from "@/components/ProductCard";
import { getArtisanById } from "@/data/mockArtisans";
import ReportModal from "@/components/ReportModal";
import textileImage from "@/assets/craft-textile.jpg";
import potteryImage from "@/assets/craft-pottery.jpg";

const ArtisanDetail = () => {
    const { id } = useParams();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Message sent successfully! The artisan will get back to you soon.");
        setIsDialogOpen(false);
    };

    // Get artisan data from mock data file
    // TODO: Replace with API call when backend is ready
    // const artisan = await fetch(`/api/users/${id}`).then(res => res.json());
    const artisan = getArtisanById(id || "1");

    if (!artisan) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Artisan Not Found</h2>
                    <p className="text-muted-foreground mb-4">The artisan you're looking for doesn't exist.</p>
                    <Button asChild>
                        <Link to="/artisans">View All Artisans</Link>
                    </Button>
                </div>
            </div>
        );
    }

    // Mock products for this artisan
    const products = [
        {
            id: "1",
            image: artisan.craft === "Textiles" ? textileImage : potteryImage,
            title: `Handcrafted ${artisan.craft} by ${artisan.username}`,
            artisan: artisan.username,
            price: artisan.priceRange.min + 500,
            rating: artisan.rating,
            reviews: artisan.reviewCount,
        },
        {
            id: "2",
            image: artisan.craft === "Textiles" ? textileImage : potteryImage,
            title: `Premium ${artisan.craft} Collection`,
            artisan: artisan.username,
            price: artisan.priceRange.max - 1000,
            rating: artisan.rating,
            reviews: Math.floor(artisan.reviewCount / 2),
        },
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero / Cover */}
            <div className="h-64 md:h-80 bg-gradient-to-r from-orange-100 to-amber-100 relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            </div>

            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Profile Card */}
                    <Card className="w-full md:w-1/3 lg:w-1/4 shadow-lg border-none">
                        <CardContent className="pt-6 text-center">
                            <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-white shadow-md">
                                <AvatarImage src={artisan.profileImage} alt={artisan.username} className="object-cover" />
                                <AvatarFallback>{artisan.username.charAt(0)}</AvatarFallback>
                            </Avatar>

                            <div className="flex items-center justify-center gap-2 mb-1">
                                <h1 className="text-2xl font-bold font-serif">{artisan.username}</h1>
                                {artisan.verified && (
                                    <ShieldCheck className="h-5 w-5 text-green-600" />
                                )}
                            </div>
                            <p className="text-muted-foreground mb-2">{artisan.workshop.name}</p>
                            <Badge variant="secondary" className="mb-4">{artisan.craft}</Badge>

                            <div className="flex justify-center gap-2 mb-6">
                                <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                    <Star className="h-3 w-3 mr-1 fill-current" /> {artisan.rating} ({artisan.reviewCount})
                                </Badge>
                            </div>

                            <div className="space-y-3 text-left border-t border-border pt-4 mb-6">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 flex-shrink-0" />
                                    <span>{artisan.workshop.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Award className="h-4 w-4 flex-shrink-0" />
                                    <span>{artisan.yearsOfExperience} years experience</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4 flex-shrink-0" />
                                    <span>{artisan.phone}</span>
                                </div>
                                {artisan.website && (
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Globe className="h-4 w-4 flex-shrink-0" />
                                        <a href={artisan.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary truncate">
                                            Website
                                        </a>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <IndianRupee className="h-4 w-4 flex-shrink-0" />
                                    <span>₹{artisan.priceRange.min.toLocaleString()} - ₹{artisan.priceRange.max.toLocaleString()}</span>
                                </div>
                                {artisan.customOrders && (
                                    <div className="flex items-center gap-3 text-sm text-green-600">
                                        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                                        <span>Accepts custom orders</span>
                                    </div>
                                )}
                            </div>

                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full gap-2">
                                        <Mail className="h-4 w-4" /> Contact Artisan
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Contact {artisan.username}</DialogTitle>
                                        <DialogDescription>
                                            Send a message to the artisan. They will respond to your registered email.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleContactSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input id="subject" placeholder="Inquiry about your products" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Hi, I'm interested in learning more about..."
                                                className="min-h-[120px]"
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="w-full">Send Message</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            <Button variant="ghost" className="w-full gap-2 mt-2 text-muted-foreground hover:text-destructive" onClick={() => setIsReportModalOpen(true)}>
                                <Flag className="h-4 w-4" /> Report Artisan
                            </Button>
                        </CardContent>
                    </Card>

                    <ReportModal
                        isOpen={isReportModalOpen}
                        onClose={() => setIsReportModalOpen(false)}
                        entityId={id || "1"}
                        entityType="User"
                        entityName={artisan.username}
                    />

                    {/* Content Area */}
                    <div className="flex-1 space-y-8 mt-4 md:mt-20">
                        {/* Bio */}
                        <div>
                            <h2 className="text-2xl font-bold font-serif mb-4">About the Artisan</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                                {artisan.bio}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {artisan.specialties.map((spec) => (
                                    <Badge key={spec} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                        {spec}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Story */}
                        <div>
                            <h2 className="text-2xl font-bold font-serif mb-4">Artisan's Story</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {artisan.story}
                            </p>
                        </div>

                        {/* Portfolio Gallery */}
                        <div>
                            <h2 className="text-2xl font-bold font-serif mb-4">Portfolio</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {artisan.portfolio.map((image, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity shadow-md"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <img
                                            src={image}
                                            alt={`Portfolio ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Awards */}
                        {artisan.awards.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold font-serif mb-4">Awards & Recognition</h2>
                                <div className="space-y-2">
                                    {artisan.awards.map((award, index) => (
                                        <div key={index} className="flex items-center gap-3 text-muted-foreground">
                                            <Award className="h-5 w-5 text-amber-500" />
                                            <span>{award}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Workshop */}
                        <div>
                            <h2 className="text-2xl font-bold font-serif mb-4">Workshop</h2>
                            <Card className="overflow-hidden">
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={artisan.workshop.image}
                                        alt={artisan.workshop.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{artisan.workshop.name}</h3>
                                    <p className="text-muted-foreground mb-2 flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        {artisan.workshop.location}
                                    </p>
                                    <p className="text-muted-foreground">{artisan.workshop.description}</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Products */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold font-serif">Crafted Products</h2>
                                <Button variant="link" asChild>
                                    <Link to={`/explore?seller=${artisan._id}`}>View All</Link>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Portfolio Image Modal */}
            {selectedImage && (
                <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                    <DialogContent className="max-w-4xl">
                        <img
                            src={selectedImage}
                            alt="Portfolio"
                            className="w-full h-auto rounded-lg"
                        />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default ArtisanDetail;
