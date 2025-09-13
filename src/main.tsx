
  import 'core-js/stable';
  import 'regenerator-runtime/runtime';
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import "./main.js";

  createRoot(document.getElementById("root")!).render(<App />);
  