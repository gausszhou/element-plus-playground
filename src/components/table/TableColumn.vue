<template>
  <th class="Column">
    <slot :row="_row" :$index="$index"></slot>
  </th>
</template>

<script lang="ts" setup generic="T extends ITableRow">
import { getCurrentInstance, inject, ref, type VNode } from "vue";
import { createTableInjectionKey, createTableRowInjectionKey, type ITableColumnConfig, type ITableColumnProps, type ITableRow } from "./types";

const props = defineProps<ITableColumnProps>();
const tableProvider = inject(createTableInjectionKey<T>());
const rowProvider = inject(createTableRowInjectionKey<T>());
const _row = ref(rowProvider!.row);
const $index = ref(rowProvider!.$index);

const instance = getCurrentInstance();

if (instance) {
  const columnConfig: ITableColumnConfig = {
      id: instance.uid,
      prop: props.prop,
      label: props.label,
      width: props.width
  }
  tableProvider?.registerColumn(columnConfig)
}

defineSlots<{
  default?: (props: { row: T, $index: number }) => VNode | VNode[];
}>();
</script>
