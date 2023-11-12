# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## 目录结构
> 参考 
├── public # 公共静态资源目录
│ ├── favicon.ico # 网站图标
│ ├── index.html # 主页面
│ ├── logo192.png # app图标
│ ├── logo512.png # app图标
│ ├── manifest.json # app配置文件
│ └── robots.txt # 网站跟爬虫间的协议
├── src # 主目录
│ ├── api # 接口文件
│ ├── app # redux配置文件
│ ├── components # 公共组件
│ │ ├── Loading # loading组件
│ │ ├── Redirect # 重定向组件
│ │ └── withAuthorization # 权限认证组件
│ ├── layouts # 主要布局组件
│ ├── locales # i18n国际化配置
│ ├── pages # 路由组件
│ ├── routes # 路由配置
│ ├── styles # 全局/公共样式
│ ├── utils # 工具函数
│ │ └── http # 封装请求函数
│ ├── App.tsx # App组件
│ ├── index.ts # 主入口
│ ├── react-app-env.d.ts # 类型文件，在编译时会引入额外文件
│ ├── reportWebVitals.ts # 基于Google的网站性能分析文件
│ └── setupTests.ts # 安装测试
├── .env.development # 开发环境加载的环境变量配置
├── .env.production # 生产环境加载的环境变量配置
├── .gitignore # git忽略文件
├── craco.config.js # react脚手架配置文件
├── package.json # 包文件
├── README.MD # 项目说明文件
├── tsconfig.extend.json # 路径别名配置文件
├── tsconfig.json # ts配置文件
└── yarn.lock # yarn下载包的缓存文件

>配置
> * package.json  
>   * "homepage": "https://z199172177.github.io/react-gh-pages"
> * routerList.tsx
>   * <Routes><Route path="/react-gh-pages/" element={<PFDataList />} /><Route path="/react-gh-pages/PFDataList" element={<PFDataList />} /></Routes>

## 命令
* 创建项目：npx create-react-app react-gh-pages --template typescript
* ghpage: npm install gh-pages --save-dev
  * https://www.xiaoqiang.tech/2021/03/03/%E5%B0%86React%20APP%E9%83%A8%E7%BD%B2%E5%88%B0GitHub%20Pages/
* antd: npm install antd --save
* axios: npm install axios 
* 路由：npm install react-router-dom
* 代码高亮：npm install react-syntax-highlighter --save
* 图表：npm install @ant-design/charts --save
