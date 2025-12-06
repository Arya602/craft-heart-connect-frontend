import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Search, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

const HelpCenter = () => {
    const handleContactSupport = () => {
        toast.info("Redirecting to contact page...");
        window.location.href = "/contact";
    };

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold font-serif mb-4">Help Center</h1>
                    <p className="text-muted-foreground mb-8">How can we help you today?</p>

                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search for help articles..." className="pl-9 h-12" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                                <AccordionContent>
                                    You can track your order by logging into your account and visiting the "My Orders" section.
                                    We also send email updates with tracking numbers once your order is shipped.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                                <AccordionContent>
                                    We accept returns within 7 days of delivery for damaged or incorrect items.
                                    Since our products are handmade, slight variations are natural and not considered defects.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, we ship to select international locations. Shipping costs and delivery times vary by destination.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>How can I contact an artisan?</AccordionTrigger>
                                <AccordionContent>
                                    You can use the "Message Seller" button on any product page to send a direct inquiry to the artisan.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <div className="bg-muted/30 p-8 rounded-lg h-fit">
                        <h2 className="text-xl font-bold mb-4">Still need help?</h2>
                        <p className="text-muted-foreground mb-6">
                            Our support team is available Monday to Friday, 9am to 6pm IST.
                        </p>
                        <Button onClick={handleContactSupport} className="w-full mb-4 gap-2">
                            <Mail className="h-4 w-4" /> Contact Support
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                            Average response time: 24 hours
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
