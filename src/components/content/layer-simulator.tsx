"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";

import { cn } from "@/lib/utils";

type LayerKey = "ui" | "application" | "domain" | "infrastructure";

type SimulatorItem = {
  id: string;
  label: string;
  correctLayer: LayerKey;
};

type LayerConfig = {
  label: string;
  description: string;
  color: string;
  border: string;
  bg: string;
};

const LAYER_CONFIG: Record<LayerKey, LayerConfig> = {
  ui: {
    label: "UI / Presentation",
    description: "O que o usuário vê e interage",
    color: "text-blue-700 dark:text-blue-300",
    border: "border-blue-400/60",
    bg: "bg-blue-500/5",
  },
  application: {
    label: "Application",
    description: "Orquestra casos de uso",
    color: "text-purple-700 dark:text-purple-300",
    border: "border-purple-400/60",
    bg: "bg-purple-500/5",
  },
  domain: {
    label: "Domain",
    description: "Regras de negócio puras",
    color: "text-green-700 dark:text-green-300",
    border: "border-green-400/60",
    bg: "bg-green-500/5",
  },
  infrastructure: {
    label: "Infrastructure",
    description: "Banco de dados, APIs, I/O",
    color: "text-orange-700 dark:text-orange-300",
    border: "border-orange-400/60",
    bg: "bg-orange-500/5",
  },
};

const LAYER_ORDER: LayerKey[] = ["ui", "application", "domain", "infrastructure"];

type LayerSimulatorProps = {
  items: SimulatorItem[];
  title?: string;
};

type PlacedItems = Record<LayerKey, string[]>;
type CheckState = "idle" | "checked";

export function LayerSimulator({
  items,
  title = "Simulador de Camadas",
}: LayerSimulatorProps) {
  const [unplaced, setUnplaced] = useState<string[]>(
    () => items.map((i) => i.id),
  );
  const [placed, setPlaced] = useState<PlacedItems>({
    ui: [],
    application: [],
    domain: [],
    infrastructure: [],
  });
  const [checkState, setCheckState] = useState<CheckState>("idle");
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
  );

  const itemMap = Object.fromEntries(items.map((i) => [i.id, i]));

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
    setCheckState("idle");
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const draggedId = String(active.id);
    const targetLayer = over.id as LayerKey | "unplaced";

    // Remove de onde estava
    setUnplaced((prev) => prev.filter((id) => id !== draggedId));
    setPlaced((prev) => {
      const next = { ...prev };
      for (const layer of LAYER_ORDER) {
        next[layer] = next[layer].filter((id) => id !== draggedId);
      }
      return next;
    });

    // Adiciona ao destino
    if (targetLayer === "unplaced") {
      setUnplaced((prev) => [...prev, draggedId]);
    } else {
      setPlaced((prev) => ({
        ...prev,
        [targetLayer]: [...prev[targetLayer], draggedId],
      }));
    }
  }

  function reset() {
    setUnplaced(items.map((i) => i.id));
    setPlaced({ ui: [], application: [], domain: [], infrastructure: [] });
    setCheckState("idle");
  }

  function isCorrect(id: string, layer: LayerKey) {
    return itemMap[id]?.correctLayer === layer;
  }

  const activeItem = activeId ? itemMap[activeId] : null;
  const allPlaced = unplaced.length === 0;

  return (
    <div className="my-6 rounded-xl border border-border/60 bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <button
          type="button"
          onClick={reset}
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition"
        >
          Reiniciar
        </button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="p-4 space-y-4">
          {/* Itens não alocados */}
          <UnplacedZone ids={unplaced} itemMap={itemMap} />

          {/* Camadas */}
          <div className="grid gap-3 sm:grid-cols-2">
            {LAYER_ORDER.map((layer) => (
              <LayerZone
                key={layer}
                layer={layer}
                ids={placed[layer]}
                itemMap={itemMap}
                checkState={checkState}
                isCorrect={isCorrect}
              />
            ))}
          </div>

          {/* Ações */}
          <div className="flex items-center justify-end gap-3 pt-1">
            {checkState === "checked" && (
              <span className="text-xs text-muted-foreground">
                {LAYER_ORDER.reduce(
                  (acc, layer) =>
                    acc + placed[layer].filter((id) => isCorrect(id, layer)).length,
                  0,
                )}{" "}
                / {items.length} corretos
              </span>
            )}
            <button
              type="button"
              onClick={() => setCheckState("checked")}
              disabled={!allPlaced}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
            >
              Verificar
            </button>
          </div>
        </div>

        <DragOverlay>
          {activeItem && (
            <ItemChip label={activeItem.label} state="dragging" />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function UnplacedZone({
  ids,
  itemMap,
}: {
  ids: string[];
  itemMap: Record<string, SimulatorItem>;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "unplaced" });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-14 rounded-xl border-2 border-dashed p-3 transition",
        isOver ? "border-primary/60 bg-primary/5" : "border-border/50",
      )}
    >
      {ids.length === 0 ? (
        <p className="text-center text-xs text-muted-foreground/60">
          Arraste os itens para as camadas abaixo
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {ids.map((id) => (
            <DraggableItem key={id} id={id} label={itemMap[id]?.label ?? id} />
          ))}
        </div>
      )}
    </div>
  );
}

function LayerZone({
  layer,
  ids,
  itemMap,
  checkState,
  isCorrect,
}: {
  layer: LayerKey;
  ids: string[];
  itemMap: Record<string, SimulatorItem>;
  checkState: CheckState;
  isCorrect: (id: string, layer: LayerKey) => boolean;
}) {
  const config = LAYER_CONFIG[layer];
  const { setNodeRef, isOver } = useDroppable({ id: layer });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-24 rounded-xl border-2 p-3 transition",
        isOver
          ? "border-primary/60 bg-primary/5"
          : cn(config.border, config.bg),
      )}
    >
      <p className={cn("mb-2 text-xs font-bold", config.color)}>
        {config.label}
      </p>
      <p className="mb-2 text-xs text-muted-foreground/70">{config.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {ids.map((id) => (
          <DraggableItem
            key={id}
            id={id}
            label={itemMap[id]?.label ?? id}
            state={
              checkState === "checked"
                ? isCorrect(id, layer)
                  ? "correct"
                  : "wrong"
                : "idle"
            }
          />
        ))}
      </div>
    </div>
  );
}

function DraggableItem({ id, label, state = "idle" }: { id: string; label: string; state?: ItemChipState }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(isDragging && "opacity-30")}
    >
      <ItemChip label={label} state={state} />
    </div>
  );
}

type ItemChipState = "idle" | "correct" | "wrong" | "dragging";

function ItemChip({ label, state = "idle" }: { label: string; state?: ItemChipState }) {
  return (
    <span
      className={cn(
        "inline-block cursor-grab rounded-md border px-2.5 py-1 text-xs font-medium select-none transition active:cursor-grabbing",
        state === "idle" && "border-border/70 bg-card text-foreground hover:border-primary/40",
        state === "correct" && "border-green-500/60 bg-green-500/10 text-green-700 dark:text-green-400",
        state === "wrong" && "border-destructive/60 bg-destructive/10 text-destructive",
        state === "dragging" && "border-primary/60 bg-primary/10 text-primary shadow-lg",
      )}
    >
      {label}
    </span>
  );
}
