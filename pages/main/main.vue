<template>
	<!-- <plus-network :isConnected="isConnected"> -->
	<view class="container999">
		<view class='nav'>
			<!-- 搜索 -->
			<view class="search">
				<view class='changeSearch'>
				  <picker @change="examinationType" :range="candidates" class="changeStype">
					  <label class="" style="font-size: 32rpx;">{{ examinationTypeArrayType == ''? '订单号' : examinationTypeArrayType}}</label>
				  </picker>
					<!-- <uni-combox :candidates="candidates" placeholder="订单号" v-model="search_type" style="color:#fff;background-color: #FFFFFF;border-radius:30upx;height: 30px;margin-top: 8px;padding-left: 10%;"></uni-combox> -->
				</view>
				<view class='searchInput999'>
					<view class='searchBox999'>
						<image src='/static/icon-search.png' class='search999'></image>
					</view>
					<input class='input999' placeholder="请输入订单号或手机号码" v-model="search"></input>
					<text  style="width:20%;font-size: 28rpx;border:0;color: #777;line-height: 55rpx;border-left:1px solid #f6f6f6 ;box-sizing: border-box;height: 100%;text-align: center;" @click="searchOrder">搜索</text>
				</view>
			</view>
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" v-if="$store.state.type == 2" :tabTitle="['全部','已发货','配送中','确认收货']" @changeTab='changeTab'></navTab>
			<navTab ref="navTab" v-else :tabTitle="['全部','未发货','已发货','配送中','确认收货']" @changeTab='changeTab'></navTab>
		</view>
		

		<view class='content' >
			<view class='card' v-for="(item,index) in list" :key="index"  v-if="list.length > 0" >
				<view class="orderTitle">
					<view>订单号:&nbsp;<text style="margin-left: 10px;">{{item.ordernum}}</text> </view>
					<uni-tag v-if="item.logistics_status == 0" :text="item.logistics_status | status(item.logistics_status)" type="error" size="small" class="tag"></uni-tag>
					<uni-tag v-if="item.logistics_status == 1" :text="item.logistics_status | status(item.logistics_status)" type="warning" size="small" class="tag"></uni-tag>
					<uni-tag v-if="item.logistics_status == 3" :text="item.logistics_status | status(item.logistics_status)" type="primary" size="small" class="tag"></uni-tag>
					<uni-tag v-if="item.logistics_status == 2" :text="item.logistics_status | status(item.logistics_status)" type="success" size="small" class="tag"></uni-tag>
				</view>
					<view class="orderBox" @click="detail(item)">
						<view class="orderNumBox" v-if="item.delivery_method == 2">
							<text>收货人姓名：</text>
							<text style="color:black;">{{item.user_name}}</text>
						</view>
						<view class="orderNumBox" v-else>
							<text>收货人姓名：</text>
							<text style="color:black;">{{item.contact_name}}</text>
						</view>
						<view class="orderNumBox">
							<text>商品总价：</text>
							<text style="color:#f80;">{{item.total_price}}&nbsp;元</text>
						</view>
						<view class="orderNumBox">
							<text>发票价格：</text>
							<text style="color:#f80;">{{item.invoice_price}}&nbsp;元</text>
						</view>
						<view class="orderNumBox">
							<text>优惠券：</text>
							<text >{{item.discounts}}&nbsp;元</text>
						</view>
						<view class="orderNumBox" v-if="item.delivery_method == 1">
							<text>运费：</text>
							<text>{{item.freight}}&nbsp;元</text> 
						</view>
						<view class="orderNumBox">
							<text>货运方式：</text>
							<text>{{item.delivery_method | deliverMethod(item.delivery_method)}}</text> 
						</view>
						<view class="orderNumBox">
							<text>实付款：</text>
							<text style="color:red;font-size: 30rpx;">{{item.pay_money}}&nbsp;元</text>
						</view>
					</view>
					<view class="foot">
						<view class="orderNumBox">
							<text>付款方式：</text>
							<text>{{item.mode_payment | pay_method(item.mode_payment)}}</text>
						</view>
						<view class="orderNumBox" v-if="item.delivery_method == 2">
							<text>联系方式：</text>
							<text>{{item.mobile}}</text>
						</view>
						<view class="orderNumBox" v-else>
							<text>联系方式：</text>
							<text>{{item.contact_mobile}}</text>
						</view>
					</view>
			</view>
			<view class='noCard' v-if="list.length===0">
				暂无此类订单
			</view>
		</view>	
		
	</view>
	<!-- </plus-network> -->
