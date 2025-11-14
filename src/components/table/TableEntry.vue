<!-- Table.vue -->
<template>
  <table class="table-entry">
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.id"
          :style="{ width: column.width + 'px',  textAlign:  column.align ?? align }"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <TableRow v-for="(row, rowIndex) in data" :key="rowIndex">
        <td
          v-for="(column, index) in columns"
          :index="index"
          :key="column.id"
          :style="{ width: column.width + 'px', textAlign:  column.align  ?? align}"
        >
          <render-cell
            :render="column.renderCell"
            :row="row"
            :row-index="rowIndex"
          />
        </td>
      </TableRow>
    </tbody>
    <!-- 隐藏的列配置收集器 -->
    <column-collector>
      <slot />
    </column-collector>
  </table>
</template>

<script lang="ts" setup generic="T extends Record<PropertyKey, any>">
import { defineComponent, h, provide, ref } from "vue";
import TableRow from "./TableRow.vue";
import {
  createTableInjectionKey,
  type ITable,
  type ITableColumnConfig,
} from "./types";

const props = defineProps<ITable<T>>();

console.log(props);

const columns = ref<ITableColumnConfig[]>([]);

// 单元格渲染组件
const RenderCell = defineComponent({
  props: {
    render: Function,
    row: Object,
    rowIndex: Number,
  },
  setup(props) {
    return () => {
      if (props.render) {
        return props.render({ row: props.row, $index: props.rowIndex });
      }
      return h("span", "");
    };
  },
});

// 列收集器组件
const ColumnCollector = defineComponent({
  setup(_, { slots }) {
    provide(createTableInjectionKey<T>(), {
      registerColumn: (column: any) => {
        columns.value.push(column);
      },
      unregisterColumn: (column: any) => {
        const index = columns.value.findIndex((col) => col.id === column.id);
        if (index > -1) {
          columns.value.splice(index, 1);
        }
      },
    });

    return () => slots.default?.();
  },
});

defineExpose({ columns });
</script>
