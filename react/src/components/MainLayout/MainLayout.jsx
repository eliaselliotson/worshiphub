import { Flex, Card, Splitter, Typography, Layout, Menu, Button } from "antd";
const { Header, Footer, Sider, Content } = Layout;

import SideMenu from "../SideMenu/SideMenu.jsx";
import TopMenu from "../TopMenu/TopMenu.jsx";
import SlidesEditor from "../SlidesEditor/SlidesEditor.jsx";

export default function MainLayout() {
  const gap = [8, 4];

  return <>
    <Layout style={{ gap: gap[0], padding: 12, width: '100vw', height: '100vh' }}>
      <Sider width="5em" style={{ padding: 0, background: 'none' }}>
        <Card styles={{ root: { width: '100%', height: '100%' }, body: { width: '100%', height: '100%' } }} size="small">
          <SideMenu />
        </Card>
      </Sider>
      <Layout style={{ gap: gap[1] }}>
        <Header style={{ height: '3em', padding: 0, background: 'none' }}>
          <Card size="small" styles={{ body: { padding: 4 }, root: { width: '100%', height: '100%' } }}>
            <TopMenu />
          </Card>
        </Header>
        <Content style={{ padding: 0 }}>
          <Card size="small" style={{ width: '100%', height: '100%' }}>
            <SlidesEditor />
          </Card>
        </Content>
      </Layout>
    </Layout>
  </>;
}
