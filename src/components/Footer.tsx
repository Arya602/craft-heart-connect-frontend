import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-warm bg-clip-text text-transparent mb-4">
              Tinker Tryst
            </h3>
            <p className="text-muted-foreground text-sm">
              Where Hands Meet Hearts — Discover the Soul of Craft.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/trending" className="text-muted-foreground hover:text-primary transition-colors">Trending</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/artisans" className="text-muted-foreground hover:text-primary transition-colors">Meet Artisans</Link></li>
              <li><Link to="/stories" className="text-muted-foreground hover:text-primary transition-colors">Stories</Link></li>
              <li><Link to="/workshops" className="text-muted-foreground hover:text-primary transition-colors">Workshops</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for artisans worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
