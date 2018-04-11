# gulp-demo
对前端开发在`gulp`的使用上做了梳理，并在案例中实现了以下功能：

      1.转译 less
      2.重命名
      3.合并 css 、js
      3.压缩 css 、js
      4.添加 MD5
      5.创建服务器实时更新
      6.打包并压缩为 .zip

## App structure
```
client                # 根目录
  ├─src               # 前端文件
  │  ├─css            # css
  │  │  ├─common.less
  │  │  ├─demo.css
  │  │  └─login.css 
  │  ├─js             # js
  │  │  ├─login.js
  │  │  └─register.js
  │  └─index.html     # html
  │     
  ├─.babelrc          # babel配置
  ├─gulpfile.js       # gulp
  ├─package-lock.json
  └─package.json      # 配置页
```


