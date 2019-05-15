<template>
    <div>
        <el-input class='search' v-model="foodid" placeholder="请输入食品编号"></el-input>
        <el-button @click="searchfood">搜索</el-button>
        <el-table :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
            <el-table-column prop="foodid" label="食品编号" width="80"></el-table-column>
            <el-table-column prop="foodname" label="食品名称" width="80"></el-table-column>
            <el-table-column prop="price" label="食物价格"  width="80"> </el-table-column>
            <el-table-column prop="content" label="描述" width="120"></el-table-column>
        </el-table>
        <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                tableData2:[],
                pagesize:5,
                currentPage:1,
                total:0,
                radio: '1',
                foodid:undefined
            }
        },mounted:function(){
            var that = this;
            that.$axios.post('/weixin/getfood',{foodtypeid: 3})
                .then(function (response) {
                    that.tableData.push(response.data.data)
                    that.tableData2=that.tableData[0]
                    that.total=that.tableData[0].length
                })
                .catch(function (error) {
                    alert(error);
                });
        },methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },searchfood(){
                var that = this;
                that.tableData2=[];
                if(this.foodid){
                    this.tableData.forEach(element => {
                        element.forEach(e=>{
                            if(e.foodid==this.foodid){
                                that.tableData2.push(e)
                            }
                        })
                    });
                }else{
                    that.tableData2=that.tableData[0]
                }
            }
        }
    }
</script>