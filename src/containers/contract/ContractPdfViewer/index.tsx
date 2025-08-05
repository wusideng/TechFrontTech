import React, { useState, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";
import "core-js/stable";
import "regenerator-runtime/runtime";
import styles from "./style.module.less";
// 设置worker
//这行代码不能删，否则该PDF文件不会被打包
import contractPdf from "@/assets/file/技师端合约.pdf"; // eslint-disable-line no-unused-vars
//这行代码不能删，否则该PDF文件不会被打包
import pdfWorker from "@/assets/file/pdf.worker.min.mjs"; // eslint-disable-line no-unused-vars
import { baseUrl, staticUrl } from "@/util/config";
//这行代码也不能删
pdfWorker;
contractPdf;
const env_is_dev =
  window.location.origin.includes("localhost") ||
  window.location.origin.includes("127.0.0.1");
pdfjs.GlobalWorkerOptions.workerSrc = env_is_dev
  ? `${window.location.origin}/${baseUrl}/assets/file/pdf.worker.min.mjs`
  : `${staticUrl}/${baseUrl}/assets/file/pdf.worker.min.mjs`;
// PDF到HTML转换组件
const ContractPdfViewer = ({ pageNumbers = [] }) => {
  const pdfFile = env_is_dev
    ? `${window.location.origin}/${baseUrl}/assets/file/技师端合约.pdf`
    : `${staticUrl}/${baseUrl}/assets/file/技师端合约.pdf`;
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const convertPdfToHtml = async () => {
      try {
        setIsLoading(true);

        // 加载PDF文档
        console.log("pdfFile", pdfFile);
        const loadingTask = pdfjs.getDocument(pdfFile);
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);
        console.log("numPages:", pdf.numPages);
        let fullHtml =
          '<div class="pdf-content" style="font-size: 14px; line-height: 1.6;">';

        // 确定要处理的页面
        let pagesToProcess = [];
        if (pageNumbers && pageNumbers.length > 0) {
          // 只处理指定的页面
          pagesToProcess = pageNumbers.filter(
            (num) => num >= 1 && num <= pdf.numPages
          );
        } else {
          // 处理所有页面
          pagesToProcess = Array.from(
            { length: pdf.numPages },
            (_, i) => i + 1
          );
        }

        console.log("准备处理以下页面:", pagesToProcess);

        // 处理每一页
        for (const pageNum of pagesToProcess) {
          console.log(`处理第 ${pageNum} 页`);
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();

          fullHtml += `<div class="pdf-page" data-page="${pageNum}" style="margin-bottom: 20px;">`;

          // 按位置组织文本项
          const textByPosition = {};

          // 获取页面视口信息，用于判断行距
          const viewport = page.getViewport({ scale: 1.0 });
          const lineHeightThreshold = viewport.height * 0.015; // 估计行距为页面高度的1.5%

          // 处理文本项
          for (const item of textContent.items) {
            //@ts-ignore
            const { str, transform } = item;

            // 提取位置信息，保留更多精度以区分接近的行
            const y = transform[5];

            // 查找是否有接近的y坐标 (在行距阈值内)
            let foundY = null;
            for (const existingY in textByPosition) {
              if (Math.abs(parseFloat(existingY) - y) < lineHeightThreshold) {
                foundY = existingY;
                break;
              }
            }

            // 使用现有行或创建新行
            const yKey = foundY || y.toString();
            if (!textByPosition[yKey]) {
              textByPosition[yKey] = [];
            }

            textByPosition[yKey].push({
              text: str,
              x: transform[4],
            });
          }

          // 将各行按y坐标排序（从大到小）
          const sortedYPositions = Object.keys(textByPosition)
            .map(Number)
            .sort((a, b) => b - a);

          // 遍历各行，生成段落
          for (const y of sortedYPositions) {
            // 在每行内按x坐标排序（从左到右）
            const lineItems = textByPosition[y].sort((a, b) => a.x - b.x);

            // 构建一行文本，避免词语间多余的空格
            let lineText = "";
            let prevX = null;
            const spaceThreshold = 5; // 假设单词间距阈值

            for (let i = 0; i < lineItems.length; i++) {
              const item = lineItems[i];

              // 如果不是第一项且间距足够大，添加空格
              if (prevX !== null && item.x - prevX > spaceThreshold) {
                lineText += " ";
              }

              lineText += item.text;
              prevX = item.x + item.text.length * 5; // 估计文本宽度
            }

            // 只添加非空行，使用<div>而不是<p>以避免额外的段落间距
            if (lineText.trim()) {
              fullHtml += `<div style="margin-bottom: 3px;">${lineText}</div>`;
            }
          }

          fullHtml += "</div>";
        }

        fullHtml += "</div>";
        setHtmlContent(fullHtml);
        setIsLoading(false);
      } catch (err) {
        console.error("转换PDF时出错:", err);
        setError("转换失败: " + err.message);
        setIsLoading(false);
      }
    };

    convertPdfToHtml();
  }, [pdfFile, pageNumbers]);

  if (isLoading)
    return (
      <div style={{ padding: "20px", textAlign: "center", flex: 1 }}>
        <div>正在转换PDF...</div>
      </div>
    );

  if (error)
    return (
      <div
        style={{
          color: "red",
          padding: "15px",
          border: "1px solid #ffdddd",
          borderRadius: "4px",
          margin: "10px 0",
          flex: 1,
        }}
      >
        <div>转换出错: {error}</div>
      </div>
    );

  return (
    <div className={styles.wrapper}>
      <div className={styles.pdf_html_container}>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
};

export default ContractPdfViewer;
