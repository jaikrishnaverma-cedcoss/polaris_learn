import { Toast } from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";

export function useSnackbar() {
  const [active, setActive] = useState(false);

  const enqueueSnackbar = useCallback((message) => setActive(message), []);
  const closeToast = useCallback(() => setActive(false), []);
  useEffect(() => {
   let interval =null
   clearTimeout(interval);
    if (active != false) {
      interval= setTimeout(() => {
        closeToast();
      }, 2500);
    }
  }, [active]);
  const SnackBar = (
    <div>
      {active ? (
        <Toast
          error={active.split(":").length - 1}
          content={active ? active.split(":")[0] : ""}
          onDismiss={closeToast}
        />
      ) : null}
    </div>
  );
  return { enqueueSnackbar, SnackBar };
}
