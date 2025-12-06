import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRequestSellerRoleMutation } from "@/redux/api/sellerApiSlice";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-toastify";
import { Loader2, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const SellerOnboardingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: any) => state.auth);
    const [requestSellerRole, { isLoading }] = useRequestSellerRoleMutation();

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const [formData, setFormData] = useState({
        craft: "",
        workshopName: "",
        workshopLocation: "",
        workshopDescription: "",
        workshopImage: "",
        story: "",
    });

    // Redirect if not logged in
    if (!userInfo) {
        navigate("/login?redirect=/become-seller");
        return null;
    }

    // Redirect if already a seller
    if (userInfo.roles?.includes("seller")) {
        navigate("/profile");
        toast.info("You are already a seller!");
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (value: string) => {
        setFormData({
            ...formData,
            craft: value,
        });
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            const res = await requestSellerRole({
                craft: formData.craft,
                story: formData.story,
                workshop: {
                    name: formData.workshopName,
                    location: formData.workshopLocation,
                    description: formData.workshopDescription,
                    image: formData.workshopImage,
                },
            }).unwrap();

            // Update user info in Redux store
            dispatch(setCredentials({
                ...userInfo,
                roles: res.user.roles,
                craft: res.user.craft,
                story: res.user.story,
                workshop: res.user.workshop,
            }));

            toast.success(res.message);
            navigate("/profile");
        } catch (err: any) {
            toast.error(err?.data?.message || err.error || "Failed to submit seller request");
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return formData.craft && formData.workshopName;
            case 2:
                return formData.workshopLocation;
            case 3:
                return formData.story.length >= 50;
            case 4:
                return true;
            default:
                return false;
        }
    };

    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-serif">Become a Seller</CardTitle>
                        <CardDescription>
                            Join our community of talented artisans and share your crafts with the world
                        </CardDescription>
                        <Progress value={progress} className="mt-4" />
                        <p className="text-sm text-muted-foreground mt-2">
                            Step {currentStep} of {totalSteps}
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Step 1: Basic Information */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">Basic Information</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="craft">What type of craft do you specialize in? *</Label>
                                    <Select onValueChange={handleSelectChange} value={formData.craft}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your craft" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Textiles">Textiles</SelectItem>
                                            <SelectItem value="Pottery">Pottery</SelectItem>
                                            <SelectItem value="Woodwork">Woodwork</SelectItem>
                                            <SelectItem value="Jewelry">Jewelry</SelectItem>
                                            <SelectItem value="Paintings">Paintings</SelectItem>
                                            <SelectItem value="Metalwork">Metalwork</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="workshopName">Workshop/Studio Name *</Label>
                                    <Input
                                        id="workshopName"
                                        name="workshopName"
                                        placeholder="e.g., Lakshmi Textiles"
                                        value={formData.workshopName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Workshop Details */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">Workshop Details</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="workshopLocation">Workshop Location *</Label>
                                    <Input
                                        id="workshopLocation"
                                        name="workshopLocation"
                                        placeholder="e.g., Jaipur, Rajasthan"
                                        value={formData.workshopLocation}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="workshopDescription">Workshop Description</Label>
                                    <Textarea
                                        id="workshopDescription"
                                        name="workshopDescription"
                                        placeholder="Describe your workshop setup, tools, and working environment..."
                                        value={formData.workshopDescription}
                                        onChange={handleInputChange}
                                        rows={4}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="workshopImage">Workshop Image URL (Optional)</Label>
                                    <Input
                                        id="workshopImage"
                                        name="workshopImage"
                                        type="url"
                                        placeholder="https://example.com/workshop-image.jpg"
                                        value={formData.workshopImage}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3: Artisan Story */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">Your Artisan Story</h3>
                                <p className="text-sm text-muted-foreground">
                                    Share your journey, inspiration, and what makes your craft unique
                                </p>

                                <div className="space-y-2">
                                    <Label htmlFor="story">Your Story * (minimum 50 characters)</Label>
                                    <Textarea
                                        id="story"
                                        name="story"
                                        placeholder="Tell us about your craft journey, your inspiration, and what makes your work special..."
                                        value={formData.story}
                                        onChange={handleInputChange}
                                        rows={8}
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {formData.story.length} / 50 characters minimum
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Review & Submit */}
                        {currentStep === 4 && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">Review Your Information</h3>

                                <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground">Craft Type</p>
                                        <p className="text-lg">{formData.craft}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground">Workshop Name</p>
                                        <p className="text-lg">{formData.workshopName}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground">Location</p>
                                        <p className="text-lg">{formData.workshopLocation}</p>
                                    </div>

                                    {formData.workshopDescription && (
                                        <div>
                                            <p className="text-sm font-semibold text-muted-foreground">Workshop Description</p>
                                            <p className="text-sm">{formData.workshopDescription}</p>
                                        </div>
                                    )}

                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground">Your Story</p>
                                        <p className="text-sm">{formData.story}</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm text-blue-900">
                                        <CheckCircle2 className="inline h-4 w-4 mr-2" />
                                        Your seller request will be automatically approved. You'll be able to start listing products immediately!
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6">
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                disabled={currentStep === 1}
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>

                            {currentStep < totalSteps ? (
                                <Button
                                    onClick={handleNext}
                                    disabled={!canProceed()}
                                >
                                    Next
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isLoading || !canProceed()}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit & Become a Seller"
                                    )}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SellerOnboardingPage;
