# 文本注音工具

## 工具说明

对于熟悉python的读者，这里提供一个可以标注粤拼和IPA的python脚本，灵感来源于[这里](https://github.com/laubonghaudoi/poem_auto_tag)，笔者对其作了重写以适用于本文，并使用了jieba分词和opencc工具使其注音更准确，此处感谢原作者[刘邦后代](https://github.com/laubonghaudoi)。

本项目的源码下载地址：[**下载地址**](https://github.com/leimaau/pythonTools)，脚本代码在`pythopnTools/SignArticle`文件夹中。如果需要在线标注也可以使用[**Leimaau's Webdict 2.0**](https://leimaau.github.io/leimaau-webdict2/)。

input.txt放需要标注的歌词，output.txt为输出的标注结果，执行SignArticle.py中的代码即可：

```python
import re
import jieba
import jieba.posseg as pseg
from mytool import jyutping_to_ipa
from opencc import OpenCC
cc = OpenCC('s2t')
jieba.set_dictionary('./extra_dict/dict.txt.big')

file_name='data_naamning.txt' # 字词典文件: data_naamning 南宁白话数据; data_naamning_bingwaa 南宁平话数据; data_gwongzau 广州话数据
data = open(file_name, encoding='utf-8')

char = []
dictionary = {}
cutwordslist = []

for line in data.readlines():
    char = line.replace(' ','_').split()
    if char[0] in dictionary:
        dictionary[char[0]] = dictionary[char[0]] + '/' + char[1].replace('_',' ')
    else:
        dictionary[char[0]] = char[1].replace('_',' ')

def cutwords(words):
    cutwordslist = []
    result = pseg.cut(cc.convert(words))
    for w in result:
        cutwordslist.append(w.word)
    return cutwordslist

# isIPA: jyutping-拼音 IPA-ipa
# regstr_ignore: yes_ignore-忽略 no_ignore-不忽略
# area: n-南宁ipa  g-广州ipa  p-南宁平话《广西通志·汉语方言志》版IPA  p2-《南宁平话词典》版IPA
# ipatype: 0-宽式音标(上标调值数码) 1-宽式音标(不上标调值数码) 2-严式音标(调值竖线)
def dealfunc_characters(regstr,prose,isIPA,regstr_ignore,area,ipatype):
    prose_list = list(prose)
    try:
        if re.match(r"" + regstr, prose_list[0]):
            if regstr_ignore=='no_ignore':
                s = prose_list[0]
            else:
                s = ''
        else:
            if isIPA=='IPA':
                s = jyutping_to_ipa(dictionary[prose_list[0]],area,ipatype)
            else:
                s = dictionary[prose_list[0]]
    except KeyError:
        s = 'ERR'

    for char in prose_list[1::]:
        try:
            if re.match(r"" + regstr, char):
                if regstr_ignore=='no_ignore':
                    s += char
                else:
                    s += ''
            else:
                if isIPA=='IPA':
                    s += ' '+ jyutping_to_ipa(dictionary[char],area,ipatype)
                else:
                    s += ' '+ dictionary[char]
        except KeyError:
            s += ' '+ 'ERR'
    return s

def dealfunc_phrases(regstr,prose,isIPA,regstr_ignore,area,ipatype):
    prose_list = cutwords(prose)
    # print(prose_list)
    try:
        if re.match(r"" + regstr, prose_list[0]):
            if regstr_ignore=='no_ignore':
                s = prose_list[0]
            else:
                s = ''
        else:
            if ' ' in dictionary[prose_list[0]] and '/' in dictionary[prose_list[0]]:
                s = dealfunc_characters(regstr,prose_list[0],isIPA,regstr_ignore,area,ipatype)
            else:
                if isIPA=='IPA':
                    s = jyutping_to_ipa(dictionary[prose_list[0]],area,ipatype)
                else:
                    s = dictionary[prose_list[0]]
    except KeyError:
        s = dealfunc_characters(regstr,prose_list[0],isIPA,regstr_ignore,area,ipatype)

    for char in prose_list[1::]:
        try:
            if re.match(r"" + regstr, char):
                if regstr_ignore=='no_ignore':
                    s += char
                else:
                    s += ''
            else:
                if ' ' in dictionary[char] and '/' in dictionary[char]:
                    s += ' '+ dealfunc_characters(regstr,char,isIPA,regstr_ignore,area,ipatype)
                else:
                    if isIPA=='IPA':
                        s += ' '+ jyutping_to_ipa(dictionary[char],area,ipatype)
                    else:
                        s += ' '+ dictionary[char]
        except KeyError:
            s += ' '+ dealfunc_characters(regstr,char,isIPA,regstr_ignore,area,ipatype)
    return s

article = open('input.txt', encoding='utf-8')
out = open('output.txt', 'w', encoding='utf-8')

for paragraph in article.readlines():
    try:
        line = paragraph.replace(' ','<space>').split()[0]
    except:
        continue

    sentences = line.split()
    for prose in sentences:
        out.write(prose.replace('<space>',' ')+'\n')

        regstr = '[0-9A-Za-z-]|[_,，.。·…?—？!！:：;；“”\[\]<>「」『』【】（）《》、 ]+'
        prose = re.sub(r'([\u4e00-\u9fa5]+)([0-9A-Za-z-_]+)',r'\1<space>\2',prose)
        prose = prose.replace('<space>',' ')

        if file_name == 'data_naamning.txt':
            area = 'n'
        elif file_name == 'data_naamning_bingwaa.txt':
            area = 'p2'  # p or p2
        else:
            area = 'g'
        
        s = dealfunc_phrases(regstr,prose,'jyutping','no_ignore',area,2)
        #s = dealfunc_characters(regstr,prose,'jyutping','no_ignore',area,0)
        out.write(s+'\n[')

        s2 = dealfunc_phrases(regstr,prose,'IPA','no_ignore',area,2)
        #s2 = dealfunc_characters(regstr,prose,'IPA','no_ignore',area,0)
        out.write(s2+']\n')

data.close()
article.close()
out.close()
```

多音字需要自己手工核对，笔者使用了jieba分词工具，因而可以对分词词汇注音，目前只提供这三种标注，更多功能读者可以根据自己的需求对脚本进行修改。

下面以陈奕迅《富士山下》的歌词作为标注南宁音的例子：

## 注音举例

> [!EXAMPLE]
> 
> 富士山下-陈奕迅
> 
> fu3 si6/sy6 saan1 haa5/haa6 - can4 jik6 slan3/slyun3
> 
> [fu³³ ʃi²²/sɿ²² ʃan⁵⁵ ha²⁴/ha²² - tʃʰɐn²¹ jek² ɬɐn³³/ɬyn³³]
> 
> 拦路雨偏似雪花 饮泣的你冻吗
> 
> laan4 lu6 jyu5 pin1 ci5/cy5 slyut3 faa1/waa1  jam2/jam3 jap1/lap1 dik1 ni5 dung3 maa1/maa5
> 
> [lan²¹ lu²² jy²⁴ pʰin⁵⁵ tʃʰi²⁴/tsʰɿ²⁴ ɬyt³ fa⁵⁵/wa⁵⁵  jɐm³⁵/jɐm³³ jɐp⁵/lɐp⁵ tek⁵ ni²⁴ tʊŋ³³ ma⁵⁵/ma²⁴]
> 
> 这风褛我给你磨到有襟花
> 
> ze5 fung1 lau1/lau5/lyu5 ngo5 kap1 ni5 mo4/mo6 du3 jau5 kam1 faa1/waa1
> 
> [tʃɛ²⁴ fʊŋ⁵⁵ lɐu⁵⁵/lɐu²⁴/ly²⁴ ŋɔ²⁴ kʰɐp⁵ ni²⁴ mɔ²¹/mɔ²² tu³³ jɐu²⁴ kʰɐm⁵⁵ fa⁵⁵/wa⁵⁵]
> 
> 连掉了渍也不怕 怎么始终牵挂
> 
> lin4 deu6/diu6 liu5 zik1 jaa5 bat1 paa3  zam2 mo1 ci2 zung1 hin1 gwaa3
> 
> [lin²¹ tɛu²²/tiu²² liu²⁴ tʃek⁵ ja²⁴ pɐt⁵ pʰa³³  tʃɐm³⁵ mɔ⁵⁵ tʃʰi³⁵ tʃʊŋ⁵⁵ hin⁵⁵ kʷa³³]
> 
> 苦心选中今天想车你回家
> 
> fu2 slam1 slyun2 zung1/zung3 gam1 tin1 sloeng2 ce1/gyu1 ni5 wui4 gaa1
> 
> [fu³⁵ ɬɐm⁵⁵ ɬyn³⁵ tʃʊŋ⁵⁵/tʃʊŋ³³ kɐm⁵⁵ tʰin⁵⁵ ɬœŋ³⁵ tʃʰɛ⁵⁵/ky⁵⁵ ni²⁴ wui²¹ ka⁵⁵]
> 
> 原谅我不再送花 伤口应要结疤
> 
> jyun4 loeng6 ngo5 bat1 zoi3 slung3 faa1/waa1  soeng1 hau2 jing1/jing3 jiu1/jiu3 git3 baa1
> 
> [jyn²¹ lœŋ²² ŋɔ²⁴ pɐt⁵ tʃɔi³³ ɬʊŋ³³ fa⁵⁵/wa⁵⁵  ʃœŋ⁵⁵ hɐu³⁵ jeŋ⁵⁵/jeŋ³³ jiu⁵⁵/jiu³³ kit³ pa⁵⁵]
> 
> 花瓣铺满心里坟场才害怕
> 
> faa1/waa1 baan6 pu1/pu3 mun5 slam1 li5/lyu5 fan4 coeng4 coi4 hoi6 paa3
> 
> [fa⁵⁵/wa⁵⁵ pan²² pʰu⁵⁵/pʰu³³ mun²⁴ ɬɐm⁵⁵ li²⁴/ly²⁴ fɐn²¹ tʃʰœŋ²¹ tʃʰɔi²¹ hɔi²² pʰa³³]
> 
> 如若你非我不嫁 彼此终必火化
> 
> jyu4 joek6 ni5 fi1 ngo5 bat1 gaa3  bi2/pi2 ci2/cy2 zung1 bit1 fo2 faa3/waa3
> 
> [jy²¹ jœk² ni²⁴ fi⁵⁵ ŋɔ²⁴ pɐt⁵ ka³³  pi³⁵/pʰi³⁵ tʃʰi³⁵/tsʰɿ³⁵ tʃʊŋ⁵⁵ pit⁵ fɔ³⁵ fa³³/wa³³]
> 
> 一生一世等一天需要代价
> 
> jat1 saang1 jat1 sai3 dang2 jat1 tin1 slyu1 jiu1/jiu3 doi6 gaa3
> 
> [jɐt⁵ ʃaŋ⁵⁵ jɐt⁵ ʃɐi³³ tɐŋ³⁵ jɐt⁵ tʰin⁵⁵ ɬy⁵⁵ jiu⁵⁵/jiu³³ tɔi²² ka³³]
> 
> 谁都只得那双手 靠拥抱亦难任你拥有
> 
> sui4 du1 zi2 dak1 naa5 soeng1 sau2  kaau3 jung2/ung2 pu5 jik6 naan4/naan6 jam4/jam6 ni5 jung2/ung2 jau5
> 
> [ʃui²¹ tu⁵⁵ tʃi³⁵ tɐk⁵ na²⁴ ʃœŋ⁵⁵ ʃɐu³⁵  kʰau³³ jʊŋ³⁵/ʊŋ³⁵ pʰu²⁴ jek² nan²¹/nan²² jɐm²¹/jɐm²² ni²⁴ jʊŋ³⁵/ʊŋ³⁵ jɐu²⁴]
> 
> 要拥有必先懂失去怎接受
> 
> jiu1/jiu3 jung2/ung2 jau5 bit1 slin1 dung2 sat1 hyu3 zam2 zip3 sau6
> 
> [jiu⁵⁵/jiu³³ jʊŋ³⁵/ʊŋ³⁵ jɐu²⁴ pit⁵ ɬin⁵⁵ tʊŋ³⁵ ʃɐt⁵ hy³³ tʃɐm³⁵ tʃip³ ʃɐu²²]
> 
> 曾沿着雪路浪游 为何为好事泪流
> 
> cang4/zang1 jyun4 zoek3/zoek6 slyut3 lu6 long6 jau4  wai4/wai6 ho4 wai4/wai6 hu2/hu3 si6/sy6 lui6 lau4
> 
> [tʃʰɐŋ²¹/tʃɐŋ⁵⁵ jyn²¹ tʃœk³/tʃœk² ɬyt³ lu²² lɔŋ²² jɐu²¹  wɐi²¹/wɐi²² hɔ²¹ wɐi²¹/wɐi²² hu³⁵/hu³³ ʃi²²/sɿ²² lui²² lɐu²¹]
> 
> 谁能凭爱意要富士山私有
> 
> sui4 nang4 bang6/pang4 oi3 ji3 jiu1/jiu3 fu3 si6/sy6 saan1 si1/sy1 jau5
> 
> [ʃui²¹ nɐŋ²¹ pɐŋ²²/pʰɐŋ²¹ ɔi³³ ji³³ jiu⁵⁵/jiu³³ fu³³ ʃi²²/sɿ²² ʃan⁵⁵ ʃi⁵⁵/sɿ⁵⁵ jɐu²⁴]
> 
> 何不把悲哀感觉 假设是来自你虚构
> 
> ho4 bat1 baa2 bi1 oi1 gaam2 gaau3/geu3/gok3/koek3/kok3  gaa2/gaa3/kaa3 cit3 si6 lai4/loi4 zi6/zy6 ni5 hyu1 gau3/kau3
> 
> [hɔ²¹ pɐt⁵ pa³⁵ pi⁵⁵ ɔi⁵⁵ kam³⁵ kau³³/kɛu³³/kɔk³/kʰœk³/kʰɔk³  ka³⁵/ka³³/kʰa³³ tʃʰit³ ʃi²² lɐi²¹/lɔi²¹ tʃi²²/tsɿ²² ni²⁴ hy⁵⁵ kɐu³³/kʰɐu³³]
> 
> 试管里找不到它染污眼眸
> 
> si3 gun2 li5/lyu5 zaau2/zeu2 bat1 du3 taa1 jim5 wu1 ngaan5/ngen5 mau4
> 
> [ʃi³³ kun³⁵ li²⁴/ly²⁴ tʃau³⁵/tʃɛu³⁵ pɐt⁵ tu³³ tʰa⁵⁵ jim²⁴ wu⁵⁵ ŋan²⁴/ŋɛn²⁴ mɐu²¹]
> 
> 前尘硬化像石头 随缘地抛下便逃走
> 
> cin4 can4 ngaang2/ngaang6 faa3/waa3 zoeng6 sek6 tau4  cui4 jyun4 di6 paau1/peu1 haa5/haa6 bin2/bin6/pin4 tu4 zau2
> 
> [tʃʰin²¹ tʃʰɐn²¹ ŋaŋ³⁵/ŋaŋ²² fa³³/wa³³ tʃœŋ²² ʃɛk² tʰɐu²¹  tʃʰui²¹ jyn²¹ ti²² pʰau⁵⁵/pʰɛu⁵⁵ ha²⁴/ha²² pin³⁵/pin²²/pʰin²¹ tʰu²¹ tʃɐu³⁵]
> 
> 我绝不罕有 往街里绕过一周 我便化乌有
> 
> ngo5 zyut6 bat1 hon2 jau5  wong5 gaai1 li5/lyu5 jiu2/jiu5 go3 jat1 zau1  ngo5 bin2/bin6/pin4 faa3/waa3 wu1 jau5
> 
> [ŋɔ²⁴ tʃyt² pɐt⁵ hɔn³⁵ jɐu²⁴  wɔŋ²⁴ kai⁵⁵ li²⁴/ly²⁴ jiu³⁵/jiu²⁴ kɔ³³ jɐt⁵ tʃɐu⁵⁵  ŋɔ²⁴ pin³⁵/pin²²/pʰin²¹ fa³³/wa³³ wu⁵⁵ jɐu²⁴]
> 
> 情人节不要说穿 只敢抚你发端
> 
> cing4 jan4 zit3 bat1 jiu1/jiu3 sui3/syut3 cyun1  zi2 gaam2 fu2 ni5 faat3 dyun1
> 
> [tʃʰeŋ²¹ jɐn²¹ tʃit³ pɐt⁵ jiu⁵⁵/jiu³³ ʃui³³/ʃyt³ tʃʰyn⁵⁵  tʃi³⁵ kam³⁵ fu³⁵ ni²⁴ fat³ tyn⁵⁵]
> 
> 这种姿态可会令你更心酸
> 
> ze5 zung2/zung3 zi1/zy1 taai3 ho2 wui2/wui5/wui6 ling6 ni5 gaang1/gang1/gang3 slam1 slyun1
> 
> [tʃɛ²⁴ tʃʊŋ³⁵/tʃʊŋ³³ tʃi⁵⁵/tsɿ⁵⁵ tʰai³³ hɔ³⁵ wui³⁵/wui²⁴/wui²² leŋ²² ni²⁴ kaŋ⁵⁵/kɐŋ⁵⁵/kɐŋ³³ ɬɐm⁵⁵ ɬyn⁵⁵]
> 
> 留在汽车里取暖 应该怎么规劝
> 
> lau4 zoi6 hi3 ce1/gyu1 li5/lyu5 cyu2 nyun5  jing1/jing3 goi1 zam2 mo1 kwai1 hyun3
> 
> [lɐu²¹ tʃɔi²² hi³³ tʃʰɛ⁵⁵/ky⁵⁵ li²⁴/ly²⁴ tʃʰy³⁵ nyn²⁴  jeŋ⁵⁵/jeŋ³³ kɔi⁵⁵ tʃɐm³⁵ mɔ⁵⁵ kʷʰɐi⁵⁵ hyn³³]
> 
> 怎么可以将手腕忍痛划损
> 
> zam2 mo1 ho2 ji5 zoeng1/zoeng3 sau2 wun2 jan5 tung3 waak6 slyun2
> 
> [tʃɐm³⁵ mɔ⁵⁵ hɔ³⁵ ji²⁴ tʃœŋ⁵⁵/tʃœŋ³³ ʃɐu³⁵ wun³⁵ jɐn²⁴ tʰʊŋ³³ wak² ɬyn³⁵]
> 
> 人活到几岁算短 失恋只有更短
> 
> jan4 wut6 du3 gi1/gi2 slui3 slyun3 dyun2  sat1 lyun2 zi2 jau5 gaang1/gang1/gang3 dyun2
> 
> [jɐn²¹ wut² tu³³ ki⁵⁵/ki³⁵ ɬui³³ ɬyn³³ tyn³⁵  ʃɐt⁵ lyn³⁵ tʃi³⁵ jɐu²⁴ kaŋ⁵⁵/kɐŋ⁵⁵/kɐŋ³³ tyn³⁵]
> 
> 归家需要几里路谁能预算
> 
> gwai1 gaa1 slyu1 jiu1/jiu3 gi1/gi2 li5 lu6 sui4 nang4 jyu6 slyun3
> 
> [kʷɐi⁵⁵ ka⁵⁵ ɬy⁵⁵ jiu⁵⁵/jiu³³ ki⁵⁵/ki³⁵ li²⁴ lu²² ʃui²¹ nɐŋ²¹ jy²² ɬyn³³]
> 
> 忘掉我跟你恩怨 樱花开了几转
> 
> mong4/mong6 deu6/diu6 ngo5 gan1 ni5 an1/ngan1 jyun3  jing1 faa1/waa1 hoi1 liu5 gi1/gi2 zyun2/zyun3
> 
> [mɔŋ²¹/mɔŋ²² tɛu²²/tiu²² ŋɔ²⁴ kɐn⁵⁵ ni²⁴ ɐn⁵⁵/ŋɐn⁵⁵ jyn³³  jeŋ⁵⁵ fa⁵⁵/wa⁵⁵ hɔi⁵⁵ liu²⁴ ki⁵⁵/ki³⁵ tʃyn³⁵/tʃyn³³]
> 
> 东京之旅一早比一世遥远
> 
> dung1 ging1 zi1 lyu5 jat1 zu2 bi2 jat1 sai3 jiu4 jyun5
> 
> [tʊŋ⁵⁵ keŋ⁵⁵ tʃi⁵⁵ ly²⁴ jɐt⁵ tʃu³⁵ pi³⁵ jɐt⁵ ʃɐi³³ jiu²¹ jyn²⁴]
> 
> 谁都只得那双手 靠拥抱亦难任你拥有
> 
> sui4 du1 zi2 dak1 naa5 soeng1 sau2  kaau3 jung2/ung2 pu5 jik6 naan4/naan6 jam4/jam6 ni5 jung2/ung2 jau5
> 
> [ʃui²¹ tu⁵⁵ tʃi³⁵ tɐk⁵ na²⁴ ʃœŋ⁵⁵ ʃɐu³⁵  kʰau³³ jʊŋ³⁵/ʊŋ³⁵ pʰu²⁴ jek² nan²¹/nan²² jɐm²¹/jɐm²² ni²⁴ jʊŋ³⁵/ʊŋ³⁵ jɐu²⁴]
> 
> 要拥有必先懂失去怎接受
> 
> jiu1/jiu3 jung2/ung2 jau5 bit1 slin1 dung2 sat1 hyu3 zam2 zip3 sau6
> 
> [jiu⁵⁵/jiu³³ jʊŋ³⁵/ʊŋ³⁵ jɐu²⁴ pit⁵ ɬin⁵⁵ tʊŋ³⁵ ʃɐt⁵ hy³³ tʃɐm³⁵ tʃip³ ʃɐu²²]
> 
> 曾沿着雪路浪游 为何为好事泪流
> 
> cang4/zang1 jyun4 zoek3/zoek6 slyut3 lu6 long6 jau4  wai4/wai6 ho4 wai4/wai6 hu2/hu3 si6/sy6 lui6 lau4
> 
> [tʃʰɐŋ²¹/tʃɐŋ⁵⁵ jyn²¹ tʃœk³/tʃœk² ɬyt³ lu²² lɔŋ²² jɐu²¹  wɐi²¹/wɐi²² hɔ²¹ wɐi²¹/wɐi²² hu³⁵/hu³³ ʃi²²/sɿ²² lui²² lɐu²¹]
> 
> 谁能凭爱意要富士山私有
> 
> sui4 nang4 bang6/pang4 oi3 ji3 jiu1/jiu3 fu3 si6/sy6 saan1 si1/sy1 jau5
> 
> [ʃui²¹ nɐŋ²¹ pɐŋ²²/pʰɐŋ²¹ ɔi³³ ji³³ jiu⁵⁵/jiu³³ fu³³ ʃi²²/sɿ²² ʃan⁵⁵ ʃi⁵⁵/sɿ⁵⁵ jɐu²⁴]
> 
> 何不把悲哀感觉 假设是来自你虚构
> 
> ho4 bat1 baa2 bi1 oi1 gaam2 gaau3/geu3/gok3/koek3/kok3  gaa2/gaa3/kaa3 cit3 si6 lai4/loi4 zi6/zy6 ni5 hyu1 gau3/kau3
> 
> [hɔ²¹ pɐt⁵ pa³⁵ pi⁵⁵ ɔi⁵⁵ kam³⁵ kau³³/kɛu³³/kɔk³/kʰœk³/kʰɔk³  ka³⁵/ka³³/kʰa³³ tʃʰit³ ʃi²² lɐi²¹/lɔi²¹ tʃi²²/tsɿ²² ni²⁴ hy⁵⁵ kɐu³³/kʰɐu³³]
> 
> 试管里找不到它染污眼眸
> 
> si3 gun2 li5/lyu5 zaau2/zeu2 bat1 du3 taa1 jim5 wu1 ngaan5/ngen5 mau4
> 
> [ʃi³³ kun³⁵ li²⁴/ly²⁴ tʃau³⁵/tʃɛu³⁵ pɐt⁵ tu³³ tʰa⁵⁵ jim²⁴ wu⁵⁵ ŋan²⁴/ŋɛn²⁴ mɐu²¹]
> 
> 前尘硬化像石头 随缘地抛下便逃走
> 
> cin4 can4 ngaang2/ngaang6 faa3/waa3 zoeng6 sek6 tau4  cui4 jyun4 di6 paau1/peu1 haa5/haa6 bin2/bin6/pin4 tu4 zau2
> 
> [tʃʰin²¹ tʃʰɐn²¹ ŋaŋ³⁵/ŋaŋ²² fa³³/wa³³ tʃœŋ²² ʃɛk² tʰɐu²¹  tʃʰui²¹ jyn²¹ ti²² pʰau⁵⁵/pʰɛu⁵⁵ ha²⁴/ha²² pin³⁵/pin²²/pʰin²¹ tʰu²¹ tʃɐu³⁵]
> 
> 我绝不罕有 往街里绕过一周 我便化乌有
> 
> ngo5 zyut6 bat1 hon2 jau5  wong5 gaai1 li5/lyu5 jiu2/jiu5 go3 jat1 zau1  ngo5 bin2/bin6/pin4 faa3/waa3 wu1 jau5
> 
> [ŋɔ²⁴ tʃyt² pɐt⁵ hɔn³⁵ jɐu²⁴  wɔŋ²⁴ kai⁵⁵ li²⁴/ly²⁴ jiu³⁵/jiu²⁴ kɔ³³ jɐt⁵ tʃɐu⁵⁵  ŋɔ²⁴ pin³⁵/pin²²/pʰin²¹ fa³³/wa³³ wu⁵⁵ jɐu²⁴]
> 
> 谁都只得那双手 靠拥抱亦难任你拥有
> 
> sui4 du1 zi2 dak1 naa5 soeng1 sau2  kaau3 jung2/ung2 pu5 jik6 naan4/naan6 jam4/jam6 ni5 jung2/ung2 jau5
> 
> [ʃui²¹ tu⁵⁵ tʃi³⁵ tɐk⁵ na²⁴ ʃœŋ⁵⁵ ʃɐu³⁵  kʰau³³ jʊŋ³⁵/ʊŋ³⁵ pʰu²⁴ jek² nan²¹/nan²² jɐm²¹/jɐm²² ni²⁴ jʊŋ³⁵/ʊŋ³⁵ jɐu²⁴]
> 
> 要拥有必先懂失去怎接受
> 
> jiu1/jiu3 jung2/ung2 jau5 bit1 slin1 dung2 sat1 hyu3 zam2 zip3 sau6
> 
> [jiu⁵⁵/jiu³³ jʊŋ³⁵/ʊŋ³⁵ jɐu²⁴ pit⁵ ɬin⁵⁵ tʊŋ³⁵ ʃɐt⁵ hy³³ tʃɐm³⁵ tʃip³ ʃɐu²²]
> 
> 曾沿着雪路浪游 为何为好事泪流
> 
> cang4/zang1 jyun4 zoek3/zoek6 slyut3 lu6 long6 jau4  wai4/wai6 ho4 wai4/wai6 hu2/hu3 si6/sy6 lui6 lau4
> 
> [tʃʰɐŋ²¹/tʃɐŋ⁵⁵ jyn²¹ tʃœk³/tʃœk² ɬyt³ lu²² lɔŋ²² jɐu²¹  wɐi²¹/wɐi²² hɔ²¹ wɐi²¹/wɐi²² hu³⁵/hu³³ ʃi²²/sɿ²² lui²² lɐu²¹]
> 
> 谁能凭爱意要富士山私有
> 
> sui4 nang4 bang6/pang4 oi3 ji3 jiu1/jiu3 fu3 si6/sy6 saan1 si1/sy1 jau5
> 
> [ʃui²¹ nɐŋ²¹ pɐŋ²²/pʰɐŋ²¹ ɔi³³ ji³³ jiu⁵⁵/jiu³³ fu³³ ʃi²²/sɿ²² ʃan⁵⁵ ʃi⁵⁵/sɿ⁵⁵ jɐu²⁴]
> 
> 何不把悲哀感觉 假设是来自你虚构
> 
> ho4 bat1 baa2 bi1 oi1 gaam2 gaau3/geu3/gok3/koek3/kok3  gaa2/gaa3/kaa3 cit3 si6 lai4/loi4 zi6/zy6 ni5 hyu1 gau3/kau3
> 
> [hɔ²¹ pɐt⁵ pa³⁵ pi⁵⁵ ɔi⁵⁵ kam³⁵ kau³³/kɛu³³/kɔk³/kʰœk³/kʰɔk³  ka³⁵/ka³³/kʰa³³ tʃʰit³ ʃi²² lɐi²¹/lɔi²¹ tʃi²²/tsɿ²² ni²⁴ hy⁵⁵ kɐu³³/kʰɐu³³]
> 
> 试管里找不到它染污眼眸
> 
> si3 gun2 li5/lyu5 zaau2/zeu2 bat1 du3 taa1 jim5 wu1 ngaan5/ngen5 mau4
> 
> [ʃi³³ kun³⁵ li²⁴/ly²⁴ tʃau³⁵/tʃɛu³⁵ pɐt⁵ tu³³ tʰa⁵⁵ jim²⁴ wu⁵⁵ ŋan²⁴/ŋɛn²⁴ mɐu²¹]
> 
> 前尘硬化像石头 随缘地抛下便逃走
> 
> cin4 can4 ngaang2/ngaang6 faa3/waa3 zoeng6 sek6 tau4  cui4 jyun4 di6 paau1/peu1 haa5/haa6 bin2/bin6/pin4 tu4 zau2
> 
> [tʃʰin²¹ tʃʰɐn²¹ ŋaŋ³⁵/ŋaŋ²² fa³³/wa³³ tʃœŋ²² ʃɛk² tʰɐu²¹  tʃʰui²¹ jyn²¹ ti²² pʰau⁵⁵/pʰɛu⁵⁵ ha²⁴/ha²² pin³⁵/pin²²/pʰin²¹ tʰu²¹ tʃɐu³⁵]
> 
> 我绝不罕有 往街里绕过一周 我便化乌有
> 
> ngo5 zyut6 bat1 hon2 jau5  wong5 gaai1 li5/lyu5 jiu2/jiu5 go3 jat1 zau1  ngo5 bin2/bin6/pin4 faa3/waa3 wu1 jau5
> 
> [ŋɔ²⁴ tʃyt² pɐt⁵ hɔn³⁵ jɐu²⁴  wɔŋ²⁴ kai⁵⁵ li²⁴/ly²⁴ jiu³⁵/jiu²⁴ kɔ³³ jɐt⁵ tʃɐu⁵⁵  ŋɔ²⁴ pin³⁵/pin²²/pʰin²¹ fa³³/wa³³ wu⁵⁵ jɐu²⁴]
> 
> 你还嫌不够 我把这陈年风褛 送赠你解咒
> 
> ni5 waan4/wen4 him4/jim4 bat1 gau3  ngo5 baa2 ze5 can4 nin4 fung1 lau1/lau5/lyu5  slung3 zang6 ni5 gaai2/gaai3/haai6 zau3
> 
> [ni²⁴ wan²¹/wɛn²¹ him²¹/jim²¹ pɐt⁵ kɐu³³  ŋɔ²⁴ pa³⁵ tʃɛ²⁴ tʃʰɐn²¹ nin²¹ fʊŋ⁵⁵ lɐu⁵⁵/lɐu²⁴/ly²⁴  ɬʊŋ³³ tʃɐŋ²² ni²⁴ kai³⁵/kai³³/hai²² tʃɐu³³]
