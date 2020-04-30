//if(bits < 6){ cell width 2 chars}
  //if(bits < 3) cell width 1 char
  var x = document.getElementsByClassName('tape')[0];
  var y = document.getElementsByClassName("cell");
  var i;
  if(bits > 13){
    for (i = 0; i < y.length; i++) {
    y[i].style.width = '40px';
    }
    clg('13: y.length = ' + y.length);
  }else if(bits > 9){
    for(i = 0; i < y.length; i++){
        y[i].style.width = '35px';
    }
    clg('b9');
  }