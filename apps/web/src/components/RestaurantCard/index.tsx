import Image, { type StaticImageData } from "next/image";
import { ClockIcon, ScooterIcon, StarIcon } from "../icons";
import styles from "./styles.module.scss";

type DiscountBadge = {
  src: StaticImageData;
  alt: string;
};

type RestaurantCardProps = {
  name: string;
  time: string;
  price: string;
  image?: StaticImageData;
  imageAlt?: string;
  emoji?: string;
  rating?: number;
  discountBadge?: DiscountBadge;
  onClick?: () => void;
};

export function RestaurantCard({
  name,
  time,
  price,
  image,
  imageAlt,
  emoji,
  rating,
  discountBadge,
  onClick,
}: RestaurantCardProps) {
  return (
    <button type="button" className={styles.root} onClick={onClick}>
      <div className={styles.media}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? name}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} aria-hidden>
            {emoji}
          </div>
        )}

        {discountBadge && (
          <Image
            src={discountBadge.src}
            alt={discountBadge.alt}
            className={styles.discount}
          />
        )}

        {typeof rating === "number" && (
          <span className={styles.rating}>
            <StarIcon className={styles.starIcon} aria-hidden />
            {rating.toFixed(1)}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.name}>{name}</p>
        <p className={styles.meta}>
          <span className={styles.metaItem}>
            <ClockIcon className={styles.metaIcon} aria-hidden />
            {time}
          </span>
          <span className={styles.metaDot} aria-hidden>
            •
          </span>
          <span className={styles.metaItem}>
            <ScooterIcon className={styles.metaIcon} aria-hidden />
            {price}
          </span>
        </p>
      </div>
    </button>
  );
}
