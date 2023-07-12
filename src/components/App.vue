<script setup>
	import { ref } from 'vue'; //ref を読み込み

	const newComment = ref( '' )
	const element = ref( [] ) // element という配列を準備
	const select = ref( [
		{ value: -1, label: '全性癖' },
		{ value: 0, label: '攻め' },
		{ value: 1, label: '受け' }
	],
		{ initial: -1 }
	)

	const changeButton = () => {
		attribute.topbottom = attribute.topbottom ? 0 : 1
	}

	const addComment = () => { // addComment アクションを定義
		element.value.push( newComment.value ) // push メソッドを用いて newComment の内容を追加
		newComment.value = ''
	}


</script>

<template>
	<h1>攻め受け属性分けリスト</h1>
	<label v-for="label in select">
		<input type="radio"
		v-model="initial"
		v-bind:value="label.value">{{ label.label }}
	</label>
	<table>
		<thead>
			<tr>
				<th class="number">番号</th>
				<th class="propensity">性癖</th>
				<th class="topbottom">攻めか受けか</th>
				<th class="button">-</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(attribute, i) in element" v-bind:key="attribute">
				<th>{{ i }}</th>
				<td>{{ attribute }}</td>
				<td class="topbottom">
					<button v-on:click="changeButton()">
						{{ attribute.topbottom }}
					</button>
				</td>
				<td class="button">
					<button>
						削除
					</button>
				</td>
			</tr>
		</tbody>
	</table>

	<h2>個人の意見を追加</h2>
	<input type="text" v-model="newComment" > <!-- v-model に newComment を定義 -->
	<button v-on:click="addComment()">追加</button> <!-- v-on ディレクティブをクリックすると addComment イベントが発生-->

	<!-- <ul v-if="element.length > 0"> -->
		<!-- <li v-for="(attribute, i) in element" v-bind:key="i">  element の内容を1件取り出し、 attribute に格納する-->
			<!-- {{ attribute }}
		</li>  -->
	<!-- </ul>
	<p v-else>※性癖を追加してください</p> -->
</template>




