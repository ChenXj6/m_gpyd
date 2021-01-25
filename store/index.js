import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		hasLogin:uni.getStorageSync('hasLogin'),
		userName:uni.getStorageSync('userName'),
		url:'http://cp.xmgpzx.com/logistics/',
		// url:'https://cp.gpyd.cn/logistics/',
		imgUrl:'http://cp.xmgpzx.com/upload/',
		// imgUrl:'http://cp.gpyd.cn/upload/',
		type:uni.getStorageSync('type'),
		house_id:uni.getStorageSync('house_id'),
		user_id:uni.getStorageSync('user_id'),
	},
	mutations: {
		login(state, userName) {
			state.userName = userName;
			state.hasLogin = true;			
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		setType(state,data){
			state.type = data.type;
			state.house_id = data.house_id;
			state.userName = data.userName;
			state.hasLogin = true;
			state.user_id = data.user_id
		},
	},
	actions:{
		setType({commit},data){
			return new Promise(resolve=>{
				commit('setType',data)
				uni.setStorageSync('house_id',data.house_id);
				uni.setStorageSync('type',data.type);
				uni.setStorageSync('userName', data.userName);
				uni.setStorageSync('hasLogin',"true");
				uni.setStorageSync('user_id',data.user_id);
				resolve()
			})
		},
		login({commit},userName){
			commit('login',userName)
			// uni.setStorageSync('userName',userName);
		},
		logout({commit}){
			return new Promise(resolve=>{
				commit('logout')
				uni.setStorageSync('type',"");
				uni.setStorageSync('house_id',"");
				uni.setStorageSync('userName', "");
				uni.setStorageSync('hasLogin',"false");
				uni.setStorageSync('user_id',"");
				resolve()
			})
		}
	}
})

export default store
