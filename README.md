# 爆破机
输入一段文本，将自动输出一个某神奇加密算法加密过后的结果。

# 如何使用
## 通用准备
安装尽量高版本(没必要最高版本)的[Node.js](https://nodejs.org/zh-cn/)，然后把这个项目下载下来
## 经典加密功能
在项目目录运行: 
```bash
node ./dist/main.js
```
输入一段文本并回车就会蹦出一个加密过后的玩意。按`Ctrl+C`退出。

另外如果你想加密成任何字符而不仅限于16进制，在最开始运行的时候加上`--encrypt-to-any-char`或者`-e2ac`参数，就像这样: 
```bash
node ./dist/main.js -e2ac
```

### Waring! Waring! 执行以下操作很可能会产生非预期的结果！
### 保留特殊字符
Tips: 此操作仅在启用了`--encrypt-to-any-char`或`-e2ac`时生效。

因为某些特殊字符会导致输出异常，所以默认会干掉特殊字符。如果你想获取这些特殊字符的话加上`--keep-special-chars`或者`-ksc`参数。

当然，获取这些字符更有效的办法应该是断点调试而不是靠输出 :)

## Benchmark (beta) 功能
### 简介
该功能会尝试通过一个`Math.random()`生成的数字对其进行加密(不会使用类似`--encrypt-to-any-char`的方式加密)，如果加密之后为纯十进制，则会输出。

输出格式为: 
```
timer: <从开始随机到现在经历了多长时间>
<随机到这个结果总共进行了多少次随机(从开始运行起算)>
<随机(即Math.random())的结果>
<加密后的玩意>
```

如果按Ctrl+C结束，那么将会再次输出一次从开始随机到现在经历了多长时间。
### 运行
在项目目录运行: 
```bash
node ./dist/random.js
```
### 附加参数
#### `--output-now-index`或`-oni`(以下将称此功能为: 输出当前次数)
每10000次随机输出一次总共进行了多少次随机(注意: 这只对治疗强迫症有效，因为输出很消耗性能，所以如果启用了这玩意通常不能表示真是性能)。
### 额外功能
在运行时按下`c`(需聚焦窗口)时将关闭输出当前次数功能，按下`o`则反之; 按下`t`则是切换输出当前次数功能开关。
# 项目结构
本项目使用TypeScript + Node.js开发，看源代码的话请到src文件夹，dist文件夹是编译后文件。

[main.ts](./src/main.ts) 负责输入输出等交互逻辑。<br />
[website.vars.ts](./src/website.vars.ts) 负责加密文本。<br />
[random.ts](./src/random.ts) 其实应该叫benchmark.ts的(<br />
[random_child_process.ts](./src/random_child_process.ts) random.ts的多进程代码