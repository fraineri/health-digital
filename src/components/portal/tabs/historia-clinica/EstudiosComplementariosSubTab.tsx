"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Plus } from "lucide-react";
import { StudyEntry } from "@/domain/ayurveda/study-catalog";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatShortDate(date: Date): string {
  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

// ---------------------------------------------------------------------------
// StudyCombobox
// ---------------------------------------------------------------------------

interface StudyComboboxProps {
  value: string;
  catalog: string[];
  onChange: (name: string) => void;
  autoFocus?: boolean;
}

function StudyCombobox({ value, catalog, onChange, autoFocus }: StudyComboboxProps) {
  const [inputValue, setInputValue] = useState(value);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external value changes (e.g. reset)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Close on click-outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus on mount when requested
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const filtered = catalog.filter((name) =>
    name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const hasExactMatch = catalog.some(
    (name) => name.toLowerCase() === inputValue.toLowerCase()
  );

  const options: Array<{ label: string; value: string; isCreate?: boolean }> = [
    ...filtered.map((name) => ({ label: name, value: name })),
    ...(inputValue.trim() && !hasExactMatch
      ? [{ label: `Crear: "${inputValue.trim()}"`, value: inputValue.trim(), isCreate: true }]
      : []),
  ];

  const selectOption = useCallback(
    (val: string) => {
      setInputValue(val);
      onChange(val);
      setOpen(false);
      setHighlightedIndex(-1);
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setOpen(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && options[highlightedIndex]) {
          selectOption(options[highlightedIndex].value);
        } else if (inputValue.trim()) {
          selectOption(inputValue.trim());
        }
        break;
      case "Escape":
        setOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        placeholder="Nombre del estudio…"
        className="bg-stone-50/50 border border-border/40 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none w-full transition-colors"
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange(e.target.value);
          setOpen(true);
          setHighlightedIndex(0);
        }}
        onFocus={() => {
          if (catalog.length > 0) setOpen(true);
        }}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {open && options.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-border/40 rounded-xl shadow-lg overflow-hidden max-h-52 overflow-y-auto">
          {options.map((opt, idx) => (
            <button
              key={opt.value + idx}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                selectOption(opt.value);
              }}
              onMouseEnter={() => setHighlightedIndex(idx)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                idx === highlightedIndex
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-slate-700 hover:bg-stone-50"
              } ${opt.isCreate ? "italic text-slate-500 border-t border-border/20" : ""}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// StudyRow
// ---------------------------------------------------------------------------

interface StudyRowProps {
  entry: StudyEntry;
  catalog: string[];
  onChange: (updated: StudyEntry) => void;
  onRemove: () => void;
  autoFocusName?: boolean;
}

function StudyRow({ entry, catalog, onChange, onRemove, autoFocusName }: StudyRowProps) {
  return (
    <div className="py-4">
      <div className="grid grid-cols-[1fr_1fr_auto] gap-4 items-center">
        {/* Study Name Combobox */}
        <StudyCombobox
          value={entry.studyName}
          catalog={catalog}
          onChange={(name) => onChange({ ...entry, studyName: name })}
          autoFocus={autoFocusName}
        />

        {/* Value Input */}
        <input
          type="text"
          value={entry.value}
          placeholder="Resultado…"
          className="bg-stone-50/50 border border-border/40 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none w-full transition-colors"
          onChange={(e) => onChange({ ...entry, value: e.target.value })}
        />

        {/* Delete Button */}
        <button
          type="button"
          onClick={onRemove}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors"
          aria-label="Eliminar estudio"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Previous Value Reference */}
      {entry.previousValue !== undefined && (
        <p className="mt-1.5 pl-1 text-xs text-slate-400 font-mono">
          Anterior:{" "}
          <span className="text-slate-500">{entry.previousValue || "—"}</span>
          {entry.previousDate && (
            <span className="text-slate-400"> · {formatShortDate(entry.previousDate)}</span>
          )}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EstudiosComplementariosSubTab
// ---------------------------------------------------------------------------

interface EstudiosComplementariosSubTabProps {
  studies: StudyEntry[];
  onStudiesChange: (studies: StudyEntry[]) => void;
  studyCatalog: string[];
}

export function EstudiosComplementariosSubTab({
  studies,
  onStudiesChange,
  studyCatalog,
}: EstudiosComplementariosSubTabProps) {
  const handleAddStudy = () => {
    onStudiesChange([
      ...studies,
      {
        id: crypto.randomUUID(),
        studyName: "",
        value: "",
        isNew: true,
      },
    ]);
  };

  const handleUpdateStudy = (id: string, updated: StudyEntry) => {
    onStudiesChange(studies.map((s) => (s.id === id ? updated : s)));
  };

  const handleRemoveStudy = (id: string) => {
    onStudiesChange(studies.filter((s) => s.id !== id));
  };

  return (
    <div className="h-full overflow-y-auto pb-40 custom-scrollbar">
      <div className="w-full max-w-4xl mx-auto p-10">
        <div className="bg-white rounded-3xl border border-border/40 shadow-sm p-10 animate-subtab-in">

          {/* Section Header */}
          <p className="text-xs font-extrabold tracking-[0.15em] text-slate-400 uppercase mb-8">
            Estudios Registrados
          </p>

          {/* Column Headers */}
          <div className="grid grid-cols-[1fr_1fr_auto] gap-4 mb-1 px-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Nombre del Estudio
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Valor Actual
            </span>
            <span className="w-8" />
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/20">
            {studies.map((entry, index) => (
              <StudyRow
                key={entry.id}
                entry={entry}
                catalog={studyCatalog}
                onChange={(updated) => handleUpdateStudy(entry.id, updated)}
                onRemove={() => handleRemoveStudy(entry.id)}
                autoFocusName={entry.isNew && index === studies.length - 1}
              />
            ))}
          </div>

          {/* Empty State */}
          {studies.length === 0 && (
            <div className="text-center py-10 text-slate-300">
              <p className="text-sm font-medium">
                No hay estudios registrados para este paciente.
              </p>
              <p className="text-xs mt-1">
                Agregue el primero usando el botón de abajo.
              </p>
            </div>
          )}

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAddStudy}
            className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary hover:bg-primary/5 px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar Estudio
          </button>

        </div>
      </div>
    </div>
  );
}
