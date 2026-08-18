import { Typography, Flex, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function ImportSearchResult({ title, subtitle, onSelect }) {
  return (
    <Flex justify="space-between" align="center" gap="small">
      <Flex vertical justify="center" align="start">
        <Text strong>{title}</Text>
        {subtitle && <Text style={{ fontSize: 12 }} type="secondary">{subtitle}</Text>}
      </Flex>
      <Button onClick={onSelect} style={{ aspectRatio: "1 / 1" }} icon={<RightOutlined />} />
    </Flex>
  );
}