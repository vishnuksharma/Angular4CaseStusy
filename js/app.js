let  intervalObj;
window.onload=function() {
  let myHeading = document.querySelector('h1');
  myHeading.textContent = 'Hello world! vishnu';


  const tableData = TABLE_DATA;
  const table = document.getElementsByClassName("table");

  // IE7 only supports appending rows to tbody
  let tbody = document.getElementById('content-data');
  // const tbody = document.createElement("tbody");

  // for each outer array row
  for (let i = 0 ; i < tableData.length; i++) {
     let tr = document.createElement("tr");

       if (tableData[0]){

         let td1 = document.createElement("td");
         let txtId = document.createTextNode(tableData[i].id);
         td1.appendChild(txtId);
         tr.appendChild(td1);

         let td2 = document.createElement("td");
         var img = document.createElement("img");
         img.setAttribute("src", tableData[i].thumbnailUrl);
         img.setAttribute("alt", "Image");
         td2.appendChild(img);
         tr.appendChild(td2);

         let td3 = document.createElement("td");
         let txtName = document.createTextNode(tableData[i].name);
         td3.appendChild(txtName);
         tr.appendChild(td3);

         let td4 = document.createElement("td");
         let txtPrice = document.createTextNode(tableData[i].price);
         td4.appendChild(txtPrice);
         tr.appendChild(td4);

       }

    tbody.appendChild(tr);
  }
}

let people, asc1 = 1,
            asc2 = 1,
            asc3 = 1;


function sort_table(tbody, col, asc) {
  tbody = document.getElementById(tbody);
    let rows = tbody.rows,
        rlen = rows.length,
        arr = new Array(),
        cells, clen;
    // fill the array with values from the table
    for (let i = 0; i < rlen; i++) {
        cells = rows[i].cells;
        clen = cells.length;
        arr[i] = new Array();
        for (let j = 0; j < clen; j++) {
            arr[i][j] = cells[j].innerHTML;
        }
    }
    // sort the array by the specified column number (col) and order (asc)
    arr.sort(function (a, b) {

      let val1 = isNaN(parseInt(a[col])) ? a[col] : parseInt(a[col]);
      let val2 = isNaN(parseInt(b[col])) ? b[col] : parseInt(b[col]);
        // console.log(val1, val2);
        return (val1 == val2) ? 0 : ((val1 > val2) ? asc : -1 * asc);
    });
    // replace existing rows with new rows created from the sorted array
    for (i = 0; i < rlen; i++) {
        rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
    }
}


/* Random rows
 *  @latest
*/
Array.prototype.shuffle = function() {

for (let i = 0; i < this.length; i++) {
    // Random item in this array.
    let r = parseInt(Math.random() * this.length);
    let obj = this[r];
    // Swap.
    this[r] = this[i];
    this[i] = obj;
  }
}

function randomize(tableID) {
  let myTable = document.getElementById(tableID);
  let myRows = new Array();
  for (let i=myTable.rows.length-1; i>=0; i--) {
      let theRow = myTable.rows[i];
      myRows.push(theRow);
      theRow.parentNode.removeChild(theRow);
  }

  myRows.shuffle();
  for (let j=0; j<myRows.length; j++) {
      myTable.appendChild(myRows[j]);
  }
}

function randomShuffleTableRow(tableId){
  if (intervalObj){
    clearInterval(intervalObj);
  }
  intervalObj = setInterval(function(){randomize(tableId)},1000);
}

function stopShuffleTableRow(){
  if (intervalObj){
    clearInterval(intervalObj);
  }
}