</template>

<script>
const util = require('../../util/util.js');
import navTab from '../../components/navTab.vue';
import makeSign from '../../util/sign.js';
import md5 from 'js-md5';
import uniTag from "@/components/uni-tag/uni-tag.vue"
import uniCombox from "@/components/uni-combox/uni-combox"

import { mapState } from 'vuex'
export default {
	components: {navTab,uniTag,uniCombox},
	computed: mapState(['hasLogin', 'userName']),
	data() {
		return {
			list:[],
			logistics_status:99,
			search_type:1,
			search:'',
			candidates:['订单号','手机号'],
			examinationTypeArrayType:'',
			currentPage:1,
			limit:10,
			// 
			// isConnected:true,
			flag:true
		}
	},
	onShow() {
		if (!this.hasLogin) {
			uni.showModal({
				title: '提示',
				content: '您未登录，需要登录后才能继续哦~',
				showCancel: false,
				success: (res) => {
					uni.redirectTo({
						url: '../login/login'
					});
				}
			});
		}else{
			this.getExampleData(1)
		}
	},
	methods: {
		detail(data){
			uni.setStorageSync('order_id',data.id);
			uni.setStorageSync('lStatus',data.logistics_status);
			uni.setStorageSync('pay_money',data.pay_money);
			uni.setStorageSync('delivery_method',data.delivery_method);
			uni.setStorageSync('create_time',data.create_time);
			uni.setStorageSync('delivery_money',data.freight);
			uni.setStorageSync('address',data.province+data.city+data.district+data.address);
			uni.setStorageSync('orderN',data.ordernum);
			uni.setStorageSync('consign',data.user_name);
			uni.setStorageSync('discounts',data.discounts);
			uni.setStorageSync('invoice_price',data.invoice_price);
			uni.setStorageSync('phone',data.contact_mobile || data.mobile);
			uni.navigateTo({
				url: '../detail/detail'
			})
		},
		//搜索分類查詢
		examinationType(e) {
			let index = e.target.value;
			this.examinationTypeArrayType = this.candidates[index]
			if(this.examinationTypeArrayType == '订单号'){
				this.search_type = 1;
			}else{
				this.search_type = 2;
			}
		},
		// 搜索框
		searchOrder(){
			if(this.search == ''){
				uni.showToast({
					title:'请输入订单号或手机号搜索',
					icon:"none"
				})
				return
			}
			if(this.search_type == 1){
				let result = RegExp(/^[0-9]*$/).test(this.search);
				if(result){
					this.getExampleData(1)
				}else{
					uni.showToast({
						title:'请输入正确格式的订单号',
						icon:"none"
					})
					return
				}
			}else{
				let result = RegExp(/^1[34578]\d{9}$/).test(this.search);
				if(result){
					this.getExampleData(1)
				}else{
					uni.showToast({
						title:'请输入正确格式的手机号',
						icon:"none"
					})
					return
				}
			}
		},
		// 导航栏切换
		changeTab(index){
			if(this.$store.state.type == 1){
				if(index == 4){
					this.logistics_status = 2
				}else if(index == 3){
					this.logistics_status = 3
				}else if(index == 2){
					this.logistics_status = 1
				}else if(index == 1){
					this.logistics_status = 0
				}else{
					this.logistics_status = 99
				}
			}else{
				if(index == 3){
					this.logistics_status = 2
				}else if(index == 2){
					this.logistics_status = 3
				}else if(index == 0){
					this.logistics_status = 99
				}else{
					this.logistics_status = 1
				}			
			}
			this.getExampleData(1);
		},
		// 请求数据事件 
		isRequest() {
			return new Promise(resolve=>{
				let user_id = this.$store.state.user_id;
				let house_id = this.$store.state.house_id;
				let type = this.$store.state.type;
				let search_type = this.search_type;
				let search = this.search;
				let limit = this.limit;
				let page = this.currentPage;
				let timestamp = Date.parse(new Date())/1000;
				let logistics_status = this.logistics_status;
				let sign = md5(makeSign.makeSign({page,limit,search,search_type,user_id,house_id,type,timestamp,logistics_status}));
				uni.request({
					url:this.$store.state.url + 'orderlist/orderList',
					data:{page,limit,search,search_type,sign,user_id,house_id,type,timestamp,logistics_status},
					method:"post",
					success:(res)=>{
						let data = res.data
						if(data.code == 1){
							resolve(data.data)
						}else{
							resolve(data.data)
						}
					},
					fail:(res)=>{
						return
					},
				})
			})
		},
		// 上拉 下拉 回调函数 type == 1 下拉刷新   & type == 2 上拉加載更多
		getExampleData(type){
			return new Promise((resolve)=>{
				let that = this
				that.isRequest().then(res=>{
					if(res.length>0 && res != ''){
						if(type == 1){
							that.list = res;
						}
						else if(type==2){
							that.list = that.list.concat(res)
						}
						resolve(res)
					}else{
						if(type==1){
							that.list = [];
						}
						else if(type==2){
							that.currentPage--;
						}
						resolve()
					}
				})
			})
		},
	},
	// 下拉
	onPullDownRefresh(){
		this.currentPage = 1;
		this.getExampleData(1).then(()=>{
			setTimeout(function(){
				uni.stopPullDownRefresh();
				uni.showToast({
					title:'刷新成功',
					icon:'success'
				})
			},300)
		})
	},
	// 上拉
	onReachBottom(){
		if(this.flag){
			this.currentPage ++;
			this.getExampleData(2).then((res)=>{
				if(res.length < this.limit){
					this.flag = false
				}else{
					this.flag = true
				}
			})
		}else{
			uni.showToast({
				title:'没有数据啦',
				icon:'none'
			})
		}
	},
	watch:{
		search(val){
			if(val == ''){
				this.getExampleData(1)
			}
		},
		logistics_status(){
			this.currentPage = 1;
			this.flag = true;
			this.getExampleData(1)
		}
		
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
		  } else if(val == 3){
			return val = "配送中"
		  }else{
			 return val = "确认收货"
		  }
		},
		deliverMethod(val){
		  if (val == 1) {
			return val = "货运"
		  } else{
			 return val = "自提"
		  }
		}
	}
};
</script>

