// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/store";
// import MiddleContentHeader from "@/components/layout/MiddleContentHeader";

// const PoiMapContainer = () => {
//   const dispatch = useAppDispatch();
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const script = document.createElement("script");

//   useEffect(() => {
//     // 09946946fcd8c998d9a7fbbb6a3bd9f9
//     // 6b9b68701018960b4bae720473dfa444
//     // 引入高德地图 JSAPI
//     script.src = "https://webapi.amap.com/maps?v=1.4.15&key=6b9b68701018960b4bae720473dfa444";
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       setMapLoaded(true); // 标记地图已加载
//       initializeMap(); // 初始化地图
//     };

//     return () => {
//       document.body.removeChild(script); // 清理
//     };
//   }, [dispatch]);

//   const initializeMap = () => {
//     const map = new window.AMap.Map("container", {
//       center: [116.397428, 39.90923],
//       //   zoom: 8,
//       zoom: 13,
//       //   resizeEnable: true,
//     });

//     AMap.service(["AMap.PlaceSearch"], function () {
//       //构造地点查询类
//       var placeSearch = new AMap.PlaceSearch({
//         type: "餐饮服务", // 兴趣点类别
//         pageSize: 5, // 单页显示结果条数
//         pageIndex: 1, // 页码
//         city: "010", // 兴趣点城市
//         citylimit: true, //是否强制限制在设置的城市内搜索
//         map: map, // 展现结果的地图实例
//         panel: "results", // 结果列表将在此容器中进行展示。
//         autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
//       });

//       placeSearch.searchNearBy("", map.getCenter(), 200, function (status, result) {
//         console.log("result:", result, status);
//       });
//     });

//     map.on("moveend", () => {
//       console.log("滑动结束");
//       //   var placeSearch = new AMap.PlaceSearch({
//       //     type: "餐饮服务", // 兴趣点类别
//       //     pageSize: 5, // 单页显示结果条数
//       //     pageIndex: 1, // 页码
//       //     city: "010", // 兴趣点城市
//       //     citylimit: true, //是否强制限制在设置的城市内搜索
//       //     map: map, // 展现结果的地图实例
//       //     panel: "results", // 结果列表将在此容器中进行展示。
//       //     autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
//       //   });

//       placeSearch.searchNearBy("", map.getCenter(), 200, function (status, result) {
//         console.log("result:", result, status);
//       });
//     });
//     // script.onload = () => {
//     //   const mapInstance = new window.AMap.Map("container", {
//     //     center: [116.397428, 39.90923], // 设置初始中心点
//     //     zoom: 13,
//     //   });
//     //   setMap(mapInstance);
//     //   console.log("view");
//     //   const placeSearchInstance = new window.AMap.PlaceSearch({
//     //     map: mapInstance,
//     //     pageSize: 5,
//     //     pageIndex: 1,
//     //     autoFitView: true,
//     //   });
//     //   setPlaceSearch(placeSearchInstance);

//     //   // 搜索中心点的 POI
//     //   searchPOI(mapInstance, placeSearchInstance);
//     // };

//     return () => {
//       document.body.removeChild(script); // 清理
//     };
//   };
//   const searchPOI = (mapInstance, placeSearchInstance) => {
//     const center = mapInstance.getCenter(); // 获取地图中心点
//     console.log("搜索");
//     placeSearchInstance.searchNearBy("餐厅", center, 1000, (status, result) => {
//       if (status === "complete" && result.info === "OK") {
//         const pois = result.poiList;
//         const addressList = pois.map((poi) => `${poi.name} - ${poi.address}`).join("<br>");
//         document.getElementById("results").innerHTML = addressList; // 显示结果
//       } else {
//         console.error("搜索失败", result);
//       }
//     });
//   };
//   return (
//     <MiddleContentHeader title="地图选点">
//       <div id="container" style={{ width: "100%", height: "300px" }}></div>
//       <div id="results" style={{ marginTop: "0px", fontSize: "16px" }}></div>
//     </MiddleContentHeader>
//   );
// };

// export default PoiMapContainer;
