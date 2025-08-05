import ContractFormCommon from "./ContractFormCommon";
import { TechUser } from "@/types/TechUser";

const ContractTrainingForm = () => {
  const fields = [
    { name: "dealer_name", label: "商户名称", required: true },
    { name: "dealer_phone", label: "联系方式", required: true },
    { name: "dealer_owner_name", label: "商户经营者", required: true },
    { name: "dealer_owner_phone", label: "经营者联系方式", required: true },
    { name: "dealer_owner_card_id", label: "经营者身份证号码", required: true },
  ];

  const getInitialValues = (contractFile: any, user: TechUser) => ({
    dealer_name: contractFile?.dealer_name,
    dealer_phone: contractFile?.dealer_phone,
    dealer_owner_name: contractFile?.dealer_owner_name,
    dealer_owner_phone: contractFile?.dealer_owner_phone,
    dealer_owner_card_id: contractFile?.dealer_owner_card_id,
  });

  return (
    <ContractFormCommon
      contractType="training"
      contractTypeDisplay="技师培训协议" // 修正这里
      fields={fields}
      getInitialValues={getInitialValues}
    />
  );
};

export default ContractTrainingForm;
