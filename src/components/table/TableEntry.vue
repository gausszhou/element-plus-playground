<!-- Table.vue -->
<template>
  <table class="el-table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.id">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <TableRow
          v-for="(column, index) in columns"
          :index="index"
          :key="column.id"
          :row="row"
          :class="column.align ? `is-${column.align}` : ''"
        >
          <slot :row></slot>
        </TableRow>
      </tr>
    </tbody>
  </table>

  <!-- 隐藏的列配置收集器 -->
  <column-collector>
    <slot />
  </column-collector>
</template>

<script lang="ts" setup generic="T extends ITableRow">
import { defineComponent, provide, ref } from "vue";
import { createTableInjectionKey, type ITable, type ITableColumnConfig, type ITableRow } from "./types";
import TableRow from "./TableRow.vue";

defineProps<ITable<T>>();
const columns = ref<ITableColumnConfig[]>([]);

// 列收集器组件
const set = new Set();
const ColumnCollector = defineComponent({
  setup(_, { slots }) {
    provide(createTableInjectionKey<T>(), {
      registerColumn: (column: ITableColumnConfig) => {
        if (!set.has(column.id)) {
          columns.value.push(column);
        }
      },
    });
    return () => slots.default?.();
  },
});

defineExpose({ columns });
</script>
