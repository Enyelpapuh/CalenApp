import React from "react";

declare global {
  interface Window {
    electronAPI: {
      closeApp: () => void
      openCalculator: () => void
    }
  }
}

export default function App() {
  return (
    <div>
      <h1>Mi App con Electron + React</h1>
      <button onClick={() => window.electronAPI.closeApp()}>
        Cerrar ventana
      </button>
      <button onClick={() => window.electronAPI.openCalculator()}>
        Abrir calculadora
      </button>
    </div>
  )
}

