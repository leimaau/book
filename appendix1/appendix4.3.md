# 歌词注音工具

对于熟悉python的读者，这里提供一个可以标注粤拼和IPA的一个python脚本，灵感来源于[这里](https://github.com/laubonghaudoi/poem_auto_tag)，笔者对其作了重写以适用于本文，此处感谢原作者[刘邦后代](https://github.com/laubonghaudoi)。

本项目的源码下载地址：[**下载地址**](https://github.com/leimaau/pythonTools)，脚本代码在`pythopnTools/lyricsTojyutping`文件夹中。

input.txt放需要标注的歌词，output.txt为输出的标注结果，执行lyricsTojyutping.py中的代码即可：

```python
import re
from mytool import jyutping_to_ipa

filename='data_naamning.txt' # 字典文件 data_naamning 南宁粤拼; data_gwongzau 广州粤拼
lines = open(filename, encoding='utf-8').readlines()

char = []
dictionary = {}

for line in lines:
    char = line.split()
    if char[0] in dictionary:
        dictionary[char[0]] = dictionary[char[0]] + '/' + char[1]
    else:
        dictionary[char[0]] = char[1]

# flag: 0 拼音 1 ipa ; flag2: 0 regstr忽略 1 regstr不忽略
def dealfunc(regstr,prose,flag,flag2):
        try:
            if re.match(r"" + regstr, list(prose)[0]):
                if flag2==1:
                    s = list(prose)[0]
                else:
                    s = ''
            else:
                if flag==1:
                    s = jyutping_to_ipa(dictionary[list(prose)[0]])
                else:
                    s = dictionary[list(prose)[0]]
        except KeyError:
            s = 'ERR'

        for char in list(prose)[1::]:
            try:
                if re.match(r"" + regstr, char):
                    if flag2==1:
                        s += char
                    else:
                        s += ''
                else:
                    if flag==1:
                        s += ' '+ jyutping_to_ipa(dictionary[char])
                    else:
                        s += ' '+ dictionary[char]
            except KeyError:
                s += ' '+ 'ERR'
        return s

lyrics = open('input.txt', encoding='utf-8').readlines()
out = open('output.txt', 'w', encoding='utf-8')

for paragraph in lyrics:
    try:
        line = paragraph.replace(' ','<space>').split()[0]
    except:
        continue

    sentences = line.split()
    for prose in sentences:
        out.write(prose.replace('<space>',' '))
        out.write('\n')

        prose = re.sub(r'([\u4e00-\u9fa5]+)([0-9A-Za-z-_]+)',r'\1<space>\2',prose)
        
        s = dealfunc('[0-9A-Za-z]|[-_,，.。?？!！:：;；“”\[\]<>「」『』《》、]+',prose,0,1)
        out.write(s.replace('<space> ',' ').replace('<space>',' ')+'\n[')

        s2 = dealfunc('[0-9A-Za-z]|[-_,，.。?？!！:：;；“”\[\]<>「」『』《》、]+',prose,1,1)
        if filename=='data_gwongzau':
            out.write(s2.replace('<space> ',' ').replace('<space>',' ').replace('˨˦','˩˧')+']\n')  # 阳上：南宁24 广州13
        else:
            out.write(s2.replace('<space> ',' ').replace('<space>',' ')+']\n')

out.close()
```

多音字需要自己手工核对，data_naamning.txt为南宁粤拼字典，data_gwongzau.txt为广州粤拼字典，目前只提供这两种标注，更多功能读者可以根据自己的需求对脚本进行修改。

下面以陈奕迅的《富士山下》歌词作为标注例子：

## 南宁音

> [!EXAMPLE]
> 
> **富士山下-陈奕迅**
> 
> **fu3 si6/sy6 saan1 haa5/haa6 - can4 jik6 slan3/slyun3**
> 
> **[fuː˧˧ ʃiː˨˨/sɿ˨˨ ʃaːn˥˥ haː˨˦/haː˨˨ - t͡ʃʰɐn˨˩ jɪk̚˨ ɬɐn˧˧/ɬyːn˧˧]**
> 
> 拦路雨偏似雪花 饮泣的你冻吗
> 
> laan4 lu6 jyu5 pin1 ci5/cy5 slyut3 faa1/waa1 jam2/jam3 jap1/lap1 dik1 ni5 dung3 maa1/maa5
> 
> [laːn˨˩ luː˨˨ jyː˨˦ pʰiːn˥˥ t͡ʃʰiː˨˦/t͡sʰɿ˨˦ ɬyːt̚˧ faː˥˥/waː˥˥ jɐm˧˥/jɐm˧˧ jɐp̚˥/lɐp̚˥ tɪk̚˥ niː˨˦ tʊŋ˧˧ maː˥˥/maː˨˦]
> 
> 这风褛我给你磨到有襟花
> 
> ze5 fung1 lau1/lau5/lyu5 ngo5 kap1 ni5 mo4/mo6 du3 jau5 kam1 faa1/waa1
> 
> [t͡ʃɛː˨˦ fʊŋ˥˥ lɐu˥˥/lɐu˨˦/lyː˨˦ ŋɔː˨˦ kʰɐp̚˥ niː˨˦ mɔː˨˩/mɔː˨˨ tuː˧˧ jɐu˨˦ kʰɐm˥˥ faː˥˥/waː˥˥]
> 
> 连掉了渍也不怕 怎么始终牵挂
> 
> lin4 deu6/diu6 liu5 zik1 jaa5 bat1 paa3 zam2 jiu1/maa1/mo1 ci2 zung1 hin1 gwaa3
> 
> [liːn˨˩ tɛːu˨˨/diːu˨˨ liːu˨˦ t͡ʃɪk̚˥ jaː˨˦ pɐt̚˥ pʰaː˧˧ t͡ʃɐm˧˥ jiːu˥˥/maː˥˥/mɔː˥˥ t͡ʃʰiː˧˥ t͡ʃʊŋ˥˥ hiːn˥˥ kʷaː˧˧]
> 
> 苦心选中今天想车你回家
> 
> fu2 slam1 slyun2 zung1/zung3 gam1 tin1 sloeng2 ce1/gyu1 ni5 wui4 gaa1
> 
> [fuː˧˥ ɬɐm˥˥ ɬyːn˧˥ t͡ʃʊŋ˥˥/t͡ʃʊŋ˧˧ kɐm˥˥ tʰiːn˥˥ ɬœːŋ˧˥ t͡ʃʰɛː˥˥/gyː˥˥ niː˨˦ wuːi˨˩ kaː˥˥]
> 
> 原谅我不再送花 伤口应要结疤
> 
> jyun4 loeng6 ngo5 bat1 zoi3 slung3 faa1/waa1 soeng1 hau2 jing1/jing3 jiu1/jiu3 git3 baa1
> 
> [jyːn˨˩ lœːŋ˨˨ ŋɔː˨˦ pɐt̚˥ t͡ʃɔːi˧˧ ɬʊŋ˧˧ faː˥˥/waː˥˥ ʃœːŋ˥˥ hɐu˧˥ jɪŋ˥˥/jɪŋ˧˧ jiːu˥˥/jiːu˧˧ kɪt̚˧ paː˥˥]
> 
> 花瓣铺满心里坟场才害怕
> 
> faa1/waa1 baan6 pu1/pu3 mun5 slam1 li5/lyu5 fan4 coeng4 coi4 hoi6 paa3
> 
> [faː˥˥/waː˥˥ paːn˨˨ pʰuː˥˥/puː˧˧ muːn˨˦ ɬɐm˥˥ liː˨˦/lyː˨˦ fɐn˨˩ t͡ʃʰœːŋ˨˩ t͡ʃʰɔːi˨˩ hɔːi˨˨ pʰaː˧˧]
> 
> 如若你非我不嫁 彼此终必火化
> 
> jyu4 joek6 ni5 fi1 ngo5 bat1 gaa3 bi2/pi2 ci2/cy2 zung1 bit1 fo2 faa3/waa3
> 
> [jyː˨˩ jœːk̚˨ niː˨˦ fiː˥˥ ŋɔː˨˦ pɐt̚˥ kaː˧˧ piː˧˥/piː˧˥ t͡ʃʰiː˧˥/t͡sʰɿ˧˥ t͡ʃʊŋ˥˥ pɪt̚˥ fɔː˧˥ faː˧˧/waː˧˧]
> 
> 一生一世等一天需要代价
> 
> jat1 saang1 jat1 sai3 dang2 jat1 tin1 slyu1 jiu1/jiu3 doi6 gaa3
> 
> [jɐt̚˥ ʃaːŋ˥˥ jɐt̚˥ ʃɐi˧˧ tɐŋ˧˥ jɐt̚˥ tʰiːn˥˥ ɬyː˥˥ jiːu˥˥/jiːu˧˧ tɔːi˨˨ kaː˧˧]
> 
> 谁都只得那双手 靠拥抱亦难任你拥有
> 
> sui4 du1 zek3/zi2/zik3 dak1 naa5 soeng1 sau2 kaau3 jung2/ung2 pu5 jik6 naan4/naan6 jam4/jam6 ni5 jung2/ung2 jau5
> 
> [ʃuːi˨˩ tuː˥˥ t͡ʃɛːk̚˧/t͡ʃiː˧˥/t͡ʃɪk̚˧ tɐk̚˥ naː˨˦ ʃœːŋ˥˥ ʃɐu˧˥ kʰaːu˧˧ jʊŋ˧˥/ʊŋ˧˥ pʰuː˨˦ jɪk̚˨ naːn˨˩/naːn˨˨ jɐm˨˩/jɐm˨˨ niː˨˦ jʊŋ˧˥/ʊŋ˧˥ jɐu˨˦]
> 
> 要拥有必先懂失去怎接受
> 
> jiu1/jiu3 jung2/ung2 jau5 bit1 slin1 dung2 sat1 hyu3 zam2 zip3 sau6
> 
> [jiːu˥˥/jiːu˧˧ jʊŋ˧˥/ʊŋ˧˥ jɐu˨˦ pɪt̚˥ ɬiːn˥˥ tʊŋ˧˥ ʃɐt̚˥ hyː˧˧ t͡ʃɐm˧˥ t͡ʃɪp̚˧ ʃɐu˨˨]
> 
> 曾沿着雪路浪游 为何为好事泪流
> 
> cang4/zang1 jyun4 zoek3/zoek6 slyut3 lu6 long6 jau4 wai4/wai6 ho4 wai4/wai6 hu2/hu3 si6/sy6 lui6 lau4
> 
> [t͡ʃʰɐŋ˨˩/t͡ʃɐŋ˥˥ jyːn˨˩ t͡ʃœːk̚˧/t͡ʃœːk̚˨ ɬyːt̚˧ luː˨˨ lɔːŋ˨˨ jɐu˨˩ wɐi˨˩/wɐi˨˨ hɔː˨˩ wɐi˨˩/wɐi˨˨ huː˧˥/huː˧˧ ʃiː˨˨/sɿ˨˨ luːi˨˨ lɐu˨˩]
> 
> 谁能凭爱意要富士山私有
> 
> sui4 nang4 bang6/pang4 oi3 ji3 jiu1/jiu3 fu3 si6/sy6 saan1 si1/sy1 jau5
> 
> [ʃuːi˨˩ nɐŋ˨˩ pɐŋ˨˨/pɐŋ˨˩ ɔːi˧˧ jiː˧˧ jiːu˥˥/jiːu˧˧ fuː˧˧ ʃiː˨˨/sɿ˨˨ ʃaːn˥˥ ʃiː˥˥/sɿ˥˥ jɐu˨˦]
> 
> 何不把悲哀感觉 假设是来自你虚构
> 
> ho4 bat1 baa2/baa3 bi1 oi1 gaam2 gaau3/geu3/gok3/koek3/kok3 gaa2/gaa3/kaa3 cit3 si6 lai4/loi4 zi6/zy6 ni5 hyu1 gau3/kau3
> 
> [hɔː˨˩ pɐt̚˥ paː˧˥/baː˧˧ piː˥˥ ɔːi˥˥ kaːm˧˥ kaːu˧˧/gɛːu˧˧/gɔːk̚˧/kœːk̚˧/kɔːk̚˧ kaː˧˥/gaː˧˧/kaː˧˧ t͡ʃʰɪt̚˧ ʃiː˨˨ lɐi˨˩/lɔːi˨˩ t͡ʃiː˨˨/t͡sɿ˨˨ niː˨˦ hyː˥˥ kɐu˧˧/kɐu˧˧]
> 
> 试管里找不到它染污眼眸
> 
> si3 gun2 li5/lyu5 zaau2/zeu2 bat1 du3 taa1 jim5 wu1 ngaan5/ngen5 mau4
> 
> [ʃiː˧˧ kuːn˧˥ liː˨˦/lyː˨˦ t͡ʃaːu˧˥/t͡ʃɛːu˧˥ pɐt̚˥ tuː˧˧ tʰaː˥˥ jiːm˨˦ wuː˥˥ ŋaːn˨˦/ŋɛːn˨˦ mɐu˨˩]
> 
> 前尘硬化像石头 随缘地抛下便逃走
> 
> cin4 can4 ngaang2/ngaang6 faa3/waa3 zoeng6 sek6 tau4 cui4 jyun4 di6 paau1/peu1 haa5/haa6 bin2/bin6/pin4 tu4 zau2
> 
> [t͡ʃʰiːn˨˩ t͡ʃʰɐn˨˩ ŋaːŋ˧˥/ŋaːŋ˨˨ faː˧˧/waː˧˧ t͡ʃœːŋ˨˨ ʃɛːk̚˨ tʰɐu˨˩ t͡ʃʰuːi˨˩ jyːn˨˩ tiː˨˨ pʰaːu˥˥/pɛːu˥˥ haː˨˦/haː˨˨ piːn˧˥/biːn˨˨/piːn˨˩ tʰuː˨˩ t͡ʃɐu˧˥]
> 
> 我绝不罕有 往街里绕过一周 我便化乌有
> 
> ngo5 zyut6 bat1 hon2 jau5 wong5 gaai1 li5/lyu5 jiu2/jiu5 go3 jat1 zau1 ngo5 bin2/bin6/pin4 faa3/waa3 wu1 jau5
> 
> [ŋɔː˨˦ t͡ʃyːt̚˨ pɐt̚˥ hɔːn˧˥ jɐu˨˦ wɔːŋ˨˦ kaːi˥˥ liː˨˦/lyː˨˦ jiːu˧˥/jiːu˨˦ kɔː˧˧ jɐt̚˥ t͡ʃɐu˥˥ ŋɔː˨˦ piːn˧˥/biːn˨˨/piːn˨˩ faː˧˧/waː˧˧ wuː˥˥ jɐu˨˦]
> 
> 情人节不要说穿 只敢抚你发端
> 
> cing4 jan4 zit3 bat1 jiu1/jiu3 sui3/syut3 cyun1 zek3/zi2/zik3 gaam2 fu2 ni5 faat3 dyun1
> 
> [t͡ʃʰɪŋ˨˩ jɐn˨˩ t͡ʃɪt̚˧ pɐt̚˥ jiːu˥˥/jiːu˧˧ ʃuːi˧˧/ʃyːt̚˧ t͡ʃʰyːn˥˥ t͡ʃɛːk̚˧/t͡ʃiː˧˥/t͡ʃɪk̚˧ kaːm˧˥ fuː˧˥ niː˨˦ faːt̚˧ tyːn˥˥]
> 
> 这种姿态可会令你更心酸
> 
> ze5 cung4/zung2/zung3 zi1/zy1 taai3 ho2 wui2/wui5/wui6 ling6 ni5 gaang1/gang1/gang3 slam1 slyun1
> 
> [t͡ʃɛː˨˦ t͡ʃʰʊŋ˨˩/t͡ʃʊŋ˧˥/t͡ʃʊŋ˧˧ t͡ʃiː˥˥/t͡sɿ˥˥ tʰaːi˧˧ hɔː˧˥ wuːi˧˥/wuːi˨˦/wuːi˨˨ lɪŋ˨˨ niː˨˦ kaːŋ˥˥/gɐŋ˥˥/gɐŋ˧˧ ɬɐm˥˥ ɬyːn˥˥]
> 
> 留在汽车里取暖 应该怎么规劝
> 
> lau4 zoi6 hi3 ce1/gyu1 li5/lyu5 cyu2 nyun5 jing1/jing3 goi1 zam2 jiu1/maa1/mo1 kwai1 hyun3
> 
> [lɐu˨˩ t͡ʃɔːi˨˨ hiː˧˧ t͡ʃʰɛː˥˥/gyː˥˥ liː˨˦/lyː˨˦ t͡ʃʰyː˧˥ nyːn˨˦ jɪŋ˥˥/jɪŋ˧˧ kɔːi˥˥ t͡ʃɐm˧˥ jiːu˥˥/maː˥˥/mɔː˥˥ kʷʰɐi˥˥ hyːn˧˧]
> 
> 怎么可以将手腕忍痛划损
> 
> zam2 jiu1/maa1/mo1 ho2 ji5 zoeng1/zoeng3 sau2 wun2 jan5 tung3 waa1/waa4/waak6 slyun2
> 
> [t͡ʃɐm˧˥ jiːu˥˥/maː˥˥/mɔː˥˥ hɔː˧˥ jiː˨˦ t͡ʃœːŋ˥˥/t͡ʃœːŋ˧˧ ʃɐu˧˥ wuːn˧˥ jɐn˨˦ tʰʊŋ˧˧ waː˥˥/waː˨˩/waːk̚˨ ɬyːn˧˥]
> 
> 人活到几岁算短 失恋只有更短
> 
> jan4 wut6 du3 gi1/gi2 slui3 slyun3 dyun2 sat1 lyun2 zek3/zi2/zik3 jau5 gaang1/gang1/gang3 dyun2
> 
> [jɐn˨˩ wuːt̚˨ tuː˧˧ kiː˥˥/giː˧˥ ɬuːi˧˧ ɬyːn˧˧ tyːn˧˥ ʃɐt̚˥ lyːn˧˥ t͡ʃɛːk̚˧/t͡ʃiː˧˥/t͡ʃɪk̚˧ jɐu˨˦ kaːŋ˥˥/gɐŋ˥˥/gɐŋ˧˧ tyːn˧˥]
> 
> 归家需要几里路谁能预算
> 
> gwai1 gaa1 slyu1 jiu1/jiu3 gi1/gi2 li5/lyu5 lu6 sui4 nang4 jyu6 slyun3
> 
> [kʷɐi˥˥ kaː˥˥ ɬyː˥˥ jiːu˥˥/jiːu˧˧ kiː˥˥/giː˧˥ liː˨˦/lyː˨˦ luː˨˨ ʃuːi˨˩ nɐŋ˨˩ jyː˨˨ ɬyːn˧˧]
> 
> 忘掉我跟你恩怨 樱花开了几转
> 
> mong4/mong6 deu6/diu6 ngo5 gan1 ni5 an1/ngan1 jyun3 jing1 faa1/waa1 hoi1 liu5 gi1/gi2 zyun2/zyun3
> 
> [mɔːŋ˨˩/mɔːŋ˨˨ tɛːu˨˨/diːu˨˨ ŋɔː˨˦ kɐn˥˥ niː˨˦ ɐn˥˥/ŋɐn˥˥ jyːn˧˧ jɪŋ˥˥ faː˥˥/waː˥˥ hɔːi˥˥ liːu˨˦ kiː˥˥/giː˧˥ t͡ʃyːn˧˥/t͡ʃyːn˧˧]
> 
> 东京之旅一早比一世遥远
> 
> dung1 ging1 zi1 lyu5 jat1 zu2 bi2 jat1 sai3 jiu4 jyun5
> 
> [tʊŋ˥˥ kɪŋ˥˥ t͡ʃiː˥˥ lyː˨˦ jɐt̚˥ t͡ʃuː˧˥ piː˧˥ jɐt̚˥ ʃɐi˧˧ jiːu˨˩ jyːn˨˦]
> 
> 谁都只得那双手 靠拥抱亦难任你拥有
> 
> sui4 du1 zek3/zi2/zik3 dak1 naa5 soeng1 sau2 kaau3 jung2/ung2 pu5 jik6 naan4/naan6 jam4/jam6 ni5 jung2/ung2 jau5
> 
> [ʃuːi˨˩ tuː˥˥ t͡ʃɛːk̚˧/t͡ʃiː˧˥/t͡ʃɪk̚˧ tɐk̚˥ naː˨˦ ʃœːŋ˥˥ ʃɐu˧˥ kʰaːu˧˧ jʊŋ˧˥/ʊŋ˧˥ pʰuː˨˦ jɪk̚˨ naːn˨˩/naːn˨˨ jɐm˨˩/jɐm˨˨ niː˨˦ jʊŋ˧˥/ʊŋ˧˥ jɐu˨˦]
> 
> 要拥有必先懂失去怎接受
> 
> jiu1/jiu3 jung2/ung2 jau5 bit1 slin1 dung2 sat1 hyu3 zam2 zip3 sau6
> 
> [jiːu˥˥/jiːu˧˧ jʊŋ˧˥/ʊŋ˧˥ jɐu˨˦ pɪt̚˥ ɬiːn˥˥ tʊŋ˧˥ ʃɐt̚˥ hyː˧˧ t͡ʃɐm˧˥ t͡ʃɪp̚˧ ʃɐu˨˨]
> 
> 曾沿着雪路浪游 为何为好事泪流
> 
> cang4/zang1 jyun4 zoek3/zoek6 slyut3 lu6 long6 jau4 wai4/wai6 ho4 wai4/wai6 hu2/hu3 si6/sy6 lui6 lau4
> 
> [t͡ʃʰɐŋ˨˩/t͡ʃɐŋ˥˥ jyːn˨˩ t͡ʃœːk̚˧/t͡ʃœːk̚˨ ɬyːt̚˧ luː˨˨ lɔːŋ˨˨ jɐu˨˩ wɐi˨˩/wɐi˨˨ hɔː˨˩ wɐi˨˩/wɐi˨˨ huː˧˥/huː˧˧ ʃiː˨˨/sɿ˨˨ luːi˨˨ lɐu˨˩]
> 
> 谁能凭爱意要富士山私有
> 
> sui4 nang4 bang6/pang4 oi3 ji3 jiu1/jiu3 fu3 si6/sy6 saan1 si1/sy1 jau5
> 
> [ʃuːi˨˩ nɐŋ˨˩ pɐŋ˨˨/pɐŋ˨˩ ɔːi˧˧ jiː˧˧ jiːu˥˥/jiːu˧˧ fuː˧˧ ʃiː˨˨/sɿ˨˨ ʃaːn˥˥ ʃiː˥˥/sɿ˥˥ jɐu˨˦]
> 
> 何不把悲哀感觉 假设是来自你虚构
> 
> ho4 bat1 baa2/baa3 bi1 oi1 gaam2 gaau3/geu3/gok3/koek3/kok3 gaa2/gaa3/kaa3 cit3 si6 lai4/loi4 zi6/zy6 ni5 hyu1 gau3/kau3
> 
> [hɔː˨˩ pɐt̚˥ paː˧˥/baː˧˧ piː˥˥ ɔːi˥˥ kaːm˧˥ kaːu˧˧/gɛːu˧˧/gɔːk̚˧/kœːk̚˧/kɔːk̚˧ kaː˧˥/gaː˧˧/kaː˧˧ t͡ʃʰɪt̚˧ ʃiː˨˨ lɐi˨˩/lɔːi˨˩ t͡ʃiː˨˨/t͡sɿ˨˨ niː˨˦ hyː˥˥ kɐu˧˧/kɐu˧˧]
> 
> 试管里找不到它染污眼眸
> 
> si3 gun2 li5/lyu5 zaau2/zeu2 bat1 du3 taa1 jim5 wu1 ngaan5/ngen5 mau4
> 
> [ʃiː˧˧ kuːn˧˥ liː˨˦/lyː˨˦ t͡ʃaːu˧˥/t͡ʃɛːu˧˥ pɐt̚˥ tuː˧˧ tʰaː˥˥ jiːm˨˦ wuː˥˥ ŋaːn˨˦/ŋɛːn˨˦ mɐu˨˩]
> 
> 前尘硬化像石头 随缘地抛下便逃走
> 
> cin4 can4 ngaang2/ngaang6 faa3/waa3 zoeng6 sek6 tau4 cui4 jyun4 di6 paau1/peu1 haa5/haa6 bin2/bin6/pin4 tu4 zau2
> 
> [t͡ʃʰiːn˨˩ t͡ʃʰɐn˨˩ ŋaːŋ˧˥/ŋaːŋ˨˨ faː˧˧/waː˧˧ t͡ʃœːŋ˨˨ ʃɛːk̚˨ tʰɐu˨˩ t͡ʃʰuːi˨˩ jyːn˨˩ tiː˨˨ pʰaːu˥˥/pɛːu˥˥ haː˨˦/haː˨˨ piːn˧˥/biːn˨˨/piːn˨˩ tʰuː˨˩ t͡ʃɐu˧˥]
> 
> 我绝不罕有 往街里绕过一周 我便化乌有
> 
> ngo5 zyut6 bat1 hon2 jau5 wong5 gaai1 li5/lyu5 jiu2/jiu5 go3 jat1 zau1 ngo5 bin2/bin6/pin4 faa3/waa3 wu1 jau5
> 
> [ŋɔː˨˦ t͡ʃyːt̚˨ pɐt̚˥ hɔːn˧˥ jɐu˨˦ wɔːŋ˨˦ kaːi˥˥ liː˨˦/lyː˨˦ jiːu˧˥/jiːu˨˦ kɔː˧˧ jɐt̚˥ t͡ʃɐu˥˥ ŋɔː˨˦ piːn˧˥/biːn˨˨/piːn˨˩ faː˧˧/waː˧˧ wuː˥˥ jɐu˨˦]
> 
> 谁都只得那双手 靠拥抱亦难任你拥有
> 
> sui4 du1 zek3/zi2/zik3 dak1 naa5 soeng1 sau2 kaau3 jung2/ung2 pu5 jik6 naan4/naan6 jam4/jam6 ni5 jung2/ung2 jau5
> 
> [ʃuːi˨˩ tuː˥˥ t͡ʃɛːk̚˧/t͡ʃiː˧˥/t͡ʃɪk̚˧ tɐk̚˥ naː˨˦ ʃœːŋ˥˥ ʃɐu˧˥ kʰaːu˧˧ jʊŋ˧˥/ʊŋ˧˥ pʰuː˨˦ jɪk̚˨ naːn˨˩/naːn˨˨ jɐm˨˩/jɐm˨˨ niː˨˦ jʊŋ˧˥/ʊŋ˧˥ jɐu˨˦]
> 
> 要拥有必先懂失去怎接受
> 
> jiu1/jiu3 jung2/ung2 jau5 bit1 slin1 dung2 sat1 hyu3 zam2 zip3 sau6
> 
> [jiːu˥˥/jiːu˧˧ jʊŋ˧˥/ʊŋ˧˥ jɐu˨˦ pɪt̚˥ ɬiːn˥˥ tʊŋ˧˥ ʃɐt̚˥ hyː˧˧ t͡ʃɐm˧˥ t͡ʃɪp̚˧ ʃɐu˨˨]
> 
> 曾沿着雪路浪游 为何为好事泪流
> 
> cang4/zang1 jyun4 zoek3/zoek6 slyut3 lu6 long6 jau4 wai4/wai6 ho4 wai4/wai6 hu2/hu3 si6/sy6 lui6 lau4
> 
> [t͡ʃʰɐŋ˨˩/t͡ʃɐŋ˥˥ jyːn˨˩ t͡ʃœːk̚˧/t͡ʃœːk̚˨ ɬyːt̚˧ luː˨˨ lɔːŋ˨˨ jɐu˨˩ wɐi˨˩/wɐi˨˨ hɔː˨˩ wɐi˨˩/wɐi˨˨ huː˧˥/huː˧˧ ʃiː˨˨/sɿ˨˨ luːi˨˨ lɐu˨˩]
> 
> 谁能凭爱意要富士山私有
> 
> sui4 nang4 bang6/pang4 oi3 ji3 jiu1/jiu3 fu3 si6/sy6 saan1 si1/sy1 jau5
> 
> [ʃuːi˨˩ nɐŋ˨˩ pɐŋ˨˨/pɐŋ˨˩ ɔːi˧˧ jiː˧˧ jiːu˥˥/jiːu˧˧ fuː˧˧ ʃiː˨˨/sɿ˨˨ ʃaːn˥˥ ʃiː˥˥/sɿ˥˥ jɐu˨˦]
> 
> 何不把悲哀感觉 假设是来自你虚构
> 
> ho4 bat1 baa2/baa3 bi1 oi1 gaam2 gaau3/geu3/gok3/koek3/kok3 gaa2/gaa3/kaa3 cit3 si6 lai4/loi4 zi6/zy6 ni5 hyu1 gau3/kau3
> 
> [hɔː˨˩ pɐt̚˥ paː˧˥/baː˧˧ piː˥˥ ɔːi˥˥ kaːm˧˥ kaːu˧˧/gɛːu˧˧/gɔːk̚˧/kœːk̚˧/kɔːk̚˧ kaː˧˥/gaː˧˧/kaː˧˧ t͡ʃʰɪt̚˧ ʃiː˨˨ lɐi˨˩/lɔːi˨˩ t͡ʃiː˨˨/t͡sɿ˨˨ niː˨˦ hyː˥˥ kɐu˧˧/kɐu˧˧]
> 
> 试管里找不到它染污眼眸
> 
> si3 gun2 li5/lyu5 zaau2/zeu2 bat1 du3 taa1 jim5 wu1 ngaan5/ngen5 mau4
> 
> [ʃiː˧˧ kuːn˧˥ liː˨˦/lyː˨˦ t͡ʃaːu˧˥/t͡ʃɛːu˧˥ pɐt̚˥ tuː˧˧ tʰaː˥˥ jiːm˨˦ wuː˥˥ ŋaːn˨˦/ŋɛːn˨˦ mɐu˨˩]
> 
> 前尘硬化像石头 随缘地抛下便逃走
> 
> cin4 can4 ngaang2/ngaang6 faa3/waa3 zoeng6 sek6 tau4 cui4 jyun4 di6 paau1/peu1 haa5/haa6 bin2/bin6/pin4 tu4 zau2
> 
> [t͡ʃʰiːn˨˩ t͡ʃʰɐn˨˩ ŋaːŋ˧˥/ŋaːŋ˨˨ faː˧˧/waː˧˧ t͡ʃœːŋ˨˨ ʃɛːk̚˨ tʰɐu˨˩ t͡ʃʰuːi˨˩ jyːn˨˩ tiː˨˨ pʰaːu˥˥/pɛːu˥˥ haː˨˦/haː˨˨ piːn˧˥/biːn˨˨/piːn˨˩ tʰuː˨˩ t͡ʃɐu˧˥]
> 
> 我绝不罕有 往街里绕过一周 我便化乌有
> 
> ngo5 zyut6 bat1 hon2 jau5 wong5 gaai1 li5/lyu5 jiu2/jiu5 go3 jat1 zau1 ngo5 bin2/bin6/pin4 faa3/waa3 wu1 jau5
> 
> [ŋɔː˨˦ t͡ʃyːt̚˨ pɐt̚˥ hɔːn˧˥ jɐu˨˦ wɔːŋ˨˦ kaːi˥˥ liː˨˦/lyː˨˦ jiːu˧˥/jiːu˨˦ kɔː˧˧ jɐt̚˥ t͡ʃɐu˥˥ ŋɔː˨˦ piːn˧˥/biːn˨˨/piːn˨˩ faː˧˧/waː˧˧ wuː˥˥ jɐu˨˦]
> 
> 你还嫌不够 我把这陈年风褛 送赠你解咒
> 
> ni5 waan4/wen4 him4/jim4 bat1 gau3 ngo5 baa2/baa3 ze5 can4 nin4 fung1 lau1/lau5/lyu5 slung3 zang6 ni5 gaai2/gaai3/haai6 zau3
> 
> [niː˨˦ waːn˨˩/wɛːn˨˩ hiːm˨˩/jiːm˨˩ pɐt̚˥ kɐu˧˧ ŋɔː˨˦ paː˧˥/baː˧˧ t͡ʃɛː˨˦ t͡ʃʰɐn˨˩ niːn˨˩ fʊŋ˥˥ lɐu˥˥/lɐu˨˦/lyː˨˦ ɬʊŋ˧˧ t͡ʃɐŋ˨˨ niː˨˦ kaːi˧˥/gaːi˧˧/haːi˨˨ t͡ʃɐu˧˧]

## 广州音

> [!EXAMPLE]
> 
> **富士山下-陈奕迅**
> 
> **fu3 si6 saan1 haa5/haa6 - can4 jik6 seon3**
> 
> **[fuː˧˧ ʃiː˨˨ ʃaːn˥˥ haː˨˦/haː˨˨ - t͡ʃʰɐn˨˩ jɪk̚˨ ʃɵn˧˧]**
> 
> 拦路雨偏似雪花 饮泣的你冻吗
> 
> laan4 lou6 jyu5/jyu6 pin1 ci5 syut3 faa1/waa4/waa6 jam2/jam3 jap1 di1/dik1 nei5 dung1/dung3 maa3
> 
> [laːn˨˩ lou˨˨ jyː˨˦/jyː˨˨ pʰiːn˥˥ t͡ʃʰiː˨˦ ʃyːt̚˧ faː˥˥/waː˨˩/waː˨˨ jɐm˧˥/jɐm˧˧ jɐp̚˥ tiː˥˥/dɪk̚˥ nei˨˦ tʊŋ˥˥/dʊŋ˧˧ maː˧˧]
> 
> 这风褛我给你磨到有襟花
> 
> ze5 fung1/fung3 leoi5 ngo5 kap1 nei5 mo4/mo6 dou3 jau5/jau6 gam1/kam1 faa1/waa4/waa6
> 
> [t͡ʃɛː˨˦ fʊŋ˥˥/fʊŋ˧˧ lɵy˨˦ ŋɔː˨˦ kʰɐp̚˥ nei˨˦ mɔː˨˩/mɔː˨˨ tou˧˧ jɐu˨˦/jɐu˨˨ kɐm˥˥/kɐm˥˥ faː˥˥/waː˨˩/waː˨˨]
> 
> 连掉了渍也不怕 怎么始终牵挂
> 
> lin4 deu6/diu6/doe6/zaau6 laa1/liu4/liu5 zi3 jaa5 bat1/fau2/pei1 paa3 dim2/zaam2/zam2 jiu1/maa1/mo1 ci2 zung1 hin1 gwaa3
> 
> [liːn˨˩ tɛːu˨˨/diːu˨˨/dœː˨˨/t͡ʃaːu˨˨ laː˥˥/liːu˨˩/liːu˨˦ t͡ʃiː˧˧ jaː˨˦ pɐt̚˥/fɐu˧˥/pei˥˥ pʰaː˧˧ tiːm˧˥/t͡ʃaːm˧˥/t͡ʃɐm˧˥ jiːu˥˥/maː˥˥/mɔː˥˥ t͡ʃʰiː˧˥ t͡ʃʊŋ˥˥ hiːn˥˥ kʷaː˧˧]
> 
> 苦心选中今天想车你回家
> 
> fu2 sam1 syun2 zung1/zung3 gam1 tin1 soeng2 ce1/geoi1 nei5 wui4 gaa1/gu1/ze1
> 
> [fuː˧˥ ʃɐm˥˥ ʃyːn˧˥ t͡ʃʊŋ˥˥/t͡ʃʊŋ˧˧ kɐm˥˥ tʰiːn˥˥ ʃœːŋ˧˥ t͡ʃʰɛː˥˥/gɵy˥˥ nei˨˦ wuːi˨˩ kaː˥˥/guː˥˥/t͡ʃɛː˥˥]
> 
> 原谅我不再送花 伤口应要结疤
> 
> jyun4/jyun5 loeng6 ngo5 bat1/fau2/pei1 zoi3 sung3 faa1/waa4/waa6 soeng1 hau2 jing1/jing3 jiu1/jiu2/jiu3 git3 baa1
> 
> [jyːn˨˩/jyːn˨˦ lœːŋ˨˨ ŋɔː˨˦ pɐt̚˥/fɐu˧˥/pei˥˥ t͡ʃɔːi˧˧ ʃʊŋ˧˧ faː˥˥/waː˨˩/waː˨˨ ʃœːŋ˥˥ hɐu˧˥ jɪŋ˥˥/jɪŋ˧˧ jiːu˥˥/jiːu˧˥/jiːu˧˧ kɪt̚˧ paː˥˥]
> 
> 花瓣铺满心里坟场才害怕
> 
> faa1/waa4/waa6 baan6/faan6 pou3 mun5 sam1 lei5 fan4 coeng4 coi4 hoi6/hot3/hot6 paa3
> 
> [faː˥˥/waː˨˩/waː˨˨ paːn˨˨/faːn˨˨ pʰou˧˧ muːn˨˦ ʃɐm˥˥ lei˨˦ fɐn˨˩ t͡ʃʰœːŋ˨˩ t͡ʃʰɔːi˨˩ hɔːi˨˨/hɔːt̚˧/hɔːt̚˨ pʰaː˧˧]
> 
> 如若你非我不嫁 彼此终必火化
> 
> jyu4 je5/joek6 nei5 fei1/fei2 ngo5 bat1/fau2/pei1 gaa3 bei2 ci2 zung1 bit1 fo2 faa1/faa3
> 
> [jyː˨˩ jɛː˨˦/jœːk̚˨ nei˨˦ fei˥˥/fei˧˥ ŋɔː˨˦ pɐt̚˥/fɐu˧˥/pei˥˥ kaː˧˧ pei˧˥ t͡ʃʰiː˧˥ t͡ʃʊŋ˥˥ pɪt̚˥ fɔː˧˥ faː˥˥/faː˧˧]
> 
> 一生一世等一天需要代价
> 
> jat1 saang1/sang1 jat1 sai3 dang2 jat1 tin1 seoi1 jiu1/jiu2/jiu3 doi6 gaa3/gaai3
> 
> [jɐt̚˥ ʃaːŋ˥˥/ʃɐŋ˥˥ jɐt̚˥ ʃɐi˧˧ tɐŋ˧˥ jɐt̚˥ tʰiːn˥˥ ʃɵy˥˥ jiːu˥˥/jiːu˧˥/jiːu˧˧ tɔːi˨˨ kaː˧˧/gaːi˧˧]
> 
> 谁都只得那双手 靠拥抱亦难任你拥有
> 
> seoi4 dou1 zek3/zi2 dak1 aa6/naa1/naa5/naa6/no1/no4/no5/no6 soeng1/sung1 sau2 kaau3 jung2 bou6/paau1/pou5 jik6 naan4/naan6 jam4/jam6 nei5 jung2 jau5/jau6
> 
> [ʃɵy˨˩ tou˥˥ t͡ʃɛːk̚˧/t͡ʃiː˧˥ tɐk̚˥ aː˨˨/naː˥˥/naː˨˦/naː˨˨/nɔː˥˥/nɔː˨˩/nɔː˨˦/nɔː˨˨ ʃœːŋ˥˥/ʃʊŋ˥˥ ʃɐu˧˥ kʰaːu˧˧ jʊŋ˧˥ pou˨˨/paːu˥˥/pou˨˦ jɪk̚˨ naːn˨˩/naːn˨˨ jɐm˨˩/jɐm˨˨ nei˨˦ jʊŋ˧˥ jɐu˨˦/jɐu˨˨]
> 
> 要拥有必先懂失去怎接受
> 
> jiu1/jiu2/jiu3 jung2 jau5/jau6 bit1 sin1/sin3 dung2 jat6/sat1 heoi2/heoi3 dim2/zaam2/zam2 zip3 sau6
> 
> [jiːu˥˥/jiːu˧˥/jiːu˧˧ jʊŋ˧˥ jɐu˨˦/jɐu˨˨ pɪt̚˥ ʃiːn˥˥/ʃiːn˧˧ tʊŋ˧˥ jɐt̚˨/ʃɐt̚˥ hɵy˧˥/hɵy˧˧ tiːm˧˥/t͡ʃaːm˧˥/t͡ʃɐm˧˥ t͡ʃɪp̚˧ ʃɐu˨˨]
> 
> 曾沿着雪路浪游 为何为好事泪流
> 
> cang4/zang1 jyun4 zau1/zau2/ziu1/zoek3/zoek6 syut3 lou6 long4/long6 jau4/jau6 wai4/wai6 ho4/ho6 wai4/wai6 hou2/hou3 si6 leoi6 lau4
> 
> [t͡ʃʰɐŋ˨˩/t͡ʃɐŋ˥˥ jyːn˨˩ t͡ʃɐu˥˥/t͡ʃɐu˧˥/t͡ʃiːu˥˥/t͡ʃœːk̚˧/t͡ʃœːk̚˨ ʃyːt̚˧ lou˨˨ lɔːŋ˨˩/lɔːŋ˨˨ jɐu˨˩/jɐu˨˨ wɐi˨˩/wɐi˨˨ hɔː˨˩/hɔː˨˨ wɐi˨˩/wɐi˨˨ hou˧˥/hou˧˧ ʃiː˨˨ lɵy˨˨ lɐu˨˩]
> 
> 谁能凭爱意要富士山私有
> 
> seoi4 nang4/noi6/toi4 bang6/pang4/peng1 ngoi3/oi3 ji3 jiu1/jiu2/jiu3 fu3 si6 saan1 si1 jau5/jau6
> 
> [ʃɵy˨˩ nɐŋ˨˩/nɔːi˨˨/tɔːi˨˩ pɐŋ˨˨/pɐŋ˨˩/pɛːŋ˥˥ ŋɔːi˧˧/ɔːi˧˧ jiː˧˧ jiːu˥˥/jiːu˧˥/jiːu˧˧ fuː˧˧ ʃiː˨˨ ʃaːn˥˥ ʃiː˥˥ jɐu˨˦/jɐu˨˨]
> 
> 何不把悲哀感觉 假设是来自你虚构
> 
> ho4/ho6 bat1/fau2/pei1 baa2/baa3 bei1 ngoi1/oi1 gam2 gaau3/gok3 gaa2/gaa3 cit3 si6 loi4 zi6 nei5 heoi1 gau3/kau3
> 
> [hɔː˨˩/hɔː˨˨ pɐt̚˥/fɐu˧˥/pei˥˥ paː˧˥/baː˧˧ pei˥˥ ŋɔːi˥˥/ɔːi˥˥ kɐm˧˥ kaːu˧˧/gɔːk̚˧ kaː˧˥/gaː˧˧ t͡ʃʰɪt̚˧ ʃiː˨˨ lɔːi˨˩ t͡ʃiː˨˨ nei˨˦ hɵy˥˥ kɐu˧˧/kɐu˧˧]
> 
> 试管里找不到它染污眼眸
> 
> si3 gun2 lei5 zaau2 bat1/fau2/pei1 dou3 taa1/to1 jim5 waa1/wu1/wu3 ngaan5 mau4
> 
> [ʃiː˧˧ kuːn˧˥ lei˨˦ t͡ʃaːu˧˥ pɐt̚˥/fɐu˧˥/pei˥˥ tou˧˧ tʰaː˥˥/tɔː˥˥ jiːm˨˦ waː˥˥/wuː˥˥/wuː˧˧ ŋaːn˨˦ mɐu˨˩]
> 
> 前尘硬化像石头 随缘地抛下便逃走
> 
> cin4 can4 ngaang6 faa1/faa3 zoeng6 daam3/sek6 tau2/tau4 ceoi4 jyun4 dei6/deng6 paau1 haa5/haa6 bin2/bin6/pin4 tou4 zau2
> 
> [t͡ʃʰiːn˨˩ t͡ʃʰɐn˨˩ ŋaːŋ˨˨ faː˥˥/faː˧˧ t͡ʃœːŋ˨˨ taːm˧˧/ʃɛːk̚˨ tʰɐu˧˥/tɐu˨˩ t͡ʃʰɵy˨˩ jyːn˨˩ tei˨˨/dɛːŋ˨˨ pʰaːu˥˥ haː˨˦/haː˨˨ piːn˧˥/biːn˨˨/piːn˨˩ tʰou˨˩ t͡ʃɐu˧˥]
> 
> 我绝不罕有 往街里绕过一周 我便化乌有
> 
> ngo5 zyut6 bat1/fau2/pei1 hon2 jau5/jau6 wong5 gaai1 lei5 jiu5 gwo3 jat1 zau1 ngo5 bin2/bin6/pin4 faa1/faa3 wu1 jau5/jau6
> 
> [ŋɔː˨˦ t͡ʃyːt̚˨ pɐt̚˥/fɐu˧˥/pei˥˥ hɔːn˧˥ jɐu˨˦/jɐu˨˨ wɔːŋ˨˦ kaːi˥˥ lei˨˦ jiːu˨˦ kʷɔː˧˧ jɐt̚˥ t͡ʃɐu˥˥ ŋɔː˨˦ piːn˧˥/biːn˨˨/piːn˨˩ faː˥˥/faː˧˧ wuː˥˥ jɐu˨˦/jɐu˨˨]
> 
> 情人节不要说穿 只敢抚你发端
> 
> cing4 jan4 zit3 bat1/fau2/pei1 jiu1/jiu2/jiu3 syut3 cyun1 zek3/zi2 gam2 fu2 nei5 faat3 dyun1
> 
> [t͡ʃʰɪŋ˨˩ jɐn˨˩ t͡ʃɪt̚˧ pɐt̚˥/fɐu˧˥/pei˥˥ jiːu˥˥/jiːu˧˥/jiːu˧˧ ʃyːt̚˧ t͡ʃʰyːn˥˥ t͡ʃɛːk̚˧/t͡ʃiː˧˥ kɐm˧˥ fuː˧˥ nei˨˦ faːt̚˧ tyːn˥˥]
> 
> 这种姿态可会令你更心酸
> 
> ze5 cung4/zung2/zung3 zi1 taai3 hak1/ho2 kui2/kwui2/wui2/wui4/wui5/wui6 lim1/ling1/ling4/ling5/ling6 nei5 ang1/gaang1/gang1/gang3 sam1 syun1
> 
> [t͡ʃɛː˨˦ t͡ʃʰʊŋ˨˩/t͡ʃʊŋ˧˥/t͡ʃʊŋ˧˧ t͡ʃiː˥˥ tʰaːi˧˧ hɐk̚˥/hɔː˧˥ kʰuːi˧˥/kʷʰuːi˧˥/wuːi˧˥/wuːi˨˩/wuːi˨˦/wuːi˨˨ liːm˥˥/lɪŋ˥˥/lɪŋ˨˩/lɪŋ˨˦/lɪŋ˨˨ nei˨˦ ɐŋ˥˥/gaːŋ˥˥/gɐŋ˥˥/gɐŋ˧˧ ʃɐm˥˥ ʃyːn˥˥]
> 
> 留在汽车里取暖 应该怎么规劝
> 
> lau4 zoi6 hei3 ce1/geoi1 lei5 ceoi2 hyun1/nyun5 jing1/jing3 goi1 dim2/zaam2/zam2 jiu1/maa1/mo1 kwai1 hyun3
> 
> [lɐu˨˩ t͡ʃɔːi˨˨ hei˧˧ t͡ʃʰɛː˥˥/gɵy˥˥ lei˨˦ t͡ʃʰɵy˧˥ hyːn˥˥/nyːn˨˦ jɪŋ˥˥/jɪŋ˧˧ kɔːi˥˥ tiːm˧˥/t͡ʃaːm˧˥/t͡ʃɐm˧˥ jiːu˥˥/maː˥˥/mɔː˥˥ kʷʰɐi˥˥ hyːn˧˧]
> 
> 怎么可以将手腕忍痛划损
> 
> dim2/zaam2/zam2 jiu1/maa1/mo1 hak1/ho2 ji5/jyu5 zoeng1/zoeng3 sau2 wun2 jan2/jan5 tung3 faa3/waa1/waa4/waak6 syun2
> 
> [tiːm˧˥/t͡ʃaːm˧˥/t͡ʃɐm˧˥ jiːu˥˥/maː˥˥/mɔː˥˥ hɐk̚˥/hɔː˧˥ jiː˨˦/jyː˨˦ t͡ʃœːŋ˥˥/t͡ʃœːŋ˧˧ ʃɐu˧˥ wuːn˧˥ jɐn˧˥/jɐn˨˦ tʰʊŋ˧˧ faː˧˧/waː˥˥/waː˨˩/waːk̚˨ ʃyːn˧˥]
> 
> 人活到几岁算短 失恋只有更短
> 
> jan4 kut3/wut6 dou3 gei1/gei2 seoi3 syun3 dyun2 jat6/sat1 lyun2/lyun5 zek3/zi2 jau5/jau6 ang1/gaang1/gang1/gang3 dyun2
> 
> [jɐn˨˩ kʰuːt̚˧/wuːt̚˨ tou˧˧ kei˥˥/gei˧˥ ʃɵy˧˧ ʃyːn˧˧ tyːn˧˥ jɐt̚˨/ʃɐt̚˥ lyːn˧˥/lyːn˨˦ t͡ʃɛːk̚˧/t͡ʃiː˧˥ jɐu˨˦/jɐu˨˨ ɐŋ˥˥/gaːŋ˥˥/gɐŋ˥˥/gɐŋ˧˧ tyːn˧˥]
> 
> 归家需要几里路谁能预算
> 
> gwai1 gaa1/gu1/ze1 seoi1 jiu1/jiu2/jiu3 gei1/gei2 lei5 lou6 seoi4 nang4/noi6/toi4 jyu6 syun3
> 
> [kʷɐi˥˥ kaː˥˥/guː˥˥/t͡ʃɛː˥˥ ʃɵy˥˥ jiːu˥˥/jiːu˧˥/jiːu˧˧ kei˥˥/gei˧˥ lei˨˦ lou˨˨ ʃɵy˨˩ nɐŋ˨˩/nɔːi˨˨/tɔːi˨˩ jyː˨˨ ʃyːn˧˧]
> 
> 忘掉我跟你恩怨 樱花开了几转
> 
> mong4/mong6 deu6/diu6/doe6/zaau6 ngo5 gan1 nei5 jan1 jyun3 jing1 faa1/waa4/waa6 hoi1 laa1/liu4/liu5 gei1/gei2 zyun2/zyun3
> 
> [mɔːŋ˨˩/mɔːŋ˨˨ tɛːu˨˨/diːu˨˨/dœː˨˨/t͡ʃaːu˨˨ ŋɔː˨˦ kɐn˥˥ nei˨˦ jɐn˥˥ jyːn˧˧ jɪŋ˥˥ faː˥˥/waː˨˩/waː˨˨ hɔːi˥˥ laː˥˥/liːu˨˩/liːu˨˦ kei˥˥/gei˧˥ t͡ʃyːn˧˥/t͡ʃyːn˧˧]
> 
> 东京之旅一早比一世遥远
> 
> dung1 ging1/jyun4 zi1 leoi3/leoi5 jat1 zou2 bei2/bei3/bei6/pei4 jat1 sai3 jiu4 jyun5
> 
> [tʊŋ˥˥ kɪŋ˥˥/jyːn˨˩ t͡ʃiː˥˥ lɵy˧˧/lɵy˨˦ jɐt̚˥ t͡ʃou˧˥ pei˧˥/bei˧˧/bei˨˨/pei˨˩ jɐt̚˥ ʃɐi˧˧ jiːu˨˩ jyːn˨˦]
> 
> 谁都只得那双手 靠拥抱亦难任你拥有
> 
> seoi4 dou1 zek3/zi2 dak1 aa6/naa1/naa5/naa6/no1/no4/no5/no6 soeng1/sung1 sau2 kaau3 jung2 bou6/paau1/pou5 jik6 naan4/naan6 jam4/jam6 nei5 jung2 jau5/jau6
> 
> [ʃɵy˨˩ tou˥˥ t͡ʃɛːk̚˧/t͡ʃiː˧˥ tɐk̚˥ aː˨˨/naː˥˥/naː˨˦/naː˨˨/nɔː˥˥/nɔː˨˩/nɔː˨˦/nɔː˨˨ ʃœːŋ˥˥/ʃʊŋ˥˥ ʃɐu˧˥ kʰaːu˧˧ jʊŋ˧˥ pou˨˨/paːu˥˥/pou˨˦ jɪk̚˨ naːn˨˩/naːn˨˨ jɐm˨˩/jɐm˨˨ nei˨˦ jʊŋ˧˥ jɐu˨˦/jɐu˨˨]
> 
> 要拥有必先懂失去怎接受
> 
> jiu1/jiu2/jiu3 jung2 jau5/jau6 bit1 sin1/sin3 dung2 jat6/sat1 heoi2/heoi3 dim2/zaam2/zam2 zip3 sau6
> 
> [jiːu˥˥/jiːu˧˥/jiːu˧˧ jʊŋ˧˥ jɐu˨˦/jɐu˨˨ pɪt̚˥ ʃiːn˥˥/ʃiːn˧˧ tʊŋ˧˥ jɐt̚˨/ʃɐt̚˥ hɵy˧˥/hɵy˧˧ tiːm˧˥/t͡ʃaːm˧˥/t͡ʃɐm˧˥ t͡ʃɪp̚˧ ʃɐu˨˨]
> 
> 曾沿着雪路浪游 为何为好事泪流
> 
> cang4/zang1 jyun4 zau1/zau2/ziu1/zoek3/zoek6 syut3 lou6 long4/long6 jau4/jau6 wai4/wai6 ho4/ho6 wai4/wai6 hou2/hou3 si6 leoi6 lau4
> 
> [t͡ʃʰɐŋ˨˩/t͡ʃɐŋ˥˥ jyːn˨˩ t͡ʃɐu˥˥/t͡ʃɐu˧˥/t͡ʃiːu˥˥/t͡ʃœːk̚˧/t͡ʃœːk̚˨ ʃyːt̚˧ lou˨˨ lɔːŋ˨˩/lɔːŋ˨˨ jɐu˨˩/jɐu˨˨ wɐi˨˩/wɐi˨˨ hɔː˨˩/hɔː˨˨ wɐi˨˩/wɐi˨˨ hou˧˥/hou˧˧ ʃiː˨˨ lɵy˨˨ lɐu˨˩]
> 
> 谁能凭爱意要富士山私有
> 
> seoi4 nang4/noi6/toi4 bang6/pang4/peng1 ngoi3/oi3 ji3 jiu1/jiu2/jiu3 fu3 si6 saan1 si1 jau5/jau6
> 
> [ʃɵy˨˩ nɐŋ˨˩/nɔːi˨˨/tɔːi˨˩ pɐŋ˨˨/pɐŋ˨˩/pɛːŋ˥˥ ŋɔːi˧˧/ɔːi˧˧ jiː˧˧ jiːu˥˥/jiːu˧˥/jiːu˧˧ fuː˧˧ ʃiː˨˨ ʃaːn˥˥ ʃiː˥˥ jɐu˨˦/jɐu˨˨]
> 
> 何不把悲哀感觉 假设是来自你虚构
> 
> ho4/ho6 bat1/fau2/pei1 baa2/baa3 bei1 ngoi1/oi1 gam2 gaau3/gok3 gaa2/gaa3 cit3 si6 loi4 zi6 nei5 heoi1 gau3/kau3
> 
> [hɔː˨˩/hɔː˨˨ pɐt̚˥/fɐu˧˥/pei˥˥ paː˧˥/baː˧˧ pei˥˥ ŋɔːi˥˥/ɔːi˥˥ kɐm˧˥ kaːu˧˧/gɔːk̚˧ kaː˧˥/gaː˧˧ t͡ʃʰɪt̚˧ ʃiː˨˨ lɔːi˨˩ t͡ʃiː˨˨ nei˨˦ hɵy˥˥ kɐu˧˧/kɐu˧˧]
> 
> 试管里找不到它染污眼眸
> 
> si3 gun2 lei5 zaau2 bat1/fau2/pei1 dou3 taa1/to1 jim5 waa1/wu1/wu3 ngaan5 mau4
> 
> [ʃiː˧˧ kuːn˧˥ lei˨˦ t͡ʃaːu˧˥ pɐt̚˥/fɐu˧˥/pei˥˥ tou˧˧ tʰaː˥˥/tɔː˥˥ jiːm˨˦ waː˥˥/wuː˥˥/wuː˧˧ ŋaːn˨˦ mɐu˨˩]
> 
> 前尘硬化像石头 随缘地抛下便逃走
> 
> cin4 can4 ngaang6 faa1/faa3 zoeng6 daam3/sek6 tau2/tau4 ceoi4 jyun4 dei6/deng6 paau1 haa5/haa6 bin2/bin6/pin4 tou4 zau2
> 
> [t͡ʃʰiːn˨˩ t͡ʃʰɐn˨˩ ŋaːŋ˨˨ faː˥˥/faː˧˧ t͡ʃœːŋ˨˨ taːm˧˧/ʃɛːk̚˨ tʰɐu˧˥/tɐu˨˩ t͡ʃʰɵy˨˩ jyːn˨˩ tei˨˨/dɛːŋ˨˨ pʰaːu˥˥ haː˨˦/haː˨˨ piːn˧˥/biːn˨˨/piːn˨˩ tʰou˨˩ t͡ʃɐu˧˥]
> 
> 我绝不罕有 往街里绕过一周 我便化乌有
> 
> ngo5 zyut6 bat1/fau2/pei1 hon2 jau5/jau6 wong5 gaai1 lei5 jiu5 gwo3 jat1 zau1 ngo5 bin2/bin6/pin4 faa1/faa3 wu1 jau5/jau6
> 
> [ŋɔː˨˦ t͡ʃyːt̚˨ pɐt̚˥/fɐu˧˥/pei˥˥ hɔːn˧˥ jɐu˨˦/jɐu˨˨ wɔːŋ˨˦ kaːi˥˥ lei˨˦ jiːu˨˦ kʷɔː˧˧ jɐt̚˥ t͡ʃɐu˥˥ ŋɔː˨˦ piːn˧˥/biːn˨˨/piːn˨˩ faː˥˥/faː˧˧ wuː˥˥ jɐu˨˦/jɐu˨˨]
> 
> 谁都只得那双手 靠拥抱亦难任你拥有
> 
> seoi4 dou1 zek3/zi2 dak1 aa6/naa1/naa5/naa6/no1/no4/no5/no6 soeng1/sung1 sau2 kaau3 jung2 bou6/paau1/pou5 jik6 naan4/naan6 jam4/jam6 nei5 jung2 jau5/jau6
> 
> [ʃɵy˨˩ tou˥˥ t͡ʃɛːk̚˧/t͡ʃiː˧˥ tɐk̚˥ aː˨˨/naː˥˥/naː˨˦/naː˨˨/nɔː˥˥/nɔː˨˩/nɔː˨˦/nɔː˨˨ ʃœːŋ˥˥/ʃʊŋ˥˥ ʃɐu˧˥ kʰaːu˧˧ jʊŋ˧˥ pou˨˨/paːu˥˥/pou˨˦ jɪk̚˨ naːn˨˩/naːn˨˨ jɐm˨˩/jɐm˨˨ nei˨˦ jʊŋ˧˥ jɐu˨˦/jɐu˨˨]
> 
> 要拥有必先懂失去怎接受
> 
> jiu1/jiu2/jiu3 jung2 jau5/jau6 bit1 sin1/sin3 dung2 jat6/sat1 heoi2/heoi3 dim2/zaam2/zam2 zip3 sau6
> 
> [jiːu˥˥/jiːu˧˥/jiːu˧˧ jʊŋ˧˥ jɐu˨˦/jɐu˨˨ pɪt̚˥ ʃiːn˥˥/ʃiːn˧˧ tʊŋ˧˥ jɐt̚˨/ʃɐt̚˥ hɵy˧˥/hɵy˧˧ tiːm˧˥/t͡ʃaːm˧˥/t͡ʃɐm˧˥ t͡ʃɪp̚˧ ʃɐu˨˨]
> 
> 曾沿着雪路浪游 为何为好事泪流
> 
> cang4/zang1 jyun4 zau1/zau2/ziu1/zoek3/zoek6 syut3 lou6 long4/long6 jau4/jau6 wai4/wai6 ho4/ho6 wai4/wai6 hou2/hou3 si6 leoi6 lau4
> 
> [t͡ʃʰɐŋ˨˩/t͡ʃɐŋ˥˥ jyːn˨˩ t͡ʃɐu˥˥/t͡ʃɐu˧˥/t͡ʃiːu˥˥/t͡ʃœːk̚˧/t͡ʃœːk̚˨ ʃyːt̚˧ lou˨˨ lɔːŋ˨˩/lɔːŋ˨˨ jɐu˨˩/jɐu˨˨ wɐi˨˩/wɐi˨˨ hɔː˨˩/hɔː˨˨ wɐi˨˩/wɐi˨˨ hou˧˥/hou˧˧ ʃiː˨˨ lɵy˨˨ lɐu˨˩]
> 
> 谁能凭爱意要富士山私有
> 
> seoi4 nang4/noi6/toi4 bang6/pang4/peng1 ngoi3/oi3 ji3 jiu1/jiu2/jiu3 fu3 si6 saan1 si1 jau5/jau6
> 
> [ʃɵy˨˩ nɐŋ˨˩/nɔːi˨˨/tɔːi˨˩ pɐŋ˨˨/pɐŋ˨˩/pɛːŋ˥˥ ŋɔːi˧˧/ɔːi˧˧ jiː˧˧ jiːu˥˥/jiːu˧˥/jiːu˧˧ fuː˧˧ ʃiː˨˨ ʃaːn˥˥ ʃiː˥˥ jɐu˨˦/jɐu˨˨]
> 
> 何不把悲哀感觉 假设是来自你虚构
> 
> ho4/ho6 bat1/fau2/pei1 baa2/baa3 bei1 ngoi1/oi1 gam2 gaau3/gok3 gaa2/gaa3 cit3 si6 loi4 zi6 nei5 heoi1 gau3/kau3
> 
> [hɔː˨˩/hɔː˨˨ pɐt̚˥/fɐu˧˥/pei˥˥ paː˧˥/baː˧˧ pei˥˥ ŋɔːi˥˥/ɔːi˥˥ kɐm˧˥ kaːu˧˧/gɔːk̚˧ kaː˧˥/gaː˧˧ t͡ʃʰɪt̚˧ ʃiː˨˨ lɔːi˨˩ t͡ʃiː˨˨ nei˨˦ hɵy˥˥ kɐu˧˧/kɐu˧˧]
> 
> 试管里找不到它染污眼眸
> 
> si3 gun2 lei5 zaau2 bat1/fau2/pei1 dou3 taa1/to1 jim5 waa1/wu1/wu3 ngaan5 mau4
> 
> [ʃiː˧˧ kuːn˧˥ lei˨˦ t͡ʃaːu˧˥ pɐt̚˥/fɐu˧˥/pei˥˥ tou˧˧ tʰaː˥˥/tɔː˥˥ jiːm˨˦ waː˥˥/wuː˥˥/wuː˧˧ ŋaːn˨˦ mɐu˨˩]
> 
> 前尘硬化像石头 随缘地抛下便逃走
> 
> cin4 can4 ngaang6 faa1/faa3 zoeng6 daam3/sek6 tau2/tau4 ceoi4 jyun4 dei6/deng6 paau1 haa5/haa6 bin2/bin6/pin4 tou4 zau2
> 
> [t͡ʃʰiːn˨˩ t͡ʃʰɐn˨˩ ŋaːŋ˨˨ faː˥˥/faː˧˧ t͡ʃœːŋ˨˨ taːm˧˧/ʃɛːk̚˨ tʰɐu˧˥/tɐu˨˩ t͡ʃʰɵy˨˩ jyːn˨˩ tei˨˨/dɛːŋ˨˨ pʰaːu˥˥ haː˨˦/haː˨˨ piːn˧˥/biːn˨˨/piːn˨˩ tʰou˨˩ t͡ʃɐu˧˥]
> 
> 我绝不罕有 往街里绕过一周 我便化乌有
> 
> ngo5 zyut6 bat1/fau2/pei1 hon2 jau5/jau6 wong5 gaai1 lei5 jiu5 gwo3 jat1 zau1 ngo5 bin2/bin6/pin4 faa1/faa3 wu1 jau5/jau6
> 
> [ŋɔː˨˦ t͡ʃyːt̚˨ pɐt̚˥/fɐu˧˥/pei˥˥ hɔːn˧˥ jɐu˨˦/jɐu˨˨ wɔːŋ˨˦ kaːi˥˥ lei˨˦ jiːu˨˦ kʷɔː˧˧ jɐt̚˥ t͡ʃɐu˥˥ ŋɔː˨˦ piːn˧˥/biːn˨˨/piːn˨˩ faː˥˥/faː˧˧ wuː˥˥ jɐu˨˦/jɐu˨˨]
> 
> 你还嫌不够 我把这陈年风褛 送赠你解咒
> 
> nei5 waan4 jim4 bat1/fau2/pei1 gau3 ngo5 baa2/baa3 ze5 can4 nin4 fung1/fung3 leoi5 sung3 zang6 nei5 gaai2/gaai3/haai5/haai6 zau3
> 
> [nei˨˦ waːn˨˩ jiːm˨˩ pɐt̚˥/fɐu˧˥/pei˥˥ kɐu˧˧ ŋɔː˨˦ paː˧˥/baː˧˧ t͡ʃɛː˨˦ t͡ʃʰɐn˨˩ niːn˨˩ fʊŋ˥˥/fʊŋ˧˧ lɵy˨˦ ʃʊŋ˧˧ t͡ʃɐŋ˨˨ nei˨˦ kaːi˧˥/gaːi˧˧/haːi˨˦/haːi˨˨ t͡ʃɐu˧˧]
