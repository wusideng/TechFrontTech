import { Card, Image } from "antd-mobile";
import "./style.less";

const ProductDetail = ({ product }) => {
  return (
    <div className="product-detail-wrapper">
      <div className="product_detail_line_1" style={{ background: "#fff" }}>
        {/* <span className="vertical-text" style={{ paddingRight: "15px" }}>
          {product.product_name}
        </span> */}
        <Image src={product.photo_intro} height={200} />
        {/* <span
          className="vertical-text"
          style={{ paddingLeft: "15px" }}
        >{`项目时间${product.duration}`}</span> */}
      </div>
      <Card
        title={`${product.product_name}项目介绍`}
        className="card-style card-no-title-border-bottom"
      >
        <div className="product_detail_line_2">
          <span className="price">¥：{product.price_current}</span>
          <span className="time">{product.duration}</span>
        </div>
        <div>{product.introduction}</div>
      </Card>
      <Card title="按摩部位" className="card-style card-no-title-border-bottom">
        <div>{product.body_parts}</div>
      </Card>
      <Card title="包含物料" className="card-style card-no-title-border-bottom">
        <div>{product.consumables}</div>
      </Card>
      <Card title="禁忌说明" className="card-style card-no-title-border-bottom">
        <p>
          （1）皮肤病，皮肤破损者(如瘟瘆，疤瘆，脓肿蜂窝组织炎，烧伤，烫伤者)禁用。
        </p>
        <p>（2）骨折复位稳定，开放性的骨折人体，内有金属固定物禁用。</p>
        <p>（3）感染性疾病，如骨结核，骨髓炎禁用。</p>
        <p>
          （4）内科危重的病人，如严重的心脏病，各种恶性肿瘤，急腹症，急性阑尾炎，宫外孕，胰腺炎等禁用。
        </p>
        <p>（5）过饱过饥(饭后半小时不宜做按摩)。</p>
      </Card>
      <Card
        title="为什么选择我们"
        className="card-style card-no-title-border-bottom"
      >
        {/* <div className="product_detail_line_3">
          <Image src={product.photo_intro} height={300} fit="fill" />
        </div> */}
        <p className="productWarnTitle">足不出户随叫随到</p>
        <p className="productWarnContent">
          无论家里、酒店、公司、公园…都可享受星级按摩服务
        </p>
        <p className="productWarnTitle">众多商户24h在线</p>
        <p className="productWarnContent">可在线自由选择商户提供按座服务</p>
        <p className="productWarnTitle">正规专业，用心服务</p>
        <p className="productWarnContent">
          对每位商户的按摩手法及操作流程进行专业培训、严格考核，为您提供安全、正规、专业、健康的优质按摩服务！
        </p>
      </Card>
    </div>
  );
};

export default ProductDetail;
