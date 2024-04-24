import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa";
import axios from "axios";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    // setSelectedFile(e.target.value);
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setConvert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/docToPdf",
        formData,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setDownloadError("");
      setConvert("File converted successfully.");
    } catch (error) {
      console.error("Error converting file:", error);
      if (error.response && error.response.status == 400) {
        setDownloadError("Error converting file.", error.response.data.message);
      } else {
        setConvert("");
      }
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
      <div className="flex h-screen items-center justify-center">
        <div className="border border-orange-300 border-dashed px-4 py-2 md:px-8 md:py-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-4">
            Convert Word doc to PDF
          </h1>
          <p className="text-sm text-center mb-5">
            Conveniently convert your Word document into a PDF format online,
            absolutely free of charge.
          </p>

          <div className="flex flex-col item-center space-y-4">
            <input
              type="file"
              accept=".doc, .docx"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="w-full flex items-center justify-center px-4 py-6 bg-white rounded-lg shadow-lg cursor-pointer border-orange-200 hover:bg-gray-200 duration-200 text-blue-500"
            >
              <FaFileWord className="text-2xl" />
              <span className="text-2xl ml-2">
                {selectedFile ? selectedFile.name : "Choose file"}
              </span>
            </label>
            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              className="bg-sky-500 hover:bg-sky-600 disabled:bg-gray-500 disabled:pointer-events-none duration-300 text-white font-semibold rounded-md px-5 py-2"
            >
              Convert to PDF
            </button>
          </div>
          {convert && (
            <p className="text-green-300 mt-4 text-center font-sm">{convert}</p>
          )}
          {downloadError && (
            <p className="text-red-500 mt-4 text-center font-sm">
              {downloadError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
