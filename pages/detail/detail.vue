<template>
	<view class="detailBox">
		<!-- good -->
		<uni-card v-for="(item,index) in order" :key="index" :note="item.note == '' ? '无商品备注' : item.note " class="card">
			<view class="goodTop">
				<view class="goodTop_left">
					<image :src="imgUrl + item.thumimage" mode=""></image>
				</view>
				<view class="goodTop_right">
					<view class="">
						<text class="">{{item.goods_name}}</text>
					</view>
					<view class="">
						<text class="">商品单价：{{item.price}}/{{item.inventory_unit}}</text>
					</view>
					<view class="">
						<text class="">购买数量：{{item.quantity}}{{item.inventory_unit}}</text>
					</view>
				</view>
			</view>
		</uni-card>
		<!-- 仓管员 -->
		<view class="bottom bottom1" v-if="type == 1">
			<view class="totalPrice">
				<view class="totalPrice_left">
					<button  type="primary" size="mini" @click="print" v-if="type == 1 && lStatus == 0">打印凭证</button>
				</view>
				<view class="totalPrice_right">
					商品总价合计：<text>￥{{pay_money}}</text>
				</view>
			</view>
			<view class="btn_Box">
				<button type="primary" v-if="lStatus == 0 && delivery_method == 1"  plain="true" @click="deliveSure" :disabled="deliveSureBtn">确认发货</button>
				<button v-if="lStatus == 1" type="info" plain="true">已发货</button>
				<button v-if="lStatus == 0 && delivery_method == 2" type="primary" @click="getSure" :disabled="getSureBtn">确认收货</button>
				<button v-if="lStatus == 3 && delivery_method == 1" type="info" plain="true">配送中</button>
				<button v-if="lStatus == 2" type="default">已确认收货</button>
			</view>
		</view>
		<!-- 配送员 -->
		<view class="bottom1 bottom" v-else>
			 <view class="totalPrice">
				 <view class="totalPrice_left">
				 </view>
			 	<view class="totalPrice_right">
			 		商品总价合计：<text>￥{{pay_money}}</text>
			 	</view>
			 </view>
			 <view class="btnsBox">
				 	<button v-if="lStatus == 1" type="primary" plain="true"  @click="startDelive" :disabled="startDeliveBtn">开始配送</button>
				 	<button v-if="lStatus == 3" type="primary"  @click="getSure" :disabled="getSureBtn">确认收货</button>
					<button v-if="lStatus == 2" type="default" >已确认收货</button>
			 </view>
		</view>
		 <!-- 仓管上传签收单 -->
		<view class="photo" v-if="lStatus == 0 && delivery_method == 2 && type == 1">
		 	<view class="photo_title">
		 		<text>请上传签收单:</text>
		 	</view>
			<view class="photo_centent">
				<view class="photo_centent_tip">
					<text> </text>
					<text style="color: #888;">{{photoNum}}/{{maxPhotoNum}}</text>
				</view>
				<robby-image-upload v-model="imageData" @delete="deleteImage" @add="addImage" :form-data="formData" :server-url="serverUrl" :limit="maxPhotoNum" style="width: 100%;height: 100%;" :showUploadProgress="showUploadProgress"></robby-image-upload>
			</view>
		</view>
		 <!-- 上传签收单 -->
		<view class="photo" v-if="lStatus == 3 && type == 2">
		 	<view class="photo_title">
		 		<text>请上传签收单:</text>
		 	</view>
			<view class="photo_centent">
				<view class="photo_centent_tip">
					<text> </text>
					<text style="color: #888;">{{photoNum}}/{{maxPhotoNum}}</text>
				</view>
				<robby-image-upload v-model="imageData" @delete="deleteImage" @add="addImage" :form-data="formData" :server-url="serverUrl" :limit="maxPhotoNum" style="width: 100%;height: 100%;" :showUploadProgress="showUploadProgress"></robby-image-upload>
			</view>
		</view>
		<!-- Receipt -->
		<view class="Receipt" v-if="lStatus == 2">
			<image v-if="receiptUrl != ''" :src=" $store.state.imgUrl + receiptUrl " mode="" ></image>
			<text v-else>暂无签收单</text>
		</view>
		<!-- print -->
		<view class="printContent">
			<view class="bigTitle">
				<view class>出&nbsp;货&nbsp;单</view>
			</view>
			<view class="printNav">
				<view class="printNav_top">
					<view class="printNav_top_left">
						<view class="printNav_top_text">
							发货单位：
							<text></text>
						</view>
						<view class="printNav_top_text">
							发货人/单位：
							<text>厦门工配</text>
						</view>
						<view class="printNav_top_text">
							公司地址：
							<text>福建省厦门市湖里区联合大厦201室</text>
						</view>
						<view class="printNav_top_text">
							传真：
							<text>0086 2155 6668 57 </text>
						</view>
						<view class="printNav_top_text">
							联系人：
							<text>成才</text>
						</view>
						<view class="printNav_top_text">
							电话：
							<text>15212364521</text>
						</view>
					</view>
					<view class="printNav_top_right">
						<view class="printNav_top_text">
							收货人：
							<text style="margin-left: 15%;font-weight: bold;color: #333333;">订单号：
							<text style="font-weight: none;color: #333;">{{orderN}}</text>
							</text>
						</view>
						<view class="printNav_top_text">
							收货联系人：
							<text>{{consign || '无'}}</text>
						</view>
						<view class="printNav_top_text">
							收货人电话：
							<text>{{phone || '无'}}</text>
						</view>
						<view class="printNav_top_text">
							收货方式：
							<text>{{delivery_method | deliverMethod}}</text>
						</view>
						<view class="printNav_top_text">
							发票信息：
							<!-- <text>{{invoice_price == 0 ? '无' : address}}</text> -->
						</view>
						<view class="printNav_top_text" v-if="delivery_method == 1">
							收货地址：
							<!-- <text>{{address || '无'}}</text> -->
							<text>{{delivery_method == 2 ? '无' : address}}</text>
						</view>
					</view>
				</view>
				<view class="printNav_bottom">
					<view class="printNav_bottom_left">
						备注：
					</view>
					<view class="printNav_bottom_right">
					</view>
				</view>
			</view>
			<view class="printTable">
				<wTable :columns="columns" height="auto" :total_price="totalPrice" :delivery_money="delivery_money" :discounts="discounts" :invoice_price="invoice_price" :data="order" />
			</view>
			<view class="sign">
				<view class="sign_top">
					签字区域：
				</view>
				<view class="sign_bottom">
					<view class="signArea">
						发货人签字：
					</view>
					<view class="signArea">
						收货人签字：
					</view>
				</view>
			</view>
			<view class="printTime">
				<text style="float: right;font-size: 16px;color: #666;">打印日期：{{date | formatDate(date)}}</text>
			</view>
		 </view>
	</view>
		
