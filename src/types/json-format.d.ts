declare module "json-format" {
  export interface Config {
    type: "tab" | "space";
    size: number;
  }
  export default function jsonFormat(json: boolean | number | string | object | null, config?: Partial<Config>): string;
}
