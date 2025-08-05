import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import ContractForm from "@/components/contract/ContractPortraitForm";
import ContractView from "@/components/contract/ContractView";
import { fetchContractStatus } from "@/store/slices/contractSlice";
// 示例组件
const ContractContainer = () => {
  const dispatch = useAppDispatch();
  const contractStatus = useAppSelector((state) => state.contract.status);
  const { user } = useAppSelector((state) => state.user); // 确保路径正确

  useEffect(() => {
    dispatch(
      fetchContractStatus({
        openid: user.openid,
        contract_type: "肖像权许可协议",
      })
    );
  }, [dispatch]);
  return (
    <MiddleContentHeader title={"技师合约签订"} withFooter={false}>
      {["pending", "Contract not found"].includes(contractStatus) ? (
        <ContractForm />
      ) : (
        <ContractView />
      )}
    </MiddleContentHeader>
  );
};
// {
//   "Contract not found":"合约不存在",  展示模版，提供签约按钮
//   "pending":"默认值", 展示模版，提供签约按钮
//   "apply":"已申请",  展示申请表单
//   "approve":"已同意",  展示申请表单
//   "reject":"已拒绝", 展示申请表单，提供重新申请按钮
// }
export default ContractContainer;
