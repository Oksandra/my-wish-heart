import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/wishlist/ProductCard";
import { wishlistItems as initialItems } from "@/data/wishlist";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Избранное — сохранённые товары и поставщики" },
      {
        name: "description",
        content:
          "Ваши избранные товары и поставщики: цены, размеры, сроки доставки и наличие в одном списке.",
      },
      { property: "og:title", content: "Избранное — сохранённые товары и поставщики" },
      {
        property: "og:description",
        content:
          "Ваши избранные товары и поставщики: цены, размеры, сроки доставки и наличие в одном списке.",
      },
    ],
  }),
  component: WishlistPage,
});

type Tab = "items" | "suppliers";

function WishlistPage() {
  const [tab, setTab] = useState<Tab>("items");
  const [items, setItems] = useState(initialItems);

  const sorted = useMemo(
    () => [...items].sort((a, b) => +new Date(b.addedAt) - +new Date(a.addedAt)),
    [items],
  );

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto w-full max-w-[1344px] px-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Избранное
        </h1>

        <div
          role="tablist"
          aria-label="Разделы избранного"
          className="mt-5 flex gap-6 border-b border-border"
        >
          <TabButton active={tab === "items"} onClick={() => setTab("items")}>
            <Heart className="h-4 w-4" />
            Избранное
            <span className="text-muted-foreground">{items.length}</span>
          </TabButton>
          <TabButton active={tab === "suppliers"} onClick={() => setTab("suppliers")}>
            <Store className="h-4 w-4" />
            Избранные поставщики
          </TabButton>
        </div>

        {tab === "items" ? (
          sorted.length ? (
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {sorted.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onRemove={(id) => setItems((prev) => prev.filter((i) => i.id !== id))}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Heart className="h-7 w-7" />}
              title="В избранном пока пусто"
              text="Нажимайте на сердечко у товара, чтобы вернуться к нему позже."
            />
          )
        ) : (
          <EmptyState
            icon={<Store className="h-7 w-7" />}
            title="Избранных поставщиков нет"
            text="Здесь появятся поставщики, которых вы добавите в избранное."
          />
        )}
      </div>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "-mb-px flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition-colors",
        active
          ? "border-brand text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function EmptyState({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="mt-16 flex flex-col items-center text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-muted text-muted-foreground">
        {icon}
      </div>
      <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
