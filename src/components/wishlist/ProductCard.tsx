import { Heart, ShoppingCart, Star, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WishlistItem } from "@/data/wishlist";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value) + " ₽";

type Props = {
  item: WishlistItem;
  onRemove?: (id: string) => void;
};

export function ProductCard({ item, onRemove }: Props) {
  const unavailable = item.status === "out_of_stock";

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl bg-card transition-shadow hover:shadow-[var(--shadow-card)]",
        unavailable && "opacity-70",
      )}
    >
      <div className="relative overflow-hidden rounded-xl bg-muted">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          width={768}
          height={1024}
          className={cn(
            "aspect-[3/4] w-full object-cover",
            unavailable && "grayscale",
          )}
        />

        {item.size && (
          <span className="absolute left-2 top-2 rounded-lg bg-card/95 px-2.5 py-1 text-sm font-semibold text-foreground shadow-sm">
            {item.size}
          </span>
        )}

        <button
          type="button"
          aria-label="Удалить из избранного"
          onClick={() => onRemove?.(item.id)}
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-card/95 text-brand shadow-sm transition-colors hover:text-destructive"
        >
          <Heart className="h-4 w-4 fill-current" />
        </button>

        {unavailable && (
          <span className="absolute inset-x-2 bottom-2 rounded-lg bg-card/90 py-1.5 text-center text-xs font-medium text-muted-foreground">
            Нет в наличии
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 px-1 pb-1 pt-3">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "text-lg font-bold",
              unavailable ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {formatPrice(item.price)}
          </span>
          {item.oldPrice && (
            <span className="text-xs text-sale line-through">
              {formatPrice(item.oldPrice)}
            </span>
          )}
          <Info className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </div>

        <h3 className="line-clamp-2 text-sm text-foreground/90">{item.title}</h3>

        {item.rating && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-rating text-rating" />
            <span className="font-medium text-foreground">{item.rating}</span>
            <span>· {item.reviews} отзыва</span>
          </div>
        )}

        <div className="mt-auto pt-2.5">
          {item.status === "available" && (
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover"
            >
              <ShoppingCart className="h-4 w-4" />
              {item.delivery}
            </button>
          )}

          {item.status === "size_unavailable" && (
            <button
              type="button"
              className="w-full rounded-lg border border-brand bg-card px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand-soft"
            >
              Другие варианты
            </button>
          )}

          {unavailable && (
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-lg bg-muted px-3 py-2 text-sm font-medium text-muted-foreground"
            >
              Нет в наличии
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
