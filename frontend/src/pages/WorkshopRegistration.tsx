import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

const WorkshopRegistration = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Mock workshop data
    const workshop = {
        id: id,
        title: "Block Printing Masterclass",
        price: "₹1,500",
        date: "Dec 10, 2023",
        time: "10:00 AM - 2:00 PM"
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            toast.success("Registration successful! Check your email for details.");
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-md text-center p-6 shadow-lg border-green-200 bg-green-50/50">
                    <CardContent className="pt-6">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-800 mb-2">Registration Confirmed!</h2>
                        <p className="text-muted-foreground mb-6">
                            You have successfully registered for <strong>{workshop.title}</strong>.
                        </p>
                        <div className="bg-white p-4 rounded-lg border border-border mb-4 text-left">
                            <p className="text-sm text-muted-foreground mb-1">Payment Instructions:</p>
                            <p className="font-medium text-foreground">Please pay {workshop.price} at the venue.</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6 text-left">
                            <p className="text-sm font-semibold text-blue-900 mb-2">📧 Confirmation Sent</p>
                            <p className="text-xs text-blue-800">
                                A confirmation email and SMS have been sent to your registered email address and mobile number with workshop details, venue information, and payment instructions.
                            </p>
                        </div>
                        <Button onClick={() => navigate('/workshops')} className="w-full">
                            Back to Workshops
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-md mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold font-serif mb-2">Workshop Registration</h1>
                    <p className="text-muted-foreground">Secure your spot for this hands-on experience</p>
                </div>

                <Card className="shadow-lg border-border/50">
                    <CardHeader className="bg-muted/30 border-b border-border">
                        <CardTitle className="text-xl">{workshop.title}</CardTitle>
                        <CardDescription>
                            {workshop.date} • {workshop.time} • <span className="font-bold text-primary">{workshop.price}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="John Doe" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="john@example.com" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                            </div>

                            <div className="space-y-3">
                                <Label>Payment Method</Label>
                                <RadioGroup defaultValue="offline">
                                    <div className="flex items-center space-x-2 border p-3 rounded-md bg-muted/20">
                                        <RadioGroupItem value="offline" id="offline" />
                                        <Label htmlFor="offline" className="cursor-pointer flex-1">
                                            Pay at Venue (Cash/UPI)
                                            <span className="block text-xs text-muted-foreground font-normal mt-0.5">
                                                Pay directly to the instructor before the session starts.
                                            </span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                                    </>
                                ) : (
                                    "Confirm Registration"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WorkshopRegistration;
