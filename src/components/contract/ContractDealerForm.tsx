import ContractFormCommon from "./ContractFormCommon";
import { TechUser } from "@/types/TechUser";

const ContractDealerForm = () => {
  const fields = [
    { name: "tech_name", label: "技师姓名", required: true },
    { name: "tech_card_id", label: "技师身份证号码", required: true },
    { name: "phone", label: "技师联系方式", required: true },
    { name: "dealer_name", label: "商户名称", required: true },
    { name: "dealer_phone", label: "商户联系方式", required: true },
    { name: "dealer_owner_name", label: "商户经营者", required: true },
    { name: "dealer_owner_phone", label: "经营者联系方式", required: true },
  ];

  const getInitialValues = (contractFile: any, user: TechUser) => ({
    tech_name: contractFile?.tech_name || user?.user_nickname,
    tech_card_id: contractFile?.tech_card_id,
    phone: contractFile?.phone || user?.work_phone,
    dealer_name: contractFile?.dealer_name,
    dealer_phone: contractFile?.dealer_phone,
    dealer_owner_name: contractFile?.dealer_owner_name,
    dealer_owner_phone: contractFile?.dealer_owner_phone,
  });

  return (
    <ContractFormCommon
      contractType="dealer"
      contractTypeDisplay="商家入驻合作协议"
      fields={fields}
      getInitialValues={getInitialValues}
    />
  );
};

export default ContractDealerForm;
