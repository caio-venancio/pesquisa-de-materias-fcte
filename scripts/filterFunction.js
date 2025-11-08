console.log("iniciando 2")

//inicializações para o script.js
disciplinas = {
    1 : ["Engenharia Aeroespacial","estrutura_aeroespacial"],
    2 : ["Engenharia Automotiva","estrutura_automotiva"],
    3 : ["Engenharia Eletrônica","estrutura_eletronica"],
    4 : ["Engenharia de Energia","estrutura_energia"],
    5 : ["Engenharia de Software","estrutura_software"]
}

materias = {}

//inicializações para o filterFunction.js
pesquisa = {
    seletividade : {
        "Todas": 1,
        "Optativas":0,
        "Obrigatórias":0
    },
    curso : {
        "Todos": 1,
        "Aeroespacial" : 0,
        "Automotiva": 0,
        "Eletrônica": 0,
        "Energia": 0,
        "Software": 0
    },
    barraDePesquisa : [0,""]
}


//funções
function filtragem(value, index, number){ //todo clique vai puxar essa função, e esta função altera pesquisa object

    // console.log(pesquisa[value])

    //selecting all buttons
    let buttons = document.querySelectorAll(".button-value")

    // altera o objeto pesquisa, que é utilizado como filtro
    if(pesquisa[value][index] == 0){
        pesquisa[value][index] = number
    } else {
        pesquisa[value][index] = 0
    }

    //se ativar todos, desativa os outros. Se ativar optativa, não ativa obrigatória.
    if(index == "Todas" && number == 1){
        pesquisa.seletividade["Optativas"] = 0
        pesquisa.seletividade["Obrigatórias"] = 0
    } else if (index == "Optativas" && number == 1){
        pesquisa.seletividade["Todas"] = 0
        pesquisa.seletividade["Obrigatórias"] = 0
    } else if (index == "Obrigatórias" && number == 1){
        pesquisa.seletividade["Todas"] = 0
        pesquisa.seletividade["Optativas"] = 0
    }
    //se desmarcar tudo, liga todos button
    let verify = 0
    for(i in pesquisa.seletividade){
        if(pesquisa.seletividade[i] == 0){
            verify++
        } 
        // console.log(verify, Object.keys(pesquisa.seletividade).length)
        if(verify >= Object.keys(pesquisa.seletividade).length){
            pesquisa.seletividade["Todas"] = 1
            verify = 0
        }
    }


    //se pressionar todos button, desmarca tudo
    if(index == "Todos" && number == 1){
        for(i in pesquisa.curso){
            if(i == "Todos"){
                continue
            }
            pesquisa.curso[i] = 0
        }
    }
    //se pressionar outro, desmarca todos button
    verify = 0
    if(value=="curso" && index != "Todos" && number == 1){
        //se tiver apertado e quiser tirar, tem como tirar, mas tem que deixar pelo menos um. acho melhor virar "todos"
        for(i in pesquisa.curso){
            // console.log(pesquisa.curso[index] == 1, index == i, i == 1)
            if(i == "Todos"){
                pesquisa.curso[i] = 0
            } else if (pesquisa.curso[index] == 1 && index == i && i == 1){
                pesquisa.curso[i] = 0
            } 
        }
    }
    //se apertar todos, equivale a todos
    if(value=="curso" && index != "Todos" && number == 1){
        for(i in pesquisa.curso){
            if (pesquisa.curso[i] == 1){ //consertar toda essa parte que eu marquei KKKK ele tá bugando o todos button
                verify++
            }
            // console.log(verify)
            if(verify >= Object.keys(pesquisa.curso).length - 1){
                pesquisa.curso["Todos"] = 1
                verify = 0
                for(i in pesquisa.curso){
                    if(i != "Todos"){
                        pesquisa.curso[i] = 0
                    }
                }
            }
        }
    }
    //se não marcar nada, marca todos
    verify = 0
    for(i in pesquisa.curso){
        if(pesquisa.curso[i] == 0){
            verify++
        } 
        // console.log(verify, Object.keys(pesquisa.seletividade).length)
        if(verify >= Object.keys(pesquisa.curso).length){
            pesquisa.curso["Todos"] = 1
            verify = 0
        }
    }



    //deixa ativo o que está ativo e deixa inativo o que está inativo
    buttons.forEach((button) => {
        //check if value equals inner text
        if(pesquisa["seletividade"][button.innerText] == 1){
            button.classList.add("active")
        } else if(pesquisa["curso"][button.innerText] == 1){
            button.classList.add("active")
        } else {
            button.classList.remove("active")
        }
    })



    //Seção 3: Alterando pesquisa['barraDePesquisa']
    if(value == 'barraDePesquisa'){
        index = 1
        let searchInput = document.getElementById("search-input").value
        pesquisa['barraDePesquisa'][1] = searchInput
        pesquisa['barraDePesquisa'][0] = 1
        if(searchInput == ""){
            pesquisa['barraDePesquisa'][0] = 0
            index = 0
        }
        // só verificar se tá tudo certo daqui, e passar para filterproduct de barraDePesquisa
    }

    console.log("Entrou em pesquisa:", value, index, pesquisa[value][index])
    //essa função tem que chamar filterProduct no final
    filterProduct(pesquisa)
}






