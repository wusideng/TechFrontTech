import { useEffect, useState } from "react";
import Page from "./Page";
import { useAppDispatch } from "@/store";
import { getProductDetail } from "@/store/slices/productSlice";
import { useParams } from "react-router-dom";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";

const Layout = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const init = async () => {
      await dispatch(getProductDetail(parseInt(id)));
      setLoading(false);
    };
    init();
  }, []);
  if (loading) {
    return (
      <MiddleContentHeader withFooter={false} title="项目详细">
        <></>
      </MiddleContentHeader>
    );
  }
  return <Page />;
};

export default Layout;
