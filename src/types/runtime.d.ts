export { }; // Ensure this file is a module

declare global {
  interface Window {
    runtimeConfig?: {
      VITE_HOST_IP?: string;
      VITE_COMMAND_PORT?: string;
      VITE_QUERY_PORT?: string;
    };
  }
}
