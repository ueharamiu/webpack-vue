const MODE = "development";
const enabledSourceMap = MODE === "development"; // ソースマップの利用有無(productionのときはソースマップを利用しない)

const path = require('path'); // ファイル出力時の絶対パス指定に使用

// プラグイン
const TerserPlugin = require('terser-webpack-plugin'); // js最適化
const { VueLoaderPlugin } = require("vue-loader");


module.exports = {
	entry: './src/js/index.js', // エントリーポイント(メインのjsファイル)

	// ファイルの出力設定
	output: {
		path: path.resolve(__dirname, 'dist/js'), // 出力先(絶対パスでの指定必須)
		filename: "main.js" // 出力ファイル名
	},
	mode: MODE,

	devtool: 'inline-source-map', // ソースマップ有効

	// ローダーの設定
	module: {
		rules: [
		{
			test: /\.css$/,
			use: [
				"style-loader", //必ずstyle-loaderを先に記述
				"css-loader"
			]
		},
		{
			test: /\.vue$/,
			loader: "vue-loader"
		},
		{
			test: /\.js$/, // ローダーの対象 // 拡張子 .js の場合
			exclude: /node_modules/, // ローダーの処理対象から外すディレクトリ
			loader: "babel-loader", // Babel を利用

			// Babel のオプションを指定
			options: {
				presets: [
					"@babel/preset-env" // プリセットを指定することで、ES2019 を ES5 に変換
				]
			}
		}
		]
	},

	plugins: [
		new VueLoaderPlugin() // Vueを読み込み
	],

	// 開発サーバーの立ち上げを指定
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'), // サーバーの起点ディレクトリ
		},
	}
};