</template>

<script>
	import uniCard from '../../components/uni-card/uni-card.vue'
	import makeSign from '../../util/sign.js';
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue'
	import wTable from '../../components/wang-wTable/wTable.vue';
	
	import md5 from 'js-md5';
	import { mapState } from 'vuex'
	export default {
		components: {uniCard,wTable},
		computed: mapState(['imgUrl','type']),
		data() {
			return {
				order:[],
				order_id:'',
				lStatus:0,
				orderN:'',
				phone:'',
				consign:'',
				pay_money:0,
				create_time:'',
				delivery_method:1,
				delivery_money:0,
				address:'',
				discounts:0,
				invoice_price:0,
				totalPrice:0,
				// Control button
				getSureBtn:false,
				startDeliveBtn:false,
				deliveSureBtn:false,
				// image
				enableDel : true,
				enableAdd : false,
				showUploadProgress:false,
				imageData:[],
				formData:{
					order_id:''
				},
				serverUrl:this.$store.state.url + 'upload/uploadReceive',
				receive_path:'',
				enableDrag : true,
				photoNum:0,
				maxPhotoNum:1,
				uploadP:false,
				receiptUrl:'',
				// table
				columns:[
					{ type:'index',width:'40px',align:'center'},
					{ title:'物料名称',key:'goods_name' ,align:'center',width:'350px'},
					{ title:'数量', width:'40px',key:'quantity' },
					{ title:'单位', width:'40px',key:'inventory_unit' },
					{ title:'单价', width:'80px',key:'price' },
					{ title:'小计',key:'total_prices',width:'80px' },
					{ title:'备注(交期及票据等)',key:'note',width:'100px' }
				],
				date:Date.parse(new Date())/1000,
			}
		},
		created() {
		},
		methods: {
			// 打印订单
			print(){
				// try{
					var str = document.getElementsByClassName('printContent')[0];
					var str1 = document.querySelectorAll('.card');
					var str2 = document.getElementsByClassName('bottom')[0];
					if(this.delivery_method != 1){
						var str3 = document.getElementsByClassName('photo')[0];
							str3.classList.add('hidden')
					}
					str.classList.add('print')
					for(let i =0;i<str1.length;i++){
						str1[i].classList.add('hidden')
					}
					str2.classList.add('hidden')
					document.getElementsByTagName('uni-page-head')[0].style.display = 'none'
					window.print();
					
				// }catch(err){
				// 	console.log(err)
				// }finally{
					window.location.reload()
				// }
			},
			// 添加签收单图片
			deleteImage:function(e){
				this.photoNum = e.allImages.length
			},
			addImage: function(e){
				this.imageData = []
				this.photoNum = e.allImages.length
				this.receive_path = e.allImages[0].receive_path
			},
			//获取订单详情
			getDetail(){
				let user_id = this.$store.state.user_id;
				let timestamp = Date.parse(new Date())/1000;
				let order_id = this.order_id;
				let sign = md5(makeSign.makeSign({user_id,order_id,timestamp}))
				uni.request({
					url:this.$store.state.url + 'orderlist/orderDetail',
					method:"post",
					data:{user_id,timestamp,order_id,sign},
					success:(res)=>{
						let data = res.data
						if(data.code == 1){
							this.order = data.data.orderDetail
							this.receiptUrl = data.data.order.receive_path
							data.data.orderDetail.forEach(v=>{
								this.totalPrice += Number(v.total_prices)
							})
						}else{
							uni.showToast({
								title:data.msg,
								icon:"none"
							})
						}
					}
				})
			},
			// 确认发货
			deliveSure(){
				let that = this
				let user_id = this.$store.state.user_id;
				let timestamp = Date.parse(new Date())/1000;
				let order_id = this.order_id;
				let sign = md5(makeSign.makeSign({user_id,order_id,timestamp}))
				uni.request({
					url:this.$store.state.url + 'orderlist/confirmDelivery',
					method:"post",
					data:{user_id,timestamp,order_id,sign},
					success:(res)=>{
						let data = res.data
						if(data.code == 1){
							that.deliveSureBtn = true
							uni.showToast({
								title:data.msg,
								icon:"success"
							})
							setTimeout(()=>{
								uni.switchTab({
									url:'../main/main'
								})
							},1500)
						}else{
							uni.showToast({
								title:data.msg,
								icon:"none"
							})
						}
					}
					
				})
			},
			// 开始配送
			startDelive(){
				let that = this
				let user_id = this.$store.state.user_id;
				let timestamp = Date.parse(new Date())/1000;
				let order_id = this.order_id;
				let sign = md5(makeSign.makeSign({user_id,order_id,timestamp}))
				uni.request({
					url:this.$store.state.url + 'orderlist/confirmDistr',
					method:"post",
					data:{user_id,timestamp,order_id,sign},
					success:(res)=>{
						let data = res.data
						if(data.code == 1){
							that.startDeliveBtn = true
							uni.showToast({
								title:"开始配送",
								icon:"success"
							})
							setTimeout(()=>{
								uni.switchTab({
									url:'../main/main'
								})
							},1500)
						}else{
							uni.showToast({
								title:data.msg,
								icon:"none"
							})
						}
					}
					
				})
			},
			// 确认收货
			getSure(){
				if(!this.uploadP){
					uni.showToast({
						title:"请上传签收单",
						icon:"none"
					})
					return
				}
				let that = this
				let user_id = this.$store.state.user_id;
				let timestamp = Date.parse(new Date())/1000;
				let order_id = this.order_id;
				let delivery_method = this.delivery_method
				let sign = md5(makeSign.makeSign({delivery_method,user_id,order_id,timestamp}))
				uni.request({
					url:this.$store.state.url + 'orderlist/confirmReceive',
					method:"post",
					data:{delivery_method,user_id,timestamp,order_id,sign},
					success:(res)=>{
						let data = res.data
						if(data.code == 1){
							that.getSureBtn = true
							uni.showToast({
								title:"收货成功",
								icon:"success"
							})
							setTimeout(()=>{
								uni.switchTab({
									url:'../main/main'
								})
							},1500)
						}else{
							uni.showToast({
								title:data.msg,
								icon:"none"
							})
						}
					}
					
				})
			}
		},
		onLoad:function(option){
			this.order_id = uni.getStorageSync('order_id');
			this.formData.order_id = uni.getStorageSync('order_id');
			this.lStatus = uni.getStorageSync('lStatus');
			this.pay_money = uni.getStorageSync('pay_money');
			this.phone = uni.getStorageSync('phone');
			this.orderN = uni.getStorageSync('orderN');
			this.consign = uni.getStorageSync('consign');
			this.create_time = uni.getStorageSync('create_time');
			this.delivery_method = uni.getStorageSync('delivery_method');
			this.delivery_money = uni.getStorageSync('delivery_money');
			this.address = uni.getStorageSync('address');
			this.invoice_price = uni.getStorageSync('invoice_price');
			this.discounts = uni.getStorageSync('discounts');
			this.getDetail();
		},
		filters:{
			pay_method (val) {
				if (val == 1) {
					return val = "预付款支付"
				} else if (val == 2) {
					return val = "支付宝支付"
				}
				else if (val == 3) {
					return val = "微信支付"
				} else if (val == 4) {
					return val = '线下支付'
				}
			},
			status(val){
			  if (val == 0) {
				return val = "未发货"
			  } else if (val == 1) {
				return val = "已发货"
			  } else {
				return val = "确认收货"
			  }
			},
			formatDate: function (time) {
				let date = new Date(Number(time)*1000); //转成Number格式，且php获取的时间戳要*1000  
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
			},
		deliverMethod(val){
		  if (val == 1) {
			return val = "货运"
		  } else{
			 return val = "自提"
		  }
		}
		},
		watch:{
			photoNum(val){
				if(val != 0){
					this.uploadP = true
				}else{
					this.uploadP = false
				}
			}
		}
	}
