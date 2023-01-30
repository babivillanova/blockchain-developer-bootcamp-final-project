import React, { useState } from 'react';
import { IfcAPI, IfcSite } from 'web-ifc/web-ifc-api';

const IfcSiteViewer = () => {
  const [file, setFile] = useState(null);

  const handleFileInput = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const ifcSite = await IfcSite.fromIfcFile(file);
    console.log(ifcSite.properties);
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default IfcSiteViewer;