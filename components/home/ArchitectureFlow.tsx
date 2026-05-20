"use client";

import { Fragment, useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { ArrowDown, ArrowRight, RotateCcw } from "lucide-react";

import { architectureFlow } from "@/lib/data";

const desktopPositions = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-5 lg:row-start-1",
  "lg:col-start-9 lg:row-start-1",
  "lg:col-start-9 lg:row-start-2",
  "lg:col-start-5 lg:row-start-2",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-5 lg:row-start-3"
];

const layerLabels = [
  "Giriş katmanı",
  "Algılama modeli",
  "Skor kalibrasyonu",
  "Tespit temizleme",
  "Takip kimliği",
  "Karar stabilizasyonu",
  "Operatör ve alarm"
];

const ropeLinks = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 }
] as const;

type Side = "left" | "right" | "top" | "bottom";

type CardRect = {
  height: number;
  left: number;
  top: number;
  width: number;
};

type Point = {
  x: number;
  y: number;
};

type DragOffsets = Record<number, Point>;

type ArchitectureStepCardProps = {
  description: string;
  index: number;
  isActive: boolean;
  onActivate: (index: number | null) => void;
  onDragMove: (index: number, offset: Point) => void;
  onDragRelease: (index: number) => void;
  positionClass: string;
  setCardRef: (index: number, node: HTMLButtonElement | null) => void;
  title: string;
};

function getAnchor(rect: CardRect, side: Side, offset: Point = { x: 0, y: 0 }) {
  const left = rect.left + offset.x;
  const top = rect.top + offset.y;

  if (side === "left") {
    return { x: left, y: top + rect.height / 2 };
  }

  if (side === "right") {
    return { x: left + rect.width, y: top + rect.height / 2 };
  }

  if (side === "top") {
    return { x: left + rect.width / 2, y: top };
  }

  return { x: left + rect.width / 2, y: top + rect.height };
}

function getRopePath(start: Point, end: Point, fromSide: Side, toSide: Side) {
  const horizontal = fromSide === "left" || fromSide === "right";
  const direction = start.x <= end.x ? 1 : -1;

  if (horizontal && (toSide === "left" || toSide === "right")) {
    const tension = Math.max(44, Math.abs(end.x - start.x) * 0.42);
    return `M ${start.x} ${start.y} C ${start.x + tension * direction} ${start.y}, ${end.x - tension * direction} ${end.y}, ${end.x} ${end.y}`;
  }

  if (fromSide === "bottom" && toSide === "top") {
    const tension = Math.max(42, Math.abs(end.y - start.y) * 0.52);
    return `M ${start.x} ${start.y} C ${start.x} ${start.y + tension}, ${end.x} ${end.y - tension}, ${end.x} ${end.y}`;
  }

  const verticalPull = Math.max(58, Math.abs(end.y - start.y) * 0.44);
  const horizontalPull = Math.max(72, Math.abs(end.x - start.x) * 0.36);

  return `M ${start.x} ${start.y} C ${start.x} ${start.y + verticalPull}, ${end.x - horizontalPull} ${end.y}, ${end.x} ${end.y}`;
}

