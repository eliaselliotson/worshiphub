import { Flex, Button } from "antd";
import { HomeOutlined, GithubOutlined, PieChartOutlined } from "@ant-design/icons"

export default function SideMenu() {
  return <>
    <Flex style={{ width: '100%', height: '100%' }} vertical justify="space-between" align="center">
      <div>
        <Button size="large" icon={<PieChartOutlined />} type="text" color="primary" variant="filled" />
      </div>
      <div>
        <Button size="large" icon={<GithubOutlined />} type="text" />
        <Button size="large" icon={<HomeOutlined />} type="text" />
      </div>
    </Flex>
  </>;
}
