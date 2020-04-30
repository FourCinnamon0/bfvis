/*
* To do:
* Improve styles of inputs
* Add delay input (as number)
* Add "......." and ",,,,,,,," to optimise
* Add optimisation tips to code
* Optimise [+] and [-] to current cell = 0
* Add minifier built in
* Add beautifier built in
* Remove pointer jittering at delay = 0
* Add end of memory rollover option CCC# > #CCC
* Add more cells
*/
function clg(v){
  console.log('cLog: ' + v)
}
var insout = document.getElementById("insout");
var wh = 0;
var bfc;
function filter() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("tbl");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[wh];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
function insvalupd(){
        var inser = document.getElementById("inser");
        if(inser.value > 0){
            bfc = "+".repeat(inser.value);
        }else if(inser.value < 0){
            bfc = "-".repeat(inser.value * -1);
        }else{
            inser.value = null;
            inserch.value = null;
        }
        inserch.value = String.fromCharCode(Math.abs(inser.value))
    }
function insvu(){
    var inserch = document.getElementById("inserch");
    if(inserch.value.length > 1 ){
        inserch.value = inserch.value.substring(1)
    }
    var cca = inserch.value.charCodeAt(0)
    bfc = "+".repeat(cca);
    inser.value = cca;
}
function clipboard() {
    navigator.clipboard.writeText(bfc).then(function() {
      /* clipboard successfully set */
    }, function() {
      /* clipboard write failed */
      alert('To enable writing to clipboard, accept the clipboard premission')
    });
  }
  