const path = require('path');  // 노드에서 path를 가져옴
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'word-relay-setting', // 필수 아님 이름짓는 용도
  mode: 'development', // 실배포일 경우 production
  devtool: 'eval', // 빠르게 개발 하겠다는 뜻
  resolve: {
    extensions: [  // 입력받을 파일의 종류
      '.js',
      '.jsx'
    ]
  },

  // 여기부터 중요함
  entry: {  // 입력
    app: [
      './client',
    ]
  },
  module: { // entry로 입력 받은 파일 해석에 대한 룰
    rules: [{
      test: /\.jsx?$/, // .js와 .jsx파일에 대해서
      loader: 'babel-loader', // 바벨로더로 로드하겠다
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['> 5% in KR', 'last 2 chrome versions'], // 지원하고자 하는 브라우저
              },
              debug: true,
            }
          ], 
          '@babel/preset-react'
        ],
        plugins: [
          'react-refresh/babel'
        ],
      }
    }]
  },
  plugins: [
    new RefreshWebpackPlugin(),
  ],
  output: {  // 출력
    path: path.join(__dirname, 'dist'), // 현재 폴더 안에 있는 dist 폴더를 의미
    filename: 'app.js',
    publicPath: '/dist'
  },
  devServer: {
    devMiddleware: { publicPath: '/dist' }, // 웹팩이 번들링 빌드한 파일들이 위치하는 곳 (웹팩이 생성하는 파일 경로)
    static: { directory: path.resolve(__dirname) }, // 정적파일인 index.html이 존재하는 파일 경로 (실제 존재하는 파일 경로)
    hot: true,
  }
};