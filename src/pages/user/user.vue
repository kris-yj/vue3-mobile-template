<template>
	<div class="parent">
		<div class="child">user 测试view {{ state.count }}</div>
		<van-button type="primary" @click="increment">主要按钮</van-button>
	</div>
</template>

<script setup>
import { reactive } from 'vue';
import { Button as vanButton } from 'vant';
// import Api from '@/api';

const state = reactive({ count: 0 });

function increment() {
	state.count++;
}
</script>

<style>
.parent {
	.child {
		color: var(--van-primary-color);
		font-size: 16px;
	}
}
</style>
