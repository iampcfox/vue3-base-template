<template>
  <div
    class="scroll-container bg-white px-5 py-10 rounded shadow hover:shadow-lg duration-200 ease-linear"
  >
    <div class="scroll-wrapper">
      <el-table
        ref="commonTable"
        :data="table.data"
        :border="true"
        height="100%"
        stripe
        :highlight-current-row="true"
        show-overflow-tooltip
        header-row-class-name="table-header"
        v-el-table-infinite-scroll="load"
        :infinite-scroll-immediate="false"
        style="width: 100%"
        @selection-change="
          (arr) => {
            table.data.selectedIds = arr.map((item) => item.id)
          }
        "
      >
        <el-table-column v-if="props.selection" type="selection" width="55" />

        <el-table-column
          v-for="item in props.tableHeader"
          :key="item.prop"
          align="center"
          :prop="item.prop"
          :label="item.label"
          :width="item.prop === 'order' ? '100px' : item.width"
          :show-overflow-tooltip="item.showOverflowTooltip"
        >
          <template #default="{ row, $index }">
            <template v-if="item.prop === 'order'">
              {{ $index + 1 }}
            </template>
            <template v-else-if="item.type === 'qrcode'">
              <vue-qr
                v-if="row[item.prop]"
                :size="35"
                :colorDark="row['codeBackground']"
                :text="row[item.prop]"
              />
            </template>
            <!-- 展示图片 -->
            <template v-else-if="item.type === 'imgUrl'">
              <el-image :src="row[item.prop]" style="width: 35px; height: 35px" fit="contain" />
            </template>
            <!-- 自定义单元格 -->
            <template v-else-if="item.type === 'custom'">
              <slot :name="item.prop" :row="row"></slot>
            </template>
            <template v-else>
              <slot :name="item.prop" :row="row"> {{ row[item.prop] }}</slot>
            </template>
          </template>
        </el-table-column>
        <slot name="operations"></slot>
      </el-table>
    </div>
  </div>
  <!-- <el-config-provider :locale="locale">
    <el-pagination
      v-if="props.pagination"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="table.params.pageNo"
      :page-size="table.params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="table.currentTotal"
    >
    </el-pagination>
  </el-config-provider> -->
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import vElTableInfiniteScroll from 'el-table-infinite-scroll'
import axios from '@/request'
import VueQr from 'vue-qr/src/packages/vue-qr.vue'
//import zhCn from 'element-plus/es/locale/lang/zh-cn'

//const locale = zhCn
const props = defineProps([
  'api',
  'tableHeader',
  'handleDataTrans',
  'params',
  'selection',
  'pagination'
])

const commonTable = ref()
let table = reactive({
  data: [],
  searchText: '',
  params: {
    pageSize: 20,
    pageNo: 1
  },
  currentTotal: 0,
  more: true
})

// function handleCurrentChange(val) {
//   table.params.pageNo = val
//   table.data = []
//   getData()
// }

// function handleSizeChange(val) {
//   table.params.pageSize = val
//   handleCurrentChange(1)
// }

function getData() {
  let reqParams = null

  //除了输入框文本以外的搜索参数
  if (props.params) {
    reqParams = {
      ...table.params,
      ...props.params
    }
  } else {
    reqParams = {
      ...table.params
    }
  }

  axios.post(props.api, reqParams).then((res) => {
    if (table.params.pageNo < res.pages) {
      table.more = true
    } else {
      table.more = false
    }

    //如果有 数据处理方法则进行数据处理再赋值
    const data = props.handleDataTrans ? props.handleDataTrans(res.rows) : res.rows

    if (table.params.pageNo == 1) {
      table.data = data
    } else {
      table.data.push(...data)
    }

    //table.currentTotal += data.length
    table.currentTotal = res.total
  })
}

function search() {
  table.params.pageNo = 1
  table.data = []
  getData()
}

function load() {
  if (table.more) {
    table.params.pageNo++
    getData()
  }
}

onMounted(() => {
  // getData()
})

defineExpose({
  table,
  commonTable,
  getData,
  search
})
</script>

<style scoped lang="scss">
.el-table :deep(.table-header) {
  // background-color: rgba(31, 63, 141, 0.1);
}
.scroll-container {
  // height: calc(100% - 32px);
  height: calc(100vh - 90px - 55px - 32px);
  padding: 10px 0 0;
}
.scroll-wrapper {
  height: 100%;

  overflow: auto;
  overflow-anchor: none;
}
.el-table {
  background-color: transparent;
  :deep(tr) {
    background-color: transparent;
  }
  :deep(.el-table__cell) {
    background-color: transparent;
    color: #1f2529;
  }
  :deep(.current-row) {
    .el-table__cell {
      background: rgba(4, 146, 249, 0.1);
      border-radius: 4px;
      color: rgba(0, 161, 233, 1);
    }
  }
}
</style>
