"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import CategoryAsian from "../../assets/category_asian.svg";
import CategoryBurger from "../../assets/category_burger.svg";
import CategoryDessert from "../../assets/category_dessert.svg";
import CategoryHealthy from "../../assets/category_healthy.svg";
import CategoryPizza from "../../assets/category_pizza.svg";
import styles from "./styles.module.scss";

type Category = {
  label: string;
  icon?: StaticImageData;
  emoji?: string;
};

type CategoriesProps = {
  items?: Category[];
  heading?: string;
};

const DEFAULT_ITEMS: Category[] = [
  { label: "Asian", icon: CategoryAsian },
  { label: "Pizza", icon: CategoryPizza },
  { label: "Burgers", icon: CategoryBurger },
  { label: "Healthy", icon: CategoryHealthy },
  { label: "Desserts", icon: CategoryDessert },
  { label: "Pasta", emoji: "🍝" },
  { label: "Sushi", emoji: "🍣" },
  { label: "Drinks", emoji: "🥤" },
  { label: "Coffee", emoji: "☕" },
];

export function Categories({
  items = DEFAULT_ITEMS,
  heading = "Categories",
}: CategoriesProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });
  const [isDragging, setIsDragging] = useState(false);

  function handlePointerDown(event: PointerEvent<HTMLUListElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const list = listRef.current;
    if (!list) return;

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: list.scrollLeft,
      hasMoved: false,
    };

    list.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLUListElement>) {
    const list = listRef.current;
    if (!list || !dragState.current.isDragging) return;

    const deltaX = event.clientX - dragState.current.startX;
    if (Math.abs(deltaX) > 3) {
      dragState.current.hasMoved = true;
    }

    list.scrollLeft = dragState.current.scrollLeft - deltaX;
  }

  function endDrag(event: PointerEvent<HTMLUListElement>) {
    const list = listRef.current;
    dragState.current.isDragging = false;

    if (list?.hasPointerCapture(event.pointerId)) {
      list.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
  }

  return (
    <nav className={styles.root}>
      <h2 className={styles.heading}>{heading}</h2>
      <ul
        ref={listRef}
        className={`${styles.list} ${isDragging ? styles.dragging : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(event) => {
          if (!dragState.current.hasMoved) return;

          event.preventDefault();
          event.stopPropagation();
          dragState.current.hasMoved = false;
        }}
      >
        {items.map((c) => (
          <li key={c.label} className={styles.item}>
            <button type="button" className={styles.button}>
              {c.icon ? (
                <Image
                  src={c.icon}
                  alt=""
                  className={styles.icon}
                  aria-hidden
                />
              ) : (
                <span className={styles.emoji} aria-hidden>
                  {c.emoji}
                </span>
              )}
              <span className={styles.label}>{c.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
