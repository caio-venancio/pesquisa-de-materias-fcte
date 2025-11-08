console.log("iniciando 1")

// //Carregar .json para cá
// import data from './data/estru_auto.json' with {type: 'json'} //Solução com ES6, suportado por 95% dos browsers //é seguro (?)
// console.log(data) //assert is being deprecated, using "with"
// Pesquisar mais sobre dynamic imports

//function async way
// //fetch api way 
async function getData(string){
    const response = await fetch('./data/' + string + '.json') 
    return response.json()
}



for(let i = 1; i<6; i++){

const data = await getData(disciplinas[i][1]);
// console.log(data)
// console.log(data[0])

for (let i of data){

    //verificar se o card já existe 
    if(i.Código in materias){
        materias[i.Código].push(i.Curso)
        let curso = document.createElement("h6")
        curso.classList.add("product-codigo")
        curso.innerText = i.Curso.toUpperCase() 

        const cardCerto = document.querySelectorAll(".card." + i.Código)
        

        if(i.Obrigatoriedade == "Obrigatória"){
            const containerCerto = document.querySelectorAll("."+i.Código + " .Obrigatória");
            containerCerto[0].appendChild(curso)
            containerCerto[0].classList.remove("hide")

            if(!cardCerto[0].classList.contains("Obrigatória")){
                cardCerto[0].classList.add("Obrigatória")
            } 


        } else {
            const containerCerto = document.querySelectorAll("."+i.Código + " .Optativa");
            containerCerto[0].appendChild(curso)
            containerCerto[0].classList.remove("hide")

            if(!cardCerto[0].classList.contains("Optativa")){
                cardCerto[0].classList.add("Optativa")
            } 
        }
    
    } else {
        //cadastrando uma nova matéria na lista de matérias
        materias[i.Código] = [i.Curso]
    

    //creating card
    let card = document.createElement("div")                                             //div created
    //card should have category and should stay hidden
    card.classList.add("card", i.Código, i.Obrigatoriedade)

    //container //para mim, é só mais um div para absorver product name
    let container = document.createElement("div")                                          //div created, class container
    container.classList.add("container")

    //Código da matéria h4?
    let codigo = document.createElement("h4")
    codigo.classList.add("product-codigo")
    codigo.innerText = i.Código.toUpperCase()
    container.appendChild(codigo)
    container.classList.add(i.Código)

    //nome da matéria
    let name = document.createElement("h5")
    name.classList.add("product-name")
    name.innerText = i.Nome.toUpperCase()
    container.appendChild(name)
    
    //horas/créditos h6?
    let horas = document.createElement("h6")                                               
    horas.classList.add("product-horas")
    horas.innerText = (i.Horas.toUpperCase() + " - " + Number(i.Horas.slice(0,-1))/15 + " crédito(s)")
    container.appendChild(horas)

    //div created para disciplinas obrigatorias
    let obrigatorio = document.createElement("div")
    obrigatorio.classList.add("Obrigatória")
    obrigatorio.classList.add("hide")

    //div created para disciplinas optativas
    let optativo = document.createElement("div")
    optativo.classList.add("Optativa")
    optativo.classList.add("hide")

    //H5 tag para div de opcionais
    let opcional = document.createElement("h5")
    opcional.classList.add("product-obrigatoriedade")
    opcional.innerText = "Optativa".toUpperCase()
    optativo.appendChild(opcional)

    //H5 tag para div de obrigatorias
    let obrigado = document.createElement("h5")
    obrigado.classList.add("product-obrigatoriedade")
    obrigado.innerText = "Obrigatória".toUpperCase()
    obrigatorio.appendChild(obrigado)
 
    //Curso
    let curso = document.createElement("h6")
    curso.classList.add("produto-curso")
    curso.innerText = i.Curso.toUpperCase()

    if(i.Obrigatoriedade == "Obrigatória"){
        obrigatorio.appendChild(curso)
        obrigatorio.classList.remove("hide")
        // card.classList.add("Obrigatória")
    
    } else {
        optativo.appendChild(curso)
        optativo.classList.remove("hide")
        // card.classList.add("Optativa")
    }

    // criando div para nível
    let niveldiv = document.createElement("div")
    niveldiv.classList.add("nivel-div")

    // span para número do ível
    let nivelspan = document.createElement("span")

    // h4 tag para nome do nível
    let nivel = document.createElement("h4")
    nivel.classList.add("class-nivel")
    nivel.innerText = ""

    let linksigaa = document.createElement("h5")
    linksigaa.innerText = ""

    let nestednivel = document.createElement("div")
    nestednivel.classList.add("nested-nivel")
    
    if(i.Nível != "N/A"){
        nivel.classList.remove("hide")
        nivelspan.innerText = i.Nível
    } else {
        nestednivel.classList.add("hide")
        nivel.classList.add("hide")
    }

    //tag para colocar 

    //div para colocar corequisitos e pré-requisitos
    let divRequisitos = document.createElement("div")
    divRequisitos.classList.add("requisitos-div")

    let coRequisito = document.createElement('h5')
    //se tiver corequisito, colocar
    if(i["Co-Requisitos"] != '-'){
        coRequisito.innerText = 'Co-Requisitos: ' + i["Co-Requisitos"].replace(/\(/gi,"").replace(/\)/gi,"").trim()
        nestednivel.classList.remove("hide")
    }

    let preRequisito = document.createElement('h5')
    //se tiver prerequisito, colocar
    if(i["Pré-Requisitos"] != '-'){
        preRequisito.innerText = 'Pré-Requisitos: ' + i["Pré-Requisitos"].replace(/\(/gi,"").replace(/\)/gi,"").trim()
        nestednivel.classList.remove("hide")
    }

    //colocando todos os divs e tags
    nivel.appendChild(nivelspan)
    nestednivel.appendChild(nivel)
    nestednivel.appendChild(linksigaa)
    nestednivel.appendChild(coRequisito)
    nestednivel.appendChild(preRequisito)
    niveldiv.appendChild(nestednivel)
    container.appendChild(obrigatorio)
    container.appendChild(optativo)

    card.appendChild(container)
    card.appendChild(niveldiv)
    document.getElementById("products").appendChild(card)
    }

    }
}

console.log("terminando 1")

//removendo divs vazios
const emptyDivobrigatorio = document.querySelectorAll(".Obrigatória.hide")
emptyDivobrigatorio.forEach((element) => {
    element.remove()
})

const emptyDivoptativo = document.querySelectorAll(".Optativa.hide")
emptyDivoptativo.forEach((element) => {
    element.remove()
})

// console.log(materias)
filterProduct(pesquisa)











