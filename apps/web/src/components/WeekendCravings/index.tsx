import type { StaticImageData } from "next/image";
import DiscountBadge50 from "../../assets/discount_badge_50.svg";
import DashiSushiImage from "../../assets/restaurant_dashiSushi.jpeg";
import KfcImage from "../../assets/restaurant_kfc.png";
import { RestaurantCard } from "../RestaurantCard";
import styles from "./styles.module.scss";

type Restaurant = {
  id: string;
  name: string;
  time: string;
  price: string;
  image?: StaticImageData;
  imageAlt?: string;
  emoji?: string;
  rating?: number;
  discountBadge?: { src: StaticImageData; alt: string };
};

type WeekendCravingsProps = {
  items?: Restaurant[];
  heading?: string;
  ctaLabel?: string;
};

const DEFAULT_ITEMS: Restaurant[] = [
  {
    id: "kfc",
    name: "KFC",
    time: "30/40 min",
    price: "$345",
    image: KfcImage,
    imageAlt: "KFC bucket with chicken",
    rating: 4.5,
    discountBadge: { src: DiscountBadge50, alt: "50% Off" },
  },
  {
    id: "dashi-sushi",
    name: "Dashi Sushi",
    time: "20/30 min",
    price: "Free",
    image: DashiSushiImage,
    imageAlt: "Assorted sushi pieces",
    rating: 4.7,
  },
  {
    id: "burger-bros",
    name: "Burger Bros",
    time: "25/35 min",
    price: "$280",
    emoji: "🍔",
    rating: 4.3,
  },
  {
    id: "tokyo-bowl",
    name: "Tokyo Bowl",
    time: "30/40 min",
    price: "$310",
    emoji: "🍜",
    rating: 4.4,
  },
  {
    id: "green-garden",
    name: "Green Garden",
    time: "20/30 min",
    price: "Free",
    emoji: "🥗",
    rating: 4.6,
  },
  {
    id: "sweet-spot",
    name: "Sweet Spot",
    time: "15/25 min",
    price: "$240",
    emoji: "🍦",
    rating: 4.8,
  },
  {
    id: "papa-johns",
    name: "Papa Johns",
    time: "35/45 min",
    price: "$420",
    emoji: "🍕",
    rating: 4.2,
  },
  {
    id: "bean-co",
    name: "Bean & Co",
    time: "10/20 min",
    price: "Free",
    emoji: "☕",
    rating: 4.5,
  },
];

export function WeekendCravings({
  items = DEFAULT_ITEMS,
  heading = "Weekend Cravings",
  ctaLabel = "See all",
}: WeekendCravingsProps) {
  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <button type="button" className={styles.cta}>
          {ctaLabel}
        </button>
      </div>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.id}>
            <RestaurantCard
              name={item.name}
              time={item.time}
              price={item.price}
              image={item.image}
              imageAlt={item.imageAlt}
              emoji={item.emoji}
              rating={item.rating}
              discountBadge={item.discountBadge}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
