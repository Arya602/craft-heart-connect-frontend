const Terms = () => {
    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold font-serif mb-8">Terms and Conditions</h1>

                <div className="prose prose-stone dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                        <p className="text-muted-foreground">
                            Welcome to Tinker Tryst. By accessing our website and using our services, you agree to be bound by these Terms and Conditions.
                            Please read them carefully.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Use of Platform</h2>
                        <p className="text-muted-foreground">
                            You must be at least 18 years old to use this platform. You agree to provide accurate information when creating an account
                            and to maintain the security of your account credentials.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Product Information</h2>
                        <p className="text-muted-foreground">
                            We strive to display product colors and details as accurately as possible. However, as our products are handmade,
                            slight variations in color, texture, and size may occur. These are characteristics of handcrafted items, not defects.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
                        <p className="text-muted-foreground">
                            All content on this website, including text, graphics, logos, and images, is the property of Tinker Tryst or its content suppliers
                            and is protected by copyright laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                        <p className="text-muted-foreground">
                            Tinker Tryst shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from
                            your use of or inability to use the service.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                            Last updated: December 1, 2023
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
