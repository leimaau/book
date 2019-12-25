# 南宁白话输入方案

## RIME输入法引擎

推荐**RIME输入法引擎**，pc上的名称叫「小狼毫输入法」，安卓上的名称叫「同文输入法」，IOS系统上的名称叫「iRime输入法」，官方地址：[RIME输入法](https://rime.im/)（[视频演示粤拼输入](https://v.youku.com/v_show/id_XNjM0MzY5MTYw.html?spm=a2h0k.11417342.soresults.dtitle)）。下面演示用南宁白话输入方案来打孟浩然《春晓》。

![演示gif](https://s2.ax1x.com/2019/05/14/Eo2Ll9.gif)

![演示gif](https://s2.ax1x.com/2019/05/14/Eo2OyR.gif)

南宁白话输入方案：[**下载地址**](https://github.com/leimaau/naamning_jyutping) | 安装及使用方法：[**汉语方言拼音输入**](https://www.hanhngiox.net/)

## 打字技巧

### 声调输入

v 阴平 x 阴上 q 阴去 vv 阳平 xx 阳上 qq 阳去

### 拼音反查

按下`` ` ``键，以普通话拼音反查南宁粤拼

### 五笔画反查

按下`` x ``键，以五笔画反查南宁粤拼，h,s,p,n,z 分别代表横、竖、撇、捺、折

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

```yaml
switches:
#  - options: [zh_simp2, zh_simp, zh_trad, zh_hk, zh_tw, zh_jp]  # 多種字形轉換方案，根據需要自行開啓
#    reset: 1
#    states:
#      - 字形 → 大陸〔繁體〕
#      - 字形 → 大陸
#      - 字形 → 傳統
#      - 字形 → 香港
#      - 字形 → 臺灣
#      - 字形 → 日本
#  - name: emoji_cn    # emoji根據需要自行開啓
#    reset: 0
#    states: [ 〇, 😊 ]
  - name: ascii_mode
    reset: 0
    states: [ 中文, 西文 ]
  - name: full_shape
    states: [ 半角, 全角 ]
  - name: zh_simp  # 若開啓多字形此段可註釋
    reset: 1
    states: [ 漢字, 汉字 ]
  - name: ascii_punct
    states: [ 。，, ．， ]
```

改为

```yaml
switches:
  - options: [zh_simp2, zh_simp, zh_trad, zh_hk, zh_tw, zh_jp]  # 多種字形轉換方案，根據需要自行開啓
    reset: 1
    states:
      - 字形 → 大陸〔繁體〕
      - 字形 → 大陸
      - 字形 → 傳統
      - 字形 → 香港
      - 字形 → 臺灣
      - 字形 → 日本
  - name: emoji_cn    # emoji根據需要自行開啓
    reset: 0
    states: [ 〇, 😊 ]
  - name: ascii_mode
    reset: 0
    states: [ 中文, 西文 ]
  - name: full_shape
    states: [ 半角, 全角 ]
#  - name: zh_simp  # 若開啓多字形此段可註釋
#    reset: 1
#    states: [ 漢字, 汉字 ]
  - name: ascii_punct
    states: [ 。，, ．， ]
```

然后

```yaml
engine:
  processors:
    - ascii_composer
    - recognizer
    - key_binder
    - speller
    - punctuator
    - selector
    - navigator
    - express_editor
  segmentors:
    - ascii_segmentor
    - matcher
    - affix_segmentor@luna_pinyin
    - affix_segmentor@stroke
    - abc_segmentor
    - punct_segmentor
    - fallback_segmentor
  translators:
    - punct_translator
    - script_translator
    - script_translator@luna_pinyin
    - table_translator@stroke
  filters:
    - simplifier@zh_simp
#    - simplifier@zh_simp2  # 多字形濾鏡，根據需要自行開啓
#    - simplifier@zh_trad
#    - simplifier@zh_hk
#    - simplifier@zh_tw
#    - simplifier@zh_jp
#    - simplifier@emoji_cn  # emoji濾鏡，根據需要自行開啓
    - uniquifier
    - reverse_lookup_filter@reverse_lookup
```

改为

```yaml
engine:
  processors:
    - ascii_composer
    - recognizer
    - key_binder
    - speller
    - punctuator
    - selector
    - navigator
    - express_editor
  segmentors:
    - ascii_segmentor
    - matcher
    - affix_segmentor@luna_pinyin
    - affix_segmentor@stroke
    - abc_segmentor
    - punct_segmentor
    - fallback_segmentor
  translators:
    - punct_translator
    - script_translator
    - script_translator@luna_pinyin
    - table_translator@stroke
  filters:
    - simplifier@zh_simp
    - simplifier@zh_simp2  # 多字形濾鏡，根據需要自行開啓
    - simplifier@zh_trad
    - simplifier@zh_hk
    - simplifier@zh_tw
    - simplifier@zh_jp
    - simplifier@emoji_cn  # emoji濾鏡，根據需要自行開啓
    - uniquifier
    - reverse_lookup_filter@reverse_lookup
```

再然后

```yaml
zh_simp:
  option_name: zh_simp
  opencc_config: t2s.json
  tips: none

#zh_simp2:  # 多字形根據需要自行開啓
#  option_name: zh_simp2
#  opencc_config: t2s.json
#  tips: all

#zh_trad:
#  option_name: zh_trad
#  opencc_config: s2t.json
#  tips: all

#zh_hk:
#  option_name: zh_hk
#  opencc_config: t2hk.json
#  tips: all

#zh_tw:
#  option_name: zh_tw
#  opencc_config: t2tw.json
#  tips: all

#zh_jp:
#  option_name: zh_jp
#  opencc_config: t2jp.json
#  tips: all

#emoji_cn:  # emoji根據需要自行開啓
#  opencc_config: emoji.json
#  option_name: emoji_cn
#  tips: all
```

改为

```yaml
zh_simp:
  option_name: zh_simp
  opencc_config: t2s.json
  tips: none

zh_simp2:  # 多字形根據需要自行開啓
  option_name: zh_simp2
  opencc_config: t2s.json
  tips: all

zh_trad:
  option_name: zh_trad
  opencc_config: s2t.json
  tips: all

zh_hk:
  option_name: zh_hk
  opencc_config: t2hk.json
  tips: all

zh_tw:
  option_name: zh_tw
  opencc_config: t2tw.json
  tips: all

zh_jp:
  option_name: zh_jp
  opencc_config: t2jp.json
  tips: all

emoji_cn:  # emoji根據需要自行開啓
  opencc_config: emoji.json
  option_name: emoji_cn
  tips: all
```

效果

![多字形和emoji](https://s2.ax1x.com/2019/05/14/Eo2XO1.gif)

### 提示音显示为IPA

```yaml
translator:
  dictionary: naamning_jyutping
  prism: naamning_jyutping
  spelling_hints: 5  # 標註拼音的字數，建議橫排顯示時設置爲1
  preedit_format:    # 需要顯示IPA時這段要被替換掉
    - xform/([yaeioumngptk])vv/$1⁴/
    - xform/([yaeioumngptk])v/$1¹/
    - xform/([yaeioumngptk])xx/$1⁵/
    - xform/([yaeioumngptk])x/$1²/
    - xform/([yaeioumngptk])qq/$1⁶/
    - xform/([yaeioumngptk])q/$1³/
#  preedit_format:   # 需要顯示IPA時preedit_format替換成這段
#    - xform/(^|[ '])(m|ng)+$/$1$2̩$3/	唔m̩ 五ŋ̩
#    - xform/([ptk])qq/$1˨/	熱jiːt̚˨
#    - xform/([ptk])q/$1˧/	咽jiːt̚˧
#    - xform/([ptk])v/$1˥/	一jɐt̚
#    - xform/vv/˨˩/
#    - xform/v/˥˥/
#    - xform/xx/˨˦/
#    - xform/x/˧˥/
#    - xform/qq/˨˨/
#    - xform/(^|[ '])q/$1ʔ/
#    - xform/q/˧˧/
#    - xform/sl/ɬ/
#    - xform/([PTK])$/$1]$2/	入jɐp̚
#    - xform/(^|[ '])([jy])u(ng)/$1jʊŋ/	用jʊŋ
#    - xform/(^|[ '])(jy|[jy])u([t])/$1jYː$3]/	月jyːt̚
#    - xform/([dtlgkhzcsj])yu([t])/$1Yː$2]/	奪tyːt̚
#    - xform/(^|[ '])([jy])u([k])/$1jʊ$3]/	玉jʊk̚
#    - xform/(^|[ '])(jy)u/$1jYː/	元jyːn
#    - xform/yu/Yː/	嫩nyːn
#    - xform/y([aeior])/j$1/	一yat/jɐt̚/
#    - xform/(aa|r)([iu])/Aː\U$2/	嗎maː
#    - xform/a([iu])/ɐ\U$1/	米mɐi
#    - xform/(aa|r)([ptk])/Aː\U$2]/	aːk̚
#    - xform/a([ptk])/ɐ\U$1]/	握ɐk̚
#    - xform/(aa|r)/Aː/	嗎maː
#    - xform/b/P/	吧paː
#    - xform/c/T͡ʃH/	差tʃʰaː
#    - xform/d/T/	打taː
#    - xform/eu/ɛːU/	掉tɛːu
#    - xform/eoi/ɵY/	水sɵy（廣州）
#    - xform/oei/ɵY/	容錯
#    - xform/oe([ptk])/œː$1]/	約jœːk̚
#    - xform/oe(ng)/œː$1/	良lœːŋ
#    - xform/oe([t])/ɵ$1]/	容錯
#    - xform/oe([n])/ɵ$1/	容錯
#    - xform/oe/œː/	張tʃœːŋ
#    - xform/oi/ɔːI/	愛ɔːi
#    - xform/eo(ng)/œːŋ/	容錯
#    - xform/eo([k])/œː$1]/	容錯
#    - xform/eo([t])/ɵ$1]/	率sɵt̚（廣州）
#    - xform/eon/ɵn/	信sɵn（廣州）
#    - xform/ou/OU/	無mou（廣州）
#    - xform/u([k])/ʊ$1]/	六lʊk̚
#    - xform/ui/UːI/	回wuːi
#    - xform/iu/IːU/	要jiːu
#    - xform/i(ng)/ɪN/	鳴mɪŋ
#    - xform/ik/ɪK]/	式sɪk̚
#    - xform/i([pt])/Iː$1]/	結kiːt̚
#    - xform/eo/ɵ/	去hɵy（廣州）
#    - xform/a/ɐ/	粒nɐp̚
#    - xform/ei/EI/	欸ei（廣州）
#    - xform/i/Iː/	是siː
#    - xform/e([ptk])/ɛː$1]/	癧lɛːk̚
#    - xform/e/ɛː/	寫ɬɛː
#    - xform/o([ptk])/ɔː$1]/	莫mɔːk̚
#    - xform/u([pt])/Uː$1]/	活wuːt̚
#    - xform/u(ng)/ʊN/	動tʊŋ
#    - xform/o/ɔː/	錯tʃʰɔː
#    - xform/u/Uː/	故kuː
#    - xform/ng/N/	我ŋɔː
#    - xform/n/n/	你niː
#    - xform/kw/KWH/	群kʷʰɐn
#    - xform/gw/KW/	均kʷɐn
#    - xform/g/K/	急kɐp̚
#    - xform/(^|[ '])([ptk])/$1$2H/	噴pʰɐn
#    - xform/w/w/	雲wɐn
#    - xform/j/j/	人jɐn
#    - xform/m/m/	尾mi
#    - xform/l/l/	里li
#    - xform/s/ʃ/	审ʃɐm
#    - xform/z/T͡ʃ/	這tʃɛː
#    - xform/em/ɛːM/
#    - xform/en/ɛːN/
#    - xform/T͡ʃy/T͡sɿ/
#    - xform/T͡ʃHy/T͡sHɿ/
#    - xform/ʃy/sɿ/
#    - xform/T͡ʃT͡ʃ/T͡sɿ/
#    - xform/T͡ʃHT͡ʃ/T͡sHɿ/
#    - xform/ʃT͡ʃ/sɿ/
#    - xform/T͡ʃIːIː/T͡sɿ/
#    - xform/T͡ʃHIːIː/T͡sHɿ/
#    - xform/ʃIːIː/sɿ/
#    - xform/nj/ȵ/
#    - "xlit|PmfTnNlKhHsʃjwWɐAEɛIɪɔOœɵUʊYː]|pmftnŋlkhʰsʃjwʷɐaeɛiɪɔoœɵuʊyː̚|"
  comment_format:
    - xform/\(.+?\)//    # 處理組詞拼音
    - xform/「.+?」//    # 處理組詞拼音
```

改为

```yaml
translator:
  dictionary: naamning_jyutping
  prism: naamning_jyutping
  spelling_hints: 5  # 標註拼音的字數，建議橫排顯示時設置爲1
#  preedit_format:    # 需要顯示IPA時這段要被替換掉
#    - xform/([yaeioumngptk])vv/$1⁴/
#    - xform/([yaeioumngptk])v/$1¹/
#    - xform/([yaeioumngptk])xx/$1⁵/
#    - xform/([yaeioumngptk])x/$1²/
#    - xform/([yaeioumngptk])qq/$1⁶/
#    - xform/([yaeioumngptk])q/$1³/
  preedit_format:    # 需要顯示IPA時preedit_format替換成這段
    - xform/(^|[ '])(m|ng)+$/$1$2̩$3/	唔m̩ 五ŋ̩
    - xform/([ptk])qq/$1˨/	熱jiːt̚˨
    - xform/([ptk])q/$1˧/	咽jiːt̚˧
    - xform/([ptk])v/$1˥/	一jɐt̚
    - xform/vv/˨˩/
    - xform/v/˥˥/
    - xform/xx/˨˦/
    - xform/x/˧˥/
    - xform/qq/˨˨/
    - xform/(^|[ '])q/$1ʔ/
    - xform/q/˧˧/
    - xform/sl/ɬ/
    - xform/([PTK])$/$1]$2/	入jɐp̚
    - xform/(^|[ '])([jy])u(ng)/$1jʊŋ/	用jʊŋ
    - xform/(^|[ '])(jy|[jy])u([t])/$1jYː$3]/	月jyːt̚
    - xform/([dtlgkhzcsj])yu([t])/$1Yː$2]/	奪tyːt̚
    - xform/(^|[ '])([jy])u([k])/$1jʊ$3]/	玉jʊk̚
    - xform/(^|[ '])(jy)u/$1jYː/	元jyːn
    - xform/yu/Yː/	嫩nyːn
    - xform/y([aeior])/j$1/	一yat/jɐt̚/
    - xform/(aa|r)([iu])/Aː\U$2/	嗎maː
    - xform/a([iu])/ɐ\U$1/	米mɐi
    - xform/(aa|r)([ptk])/Aː\U$2]/	aːk̚
    - xform/a([ptk])/ɐ\U$1]/	握ɐk̚
    - xform/(aa|r)/Aː/	嗎maː
    - xform/b/P/	吧paː
    - xform/c/T͡ʃH/	差tʃʰaː
    - xform/d/T/	打taː
    - xform/eu/ɛːU/	掉tɛːu
    - xform/eoi/ɵY/	水sɵy（廣州）
    - xform/oei/ɵY/	容錯
    - xform/oe([ptk])/œː$1]/	約jœːk̚
    - xform/oe(ng)/œː$1/	良lœːŋ
    - xform/oe([t])/ɵ$1]/	容錯
    - xform/oe([n])/ɵ$1/	容錯
    - xform/oe/œː/	張tʃœːŋ
    - xform/oi/ɔːI/	愛ɔːi
    - xform/eo(ng)/œːŋ/	容錯
    - xform/eo([k])/œː$1]/	容錯
    - xform/eo([t])/ɵ$1]/	率sɵt̚（廣州）
    - xform/eon/ɵn/	信sɵn（廣州）
    - xform/ou/OU/	無mou（廣州）
    - xform/u([k])/ʊ$1]/	六lʊk̚
    - xform/ui/UːI/	回wuːi
    - xform/iu/IːU/	要jiːu
    - xform/i(ng)/ɪN/	鳴mɪŋ
    - xform/ik/ɪK]/	式sɪk̚
    - xform/i([pt])/Iː$1]/	結kiːt̚
    - xform/eo/ɵ/	去hɵy（廣州）
    - xform/a/ɐ/	粒nɐp̚
    - xform/ei/EI/	欸ei（廣州）
    - xform/i/Iː/	是siː
    - xform/e([ptk])/ɛː$1]/	癧lɛːk̚
    - xform/e/ɛː/	寫ɬɛː
    - xform/o([ptk])/ɔː$1]/	莫mɔːk̚
    - xform/u([pt])/Uː$1]/	活wuːt̚
    - xform/u(ng)/ʊN/	動tʊŋ
    - xform/o/ɔː/	錯tʃʰɔː
    - xform/u/Uː/	故kuː
    - xform/ng/N/	我ŋɔː
    - xform/n/n/	你niː
    - xform/kw/KWH/	群kʷʰɐn
    - xform/gw/KW/	均kʷɐn
    - xform/g/K/	急kɐp̚
    - xform/(^|[ '])([ptk])/$1$2H/	噴pʰɐn
    - xform/w/w/	雲wɐn
    - xform/j/j/	人jɐn
    - xform/m/m/	尾mi
    - xform/l/l/	里li
    - xform/s/ʃ/	审ʃɐm
    - xform/z/T͡ʃ/	這tʃɛː
    - xform/em/ɛːM/
    - xform/en/ɛːN/
    - xform/T͡ʃy/T͡sɿ/
    - xform/T͡ʃHy/T͡sHɿ/
    - xform/ʃy/sɿ/
    - xform/T͡ʃT͡ʃ/T͡sɿ/
    - xform/T͡ʃHT͡ʃ/T͡sHɿ/
    - xform/ʃT͡ʃ/sɿ/
    - xform/T͡ʃIːIː/T͡sɿ/
    - xform/T͡ʃHIːIː/T͡sHɿ/
    - xform/ʃIːIː/sɿ/
    - xform/nj/ȵ/
    - "xlit|PmfTnNlKhHsʃjwWɐAEɛIɪɔOœɵUʊYː]|pmftnŋlkhʰsʃjwʷɐaeɛiɪɔoœɵuʊyː̚|"
  comment_format:
    - xform/\(.+?\)//    # 處理組詞拼音
    - xform/「.+?」//    # 處理組詞拼音
```

效果

![显示IPA](https://s2.ax1x.com/2019/05/14/EoYtns.gif)

### 竖排打字时显示释义

```yaml
reverse_lookup:
  tags:  [luna_pinyin, stroke]  # 需要打字時顯示釋義則註釋這行，建議豎排顯示時使用【很有用的功能，建議PC上使用！】
```

改为

```yaml
reverse_lookup:
#  tags:  [luna_pinyin, stroke]  # 需要打字時顯示釋義則註釋這行，建議豎排顯示時使用【很有用的功能，建議PC上使用！】
```

效果

![显示释义](https://s2.ax1x.com/2019/05/14/Eoa3an.gif)

### 横排打字时只标注单字音

```yaml
translator:
  dictionary: naamning_jyutping
  prism: naamning_jyutping
  spelling_hints: 5  # 標註拼音的字數，建議橫排顯示時設置爲1
```

改为

```yaml
translator:
  dictionary: naamning_jyutping
  prism: naamning_jyutping
  spelling_hints: 1  # 標註拼音的字數，建議橫排顯示時設置爲1
```

不需要显示释义时

```yaml
reverse_lookup:
#  tags:  [luna_pinyin, stroke]  # 需要打字時顯示釋義則註釋這行，建議豎排顯示時使用【很有用的功能，建議PC上使用！】
```

改回

```yaml
reverse_lookup:
  tags:  [luna_pinyin, stroke]  # 需要打字時顯示釋義則註釋這行，建議豎排顯示時使用【很有用的功能，建議PC上使用！】
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
