import * as path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: {
    main: './src/index.ts',
    renderer: './src/render/main.ts',
    preload: './src/utils/preload.ts',
  },
  target: "electron-main",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "fs": false,
      "path": false
    },
    alias: {
      electron: path.resolve(__dirname, "node_modules/electron"),
    },
  },
  mode: 'development',
};

export default config;
