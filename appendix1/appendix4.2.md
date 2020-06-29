# 南宁白话输入方案

## RIME输入法引擎

推荐**RIME输入法引擎**，pc上的名称叫「小狼毫输入法」，安卓上的名称叫「同文输入法」，IOS系统上的名称叫「iRime输入法」，官方地址：[RIME输入法](https://rime.im/)（[视频演示粤拼输入](https://v.youku.com/v_show/id_XNjM0MzY5MTYw.html?spm=a2h0k.11417342.soresults.dtitle)）。下面演示用南宁白话输入方案来打孟浩然《春晓》。

![演示gif](https://s2.ax1x.com/2019/05/14/Eo2Ll9.gif)

![演示gif](https://s2.ax1x.com/2019/05/14/Eo2OyR.gif)

南宁白话输入方案：[**下载地址**](https://github.com/leimaau/naamning_jyutping) | 安装及使用方法：[**汉语方言拼音输入**](https://www.hanhngiox.net/)

**注：** 新的改版称为「南宁话输入方案」，新的版本包括了南宁平话输入方案，统一至一起称「南宁话」。

## 打字技巧

### 声调输入

q 阴平 v 阴上 x 阴去 qq 阳平 vv 阳上 xx 阳去

### 拼音反查

按下`` ` ``键，以普通话拼音反查南宁粤拼

### 五笔画反查

按下`` x ``键，以五笔画反查南宁粤拼，h,s,p,n,z 分别代表横、竖、撇、捺、折

### 仓颉反查

按下`` v ``键，以仓颉反查南宁粤拼

### 五笔86反查

按下`` r ``键，以五笔86版反查南宁粤拼

### 普拼反查中古音

按下`` xx ``键，以普拼反查中古音

### 粵拼反查中古音

按下`` xj ``键，以南宁粵拼反查中古音

## 本码表使用技巧

### 本文演示的小狼毫配色

```yaml
# weasel.custom.yaml

patch:
  "style/color_scheme": leimaau
  "style/horizontal": false
  "preset_color_schemes/leimaau":
    name: 貍貓配色／LeiMaau
    author: LeiMaau <leimaau@qq.com>, original artwork by LeiMaau
    text_color: 0xe8f3f6
    back_color: 0xbc941a  # 鈷藍
    border_color: 0x222548  # 大山棕
    hilited_text_color: 0xf2f7ee  # 月白
    hilited_back_color: 0x323348  # 海報灰
    hilited_candidate_text_color: 0x000000
    hilited_candidate_back_color: 0xd5ecdf  # 艾背綠
```

### 开启多字形和emoji表情

本方案有两个版本，非IPA版和IPA版，IPA版中提供多种字形转换和emoji表情，要保证opencc有对应的json

```yaml
switches:
  - options: [simplification, noop, zh_hk, zh_tw, zh_jp]
    reset: 0
    states:
      - 字形 → 大陸
      - 字形 → 傳統〔不轉換〕
      - 字形 → 香港
      - 字形 → 臺灣
      - 字形 → 日本
  - name: emoji_cn
    reset: 0
    states: [ 〇, 😊 ]
  - name: ascii_mode
    reset: 0
    states: [ 中文, 西文 ]
  - name: full_shape
    states: [ 半角, 全角 ]
  - name: ascii_punct
    states: [ 。，, ．， ]
```

多字形对应的json

```yaml
zh_hk:
  option_name: zh_hk
  opencc_config: t2hk.json

zh_tw:
  option_name: zh_tw
  opencc_config: t2tw.json

zh_jp:
  option_name: zh_jp
  opencc_config: t2jp.json
```

emoji表情对应的json

```yaml
emoji_cn:
  opencc_config: emoji.json
  option_name: emoji_cn
  tips: all
```


效果

![多字形和emoji](https://s2.ax1x.com/2019/05/14/Eo2XO1.gif)

### 提示音显示为IPA


效果

![显示IPA](https://s2.ax1x.com/2019/05/14/EoYtns.gif)

### 竖排打字时显示释义

```yaml
reverse_lookup:
  tags:  [luna_pinyin, stroke, cangjie5, wubi86]  # 需要打字時顯示釋義則註釋這行，建議豎排顯示時使用【很有用的功能，建議PC上使用！】
```

改为

```yaml
reverse_lookup:
#  tags:  [luna_pinyin, stroke, cangjie5, wubi86]  # 需要打字時顯示釋義則註釋這行，建議豎排顯示時使用【很有用的功能，建議PC上使用！】
```

效果

![显示释义](https://s2.ax1x.com/2019/05/14/Eoa3an.gif)

### 横排打字时只标注单字音

```yaml
translator:
  dictionary: naamning_baakwaa
  prism: naamning_baakwaa
  spelling_hints: 5  # 標註拼音的字數，建議橫排顯示時設置爲1
```

改为

```yaml
translator:
  dictionary: naamning_baakwaa
  prism: naamning_baakwaa
  spelling_hints: 1  # 標註拼音的字數，建議橫排顯示時設置爲1
```

不需要显示释义时

```yaml
reverse_lookup:
#  tags:  [luna_pinyin, stroke, cangjie5, wubi86]  # 需要打字時顯示釋義則註釋這行，建議豎排顯示時使用【很有用的功能，建議PC上使用！】
```

改回

```yaml
reverse_lookup:
  tags:  [luna_pinyin, stroke, cangjie5, wubi86]  # 需要打字時顯示釋義則註釋這行，建議豎排顯示時使用【很有用的功能，建議PC上使用！】
```

weasel.custom.yaml文件

```yaml
# weasel.custom.yaml

patch:
  "style/color_scheme": lost_temple
  "style/horizontal": false
```

改为

```yaml
# weasel.custom.yaml

patch:
  "style/color_scheme": lost_temple
  "style/horizontal": true
```

效果

![横排打字](https://s2.ax1x.com/2019/05/14/EoNfSO.gif)
