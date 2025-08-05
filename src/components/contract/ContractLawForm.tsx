// ContractLawForm.tsx
import React from "react";
import ContractFormCommon from "./ContractFormCommon";
import { TechUser } from "@/types/TechUser";

const ContractLawForm = () => {
  const fields = [
    { name: "tech_name", label: "姓名", required: true },
    { name: "tech_card_id", label: "身份证号码", required: true },
    { name: "phone", label: "联系方式", required: true },
  ];

  const getInitialValues = (contractFile: any, user: TechUser) => ({
    tech_name: contractFile?.tech_name || user?.user_nickname,
    tech_card_id: contractFile?.tech_card_id,
    phone: contractFile?.phone || user?.work_phone,
  });

  return (
    <ContractFormCommon
      contractType="law"
      contractTypeDisplay="遵纪守法承诺书"
      fields={fields}
      getInitialValues={getInitialValues}
    />
  );
};

export default ContractLawForm;
