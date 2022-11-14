import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

import Table from "./Table";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [uploadBtnDisable, setUploadBtnDisable] = useState(false);
  const [status, setStatus] = useState(null);
  const [totalRows, setTotalRows] = useState(null);

  const [selectedPage, setSelectedPage] = useState(1);
  const searchInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const handleChangePage = (change) => {
    if (change === "next") {
      setSelectedPage(selectedPage + 1);
    } else {
      setSelectedPage(selectedPage - 1);
    }
  };

  const fetchSearchedData = async (keyword) => {
    const url = `http://localhost:7000/getVehicleByKeyword?searchKey=${keyword}`;

    try {
      const resp = await axios.get(url);
      const json = await resp.data;

      //Set Search Data
      setSearchedData(json);
    } catch (e) {
      throw e;
    }
  };

  const fetchData = async (page = 1) => {
    try {
      const url = `http://localhost:7000/getVehicle?page=${page}`;
      const resp = await axios.get(url);
      const json = await resp.data;

      //Set Data
      setData(json);
    } catch (e) {
      throw e;
    }
  };

  const fetchTotalRows = async () => {
    try {
      const totalRows = await axios.get("http://localhost:7000/totalRows");
      const json = await totalRows.data;
      setTotalRows(json[0].total);
    } catch (err) {
      throw err;
    }
  };

  const uploadData = async (data) => {
    setUploadBtnDisable(true);
    setKeyword("");
    fileInputRef.current.value = null;

    try {
      const resp = await axios.post("http://localhost:7000/upload", data);
      if (resp.status === 200) {
        fetchData(selectedPage);
        fetchTotalRows();
        setStatus({ text: "Successfully uploaded!", error: false });
      }
    } catch (error) {
      setStatus({ text: "Failed uploaded!", error: true });
      console.error("Error:", error);
      return error;
    }

    setSelectedFile(null);
    setUploadBtnDisable(false);
  };

  // Initialize DB and tables needed, remove old database if exists
  useEffect(() => {
    axios.get("http://localhost:7000");
  }, []);

  // Fetch data based on page, default page is 1
  useEffect(() => {
    if (status) {
      fetchData(selectedPage);
    }
  }, [selectedPage]);

  // Fetch data based on keyword search
  useEffect(() => {
    if (status) {
      fetchSearchedData(keyword);
    }
  }, [keyword]);

  const onSelectFile = (event) => {
    searchInputRef.current.value = "";
    setStatus(null);

    // Return to the initial state
    setData([]);
    setKeyword("");

    // Select file
    setSelectedFile(event.target.files[0]);
  };

  const onUpload = (event) => {
    event.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("file", selectedFile);

    // Send file to server
    uploadData(formData);
  };

  return (
    <div className="App" style={{ margin: 20 }}>
      <div style={{ marginBottom: "20 0 20 0" }}>
        <h1>Upload material</h1>
        <p>
          Upload updated material:{" "}
          <input
            type="file"
            name="file"
            onChange={onSelectFile}
            ref={fileInputRef}
          />
        </p>
        <button onClick={onUpload} disabled={!selectedFile || uploadBtnDisable}>
          Upload
        </button>
      </div>
      {status && (
        <>
          <hr />
          <div style={{ marginBottom: "20 0 20 0" }}>
            <p>
              Status:
              <span color={status.error ? "green" : "red"}> {status.text}</span>
            </p>
          </div>
        </>
      )}
      <hr />
      <div style={{ margin: "20 0 20 0" }}>
        <h1>Vehical data</h1>
        <p>
          <input
            ref={searchInputRef}
            type="tex"
            placeholder="Search"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            className="input-search"
          />
        </p>
      </div>
      <div style={{ margin: "20 0 20 0" }}>
        <Table
          data={keyword === "" ? data : searchedData}
          keyword={keyword}
          handleChangePage={handleChangePage}
          page={selectedPage}
          totalRows={totalRows}
        />
      </div>
    </div>
  );
};

export default App;
