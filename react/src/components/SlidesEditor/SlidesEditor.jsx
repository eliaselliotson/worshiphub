import { Splitter, Flex, Button } from "antd";
import ImportSearch from "../ImportSearch/ImportSearch.jsx";
import UltimateGuitarEditor from "../UltimateGuitarEditor/UltimateGuitarEditor.jsx";

const Desc = props => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    {props.text}
  </Flex>
);

export default function SlidesEditor() {
  return <>
    <Splitter style={{ height: 1100 }}>
      <Splitter.Panel>
        <Splitter orientation="vertical">
          <Splitter.Panel style={{ padding: 24 }}>
            <Desc text="Top" />
          </Splitter.Panel>
          <Splitter.Panel style={{ display: "flex", padding: 24 }}>
            <ImportSearch onSelect={async e => console.log(await ImportProvider.import(e))} />
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
      <Splitter.Panel style={{ padding: 24 }}>
        <UltimateGuitarEditor />
      </Splitter.Panel>
    </Splitter>
  </>;
}
