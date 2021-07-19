import { useState } from 'react';
import './App.css';
import { genKeyPairs } from './utils/wallet';

function generate(num, setPairs) {
  setPairs(genKeyPairs(num));
}

function downloadPairs(pairs) {
  downloadObjectAsJson(pairs, "keypairs")
}

function downloadAddresses(pairs) {
  let addresses = [];
  for (let index = 0; index < pairs.length; index++) {
    const p = pairs[index];
    addresses.push(p.address);
  }
  downloadObjectAsJson(addresses, "addresses")
}

function downloadForSender(pairs, total) {
  let addresses = "";
  let each = Math.floor((total / pairs.length) * 100000000)/100000000;
  for (let index = 0; index < pairs.length; index++) {
    const p = pairs[index];
    addresses += `${p.address},${each}\n`;
  }
  downloadObjectAsText(addresses, "bulksender")
}

function downloadObjectAsText(exportObj, exportName){
  var dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(exportObj);
  download(dataStr, exportName);
}

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
  download(dataStr, exportName);
}

function download(dataStr, exportName) {
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function App() {
  const [n, setN] = useState(10);
  const [total, setTotal] = useState(0);
  const [pairs, setPairs] = useState([]);
  return (
    <div className="App">
      <h3>Generates key pairs</h3>
      <p>Click "Generate" button to re-generate key pairs.</p>
      <div><button onClick={ () => generate(n, setPairs) }>Generate</button> <input value={n} onChange={ (e) => setN(e.target.value) } /> <button onClick={() => { setPairs([])}} >Clear</button></div>
      { 
        pairs.length > 0 ? 
        <div style={{"marginTop":"20px"}}>
          <button onClick={()=>{downloadPairs(pairs)}} className="link">Download { pairs.length } Key pairs</button> 
          <span style={{"margin":"10px"}}>|</span>
          <button onClick={()=>{downloadAddresses(pairs)}} className="link">Download { pairs.length } addresses</button>
          <div style={{"marginTop":"20px"}}>
            Distribute Total <input value={total} onChange={ (e) => setTotal(e.target.value) } /> Tokens 
            &nbsp; → &nbsp;
            <button onClick={()=>{downloadForSender(pairs, total)}} className="link">Download TXT file for Token BulkSender</button>
          </div>
        </div> 
        : null 
      }
      
      <hr />
      <a id="downloadAnchorElem" style={{"display":"none"}}></a>
    </div>
  );
}

export default App;
