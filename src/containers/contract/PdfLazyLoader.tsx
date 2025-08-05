import { lazy, Suspense } from "react";

const ContractPdfViewer = lazy(() => import("./ContractPdfViewer"));

const PdfLoader = ({ pageNumbers = [1] }) => {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "20px", textAlign: "center", flex: 1 }}>
          <div>正在加载合约模版</div>
        </div>
      }
    >
      <ContractPdfViewer pageNumbers={pageNumbers} />
    </Suspense>
  );
};

export default PdfLoader;
