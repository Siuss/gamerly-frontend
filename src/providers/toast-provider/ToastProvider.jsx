import { createContext, useMemo, useState } from "react";

export const ToastContext = createContext(null);
export const ToastActionsContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const defaultToastDurationMs = 2000;

  const toastIsPresent = Boolean(toast);

  const hide = () => {
    setToast(null);
  };

  const show = (variant, text, duration = defaultToastDurationMs) => {
    setToast({ variant, text, duration });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actions = useMemo(() => ({ show, hide, toastIsPresent }), [toast]);

  return (
    <ToastActionsContext.Provider value={actions}>
      <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
    </ToastActionsContext.Provider>
  );
}
