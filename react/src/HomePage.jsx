import { Button, Typography, Flex, Table, Card } from "antd";
import { DeleteFilled, PlusOutlined, MoonFilled, SunFilled } from "@ant-design/icons";
import ImportSearch from "./components/ImportSearch/ImportSearch.jsx";
import { ImportProvider } from "./utilities/ImportProvider.js";
import UltimateGuitarEditor from "./components/UltimateGuitarEditor/UltimateGuitarEditor.jsx";

const { Title } = Typography;

/*
<script src="./js/switchPage.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/theme.js"></script>
*/

// {songs.length > 0 ? 
//         songs.map((e) => {
//           const myUrlWithParams = new URL(window.location.origin + getPageUrl("slides/"));
//           myUrlWithParams.searchParams.append("i", i);
//           myUrlWithParams.searchParams.append("chords", true);
//           myUrlWithParams.searchParams.append("b", 0.75);

//           return (
//             <tr>
//               <td><a href={myUrlWithParams} target="_blank">{e.meta.name}</a></td>
//               <td>{e.meta.artist}</td>
//               <td>{(JSON.stringify(e).length / 1000).toFixed(1)} KB</td>
//             </tr>
//         )}
//       ) : undefined}

const dataSource = [
  {
    key: '1',
    title: 'Mike',
    size: 32,
    artist: '10 Downing Street',
  },
  {
    key: '2',
    title: 'John',
    size: 42,
    artist: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Artist',
    dataIndex: 'artist',
    key: 'artist',
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
  },
];

export default function HomePage() {
  const songs = JSON.parse(localStorage.songs);

  if (songs === undefined) {
    localStorage.songs = "[]";
  }

  return <>
    <Flex justify="space-between" align="center">
      <Title style={{ margin: 0 }}>Home</Title>
      <Flex gap={4} align="center">
          <Button size="large" type="primary" shape="circle" icon={<><MoonFilled /><SunFilled /></>} onClick={null /* toggleTheme() */} />
          <Button size="large" type="primary" shape="circle" icon={<DeleteFilled />} onClick={null /* onclick="localStorage['songs']='[]';window.location.reload(); */} />
          <Button size="large" type="primary" shape="circle" icon={<PlusOutlined />} onClick={null /* setPage('import.html') */} />
      </Flex>
    </Flex>

    <Table dataSource={dataSource} columns={columns} />

    <table id="songs" className="table table-striped border table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Size</th>
        </tr>
      </thead>

      {songs.length > 0 ? 
        songs.map((e) => {
          const myUrlWithParams = new URL(window.location.origin + getPageUrl("slides/"));
          myUrlWithParams.searchParams.append("i", i);
          myUrlWithParams.searchParams.append("chords", true);
          myUrlWithParams.searchParams.append("b", 0.75);

          return (
            <tr>
              <td><a href={myUrlWithParams} target="_blank">{e.meta.name}</a></td>
              <td>{e.meta.artist}</td>
              <td>{(JSON.stringify(e).length / 1000).toFixed(1)} KB</td>
            </tr>
        )}
      ) : undefined}

      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td>{(localStorage.songs.length / 1024).toFixed(1)} KB</td>
        </tr>
      </tfoot>
    </table>

    <Card size="small" styles={{ root: { width: 300, height: 400 }, body: { height: '100%', display: 'flex', flexDirection: 'column' }}}>
      <ImportSearch onSelect={async e => console.log(await ImportProvider.import(e))} />
    </Card>

    <Card size="small" styles={{ root: { width: 600, height: 400 }, body: { height: '100%', display: 'flex', flexDirection: 'column' }}}>
      <UltimateGuitarEditor />
    </Card>
  </>;
}