import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

const StoryDetail = () => {
    const { id } = useParams();

    // Mock data - fetch based on ID
    const story = {
        id: id,
        title: "The Legacy of Pochampally Ikat",
        subtitle: "Discover the intricate process behind the geometric patterns of Telangana's famous weave.",
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1200&auto=format&fit=crop&q=80",
        author: "Lakshmi Textiles",
        authorImage: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=100&auto=format&fit=crop&q=60",
        date: "Oct 15, 2023",
        content: `
      <p class="mb-6">The rhythmic clacking of handlooms is the heartbeat of Pochampally, a small town in Telangana that has put India on the global map of textiles. Here, the art of Ikat weaving is not just a livelihood; it is a legacy passed down through generations.</p>
      
      <h3 class="text-2xl font-bold font-serif mb-4 mt-8">The Art of 'Tie and Dye'</h3>
      <p class="mb-6">Ikat is a dyeing technique used to pattern textiles that employs resist dyeing on the yarns prior to dyeing and weaving the fabric. In Pochampally Ikat, the bundles of yarn are tightly wrapped together and dyed as many times as is needed to create the desired pattern. This process is known as 'Chitiki' in the local language.</p>
      
      <p class="mb-6">Unlike other ikat traditions, Pochampally is known for its intricate geometric patterns. The precision required is immense—a single error in tying the yarn can disrupt the entire design.</p>

      <h3 class="text-2xl font-bold font-serif mb-4 mt-8">A Family Tradition</h3>
      <p class="mb-6">"I learned to weave from my father, who learned from his father," says Ravi, a master weaver at Lakshmi Textiles. "Every saree tells a story of patience. It takes us about 4-5 days to weave a single saree, but the preparation of yarn takes weeks."</p>

      <div class="my-8 p-6 bg-muted/30 border-l-4 border-primary italic text-lg text-muted-foreground">
        "We don't just weave threads; we weave our culture, our history, and our soul into every piece of fabric."
      </div>

      <h3 class="text-2xl font-bold font-serif mb-4 mt-8">Modern Adaptations</h3>
      <p class="mb-6">While the technique remains ancient, the designs are evolving. Today, artisans are experimenting with contemporary colors and motifs to appeal to a younger, global audience. From scarves and stoles to home furnishings, Pochampally Ikat is finding its way into modern homes.</p>

      <p class="mb-6">By purchasing a handwoven product, you are not just buying a piece of cloth; you are supporting a community and keeping a centuries-old tradition alive.</p>
    `
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
                    <Link to="/stories"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Stories</Link>
                </Button>

                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">{story.title}</h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{story.subtitle}</p>

                <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={story.authorImage} />
                            <AvatarFallback>LT</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-foreground">{story.author}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {story.date}</span>
                                <span className="flex items-center gap-1"><User className="h-3 w-3" /> 5 min read</span>
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
                    <img src={story.image} alt={story.title} className="w-full h-auto object-cover" />
                </div>

                <div
                    className="prose prose-lg dark:prose-invert max-w-none font-serif"
                    dangerouslySetInnerHTML={{ __html: story.content }}
                />

                <div className="mt-16 pt-8 border-t border-border text-center">
                    <h3 className="text-2xl font-bold font-serif mb-4">Inspired by this story?</h3>
                    <p className="text-muted-foreground mb-6">Explore authentic Pochampally Ikat products crafted by our artisans.</p>
                    <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                        <Link to="/explore?category=textiles">Shop Textiles</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StoryDetail;
