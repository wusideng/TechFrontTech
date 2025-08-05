import { useAppDispatch, useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "antd-mobile";
import { baseUrl } from "@/util/config";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
import ProductItem from "@/components/product/ProductItem";
import styles from "./style.module.less";
import { DownOutline } from "antd-mobile-icons";

const Page = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user); // 确保路径正确
  const { products, techProducts } = useAppSelector((state) => state.product);
  const { defaultTechAddress } = useAppSelector((state) => state.address);

  // 跳转到项目详细
  function turnToDetailHandler(id) {
    navigate(`/${baseUrl}/product/${id}`);
  }

  // 跳转到加入我们
  function turnToJoinUsHandler() {
    navigate(`/${baseUrl}/joinUs`);
  }
  return (
    <MiddleContentTab className={styles.wrapper}>
      {(user?.joinStatus == "unapplied" || user?.joinStatus == "reject") && (
        <div className={styles.apply_wrapper}>
          <Button block color="primary" onClick={turnToJoinUsHandler}>
            申请上线
          </Button>
        </div>
      )}
      <Card onClick={() => navigate(`/${baseUrl}/user/addressmanagement`)}>
        <div className={styles.current_location_wrapper}>
          <div className={styles.current_location}>
            <DownOutline />
            <span>当前接单位置：</span>
            <span>
              {defaultTechAddress
                ? defaultTechAddress.region
                : "暂无（请保持定位开启）"}
            </span>
          </div>
          <div style={{ color: "var(--adm-color-weak)", marginLeft: 10 }}>
            点击修改接单位置
          </div>
        </div>
      </Card>
      <div className="list-title" style={{ paddingLeft: 10 }}>
        全部项目
      </div>
      {
        // 标记相同的对象
        products.map((product) => {
          const enable = techProducts.some(
            (obj) => obj.product_id === product.product_id
          );
          return (
            <ProductItem
              key={product.product_id}
              product={product}
              enable={enable || !user?.openid}
              turnToDetail={turnToDetailHandler}
            />
          );
        })
      }
    </MiddleContentTab>
  );
};

export default Page;
