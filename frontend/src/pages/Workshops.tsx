import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

const Workshops = () => {
    const workshops = [
        {
            id: 1,
            title: "Block Printing Masterclass",
            instructor: "Ravi Kumar",
            date: "Dec 10, 2023",
            time: "10:00 AM - 2:00 PM",
            location: "Jaipur, Rajasthan",
            image: "https://images.unsplash.com/photo-1606103920295-9a091573f160?w=800&auto=format&fit=crop&q=60",
            price: "₹1,500"
        },
        {
            id: 2,
            title: "Pottery Wheel Basics",
            instructor: "Jane Smith",
            date: "Dec 15, 2023",
            time: "11:00 AM - 3:00 PM",
            location: "New Delhi, Delhi",
            image: "https://images.unsplash.com/photo-1459749411177-287ce3288789?w=800&auto=format&fit=crop&q=60",
            price: "₹2,000"
        },
        {
            id: 3,
            title: "Madhubani Painting Workshop",
            instructor: "Amit Patel",
            date: "Dec 20, 2023",
            time: "2:00 PM - 5:00 PM",
            location: "Online (Zoom)",
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60",
            price: "₹800"
        }
    ];

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold font-serif mb-4">Workshops & Events</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Learn directly from master artisans. Join our hands-on workshops to understand
                        the techniques and history behind traditional Indian crafts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {workshops.map((workshop) => (
                        <Card key={workshop.id} className="overflow-hidden hover:shadow-warm transition-all duration-300">
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={workshop.image}
                                    alt={workshop.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">
                                    {workshop.price}
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold font-serif mb-2">{workshop.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">with {workshop.instructor}</p>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>{workshop.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>{workshop.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        <span>{workshop.location}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 pt-0">
                                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                                    <Link to={`/workshops/register/${workshop.id}`}>Register Now</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Workshops;
