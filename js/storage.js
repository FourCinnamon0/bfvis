var modal = document.getElementById("modal");
var uns = document.getElementById('uns');
function updatebitshow() {
    var bitshow = document.getElementById("bitshow");
    var bitsin = document.getElementById('bits');
    bitshow.innerHTML = bitsin.value;
    bits = bitsin.value
    localStorage.setItem("bits", bitsin.value);
    if (bits == bitsin.value) {
        uns.classList.add('hidden')
    } else {
        uns.classList.remove('hidden')
    }
}
var bitsin = document.getElementById('bits');
bitsin.value = localStorage.getItem("bits");
var bits = localStorage.getItem("bits");
updatebitshow();
uns.classList.add('hidden')
function updatedelshow() {
    var delshow = document.getElementById("delshow");
    var delay = document.getElementById('delay');
    delshow.innerHTML = delay.value;
    //localStorage.setItem("del", delay.value);
}
/* var delay = document.getElementById('delay');
delay.value = localStorage.getItem("del"); */
updatedelshow();

document.getElementById('input-file').addEventListener('change', getFile)

async function getFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        let fileData = await input.files.item(0).arrayBuffer().then(e => {
            let dec = new TextDecoder()
            return dec.decode(e);
        });
        var str = fileData;
        var arr = str.match(/\[ Designed to run on a ([0-9]+) bit interpreter ]/);
        if (arr) {
            let [, b] = arr
            bits = +b;
            document.getElementById('bits').value = bits;
            updatebitshow();
            document.getElementById('source').value = fileData.split('\n').slice(1).join('\n');
        } else {
            document.getElementById('source').value = fileData;
        }
        document.getElementById('ot').innerHTML = input.files[0].name;
        modal.style.display = "none";
    }
}


// Function to download data to a file
function download(data, filename) {
    var file = new Blob([data], { type: 'text/plain' });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
function downloadbf() {
    var data = "[ Designed to run on a " + bits + " bit interpreter ]\n" + document.getElementById('source').value
    var filename = document.getElementById('dfinput').value
    download(data, filename)
}


// Get the button that opens the modal
var ot = document.getElementById("ot");

// Get the <span> element that closes the modal
var closem = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
ot.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closem.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}