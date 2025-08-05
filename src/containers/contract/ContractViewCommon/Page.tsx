import { useState } from "react";
import { useAppSelector } from "@/store";
import { Button } from "antd-mobile";
import PdfLoader from "../PdfLazyLoader";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import ContractView from "@/components/contract/ContractView";
import styles from "./style.module.less";
import { useParams } from "react-router-dom";
import { contractPageNumberDict } from "@/util/utils";
import ContractLawForm from "@/components/contract/ContractLawForm";
import ContractDealerForm from "@/components/contract/ContractDealerForm";
import ContractTrainingForm from "@/components/contract/ContractTrainingForm";
import ContractPortraitForm from "@/components/contract/ContractPortraitForm";

export default function ContractViewCommon() {
  const title = "技师合约签订";
  const { contract_type } = useParams();
  const pageNumbers = contractPageNumberDict[contract_type];

  const contractStatus = useAppSelector((state) => state.contract.status);
  const [isEdit, setIsEdit] = useState(false);
  const { loading } = useAppSelector((state) => state.contract);
  const renderFormComponent = () => {
    switch (contract_type) {
      case "techlaw":
        return <ContractLawForm />;
      case "techdealer":
        return <ContractDealerForm />;
      case "techtraining":
        return <ContractTrainingForm />;
      case "techportrait":
        return <ContractPortraitForm />;
    }
    return;
  };
  // 渲染待签订状态（pending, Contract not found）
  const renderPendingStatus = () =>
    isEdit ? (
      <MiddleContentHeader
        title={`${title}(申请)`}
        loading={loading}
        withFooter={false}
        className={styles.wrapper}
      >
        {renderFormComponent()}
      </MiddleContentHeader>
    ) : (
      <MiddleContentHeader
        title={`${title}`}
        withFooter={false}
        className={styles.wrapper}
      >
        <PdfLoader pageNumbers={pageNumbers}></PdfLoader>
        <div className={styles.button_wrapper}>
          <Button block color="primary" onClick={() => setIsEdit(true)}>
            签订合约
          </Button>
        </div>
      </MiddleContentHeader>
    );

  // 渲染已申请/已同意状态（apply, approve）
  const renderApprovedStatus = () => (
    <MiddleContentHeader
      title={title}
      withFooter={false}
      className={styles.wrapper}
    >
      <ContractView />
    </MiddleContentHeader>
  );

  // 渲染已拒绝状态（reject）
  const renderRejectedStatus = () =>
    isEdit ? (
      <MiddleContentHeader
        title={`${title}（再申请）`}
        withFooter={false}
        className={styles.wrapper}
      >
        {renderFormComponent()}
      </MiddleContentHeader>
    ) : (
      <MiddleContentHeader
        title={`${title}（拒绝）`}
        withFooter={false}
        className={styles.wrapper}
      >
        <ContractView reSubmitButton={true} setIsEdit={setIsEdit} />
      </MiddleContentHeader>
    );
  if (["pending", "Contract not found"].includes(contractStatus)) {
    return renderPendingStatus();
  } else if (["apply", "approve"].includes(contractStatus)) {
    return renderApprovedStatus();
  } else if (["reject"].includes(contractStatus)) {
    return renderRejectedStatus();
  }
}
