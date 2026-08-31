import { demo } from "./demo.js";
import { Button, Space, Input, Typography, Flex } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

function SongLyric({ text, chords }) {
  return <Text style={{ position: "relative" }}>
    {chords.map(e => <Text color="primary" style={{ width: 'auto', position: "absolute", left: e.pos * 10 }} keyboard>{e.text}</Text>)}
    {text}
    </Text>
}

export default function UltimateGuitarEditor() {
  const tab = demo;

  return <>
    <Flex vertical align="center">
      <Title style={{ marginBottom: 0 }} level={3}><a href={tab.src}>{tab.tabName}</a> #{tab.tabId}</Title>
      <Text type="secondary">By <Link href={tab.artistUrl} target="blank">{tab.artist}</Link> · Uploaded by <Link href={tab.uploaderUrl} target="blank">{tab.uploader}</Link></Text>
    </Flex>
    
    <Space.Compact>
      <Button icon={<MinusOutlined />}></Button>
      <Input style={{ textAlign: "center" }} defaultValue={tab.key || "C"} />
      <Button icon={<PlusOutlined />}></Button>
    </Space.Compact>
    {tab.content.map(e => <p>{e.map(f => <SongLyric text={f.text} chords={f.chords} />)}</p>)}
  </>
}
