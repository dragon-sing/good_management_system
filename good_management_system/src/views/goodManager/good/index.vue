<template>
  <div v-loading="loading" class="app-container ml-10">
    <div class="flex-inline mt-10">
      <div class="flex-inline  mr-10">
        <span class="mr-10">类别:</span>
        <category-select v-model="form.cat_id" width="70%" />
      </div>
      <div class="flex-inline mr-10">
        <span class="mr-10">商品名:</span>
        <el-input v-model="form.product_name" style="width:200px" />
      </div>
      <el-button size="small" type="success" @click="query"> 查询 </el-button>
    </div>

    <div class="mt-10">
      <el-button size="small" type="primary" @click="add"> 添加 </el-button>
    </div>

    <div class="flex-inline">
      <el-table
        class="mt-30"
        :data="tableData"
        border
      >
        <el-table-column align="center" prop="id" label="id" />
        <el-table-column align="center" prop="product_id" label="商品id" />
        <el-table-column align="center" prop="product_name" label="商品id" />
        <el-table-column align="center" prop="cat_id" label="品类id" />
        <el-table-column align="center" prop="status_id" label="状态号" />
        <el-table-column align="center" prop="" label="图片">
          <template v-slot="{}">
            <el-image
              style="width: 80px; height:80px"
              :src="url"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格">
          <template v-slot="{row}">
            <el-button v-if="!row.price" type="success" size="mini" @click="setPrice(row)">设置</el-button>
            <span v-else>{{ row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="weight" label="重量">
          <template v-slot="{row}">
            <el-button v-if="!row.weight" type="success" size="mini" @click="setWeight(row)">去设置</el-button>
            <span v-else>{{ row.weight }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_time" label="创建时间" />
        <el-table-column align="center" prop="description" label="描述" />
        <el-table-column align="center" prop="" label="操作" width="180">
          <template v-slot="{row}">
            <el-button type="success" size="mini" @click="edit(row)">修改</el-button>
            <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table></div>
    <price-dialog :old-row="oldRow2" :visible="pricevisible" @update="update()" @init="init" />
    <good-dialog :old-row="oldRow" :visible="goodvisible" @update="update()" @init="init" />

  </div>
</template>

<script>
import { getGoods, delGoods } from '@/api/goodManager/good'
import CategorySelect from '@/components/CategorySelect'
import GoodDialog from './components/goodDialog'
import PriceDialog from './components/priceDialog'
const defaultForm = () => {
  return {
    cat_id: '',
    product_name: ''
  }
}
export default {
  name: 'Good',
  components: {
    CategorySelect,
    GoodDialog,
    PriceDialog
  },
  data() {
    return {
      // 这里面写一个空对象，可以显示操作
      tableData: [{}],
      loading: false,
      goodvisible: false,
      pricevisible: false,
      oldRow: {},
      oldRow2: {},
      form: defaultForm(),
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1549888855,2453187842&fm=26&gp=0.jpg'
    }
  },
  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.query()
    },

    async query() {
      try {
        this.loading = true
        const { code, data } = await getGoods(this.form)
        if (code === 200) {
          this.tableData = Array.isArray(data) ? data : []
        }
      } finally {
        this.loading = false
      }
    },

    setPrice(row) {
      this.pricevisible = true
      this.oldRow2 = row
    },

    add() {
      this.goodvisible = true
      this.oldRow = null
    },

    edit(row) {
      this.goodvisible = true
      this.oldRow = row
    },
    update(formstate) {
      this.pricevisible = formstate
      this.goodvisible = formstate
    },
    del({ cat_id }) {
      this.$layer.confirm('确定要删除吗?').then(async() => {
        const { code } = await delGoods(cat_id)
        if (code === 200) {
          this.$layer.msg('删除成功。', { type: 'success' })
          this.query()
        }
      })
    },
    // 去设置重量
    setWeight({ product_id }) {
      this.$router.push({ path: '/goodManager/weight', query: { product_id: product_id }})
    }
    // // 去设置价格
    // setPrice({ product_id }) {
    //   this.$router.push({ path: '/goodManager/price', query: { product_id: product_id }})
    // }
  }
}
</script>

<style>

</style>
