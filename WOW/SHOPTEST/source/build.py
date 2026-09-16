import json,pathlib
P=pathlib.Path('output'); products=[]
def add(cat,name,img,url,sub='',**kw):
    if not img.startswith('http'): img='https://www.wow.com.tw/'+img
    if not url.startswith('http'): url='https://sho.pe/'+url
    products.append(dict(id='p'+str(len(products)+1),category=cat,name=name,image=img,url=url,subtitle=sub,description='',active=True,**kw))
for file,sub in [('TA.jpg','經典紀念款'),('T1.jpg','青春粉紅'),('T2.jpg','氣質米'),('T3.jpg','不敗黑'),('T4.jpg','經典白'),('T3.webp','常態款'),('TB1.webp','兒童青春粉紅'),('TB2.webp','兒童氣質米')]: add('衣','兒童紀念 T-shirt' if file.startswith('TB') else '紀念 T-shirt','tw/about/images/'+file,'worldTour',sub)
banner=lambda n:'upload/news/%e8%9d%a6%e7%9a%ae%e9%80%a3%e6%92%ad-'+n+'.jpg'
add('行','萬用矽膠飲料提袋',banner('02'),'8wkecx','杯墊兩用設計')
for f,s in [('db_02.jpg','丈青色'),('db_01.jpg','粉紅色')]: add('行','矽膠飲料提袋','images/about/'+f,'8wkecx',s)
for f,s in [('eb_02.jpg','深色款'),('eb_01.jpg','淺色款')]: add('行','環保購物袋','images/about/'+f,'WOWebags',s)
add('行','WOW限定造型傘',banner('01'),'8wkerq','晴雨兩用')
shop=lambda id:'https://shopee.tw/product/144505443/'+id
for f,s in [('c','藍色帥氣龍'),('d','紫紅美麗妮'),('a','紅色帥氣龍'),('b','粉紅美麗妮')]: add('行','迷你小傘','images/about/shop9'+f+'.jpg',shop('14965139355'),s)
add('行','造型手動傘','images/product/WOW0711.jpg',shop('22735725420'),'妮妮公主款')
for f,n,s,u in [('e','三折手開傘','WOW湖水綠','8wke6z'),('f','三折手開傘','WOW魔力紅','8wke6z'),('g','直骨自動開傘','WOW湖水綠','8wkerq'),('h','直骨自動開傘','WOW魔力紅','8wkerq')]: add('行',n,'images/about/shop9'+f+'.jpg',u,s)
add('行','造型後背包','images/about/shop3a.jpg',shop('15713020475'),'帥氣龍')
add('行','造型後背包','images/about/shop3b.jpg',shop('15213011920'),'美麗妮')
add('行','龍龍兩用頸枕','images/about/shop02.jpg','8wkelg','絨毛周邊')
add('居','園區限定｜拼圖胸章冰箱貼','tw/about/images/T529a.webp','95jq6b',feature=True,image2='https://www.wow.com.tw/tw/about/images/T529b.webp',specs='景觀 8 款設計，每套內含磁鐵 9 片\n拼圖直徑 6cm\n材質：ABS塑膠、五金別針、磁鐵\n使用說明：可用內附挑針由後方孔戳出拼圖',warnings='內含別針，不適合未滿14歲兒童使用。\n為維護安全，請在成人監督下使用。\n含有磁性物，吞入會吸附消化器官導致傷害。若吞入應立即就醫。\n塑膠袋拆卸後請立即銷毀或遠離嬰幼兒。')
products[-1]['description']='把微縮景觀化作胸章別在帆布袋上，或作為冰箱貼夾住家人的溫馨紙條，讓歡樂融入日常。'
for n,f,u,s in [('硅藻土杯墊','images/about/wg1.jpg',shop('24818029382'),'龍龍／妮妮／大野狼'),('迷你景觀磁鐵','images/about/sma.jpg',shop('14965128323'),'共有4款'),('WOW浴巾','images/product/wowtowel.jpg','8wkemb','櫻花粉／寶寶藍'),('小歡龍毛巾','images/product/luckytowel.jpg','8wken5','薰衣草紫／天空藍'),('7吋絨毛晴天娃娃','images/about/shop7a.jpg',shop('15210132013'),'帥氣龍'),('7吋絨毛晴天娃娃','images/about/shop7b.jpg',shop('11275564759'),'美麗妮')]: add('居',n,f,u,s)
for n,f,u,s in [('造型口袋筆','shop703.jpg','9aang2',''),('造型迴紋針','shop01.jpg',shop('6713361624'),''),('資料收納袋3入','filew.jpg','8wkexp','龍龍／妮妮／大野狼'),('紓壓轉轉筆','Pan1.jpg',shop('25234512827'),'龍龍款'),('紓壓轉轉筆','Pan2.jpg',shop('25234512827'),'妮妮款'),('妮妮輕巧扁梳','nnbp1.jpg','8wkf24',''),('威力大圓扇','coolw.jpg','8wkewk','')]: add('育',n,'images/about/'+f,u,s)
for num,s in [('03','魔法焦糖'),('04','奇魅岩鹽'),('05','搖滾起司')]: add('樂','小人國限定爆米花',banner(num),'W_popcorn',s)
for n,f,u in [('水晶棒棒糖','images/about/shopllp.jpg','8wkepl'),('環遊世界撲克牌','images/about/cardsS.jpg','8wkeya'),('迷你世界彈力球','images/product/BallS.jpg','8wkf2e'),('迷你景觀模型','images/about/smb.jpg',shop('17628555684')),('舒壓吊飾','images/about/shop9s.jpg',shop('24718026900'))]: add('樂',n,f,u)
data=dict(version=1,settings=dict(title='小人國網路商城｜限定爆米花、紀念T恤與周邊商品',description='小人國主題樂園網路商城精選限定爆米花、紀念T恤、造型傘、拼圖胸章冰箱貼與生活小物。瀏覽商品介紹，前往蝦皮賣場選購。',canonical='https://www.wow.com.tw/tw/about/shop.aspx',ogImage='https://www.wow.com.tw/'+banner('03'),hasH1=True),products=products)
P.joinpath('wow-shop-data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
print('seed products:',len(products))
