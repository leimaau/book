# 南宁白话字词典

以下工具皆为开源词典，其中移动端和PC客户端的安装需要有一定的计算机操作能力，网页端的使用稍微简便一些。

## 移动端

**汉字音典APP**

这是osfans开发的手机应用，下载安装使用更方便，[**此处**](https://github.com/osfans/MCPDict)下载。

**欧路词典**

[欧路词典下载官方网站](https://www.eudic.net/v4/en/app/eudic)，其提供桌面版和手机版下载，mdx与mdd文件见下面。

**DictTango**

[DictTango](https://github.com/Jimex/DictTango-Android/releases)，其只提供安卓版下载，mdx与mdd文件见下面。

**bluedict**

[深蓝词典下载官方网站](https://www.ssdlsoft.com/tag/bluedict)，其只提供安卓版下载，mdx与mdd文件见下面。

## PC端

**Mdict**

[Mdict官方网站](https://www.mdict.cn/wp/?lang=zh)。

**GoldenDict**

[GoldenDict 下载官方网站](http://www.goldendict.org/)。

[GoldenDict 的下载、安装、使用](https://www.pdawiki.com/forum/thread-14072-1-1.html?_dsign=e137944d)。

## mdx与mdd文件

南宁白话字词典mdx与mdd文件下载地址：[**下载地址**](https://github.com/leimaau/dict-store)，附带[开源词典安装简易指南](https://github.com/leimaau/dict-store/wiki)。

## 电子档

可参看[南宁话单字音快速查询手册](https://github.com/leimaau/Nanning-Dialect-Manual)，原文tsv版。

## 网页端

![Leimaau's Webdict 2.0](https://z3.ax1x.com/2021/03/23/67aQXV.png)

狸猫的在线辞典：[**Leimaau's Webdict 2.0**](https://leimaau.github.io/leimaau-webdict2/)

关于正字问题，本读音表不完全追求本字，有本字最好，没有的使用广泛的俗字也是可以的，对于实在无可考证的字，使用方形符号带粤拼作为占位符，这份字表囊括了原书单字音表部分和同音字汇的所有有音无字的音节，有可考的字都安上了字。这里还要谈谈一份重要的资料，那就是覃远雄等编的《南宁平话词典》，对于南白了解的越深越有一个门坎是不得不过的，一定要了解南宁平话，不了解南宁平话可以说就不能真正了解南宁白话，许多本字在其他资料查不到的情况下，可以在这份资料中查到，白话与平话的共用词甚至超过了80%，这本词典可以直接当作南宁白话词典来看，两者已经是不能分开的了。

你想知道「逻辑」，「程序员」，「挑衅」，「坎坷」，「寻秦记」这些词语用白话怎么读吗，南白与广白有什么区别，文读是怎样的，白读是怎样的，粤拼是什么，ipa又是什么，两者有什么关系，白话与繁简体又有什么关系，查查这份读音表吧。

[狸猫的在线辞典2.0](https://leimaau.github.io/leimaau-webdict2/)中还分别提供了在线转换、在线标注、在线推导、在线分词四个功能。

## 音标转换

音标转换中提供了南宁白话三本资料IPA版本和南宁平话三本资料IPA版本与粤拼的转换，其中为了方便处理，统一使用kʷ/kʷʰ，其他 kw/kwh、kʷ/kʰʷ、kʷ/kwʰ、kw/khw、kw/kʰw、ku/kʰu、kᵘ/kʰᵘ 等可根据需要手工替换。

![](https://z3.ax1x.com/2021/03/23/67aM60.png)

## 在线标注

在线标注功能提供了南宁白话和南宁平话的两种文本标注功能，为了更好地标注文本，内部逻辑中用到了后面介绍的分词系统以及词典模块的审词表，过滤罕见音的功能也用到了字典模块的审音表。

![](https://z3.ax1x.com/2021/05/07/g1IXQ0.png)

## 在线推导

在线推导功能本身笔者曾写过一个python版本的小工具，使用起来有一定门槛较为复杂且不能在线，故而考虑将其重构后加入狸猫的在线辞典中。推导的内部逻辑较为简单，只能作为参考，且只使用了《广韵》的数据，《集韵》数据暂时未添加，为了方便人工校对，增添了一个**南宁话与中古音系比较表**于推导结果后，每次推导一个字会把与之对应古韵的那部分置于结果后供人参考，该表是用另一个笔者写的统计工具对审音表的常用字统计所得，有些少瑕疵，但问题不大，[附录一第4.3节](https://leimaau.github.io/book/appendix1/appendix4.3.html)中已完整列出。

![](https://z3.ax1x.com/2021/03/23/67a1mT.png)

## 在线分词

分词功能原本是为了完善在线标注功能出现的副产物，既然内部逻辑已经有了，那就提供出在线模式，其中使用隐马尔科夫过程来分词的功能未完成，有待将来完善。

![](https://z3.ax1x.com/2021/03/23/67a30U.png)

