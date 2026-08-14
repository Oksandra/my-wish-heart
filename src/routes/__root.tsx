import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Menu, Search, Heart, ShoppingCart, Package, User, ChevronDown } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { cn } from "../lib/utils";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

const navLinks = [
  { label: "Лента", href: "/" },
  { label: "Женщинам", href: "/" },
  { label: "Мужчинам", href: "/" },
  { label: "Детям", href: "/" },
  { label: "Дом", href: "/" },
  { label: "Косметика", href: "/" },
  { label: "Продукты", href: "/" },
  { label: "Аксессуары", href: "/" },
  { label: "Выгодно", href: "/" },
  { label: "Бренды", href: "/" },
  { label: "Товар дня", href: "/" },
];

function SiteHeader() {
  const { location } = useRouterState();
  const isWishlist = location.pathname === "/wishlist";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto w-full max-w-[1344px] px-4">
        <div className="flex h-16 items-center gap-3 md:gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-1 text-2xl font-bold text-brand">
            <span className="rounded-lg bg-brand px-2 py-1 text-brand-foreground">63</span>
            <span className="hidden sm:inline">pokupki</span>
          </Link>

          <Button
            variant="outline"
            size="sm"
            className="hidden shrink-0 items-center gap-2 md:inline-flex"
          >
            <Menu className="h-4 w-4" />
            Категории
          </Button>

          <div className="relative flex-1">
            <div className="absolute left-0 top-0 z-10 h-10">
              <Select defaultValue="favorites">
                <SelectTrigger
                  className="h-full gap-1 border-0 bg-transparent pl-3 pr-2 text-sm font-medium text-foreground hover:text-brand focus:ring-0 focus:ring-offset-0"
                  aria-label="Область поиска"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="favorites">Избранное</SelectItem>
                  <SelectItem value="site">По сайту</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              type="search"
              placeholder="Поиск"
              className="h-10 w-full pl-[120px] pr-10 md:max-w-md"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-brand p-1.5 text-brand-foreground"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex shrink-0 items-center gap-1 md:gap-3">
            <HeaderIcon label="Oksandra" icon={<User className="h-5 w-5" />} className="hidden lg:flex" />
            <HeaderIcon label="Заказы" icon={<Package className="h-5 w-5" />} badge="5" />
            <HeaderIcon
              label="Избранное"
              icon={<Heart className="h-5 w-5" />}
              active={isWishlist}
              href="/wishlist"
            />
            <HeaderIcon label="Корзина" icon={<ShoppingCart className="h-5 w-5" />} badge="6" />
          </nav>
        </div>

        <div className="hidden items-center gap-1 overflow-x-auto border-t border-border py-2 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={cn(
                "whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-colors hover:text-brand",
                link.label === "Избранное" && isWishlist
                  ? "text-brand"
                  : "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

function HeaderIcon({
  label,
  icon,
  badge,
  active,
  href,
  className,
}: {
  label: string;
  icon: React.ReactNode;
  badge?: string;
  active?: boolean;
  href?: string;
  className?: string;
}) {
  const content = (
    <div className={cn("relative flex flex-col items-center gap-0.5 px-2 py-1", className)}>
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-sale px-1 text-[10px] font-medium text-white">
            {badge}
          </span>
        )}
      </div>
      <span
        className={cn(
          "text-xs transition-colors",
          active ? "text-brand" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </div>
  );

  return href ? (
    <Link
      to={href}
      className={cn("rounded-lg transition-colors hover:bg-accent", active && "bg-brand-soft")}
    >
      {content}
    </Link>
  ) : (
    <button
      type="button"
      className={cn("rounded-lg transition-colors hover:bg-accent", active && "bg-brand-soft")}
    >
      {content}
    </button>
  );
}
