import { useState, useRef } from "react";
import { usePyodide } from "../../hooks/usePyodide";

export default function PyodideChart() {
  const { pyodide, loading } = usePyodide();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  async function generateChart() {
    if (!pyodide) return;

    const code = `
import matplotlib.pyplot as plt
import numpy as np
import io
import base64

# Generate data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create figure
fig, ax = plt.subplots()
ax.plot(x, y, label='Sine Wave')
ax.set_title("Matplotlib Line Chart in Pyodide")
ax.legend()

# Save to a bytes buffer
buf = io.BytesIO()
fig.savefig(buf, format="png")
buf.seek(0)

# Convert to base64
encoded = base64.b64encode(buf.read()).decode("utf-8")
encoded
`;

    try {
      const result = pyodide.runPython(code);
      setImageSrc(`data:image/png;base64,${result}`);
    } catch (error) {
      console.error("Python error:", error);
      setImageSrc(null);
    }
  }

  return (
    <div>
      <h2>Matplotlib in Pyodide (React)</h2>
      {loading ? (
        <p>Loading Pyodide...</p>
      ) : (
        <>
          <button onClick={generateChart}>Generate Chart</button>
          {imageSrc && <img src={imageSrc} alt="Generated Matplotlib Chart" />}
        </>
      )}
    </div>
  );
}
