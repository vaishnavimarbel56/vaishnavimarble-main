import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, MessageCircle, Phone, ShoppingBag, X } from "lucide-react";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { CartDrawer } from "@/components/CartDrawer";
import { CATEGORIES } from "@/data/content";
import { SOCIALS } from "@/lib/socials";
import { Facebook, Instagram, ShoppingCart as ShopIcon } from "lucide-react";
import "@/styles/animations.css";

const SOCIAL_ICON = { instagram: Instagram, facebook: Facebook, shopify: ShopIcon, whatsapp: MessageCircle } as const;

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/price-list", label: "Price List" },
  { to: "/videos", label: "Video Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact Us" },
] as const;

const linkBase =
  "relative py-2 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:scale-x-0 after:origin-left after:transition-transform after:duration-200";
const linkActive = "text-foreground after:scale-x-100";

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useCart();
  const { count: saved } = useWishlist();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 shadow-soft backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 sm:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img src="/logo.svg" alt="VAISHNAVI MARBLE" className="h-8 w-8 rounded-sm object-contain" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-wide text-foreground sm:text-xl">
                {BUSINESS.name}
              </span>
              <span className="mt-1 text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground sm:text-[0.65rem]">
                {BUSINESS.tagline}
              </span>
            </div>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-5 lg:flex xl:gap-7">
            {NAV.map((n) =>
              n.to === "/products" ? (
                <div key={n.to} className="group relative">
                  <a href="/products" className={`${linkBase} ${pathname === n.to ? linkActive : ""}`}>
                    {n.label}
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </a>

                  <div className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <ul className="overflow-hidden rounded-sm border border-border bg-card py-1 shadow-lift">
                      {CATEGORIES.map((c) => (
                        <li key={c.slug}>
                          <Link to="/category/$slug" params={{ slug: c.slug }} className="block px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-gold-soft hover:text-foreground">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link key={n.to} to={n.to} className={`${linkBase} ${pathname === n.to ? linkActive : ""}`}>
                  {n.label}
                </Link>
              ),
            )}

            <a
              href={whatsappLink(`Namaste ${BUSINESS.name}! I'd like to book a marble enquiry.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-whatsapp px-3 py-2 text-xs font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat
            </a>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              className="inline-flex items-center justify-center rounded-sm p-2 text-muted-foreground"
            >
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className="hidden gap-2 items-center lg:flex">
            <Link to="/wishlist" aria-label={`Wishlist, ${saved} saved items`} className="relative inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground">
              <Heart className="h-4 w-4" aria-hidden="true" />
              {saved > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-accent-foreground">
                  {saved}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={`Open cart, ${count} items`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-gold hover:bg-gold-soft"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-accent-foreground">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {menu && (
          <nav aria-label="Mobile" className="border-t border-border bg-card lg:hidden">
            <ul className="mx-auto max-h-[70vh] max-w-7xl overflow-y-auto px-5 py-2 sm:px-8">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} onClick={() => setMenu(false)} className="block border-b border-border/60 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {n.label}
                  </Link>
                </li>
              ))}
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link to="/category/$slug" params={{ slug: c.slug }} onClick={() => setMenu(false)} className="block border-b border-border/60 py-3 pl-4 text-sm text-muted-foreground">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
