import { useAppSelector } from "@/store";

import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import ProductDetail from "@/components/product/ProductDetail";

const Page = () => {
  const { product } = useAppSelector((state) => state.product); // 从 Redux store 获取状态

  return (
    <MiddleContentHeader title="项目详细" withFooter={false}>
      <ProductDetail product={product} />
    </MiddleContentHeader>
  );
};

export default Page;
