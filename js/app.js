class App {
  constructor() {
    this.tableData = TABLE_DATA;
    this.bindEvent();
    this.intervalObj;
    this.asc1 = 1,
    this.asc2 = 1,
    this.asc3 = 1;
  }
  bindEvent (){
    document.getElementById("startRandomBtn").addEventListener('click', this.randomShuffleTableRow.bind(this));
    document.getElementById("stopRandomBtn").addEventListener('click', this.stopShuffleTableRow.bind(this));
    // document.getElementById("sortRandomBtn").addEventListener('click', this.sort_table.bind(this));

  }

  randomShuffleTableRow(){
    const tableId="content-data";
    const _self = this;
    if (intervalObj){
      clearInterval(intervalObj);
    }
    this.intervalObj = setInterval(function(){_self.randomize(tableId)},1000);
  }

  /* Random rows
   *  @latest
  */
  shuffle (allRows) {
  // console.log(myRows.length);
  for (let i = 0; i < allRows.length; i++) {
      // Random item in this array.
      let r = parseInt(Math.random() * allRows.length);
      let obj = allRows[r];
      // Swap.
      allRows[r] = allRows[i];
      allRows[i] = obj;
    }
  }

  randomize(tableID) {
    let myTable = document.getElementById(tableID);
    let myRows = new Array();
    for (let i=myTable.rows.length-1; i>=0; i--) {
        let theRow = myTable.rows[i];
        myRows.push(theRow);
        theRow.parentNode.removeChild(theRow);
    }

    this.shuffle(myRows);
    for (let j=0; j<myRows.length; j++) {
        myTable.appendChild(myRows[j]);
    }
  }

  // stop random shuffling rows
  stopShuffleTableRow(){
    // console.log(this.intervalObj, ">>>>>>>>>");
    if (this.intervalObj){
      clearInterval(this.intervalObj);
    }
  }
  // @render json data into taable
  renderDataIntoTable(){
    let myHeading = document.querySelector('h1');
    myHeading.textContent = 'Hello world! vishnu';



    const table = document.getElementsByClassName("table");

    // IE7 only supports appending rows to tbody
    let tbody = document.getElementById('content-data');
    // const tbody = document.createElement("tbody");

    // for each outer array row
    for (let i = 0 ; i < this.tableData.length; i++) {
       let tr = document.createElement("tr");

         if (this.tableData[0]){

           let td1 = document.createElement("td");
           let txtId = document.createTextNode(this.tableData[i].id);
           td1.appendChild(txtId);
           tr.appendChild(td1);

           let td2 = document.createElement("td");
           var img = document.createElement("img");
           img.setAttribute("src", this.tableData[i].thumbnailUrl);
           img.setAttribute("alt", "Image");
           td2.appendChild(img);
           tr.appendChild(td2);

           let td3 = document.createElement("td");
           let txtName = document.createTextNode(this.tableData[i].name);
           td3.appendChild(txtName);
           tr.appendChild(td3);

           let td4 = document.createElement("td");
           let txtPrice = document.createTextNode(this.tableData[i].price);
           td4.appendChild(txtPrice);
           tr.appendChild(td4);

         }

      tbody.appendChild(tr);
    }
  }

  // Table column sort
  sort_table(tbody, col=3, asc=1) {
    let tbodySort = "content-data";
    tbodySort = document.getElementById(tbodySort);
      let rows = tbodySort.rows,
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
      for (let i = 0; i < rlen; i++) {
          rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
      }
  }
}

let  intervalObj;
window.onload=function() {
  const appObj = new App();
  appObj.renderDataIntoTable();
}

let asc1 = 1,
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
// Array.prototype.shuffle = function() {
//
// for (let i = 0; i < this.length; i++) {
//     // Random item in this array.
//     let r = parseInt(Math.random() * this.length);
//     let obj = this[r];
//     // Swap.
//     this[r] = this[i];
//     this[i] = obj;
//   }
// }

// function randomize(tableID) {
//   let myTable = document.getElementById(tableID);
//   let myRows = new Array();
//   for (let i=myTable.rows.length-1; i>=0; i--) {
//       let theRow = myTable.rows[i];
//       myRows.push(theRow);
//       theRow.parentNode.removeChild(theRow);
//   }
//
//   myRows.shuffle();
//   for (let j=0; j<myRows.length; j++) {
//       myTable.appendChild(myRows[j]);
//   }
// }

// function randomShuffleTableRow(tableId){
//   if (intervalObj){
//     clearInterval(intervalObj);
//   }
//   intervalObj = setInterval(function(){randomize(tableId)},1000);
// }
//
// function stopShuffleTableRow(){
//   if (intervalObj){
//     clearInterval(intervalObj);
//   }
// }
