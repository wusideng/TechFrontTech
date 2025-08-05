find . -name '._*' -exec rm {} \;
find . -name "._*" -print
find . -name "._*" -delete
git rm --cached .gitignore

https://poe.com/

# local
dev
http://localhost:8001/devclient/
http://localhost:8001/devtech/
http://localhost:8001/devservice/
prod
http://localhost:8001/prodclient/
http://localhost:8001/prodtech/
http://localhost:8001/prodservice/
backend
http://127.0.0.1:8000/docs

# publish
dev
http://visualstreet.cn/devclient/
http://visualstreet.cn/devtech/
http://visualstreet.cn/devservice/
prod
http://visualstreet.cn/prodclient/
http://visualstreet.cn/prodtech/
http://visualstreet.cn/prodservice/
backend
http://visualstreet.cn:8000/docs

# 发布版本信息配置（Prod）
  # api/apiClient.js
    const apiClient = axios.create({
      // baseURL: process.env.REACT_APP_API_URL,
      baseURL: "http://visualstreet.cn:8000",
      // baseURL: "http://120.26.38.176:8000",
      // baseURL: "http://127.0.0.1:8000",
      timeout: 10000,
    });
  # webpack.config.js
    const baseUrl = 'prodclient' //生产环境
    // const baseUrl = 'devclient'  //开发环境
  # util/config.js
    // export const isDev = true
    export const isDev = false
    // 用于上线测试版本，生成版本
    // export const baseUrl = `devclient`
    export const baseUrl = `prodclient`


GIT 
  代码提交：
    添加所有文件：
    git add .
    执行第一次提交，并添加提交信息：
    git commit -m "初次提交"
    如果你还没有将本地仓库与远程仓库关联，可以使用以下命令添加远程仓库：
    git remote add origin <远程仓库URL>
    如果你想将第一次提交推送到远程仓库，使用以下命令：
    git push -u origin main

  你可以通过以下命令检查哪些文件将被忽略：
  bash
  git check-ignore -v *
  
  git rm --cached .gitignore

高德定位：
https://restapi.amap.com/v3/place/text?keywords=悦生雷迪森维&offset=20&page=1&extensions=all&key=1c4a139d09e6d072011d125b6d54d4e6
https://restapi.amap.com/v3/place/text?keywords=晓月映翠&city=杭州市&offset=20&page=1&extensions=all&key=1c4a139d09e6d072011d125b6d54d4e6

定位精度提高，周边搜索：
杭州：
https://restapi.amap.com/v3/place/around?location=119.726644,30.230220&types=楼宇;商务写字楼;商务住宅,住宿服务,地名地址信息,公司企业,交通设施服务,风景名胜,生活服务场所,购物服务,餐饮服务&key=1c4a139d09e6d072011d125b6d54d4e6
北京：
https://restapi.amap.com/v3/place/around?location=116.378365,40.134003&types=楼宇;商务写字楼;商务住宅,住宿服务,地名地址信息,公司企业,交通设施服务,风景名胜,生活服务场所,购物服务,餐饮服务&key=1c4a139d09e6d072011d125b6d54d4e6

  修改名字，年龄
  上传
  
机器人技师，通过后台服务管理人员。进行派单，推荐派单人员按照；
推荐机器人，机器人上架可人工控制；
