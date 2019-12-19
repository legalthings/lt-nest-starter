declare namespace Mod {
  export interface Dynamic { [x: string]: any; }
  export type Writeable<T> = { -readonly [P in keyof T] } & Dynamic;
}
