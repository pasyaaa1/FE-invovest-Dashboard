import { useEffect, useState } from "react";

export type SelectOption = { value: string; label: string };

const defaultEventOptions: SelectOption[] = [
  { value: "Workshop", label: "Workshop" },
  { value: "Seminar", label: "Seminar" },
  { value: "IT Competition", label: "IT Competition" },
];

interface InputSelectEventProps {
  label: string;
  nama: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  error?: string;
  placeholder?: string;
  defaultValue?: string;
  options?: SelectOption[];
  loading?: boolean;
  emptyMessage?: string;
}

const InputSelectEvent: React.FC<InputSelectEventProps> = ({
  label,
  nama,
  register,
  setValue,
  error,
  placeholder = "-- Pilih --",
  defaultValue,
  options,
  loading = false,
  emptyMessage = "Data belum tersedia",
}) => {
  const items = options ?? defaultEventOptions;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(defaultValue ?? null);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setSelected(defaultValue || null);
      setValue(nama, defaultValue ?? "");
    }
  }, [defaultValue, nama, setValue]);

  const handleSelect = (value: string) => {
    setSelected(value);
    setValue(nama, value);
    setOpen(false);
  };

  const selectedLabel =
    items.find((o) => o.value === selected)?.label ?? selected;

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input type="hidden" {...register(nama)} />

      <button
        type="button"
        disabled={loading || items.length === 0}
        onClick={() => setOpen(!open)}
        className={`border px-3 py-2.5 rounded-2xl bg-white text-left flex justify-between items-center text-sm transition-all
            hover:border-gray-400 disabled:opacity-60 disabled:cursor-not-allowed
            ${open ? "border-red-500 ring-2 ring-red-100" : ""}
            ${error ? "border-red-400 bg-red-50" : "border-gray-200"}
        `}
      >
        <span className={selected ? "text-gray-800" : "text-gray-400"}>
          {loading
            ? "Memuat..."
            : items.length === 0
              ? emptyMessage
              : (selectedLabel ?? placeholder)}
        </span>
        <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {open && items.length > 0 && (
        <div className="border border-gray-200 rounded-2xl bg-white shadow-lg overflow-hidden z-10 max-h-48 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleSelect(item.value)}
              className={`w-full text-left px-4 py-3 text-sm transition-colors
                        hover:bg-[#7B1D3F] hover:text-white
                        ${selected === item.value ? "bg-[#7B1D3F] text-white font-medium" : "text-gray-700"}
                    `}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-red-600 text-xs mt-0.5">{error}</p>}
    </div>
  );
};

export default InputSelectEvent;
