let table;
function inputValid(e) {
    let invalidChars = ["-","+","e","E"];
    if(invalidChars.includes(e.key)) {
        e.preventDefault();
    }
}




function encrypt(){
    let plain_text = document.getElementById('input_plain_text').value;
    let key = document.getElementById('key_encrypt').value;
    let cipher_text = document.getElementById('cipher_text');
    let result = "";
    
    
    cipher_text.innerHTML = result;
    createMatrixDisplay("matrixEncrypt");

}

const pressEnterEncrypt = (e, flag)=>{
    inputValid(e);
    if(e.key === "Enter"){
        flag ? encrypt() : decrypt();
    }

}

const saveFileEncrypt = () => {
    result = document.getElementById("cipher_text").innerHTML;
    handleSaveFile(result,"ciphertext.txt");
}



function decrypt(){
    let cipher_text = document.getElementById('input_cipher_text').value;
    let key = document.getElementById('key_decrypt').value;
    let plain_text = document.getElementById('plain_text');
    let result = "";
    
    
    plain_text.innerHTML = result;
    createMatrixDisplay("matrixDecrypt");
}

const saveFileDecrypt = () => {
    result = document.getElementById("plain_text").innerHTML;
    // if(result!=="")
    handleSaveFile(result,"plaintext.txt");
}

async function handleSaveFile(result,fileName){
    if(result==="") return;
    if( window.showSaveFilePicker ) {
        const handle = await showSaveFilePicker({
            suggestedName: fileName,
        types: [{
          description: 'txt',
          accept: {
            'text/markdown': ['.txt'],
          },    
        }],
      });
      const writable = await handle.createWritable();
      await writable.write( result );
      writable.close();
    }
    else {
      const SaveFile = document.createElement( "a" );
      SaveFile.href = URL.createObjectURL( result );
      SaveFile.download= fileName;
      SaveFile.click();
      setTimeout(() => URL.revokeObjectURL( SaveFile.href ), 60000 );
    }
  }

  function createMatrixDisplay(id){
    let key = Number.parseInt(document.getElementById('key_encrypt').value);
    let plain_text = document.getElementById('input_plain_text').value;
    const matrix = document.getElementById(id)
    console.log(matrix, key, plain_text.length );
    while(matrix.firstChild){
        matrix.removeChild(matrix.lastChild)
    }

    const table1 = document.createElement("table")
    table1.className = "table-encrypt";
    for (let i = 0; i < key; i++) {
      const trEle = document.createElement("tr")
      for (let j = 0; j < plain_text.length; j++) {
          const tdEle = document.createElement('td')
        //   tdEle.id = 'cell-'+i+'-'+j;
        tdEle.innerHTML= table[i][j]===" "? "&nbsp;": table[i][j];
          trEle.appendChild(tdEle)
      }
      table1.appendChild(trEle);
      matrix.appendChild(table1)
    }

  }

