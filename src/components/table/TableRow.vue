<template>
  <tr class="Row">
    <slot></slot>
  </tr>
</template>

<script lang="ts" setup generic="T extends ITableRow">
import { provide } from "vue";
import { createTableRowInjectionKey, type ITableRow } from "./types";

const props = defineProps<{ row: T; index: number }>();

provide(createTableRowInjectionKey<T>(), {
  row: props.row,
  $index: props.index,
});
</script>
