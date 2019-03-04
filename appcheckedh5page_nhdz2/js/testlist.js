
var testdata=[];//抽到的题目

    //色情低俗
    var pornographic=[
        {"contenttype":"3","contenttitle":"深夜福利", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/vcsjlfjv08jq1ztv601.jpg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"图片时长过短","isright":"0","isshow":0,"chooseimg":""}, {"answer":"女生不够漂亮","isright":"0","isshow":0,"chooseimg":""},{"answer":"图片散布谣言","isright":"0","isshow":0,"chooseimg":""},{"answer":"该图片中女性全身或者隐私部位未着衣服","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：全身或者隐私部位未着衣服（男性裸露下两点，女生裸露上两点、下两点），或仅用肢体掩盖隐私部位的内容"},
        {"contenttype":"3","contenttitle":"这个打几分？", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/wpq6rcbm0sjq2087fd4.jpg"], "question":"以下用户评论中，不符合内含段子社区公约的选项是？","answerlist":[{"answer":"冷静！冷静！","isright":"0","isshow":0,"chooseimg":""}, {"answer":"又到了锻炼手速的时候了！","isright":"0","isshow":0,"chooseimg":""},{"answer":" www.ssbxxxx.com你想看的都在这里！","isright":"1","isshow":0,"chooseimg":""},{"answer":"微微一硬，左手拿纸巾","isright":"0","isshow":0,"chooseimg":""}],"analysis":"禁止发布：发布淫秽色情网站，低俗照片、文字以及色情信息查找方式等内容"},
        {"contenttype":"3","contenttitle":"给段友点好东西", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/shfjfu3e1jq20aiqq5.jpg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"小姐姐不够好看","isright":"0","isshow":0,"chooseimg":""}, {"answer":"图片涉嫌危害国家安全","isright":"0","isshow":0,"chooseimg":""},{"answer":" 图片不够清晰","isright":"0","isshow":0,"chooseimg":""},{"answer":"图片带有性暗示","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：不漏敏感部位，但带有性暗示、性挑逗的视频、图片、文字等内容"},
        {"contenttype":"1","contenttitle":"纸巾准备好了吗？", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/dyibhdcfx8jq20dgmkfengmian.png","http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/6exgtdw1zfjq20degmjq20dee2.mp4"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"没有妹子的脸","isright":"0","isshow":0,"chooseimg":""}, {"answer":"跳舞不好看","isright":"0","isshow":0,"chooseimg":""},{"answer":" 有广告行为","isright":"0","isshow":0,"chooseimg":""},{"answer":"该视频带有性暗示行为，涉嫌色情","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：不漏敏感部位，但带有性暗示、性挑逗的视频、图片、文字等内容"},
        {"contenttype":"1","contenttitle":"果然是泰日天", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/hdhpir0tmjq20fj97fengmian.png","http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/hs5lxlvlcljq20firajq20fir4.mp4"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"动物性行为，涉嫌色情内容","isright":"1","isshow":0,"chooseimg":""}, {"answer":"猫狗不够可爱","isright":"0","isshow":0,"chooseimg":""},{"answer":" 声音太小","isright":"0","isshow":0,"chooseimg":""},{"answer":"画面不够清晰","isright":"0","isshow":0,"chooseimg":""}],"analysis":"禁止发布：直接或隐晦表现性行为、性过程、性方式。模样与男女生殖器过于相似的物品，如水果、山水、植物等动物性行为、暴露生殖器。"},
        {"contenttype":"3","contenttitle":"段友们，快来，福利哟~", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/15tfr5xkkpjq20ierv12.jpg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"图片不够清晰","isright":"0","isshow":0,"chooseimg":""}, {"answer":"妹子不够多","isright":"0","isshow":0,"chooseimg":""},{"answer":" 发布色情信息违规内容","isright":"1","isshow":0,"chooseimg":""},{"answer":"内容涉嫌危害公共安全行为","isright":"0","isshow":0,"chooseimg":""}],"analysis":"禁止发布：淫秽色情网站，低俗照片、文字以及色情信息查找方式等内容"},
        {"contenttype":"1","contenttitle":"上车，你懂得", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/kys4g5sc5jq20m1nsfengmian.png","http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/2fcvpw08bqjq20lze2jq20lzbh.mp4"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"视频清晰度不够","isright":"0","isshow":0,"chooseimg":""}, {"answer":"没有笑点","isright":"0","isshow":0,"chooseimg":""},{"answer":" 发布淫秽色情网站或渠道，违规内容","isright":"1","isshow":0,"chooseimg":""},{"answer":"内容涉嫌危害公共安全行为","isright":"0","isshow":0,"chooseimg":""}],"analysis":"禁止发布：淫秽色情网站，低俗照片、文字以及色情信息查找方式等内容"},
        {"contenttype":"3","contenttitle":"这个有点东西的啊", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/8jutly82lljq20ok4g15.jpg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"石头不好看","isright":"0","isshow":0,"chooseimg":""}, {"answer":"看不懂什么东西","isright":"0","isshow":0,"chooseimg":""},{"answer":" 没有笑点","isright":"0","isshow":0,"chooseimg":""},{"answer":"内容影射生殖器，色情违规","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：直接或隐晦表现性行为、性过程、性方式。模样与男女生殖器过于相似的物品，如水果、山水、植物等动物性行为、暴露生殖器。"},
        {"contenttype":"1","contenttitle":"这个网红你们看过吗", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/4tkgqksb8cjq210odafengmian.png","http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/qr9s17fq5cjq210m11jq210lx3.mp4"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"视频有性行为等色情违规行为","isright":"1","isshow":0,"chooseimg":""}, {"answer":"视频涉嫌辱骂造谣","isright":"0","isshow":0,"chooseimg":""},{"answer":" 视频有广告营销行为","isright":"0","isshow":0,"chooseimg":""},{"answer":"视频破坏国家宗教政策","isright":"0","isshow":0,"chooseimg":""}],"analysis":"禁止发布：全身或者隐私部位未着衣服（男性裸露下两点，女生裸露上两点、下两点），或仅用肢体掩盖隐私部位的内容"}
    ];

    //恶心重口
    const sicklist=[
        {"contenttype":"1","contenttitle":"还有我贝爷不敢吃的东西吗？", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/b54no5db7djq21mwi2fengmian.png","http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/g79btq8gxjq21mudrjq21muad.mp4"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"视频不是完整版","isright":"0","isshow":0,"chooseimg":""}, {"answer":"这类内容易引起部分用户不适","isright":"1","isshow":0,"chooseimg":""},{"answer":" 不是中文版","isright":"0","isshow":0,"chooseimg":""},{"answer":"汁水溅到镜头上影响观看","isright":"0","isshow":0,"chooseimg":""}],"analysis":"禁止发布：易引起人生理或者心理强烈不适的低俗恶心内容"},
        {"contenttype":"3","contenttitle":"过年了杀猪了", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/43r8hze8mvjq21qs03251545638872_.pic.jpg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"内容血腥，引起不适","isright":"1","isshow":0,"chooseimg":""}, {"answer":"我不喜欢猪肉","isright":"0","isshow":0,"chooseimg":""},{"answer":" 图片不清晰","isright":"0","isshow":0,"chooseimg":""},{"answer":"没有美女","isright":"0","isshow":0,"chooseimg":""}],"analysis":"禁止发布：易引起人生理或者心理强烈不适的低俗恶心内容"},
        {"contenttype":"3","contenttitle":"这什么水平？", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/tsa4om6lzjq220an1WectIMG7.jpeg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"照片拍的不够好看","isright":"0","isshow":0,"chooseimg":""}, {"answer":"一看就是搬运过来的图，不是原创","isright":"0","isshow":0,"chooseimg":""},{"answer":" 内容低俗，会引起部分用户的不适","isright":"1","isshow":0,"chooseimg":""},{"answer":"内容没营养","isright":"0","isshow":0,"chooseimg":""}],"analysis":"禁止发布：易引起人生理或者心理强烈不适的低俗恶心内容"}
    ];

    //血腥暴恐
    const bloodinesslist=[
        {"contenttype":"3","contenttitle":"深夜来点刺激的", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/3bbvngq5h7jq22apek%E6%81%90%E6%80%96%E5%9B%BE%E7%89%87.jpg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"不是高清大图","isright":"0","isshow":0,"chooseimg":""}, {"answer":"妹子肤色不对","isright":"0","isshow":0,"chooseimg":""},{"answer":" 没鬼片刺激","isright":"0","isshow":0,"chooseimg":""},{"answer":"内容恐怖，引起不适","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：恐怖且引起人心理上的不适的内容"},
        {"contenttype":"1","contenttitle":"这猎狗这么凶残？", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/rx9sno552bjq22drf8fengmian.png","http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/fmiia9176jq22dp87jq22dp4q.mp4"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"画面过于血腥","isright":"1","isshow":0,"chooseimg":""}, {"answer":"看不懂什么东西","isright":"0","isshow":0,"chooseimg":""},{"answer":" 没有笑点","isright":"0","isshow":0,"chooseimg":""},{"answer":"画质不清","isright":"0","isshow":0,"chooseimg":""}],"analysis":"禁止发布：血腥暴力场面，易引起人不适的内容"},
        {"contenttype":"1","contenttitle":"真男人就该去打拳！", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/6u0euosqojjq22gfqjfengmian.png","http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/73b6v787zajq22gehnjq22gefk.mp4"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"没有他们拳击的正片","isright":"0","isshow":0,"chooseimg":""}, {"answer":"清晰度太低","isright":"0","isshow":0,"chooseimg":""},{"answer":" 内容过于血腥","isright":"1","isshow":0,"chooseimg":""},{"answer":"不够刺激","isright":"0","isshow":0,"chooseimg":""}],"analysis":"禁止发布：血腥暴力场面，易引起人不适的内容"}

    ];

    //广告营销
    const advertislist=[
        {"contenttype":"3","contenttitle":"大红包正在派发，各位朋友赶紧领大红包，可自己用也可找我返现喔 打开支付宝首页搜“2xx“领红包，领到大红包的小伙伴赶紧使用哦！", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/2xyk2szobqjq235lox6%E5%B9%BF%E5%91%8A%E6%94%AF%E4%BB%98%E5%AE%9D.jpg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"危害公共安全的内容","isright":"0","isshow":0,"chooseimg":""}, {"answer":"仅用肢体遮盖隐私部位，涉嫌情色内容","isright":"0","isshow":0,"chooseimg":""},{"answer":" 图片构图不符合审美","isright":"0","isshow":0,"chooseimg":""},{"answer":"存在发布广告的行为","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：包含售卖产品、提供服务、宣传推广的广告内容。"},
        {"contenttype":"1","contenttitle":"太短不够看怎么办", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/hosg81sxljq239ilzfengmian.png","http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/vptctr6hdfjq239gwbjq239gul.mp4"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"视频不好看","isright":"0","isshow":0,"chooseimg":""}, {"answer":"看不懂什么东西","isright":"0","isshow":0,"chooseimg":""},{"answer":" 没有笑点","isright":"0","isshow":0,"chooseimg":""},{"answer":"内容有广告行为","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：以分享资源为名，要求用户添加微信、qq和百度云群组的内容"},
        {"contenttype":"3","contenttitle":"日进斗金、月赚上万！", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/3svmihe767jq23cgwz13%E5%B9%BF%E5%91%8A.jpeg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"图片过于模糊","isright":"0","isshow":0,"chooseimg":""}, {"answer":"发布色情信息渠道","isright":"0","isshow":0,"chooseimg":""},{"answer":" 该内容有广告行为","isright":"1","isshow":0,"chooseimg":""},{"answer":"内容有危害公共安全的行为","isright":"0","isshow":0,"chooseimg":""}],"analysis":"禁止发布：包含售卖产品、提供服务、宣传推广的广告内容。"}

    ];

    //其他
    const otherlist=[
        {"contenttype":"3","contenttitle":"这样的等车方式你学会了吗？", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/347ncfn1grjq23usu21%E4%BC%A0%E6%92%AD%E6%80%A7%E5%8F%98%E6%80%81%E8%A1%8C%E4%B8%BA%E6%88%96%E4%B8%8D%E6%AD%A3%E5%B8%B8%E7%9A%84%E4%BA%A4%E5%8F%8B%E8%A1%8C%E4%B8%BA2.jpg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"图片太模糊","isright":"0","isshow":0,"chooseimg":""}, {"answer":"女生不够漂亮","isright":"0","isshow":0,"chooseimg":""},{"answer":" 图片散布谣言","isright":"0","isshow":0,"chooseimg":""},{"answer":"该图片中男性行为违法社会治安","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：传播性变态行为的内容"},
        {"contenttype":"3","contenttitle":"董存瑞真正炸碉堡的原因", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/1rs4kzizxpjq23ynqf14%E4%BE%AE%E8%BE%B1%E9%9D%A9%E5%91%BD%E7%83%88%E5%A3%AB%E8%8B%B1%E9%9B%84%E4%BA%BA%E7%89%A9.jpg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"图片清晰度不够","isright":"0","isshow":0,"chooseimg":""}, {"answer":"没有笑点","isright":"0","isshow":0,"chooseimg":""},{"answer":" 发布淫秽色情网站或渠道","isright":"0","isshow":0,"chooseimg":""},{"answer":"内容侮辱革命烈士英雄人物","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：侮辱革命烈士英雄人物的内容"},
        {"contenttype":"3","contenttitle":"百试不爽", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/qdk04q3s3hjq240n6617%E6%95%99%E5%94%86%E7%8A%AF%E7%BD%AA.jpg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"图片不够清晰","isright":"0","isshow":0,"chooseimg":""}, {"answer":"色情违规内容","isright":"0","isshow":0,"chooseimg":""},{"answer":" 图片打马严重","isright":"0","isshow":0,"chooseimg":""},{"answer":"教唆犯罪","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：教唆犯罪的内容"}
    ];

    //违法涉政
    const unlawfullist=[
        {"contenttype":"1","contenttitle":"有人知道她是谁吗？", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/gj2i8n4w4hjq24vcdjfengmian.png","http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/1lzl78nc2jq24vav2jq24vatc.mp4"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"视频不清晰","isright":"0","isshow":0,"chooseimg":""}, {"answer":"色情违规内容","isright":"0","isshow":0,"chooseimg":""},{"answer":" 音量过小","isright":"0","isshow":0,"chooseimg":""},{"answer":"在公众场合发表不当言论，不利于祖国统一","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：违反国家和地方法律法规，危害国家及社会安全的内容。"},
        {"contenttype":"1","contenttitle":"城管打人有人管吗？", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/lgciey0zdhjq24ysb3fengmian.png","http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/358xy21q25mjq24yqtnjq24yqs0.mp4"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"视频内容扰乱社会秩序，破坏社会稳定","isright":"1","isshow":0,"chooseimg":""}, {"answer":"色情违规内容","isright":"0","isshow":0,"chooseimg":""},{"answer":" 看不懂什么东西","isright":"0","isshow":0,"chooseimg":""},{"answer":"在公众场合发表不当言论，不利于祖国统一","isright":"0","isshow":0,"chooseimg":""}],"analysis":"禁止发布：违反国家和地方法律法规，危害国家及社会安全的内容。"},
        {"contenttype":"3","contenttitle":"政府能解决下吗？", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/21kal8pqdrjq255169WectIMG10.jpeg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"图片加载失败","isright":"0","isshow":0,"chooseimg":""}, {"answer":"色情违规内容","isright":"0","isshow":0,"chooseimg":""},{"answer":" 看不懂什么东西","isright":"0","isshow":0,"chooseimg":""},{"answer":"散布不当言论，造成负面影响","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：散布谣言，扰乱社会秩序，破坏社会稳定的内容"}
    ];

    //谣言辱骂
    const rumorlist=[
        {"contenttype":"3","contenttitle":"都来喷我啊！", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/4dz7scypijq259mpz11%E8%84%8F%E8%AF%9D.jpg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"图片加载失败","isright":"0","isshow":0,"chooseimg":""}, {"answer":"色情违规内容","isright":"0","isshow":0,"chooseimg":""},{"answer":" 看不懂什么东西","isright":"0","isshow":0,"chooseimg":""},{"answer":"涉及辱骂造谣，言辞污秽，有侮辱女性的行为","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：以辱骂性言论对他人或其他人群进行攻击谩骂，辱骂他人人格。容易引起矛盾以及互相攻击的引战言论。"},
        {"contenttype":"3","contenttitle":"说的很对啊！", "contenturllist": ["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/gi4epyet3kjq34887012%E4%BE%AE%E8%BE%B1%E5%A5%B3%E6%80%A7.jpeg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"看不懂什么东西","isright":"0","isshow":0,"chooseimg":""}, {"answer":"色情违规内容","isright":"0","isshow":0,"chooseimg":""},{"answer":" 图片加载失败","isright":"0","isshow":0,"chooseimg":""},{"answer":"涉及辱骂造谣，言辞污秽，有侮辱女性的行为","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：以辱骂性言论对他人或其他人群进行攻击谩骂，辱骂他人人格。容易引起矛盾以及互相攻击的引战言论。"},
        {"contenttype":"3","contenttitle":"这张图很真实！", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/2oub1qrgfwjq25gaws15%E5%9C%B0%E5%9F%9F%E6%AD%A7%E8%A7%86.jpg"], "question":"这个帖子最终被封禁的原因是？","answerlist":[{"answer":"地区显示不完整","isright":"0","isshow":0,"chooseimg":""}, {"answer":"图片过于模糊，影响观看效果","isright":"0","isshow":0,"chooseimg":""},{"answer":" 看不懂什么东西","isright":"0","isshow":0,"chooseimg":""},{"answer":"该图片内容存在地域歧视","isright":"1","isshow":0,"chooseimg":""}],"analysis":"禁止发布：容易引起矛盾以及互相攻击的地域黑行为的内容。"}
    ];

    //跳过
    const nextlist=[
        {"contenttype":"1","contenttitle":"今天的天气很漂亮吧～", "contenturllist":["http://ctkj-1256675270.cos.ap-shanghai.myqclon.png","http://ctkj-1256675270.cos.ap-视频播放失败1.mp4"], "question":"这种情况应该怎么办？","answerlist":[{"answer":"删除","isright":"0","isshow":0,"chooseimg":""}, {"answer":"保留","isright":"0","isshow":0,"chooseimg":""},{"answer":"跳过","isright":"1","isshow":0,"chooseimg":""},{"answer":"不知所措","isright":"0","isshow":0,"chooseimg":""}],"analysis":"段子哥小提示：用户视频源出现问题时选择跳过处理"},
        {"contenttype":"1","contenttitle":"天气明明在下雨，不信你看？", "contenturllist":["http://ctkj-1256675272.cos.ap-shanghai.myqclon.png","http://ctkj-1256675270.cos.ap-视频播放失败2.mp4"], "question":"这种情况应该怎么办？","answerlist":[{"answer":"跳过","isright":"1","isshow":0,"chooseimg":""}, {"answer":"保留","isright":"0","isshow":0,"chooseimg":""},{"answer":"删除","isright":"0","isshow":0,"chooseimg":""},{"answer":"不知所措","isright":"0","isshow":0,"chooseimg":""}],"analysis":"段子哥小提示：用户视频源出现问题时选择跳过处理"},
        {"contenttype":"1","contenttitle":"天气明明在下雨，不信你看？", "contenturllist":["http://ctkj-1256675272.cos.ap-shanghai.myqclon.png","http://ctkj-1256675270.cos.ap-视频播放失败2.mp4"], "question":"这种情况应该怎么办？","answerlist":[{"answer":"跳过","isright":"1","isshow":0,"chooseimg":""}, {"answer":"保留","isright":"0","isshow":0,"chooseimg":""},{"answer":"删除","isright":"0","isshow":0,"chooseimg":""},{"answer":"不知所措","isright":"0","isshow":0,"chooseimg":""}],"analysis":"段子哥小提示：用户视频源出现问题时选择跳过处理"}
    ];

    /*抽取题库*/
    choosetest();
    function choosetest() {
        testdata=[];
        for(let i=0;i<3;i++){
            let porlength=pornographic.length-1;
            let rnum=randomnum(0,porlength);
            testdata.push(pornographic[rnum]);
            pornographic.splice(rnum,1);
           // console.log(rnum);
        }
        let rnum2=randomnum(0,2);
      //  console.log(rnum2);
        testdata.push(sicklist[rnum2]);
        testdata.push(bloodinesslist[rnum2]);
        testdata.push(advertislist[rnum2]);
        testdata.push(otherlist[rnum2]);
        testdata.push(unlawfullist[rnum2]);
        testdata.push(rumorlist[rnum2]);
        testdata.push(nextlist[rnum2]);
      //  console.log(testdata);

    }


    function cc(list){
        $.each(list,function(i,n){
            console.log(n.answerlist);
        })
    }
