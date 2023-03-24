function getpagedata(pageload) {
    fetch('./restaurant.json')
        .then((results) => results.json())
        .then((data) => {
            var temp = data
            if (sessionStorage.getItem('menuCardList') == null) {
                sessionStorage.setItem(
                    'menuCardList',
                    JSON.stringify(temp.menuCardList)
                )
            }
            if (sessionStorage.getItem('tableCardList') == null) {
                sessionStorage.setItem(
                    'tableCardList',
                    JSON.stringify(temp.tableCardList)
                )
            }
            pageload()
        })
}
getpagedata(pageload)

function pageload() {
    //storing for table
    let tableCardList = JSON.parse(sessionStorage.getItem('tableCardList')!)
    const tableCards = document.getElementById('Table-list') as HTMLElement
    const tableCardData = tableCardList.map((tableCard) => {
        return `
        <div class='table-card' id=${
            tableCard.id
        } ondragover="dragover(event)" ondrop="drop(event)" onclick="showmodal(event)">
        <h2 class="table-card-title drop" >Table ${tableCard.id}</h2>
        <p class="table-card-para drop">Total cost: <span id=${
            tableCard.id.toString() + 'c'
        }>${tableCard.tableTotal}</span></p>
        </div>
        `
    })
    tableCards.innerHTML = tableCardData.join('')

    let MenuCardList = JSON.parse(sessionStorage.getItem('menuCardList')!)
    const menucards = document.getElementById('Menu-list') as HTMLElement
    const menucarddata = MenuCardList.map((menuCard) => {
        return `
        <div class='menu-card' id=${menuCard.id} draggable='true' ondragstart="drag(event)">
        <h2 attr-key=${menuCard.id}>${menuCard.name}</h2>
        <p attr-key=${menuCard.id}>Total cost: <span id="total-cost" attr-key=${menuCard.id}>${menuCard.cost}</span></p>
        <p attr-key=${menuCard.id}>Item type: <span id="item-type" attr-key=${menuCard.id}>${menuCard.type}</span></p>
        </div>
        `
    })
    menucards.innerHTML = menucarddata.join('')
    window.onclick = function (event) {
        if (event.target.id == 'mainmodal') {
            ;(
                document.getElementById('mainmodal') as HTMLElement
            ).style.display = 'none'
            for (let tabno = 0; tabno < 3; tabno++) {
                ;(
                    document.getElementById(
                        (tabno + 1).toString()
                    ) as HTMLElement
                ).style.backgroundColor = 'white'
            }
        }
        if (event.target.id == 'billmain') {
            ;(
                document.getElementById('billmain') as HTMLElement
            ).style.display = 'none'
        }
        if (event.target.id == 'tableempty') {
            ;(
                document.getElementById('tableempty') as HTMLElement
            ).style.display = 'none'
        }
    }
}
function menusearch(e: Event) {
    if (e.target != null) {
        var element = e.target as HTMLInputElement
        var currsearch = element.value.toLowerCase().trim()
    }
    //getting menu cards
    const menuCards = document.querySelectorAll('.menu-card')
    menuCards.forEach((card) => {
        let cardelement = card as HTMLElement
        const cardName = card.children[0].textContent?.toLowerCase()
        const itemType = card.children[2].children[0].textContent?.toLowerCase()
        //console.log(cardName,itemType,"check on console",currsearch)
        if (cardName?.includes(currsearch) || itemType?.includes(currsearch)) {
            cardelement.style.display = 'block'
        } else {
            cardelement.style.display = 'none'
        }
    })
}
function tablesearch(e: Event) {
    if (e.target != null) {
        var element = e.target as HTMLInputElement
        var currsearch = element.value.toLowerCase()
    }
    //getting menu cards
    const tableCards = document.querySelectorAll('.table-card')
    tableCards.forEach((card) => {
        let cardelement = card as HTMLElement
        const cardName = card.children[0].textContent?.toLowerCase()
        //console.log(cardName,"check on console",currsearch)
        if (cardName?.includes(currsearch)) {
            cardelement.style.display = 'block'
        } else {
            cardelement.style.display = 'none'
        }
    })
}
const drag = (event) => {
    console.log('menu card is dragged')
    ;(event as DragEvent).dataTransfer?.setData(
        'iddata',
        (event.currentTarget as Element).id
    )
}
const dragover = (event) => {
    console.log('dragg over')
    event.preventDefault()
}
const drop = (event) => {
    console.log('drop')
    let menuCardIndex = parseInt(event.dataTransfer.getData('iddata')) - 1
    let tableCardIndex = parseInt(event.currentTarget.id) - 1
    let tableCardList = JSON.parse(sessionStorage.getItem('tableCardList')!)
    let MenuCardList = JSON.parse(sessionStorage.getItem('menuCardList')!)
    var temp = MenuCardList[menuCardIndex]
    var flag = true
    const currItems = tableCardList[tableCardIndex].tableItems
    for (let i = 0; i < currItems.length; i++) {
        if (currItems[i][0] == temp.name) {
            flag = false
            currItems[i][2] += 1
            tableCardList[tableCardIndex].tableTotal += temp.cost
            break
        }
    }
    if (flag) {
        const newItem = [temp.name, temp.cost, 1]
        tableCardList[tableCardIndex].tableTotal += temp.cost
        currItems.push(newItem)
    }
    ;(
        document.getElementById(
            (tableCardIndex + 1).toString() + 'c'
        ) as HTMLElement
    ).innerHTML = tableCardList[tableCardIndex].tableTotal
    tableCardList[tableCardIndex].tableItems = currItems
    sessionStorage.setItem('tableCardList', JSON.stringify(tableCardList))
}
const showmodal = (event) => {
    //window.alert(event.currentTarget.id)
    let currTableId = event.currentTarget.id
    let total = (document.getElementById(currTableId + 'c') as HTMLElement)
        .innerHTML
    console.log(currTableId, 9999999, total)
    if (total == '0') {
        ;(document.getElementById('tableempty') as HTMLElement).style.display =
            'block'
    } else {
        ;(
            document.getElementById(currTableId) as HTMLElement
        ).style.backgroundColor = '#ffc61a'
        const modalnode = document.getElementById('mainmodal') as HTMLElement
        if (modalnode.style.display != undefined) {
            modalnode.style.display = 'block'
        }
        tablebodyreload(currTableId)
    }
}
const tablebodyreload = (currTableId) => {
    ;(document.getElementById('total') as HTMLElement).innerHTML = (
        document.getElementById(currTableId + 'c') as HTMLElement
    ).innerHTML
    ;(document.getElementById('tablenomodal') as HTMLElement).innerHTML =
        currTableId

    let tableCardList = JSON.parse(sessionStorage.getItem('tableCardList')!)
    let traverse = tableCardList[parseInt(currTableId) - 1].tableItems
    console.log(traverse)
    let parent = document.getElementById('billbody')
    ;(document.getElementById('billbody') as HTMLElement).innerHTML = null!
    let tabno = parseInt(currTableId) - 1
    for (let i = 0; i < traverse.length; i++) {
        console.log('11111', traverse[i][0])
        let chil = document.createElement('tr')
        let txt = `
            <td>${i + 1}</td>
            <td>${traverse[i][0]}</td>
            <td>${traverse[i][1]}</td>
            <td>
                <p>No of servings</p>
                <input type="number" id=${
                    traverse[i][0] + 'c'
                } onchange="inputbutton(event,${tabno})" style="width:80%;padding:1%;" value=${
            traverse[i][2]
        }>
            </td>
            <td><i id=${
                traverse[i][0] + 'd'
            } class="far fa-trash-alt ievent" onclick=deletebutton(event,${tabno}) style="font-size:150%;float:right;"></i></td>
            `
        chil.innerHTML = txt
        parent?.appendChild(chil)
    }
    const closenode = document.getElementById('closesession') as HTMLElement
    closenode.addEventListener('click', (event) => {
        closesession(event)
    })
}
const inputbutton = (event, tabno) => {
    let name = event.currentTarget.id.slice(0, -1)
    // console.log(cost, tabno, name)
    let qty = (
        document.getElementById(event.currentTarget.id) as HTMLInputElement
    ).value
    console.log(qty)
    let tableCardList = JSON.parse(sessionStorage.getItem('tableCardList')!)
    let currTableItems = tableCardList[tabno].tableItems
    for (let i = 0; i < currTableItems.length; i++) {
        console.log(currTableItems[i][0], '00000000', name)
        if (currTableItems[i][0] == name) {
            currTableItems[i][2] = qty
            console.log('modified')
            break
        }
    }
    tableCardList[tabno].tableItems = currTableItems
    let newt = 0
    for (let i = 0; i < currTableItems.length; i++) {
        newt += currTableItems[i][2] * currTableItems[i][1]
    }
    console.log('new ttt', newt)
    tableCardList[tabno].tableTotal = newt
    ;(document.getElementById('total') as HTMLElement).innerHTML =
        newt.toString()
    ;(
        document.getElementById((tabno + 1).toString() + 'c') as HTMLElement
    ).innerHTML = newt.toString()
    sessionStorage.setItem('tableCardList', JSON.stringify(tableCardList))
}
const deletebutton = (event, tabno) => {
    let item = event.currentTarget.id.slice(0, -1)
    console.log(event.currentTarget.id.slice(0, -1))
    console.log(tabno, 'readyyyyyy')
    let tableCardList = JSON.parse(sessionStorage.getItem('tableCardList')!)
    console.log(tableCardList[tabno].tableItems)
    let a = tableCardList[tabno].tableItems
    let index = -1
    let total = 0
    for (let x = 0; x < a.length; x++) {
        if (a[x][0] == item) {
            index = x
        } else {
            total += a[x][1] * a[x][2]
        }
    }
    console.log('new total', total)
    ;(document.getElementById('total') as HTMLElement).innerHTML =
        total.toString()
    ;(
        document.getElementById((tabno + 1).toString() + 'c') as HTMLElement
    ).innerHTML = total.toString()
    if (index != -1) {
        console.log(a[index])
        a.splice(index, 1)
        tableCardList[tabno].tableItems = a
        tableCardList[tabno].tableTotal = total
        sessionStorage.setItem('tableCardList', JSON.stringify(tableCardList))
        tablebodyreload((tabno + 1).toString())
    }
}
const closemodal = (event) => {
    const modalnode = document.getElementById('mainmodal') as HTMLElement
    if (modalnode.style.display != undefined) {
        modalnode.style.display = 'none'
    }
    for (let tabno = 1; tabno <= 3; tabno++) {
        ;(
            document.getElementById(tabno.toString()) as HTMLElement
        ).style.backgroundColor = 'white'
    }
}
const closesession = (event) => {
    let tabid = (document.getElementById('tablenomodal') as HTMLElement)
        .innerHTML
    console.log(event.currentTarget)
    console.log(tabid)
    let tableCardList = JSON.parse(sessionStorage.getItem('tableCardList')!)
    let tableindex = parseInt(tabid) - 1
    tableCardList[tableindex].tableItems = []
    tableCardList[tableindex].tableTotal = 0
    ;(document.getElementById(tabid + 'c') as HTMLElement).innerHTML = '0'
    sessionStorage.setItem('tableCardList', JSON.stringify(tableCardList))
    const node = document.getElementById('billmain') as HTMLElement
    if (node.style.display != undefined) {
        node.style.display = 'block'
    }
    closemodal(event)
    ;(document.getElementById('closebillno') as HTMLElement).innerHTML = tabid
    ;(document.getElementById('tablebilltotal') as HTMLElement).innerHTML = (
        document.getElementById('total') as HTMLElement
    ).innerHTML
}
const closebill = (event) => {
    const node = document.getElementById('billmain') as HTMLElement
    if (node.style.display != undefined) {
        node.style.display = 'none'
    }
}
const closetableempty = (event) => {
    ;(document.getElementById('tableempty') as HTMLElement).style.display =
        'none'
}