//search: parameter passed from button (Parameter same as category)
function filterProduct({seletividade,curso,barraDePesquisa}){ 

    //primeira fileira
        //select all cards
    let elements = document.querySelectorAll(".card")
        //separe de acordo com pesquisa object
    elements.forEach((element) => {
        if(seletividade.Todas == 1){
            // console.log("yeah")
            element.classList.remove("hide")
        } else if(seletividade.Optativas == 1 && element.classList.contains("Optativa")){
            // console.log("yea")
            element.classList.remove("hide")
        } else if(seletividade.Obrigatórias == 1 && element.classList.contains("Obrigatória")){
            element.classList.remove("hide")
            // console.log("yeh")
        } else {
            // console.log("eh")
            element.classList.add("hide")
        }
    })

    

    //segunda fileira
    let cards = document.querySelectorAll(".card:not(.hide)")
    //se tiver 1 em pesquisa, então tem que aparecer aqui.

    cards.forEach((element) => {
        //como faço para selecionar ex: aeroespacial e optativa? //fazer tudo isso quando eu voltar.
            //for cursos
                //se o curso tiver on e no lugar do seletividade correto, isto é, fazer selecionar os aeroespacial que apareceu na aba optativas.
                    //se a criança do card não corresponder as específicações, mande a braba kkkkkkk 
        // console.log(element.querySelector(".optativo").innerText.split("\n").includes("ENGENHARIA AEROESPACIAL")) //regra especial
        
        if(seletividade.Todas != 1){
            
            let cardsInner
            // console.log(Object.keys(seletividade)[1].toLowerCase().slice(0,-1))
            if(seletividade.Optativas == 1){ //se o alvo é optativo ou obrigatório
                cardsInner = element.querySelector("." + Object.keys(seletividade)[1].slice(0,-1)) //nome da classe onde está a matéria
            } else {
                cardsInner = element.querySelector("." + Object.keys(seletividade)[2].slice(0,-1)) //nome da classe onde está a matéria
            }
            
            // console.log(cardsInner.innerText.includes("ENERGIA"))

            if(curso["Todos"] != 1){ //se for todas, o código é diferente kkk ...ou! Deu bom.
                for(i in curso){
                    // console.log(i, curso[i])
                    if (curso[i] == 1){ 
                        
                        //implementar a regra especial usando cardsInner //estou começando a sentir a falta de eficiência aqui kk
                        if(!cardsInner.innerText.includes(i.toUpperCase())){
                            element.classList.add("hide")
                            // console.log("yay")

                        }
              
                    }
                }
            }
            // (element.querySelector(".Optativa").innerText.includes(i.toUpperCase() || element.querySelector(".Obrigatória").innerText.includes(i.toUpperCase())
        } else if(curso.Todos != 1) {
            for(i in curso){
                // console.log("oi") //oi 1776 
                if(curso[i] == 1){  
                    if(element.querySelector(".Optativa")){ //tá lento hein... EDA realmente é necessário.
                        // console.log(element.querySelector(".Optativa, .Obrigatória"), "yo1")
                        if(element.querySelector(".Optativa").innerText.includes(i.toUpperCase())) {
                            element.classList.remove("hide")
                            continue
                        }
                    }
                    
                    if(element.querySelector(".Obrigatória")){ //tá lento hein... EDA realmente é necessário.
                        // console.log(element.querySelector(".Optativa, .Obrigatória"), "yo2")
                        if(element.querySelector(".Obrigatória").innerText.includes(i.toUpperCase())) {
                            element.classList.remove("hide")
                            continue
                        }
                    } 
                    
                    element.classList.add("hide")
                    // console.log(element.querySelector(".Optativa, .Obrigatória"), "yo3")
                    break
                }
            }
        }
    })
    // console.log(cards[0].querySelector(".optativo").innerText.split("\n").includes("ENGENHARIA AEROESPACIAL"))
    // console.log(cards[0].querySelector(".Optativa").innerText.includes("ENGENHARIA AEROESPACIAL"))
    


    //search bar - terceira condição
    let searches = document.querySelectorAll(".card:not(.hide)")
    let searchInput = document.getElementById("search-input").value

    
    searches.forEach((element) => {
        if(element.innerText.includes(searchInput.toUpperCase())){
            element.classList.remove("hide")
        } else {
            element.classList.add("hide")
        }
    })


    let counterElement = document.querySelectorAll(".card:not(.hide)")
    let counter = 0

    counterElement.forEach((element) => {
        counter++
    })

    let resultados = document.querySelector(".results-number")
    resultados.innerText = " " + counter
}

console.log("terminando 2")


let counter = 0

function easterEgg(){

    let easter_egg_image = document.createElement('img')
    easter_egg_image.classList.add('image-normalizer')
    easter_egg_image.setAttribute('src', '/images/smug.png')

    let elemento = document.querySelector(".text2-footer")
    if(counter >= 10) {
        elemento.appendChild(easter_egg_image)
        counter = -1
    } else if( counter>-1) {
        counter++
    }
}


