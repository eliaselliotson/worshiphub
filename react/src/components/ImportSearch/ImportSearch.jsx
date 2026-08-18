import { Typography, Space, Input, Button, Spin, Flex, Empty, Listy } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { ImportProvider } from "../../utilities/ImportProvider.js";
import { providers } from "../../common/providers.jsx";

import ImportSearchResult from "./ImportSearchResult.jsx";

export default function ImportSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [directImport, setDirectImport] = useState(false);
  const resultsContainer = useRef();

  // Handle query changes
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      let results;

      setIsLoading(true);

      // Fetch the results for the query
      try {
        results = await ImportProvider.search(query);
      }
      
      // Handle non-abortion errors
      catch (e) {
        if (!e.name === 'AbortError') {
          console.error(e);
        }
      }
      
      // If the request wasn't aborted, then finish handling the request
      finally {
        if (!controller.signal.aborted) {
          setResults(results.results);
          setDirectImport(results.directImport);

          if (results.directImport) {
            setIsEmpty(false);
          } else if (typeof results.results === "object" && results.results.length > 0) {
            setIsEmpty(false);
          } else {
            setIsEmpty(true);
          }

          setIsLoading(false);
        }
      }
    })();

    return () => controller.abort();
  }, [query]);

  const resultsDisplay = directImport ? ([{
    id: 0,
    content: <ImportSearchResult title={`Import from ${providers[directImport].name}`} onSelect={() => onSelect(query)} />,
    }])
  : results.map((e, i) => ({
    id: i,
    content: <ImportSearchResult title={e.title} subtitle={`${e.artist} · ${providers[e.type].name}`} onSelect={() => onSelect(results[i].url)} />,
  }))

  return <>
    <Flex vertical style={{ width: '100%', flex: '1' }}>
      <Input
        size="medium"
        prefix={<SearchOutlined />}
        style={{ width: '100%', marginBottom: 4 }}
        placeholder="Search or enter URL..."
        spellCheck={false}
        onInput={(e) => setQuery(e.target.value)}
      />
      
      <Flex style={{ flex: "1" }} vertical justify="center" align="center" ref={resultsContainer}>
        {!isLoading && isEmpty && <Empty description="No results" image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        {isLoading && <Spin size="large" />}
      </Flex>

      {!isLoading && !isEmpty && <Listy items={resultsDisplay} height={resultsContainer?.current?.offsetHeight || 75} virtual rowKey="id" itemRender={item => item.content} />}
    </Flex>
  </>
}