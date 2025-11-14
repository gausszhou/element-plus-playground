// types.ts
import type { InjectionKey } from "vue";

export interface ITable<T> {
  data: T[];
 align?: "left" | "center" | "right";
}

// 基础表格行类型
export interface ITableRow {}

// 表格列配置（使用泛型）
export interface ITableColumnConfig {
  id: string | number;
  prop?: PropertyKey;
  label?: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  renderCell(scope: ITableRow): any;
}

// 表格列属性
export interface ITableColumnProps {
  prop?: string;
  label?: string;
  width?: number | string;
  align?: "left" | "center" | "right";
}

// 表格注入接口（关键：使用泛型传递数据类型）
export interface ITableInjection<T> {
  registerColumn(column: ITableColumnConfig): void;
  unregisterColumn({ id }: { id: number | string }): void;
}

// 行作用域注入接口
export interface ITableScope<T> {
  row: T;
  $index: number;
}

// 注入键（使用泛型工厂函数）
export function createTableInjectionKey<T extends any>() {
  return "table" as unknown as InjectionKey<ITableInjection<T>>;
}

// 默认注入键（用于未知类型）
export const TABLE_INJECTION_KEY = createTableInjectionKey();

