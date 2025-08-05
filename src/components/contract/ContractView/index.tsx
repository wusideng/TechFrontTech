import { useEffect, useRef } from "react";
import { Button, Space } from "antd-mobile";
import { SearchOutline } from "antd-mobile-icons";
import { getContractStatus } from "@/util/utils";
import * as pdfjs from "pdfjs-dist";
import "core-js/stable";
import "regenerator-runtime/runtime";
//@ts-ignore
import pdfWorker from "@/assets/file/pdf.worker.min.mjs"; // eslint-disable-line no-unused-vars
import { baseUrl, staticUrl } from "@/util/config";
import { useAppSelector } from "@/store";
import styles from "./style.module.less";
//不要删除这行
pdfWorker;
const env_is_dev =
  window.location.origin.includes("localhost") ||
  window.location.origin.includes("127.0.0.1");
pdfjs.GlobalWorkerOptions.workerSrc = env_is_dev
  ? `${window.location.origin}/${baseUrl}/assets/file/pdf.worker.min.mjs`
  : `${staticUrl}/${baseUrl}/assets/file/pdf.worker.min.mjs`;

const ContractView = ({ reSubmitButton = false, setIsEdit = null }) => {
  const pdfContainer = useRef(null);
  const contractStatus = useAppSelector((state) => state.contract.status); //审核进度
  const contractFile = useAppSelector((state) => state.contract.contractFile); //审核文件
  useEffect(() => {
    if (contractFile?.contract_file) {
      initPdf(contractFile?.contract_file, 0.5);
    }
  }, [contractFile?.contract_file]);

  const initPdf = async (contract_file, scale) => {
    const loadingTask = pdfjs.getDocument(contract_file);
    pdfContainer.current.innerHTML = ""; // 清理容器

    try {
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      // 顺序渲染每一页
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        await renderPage(pdf, pageNum, scale);
      }
    } catch (error) {
      console.error("Error loading PDF: ", error);
    }
  };

  const renderPage = async (pdf, pageNum, scale) => {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext("2d");

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    // 渲染 PDF 页面
    await page.render(renderContext).promise;

    // 将 canvas 添加到容器中
    pdfContainer.current.appendChild(canvas);
  };

  const isWeChatBrowser = () => {
    return /micromessenger/i.test(navigator.userAgent);
  };

  const handleDownload = async () => {
    if (!contractFile?.contract_file) return;

    if (isWeChatBrowser()) {
      // 微信环境：提示用户在浏览器中打开
      const userConfirm = confirm(
        '检测到您在微信中打开，建议在浏览器中下载文件。\n点击"确定"复制链接，然后在浏览器中打开。'
      );

      if (userConfirm) {
        try {
          await navigator.clipboard.writeText(contractFile.contract_file);
          alert("链接已复制！请在浏览器中粘贴打开");
        } catch (err) {
          prompt("请复制以下链接在浏览器中打开：", contractFile.contract_file);
        }
      }
    } else {
      // 正常浏览器环境：使用原来的下载逻辑
      try {
        const response = await fetch(contractFile.contract_file);
        if (!response.ok) {
          throw new Error("文件下载失败");
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${contractFile.contract_type}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("下载失败:", error);
        // 降级到直接打开
        window.open(contractFile.contract_file, "_blank");
      }
    }
  };
  const statusDesc = () => {
    if (contractFile?.status == "apply") return null;
    if (
      contractFile?.status_desc !== null &&
      contractFile?.status_desc !== undefined &&
      contractFile?.status_desc !== ""
    )
      return (
        <div style={{ color: "#ff0000", marginLeft: 12 }}>
          {contractFile?.status_desc}
        </div>
      );
  };

  return (
    <div className={styles.wrapper}>
      <h3 style={{ marginLeft: 12 }}>
        审核进度: {getContractStatus(contractStatus)}
      </h3>
      {statusDesc()}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size="mini"
          onClick={() => {
            initPdf(contractFile?.contract_file, 1); // 放大
          }}
        >
          <Space>
            <SearchOutline fontSize={22} color="var(--adm-color-primary)" />
            <span>放大</span>
          </Space>
        </Button>
        <Button
          size="mini"
          onClick={() => {
            initPdf(contractFile?.contract_file, 0.5); // 缩小
          }}
        >
          <Space>
            <SearchOutline fontSize={22} color="var(--adm-color-weak)" />
            <span>缩小</span>
          </Space>
        </Button>
      </div>

      {contractFile?.contract_file ? (
        <div
          id="pdf-container"
          ref={pdfContainer}
          style={{ textAlign: "center", flex: 1, overflow: "auto" }}
        ></div>
      ) : (
        <p>合约文件正在生成中...</p>
      )}
      <div className={styles.button_wrapper}>
        <Button color="primary" fill="outline" block onClick={handleDownload}>
          下载合约文件
        </Button>
        {reSubmitButton && (
          <Button block onClick={() => setIsEdit(true)} color="primary">
            再次提交合约
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContractView;
