import ContractFormCommon from "./ContractFormCommon";
import { TechUser } from "@/types/TechUser";

const ContractPortraitForm = () => {
  const fields = [
    { name: "tech_name", label: "姓名", required: true },
    { name: "tech_sex", label: "性别", required: true },
    { name: "phone", label: "联系方式", required: true },
    {
      name: "photoFront",
      label: "身份证正面",
      type: "imageUpload" as const,
      uploadType: "front" as const,
    },
    {
      name: "photoBack",
      label: "身份证反面",
      type: "imageUpload" as const,
      uploadType: "back" as const,
    },
  ];

  const getInitialValues = (contractFile: any, user: TechUser) => ({
    tech_name: contractFile?.tech_name || user?.user_nickname,
    tech_sex: contractFile?.tech_sex || user?.user_sex,
    phone: contractFile?.phone || user?.user_phone,
  });

  return (
    <ContractFormCommon
      contractType="portrait"
      contractTypeDisplay="肖像权许可协议"
      requiredFiles={["photoFront", "photoBack"]}
      fields={fields}
      getInitialValues={getInitialValues}
    />
  );
};

export default ContractPortraitForm;
