import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

/**  
{{baseUrl}}/o/headless-delivery/v1.0/structured-contents/:contentStructureId
{{baseUrl}}/o/headless-delivery/v1.0/content-structures/:contentStructureId/structured-contents
*/

const BASE_URL = 'http://localhost:8080';

function App() {

  const [item, setItem] = useState(null);

  const request_token = (client_id = 'id-45cd9826-a3e5-a3b3-a532-fd24c809d4b', client_secret = 'secret-aa87bb42-2232-229c-45d1-6ce0d9c551') => {

    const url = `${BASE_URL}/o/oauth2/token?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`;
    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const request_options = {
      method: 'POST',
      headers: headers
    };

    return fetch(url, request_options);

  }

  const request_graphql = (auth, content_structure_id) => {

    const url = `${BASE_URL}/o/graphql/api`;
    const { token_type, access_token } = auth;

    const headers = new Headers();
    // headers.append('Authorization', `Basic ${btoa('test@liferay.com:test')}`);
    headers.append('Authorization', `${token_type} ${access_token}`);
    headers.append('Content-Type', 'application/json');
    // headers.append('Accept-Language', 'en-US');

    const request_options = {
      method: 'POST',
      headers: headers,
      redirect: 'follow',
      body: JSON.stringify({
        query: `query {
          structuredContent(structuredContentId: "${content_structure_id}") {
            contentFields {
              dataType
              inputControl
              label
              label_i18n
              name
              repeatable
              contentFieldValue {
                data
                image {
                  contentUrl
                }
              }
            }
          }
        }`,
        variables: null
      })
    };

    return fetch(url, request_options);

  }

  useEffect(() => {

    (async () => {

      try {

        const auth_response = await request_token();
        const auth = await auth_response.json();

        const graphql_response = await request_graphql(auth, '45132');
        const graphql = await graphql_response.json();

        const { contentFields } = graphql.data.structuredContent;

        const parsed = contentFields.reduce((acc, entry) => {

          acc[entry.label] = entry.dataType === 'image' ? `${BASE_URL}${entry.contentFieldValue.image.contentUrl}` : entry.contentFieldValue.data;

          return acc;

        }, {});

        setTimeout(() => setItem(parsed), 5000);

      } catch (err) {
        console.error(err);
      }

    })()

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {
          !item ?
            <div className="loading">Loading...</div> :
            <div className="item">
              <h2>#{item.ID} - {item.Item}</h2>
              <img src={item.Image} alt="item image" />
              <div dangerouslySetInnerHTML={{ __html: item.Description }}></div>
            </div>
        }
      </header>
    </div>
  );
}

export default App;
