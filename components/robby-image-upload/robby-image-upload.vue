<template>
	<view class="imageUploadContainer">
		<view class="imageUploadList">
			<view class="imageItem" v-bind:key="index" v-for="(path,index) in imageListData">
				<image :src=" $store.state.imgUrl + path.receive_path" :class="{'dragging':isDragging(index)}" draggable="true" :data-index="index" @touchstart="start" @touchmove.stop.prevent="move" @touchend="stop"></image>
				<view v-if="isShowDel" class="imageDel" @tap="deleteImage" :data-index="index">x</view>
			</view>
			<view v-if="isShowAdd" class="imageUpload" @tap="selectImage">+</view>
		</view>
		<image v-if="showMoveImage" class="moveImage" :style="{left:posMoveImageLeft, top:posMoveImageTop}" :src="moveImagePath.tempFilePaths"></image>
	</view>
</template>

<script>
	export default {
		name:'robby-image-upload',
		props: ['value','enableDel','enableAdd','enableDrag','serverUrl','formData','header', 'limit','fileKeyName','showUploadProgress','serverUrlDeleteImage'],
		data() {
			return {
				imageBasePos:{
					x0: -1,
					y0: -1,
					w:-1,
					h:-1,
				},
				showMoveImage: false,
				moveImagePath: '',
				moveLeft: 0,
				moveTop: 0,
				deltaLeft: 0,
				deltaTop: 0,
				dragIndex: null,
				targetImageIndex: null,
				imageList: [],
				isDestroyed: false
			}
		}, 
		mounted: function(){
			this.imageList = this.value
			if(this.showUploadProgress === false){
				this.showUploadProgress = false
			}else{
				this.showUploadProgress = true
			}
		},
		destroyed: function(){
			this.isDestroyed = true
		},
		computed:{
			imageListData: function(){
				if(this.value){
					return this.value
				}
			},
			posMoveImageLeft: function(){ 
				return this.moveLeft + 'px'
			},
			posMoveImageTop: function(){
				return this.moveTop + 'px'
			},
			isShowDel: function(){
				if(this.enableDel === false){
					return false
				}else{
					return true
				}
			},
			isShowAdd: function(){
				if(this.enableAdd === false){
					return false
				}
				
				if(this.limit && this.imageList.length >= this.limit){
					return false
				}
				
				return true
			},
			isDragable: function(){
				if(this.enableDrag === false){
					return false
				}else{
					return true
				}
			}
		},
		methods:{
			selectImage: function(){
				var _self = this
				if(!_self.imageList){
					_self.imageList = []
				}
				uni.chooseImage({
					count: _self.limit ? (_self.limit - _self.imageList.length) : 999,
					success: function(e){
						var imagePathArr = {}
						imagePathArr.tempFilePaths  = e.tempFilePaths[0]
						imagePathArr.filePath  = e.tempFiles[0].name || e.tempFilePaths[0]
						imagePathArr.type = e.tempFiles[0].type || ''
						// 图片格式
						if(imagePathArr.type != "image/jpeg"){
							if(imagePathArr.type != "image/jpg"){
								if(imagePathArr.type != "image/png"){
									if(imagePathArr.type != "image/png"){
										if(imagePathArr.type != ""){
												uni.showToast({
													title: '请选择正确的图片格式',
													icon:'none',
													mask: false,
												});
												return
										}
									}
								}
							}
						}	
						//检查服务器地址是否设置，设置即表示图片要上传到服务器
						if(_self.serverUrl){
							var file = e.tempFiles[0]
							var promiseWorkList = new Promise((resolve, reject)=>{
								uni.uploadFile({
									url:_self.serverUrl,
									fileType: 'image',
									header: _self.header,
									file:file,
									formData:_self.formData,
									filePath: imagePathArr.filePath, 
									name:'file',
									success: function(res){
										if(res.statusCode === 200){
											resolve(res.data)
										}else{
											reject(res.data)
										}
									},
									fail: function(res){
										reject(res.data)
									}
								})
							})
							Promise.all([promiseWorkList]).then((result)=>{
								result = JSON.parse(result[0])
								let code = result.code;
								if(code == 1){
									uni.showToast({
										title:'签收单上传成功',
										icon:'success'
									})
									_self.imageList.push(result.data)
									_self.$emit('add', {
										allImages: _self.imageList
									})
									_self.$emit('input', _self.imageList)
								}else{
									uni.showToast({
										title:result.msg,
										icon:'none'
									})
								}
							})
						}
					}
				})
			},
			deleteImage: function(e){
				var imageIndex = e.currentTarget.dataset.index
				var deletedImagePath = this.imageList[imageIndex]
				this.imageList.splice(imageIndex, 1) 
				this.$emit('delete',{
					currentImage: deletedImagePath,
					allImages: this.imageList
				})
				this.$emit('input', this.imageList)
			},
			initImageBasePos: function(){
				let paddingRate = 0.024
				var _self = this
				//计算图片基准位置
				uni.getSystemInfo({
					success: function(obj) {
						let screenWidth = obj.screenWidth
						let leftPadding = Math.ceil(paddingRate * screenWidth)
						let imageWidth = Math.ceil((screenWidth - 2*leftPadding)/4)
						
						_self.imageBasePos.x0 = leftPadding
						_self.imageBasePos.w = imageWidth
						_self.imageBasePos.h = imageWidth
					}
				})
			},
			findOverlapImage: function(posX, posY){
				let rows = Math.floor((posX-this.imageBasePos.x0)/this.imageBasePos.w)
				let cols = Math.floor((posY-this.imageBasePos.y0)/this.imageBasePos.h)
				let indx = cols*4 + rows
				return indx
			},
			isDragging: function(indx){
				return this.dragIndex === indx
			},
			start: function(e){
				if(!this.isDragable){
					return
				}
				this.dragIndex = e.currentTarget.dataset.index
				this.moveImagePath = this.imageList[this.dragIndex]
				this.showMoveImage = true
				
				//计算纵向图片基准位置
				if(this.imageBasePos.y0 === -1){
					this.initImageBasePos()
					
					let basePosY = Math.floor(this.dragIndex / 4) * this.imageBasePos.h
					let currentImageOffsetTop = e.currentTarget.offsetTop
					this.imageBasePos.y0 = currentImageOffsetTop - basePosY
				}
				
				//设置选中图片当前左上角的坐标
				this.moveLeft = e.target.offsetLeft
				this.moveTop = e.target.offsetTop
			},
			move: function(e){
				if(!this.isDragable){
					return
				}
				const touch = e.touches[0]
				this.targetImageIndex = this.findOverlapImage(touch.clientX, touch.clientY)
				
				//初始化deltaLeft/deltaTop
				if(this.deltaLeft === 0){
					this.deltaLeft = touch.clientX - this.moveLeft
					this.deltaTop = touch.clientY - this.moveTop 
				}
				
				//设置移动图片位置
				this.moveLeft = touch.clientX - this.deltaLeft
				this.moveTop = touch.clientY - this.deltaTop
			},
			stop: function(e){
				if(!this.isDragable){
					return
				}
				if(this.dragIndex !== null && this.targetImageIndex !== null){
					if(this.targetImageIndex<0){
						this.targetImageIndex = 0
					}
				
					if(this.targetImageIndex>=this.imageList.length){
						this.targetImageIndex = this.imageList.length-1
					}
					//交换图片
					if(this.dragIndex !== this.targetImageIndex){
						this.imageList[this.dragIndex] = this.imageList[this.targetImageIndex]
						this.imageList[this.targetImageIndex] = this.moveImagePath
					}
				}
				
				this.dragIndex = null
				this.targetImageIndex = null
				this.deltaLeft = 0
				this.deltaTop = 0
				this.showMoveImage = false
				this.$emit('input', this.imageList)
			}
		}
	}
</script>

<style>
	.imageUploadContainer{
		padding: 10upx 5upx;
		margin: 10upx 5upx;
	}
	
	.dragging{
		transform: scale(1.2)
	}
	
	.imageUploadList{
		display: flex;
		flex-wrap: wrap;
	}
	
	.imageItem, .imageUpload{
		width: 160upx;
		height: 160upx;
		margin: 10upx;
	}
	
	.imageDel{
		position: relative;
		left: 120upx;
		bottom: 165upx;
		background-color: rgba(0,0,0,0.5);
		width: 36upx;
		text-align: center;
		line-height: 35upx;
		border-radius: 17upx;
		color: white;
		font-size: 30upx;
		padding-bottom: 2upx;
	}
	
	.imageItem image, .moveImage{
		width: 160upx;
		height: 160upx;
		border-radius: 8upx;
	}
	
	.imageUpload{
		line-height: 130upx;
		text-align: center;
		font-size: 150upx;
		color: #D9D9D9;
		border: 1px solid #D9D9D9;
		border-radius: 8upx;
	}
	
	.moveImage{
		position: absolute;
	}
</style>