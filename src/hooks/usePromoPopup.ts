// src/hooks/usePromoPopup.ts
import { useEffect, useState } from "react";

export function usePromoPopup(delay = 8000, storageKey = "ymr_promo_shown") {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const shown = sessionStorage.getItem(storageKey);
      if (shown) return;
      const id = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem(storageKey, "1");
      }, delay);
      return () => clearTimeout(id);
    } catch {
      // se sessionStorage não disponível, só mostra uma vez por load
      const id = setTimeout(() => setOpen(true), delay);
      return () => clearTimeout(id);
    }
  }, [delay, storageKey]);

  return { open, close: () => setOpen(false), openManual: () => setOpen(true) };
}
