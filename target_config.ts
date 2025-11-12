const target_tauri = false; // установите false для dev режима, true для Tauri build

export const api_proxy_addr = "http://192.168.56.1:8081"; // ваш API сервер
export const img_proxy_addr = "http://192.168.56.1:9000"; // ваш Minio/static сервер
export const dest_api = target_tauri ? api_proxy_addr : "/api";
export const dest_img = target_tauri ? img_proxy_addr : "/img-proxy";
export const dest_root = target_tauri ? "" : "/";