<style lang="scss">
	.container999 {
	  width: 100vw;
	  font-size: 28upx;
	  min-height: 100vh;
	  overflow: hidden;
	  color: #6B8082;
	  position: relative;
	  background-color: #f6f6f6;
	  height: 100%;
	}
	.card {
		width: 90%;
		height: auto;
		background-color: white;
		margin: 0 auto 42upx auto;
		background: #FFFFFF;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.10);
		border-radius: 5px;
		position: relative;
		padding: 10px;
	}

	
	.noCard {
		width: 90%;
		height: 200upx;
		margin: auto;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999999;
		box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
		border-radius: 10upx;
	}
	
	
	.nav {
		position: fixed;
		left: 0;
		top: 0;
		height:auto;
		color: white;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		font-size: 24upx;
		background-color: #50B7EA;
		z-index: 996;
	}
	.search{
		width: 100%;
		height: 40px;
		margin-top: 44px;
		padding: 0 4%;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	.changeStype{
		margin-top: 8px;
	}
	.changeSearch{
		width: 15%;
		height: 30px;
		text-align: center;
		line-height: 30px;
	}
	.searchInput999 {
		width: 85%;
		background: white;
		border-radius: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 56upx;
		margin: 8px 0;
	}
	
	.search999 {
		width: 32upx;
		height: 32upx;
	}
	
	.searchBox999 {
		width: 56upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 3% 0 2%;
		border-right: 1px solid #f5f5f5;
	}
	.container999>.content{
		margin-top:calc(100% - 78%);
		margin-top:-moz-calc(100% - 78%); 
		margin-top:-webkit-calc(100% - 78%); 
	}
	
	.input999 {
		color: #999;
		width: 100%;
	}
	.card .orderTitle{
		width: 100%;
		height: 44rpx;
		border-bottom: 1px solid #f5f5f5;
	}
	.tag{
		width: auto;
		height: auto;
		position: absolute;
		top: 12rpx;
		right: 12rpx;
	}
	.orderBox{
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: column ;
		justify-content: space-around;
	}
	.orderNumBox{
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
	}
	.foot{
		border-top: 1px dashed #999;
		padding: 3% 0 0;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		height: 81%;
	}
</style>
