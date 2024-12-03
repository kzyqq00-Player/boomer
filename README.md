# 爆破机
输入一段文本，将自动输出一个某神奇加密算法加密过后的结果。

# 如何使用
安装尽量高版本（没必要最高版本）的[Node.js](https://nodejs.org/zh-cn/)，然后把这个项目下载下来，在项目目录运行：
```bash
node ./dist/main.js
```
输入一段文本并回车就会蹦出一个加密过后的玩意。按`Ctrl+C`退出。

另外如果你想加密成任何字符而不仅限于16进制，在最开始运行的时候加上`--encrypt-to-any-char`或者`-e2ac`参数，就像这样：
```bash
node ./dist/main.js -e2ac
```

### Waring! Waring! 执行以下操作很可能会产生非预期的结果！
## 保留特殊字符
Tips: 此操作仅在启用了`--encrypt-to-any-char`或`-e2ac`时生效。

因为某些特殊字符会导致输出异常，所以默认会干掉特殊字符。如果你想获取这些特殊字符的话加上`--keep-special-chars`或者`-ksc`参数。

当然，获取这些字符更有效的办法应该是断点调试而不是靠输出 :)

# 项目结构
本项目使用TypeScript + Node.js开发，看源代码的话请到src文件夹，dist文件夹是编译后文件。

[main.ts](./src/main.ts) 负责输入输出等交互逻辑。
[website.vars.ts](./src/website.vars.ts) 负责加密文本。
