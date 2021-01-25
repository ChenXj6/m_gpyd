<template>
	<view class="content">
		<view class="imgBox">
			<image src="../../static/img/userHL.png" mode="" class="img"></image>
			<view class="username">
				<text>hi! &nbsp;{{userName}}</text>
			</view>
		</view>
<!-- 		<view class="userBox">
			<view class="uni-list-cell uni-list-cell-pd">
			    <view class="uni-list-cell-db">开启中</view>
			</view>
		</view> -->
		<view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState(['hasLogin','userName'])
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.$store.dispatch('logout').then(()=>{
					uni.reLaunch({
						url: '../login/login',
					});
				})
			}
		}
	}
</script>

<style scoped>
	.imgBox{
		width: 100%;
		height: 35%;
		padding: 1%;
		box-sizing: border-box;
		margin-bottom: 5%;
	}
	.imgBox>.img{
		display: block;
		width: 100px;
		height: 100px;
		margin: 0 auto;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	.imgBox>.username{
		width: 200px;
		height: 20px;
		position: relative;
		left: 50%;
		bottom: -50%;
		transform: translate( -50%,-150%);
		text-align: center;
	}
	.userBox{
		width: 96%;
		height: 200px;
		background-color: #FFFFFF;
		margin:  0 2%;
		/* padding: %; */
		border: 1px solid rgba(0,0,0,.2);
		box-sizing: border-box;
	}
</style>
