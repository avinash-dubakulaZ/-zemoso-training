function getpagedata(pageload) {
    fetch('./restaurant.json')
        .then(function (results) { return results.json(); })
        .then(function (data) {
        var temp = data;
        if (sessionStorage.getItem('menuCardList') == null) {
            sessionStorage.setItem('menuCardList', JSON.stringify(temp.menuCardList));
        }
        if (sessionStorage.getItem('tableCardList') == null) {
            sessionStorage.setItem('tableCardList', JSON.stringify(temp.tableCardList));
        }
        pageload();
    });
}
getpagedata(pageload);
function pageload() {
    //storing for table
    var tableCardList = JSON.parse(sessionStorage.getItem('tableCardList'));
    var tableCards = document.getElementById('Table-list');
    var tableCardData = tableCardList.map(function (tableCard) {
        return "\n        <div class='table-card' id=".concat(tableCard.id, " ondragover=\"dragover(event)\" ondrop=\"drop(event)\" onclick=\"showmodal(event)\">\n        <h2 class=\"table-card-title drop\" >Table ").concat(tableCard.id, "</h2>\n        <p class=\"table-card-para drop\">Total cost: <span id=").concat(tableCard.id.toString() + 'c', ">").concat(tableCard.tableTotal, "</span></p>\n        </div>\n        ");
    });
    tableCards.innerHTML = tableCardData.join('');
    var MenuCardList = JSON.parse(sessionStorage.getItem('menuCardList'));
    var menucards = document.getElementById('Menu-list');
    var menucarddata = MenuCardList.map(function (menuCard) {
        return "\n        <div class='menu-card' id=".concat(menuCard.id, " draggable='true' ondragstart=\"drag(event)\">\n        <h2 attr-key=").concat(menuCard.id, ">").concat(menuCard.name, "</h2>\n        <p attr-key=").concat(menuCard.id, ">Total cost: <span id=\"total-cost\" attr-key=").concat(menuCard.id, ">").concat(menuCard.cost, "</span></p>\n        <p attr-key=").concat(menuCard.id, ">Item type: <span id=\"item-type\" attr-key=").concat(menuCard.id, ">").concat(menuCard.type, "</span></p>\n        </div>\n        ");
    });
    menucards.innerHTML = menucarddata.join('');
    window.onclick = function (event) {
        if (event.target.id == 'mainmodal') {
            ;
            document.getElementById('mainmodal').style.display = 'none';
            for (var tabno = 0; tabno < 3; tabno++) {
                ;
                document.getElementById((tabno + 1).toString()).style.backgroundColor = 'white';
            }
        }
        if (event.target.id == 'billmain') {
            ;
            document.getElementById('billmain').style.display = 'none';
        }
        if (event.target.id == 'tableempty') {
            ;
            document.getElementById('tableempty').style.display = 'none';
        }
    };
}
function menusearch(e) {
    if (e.target != null) {
        var element = e.target;
        var currsearch = element.value.toLowerCase().trim();
    }
    //getting menu cards
    var menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(function (card) {
        var _a, _b;
        var cardelement = card;
        var cardName = (_a = card.children[0].textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        var itemType = (_b = card.children[2].children[0].textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        //console.log(cardName,itemType,"check on console",currsearch)
        if ((cardName === null || cardName === void 0 ? void 0 : cardName.includes(currsearch)) || (itemType === null || itemType === void 0 ? void 0 : itemType.includes(currsearch))) {
            cardelement.style.display = 'block';
        }
        else {
            cardelement.style.display = 'none';
        }
    });
}
function tablesearch(e) {
    if (e.target != null) {
        var element = e.target;
        var currsearch = element.value.toLowerCase();
    }
    //getting menu cards
    var tableCards = document.querySelectorAll('.table-card');
    tableCards.forEach(function (card) {
        var _a;
        var cardelement = card;
        var cardName = (_a = card.children[0].textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        //console.log(cardName,"check on console",currsearch)
        if (cardName === null || cardName === void 0 ? void 0 : cardName.includes(currsearch)) {
            cardelement.style.display = 'block';
        }
        else {
            cardelement.style.display = 'none';
        }
    });
}
var drag = function (event) {
    var _a;
    console.log('menu card is dragged');
    (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('iddata', event.currentTarget.id);
};
var dragover = function (event) {
    console.log('dragg over');
    event.preventDefault();
};
var drop = function (event) {
    console.log('drop');
    var menuCardIndex = parseInt(event.dataTransfer.getData('iddata')) - 1;
    var tableCardIndex = parseInt(event.currentTarget.id) - 1;
    var tableCardList = JSON.parse(sessionStorage.getItem('tableCardList'));
    var MenuCardList = JSON.parse(sessionStorage.getItem('menuCardList'));
    var temp = MenuCardList[menuCardIndex];
    var flag = true;
    var currItems = tableCardList[tableCardIndex].tableItems;
    for (var i = 0; i < currItems.length; i++) {
        if (currItems[i][0] == temp.name) {
            flag = false;
            currItems[i][2] += 1;
            tableCardList[tableCardIndex].tableTotal += temp.cost;
            break;
        }
    }
    if (flag) {
        var newItem = [temp.name, temp.cost, 1];
        tableCardList[tableCardIndex].tableTotal += temp.cost;
        currItems.push(newItem);
    }
    ;
    document.getElementById((tableCardIndex + 1).toString() + 'c').innerHTML = tableCardList[tableCardIndex].tableTotal;
    tableCardList[tableCardIndex].tableItems = currItems;
    sessionStorage.setItem('tableCardList', JSON.stringify(tableCardList));
};
var showmodal = function (event) {
    //window.alert(event.currentTarget.id)
    var currTableId = event.currentTarget.id;
    var total = document.getElementById(currTableId + 'c')
        .innerHTML;
    console.log(currTableId, 9999999, total);
    if (total == '0') {
        ;
        document.getElementById('tableempty').style.display =
            'block';
    }
    else {
        ;
        document.getElementById(currTableId).style.backgroundColor = '#ffc61a';
        var modalnode = document.getElementById('mainmodal');
        if (modalnode.style.display != undefined) {
            modalnode.style.display = 'block';
        }
        tablebodyreload(currTableId);
    }
};
var tablebodyreload = function (currTableId) {
    ;
    document.getElementById('total').innerHTML = document.getElementById(currTableId + 'c').innerHTML;
    document.getElementById('tablenomodal').innerHTML =
        currTableId;
    var tableCardList = JSON.parse(sessionStorage.getItem('tableCardList'));
    var traverse = tableCardList[parseInt(currTableId) - 1].tableItems;
    console.log(traverse);
    var parent = document.getElementById('billbody');
    document.getElementById('billbody').innerHTML = null;
    var tabno = parseInt(currTableId) - 1;
    for (var i = 0; i < traverse.length; i++) {
        console.log('11111', traverse[i][0]);
        var chil = document.createElement('tr');
        var txt = "\n            <td>".concat(i + 1, "</td>\n            <td>").concat(traverse[i][0], "</td>\n            <td>").concat(traverse[i][1], "</td>\n            <td>\n                <p>No of servings</p>\n                <input type=\"number\" id=").concat(traverse[i][0] + 'c', " onchange=\"inputbutton(event,").concat(tabno, ")\" style=\"width:80%;padding:1%;\" value=").concat(traverse[i][2], ">\n            </td>\n            <td><i id=").concat(traverse[i][0] + 'd', " class=\"far fa-trash-alt ievent\" onclick=deletebutton(event,").concat(tabno, ") style=\"font-size:150%;float:right;\"></i></td>\n            ");
        chil.innerHTML = txt;
        parent === null || parent === void 0 ? void 0 : parent.appendChild(chil);
    }
    var closenode = document.getElementById('closesession');
    closenode.addEventListener('click', function (event) {
        closesession(event);
    });
};
var inputbutton = function (event, tabno) {
    var name = event.currentTarget.id.slice(0, -1);
    // console.log(cost, tabno, name)
    var qty = document.getElementById(event.currentTarget.id).value;
    console.log(qty);
    var tableCardList = JSON.parse(sessionStorage.getItem('tableCardList'));
    var currTableItems = tableCardList[tabno].tableItems;
    for (var i = 0; i < currTableItems.length; i++) {
        console.log(currTableItems[i][0], '00000000', name);
        if (currTableItems[i][0] == name) {
            currTableItems[i][2] = qty;
            console.log('modified');
            break;
        }
    }
    tableCardList[tabno].tableItems = currTableItems;
    var newt = 0;
    for (var i = 0; i < currTableItems.length; i++) {
        newt += currTableItems[i][2] * currTableItems[i][1];
    }
    console.log('new ttt', newt);
    tableCardList[tabno].tableTotal = newt;
    document.getElementById('total').innerHTML =
        newt.toString();
    document.getElementById((tabno + 1).toString() + 'c').innerHTML = newt.toString();
    sessionStorage.setItem('tableCardList', JSON.stringify(tableCardList));
};
var deletebutton = function (event, tabno) {
    var item = event.currentTarget.id.slice(0, -1);
    console.log(event.currentTarget.id.slice(0, -1));
    console.log(tabno, 'readyyyyyy');
    var tableCardList = JSON.parse(sessionStorage.getItem('tableCardList'));
    console.log(tableCardList[tabno].tableItems);
    var a = tableCardList[tabno].tableItems;
    var index = -1;
    var total = 0;
    for (var x = 0; x < a.length; x++) {
        if (a[x][0] == item) {
            index = x;
        }
        else {
            total += a[x][1] * a[x][2];
        }
    }
    console.log('new total', total);
    document.getElementById('total').innerHTML =
        total.toString();
    document.getElementById((tabno + 1).toString() + 'c').innerHTML = total.toString();
    if (index != -1) {
        console.log(a[index]);
        a.splice(index, 1);
        tableCardList[tabno].tableItems = a;
        tableCardList[tabno].tableTotal = total;
        sessionStorage.setItem('tableCardList', JSON.stringify(tableCardList));
        tablebodyreload((tabno + 1).toString());
    }
};
var closemodal = function (event) {
    var modalnode = document.getElementById('mainmodal');
    if (modalnode.style.display != undefined) {
        modalnode.style.display = 'none';
    }
    for (var tabno = 1; tabno <= 3; tabno++) {
        ;
        document.getElementById(tabno.toString()).style.backgroundColor = 'white';
    }
};
var closesession = function (event) {
    var tabid = document.getElementById('tablenomodal')
        .innerHTML;
    console.log(event.currentTarget);
    console.log(tabid);
    var tableCardList = JSON.parse(sessionStorage.getItem('tableCardList'));
    var tableindex = parseInt(tabid) - 1;
    tableCardList[tableindex].tableItems = [];
    tableCardList[tableindex].tableTotal = 0;
    document.getElementById(tabid + 'c').innerHTML = '0';
    sessionStorage.setItem('tableCardList', JSON.stringify(tableCardList));
    var node = document.getElementById('billmain');
    if (node.style.display != undefined) {
        node.style.display = 'block';
    }
    closemodal(event);
    document.getElementById('closebillno').innerHTML = tabid;
    document.getElementById('tablebilltotal').innerHTML = document.getElementById('total').innerHTML;
};
var closebill = function (event) {
    var node = document.getElementById('billmain');
    if (node.style.display != undefined) {
        node.style.display = 'none';
    }
};
var closetableempty = function (event) {
    ;
    document.getElementById('tableempty').style.display =
        'none';
};
