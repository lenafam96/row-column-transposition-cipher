let array;
function inputValid(e) {
  let invalidChars = ["-", "+", "e", "E", "0"];
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
}

function encrypt() {
  let plain_text = document.getElementById("input_plain_text").value;
  let key = document.getElementById("key_encrypt").value;
  let cipher_text = document.getElementById("cipher_text");
  let result = "";
  let key_array = key.split("").map(Number);

  let dr = 0;
  array = [];
  for (let i = 0; i < plain_text.length / key.length; i++) {
    let row = [];
    for (let j = 0; j < key.length; j++) {
      row.push(plain_text.length > dr ? plain_text[dr++] : "");
    }
    array.push(row);
  }
  for (let i = 0; i < key.length; i++) {
    for (let j = 0; j < plain_text.length / key.length; j++) {
      result +=
        array[j][key_array.indexOf(i + 1)] === " "
          ? "&nbsp;"
          : array[j][key_array.indexOf(i + 1)];
    }
  }
  cipher_text.innerHTML = result;
  console.log(key_array, array);
  createMatrixDisplay("matrixEncrypt");
}

const pressEnterEncrypt = (e, flag) => {
  inputValid(e);
  if (e.key === "Enter") {
    flag ? encrypt() : decrypt();
  }
};

const saveFileEncrypt = () => {
  result = document.getElementById("cipher_text").innerHTML;
  handleSaveFile(result, "ciphertext.txt");
};

function decrypt() {
  let cipher_text = document.getElementById("input_cipher_text").value;
  let key = document.getElementById("key_decrypt").value;
  let plain_text = document.getElementById("plain_text");
  let result = "";
  let key_array = key.split("").map(Number);

  let dr = 0;
  array = [];
  let numberOfRowHasMoreLetter = cipher_text.length % key.length;
  let numberOfColumn = Number.parseInt(cipher_text.length / key.length) + 1;
  for (let i = 0; i < key.length; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumn; j++) {
      if (key_array.indexOf(i + 1) < numberOfRowHasMoreLetter)
        row.push(cipher_text[dr++]);
      else row.push(j !== numberOfColumn - 1 ? cipher_text[dr++] : "");
    }
    array.push(row);
  }
  for (let i = 0; i < numberOfColumn; i++) {
    for (let j = 0; j < key.length; j++) {
      result +=
        array[key_array[j] - 1][i] === " "
          ? "&nbsp;"
          : array[key_array[j] - 1][i];
    }
  }
  plain_text.innerHTML = result;
  // createMatrixDisplay("matrixDecrypt");
}

const saveFileDecrypt = () => {
  result = document.getElementById("plain_text").innerHTML;
  // if(result!=="")
  handleSaveFile(result, "plaintext.txt");
};

async function handleSaveFile(result, fileName) {
  if (result === "") return;
  if (window.showSaveFilePicker) {
    const handle = await showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          description: "txt",
          accept: {
            "text/markdown": [".txt"],
          },
        },
      ],
    });
    const writable = await handle.createWritable();
    await writable.write(result);
    writable.close();
  } else {
    const SaveFile = document.createElement("a");
    SaveFile.href = URL.createObjectURL(result);
    SaveFile.download = fileName;
    SaveFile.click();
    setTimeout(() => URL.revokeObjectURL(SaveFile.href), 60000);
  }
}

function createMatrixDisplay(id) {
  let key = document.getElementById("key_encrypt").value;
  let key_array = key.split("").map(Number);
  let plain_text = document.getElementById("input_plain_text").value;
  const matrix = document.getElementById(id);
  console.log(matrix, key, plain_text.length);
  while (matrix.firstChild) {
    matrix.removeChild(matrix.lastChild);
  }

  const table1 = document.createElement("table");
  table1.className = "table-encrypt";

  for (let i = 0; i < key_array.length; i++) {
    const thELe = document.createElement("th");
    thELe.innerHTML = key_array[i];
    table1.appendChild(thELe);
    matrix.appendChild(table1);
  }

  for (let i = 0; i < key_array.length; i++) {
    const trEle = document.createElement("tr");

    for (let j = 0; j < array[0].length; j++) {
      const tdEle = document.createElement("td");
      //   tdEle.id = 'cell-'+i+'-'+j;
      tdEle.innerHTML = array[i][j] === " " ? "&nbsp;" : array[i][j];
      trEle.appendChild(tdEle);
    }
    table1.appendChild(trEle);
    matrix.appendChild(table1);
  }
}
