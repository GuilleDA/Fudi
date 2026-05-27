import Image from "next/image";
import Link from "next/link";
import DiscountBadge50 from "../../assets/discount_badge_50.svg";
import { CATEGORIES, findCategoryByLabel } from "../../lib/categories";
import {
  listRestaurantSummaries,
  listRestaurantsByCategory,
} from "../../lib/restaurants";
import { ChevronLeftIcon } from "../icons";
import { RestaurantCard } from "../RestaurantCard";
import { cx } from "../../lib/cx";
import styles from "./styles.module.scss";

type SearchPageProps = {
  category?: string;
};

export function SearchPage({ category }: SearchPageProps) {
  const resolvedCategory = category
    ? findCategoryByLabel(category)?.label
    : undefined;

  const restaurants = resolvedCategory
    ? listRestaurantsByCategory(resolvedCategory)
    : listRestaurantSummaries();

  const heading = resolvedCategory ?? "All restaurants";
  const count = restaurants.length;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Link href="/" aria-label="Back" className={styles.back}>
          <ChevronLeftIcon className={styles.backIcon} aria-hidden />
          <span>{heading}</span>
        </Link>
        <p className={styles.count}>
          {count} {count === 1 ? "restaurant" : "restaurants"}
        </p>
      </header>

      <nav className={styles.filters} aria-label="Filter by category">
        <Link
          href="/search"
          className={cx(styles.chip, !resolvedCategory && styles.chipActive)}
        >
          All
        </Link>
        {CATEGORIES.map((c) => {
          const isActive = resolvedCategory === c.label;
          return (
            <Link
              key={c.label}
              href={`/search?category=${encodeURIComponent(c.label)}`}
              className={cx(styles.chip, isActive && styles.chipActive)}
            >
              {c.icon ? (
                <Image
                  src={c.icon}
                  alt=""
                  className={styles.chipIcon}
                  aria-hidden
                />
              ) : (
                <span className={styles.chipEmoji} aria-hidden>
                  {c.emoji}
                </span>
              )}
              <span>{c.label}</span>
            </Link>
          );
        })}
      </nav>

      {count === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No restaurants found</p>
          <p className={styles.emptyText}>
            We couldn&apos;t find restaurants in this category. Try a different
            one.
          </p>
          <Link href="/search" className={styles.emptyCta}>
            See all restaurants
          </Link>
        </div>
      ) : (
        <ul className={styles.grid}>
          {restaurants.map((item) => (
            <li key={item.id}>
              <RestaurantCard
                name={item.name}
                time={item.deliveryTime}
                price={item.deliveryPrice}
                image={item.image}
                imageAlt={item.imageAlt}
                emoji={item.emoji}
                rating={item.rating}
                discountBadge={
                  item.hasDiscount
                    ? { src: DiscountBadge50, alt: "50% Off" }
                    : undefined
                }
                href={`/restaurant/${item.id}`}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
