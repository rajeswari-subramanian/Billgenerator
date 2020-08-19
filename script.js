var orderItem = [];
var div = document.getElementById("displayItem")
var total = 0
var count = 0
var discount = 1;
var arrTime = []

function addItemsList(itemName, unitPrice, qty, itemAmt) {
    var name = itemName
    var unitPrice = unitPrice
    var qty = qty
    var itemAmt = itemAmt
    var item = {
        name: name,
        unitPrice: unitPrice,
        qty: qty,
        itemAmt: itemAmt
    }
    orderItem.push(item)
}

function dateTime() {
    var today = new Date();
    var day = today.getDate() + "";
    var month = (today.getMonth() + 1) + "";
    var year = today.getFullYear() + "";
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    mintues = checkZero(minutes);
    seconds = checkZero(seconds);

    arrTime.push(day)
    arrTime.push(month)
    arrTime.push(year)
    arrTime.push(hour)
    arrTime.push(minutes)
    arrTime.push(seconds)

    function checkZero(data) {
        if (data.length == 1) {
            data = "0" + data;
        }
        return data;
    }
}

function dispItem() {
    if (event.target.tagName === 'BUTTON') {
        var tot = document.getElementById('totalAmount')
        var tar = event.target.parentElement
        var itemName = tar.firstElementChild.textContent
        var first = tar.firstElementChild.nextElementSibling
        var unitPrice = Number(first)
        unitPrice = tar.children[1].textContent
        var qty = tar.children[3].value
        qty = Number(qty)
        var itemAmt = unitPrice * qty
        addItemsList(itemName, unitPrice, qty, itemAmt)
        total = total + itemAmt
        tot.value = total
    }
}

var print = document.getElementById('print')
print.addEventListener('click', function () {
    var bill = document.getElementById("billGenerate")
    bill.style.display = 'none'
    var billPage = document.getElementById('billPage')
    billPage.style.display = "block"
    dateTime()
    var date = document.getElementById('date')
    var time = document.getElementById('time')
    date.textContent = arrTime[0] + "/" + arrTime[1] + "/" + arrTime[2]
    time.textContent = arrTime[3] + ":" + arrTime[4] + ":" + arrTime[5]
    var tip = parseInt(document.getElementById('tips').value)
    if (document.getElementById('r1').checked) {

        discount = document.getElementById('r1').value
    }
    else if (document.getElementById('r2').checked) {

        discount = document.getElementById('r2').value
    }
    var subTotal = total + tip
    var gstTotal = subTotal + (subTotal * 0.05)
    var discTotal = gstTotal - (gstTotal * discount)
    var div2 = document.getElementById('printT')
    var table = document.createElement('table')
    var htr = document.createElement('tr')
    var th1 = document.createElement('th')
    var th2 = document.createElement('th')
    var th3 = document.createElement('th')
    var th4 = document.createElement('th')
    th1.textContent = "Items"
    th2.textContent = "Price"
    th3.textContent = "Qty"
    th4.textContent = "Amount"
    htr.append(th1, th2, th3, th4)
    table.append(htr)
    for (var i = 0; i < orderItem.length; i++) {
        var item = orderItem[i]
        var tr = document.createElement('tr')
        var td1 = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')
        var td4 = document.createElement('td')
        td1.textContent = item.name
        td2.textContent = item.unitPrice
        td3.textContent = item.qty
        td4.textContent = item.itemAmt
        tr.append(td1, td2, td3, td4)
        table.append(tr)
    }
    var ttr = document.createElement('tr')
    ttr.id = "totaltr"
    var td = document.createElement('td')
    td.setAttribute("colspan", 4);
    td.textContent = `SubTotal(Incl.Tips) : ${subTotal.toFixed(2)}`
    ttr.append(td)
    table.append(ttr)
    var ttr = document.createElement('tr')
    ttr.id = "totaltr"
    var td = document.createElement('td')
    td.setAttribute("colspan", 4);
    td.textContent = `Total(Incl.GST 5%)  :  ${gstTotal.toFixed(2)}`
    ttr.append(td)
    table.append(ttr)
    var ttr = document.createElement('tr')
    ttr.id = "totaltr"
    var td = document.createElement('td')
    td.setAttribute("colspan", 4);
    td.textContent = `Total(Incl.Dicount)  :  ${discTotal.toFixed(2)}`
    ttr.append(td)
    table.append(ttr)

    div2.append(table)
})

var option = document.getElementById('selectItem')
option.addEventListener('click', dispItem)

