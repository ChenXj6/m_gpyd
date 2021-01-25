<template>
	<view class="w_table">
		<view class="w_table_swper" :style="{ height:height? height.indexOf('%')!==-1?height:height:'100%' }">
			<view class="w_table_content">
				<!-- 表头 -->
				<view class="w-table_title" :style="{ background:headbBackground }">
					<view class="w-table_title_item">
						<text class="w_table_title_content" style="width:40px">序号</text>
						<text class="w_table_title_content" style="width:350px;">物料名称</text>
						<text class="w_table_title_content" style="width:40px;">数量</text>
						<text class="w_table_title_content" style="width:40px;">单位</text>
						<text class="w_table_title_content" style="width:80px;">单价(元)</text>
						<text class="w_table_title_content" style="width:80px;">小计</text>
						<text class="w_table_title_content" style="width:100px;">备注</text>
					</view>
				</view>
				
				<!-- 表体 -->
				<view class="w_table_body" v-if="data.length" v-for="(item,index) in data" :key="index">
					<view class="w_table_body_col" v-for="(col,cIndex) in columns" :key="cIndex" :style="{ textAlign:col.align||'center' }">
						<view class="col_cell" :class="{ 'col_cell_border':border }">
							<view class="col_text" :style="{ width:col.width?col.width:'200px'}">
								<view v-if="col.type=='index'"  :style="{ width:col.width?col.width:'100px'}">
									{{ index+1 }}
								</view>
								<text v-else :style="{ width:col.width?col.width:'200px'}" v-html="item[col.key]"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="allMoneyBox">
				<view class="allMoney">
					<view class="allMoney2">
						<view class="allMoney_title">
							发票价格(元)：
						</view>
						<view class="allMoney_content">
							{{invoice_price == 0 ?'无' : invoice_price}}
						</view>
					</view>
					<view class="allMoney2 allMoney2-right">
						<view class="allMoney_title">
							商品总计(元)：
						</view>
						<view class="allMoney_content">
							{{total_price}}
						</view>
					</view>
				</view>
				<view class="allMoney">
					<view class="allMoney2">
						<view class="allMoney_title">
							优惠券(元)：
						</view>
						<view class="allMoney_content">
							{{discounts == 0 ?'无' : discounts}}
						</view>
					</view>
					<view class="allMoney2 allMoney2-right">
						<view class="allMoney_title">
							运费(元)：
						</view>
						<view class="allMoney_content">
							{{delivery_money}}
						</view>
					</view>
				</view>
				
				<view class="allMoney" style="color: #000;">
					<view class="allMoney_title">
						实际支付(元)：
					</view>
					<view class="allMoney_content">
						{{price}}
					</view>
				</view>
			</view>
			<view v-if="data.length == 0" class="w_table_null">
				<view>{{ noDataText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Cell from './cell'
	export default {
		components: {
			Cell
		},
		computed:{
			price(){
				let a = (this.total_price*100 + this.delivery_money*100 + this.discounts*100 + this.invoice_price*100) / 100;
				return a;
			}
		},
		props: {
			data: {
				type: Array,
				default () {
					return []
				}
			},
			columns: {
				type: Array,
				default () {
					return []
				}
			},
			border: {
				type: Boolean,
				default: false
			},
			height: {
				type: [Number, String],
				default: 0
			},
			headbBackground: {
				type: String,
				default: "#666"
			},
			noDataText: {
				type: String,
				default: "暂无数据"
			},
			total_price:{
				type:[Number, String],
				default:0
			},
			delivery_money:{
				type:[Number, String],
				default:0
			},
			discounts:{
				type:[Number, String],
				default:0
			},
			invoice_price:{
				type:[Number, String],
				default:0
			},

		},
		data: () => {
			return {
				allCheck: false
			}
		},
		methods: {
			/** 
			 * 	-- 单击某一行时触发
			 * @param {Object} item为当前行的数据
			 * @param {Object} index为当前行的下标
			 */
			clickRow(row, index) {
				let params = {
					row,
					index
				}
				this.$emit('on-row-click', params)
			},
			/**
			 * 	--	 点击全选
			 */
			checkHeader() {
				this.allCheck = !this.allCheck;
				this.data.forEach(it => {
					it._isChecked = this.allCheck;
				})
				this.$emit('on-select-all', {
					allChecked: this.data.filter(item => item._isChecked)
				})
			},
			/**
			 * 	--	点击单选
			 */
			checkItemCheckbox(item) {
				item._isChecked = !item._isChecked;
				this.data.forEach(it => {
					if(!it._isChecked){
						this.allCheck = false;
					}
				})
				let ary = this.data.filter(item => item._isChecked); //已选择的项
				if(ary.length == this.data.length){
					this.allCheck = true
				}
				this.$emit('on-select', {
					allChecked: ary,
					checked: item
				})
			}
		},
		created() {
			this.columns.forEach(it => {
				it.type = it.type || 'html';
				if (it.render) {
					it.type = "render"
				}
			})
			this.data.forEach(it => {
				it._isChecked = false;
			})
		},

	}
</script>

<style>
	.w_table {
		width: 100%;
		position: relative;
		display: inline-block;
		height: auto;
		min-height: 300px;
		min-width: 100%;
		background: #fff;
		border: 2upx solid #666;
		font-size: 14px;
		box-sizing: border-box;
	}

	.w_table_swper {
		height: 100%;
		box-sizing: border-box;
	}

	.w_table_content {
		height: 100%;
		width: 100%;
	}

	.w-table_title {
		width: fit-content;
		display: flex;
		height: 30px;
		justify-content: space-between;
		line-height: 16px;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1;
		font-size:18px;
		width: 100%;
		padding-top:5px;
		box-sizing: border-box;
	}

	.w-table_title_item {
		display: inline-block;
		width: 100%;
	}

	.w-table_title_item_border {
		border-right: 1px solid #fff;
	}

	.w_table_title_content {
		display: inline-block;
		text-align: center;
		padding: 0 3px;
		position: relative;
	}

	.w_table_body {
		display: flex;
		justify-content: space-between;
		height: 30px;
		line-height: 30px;
	}
	.allMoneyBox{
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.w_table_body_col {
		height: auto;
		box-sizing: border-box;
		border-bottom: 2px solid #f8f8f8;
		padding: 0 3px;
	}

	.w_table_body_col>.col_cell {
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.col_cell_border {
		border-right: 1px solid #f8f8f8;
	}

	.col_cell_last {
		border: none;
	}

	.col_text {
		display: inline-block;
		/* padding: 0 10upx; */
		margin: 0 auto;
	}

	.w_table_null {
		width: 100%;
		height: 60upx;
		position: absolute;
		top: 60upx;
		line-height: 60upx;
		text-align: center;
	}
	.allMoney{
		width: 100%;
		height: 20px;
		display: flex;
		justify-content: flex-start;
		border-top: 1px solid #666;
	}
	.allMoney2{
		width: 50%;
		height: 20px;
		display: flex;
		justify-content: flex-start;
		border-top: 1px solid #666;
	}
	.allMoney2-right{
		border-left: 1px solid #666;
	}
	.allMoney_title{
		color:#222;
		font-size: 16px;
		font-weight: bold;
		width: 30%;
		line-height: 20px;
		text-align: right;
	}
	.allMoney_content{
		border-left: 1px solid #666;
		font-size: 16px;
		width: 70%;
		box-sizing: border-box;
		line-height: 20px;
		text-align: right;
		padding: 0 10px;
	}
</style>
