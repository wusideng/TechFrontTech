import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { baseUrl } from "@/util/config";

import WeChatCallback from "@/containers/Login/WeChatCallback";
import WeChatLogin from "@/containers/Login/WeChatLogin";
// import PhoneLoginContainer from "@/containers/Login/PhoneLogin";
import VoiceEGContainer from "@/containers/Login/VoiceEGContainer";

import HomeContainer from "@/containers/Home/HomeContainer";
// import AmapPoiListContainer from "@/containers/Home/AmapPoiListContainer";
import JoinUsContainer from "@/containers/Home/JoinUsContainer";
import ProductDetailContainer from "@/containers/Home/ProductDetailContainer";
import OrganizeContainer from "@/containers/organize/OrganizeContainer";
import OrderContainer from "@/containers/order/OrderContainer";
import OrderDetailContainer from "@/containers/order/OrderDetailContainer";
import OrderDetailDepartContainer from "@/containers/order/OrderDetailDepartContainer";

import UserContainer from "@/containers/User/Usercontainer";
import ApplyStatusContainer from "@/containers/User/ApplyStatusContainer";
import WorkPhotoContainer from "@/containers/User/WorkPhotoContainer";
import LifePhotoContainer from "@/containers/User/LifePhotoContainer";
import WorkTimeContainer from "@/containers/User/WorkTimeContainer";
import HistoricalLocalContainer from "@/containers/User/HistoricalLocalContainer";
// import PoiMapByTxtContainer from "@/containers/User/PoiMapByTxtContainer";
import CertificateContainer from "@/containers/User/CertificateContainer";

import SignContractContainer from "@/containers/contract/SignContractContainer";
import Loading from "@/components/common/Loading";
import ApplyStatusDetailContainer from "@/containers/User/ApplyStatusDetailContainer";
// import AddressSelectContainer from "@/containers/User/AddressSelectContainer";
import AddressManagementContainer from "@/containers/User/AddressManagement/AddressManagementContainer";
import AddressSelectContainer from "@/containers/User/AddressManagement/AddressSelectContainer";
import ContractViewCommon from "@/containers/contract/ContractViewCommon";
import BenefitDetailContainer from "@/containers/User/BenefitDetailContainer";
import PrivacyAgreementContainer from "@/containers/Agreements/PrivacyAgreement";
import SettingsContainer from "@/containers/User/SettingsContainer";

const RouterComponent = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={`/${baseUrl}/login`} element={<WeChatLogin />} />
        {/* <Route
          path={`/${baseUrl}/phoneLogin`}
          element={<PhoneLoginContainer />}
        /> */}
        <Route path={`/${baseUrl}/callback`} element={<WeChatCallback />} />
        <Route
          path={`/${baseUrl}/agreement/privacy`}
          element={<PrivacyAgreementContainer />}
        />
        <Route path={`/${baseUrl}/joinUs`} element={<JoinUsContainer />} />

        <Route path={`/${baseUrl}/voiceDemo`} element={<VoiceEGContainer />} />
        <Route path={`/${baseUrl}/home`} element={<HomeContainer />} />
        {/* <Route
          
          path={`/${baseUrl}/amapAround`}
          element={AmapPoiListContainer}
        /> */}
        <Route
          path={`/${baseUrl}/product/:id`}
          element={<ProductDetailContainer />}
        />
        <Route path={`/${baseUrl}/order`} element={<OrderContainer />} />
        <Route
          path={`/${baseUrl}/order/:id`}
          element={<OrderDetailContainer />}
        />
        <Route
          path={`/${baseUrl}/order/:id/departBegin`}
          element={<OrderDetailDepartContainer />}
        />
        <Route
          path={`/${baseUrl}/order/:id/departEnd`}
          element={<OrderDetailDepartContainer />}
        />
        {/* <Route path={`/${baseUrl}/homegate`} element={OrganizeContainer} /> */}

        <Route path={`/${baseUrl}/user`} element={<UserContainer />} />
        <Route
          path={`/${baseUrl}/user/apply`}
          element={<ApplyStatusContainer />}
        />
        <Route
          path={`/${baseUrl}/user/apply/detail/:id`}
          element={<ApplyStatusDetailContainer />}
        />
        <Route
          path={`/${baseUrl}/user/workphoto`}
          element={<WorkPhotoContainer />}
        />
        <Route
          path={`/${baseUrl}/user/lifephoto`}
          element={<LifePhotoContainer />}
        />
        <Route
          path={`/${baseUrl}/user/certificate`}
          element={<CertificateContainer />}
        />

        <Route
          path={`/${baseUrl}/user/worktime`}
          element={<WorkTimeContainer />}
        />
        <Route
          path={`/${baseUrl}/user/historyLocal`}
          element={<HistoricalLocalContainer />}
        />
        <Route
          path={`/${baseUrl}/user/address/add`}
          element={<AddressSelectContainer />}
        />
        <Route
          path={`/${baseUrl}/user/address/edit/:addressId`}
          element={<AddressSelectContainer />}
        />
        <Route
          path={`/${baseUrl}/user/addressmanagement`}
          element={<AddressManagementContainer />}
        />
        <Route
          path={`/${baseUrl}/user/benefit_detail_info`}
          element={<BenefitDetailContainer />}
        />

        {/* <Route
          path={`/${baseUrl}/user/portraitContract`}
          element={<TechPortraitContractContainer />}
        />
        <Route
          path={`/${baseUrl}/user/lawContract`}
          element={<TechLawContractContainer />}
        />
        <Route
          path={`/${baseUrl}/user/trainingContract`}
          element={<TechTrainingContractContainer />}
        />
        <Route
          path={`/${baseUrl}/user/dealerContract`}
          element={<TechDealerContractContainer />}
        /> */}
        <Route
          path={`/${baseUrl}/user/signaContract`}
          element={<SignContractContainer />}
        />
        <Route
          path={`/${baseUrl}/user/settings`}
          element={<SettingsContainer />}
        />
        <Route
          path={`/${baseUrl}/user/contract/:contract_type`}
          element={<ContractViewCommon />}
        />
        <Route path={`/${baseUrl}/`} element={<HomeContainer />}>
          {/* <AmapPoiListContainer /> */}
        </Route>
        <Route path="*">NOMATCH</Route>
      </Routes>
    </Suspense>
  );
};

export default RouterComponent;
