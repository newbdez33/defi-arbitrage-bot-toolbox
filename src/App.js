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

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function App() {
  const [n, setN] = useState(10);
  const [pairs, setPairs] = useState([]);
  return (
    <div className="App">
      <h3>Generates key pairs</h3>
      <p>Click "Generate" button to re-generate key pairs.</p>
      <div><button onClick={ () => generate(n, setPairs) }>Generate</button> <input value={n} onChange={ (e) => setN(e.target.value) } /> <button onClick={() => { setPairs([])}} >Clear</button></div>
      { 
        pairs.length > 0 ? 
        <div style={{"marginTop":"20px"}}><button onClick={()=>{downloadPairs(pairs)}} className="link">Download { pairs.length } Key pairs</button> 
        <span style={{"margin":"10px"}}>|</span>
        <button onClick={()=>{downloadAddresses(pairs)}} className="link">Download { pairs.length } addresses</button></div> : null 
      }
      
      <hr />
      <a id="downloadAnchorElem" style={{"display":"none"}}></a>
    </div>
  );
}

export default App;
