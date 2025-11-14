<script lang="ts" setup generic="T extends ITableRow">
import {
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  useSlots,
  type VNode,
} from "vue";
import {
  createTableInjectionKey,
  type ITableColumnConfig,
  type ITableColumnProps,
  type ITableRow,
  type ITableScope,
} from "./types";

const props = defineProps<ITableColumnProps>();
const tableProvider = inject(createTableInjectionKey<T>());
const slots = useSlots();

const instance = getCurrentInstance();

onMounted(() => {
  if (tableProvider) {
    const columnConfig: ITableColumnConfig = {
      id: instance!.uid,
      prop: props.prop,
      label: props.label,
      width: props.width,
      renderCell: (scope: ITableScope<T>) => {
        // 如果有用户提供的插槽，使用插槽内容
        if (slots.default) {
          return slots.default(scope);
        }
        // 否则使用默认渲染
        return scope.row[props.prop as keyof T] ?? "";
      },
    };
    tableProvider?.registerColumn(columnConfig);
  }
});

onUnmounted(() => {
  if (!instance || !tableProvider) return;
  tableProvider.unregisterColumn({ id: instance.uid.toString() });
});

defineSlots<{
  default?: (props: ITableScope<T>) => VNode | VNode[];
}>();
</script>
