declare module "minecraft-icon-items" {
  export function get(key: string): ItemIcon | null;
  export function getBukkit(key: string): ItemIcon | null;
  export function getAll(by: "name" | "id"): Map<String, ItemIcon>;
}

interface ItemIcon {
  id: string;
  name: string;
  meta: number;
  type: number;
  /**
   * Base 64 encoded img (32x32 pixels)
   */
  icon: string;
}
