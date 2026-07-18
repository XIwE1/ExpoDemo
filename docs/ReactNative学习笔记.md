**选型：**
expo 比 rn原生创建更好，自带预览和热更新，expo go app可以查看程序效果（注意创建项目时 expo 的版本 是否与 expo go的版本对齐，否则无法预览）

通过AST将 跨语言代码编辑为原生移动端代码

**expo 快捷键:**
i a 打开ios 或 android 模拟器 shift + i、a 选择多个模拟器
r 热刷新
j 打开调试窗口
? 所有指令
摇一摇 打开内置菜单

**配置:**
`app.json` 配置文件
scheme唤醒协议 name应用名
ios.buildMachineName身份识别 icon
android adaptiveIcon package身份识别
expo-build-properties优化打包产物（比如只打包出较新的android64 useCleartextTraffic支持http请求）
expo-splash-screen启动图
`app.js` `index.js` 入口文件 使用expo router时删除
`assets` 目录 放静态文件
`eas.json` 打包配置 国内安卓要单独配置  
 （eas build --platform ios/android/all ; 打包前检查程序+npx expo doctor ; 可以在后台查看 生成证书）
eas submit
上架前需要备案，需要公钥和指纹信息 安卓jadx iosAppUploader
服务器厂商+自助备案
申请软件著作 - 中国版权登记业务平台 ； 部署隐私政策网站
`xx.ios.tsx` 可以同文件名 但使用ios自动使用对应组件

安卓生态联盟 （小米 应用宝 免费） 苹果开发者 688一年

小米云测试平台 可以白嫖安卓机测试

App图标 官方Figma模板 export

**指令&环境变量:**
EXPO_PUBLIC_XXX env文件里定义
.prettier.json 配置格式化 + package.json format指令
babel.config.js 配置 @ 识别为 src + babel-plugin-module-resolver，如果编辑器不识别 添加 jsconfig.json 配置 paths

创建 `npx create-expo-app@latest --template blank` 不加template等于default
启动 `npx expo start` （npx=node启动）
`npx expo install` 更新
`npx expo-doctor 检查依赖`

**样式：**
RN不同于html结构 有自己的标签，样式看着像CSS 其实是JS对象
style={styles.xx}
驼峰命名法
fontsize等不带px
自带flex column排序
style: [] 可以使用数组 后面添加的会覆盖前面的

**RN组件：**
优先使用expo内的组件

<Text> 文字内容 必须放到其中
<StatusBar> 状态栏 信号电量等 hidden时可以模拟全屏效果
<View> 布局
<TableView> 表格 或当表单

<TextInput> 输入框 onChangeText multiline
<ActivityIndicator> 加载
<Image> 图片

<FlatList> 长列表 虚拟列表 data renderItem，onEndReached触底回调 onEndReachedThreshold预加载阈值
ListHeaderComponent ListFooterComponent

<ScrollView> 滚动布局 一般最大容器
refreshControl = {refreshing onRefresh} 下拉刷新
<SafeAreaView> 顶部安全区域 (react-native-safe-area-context)

Platform.Select 判断平台决定执行代码
Dimensions.get('windows') 获取屏幕宽高

<Slot> 插槽

<icon> 使用expo的 MaterialIcons ，好的效果需要配合SF symbols做映射

**app/\_layout.js布局文件 自动生效**
**app/(tabs)/\_layout.js 负责底部 Tab 导航** TabItem的name要与文件名对齐 user.js video.js，自带Stack
**app/xx 不在tabs里的页面**

<Stack>布局组件 (title + 过度 + 返回按钮) screenOptions设置效果（特别是安卓）
页面组件里 Stack.Screen 可以设置title，TintColor TitleStyle headerStyle 设置顶部样式
最好在布局组件里使用 Stack.Screen + name 匹配页面统一配置，需要路由参数则 options={({routet}) => ({ title })}
options.presentation = 'modal' 设置模态弹窗 / 'fullScreenModal' 全屏弹窗, options.animation = 'slide_from_bottom' 安卓实现底部弹出
headerTitle headerLeft/Right 自定义设置标题左右侧

<Tabs> 底部导航栏 路由
screenoptions 配置header和tab
tabs.screen options.tabBarIcon 配置导航图标
stack name=(tabs) headerShown=false 否则会跟tabbar自身的header重叠

<NativeTabs> 原生底部导航栏 支持液态玻璃 配合SF图标库，不会自带Stack
NativeTabs.trigger
需要去 app/\_layout.js里配置Stack options 迁移Tabs.screenoptions
初始化页面时要将内容全放到ScrollView里判断，否则可能会出现高度计算差，还需要设置contentContainerStyle

<WebView> 渲染html标签或者uri直接嵌套页面
onLoadProgress renderLoading 渲染加载状态

<Share> 分享组件 支持message url，ios可以生成卡片

<SideMenu> 侧边栏
<Drawer /> 抽屉式侧边栏

<VideoView player={x}> 视频播放器 expo video player = useVideoPlayer

react-native-reanimated **动画**
<KeyboardAvoidingView> 键盘避开
(tabs)/xx.tsx 是 底部Tab主入口；app/xx/xx.tsx 是 Stack 里的独立页面（详情、流程、登录等），默认 没有底部 Tab

AsyncStorage 本地存储 可以协助判断是否调用接口

hook与react一致
useFocusEffect 监听路由焦点变化
{[].map((item, index) => <Text key={item.key}>{item}</Text>)} 一致

Gesture 手势组件 做点击判断

**网络：**
fetch async await 可以正常使用
urlcat 拼接链接 查询参数
封装fetch props: url, { method, params, body }
设置headers config(method, headers)
fetch(url, config)
基于request，封装GET POST PUT...
（ps 这是什么模式？）

封装请求hook useFetchData ，将状态 逻辑 请求都进行封装

**路由：**
expo router 应用/文件路由
package.json main -> projectName/entry

<Link href> 跳转 asChild可以将子组件带上跳转效果

js操作路由 router = useNavigation() router.navigate('xxx') .replace (Stack无法返回上一页) .push (强制推进) .back (返回上一级) .dissmiss (安全关闭模态窗)

路由参数 [id].js 文件，Link - href - pathname: '/[id]' / params: { id }
useLocalSearchParams() 获取路由参数

Linking.openURL 打开浏览器 深度链接
WebBrowser.openBrowserAsync 内部打开网页
webview 嵌套网页 userAgent协助处理页头页脚 onShouldStartLoadWithRequest拦截网页自身跳转 app处理（有返回逻辑）

用户登录 useSession sessionProvider, session signin signout useContext provider注入状态和登录退出方法

**跨组件:**
props 父子
父函数 props传递 子调用
createContext provider + useContext

**上架要求**
提供注销功能
隐私政策弹窗 <Modal>组件合适
允许网络后借助隐私弹窗 重新加载避免无网时加载失败，或者借助hooks 获得焦点时 判断网络请求是否正常
