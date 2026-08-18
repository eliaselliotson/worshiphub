import { Flex, Button } from "antd";

export default function TopMenu() {
  return <>
    <Flex style={{ width: '100%', height: '100%' }} justify="space-between" align="center">
      <div>
        <Button size="medium" type="text">File</Button>
        <Button size="medium" type="text">Edit</Button>
        <Button size="medium" type="text">Help</Button>
      </div>
      <div></div>
    </Flex>
  </>;
}
