import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import useHttpRequest from './utils/useHttpRequest';

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await useHttpRequest('http://localhost:3000/files/data');
      setFiles(responseData);
    };

    fetchData();

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            file.lines.map((line, index) => (
              <tr key={`${file.file}-${index}`}>
                <td>{file.file}</td>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td>{line.hex}</td>
              </tr>
            ))
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default App
