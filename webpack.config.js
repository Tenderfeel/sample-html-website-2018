import path from 'path'

export default {
  mode: process.env.NODE_ENV !== 'production' ? 'development': 'production',
  entry: {
    'bundle': './src/assets/js/main.js',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\//,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src/js")
    ],
    extensions: [".js", ".json"],
    alias: {
      '@': path.resolve(__dirname, "src/js")
    }
  }
}