</script>

<style scoped>
	.Receipt{
		width: 100%;
		height: 200px;
		padding: 3%;
		box-sizing: border-box;
		color: #999999;
		display: flex;
		justify-content: center;
	}
	.Receipt > image{
		width: 100%;
		height: 200px;
	}
	
	/*  */
	.sign{
		width: 100%;
		height: 100pt;
		margin: 10px 0;
	}
	.sign_top{
		height: 50;
		font-size: 18px;
		font-weight: bold;
		color: #333333;
		box-sizing: border-box;
		line-height: 50px;
	}
	.sign_bottom{
		width: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		margin: ;
		height: 80%;
	}
	.signArea{
		width: 40%;
		border: 1px solid #666;
		font-size: 18px;
		color: #666;
		padding-left: 5px;
		box-sizing: border-box;
	}
	.printNav{
		width: 100%;
		height: 180pt;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.printNav_top{
		height: 75%;
		display: flex;
		justify-content: flex-start;
		box-sizing: border-box;
		border: 1px solid #333333;
		border-bottom: none;
	}
	.printNav_top_left{
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.printNav_top_text{
		font-size: 16px;
		font-weight: bold;
		color: #333333;
		margin-left: 25px;
	}
	.printNav_top_text>text{
		font-size: 14px;
		font-weight: none;
		color: #111;
	}
	.printNav_top_text:first-child{
		margin-left: 5px;
		display: flex;
		justify-content:flex-start;
	}
	.printNav_top_right{
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		border-left: 1px solid #333333;
		box-sizing: border-box;
	}
	.printNav_bottom{
		height: 25%;
		border: 1px solid #333333;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 0 5px;
	}
	.printNav_bottom_left,.printNav_bottom_right{
		width: 50%;
		font-size: 16px;
		font-weight: bold;
		color: #333333;
	}
	.printNav_bottom_left>text,.printNav_bottom_right>text{
		font-size: 14px;
		font-weight: none;
		color: #666;
	}
	.printTable{
		width: 100%;
		height: auto;
		margin-top: 10px;
	}
	
	

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
	view {
		font-size: 28rpx;
		line-height: inherit;
	}
	.detailBox{
		margin-bottom: 130px;
		width: 100%;
	}

	.example {
		padding: 0 30rpx 30rpx;
	}

	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 30rpx;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 30rpx;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 30rpx;
	}

	.example-info-text {
		font-size: 28rpx;
		line-height: 36rpx;
	}


	.example-body {
		flex-direction: column;
		padding: 30rpx;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.example-body {
		padding: 20rpx 0;
		padding-bottom: 0;

	}

	.example-box {
		/* margin-bottom: 30rpx;
 */
	}

	.image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		height: 350rpx;
		overflow: hidden;
	}

	.image {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1;
	}

	.content-box {
		padding-top: 20rpx;
	}

	.content-box-text {
		font-size: 30rpx;
	}

	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;

	}

	.footer-box__item {
		align-items: center;
		padding: 10rpx 0;
		font-size: 30rpx;
		color: #666;
	}
	.goodTop{
		width: 100%;
		height: auto;
		box-sizing: border-box;
		display: flex;
		
	}
	.goodTop .goodTop_left{
		width: 30%;
		margin-right: 2%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.goodTop .goodTop_right{
		width: 70%;
		font-size: 14px;
		color: #999;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 180rpx;
	}
	.goodTop .goodTop_left>image{
		width: 180rpx;
		height: 180rpx;
		border: 1px solid #666;
		box-sizing: border-box;
	}
	.bottom{
		width: 100%;
		height: auto;
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		z-index: 999;
	}
	/* #ifdef APP-PLUS */
	.bottom1{
		width: 100%;
		height: 120px;
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		z-index: 999;
	}
	/* #endif */
	
	.totalPrice{
		width: 100%;
		height: 80upx;
		background-color: #FFFFFF;
		padding: 0 3%;
		box-sizing: border-box;
		border-bottom: 1px solid #f5f5f5;
		display: flex;
		justify-content: space-between;
		line-height: 44px;
	}
	.totalPrice_left{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.totalPrice_right{
		font-size: 28rpx;
		line-height: 80upx;
	}
	.totalPrice_right>text{
		color: red;
		font-size: 36rpx;
	}
	.btn_Box{
		width: 100%;
		padding: 3%;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.btnsBox{
		width: 100%;
		height: auto;
		padding:3%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-top: 1px solid #999999;
	}
	.photo{
		width: 92%;
		background-color: #FFFFFF;
		height: 30%;
		margin: 0 auto;
		border-radius: 10px;
	}
	.photo_title{
		background-color: #efeff4;
		height: 20%;
		padding: 10px 0;
		box-sizing: border-box;
		color: #888;
	}
	.photo_centent{
		color: #333;
	}
	.photo_centent_tip{
		display: flex;
		justify-content: space-between;
		padding: 10px 3% 0;
		box-sizing: border-box;
	}
	
	.printContent{
		display: none; //
		width: 603pt;
		height: 880pt;
		margin: 0 auto;
		background-color: #f5f5f5;
		padding: 10px;
		box-sizing: border-box;
		position: relative;
	}
	@media print {
		.printContent{
			display: block;
		}
	}
	.hidden{
		display: none !important;  
	}
	.bigTitle{
		width: 100%;
		height: 60pt;
	}
	.bigTitle>view{
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		line-height: 50px;
		box-sizing: border-box; 
		color: #333;
	}
	.printTime{
		width: 100%;
		position: absolute;
		bottom: 5pt;
		right: 10pt;
	}
</style>
