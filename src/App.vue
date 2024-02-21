<template>
	<div id="app">
		<div class="header">
			<div class="left-content" @click="logoClick">
				<!-- <img class="header-img" src="./assets/images/logo.png" /> -->
				<!-- <div class="company_name">LOGO HERE</div> -->
			</div>
			<div class="right-content">
				<div
					class="item"
					@click="handleSelect(1)"
					:class="[activeIndex === 1 ? 'item-active' : '']"
				>
					首页
				</div>
				<!-- <div class="item" @click="handleSelect(2)" :class="[activeIndex === 2 ? 'item-active' :'']">产品特色</div>
                <div class="item" @click="handleSelect(3)" :class="[activeIndex === 3 ? 'item-active' :'']">公司介绍</div>
                <div class="item" @click="handleSelect(4)" :class="[activeIndex === 4 ? 'item-active' :'']">联系我们</div> -->
			</div>
		</div>
		<div class="container">
			<router-view></router-view>
		</div>
		<!-- <div class="footer">
			<div class="footer-line"></div>
			<div class="filing-no">
				<a
					href="https://beian.miit.gov.cn/"
					target="_blank"
					style="text-decoration: none"
					>粤ICP备2022118046号-1</a
				>
			</div>
		</div> -->
		<div id="back_to_top" ref="btn" @click="backTop">
			<p style="font-size: 20px; font-weight: bold">TOP</p>
			<img
				src="./assets/images/launch.png"
				style="height: 50px; width: 40px"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			activeIndex: 1,
			timer: '',
		}
	},
	methods: {
		handleSelect(key) {
			this.activeIndex = key
			switch (key) {
				case 1:
					this.$router.push({ name: 'Home' })
					break
				// case 2:
				// 	window.location.hash = '#product'
				// 	break
				// case 3:
				// 	window.location.hash = '#about'
				// 	break
				// case 4:
				// 	window.location.hash = '#contact'
				// 	break
			}
		},
		backTop() {
			//当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部
			this.timer = setInterval(() => {
				let osTop =
					document.documentElement.scrollTop ||
					document.body.scrollTop
				let ispeed = Math.floor(-osTop / 5)
				document.documentElement.scrollTop = document.body.scrollTop =
					osTop + ispeed
				if (osTop === 0) {
					clearInterval(this.timer)
				}
			}, 30)
		},
		logoClick() {
			this.$router.push({ name: 'Home' })
		},
	},
}
</script>

<style scoped>
#back_to_top {
	position: fixed;
	bottom: 50px;
	right: 30px;
	cursor: pointer;
}
#app {
	position: relative;
	margin: auto;
	width: 1440px;
}
.header {
	position: absolute;
	width: 100%;
	height: 112px;
	display: flex;
	justify-content: space-between;
}
.header .header-img {
	width: 120px;
}
.header .left-content {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-left: 96px;
}

.header .left-content .company_name {
	color: #929fa6;
	font-size: 20px;
	font-weight: 600;
}
.header .right-content {
	height: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-right: 96px;
}
.header .right-content .item {
	cursor: pointer;
	text-align: center;
	width: 80px;
	margin-right: 40px;
	color: #bac0c3;
	font-size: 20px;
	font-weight: 600;
}
.header .right-content .item:nth-child(4) {
	margin-right: 0px;
}
.item-active {
	color: #1d3340 !important;
}
.footer {
	margin: 10px auto;
	width: 100%;
}
.footer .footer-line {
	background-color: #929fa6;
	height: 1px;
	width: 1345px;
	margin-left: 96px;
	margin-bottom: 30px;
}
.footer .filing-no {
	color: #929fa6;
	width: 100%;
	text-align: center;
	font-size: 16px;
	margin-bottom: 50px;
}
</style>
