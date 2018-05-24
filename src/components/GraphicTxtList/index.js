/**
 * Created by liuxiaoxiao1 on 2018/3/14.
 */
import React from 'react';
import './graphixTxtList.less'
import Loading from '../Loading';
import StoryItem from '../GraphicTxtItem'



class GraphicTxtList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasNext: true,
            page: 0,
            size: 20,
            items: [
                {
                "isRecommend": false,
                "userPictureShareedCount": 0,
                "userLikerState": false,
                "rating": 78.1207,
                "description": "午安，摄在广州每日精选集20180213，编选：神眼Jay。",
                "title": "摄在广州每日精选集20180213",
                "ratingMax": 91.6198,
                "photoCount": 19,
                "uploaderInfo": {
                    "userRoleIds": {},
                    "nickName": "摄在广州",
                    "avatar": {
                        "a1": "https://img.500px.me/1183806dd46f4b5453b39331eff5d5479_1513901434401.jpg!a1",
                        "baseUrl": "https://img.500px.me/1183806dd46f4b5453b39331eff5d5479_1513901434401.jpg"
                    },
                    "userName": "shezaiguangzhou",
                    "gicEditorialId": "-",
                    "coverUrl": {
                        "baseUrl": "https://img.500px.me/photo/1183806dd46f4b5453b39331eff5d5479/8919c33e5e0145aab5265c5655d4a087.jpg",
                        "id": "1183806dd46f4b5453b39331eff5d5479"
                    },
                    "gicCreativeId": "-",
                    "id": "1183806dd46f4b5453b39331eff5d5479",
                    "userType": 0
                },
                "userPictureShareState": false,
                "id": "1a5257852aa0a10b7eee52d71a58ba7e",
                "state": 0,
                "tag": ["经验心得", "点评赏析"],
                "height": 2100,
                "uploaderId": "1183806dd46f4b5453b39331eff5d5479",
                "openState": "profile",
                "picturePvCount": 621,
                "url": {
                    "p1": "https://img.500px.me/graphic/1183806dd46f4b5453b39331eff5d5479/cf551a06a31341249ffd7f047dc7c5c8.jpg!p1",
                    "p2": "https://img.500px.me/graphic/1183806dd46f4b5453b39331eff5d5479/cf551a06a31341249ffd7f047dc7c5c8.jpg!p2",
                    "baseUrl": "https://img.500px.me/graphic/1183806dd46f4b5453b39331eff5d5479/cf551a06a31341249ffd7f047dc7c5c8.jpg",
                    "p3": "https://img.500px.me/graphic/1183806dd46f4b5453b39331eff5d5479/cf551a06a31341249ffd7f047dc7c5c8.jpg!p3",
                    "p4": "https://img.500px.me/graphic/1183806dd46f4b5453b39331eff5d5479/cf551a06a31341249ffd7f047dc7c5c8.jpg!p4",
                    "id": "1a5257852aa0a10b7eee52d71a58ba7e"
                },
                "commentCount": 0,
                "pictureLikeedCount": 43,
                "createdDate": 1518493310604,
                "width": 3154,
                "resourceType": 3
            }, {
                "isRecommend": false,
                "userPictureShareedCount": 0,
                "userLikerState": false,
                "rating": 77.471,
                "description": "视觉中国编辑类视频供稿功能现已上线，视觉中国编辑类供稿人将自动开通视频上传功能。\n\n可能有细心的供稿人已经发现了，在500px电脑端的签约上传页面上已经出现了上传视频的选项，我们看一下如何在编辑类供稿页面上传视频。\n\n首先登录500px.me网页打开供稿页面，进入【编辑类签约上传】进入编辑类供稿页面。",
                "title": "编辑类视频供稿功能上线啦！",
                "ratingMax": 86.6804,
                "photoCount": 11,
                "uploaderInfo": {
                    "userRoleIds": {},
                    "nickName": "视觉中国签约供稿部落酋长",
                    "avatar": {
                        "a1": "https://img.500px.me/59f2c63e8480ba039c45eeebf12273240_1496632090077.png!a1",
                        "baseUrl": "https://img.500px.me/59f2c63e8480ba039c45eeebf12273240_1496632090077.png"
                    },
                    "userName": "photographervcg",
                    "gicEditorialId": "-",
                    "coverUrl": {
                        "baseUrl": "https://img.500px.me/e3f8104ebdf8480ca7ca204b2f9fa8fe.jpg",
                        "id": "59f2c63e8480ba039c45eeebf12273240"
                    },
                    "gicCreativeId": "-",
                    "id": "59f2c63e8480ba039c45eeebf12273240",
                    "userType": 0
                },
                "userPictureShareState": false,
                "id": "9c9d5ce5e0a6c3dab8bcffd84ac1e047",
                "state": 0,
                "tag": ["公告通知"],
                "height": 531,
                "uploaderId": "59f2c63e8480ba039c45eeebf12273240",
                "openState": "profile",
                "picturePvCount": 789,
                "url": {
                    "p1": "https://img.500px.me/graphic/59f2c63e8480ba039c45eeebf12273240/51d82bf2ee7b4a07bccf8727b514b7ad.jpg!p1",
                    "p2": "https://img.500px.me/graphic/59f2c63e8480ba039c45eeebf12273240/51d82bf2ee7b4a07bccf8727b514b7ad.jpg!p2",
                    "baseUrl": "https://img.500px.me/graphic/59f2c63e8480ba039c45eeebf12273240/51d82bf2ee7b4a07bccf8727b514b7ad.jpg",
                    "p3": "https://img.500px.me/graphic/59f2c63e8480ba039c45eeebf12273240/51d82bf2ee7b4a07bccf8727b514b7ad.jpg!p3",
                    "p4": "https://img.500px.me/graphic/59f2c63e8480ba039c45eeebf12273240/51d82bf2ee7b4a07bccf8727b514b7ad.jpg!p4",
                    "id": "9c9d5ce5e0a6c3dab8bcffd84ac1e047"
                },
                "commentCount": 0,
                "pictureLikeedCount": 28,
                "createdDate": 1520847974079,
                "width": 800,
                "resourceType": 3
            }, {
                "isRecommend": false,
                "userPictureShareedCount": 0,
                "userLikerState": false,
                "rating": 77.471,
                "description": "初识羽裳，是在一家早餐店里。那段时间经常带女儿去那家店里吃粥，每次都是匆匆忙忙的，羽裳也在那里吃粥，他比较闲的样子，遇到了就打个招呼。看到我们忘记拿东西，他会笑着提醒我。之后有一次在街上遇到了他，那天我也闲，就聊了几句，不知怎么他说起了不会用电脑，我说：&ldquo;如果只是用电脑来打字发点东西是很简单的事。&rdquo;他说：&ldquo;你有空教教我？&rdquo;我想也没想就答应了。",
                "title": "羽裳的诗（二）",
                "ratingMax": 87.1267,
                "photoCount": 196,
                "uploaderInfo": {
                    "userRoleIds": {},
                    "nickName": "杨晓",
                    "avatar": {
                        "a1": "https://img.500px.me/ee23b01db4783892059b069408d352009_1495645014096.JPG!a1",
                        "baseUrl": "https://img.500px.me/ee23b01db4783892059b069408d352009_1495645014096.JPG"
                    },
                    "userName": "yangxiao",
                    "gicEditorialId": "-",
                    "coverUrl": {
                        "baseUrl": "https://img.500px.me/photo/ee23b01db4783892059b069408d352009/ed6ec1eb4c964317a278359aac41ae3c.jpg",
                        "id": "ee23b01db4783892059b069408d352009"
                    },
                    "gicCreativeId": "-",
                    "id": "ee23b01db4783892059b069408d352009",
                    "userType": 0
                },
                "userPictureShareState": false,
                "id": "d9fdd4bbb90063d42324273f5d3d0f47",
                "state": 0,
                "tag": ["图文故事"],
                "height": 4000,
                "uploaderId": "ee23b01db4783892059b069408d352009",
                "openState": "profile",
                "picturePvCount": 866,
                "url": {
                    "p1": "https://img.500px.me/graphic/ee23b01db4783892059b069408d352009/649458953efa44be972537a70c6f5435.jpg!p1",
                    "p2": "https://img.500px.me/graphic/ee23b01db4783892059b069408d352009/649458953efa44be972537a70c6f5435.jpg!p2",
                    "baseUrl": "https://img.500px.me/graphic/ee23b01db4783892059b069408d352009/649458953efa44be972537a70c6f5435.jpg",
                    "p3": "https://img.500px.me/graphic/ee23b01db4783892059b069408d352009/649458953efa44be972537a70c6f5435.jpg!p3",
                    "p4": "https://img.500px.me/graphic/ee23b01db4783892059b069408d352009/649458953efa44be972537a70c6f5435.jpg!p4",
                    "id": "d9fdd4bbb90063d42324273f5d3d0f47"
                },
                "commentCount": 0,
                "pictureLikeedCount": 5,
                "createdDate": 1509114880026,
                "width": 6000,
                "resourceType": 3
            }, {
                "isRecommend": false,
                "userPictureShareedCount": 0,
                "userLikerState": false,
                "rating": 77.1898,
                "description": "在泰国神仙岛旅行休息时，旁边坐了一个小男孩，于是很友好的向他说了句&ldquo;萨瓦迪卡&rdquo;，男孩害羞的跑到（估计是他的父亲）身边亲昵的搂着他父亲的脖子很友好的向这边看了，于是我拿起相机记录下这一刻。（旁边黑衣服的女人是和他们一起的，应该是幸福的一家人。）",
                "title": "幸福",
                "ratingMax": 77.1898,
                "photoCount": 133,
                "uploaderInfo": {
                    "userRoleIds": {},
                    "nickName": "一笑",
                    "avatar": {
                        "a1": "https://img.500px.me/8cdfefde842f583c550b275b7cac58912_1508884307326.jpeg!a1",
                        "baseUrl": "https://img.500px.me/8cdfefde842f583c550b275b7cac58912_1508884307326.jpeg"
                    },
                    "userName": "https1884",
                    "gicEditorialId": "-",
                    "coverUrl": {
                        "baseUrl": "https://img.500px.me/1ab586003e9a4c898ed9a7e86d6d4678.jpg",
                        "id": "8cdfefde842f583c550b275b7cac58912"
                    },
                    "gicCreativeId": "-",
                    "id": "8cdfefde842f583c550b275b7cac58912",
                    "userType": 0
                },
                "userPictureShareState": false,
                "id": "7eb6587ea7c9a13a18a913f6d750bf05",
                "state": 0,
                "tag": ["图文故事"],
                "height": 4480,
                "uploaderId": "8cdfefde842f583c550b275b7cac58912",
                "openState": "profile",
                "picturePvCount": 24,
                "url": {
                    "p1": "https://img.500px.me/graphic/8cdfefde842f583c550b275b7cac58912/031d25659d9b476e9402a3c1fe6361a2.jpg!p1",
                    "p2": "https://img.500px.me/graphic/8cdfefde842f583c550b275b7cac58912/031d25659d9b476e9402a3c1fe6361a2.jpg!p2",
                    "baseUrl": "https://img.500px.me/graphic/8cdfefde842f583c550b275b7cac58912/031d25659d9b476e9402a3c1fe6361a2.jpg",
                    "p3": "https://img.500px.me/graphic/8cdfefde842f583c550b275b7cac58912/031d25659d9b476e9402a3c1fe6361a2.jpg!p3",
                    "p4": "https://img.500px.me/graphic/8cdfefde842f583c550b275b7cac58912/031d25659d9b476e9402a3c1fe6361a2.jpg!p4",
                    "id": "7eb6587ea7c9a13a18a913f6d750bf05"
                },
                "commentCount": 0,
                "pictureLikeedCount": 13,
                "createdDate": 1520992761367,
                "width": 6720,
                "resourceType": 3
            }, {
                "isRecommend": false,
                "userPictureShareedCount": 0,
                "userLikerState": false,
                "rating": 77.1898,
                "description": "我的爷爷雷炳汉出生于1909年农历10月初四，毕业于国民党广西民团指挥学校，国民政府时期历任邕宁县府秘书、社会科科长，1937年经地方绅士雷琨池（雷沛鸿）老先生的推荐任南宁城区区长；当时的邕宁县政府在现南宁市共和路（万达），抗战期间他积极组织发放救灾物资，在当时的县政府设立了平价食堂，用美国提供的救济物资面粉、米等做成馒头、米饭发放给困难的地方民众；还组织编辑出版先进思想的刊物，在当时有一定的影响力，最后在当局的干涉下停刊。当时的邕宁县长方德华，属于地方顽固派，他网罗重用了一些托派分子，到处侦查地下党的活动情况，对抗日救国运动设下重重障碍，并想把当时的地下党南宁上国镇镇长梁游调离，以便安排他的爪牙，在雷炳汉与县参议长黄沛棠和地方绅士雷琨池坚持不同意下，阴谋未能得逞；后来，在和方德华的斗争中，地方开明绅士雷琨池（雷沛鸿）和雷炳汉、梁游等人收集了方德华的贪赃枉法罪状，最终方德华被撤去了县长的职务，由陈文中接任县长，陈文中和方德华也是一丘之貉，对梁游的地下党组织早已注意，用调虎离山之计把梁游调到县府监视。为保住上国镇的地下组织，梁游找到雷炳汉要求更换梁游的弟弟梁曾瑜接任镇长，雷炳汉找到梁瀚嵩将军，要求他干预此事，梁瀚嵩将军也对县政府的做法不满意，立即写了条子让雷炳汉带给了陈文中，陈文中不敢开罪梁瀚嵩，只能任用了梁曾瑜做了上国镇镇长，从而保住了地下党组织在南宁的地下据点，一直保留到解放前夕。雷炳汉任职抗战期间在1939年日寇入侵南宁时，曾经和越南劳动党的韦南山在南宁组织抗日游击队，在左右江两江之间打击日寇，严重打击了日寇在南宁嚣张气焰。\n     1947年春，广西救济总署结束，拨给救济物资，中国战时儿童保育会广西南宁儿童教养院由邕宁县政府接管，由主管的民政科转交给了社会科，同年夏改名南宁育幼所，（明秀寺即市六医院所在地)，社会科科长雷炳汉兼任南宁育幼院所长，当时有120多名难童.大部分是南宁失依儿童收容的城乡儿童，儿童大部分分为三部分，无家可归，流浪街头的，父母双亡或离异的孤儿，家穷子女多无力抚养的。年龄最大15.6岁，最小的仅5&lsquo;6岁。1948年春雷炳汉调任邕宁县政府秘书后，他商得中共地下党南宁特支的支持下，安排了县府委员罗世弘为专职主任，事务员何巨之，会计兼出纳李雅斌。教学人员5人。保育院的经费全由邕宁县社会科供给，在负责育儿院之时，雷炳汉向南宁特支申请安排了雷达、何巨之、张若冰、李瑞民等几位地下党党员进入育儿院，利用教师的身份秘密成立了党小组。\n      1948年因为人耿直，思想进步，经南宁地下党组织南宁特支书记梁增瑜、谢以平的介绍加入了中国共产党，并利用他在国民政府官员的身份，暗中支持南宁地下党的工作，为和平解放南宁作出了贡献。1949年春南宁特支成立，并设立东区区委书记李华，负责邕宁八尺区一带，南区区委书记黄照晖，管三官区一带，从东区、南区划出吴圩、苏圩建立迁龙区区委书记马斯；雷炳汉出任西北区工委书记，同时成立中共那龙支部，雷炳汉任支书，潘馨比任组织委员兼武装委员，卢尚暨任宣传委员。西北区负责南宁邕江上游那龙、坛洛一带、包括邕宁、邕武（武鸣）、邕隆（隆安）、邕扶（扶绥）等四县交界地方，是左右两江径流汇合的三角地带，对南宁形成西北狭长的包围圈。该地区土匪、特务多，地方势力强大，其中土匪头子李长昇、黄阔是长久以来的势力，经常在左右江之间打劫来往船只和商船，还有坛洛的国军邓笃初是洪帮头子，有不少爪牙控制着坛洛地区。西北区成立后，着重在左右江沿河两岸设立武装据点，首先在安吉、西乡塘陈西村、沙井乡同乐上雷及松柏等村、安吉乡里村及石埠乡灵弯村、桥板乡岑雀村、、大同乡藤村等建好了武装据点。把这些乡连成一个纵线，然后向其他地方伸沿发展。分别设置了第十武装队，下设四个分队，由韦有兴负责；第十一武工队队长梁玉褶，十二武工队队长潘清志，十三武工队队长卢步云，副队长卢福义。第十四武工队下设四个分队由陈可槐、雷炳朝、雷荫莱、黄藻墀负责；武工队整编完成后即转入了武装反&ldquo;三征&rdquo;的斗争。\n 南宁特支于1949年5月上旬在南宁市郊葛麻村谢以平家中召开了葛麻会议，参加会议的有特支成员苏仁山、梁增瑜、谢以平以及个区委书记雷炳汉、黄照晖、李华、潘馨比等七人，会议由苏仁山主持，开了一昼夜，会议决定配合解放大军南下成立了滇桂黔边纵邕江支队，所辖10、11、12团和直属迁龙大队地方武装组织，苏仁山为支队司令员、梁增瑜为支队政治委员，李华为第十团团长兼政委，黄照晖为第十一团团长兼政委，潘馨比为十二团团长，雷炳汉任为政委，辖5个武工队；十二团在坛洛的东南乡那平村举办了训练班，参加训练的骨干队员30多人，每期5-10天，当时没有现成的教材，时间短，训练内容大体分为政治、军事两方面以整顿部队，提高素质。经过训练的武工队员，绝大多数成为部队的中坚力量。\n        1949年6月，雷炳汉和潘志清由那龙到东南乡了解反&ldquo;三征&rdquo;情况时，恰值碰到伪邕宁县府的警队十多人到东南乡督征粮、征税，住在乡公所里，并探悉伪警队在午饭后，就过河到金陵去督征了。雷炳汉决定袭击伪警队，原要调动那平游击队出击，全歼敌警队。但潘志清赶去那平村通知时，游击队已到别处活动了，未能及时赶到。而此时伪警队已准备好渡河到金陵督征行动了。时间紧迫，雷炳汉和潘志清考虑凭着自己随身的仅有两支驳壳手枪和少量子弹，要和敌人拼不过的，有不甘心让伪警队安然渡江太便宜了，雷炳汉此时决定凭着两支手枪，并采用电光炮竹假冒代替枪弹助威的办法。先买好了电光炮竹，然后到渡口边的小丛林埋伏，候敌警下船的时候突然开枪射击，接着烧起电光炮竹助威。纸炮竹在山间响起来很像密集的枪声，敌警队一听到枪声响起，受到了突如其来的袭击，惊慌失措的登上渡船，猛催船夫开船过河逃命，有些敌警趴在船舱躲避，有的跳下河里浸水避弹，不敢开枪还击。待敌伪警到金陵乡后，雷炳汉又叫了一些群众在金陵乡散播消息说&ldquo;县警队好彩过河早些，要不然就被游击队全部消灭了&rdquo;，伪警队听到风声后，惊恐地集队离开金陵乡转到坛洛区伪区公所和区警队一起缩起来，不敢在出动到各乡督征也不再敢随便行动了，这次突然的袭击在反&ldquo;三征&rdquo;上起了很大的作用。同时区工委写出很多警告伪区公所伪职员的信件，警告他们不要再向人民群众进行逼迫征粮、征兵、征税，不要再为国民党反动政府卖力，如有违背，仍进行迫害人民，必将受到人民的严惩。经过宣传和警告后，敌人、敌警队和区乡村长都不再敢横行作恶，伪政府的&ldquo;三征&rdquo;在区乡基层组织都陷于瘫痪状态。特别是1949年9月底，西北区工委接到上级发来中华人民共和国政府成立的布告后，雷炳汉安排梁玉褶将布告连夜张贴到伪坛洛区公所门口后，伪区公所职员第二天看到布告，即惊慌失措的将全部兵丁及人员一起撤走了，伪副区长李长昇兼警队长躲避在家里不出门。\n     1949年6月5日雷炳汉、潘馨比率武工队，在金陵渡口伏击坛洛区警长邓桂芳等十五名渡河下乡催粮的伪警，伪警有跳河的有仓惶返渡逃回区公所。从此，再也不敢到各乡村督征催粮。6月下旬，同兴乡警5名，到清宁乡催粮，抓走一抗粮的农民，被十二团陆世业队在途中伏击，不到十分钟，即结束了战斗，解救了抗粮农民，并缴获79步枪五支，子弹四百多发。                               1949年7月初，同兴乡伪副乡长曾奇，其乡警被我伏击缴械后，召集各村伪村长开会，扬言要追剿我游击队。十二团获悉后，决定先发制人，派队长邓振元、陆世业、邓日昇率队，与午夜奇袭同兴乡公所，将已熟睡的乡警宿舍房门锁上，把他们的步枪全部捆扎起来，然后向跑楼顶开枪，三楼的副乡长曾奇闻到枪声，急忙下楼，当场被击毙。乡警十二名全被俘，缴获步枪十二支，手枪一支，弹药五百多发。各村伪村长闻讯纷纷外逃，全乡陷于瘫痪。\n       1949年8月3日，保安团一个连到坛洛边界押运粮船回南宁，十二团获悉后组织截击，由潘馨比、卢福义指挥，他们选择了有利河段埋伏，八月五日夜，敌粮船六艘顺流而下，当船到中伏村，我部即发起攻击，迫使其向东岸河边航行，进入埋伏圈。武工队发起攻击，前面五艘船见势不妙，拼命逃走，未能拦截住，最后一艘船舵工被打死，船身立即打横随波而飘，又打死了几个敌兵。静卧战士的喊话劝降，船上残敌被迫放下武器。这次伏击战，打死敌兵四名、俘虏十名、缴获轻机枪一挺，步枪七支子弹五百发、大米五千斤、黄豆贰仟斤、花生油五百斤。    \n       1949年9月滇桂黔边委和粤桂边十万大山地委作出决定，南宁党组织拨归十万山地委领导，撤销南宁特支，城乡分开，南宁设城市工委，农村地区交邕宁县委领导，并派阮洪川接管城市工作，严秋接管农村工作。9月谢以平根据严秋意见，将西北区改为江北区，管辖邕宁县邕江以北地区，原中共西北区工委改为中共邕宁县江北区委员会，委员会由谢以平、雷炳汉、潘馨 比、卢尚暨、徐林五人组成，谢以平任书记，雷炳汉任副书记，潘馨 比任组委、卢尚暨任宣委、徐林任武装委员。                                                                                                                                                                                                                                                                                            1949年10月国民党某部团长严卓然率其残部100多人乘船到南宁老口大同上岸，被十二团第三大队陈炳佑率队在安手村沙牛田伏击，打死敌人二十多名，缴获步枪二十二支，子弹两千余发，敌军不知我军虚实，且疲于奔命，不敢恋战，仓皇逃窜；1949年11月，解放大军已解放桂林，南宁政府军警惊慌失措，南宁专署保安团一百多人由右江乘八只船下南宁，被十二团从陆村坑至下楞间分段阻击，当场击毙数名敌军，船上国军遂以机枪、六零炮还击，相持到下午三时，打死国军二十多名，缴获冲锋枪1支，步枪十五支。子弹一千多发。敌船见势不利向东南大滩急窜，到鸡笼山又被十二团第三大队伏击，击毙十三名敌军，敌军逃到下楞时，又受到十二团第一大队的狙击，毙敌十五名，缴获步枪二十多支，子弹一千多发，军衣一批。\n       1949年12月3日，敌军残部数百人，企图向钦州、防城方向逃窜，被第十团和各村群众围困在那岳村的甘蔗地里，此时解放大军已逼近南宁，我军斗志盎然，残匪自知已成瓮中之鳖，不敢顽抗，经两天的政治攻势，终于迫使敌人放下武器。这一役计俘敌官兵四百余人，缴获六零炮六门，重机枪一挺，轻机枪十三挺、步枪三百支、弹药数万发，战马四匹，其他轴重大批。以上这些战队只是解放前夕的一个小小插曲而已，还有很多战斗故事不再叙述。\n    十一月初，我是二团第二大队在十二团副政委徐林、大队长卢尚暨、张志云的带领下，在东南大滩伏击一艘从百色驶往南宁的国名党兵船（事后才知是运伤兵船），俘敌六人，缴获冲锋枪、步枪六支。被俘人员经教育后发给路费遣散回家，伤兵令他们继续驶往南宁。\n      十一月中旬，我江北区十二团发信警告国民党坛洛区警长、匪首李祥昇，勒令他缴枪投降，在强大的攻势下，李接受投降，我缴获轻机枪两挺，长短枪十多支。李祥昇投降后，伪坛洛区公所处于瘫痪状态，整个坛洛区完全在十二团控制之下。从此全区的工作转入肃清地方残余势力和开展筹粮支前工作。\n     十一月下旬，经南宁策反小组苏仁山、陈权等同志的反复宣传教育，在南宁的部分国民党军政上层人员二十多人成立&ldquo;解放同盟会&rdquo;，南宁警察局局长唐超寰、华中剿总工兵团、229师炮兵团起义，经过阮洪川等同志的工作，护商大队杨振伟也决定起义。\n     在邕江支队10、11、12团围攻截击向钦防和越南方向逃窜的国民党残余部队时，解放大军已逼近南宁，国军残匪自知大势已去，经地下党组织的政治攻势，迫使敌军残部放下了武器。由于南宁地下党的工作，在邕宁（南宁）解放过程中，只是在国民党军队在往钦州方向溃退的时候，发生了零星的战斗。由于国民党部队溃退时一路丢弃了不少枪支弹药服装等等，被当地一些遗留武装收捡，壮大了当地土匪武装，增加了当时的剿匪难度。\n      在南宁解放前夕，南宁特支还发出了&ldquo;告全市人民书&rdquo; ，号召全市人民做好保护工厂和机关的物资公共设备，警告敌伪人员安分守己，立功赎罪。由于南宁特支及时做好了工作，各工厂机关学校均没有受到破坏，为和平解放南宁做出了贡献。\n       1949年12月4日午夜解放军开进邕城，在南宁地下党的配合下和平解放了南宁，4日晚上只能听到远处一些零零散散的枪声，就如放鞭炮一样，当第二天人们早上起来的时候，这才发现解放军已经在街头村尾安营扎寨的，一片祥和的景象，邕宁（南宁）和平解放后，于12月26日在南宁亭子马鞍岭（今南宁糖纸厂）成立了&ldquo;邕宁县人民政府&rdquo;，设中区、坛洛、金城、八尺、迁龙、三官、城区（县委直属区）等7个区，雷炳汉任中区区长，中区人民政府成立于心圩（今南宁市动物园附近），辖东门（今长堽岭）、西乡塘、安吉、石埠、沙井、亭子、同兴、三塘等8个乡区。1950年在任十四区区长期间参与配合四野解放军部队的剿匪工作，南宁郊区的土匪曾多次想找机会杀害他，并威胁到雷家族人的安全，曾经被2000多土匪包围南宁沙井乡邓平村，要抓雷姓家族的族人割耳朵，宣称要割下雷家200斤耳朵；雷炳汉也并没有因此而害怕过土匪，曾骑马独闯过南宁安吉郊区的土匪窝，土匪们眼睁睁看着他一人单枪匹马的闯了过去，路边两旁的土匪队伍竟没人敢阻拦开枪。南宁解放后历任中区区长、八尺区区长、邕宁县一区、十四区区长、桂西壮族自治州农村水利局政治指导员、老虎岭水库灌溉工程建设指挥部总指挥、所长、副主任等职，在职期间力主水利工程，带领万人兴建南宁市老虎岭水库；1965年以先进典型代表桂西出席全国水利工作会议。\n       雷炳汉一生清廉，为人正直、品行高洁，在调任桂西壮族自治区农林水利局政治指导委员，在此期间由于太过耿直，言论不注意当时的形式，在大跃进时期敢于如实反映广西横县交椅区等地方有农民捡野菜吃、饿死农民等现状被盖上了&ldquo;右派的帽子&rdquo;，开除党籍、撤销职务、保留干部籍，遭遇了20多年的政治劫难。1958年下放至高峰林场劳动、次年到明阳农场；在1963年调回原机关老虎岭水库（当时已该属南宁市）；1966年由于南宁市红卫兵司令部布告规定&ldquo;地、富、反、坏、右份子，限令一律遣回原籍乡村劳动生产。经过上级批准在1973年春摘掉&ldquo;右派&rdquo;帽子，但一直未安排工作，雷炳汉多次要求重新安排工作，上级一直以各种理由推托。\n      1980年雷炳汉才得以平反，平反后则是大量的文件资料整理修改、出席各种会议以及写回忆录、积极帮助没有得到平反的同志出证明材料、写申诉材料等等，在一天夜里正在整理资料的老人家突然中风倒地，被我五叔雷培森发现，及时送到医院抢救，最终因为操劳过度导致脑血栓瘫痪，经过不断的治疗中，他的同学广西名医黄道全还亲自到家里给他治疗，但最终还是落下了偏瘫，再也离不开拐杖，行动也不方便了。但他即使是躺在医院的病床上也还一如既往的接待那些来要求为其写证明材料的同志，还继续审阅、整理各种文件资料，修正冤假错案以及南宁的党史资料，拄着拐杖区参加各种会议等等。例如在解放初期，某些军分区领导不进行调查，偏听偏信，错误的把一些当地一些曾为抗日战争和解放战争立过战功的游击队视为&ldquo;土匪组织&rdquo;，许多同志蒙冤入狱，甚至含冤九泉，有些同志不敢承认曾参与游击队，割断了这段革命历史，其中有南宁西乡塘陈西村武工队、邕东（宾阳）游击队在解放初期被错误认定为土匪队伍，不予承认是武工队。直到雷炳汉获得平反后，在他老人家的呼吁下于1986年3月获得平反。\n     雷炳汉的一生坎坷不平，抗日战争期间，因为在南宁与越南劳动党的韦南山组织抗日队伍，被国民党政府怀疑私通共产党，而在广西扶绥与通讯员一起逮捕，从扶绥徒步解押回武鸣监狱途中，他的通讯员因为反抗被枪杀；关押在武鸣监狱中不幸得了鼠疫，脖子上长了个大疮，差点命丧黄泉；有幸的是他的同学-广西名医黄道全到狱中为他救治，才得以康复痊愈，最后在国民党中将广西民团总指挥梁翰松将军斡旋下才得以释放。他老人家于1996年6月4日离开了人世，享年88岁。  \n\n本文参考资料：内刊《南宁党史资料》第十五期（1986年6月）、1983年第二期、《南宁党史资料通讯》1988年第一期、《中国战时儿童保育会广西南宁育幼院师生通讯录》1993.6.6、内参稿、《雷炳汉手稿》《雷炳汉回忆录》等",
                "title": "南宁解放功臣-雷炳汉",
                "ratingMax": 77.1898,
                "photoCount": 30,
                "uploaderInfo": {
                    "userRoleIds": {"editorialcontractphotographer": true},
                    "nickName": "雷文镇",
                    "avatar": {
                        "a1": "https://img.500px.me/744f296d9445484247459b221f5386204_1494475272711.jpg!a1",
                        "baseUrl": "https://img.500px.me/744f296d9445484247459b221f5386204_1494475272711.jpg"
                    },
                    "userName": "leiwenzhen",
                    "gicEditorialId": "528424",
                    "coverUrl": {
                        "baseUrl": "https://img.500px.me/photo/744f296d9445484247459b221f5386204/d66947d8e20e4de5a4a42ef60892ccfb.jpg",
                        "id": "744f296d9445484247459b221f5386204"
                    },
                    "gicCreativeId": "-",
                    "id": "744f296d9445484247459b221f5386204",
                    "userType": 0
                },
                "userPictureShareState": false,
                "id": "b1d41949c7cf1597280a834854a0c457",
                "state": 0,
                "tag": ["图文故事", "人物访谈"],
                "height": 3899,
                "uploaderId": "744f296d9445484247459b221f5386204",
                "openState": "profile",
                "picturePvCount": 400,
                "url": {
                    "p1": "https://img.500px.me/graphic/744f296d9445484247459b221f5386204/ac686da750864c589d8f24603feb1e73.jpg!p1",
                    "p2": "https://img.500px.me/graphic/744f296d9445484247459b221f5386204/ac686da750864c589d8f24603feb1e73.jpg!p2",
                    "baseUrl": "https://img.500px.me/graphic/744f296d9445484247459b221f5386204/ac686da750864c589d8f24603feb1e73.jpg",
                    "p3": "https://img.500px.me/graphic/744f296d9445484247459b221f5386204/ac686da750864c589d8f24603feb1e73.jpg!p3",
                    "p4": "https://img.500px.me/graphic/744f296d9445484247459b221f5386204/ac686da750864c589d8f24603feb1e73.jpg!p4",
                    "id": "b1d41949c7cf1597280a834854a0c457"
                },
                "commentCount": 0,
                "pictureLikeedCount": 13,
                "createdDate": 1520058550673,
                "width": 3669,
                "resourceType": 3
            }, {
                "isRecommend": false,
                "userPictureShareedCount": 0,
                "userLikerState": false,
                "rating": 77.1263,
                "description": "下午好，欢迎阅览摄在广州每日精选，今日选编：Akashin989。",
                "title": "摄在广州每日精选20180312",
                "ratingMax": 87.1267,
                "photoCount": 20,
                "uploaderInfo": {
                    "userRoleIds": {},
                    "nickName": "摄在广州",
                    "avatar": {
                        "a1": "https://img.500px.me/1183806dd46f4b5453b39331eff5d5479_1513901434401.jpg!a1",
                        "baseUrl": "https://img.500px.me/1183806dd46f4b5453b39331eff5d5479_1513901434401.jpg"
                    },
                    "userName": "shezaiguangzhou",
                    "gicEditorialId": "-",
                    "coverUrl": {
                        "baseUrl": "https://img.500px.me/photo/1183806dd46f4b5453b39331eff5d5479/8919c33e5e0145aab5265c5655d4a087.jpg",
                        "id": "1183806dd46f4b5453b39331eff5d5479"
                    },
                    "gicCreativeId": "-",
                    "id": "1183806dd46f4b5453b39331eff5d5479",
                    "userType": 0
                },
                "userPictureShareState": false,
                "id": "494e1c32388a96a176c237d2e73dd3ab",
                "state": 0,
                "tag": ["图文故事", "点评赏析"],
                "height": 893,
                "uploaderId": "1183806dd46f4b5453b39331eff5d5479",
                "openState": "profile",
                "picturePvCount": 252,
                "url": {
                    "p1": "https://img.500px.me/graphic/1183806dd46f4b5453b39331eff5d5479/4df035e3c7f44ae395d933fd44134f39.jpg!p1",
                    "p2": "https://img.500px.me/graphic/1183806dd46f4b5453b39331eff5d5479/4df035e3c7f44ae395d933fd44134f39.jpg!p2",
                    "baseUrl": "https://img.500px.me/graphic/1183806dd46f4b5453b39331eff5d5479/4df035e3c7f44ae395d933fd44134f39.jpg",
                    "p3": "https://img.500px.me/graphic/1183806dd46f4b5453b39331eff5d5479/4df035e3c7f44ae395d933fd44134f39.jpg!p3",
                    "p4": "https://img.500px.me/graphic/1183806dd46f4b5453b39331eff5d5479/4df035e3c7f44ae395d933fd44134f39.jpg!p4",
                    "id": "494e1c32388a96a176c237d2e73dd3ab"
                },
                "commentCount": 0,
                "pictureLikeedCount": 27,
                "createdDate": 1520834998831,
                "width": 1340,
                "resourceType": 3
            }]
        }
    }

    _loadData () {
        //TODO: 取数据
        // Ajax.get().then((resData) => {
        //
        // })

        this.setState({
            items: [...this.state.items, {
                id: 3,
                name: '大赛复赛阶段新闻组评审',
                time: '2018-01-11 12:00:00',
                theme: '世界新闻',
                type: '淘汰',
                num: '200',
                schedule: '124/200',
                isNeedAllSubmit: '是',
                state: '已提交'
            },{
                id: 4,
                name: '大赛复赛阶段新闻组评审',
                time: '2018-01-11 12:00:00',
                theme: '世界新闻',
                type: '淘汰',
                num: '200',
                schedule: '124/200',
                isNeedAllSubmit: '是',
                state: '已提交'
            }]
        })


    }

    render() {
        const { hasNext, items } = this.state;
        return (
            <div className="discovery-story-list-region">
                <div className="story_container">

                    {
                        items.length ? (
                                <div className="cardLists clearfix">
                                    {
                                        items.map(function(item, index) {
                                            return (
                                                <StoryItem {...{
                                                    key : item.id,
                                                    item : item
                                                }} />
                                            )
                                        })
                                    }

                                </div>
                            ) : ''
                    }


                    {/*<Loading {...{*/}
                        {/*containerNode: '',*/}
                        {/*onClick: this._loadData.bind(this),*/}
                        {/*isShow: hasNext*/}
                    {/*}}/>*/}
                </div>
            </div>
        );
    }
}



export default GraphicTxtList;