function getLinkSides(fromRect: CardRect, toRect: CardRect) {
  const fromCenter = {
    x: fromRect.left + fromRect.width / 2,
    y: fromRect.top + fromRect.height / 2
  };
  const toCenter = {
    x: toRect.left + toRect.width / 2,
    y: toRect.top + toRect.height / 2
  };
  const deltaX = toCenter.x - fromCenter.x;
  const deltaY = toCenter.y - fromCenter.y;

  if (Math.abs(deltaY) > 90) {
    return deltaY > 0
      ? ({ fromSide: "bottom", toSide: "top" } as const)
      : ({ fromSide: "top", toSide: "bottom" } as const);
  }

  return deltaX > 0
    ? ({ fromSide: "right", toSide: "left" } as const)
    : ({ fromSide: "left", toSide: "right" } as const);
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function ArchitectureStepCard({
  description,
  index,
  isActive,
  onActivate,
  onDragMove,
  onDragRelease,
  positionClass,
  setCardRef,
  title
}: ArchitectureStepCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const wasDragging = useRef(false);

  return (
    <motion.button
      ref={(node) => setCardRef(index, node)}
      type="button"
      drag
      dragMomentum={false}
      dragSnapToOrigin
      dragElastic={0.32}
      whileHover={{ y: -8 }}
      whileDrag={{ scale: 1.04, zIndex: 30 }}
      onHoverStart={() => onActivate(index)}
      onHoverEnd={() => onActivate(null)}
      onDragStart={() => {
        wasDragging.current = true;
        onActivate(index);
        onDragMove(index, { x: 0, y: 0 });
      }}
      onDrag={(_, info: PanInfo) => {
        onDragMove(index, info.offset);
      }}
      onDragEnd={() => {
        onActivate(null);
        onDragRelease(index);
        window.setTimeout(() => {
          wasDragging.current = false;
        }, 320);
      }}
      onClick={() => {
        if (wasDragging.current) {
          return;
        }

        setIsFlipped((current) => !current);
      }}
      className={`group relative min-h-[270px] w-full touch-none text-left outline-none [perspective:1200px] lg:col-span-4 ${positionClass}`}
      aria-label={`${title} mimari katmanı`}
      aria-pressed={isFlipped}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="relative h-full min-h-[270px] w-full rounded-brand [transform-style:preserve-3d]"
      >
        <div
          className={`absolute inset-0 flex flex-col justify-between rounded-brand border bg-white p-6 shadow-[0_28px_80px_rgba(20,20,19,0.09)] transition-colors duration-300 [backface-visibility:hidden] ${
            isActive ? "border-accent-primary" : "border-neutral-border"
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-accent-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <RotateCcw
                aria-hidden="true"
                className="h-4 w-4 text-slate-light opacity-45 transition-opacity group-hover:opacity-100"
              />
            </div>
            <h3 className="mt-8 font-sans text-2xl font-black leading-tight text-slate-dark sm:text-[1.7rem]">
              {title}
            </h3>
          </div>
          <p className="font-sans text-sm font-semibold leading-5 text-slate-light">
            {layerLabels[index]}
          </p>
        </div>

        <div className="absolute inset-0 flex flex-col rounded-brand border border-accent-primary bg-[#141413] p-6 text-[#faf9f5] shadow-[0_28px_80px_rgba(20,20,19,0.18)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <span className="font-mono text-sm font-bold text-[#d97757]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-sans text-xl font-black leading-tight text-white">
              {title}
            </h3>
          </div>
          <p className="mt-4 overflow-y-auto pr-1 font-sans text-[0.86rem] font-medium leading-[1.45] text-white/76">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

export function ArchitectureFlow() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [cardRects, setCardRects] = useState<CardRect[]>([]);
  const [boardSize, setBoardSize] = useState({ height: 0, width: 0 });
  const [dragOffsets, setDragOffsets] = useState<DragOffsets>({});
  const boardRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dragOffsetsRef = useRef<DragOffsets>({});
  const returnAnimationsRef = useRef<Record<number, number>>({});

  const setCardRef = useCallback((index: number, node: HTMLButtonElement | null) => {
    cardRefs.current[index] = node;
  }, []);

  const measureCards = useCallback(() => {
    const board = boardRef.current;

    if (!board) {
      return;
    }

    const boardRect = board.getBoundingClientRect();
    const nextRects = cardRefs.current.map((card) => {
      if (!card) {
        return null;
      }

      const cardRect = card.getBoundingClientRect();

      return {
        height: cardRect.height,
        left: cardRect.left - boardRect.left,
        top: cardRect.top - boardRect.top,
        width: cardRect.width
      };
    });

    if (nextRects.some((rect) => rect === null)) {
      return;
    }

    setBoardSize({ height: boardRect.height, width: boardRect.width });
    setCardRects(nextRects as CardRect[]);
  }, []);

  useLayoutEffect(() => {
    measureCards();

    const board = boardRef.current;

    if (!board) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(measureCards);
    resizeObserver.observe(board);
    cardRefs.current.forEach((card) => {
      if (card) {
        resizeObserver.observe(card);
      }
    });

    window.addEventListener("resize", measureCards);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureCards);
    };
  }, [measureCards]);

  const onDragMove = useCallback((index: number, offset: Point) => {
    const activeAnimation = returnAnimationsRef.current[index];

    if (activeAnimation) {
      window.cancelAnimationFrame(activeAnimation);
      delete returnAnimationsRef.current[index];
    }

    dragOffsetsRef.current = {
      ...dragOffsetsRef.current,
      [index]: offset
    };
    setDragOffsets((current) => ({
      ...current,
      [index]: offset
    }));
  }, []);

  const onDragRelease = useCallback((index: number) => {
    const startOffset = dragOffsetsRef.current[index] ?? { x: 0, y: 0 };
    const startedAt = performance.now();
    const duration = 460;

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const nextOffset = {
        x: startOffset.x * (1 - easedProgress),
        y: startOffset.y * (1 - easedProgress)
      };

      dragOffsetsRef.current = {
        ...dragOffsetsRef.current,
        [index]: nextOffset
      };
      setDragOffsets((current) => ({
        ...current,
        [index]: nextOffset
      }));

      if (progress < 1) {
        returnAnimationsRef.current[index] = window.requestAnimationFrame(step);
        return;
      }

      delete returnAnimationsRef.current[index];
      dragOffsetsRef.current = {
        ...dragOffsetsRef.current,
        [index]: { x: 0, y: 0 }
      };
      setDragOffsets((current) => ({
        ...current,
        [index]: { x: 0, y: 0 }
      }));
    };

    const activeAnimation = returnAnimationsRef.current[index];

    if (activeAnimation) {
      window.cancelAnimationFrame(activeAnimation);
    }

    returnAnimationsRef.current[index] = window.requestAnimationFrame(step);
  }, []);

  return (
    <div className="mt-14">
      <div className="relative overflow-hidden rounded-brand border border-neutral-border bg-[#fbfaf7] p-5 shadow-[0_28px_90px_rgba(20,20,19,0.05)] sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,87,0.12),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(116,196,118,0.12),transparent_32%)]"
        />

        <div className="relative z-10 mb-6 hidden items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-accent-primary/70 lg:flex">
          <ArrowRight className="h-4 w-4" />
          Esnek karar hattı
        </div>

        <div ref={boardRef} className="relative z-10">
          {boardSize.width > 0 && cardRects.length === architectureFlow.length ? (
            <svg
              aria-hidden="true"
              viewBox={`0 0 ${boardSize.width} ${boardSize.height}`}
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            >
              {ropeLinks.map((link, index) => {
                const fromOffset = dragOffsets[link.from] ?? { x: 0, y: 0 };
                const toOffset = dragOffsets[link.to] ?? { x: 0, y: 0 };
                const { fromSide, toSide } = getLinkSides(
                  cardRects[link.from],
                  cardRects[link.to]
                );
                const start = getAnchor(
                  cardRects[link.from],
                  fromSide,
                  fromOffset
                );
                const end = getAnchor(cardRects[link.to], toSide, toOffset);
                const path = getRopePath(start, end, fromSide, toSide);
                const isLit = activeIndex === link.from || activeIndex === link.to;

                return (
                  <g key={`${link.from}-${link.to}`}>
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="rgba(20,20,19,0.09)"
                      strokeLinecap="round"
                      strokeWidth={7}
                    />
                    <motion.path
                      d={path}
                      fill="none"
                      stroke={isLit ? "rgba(198,97,63,0.92)" : "rgba(198,97,63,0.48)"}
                      strokeLinecap="round"
                      strokeWidth={isLit ? 3.2 : 2.2}
                      animate={{
                        pathLength: isLit ? [0.9, 1, 0.9] : 1
                      }}
                      transition={{
                        duration: isLit ? 1.2 : 0.2,
                        ease: "easeInOut",
                        repeat: isLit ? Infinity : 0
                      }}
                    />
                  </g>
                );
              })}
            </svg>
          ) : null}

          <div className="relative z-10 grid gap-5 lg:grid-cols-12 lg:grid-rows-3 lg:gap-x-10 lg:gap-y-8">
            {architectureFlow.map((step, index) => (
              <Fragment key={step.title}>
                <ArchitectureStepCard
                  index={index}
                  title={step.title}
                  description={step.description}
                  positionClass={desktopPositions[index]}
                  isActive={activeIndex === index}
                  onActivate={setActiveIndex}
                  onDragMove={onDragMove}
                  onDragRelease={onDragRelease}
                  setCardRef={setCardRef}
                />
                {index < architectureFlow.length - 1 ? (
                  <div className="mx-auto flex h-9 items-center justify-center lg:hidden">
                    <span className="block h-full w-px bg-[linear-gradient(180deg,rgba(198,97,63,0.15),rgba(198,97,63,0.95),rgba(198,97,63,0.15))]" />
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-accent-primary/70 lg:hidden">
          <ArrowDown className="h-4 w-4" />
          Mobil akış
        </div>
      </div>
    </div>
  );
}
