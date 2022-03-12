<template>
	<div>user 测试view {{ state.count }}</div>
	<van-button type="primary" @click="increment">主要按钮</van-button>
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
