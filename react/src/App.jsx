import MainLayout from "./components/MainLayout/MainLayout.jsx";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Listy: {
            itemPaddingBlock: 4,
            itemPaddingInline: 16,
          },
        },
      }}
    >
      <MainLayout />
    </ConfigProvider>
  )
}

export default App
