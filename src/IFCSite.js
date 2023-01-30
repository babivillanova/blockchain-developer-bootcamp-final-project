import React, { useState, useEffect } from "react";
import {IfcAPI,IFCSPACE} from "web-ifc/web-ifc-api";

const IfcFileReader = () => {
const [spaces, setSpaces] = useState([]);
const [isModelOpened, setIsModelOpened] = useState(false);

const ifcFileLocation = "sample.ifc"; // modify for your ifc filename
let modelID = 0;
const ifcapi = new IfcAPI();

/**

resolve a Uint8Array().
@param string url location of your ifc file
@returns {Promise}
*/
function getIfcFile(url) {
return new Promise((resolve, reject) => {
var oReq = new XMLHttpRequest();
oReq.responseType = "arraybuffer";
oReq.addEventListener("load", () => {
resolve(new Uint8Array(oReq.response));
});
oReq.open("GET", url);
oReq.send();
});
}
/**

Get all IFCSPACE from ifc file
@param integer modelID
@returns array
*/
function getAllSpaces(modelID) {
// Get all the propertyset lines in the IFC file
let lines = ifcapi.GetLineIDsWithType(modelID, IFCSPACE);
let lineSize = lines.size();
let spaces = [];
for (let i = 0; i < lineSize; i++) {
// Getting the ElementID from Lines
let relatedID = lines.get(i);
// Getting Element Data using the relatedID
let relDefProps = ifcapi.GetLine(modelID, relatedID);
spaces.push(relDefProps);
}
return spaces;
}
useEffect(() => {
ifcapi.Init().then(() => {
getIfcFile(ifcFileLocation).then( (ifcData) => {
modelID = ifcapi.OpenModel(ifcData);
setIsModelOpened(ifcapi.IsModelOpen(modelID));
setSpaces(getAllSpaces(modelID));
ifcapi.CloseModel(modelID);
});
});
}, []);

return (
<div>
<h2>IFC File Reader</h2>
<p>Model Opened: {isModelOpened.toString()}</p>
<p>Spaces:</p>
<ul>
{spaces.map((space, index) => (
<li key={index}>{space}</li>
))}
</ul>
</div>
);
};

export default IfcFileReader;
