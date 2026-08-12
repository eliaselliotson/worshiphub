import { DeleteFilled, PlusOutlined, MoonFilled, SunFilled } from "@ant-design/icons";

/*
<script src="./js/switchPage.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/theme.js"></script>
*/

export default function HomePage() {
  const songs = JSON.parse(localStorage.songs);

  if (songs === undefined) {
    localStorage.songs = "[]";
  }

  return <>
    <div className="d-flex justify-content-between align-items-center">
      <h1>Home</h1>
      <div>
          <button className="btn btn-primary" onclick="toggleTheme()"><MoonFilled /><SunFilled /></button>
          <button className="btn btn-primary" onclick="localStorage['songs']='[]';window.location.reload();"><DeleteFilled /></button>
          <button className="btn btn-primary" onclick="setPage('import.html')"><PlusOutlined /></button>
      </div>
    </div>

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

    <p>
      You can import songs using the 
      <a href="javascript:(function()%7B(async%20function()%20%7B%0A%20%20const%20data%20%3D%20await%20(await%20fetch(window.location)).text()%3B%0A%20%20const%20blob%20%3D%20new%20Blob(%5Bdata%5D%2C%20%7B%20type%3A%20%22text%2Fplain%22%20%7D)%3B%0A%20%20const%20formData%20%3D%20new%20FormData()%3B%0A%20%20%0A%20%20formData.append(%22file%22%2C%20blob)%3B%0A%20%20%0A%20%20const%20downloadLink%20%3D%20(await%20(await%20fetch(%22https%3A%2F%2Fcors-anywhere.herokuapp.com%2Fhttps%3A%2F%2Ftmpfile.link%2Fapi%2Fupload%22%2C%20%7B%0A%20%20%20%20method%3A%20%22POST%22%2C%0A%20%20%20%20body%3A%20formData%2C%0A%20%20%7D)).json()).downloadLink%3B%0A%0A%20%20window.location%20%3D%20%60https%3A%2F%2Feliaselliotson.github.io%2Fworshiphub%2Fimport.html%3Furl%3D%24%7BdownloadLink%7D%60%3B%0A%7D())%3B%7D)()%3B">bookmarklet</a>.
      Be aware that before it will work, you will need to go to the <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="blank">CORS proxy</a> and request access.
    </p>
  </>;
}