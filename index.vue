<template>
    <view class="s-page-wrapper">
        <plus-network :isConnected="isConnected">
        	你的内容！！！
		</plus-network>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				isConnected:true
			}
		},
		onShow(){
			uni.getNetworkType({
	            success: res => {
	                if (res.networkType == 'none') {
	                    this.isConnected = false;
	                } else {
	                    this.isConnected = true;
	                }
	            }
	        });
	        uni.onNetworkStatusChange(res => {
	            this.isConnected = res.isConnected;
	        });
		}
	}
</script>