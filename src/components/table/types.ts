// types.ts
import type { InjectionKey, Ref } from "vue";

export interface ITable<T> {
  data: T[];
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
}

// 表格列属性
export interface ITableColumnProps {
  prop?: string;
  label?: string;
  width?: number | string;
  align?: "left" | "center" | "right";
}

// 表格注入接口（关键：使用泛型传递数据类型）
export interface ITableInjection<T extends ITableRow = ITableRow> {
  registerColumn(column: ITableColumnConfig): void;
}

// 行作用域注入接口
export interface ITableRowProvider<T extends ITableRow = ITableRow> {
  row: T;
  $index: number;
}

// 注入键（使用泛型工厂函数）
export function createTableInjectionKey<T extends ITableRow>() {
  return Symbol("el-table") as InjectionKey<ITableInjection<T>>;
}

export function createTableRowInjectionKey<T extends ITableRow>() {
  return Symbol("el-table-row") as InjectionKey<ITableRowProvider<T>>;
}

// 默认注入键（用于未知类型）
export const TABLE_INJECTION_KEY = createTableInjectionKey();
export const TABLE_ROW_INJECTION_KEY = createTableRowInjectionKey();
