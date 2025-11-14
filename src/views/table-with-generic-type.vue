<template>
  <TableEntry :data="tableData">
    <TableColumn prop="name" label="姓名" />
    <TableColumn prop="age" label="年龄" />
    <TableColumnUser prop="email" label="邮箱">
      <template #default="{ row }">
        <a :href="`mailto:${row.email}`" class="email-link">
          {{ row.email }}
        </a>
      </template>
    </TableColumnUser>
    <TableColumn label="操作">
      <template #default="{ row, $index }">
        <button @click="editRow(row, $index)">编辑</button>
        <button @click="deleteRow($index)">删除</button>
      </template>
    </TableColumn>
  </TableEntry>
</template>

<script setup lang="ts">
import TableColumn from "@/components/table/TableColumn.vue";
import TableEntry from "@/components/table/TableEntry.vue";
import { ref } from "vue";

const TableColumnUser = TableColumn<User>;

interface User {
  name: string;
  age: number;
  email: string;
}

const tableData = ref<User[]>([
  { name: "张三", age: 25, email: "zhangsan@example.com" },
  { name: "李四", age: 30, email: "lisi@example.com" },
]);

const editRow = (row: User, index: number) => {
  console.log("编辑:", row, index);
};

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1);
};
</script>
