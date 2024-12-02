# 爆破机
输入一个密码，将自动输出一个和[https://120.46.211.8/login]()一样的密码加密程序的结果。

# 如何使用
安装尽量高版本（没必要最高版本）的[https://nodejs.org/zh-cn/](Node.js)，然后把这个项目下载下来，在项目目录运行：
```bash
node ./dist/main.js
```
输入一个密码就会蹦出一个加密过后的玩意。按`Ctrl+C`退出。

# 项目结构
本项目使用TypeScript + Node.js开发，看源代码的话请到src文件夹，dist文件夹是编译后文件。

[main.ts](./src/main.ts) 负责输入输出等交互逻辑。
[website.vars.ts](./src/website.vars.ts) 负责加密密码。