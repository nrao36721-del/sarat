import { useState, type KeyboardEvent } from "react";

interface PINInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  onComplete?: () => void;
  error?: boolean;
}

export default function PINInput({
  value,
  onChange,
  length = 4,
  onComplete,
  error = false,
}: PINInputProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const digits = value.padEnd(length, " ").split("").slice(0, length);

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    const arr = value.padEnd(length, " ").split("");
    arr[index] = char;
    const newVal = arr.join("").trimEnd();
    onChange(newVal);
    if (char && index < length - 1) {
      setFocusedIndex(index + 1);
    }
    if (newVal.length === length && onComplete) {
      onComplete();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !digits[index].trim() && index > 0) {
      setFocusedIndex(index - 1);
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            if (i === focusedIndex && el) el.focus();
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d.trim()}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onFocus={() => setFocusedIndex(i)}
          className={`h-14 w-12 rounded-xl border-2 text-center text-2xl font-bold transition-colors ${
            error
              ? "border-red-400 bg-red-50 text-red-600"
              : d.trim()
              ? "border-saffron-500 bg-saffron-50 text-saffron-700"
              : "border-gray-200 bg-white text-saffron-700"
          } focus:border-saffron-600 focus:outline-none`}
        />
      ))}
    </div>
  );
}
