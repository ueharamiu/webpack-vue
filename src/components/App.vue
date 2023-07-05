<script setup>
	import { ref } from 'vue'; //ref を読み込み

	const newTodo = ref( '' )
	const todos = ref( [] )

	const addTodo = () => {
		todos.value.push(newTodo.value)
	}
</script>

<template>
	<input type="text" v-model="newTodo"> <!-- v-model に newTodo を定義 -->
	<button v-on:click="addTodo()">追加</button>
	<ul>
		<li v-for="(todo, i) in todos" v-bind:key="i">{{ todo }}</li>
	</ul>
</template>

