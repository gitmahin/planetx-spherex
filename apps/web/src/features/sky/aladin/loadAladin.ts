import { ALADIN_SCRIPT_URL } from "@/lib/config";

let loading: Promise<void> | null = null;

export function loadAladin(): Promise<void> {
  if (window.A) return window.A.init;
  if (loading) return loading;

  loading = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = ALADIN_SCRIPT_URL;
    script.async = true;
    script.onload = () => window.A.init.then(() => resolve()).catch(reject);
    script.onerror = () => {
      loading = null;
      reject(new Error("Failed to load Aladin Lite"));
    };
    document.head.appendChild(script);
  });
  return loading;
}
