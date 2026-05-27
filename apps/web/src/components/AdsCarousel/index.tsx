import Image, { type StaticImageData } from "next/image";
import BrazilianFlavourOffer from "../../assets/offer_brazilianFlavour.webp";
import KfcOffer from "../../assets/offer_kfc.jpg";
import PapaJohnsOffer from "../../assets/offer_papajohns.jpg";
import styles from "./styles.module.scss";

type Ad = {
  id: string;
  image: StaticImageData;
  alt: string;
};

type AdsCarouselProps = {
  ads?: Ad[];
  heading?: string;
};

const DEFAULT_ADS: Ad[] = [
  {
    id: "papajohns",
    image: PapaJohnsOffer,
    alt: "Papa Johns Better Ingredients Better Pizza offer",
  },
  {
    id: "kfc",
    image: KfcOffer,
    alt: "KFC Hot and Spicy offer",
  },
  {
    id: "brazilian-flavour",
    image: BrazilianFlavourOffer,
    alt: "Brazilian Flavour offer",
  },
];

export function AdsCarousel({
  ads = DEFAULT_ADS,
  heading = "Featured Deals",
}: AdsCarouselProps) {
  return (
    <section className={styles.root}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.list}>
        {ads.map((ad, index) => (
          <article key={ad.id} className={styles.card}>
            <Image
              src={ad.image}
              alt={ad.alt}
              className={styles.image}
              priority={index === 0}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
