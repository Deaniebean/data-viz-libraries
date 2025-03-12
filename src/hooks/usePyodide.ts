import { useEffect, useState } from "react";

export function usePyodide() {
  const [pyodide, setPyodide] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPyodide() {
      try {
        const pyodideInstance = await (window as any).loadPyodide();
        await pyodideInstance.loadPackage(["matplotlib", "numpy"]);
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error("Failed to load Pyodide:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPyodide();
  }, []);

  return { pyodide, loading };
}
