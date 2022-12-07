export declare global {
  interface Window {
    Intercom(update: string, params: { hide_default_launcher: boolean }): void;
  }
}

window.Intercome = window.Intercome || {};
