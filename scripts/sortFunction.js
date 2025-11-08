let produtos = document.querySelector("#products")

function sortAlphabetically() {
    let elementos = produtos.childNodes
    // console.log(elementos)
    const nodeList = []
    const textList = []
    elementos.forEach(elem => {
        textList.push(elem.childNodes[0].childNodes[1].innerText)
        textList.sort()
        nodeList.splice(textList.indexOf(elem.childNodes[0].childNodes[1].innerText), 0, elem)
    });

    const reference = nodeList[nodeList.length]

    nodeList.forEach(node => {
        // console.log(node, document.querySelector("#products").lastChild)
        produtos.insertBefore(node, reference)
    })

    clicked('alpha')
}

function sortCode() {
    let elementos = produtos.childNodes
    const nodeList = []
    const textList = []
    elementos.forEach(elem => {
        textList.push(elem.childNodes[0].childNodes[0].innerText)
        textList.sort(sorting)
        nodeList.splice(textList.indexOf(elem.childNodes[0].childNodes[0].innerText), 0, elem)
    });

    const reference = nodeList[nodeList.length]

    nodeList.forEach(node => {
        // console.log(node, document.querySelector("#products").lastChild)
        produtos.insertBefore(node, reference)
    })

    clicked('code')
}

function sortLevel() {
    let elementos = produtos.childNodes
    const nodeList = []
    const textList = []
    const noList = []
    elementos.forEach(elem => {
        // console.log(elem.childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText.length, elem)
        if(elem.childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText.length > 1){
            if(elem.childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText != '10º Nível'){
                textList.push('0'+elem.childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText)
                textList.sort() //consertar aqui
                nodeList.splice(textList.indexOf('0'+elem.childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText), 0, elem)
            } else {
                textList.push(elem.childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText)
                textList.sort() //consertar aqui
                nodeList.splice(textList.indexOf(elem.childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText), 0, elem)
            }
        } else {
            noList.push(elem)
        }
    });

    console.log(textList)

    // console.log(noList, nodeList)

    nodeList.push.apply(nodeList, noList)
    // console.log(nodeList)
    
    const reference = nodeList[nodeList.length]
    // console.log(reference)

    nodeList.forEach(node => {
        // console.log(node, reference)
        console.log(reference)
        produtos.insertBefore(node, reference)
    })

    clicked('fluxo')
}

function sortRandom() {
    let elementos = produtos.childNodes
    const nodeList = []
    elementos.forEach(elem => {
        if(Math.floor(Math.random()* 10) < 5){
            nodeList.push(elem)
        } else {
            nodeList.unshift(elem)
        }
    });

    const reference = nodeList[nodeList.length]

    nodeList.forEach(node => {
        produtos.insertBefore(node, reference)
    })

    clicked('alea')
}

function clicked(args){
    console.log('clicked')
}

