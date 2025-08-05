# 高德测试信息记录

mac 位置更新： false 120.15515 30.27415
android 位置更新： 120.08615， 30.312431

实际地址：120.090217,30.309734

位置测试

高德定位文本查询：
https://restapi.amap.com/v3/place/text?keywords=悦生雷迪森维&offset=20&page=1&extensions=all&key=1c4a139d09e6d072011d125b6d54d4e6
https://restapi.amap.com/v3/place/text?keywords=晓月映翠&city=杭州市&offset=20&page=1&extensions=all&key=1c4a139d09e6d072011d125b6d54d4e6
https://restapi.amap.com/v3/place/text?keywords=望月公寓&city=杭州市&offset=20&page=1&extensions=all&key=1c4a139d09e6d072011d125b6d54d4e6

https://restapi.amap.com/v3/place/text?keywords=中海清江华府&offset=20&page=1&extensions=all&key=1c4a139d09e6d072011d125b6d54d4e6



定位精度提高，周边搜索：
杭州：
https://restapi.amap.com/v3/place/around?location=120.08615,30.312431&types=楼宇;商务写字楼;商务住宅,住宅小区,住宿服务,地名地址信息,公司企业,交通设施服务,风景名胜,生活服务场所,购物服务,餐饮服务&key=1c4a139d09e6d072011d125b6d54d4e6

北京：
https://restapi.amap.com/v3/place/around?location=116.378365,40.134003&types=楼宇;商务写字楼;商务住宅,住宿服务,地名地址信息,公司企业,交通设施服务,风景名胜,生活服务场所,购物服务,餐饮服务&key=1c4a139d09e6d072011d125b6d54d4e6


接口调用：
https://restapi.amap.com/v3/geocode/regeo?output=json&location=120.08615,30.312431&key=1c4a139d09e6d072011d125b6d54d4e6&radius=300&extensions=all

https://restapi.amap.com/v3/geocode/regeo?output=json&location=120.08615,30.312431&key=1c4a139d09e6d072011d125b6d54d4e6&radius=300&extensions=all&types=楼宇,商务写字楼,商务住宅,住宅小区,住宿服务,地名地址信息,公司企业,交通设施服务,风景名胜,生活服务场所,购物服务,餐饮服务


https://restapi.amap.com/v3/place/around?output=json&location=120.08615,30.312431&key=1c4a139d09e6d072011d125b6d54d4e6&radius=300&extensions=all&ypes=楼宇,商务写字楼,商务住宅,住宅小区,住宿服务,地名地址信息,公司企业,交通设施服务,风景名胜,生活服务场所,购物服务,餐饮服务

杭州位置：
{
"parent": [],
"distance": [],
"pcode": "330000",
"importance": [],
"biz_ext": {
"cost": "25679.00",
"rating": []
},
"recommend": "3",
"type": "商务住宅;住宅区;住宅小区",
"photos": [
{
"title": "外景图",
"url": "http://store.is.autonavi.com/showpic/89b469fd9e7987ab6158bc419534ac55"
},
{
"title": [],
"url": "http://store.is.autonavi.com/showpic/ae09da836a8c6645334635c87437e2d2"
},
{
"title": "实景图",
"url": "http://store.is.autonavi.com/showpic/0671fd61a9b8e020487c4be95e302976"
}
],
"discount_num": "0",
"gridcode": "4520307710",
"typecode": "120302",
"shopinfo": "0",
"poiweight": [],
"citycode": "0571",
"adname": "西湖区",
"children": [],
"alias": [],
"tel": [],
"id": "B023B06NRM",
"tag": [],
"event": [],
"entr_location": "120.090217,30.309734",
"indoor_map": "0",
"email": [],
"timestamp": "2025-03-22 17:20:43",
"website": [],
"address": "三墩镇紫荆花北路",
"adcode": "330106",
"pname": "浙江省",
"biz_type": [],
"cityname": "杭州市",
"postcode": [],
"match": "0",
"business_area": "三墩",
"indoor_data": {
"cmsid": [],
"truefloor": [],
"cpid": [],
"floor": []
},
"childtype": [],
"exit_location": [],
"name": "望月公寓",
"location": "120.089873,30.311724",
"shopid": [],
"navi_poiid": "H51F021001_1065",
"groupbuy_num": "0"
}