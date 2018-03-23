class App {
  constructor() {
    this.tableData = TABLE_DATA;
    this.bindEvent();
    this.intervalObj;
  }
  bindEvent (){
    document.getElementById("startRandomBtn").addEventListener('click', this.randomShuffleTableRow.bind(this));
    document.getElementById("stopRandomBtn").addEventListener('click', this.stopShuffleTableRow.bind(this));

    for(let eachClass of document.getElementsByClassName("sortRandomBtn") ){
      eachClass.addEventListener('click', this.sortTableRow.bind(this));
    }
  }

  randomShuffleTableRow(){
    console.info('Random Start');
    const tableId="content-data";
    const _self = this;
    if (this.intervalObj){
      clearInterval(this.intervalObj);
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
    console.info('Random Stop');
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
  sortTableRow(thiss) {
    let n = (thiss.target.cellIndex+1)?thiss.target.cellIndex:3;

    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("content-data");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows; //table.getElementsByTagName("TR");

      for (i = 0; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;

        x = rows[i].cells[n]; //rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].cells[n];; //rows[i + 1].getElementsByTagName("TD")[n];

        let col1 = isNaN(parseInt(x.innerHTML)) ? x.innerHTML.toLowerCase() : parseInt(x.innerHTML);
        let col2 = isNaN(parseInt(y.innerHTML)) ? y.innerHTML.toLowerCase() : parseInt(y.innerHTML);
        // console.log(col1, col2);
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (col1 > col2) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (col1 < col2) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
    console.info('Sorting with column=>'+thiss.currentTarget.innerText+' '+dir+'=>Index:'+n);
  }
}

window.onload=function() {
  const appObj = new App();
  appObj.renderDataIntoTable();
}

// let asc1 = 1,
//     asc2 = 1,
//     asc3 = 1;
//
//
// function sort_table(tbody, col, asc) {
//   tbody = document.getElementById(tbody);
//     let rows = tbody.rows,
//         rlen = rows.length,
//         arr = new Array(),
//         cells, clen;
//     // fill the array with values from the table
//     for (let i = 0; i < rlen; i++) {
//         cells = rows[i].cells;
//         clen = cells.length;
//         arr[i] = new Array();
//         for (let j = 0; j < clen; j++) {
//             arr[i][j] = cells[j].innerHTML;
//         }
//     }
//     // sort the array by the specified column number (col) and order (asc)
//     arr.sort(function (a, b) {
//
//       let val1 = isNaN(parseInt(a[col])) ? a[col] : parseInt(a[col]);
//       let val2 = isNaN(parseInt(b[col])) ? b[col] : parseInt(b[col]);
//         // console.log(val1, val2);
//         return (val1 == val2) ? 0 : ((val1 > val2) ? asc : -1 * asc);
//     });
//     // replace existing rows with new rows created from the sorted array
//     for (i = 0; i < rlen; i++) {
//         rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
//     }
// }


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
