// Enhanced mock data for artisan profiles
// This file contains comprehensive sample data that can be easily replaced with real API data later

export interface ArtisanProfile {
    _id: string;
    username: string;
    email: string;
    bio: string;
    profileImage: string;
    craft: string;
    story: string;
    workshop: {
        name: string;
        location: string;
        description: string;
        image: string;
    };
    // Enhanced fields
    rating: number;
    reviewCount: number;
    phone: string;
    website?: string;
    priceRange: {
        min: number;
        max: number;
    };
    customOrders: boolean;
    yearsOfExperience: number;
    awards: string[];
    portfolio: string[];
    specialties: string[];
    verified: boolean;
}

export const mockArtisans: ArtisanProfile[] = [
    {
        _id: "1",
        username: "Ravi Kumar",
        email: "ravi@example.com",
        bio: "Weaving stories into textiles. Specialist in traditional Indian prints and Ikat weaving techniques.",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
        craft: "Textiles",
        story: "I come from a family of weavers in Pochampally. For generations, we have been keeping the art of Ikat alive. My grandfather taught me the intricate dyeing techniques when I was just 10 years old. Today, I blend traditional patterns with contemporary designs to create unique pieces that tell stories of our heritage.",
        workshop: {
            name: "Lakshmi Textiles",
            location: "Pochampally, Telangana",
            description: "A traditional loom setup where we dye and weave our own yarns using natural dyes and time-honored techniques.",
            image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&auto=format&fit=crop&q=60"
        },
        rating: 4.8,
        reviewCount: 124,
        phone: "+91 98765 43210",
        website: "https://lakshmitextiles.example.com",
        priceRange: {
            min: 2000,
            max: 15000
        },
        customOrders: true,
        yearsOfExperience: 15,
        awards: ["National Handicrafts Award 2020", "UNESCO Seal of Excellence 2019"],
        portfolio: [
            "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1558769132-cb1aea3c8e5e?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&auto=format&fit=crop&q=60"
        ],
        specialties: ["Ikat Weaving", "Natural Dyeing", "Silk Sarees", "Cotton Textiles"],
        verified: true
    },
    {
        _id: "2",
        username: "Jane Smith",
        email: "jane@example.com",
        bio: "Passionate potter creating unique clay pieces inspired by nature and traditional Indian pottery techniques.",
        profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60",
        craft: "Pottery",
        story: "I started pottery as a hobby and fell in love with the tactile nature of clay. After years of practice and learning from master potters in Jaipur, I now run a small studio where I create functional and decorative pieces that bring joy to everyday life.",
        workshop: {
            name: "Earthly Crafts",
            location: "Jaipur, Rajasthan",
            description: "A sunny studio with 3 wheels and a kiln, where traditional meets contemporary pottery.",
            image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=60"
        },
        rating: 4.9,
        reviewCount: 89,
        phone: "+91 98765 43211",
        priceRange: {
            min: 500,
            max: 8000
        },
        customOrders: true,
        yearsOfExperience: 8,
        awards: ["State Craft Award 2021"],
        portfolio: [
            "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&auto=format&fit=crop&q=60"
        ],
        specialties: ["Terracotta", "Glazed Pottery", "Planters", "Tableware"],
        verified: true
    },
    {
        _id: "3",
        username: "Mohan Lal",
        email: "mohan@example.com",
        bio: "Carving dreams out of wood. Expert in Channapatna toys and traditional woodwork.",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60",
        craft: "Woodwork",
        story: "My father taught me how to turn wood when I was 10. I use safe vegetable dyes for my toys, keeping the tradition of Channapatna alive while ensuring safety for children.",
        workshop: {
            name: "Ravi Crafts",
            location: "Channapatna, Karnataka",
            description: "A small workshop filled with the smell of sandalwood and lacquer, where tradition meets playfulness.",
            image: "https://images.unsplash.com/photo-1615876063860-d971f6dca5dc?w=800&auto=format&fit=crop&q=60"
        },
        rating: 4.7,
        reviewCount: 156,
        phone: "+91 98765 43212",
        priceRange: {
            min: 300,
            max: 5000
        },
        customOrders: true,
        yearsOfExperience: 20,
        awards: ["Geographical Indication Tag Holder", "National Award for Toys 2018"],
        portfolio: [
            "https://images.unsplash.com/photo-1587828928301-9e6c8f6e3b8f?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&auto=format&fit=crop&q=60"
        ],
        specialties: ["Channapatna Toys", "Wooden Decor", "Lacquerware", "Eco-friendly Toys"],
        verified: true
    },
    {
        _id: "4",
        username: "Priya Sharma",
        email: "priya@example.com",
        bio: "Jewelry designer blending modern aesthetics with traditional techniques. Specialist in silver and semi-precious stones.",
        profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60",
        craft: "Jewelry",
        story: "I love working with silver and semi-precious stones to create statement pieces that celebrate Indian craftsmanship while appealing to contemporary tastes.",
        workshop: {
            name: "Meera Designs",
            location: "Jaipur, Rajasthan",
            description: "A cozy studio in the heart of the Pink City, where tradition meets modern design.",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop&q=60"
        },
        rating: 4.9,
        reviewCount: 203,
        phone: "+91 98765 43213",
        website: "https://meeradesigns.example.com",
        priceRange: {
            min: 1500,
            max: 25000
        },
        customOrders: true,
        yearsOfExperience: 12,
        awards: ["Best Designer Award 2022", "Craft Excellence Award 2020"],
        portfolio: [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&auto=format&fit=crop&q=60"
        ],
        specialties: ["Silver Jewelry", "Semi-precious Stones", "Contemporary Design", "Bridal Jewelry"],
        verified: true
    },
    {
        _id: "5",
        username: "Amit Patel",
        email: "amit@example.com",
        bio: "Bringing folk art to life on canvas. Madhubani and Warli artist preserving ancient traditions.",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
        craft: "Paintings",
        story: "Art is my meditation. I paint stories from Indian mythology using traditional Madhubani and Warli techniques passed down through generations.",
        workshop: {
            name: "Mithila Art",
            location: "Madhubani, Bihar",
            description: "My home studio where I teach local children and create vibrant folk art.",
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60"
        },
        rating: 4.8,
        reviewCount: 97,
        phone: "+91 98765 43214",
        priceRange: {
            min: 2000,
            max: 50000
        },
        customOrders: true,
        yearsOfExperience: 18,
        awards: ["National Folk Art Award 2019", "Padma Shri Nominee 2021"],
        portfolio: [
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop&q=60"
        ],
        specialties: ["Madhubani Art", "Warli Painting", "Folk Art", "Mythological Themes"],
        verified: true
    },
    {
        _id: "6",
        username: "Suresh Gupta",
        email: "suresh@example.com",
        bio: "Master of brass and copper artifacts. Creating traditional lamps and vessels with modern functionality.",
        profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60",
        craft: "Metalwork",
        story: "Metalwork requires patience and strength. I make traditional lamps and vessels that blend heritage with contemporary utility.",
        workshop: {
            name: "Golden Hands",
            location: "Moradabad, Uttar Pradesh",
            description: "A busy workshop with furnaces and casting molds, where metal transforms into art.",
            image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&auto=format&fit=crop&q=60"
        },
        rating: 4.7,
        reviewCount: 134,
        phone: "+91 98765 43215",
        priceRange: {
            min: 1000,
            max: 20000
        },
        customOrders: true,
        yearsOfExperience: 25,
        awards: ["Master Craftsman Award 2017", "Export Excellence Award 2020"],
        portfolio: [
            "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=800&auto=format&fit=crop&q=60"
        ],
        specialties: ["Brass Work", "Copper Vessels", "Traditional Lamps", "Decorative Items"],
        verified: true
    }
];

// Helper function to get artisan by ID
export const getArtisanById = (id: string): ArtisanProfile | undefined => {
    return mockArtisans.find(artisan => artisan._id === id);
};

// Helper function to get all artisans
export const getAllArtisans = (): ArtisanProfile[] => {
    return mockArtisans;
};
