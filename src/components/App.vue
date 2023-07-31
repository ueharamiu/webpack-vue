<script setup>
	import { ref, reactive } from 'vue'; //ref と reactive を読み込み

	const newComment = ref( '' );
	const json_element = localStorage.getItem( 'element' ); // localStorage から element を取得し、 json_element へ代入
	const _element = json_element ? JSON.parse( json_element ) : []; //
	const element = ref( _element ); // _element を element へ代入
	const Select = reactive( [
		{ value: -1, like: '全性癖' }, // Select[0]
		{ value: 0, like: '攻め' }, // Select[1]
		{ value: 1, like: '受け' } // Select[2]
	]);

	let selectedValue = ref( Select[0].like ); // Select[0] の like プロパティ（'全性癖'）を取得

	// 性癖を追加
	const getList = () => {
		if( selectedValue.value === '全性癖' ) { // selectedValue が「全性癖」と同じである場合
			return element.value; // element を返す
		}
		else { // 「全性癖」以外（「攻め」「受け」）
			const found = element.value.filter( e => e.like === selectedValue.value ); // element の中から like と selectedValue が同じデータを取得し found へ代入
			return found; // found を返す
		}
	};

	// 「攻め」「受け」切り替えボタン
	const changeButton = ( text ) => { // changeButton 関数を定義。引数として text を受け取る
		const index = element.value.findIndex( e => e.text === text ); // element 内の text と一致するインデックス番号を探し、 index へ代入
		if( element.value[index].like == '受け' ) { // like が「受け」だった場合
			element.value[index].like = '攻め'; // 「攻め」に変更
		}
		else { // like が「受け」以外の場合
			element.value[index].like = '受け'; // 「受け」に変更
		}
		localStorage.setItem( 'element', JSON.stringify( element.value, undefined, 1 ) );
	};

	// 削除ボタン
	const RemoveButton = ( text ) => { // RemoveButton を定義。引数として text を受け取る
		const index = element.value.findIndex( e => e.text === text );
		element.value.splice( index, 1 ); // splice メソッドを用いて element 内の指定された index から1つ要素を削除する
		localStorage.setItem( 'element', JSON.stringify( element.value, undefined, 1 ) );
	};

	// リスト追加
	const addComment = () => { // addComment アクションを定義
		const result = element.value.filter( elm => elm.text == newComment.value ); // element 配列の中から newComment と一致する text プロパティを持つ要素のみを取得し、 result という新しい配列へ格納
		if( !result.length ) { // 既存のリストに同じ性癖がない場合
			element.value.push( {text: newComment.value, like: '攻め'} ); // push メソッドを用いて newComment の内容を追加。性癖ボタンの初期値は「攻め」
			newComment.value = '';
			localStorage.setItem( 'element', JSON.stringify( element.value, undefined, 1 ) );
		}
		else { // 既存のリストに同じ性癖がある場合
			alert( '既に同じ性癖があります' ); // 「既に同じ性癖があります」というアラートを表示
			newComment.value = ''; // 入力欄を空にする
		}
	};
</script>

<template>
	<h1>攻め受け属性分けリスト</h1>
	<label v-for="like in Select" v-bind:key="like.value">
		<input
			type="radio"
			v-model="selectedValue"
			v-bind:value="like.like"
		>{{ like.like }}
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
			<tr v-for="(attribute, i) in getList()" v-bind:key="i">
				<th>{{ i + 1 }}</th>
				<td>{{ attribute.text }}</td>
				<td class="topbottom">
					<button v-on:click="changeButton( attribute.text )"> <!-- ボタンクリックで changeButton() メソッド実行-->
						{{ attribute.like }}
					</button>
				</td>
				<td class="remove">
					<button v-on:click="RemoveButton( attribute.text )"> <!-- ボタンクリックで RemoveButton() メソッド実行-->
						削除
					</button>
				</td>
			</tr>
		</tbody>
	</table>

	<h2>性癖を追加</h2>
	<form v-on:submit.prevent="addComment()"> <!-- v-on ディレクティブをクリックすると addComment イベントが発生-->
		<input type="text" v-model="newComment"> <!-- v-model に newComment を定義 -->
		<button type="submit">追加</button>
	</form>

</template>




