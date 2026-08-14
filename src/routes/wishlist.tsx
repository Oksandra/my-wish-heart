import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Store, ArrowUpDown } from "lucide-react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/wishlist/ProductCard";
import { wishlistItems as initialItems } from "@/data/wishlist";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortValues = [
  "newest",
  "oldest",
  "price_asc",
  "price_desc",
  "in_stock",
] as const;

const wishlistSearchSchema = z.object({
  sort: fallback(z.enum(sortValues), "newest").default("newest"),
});

export const Route = createFileRoute("/wishlist")({
  validateSearch: zodValidator(wishlistSearchSchema),
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

const sortLabels: Record<(typeof sortValues)[number], string> = {
  newest: "Новые",
  oldest: "Старые",
  price_asc: "По возрастанию цены",
  price_desc: "По убыванию цены",
  in_stock: "Сначала в наличии",
};

const statusOrder: Record<string, number> = {
  available: 0,
  size_unavailable: 1,
  out_of_stock: 2,
};

function WishlistPage() {
  const [tab, setTab] = useState<Tab>("items");
  const [items, setItems] = useState(initialItems);
  const { sort } = useSearch({ from: "/wishlist" });
  const navigate = useNavigate({ from: "/wishlist" });

  const sorted = useMemo(() => {
    const list = [...items];
    switch (sort) {
      case "newest":
        return list.sort((a, b) => +new Date(b.addedAt) - +new Date(a.addedAt));
      case "oldest":
        return list.sort((a, b) => +new Date(a.addedAt) - +new Date(b.addedAt));
      case "price_asc":
        return list.sort((a, b) => a.price - b.price);
      case "price_desc":
        return list.sort((a, b) => b.price - a.price);
      case "in_stock":
        return list.sort(
          (a, b) =>
            (statusOrder[a.status] ?? 2) - (statusOrder[b.status] ?? 2) ||
            +new Date(b.addedAt) - +new Date(a.addedAt),
        );
      default:
        return list;
    }
  }, [items, sort]);

  return (
    <main className="min-h-screen bg-background py-4 md:py-8">
      <div className="mx-auto w-full max-w-[1344px] px-4">
        <h1 className="hidden text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:block">
          Избранное
        </h1>

        <div
          role="tablist"
          aria-label="Разделы избранного"
          className="mt-3 flex gap-6 border-b border-border md:mt-5"
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
          <>
            <div className="mt-4 flex items-start">
              <Select
                value={sort}
                onValueChange={(value) =>
                  navigate({
                    search: (prev) => ({ ...prev, sort: value as (typeof sortValues)[number] }),
                  })
                }
              >
                <SelectTrigger className="w-[230px]" aria-label="Сортировка товаров">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortValues.map((value) => (
                    <SelectItem key={value} value={value}>
                      {sortLabels[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {sorted.length ? (
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
            )}
          </>
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
