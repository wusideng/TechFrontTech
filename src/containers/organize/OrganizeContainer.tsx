import { useEffect } from "react";
import { Grid } from "antd-mobile";
import { UnorderedListOutline } from "antd-mobile-icons";

import BlockA from "@/components/common/BlockA";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
import { useAppDispatch } from "@/store";

const OrganizeContainer = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {}, [dispatch]);

  return (
    <MiddleContentTab>
      <BlockA title={"师门规则说明"}>
        <p>具体师门信息请联系培训老师</p>
      </BlockA>
      <BlockA title={"加入师门"}>
        <p>
          <span style={{ marginRight: "10px" }}>
            <UnorderedListOutline />
          </span>
          成为签约技师
        </p>
        <p>
          <span style={{ marginRight: "10px" }}>
            <UnorderedListOutline />
          </span>
          成立师门只需营业执照
        </p>
        <p>
          <span style={{ marginRight: "10px" }}>
            <UnorderedListOutline />
          </span>
          自有团队5人以上
        </p>
      </BlockA>
      <BlockA title={"师门福利"}>
        <Grid columns={2} gap={8}>
          <Grid.Item>
            <span style={{ marginRight: "10px" }}>
              <UnorderedListOutline />
            </span>
            赠送积分
          </Grid.Item>
          <Grid.Item>
            <span style={{ marginRight: "10px" }}>
              <UnorderedListOutline />
            </span>
            红包多多
          </Grid.Item>
          <Grid.Item>
            <span style={{ marginRight: "10px" }}>
              <UnorderedListOutline />
            </span>
            活动多多
          </Grid.Item>
          <Grid.Item>
            <span style={{ marginRight: "10px" }}>
              <UnorderedListOutline />
            </span>
            奖励多多
          </Grid.Item>
          <Grid.Item>
            <span style={{ marginRight: "10px" }}>
              <UnorderedListOutline />
            </span>
            订单多多
          </Grid.Item>
        </Grid>
      </BlockA>
    </MiddleContentTab>
  );
};

export default OrganizeContainer;
