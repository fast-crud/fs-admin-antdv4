import { createIconifyIcon } from "./create-icon";

export * from "./create-icon";

export * from "./lucide";

export type { IconifyIcon as IconifyIconStructure } from "@iconify/vue";
export { addCollection, addIcon, Icon as IconifyIcon, listIcons } from "@iconify/vue";

export const MdiKeyboardEsc = createIconifyIcon("mdi:keyboard-esc");
