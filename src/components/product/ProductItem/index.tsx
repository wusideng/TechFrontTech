import React from "react";
import { Image, Grid, Card } from "antd-mobile";
import "./style.less";

const ProductItem = ({ product, turnToDetail, enable }) => {
  return (
    <Card
      className={
        "card-style product-item-card " +
        (enable ? "" : "product-item-card-disable")
      }
      key={product.product_id}
      onClick={() => turnToDetail(product.product_id)}
    >
      <div className="title">
        <span>{product.product_name}</span>
        <span className="warning">
          {enable ? "" : " (未培训，请联系本市培训老师)"}
        </span>
      </div>
      <div className="content">
        <Image
          src={product.photo_intro}
          width={100}
          height={100}
          style={{ minWidth: "100px" }}
          fit="cover"
        />
        <Grid columns={1} gap={8} className="content-right">
          <Grid.Item>
            <span className="content-item">产品名称：</span>
            {product.product_name}
          </Grid.Item>
          <Grid.Item>
            <span>服务时间：</span>
            {product.duration}
          </Grid.Item>
          <Grid.Item>
            <span className="content-item">产品价格：</span>
            {product.price_current}
          </Grid.Item>
          <Grid.Item>
            <span className="content-item">按摩部位：</span>
            {product.body_parts}
          </Grid.Item>
        </Grid>
      </div>
    </Card>
  );
};

export default ProductItem;
