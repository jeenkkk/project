function searchbyhide() {
    var input, filter, table, tr, td, i, txt;
    input = document.getElementById("inp");
    filter = input.value.toLowerCase();
    table = document.getElementById("tb");
    tr = table.getElementsByTagName("tr");
  
    // loop table for hide items that doesn't match in input by name
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txt = td.textContent || td.innerText;
        if (txt.toLowerCase().indexOf(filter) >= 0) {
            console.log(txt.toLowerCase().indexOf(filter));
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }

    // search by price
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txt = td.textContent || td.innerText;
        if (txt.toLowerCase().indexOf(filter) >= 0) {
            console.log(txt.toLowerCase().indexOf(filter));
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
    
}