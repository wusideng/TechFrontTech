// 在src目录下创建types/modules.d.ts文件
declare module "*.less" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "*.pdf" {
  const content: any;
  export default content;
}
declare module "@/assets/file/pdf.worker.min.mjs" {
  const pdfWorker: any;
  export default pdfWorker;
}
