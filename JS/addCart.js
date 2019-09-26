function showTable() {
  let getLocal = JSON.parse(localStorage.getItem("data"));
  if (getLocal) {
    let table = document.getElementById("tbody"),
      content = "";
    getLocal.forEach(function(item, index) {
      content += `
            <tr>
                <td>${index + 1}</td>
                <td><img src= "../../${item.src}"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input oninput='onTotal(this)' id='total' style="width:50px;" type="number" name="quantity" min="0" max="99" value=${
                  item.number
                }></td>
                <td><p class='showTotal' id='showTotal'>${formatNumber(
                  parseFloat(item.price.replace(/,/g, "")) *
                    parseFloat(item.number)
                )}  Đ</p></td>
                <td><button onclick='deleteItem(this)' id='deleteDetails'>X</button></td>
            </tr>
        `;
    });
    table.innerHTML = content;
    showTotalTable();
  } else console.log("Chua co dl");
}

//get total, and show
function showTotalTable() {
  let getPay = document.querySelectorAll("#showTotal"),
    getshowPay = document.getElementById("showPay"),
    getTax = document.getElementById('showTax'),
    getTotal = document.getElementById('totalFax'),
    num = 0;
  for (let i = 0; i < getPay.length; i++) {
    num += parseFloat(getPay[i].innerHTML.replace(/,/g, ""));
  }
  console.log(num*0.01);
  getTax.innerHTML = formatNumber(num*0.01) + ' Đ';
  getshowPay.innerHTML = formatNumber(num) + ' Đ';
  getTotal.innerHTML = formatNumber(num+num*0.01) + ' Đ';
}


function setData(data) {
  localStorage.setItem("data", JSON.stringify(data));
  //   let getLocal = JSON.parse(localStorage.getItem("data"));
  //   console.log(getLocal);
}

//format number
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function deleteItem(x) {
  let id = x.parentNode.parentNode.rowIndex;
  document.getElementById("showTable").deleteRow(id);
  getLocal = JSON.parse(localStorage.getItem("data"));
  getLocal.splice(parseInt(id - 2), 1);
  setData(getLocal);
  showTable();
  // console.log(getLocal[0].number*total.value);
}

// show click ++ số lượng
function onTotal(id) {
  let total = document.querySelectorAll("#total"),
    getLocal = JSON.parse(localStorage.getItem("data")),
    index = id.parentNode.parentNode.rowIndex;
  getLocal[index - 2].number = total[index - 2].value;
  setData(getLocal);
  document.querySelectorAll(".showTotal")[
    index - 2
  ].innerHTML = formatNumber(
    total[index - 2].value *
      parseFloat(getLocal[index - 2].price.replace(/,/g, ""))
  );
  showTotalTable();
}

// Tìm index click element
function getElementIndex(index) {
  return Array.from(index.parentNode.children).indexOf(index);
}
// test check name
function addTable(nameCart) {
  let btnTotal = document.getElementById("btnTotal"),
    getImg = document.getElementById("getImg"),
    getPrice = document.getElementById("getPrice"),
    getName = document.getElementById("getName"),
    test1 = document.querySelectorAll("#getName"),
    test2 = nameCart.parentNode.parentNode.parentNode,
    test3 = document.querySelectorAll("#getPrice"),
    test4 = document.querySelectorAll("#getImg"),
    a = 0,
    b = 0,
    data = [];
  let nameAdd = test1[getElementIndex(test2)].textContent;
  let valueObj = {
    src: test4[getElementIndex(test2)].src.slice(22),
    name: nameAdd,
    price: test3[getElementIndex(test2)].textContent,
    number: parseInt(1)
  };
  data.push(valueObj);
  console.log(data);
  let getLocal = JSON.parse(localStorage.getItem("data"));

  if (getLocal) {
    let checkLength = getLocal.length;
    for (let i = 0; i < checkLength; i++) {
      if (test1[getElementIndex(test2)].textContent === getLocal[i].name) {
        a++;
        b = i;
        break;
      }
    }
    if (a > 0) {
      console.log("Trùng");
      getLocal[b].number += 1;
      setData(getLocal);
    } else {
      getLocal.push(valueObj);
      setData(getLocal);
    }
  } else {
    setData(data);
  }

}

