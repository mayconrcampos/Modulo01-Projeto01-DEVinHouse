export class Carrinho {
    nome 
    constructor(){
        this.lista = []
        this.ul = document.getElementById("listaItens")
        this.li = document.createElement("li")
        this.btnADD = document.getElementById("btnADD")
        this.nome = document.getElementById("nome")
        this.btnDelItem = document.getElementById("btnDelItem")
        this.btnDelAll = document.getElementById("btnDelAll")
        this.checkbox = document.createElement("input")
        this.checkbox.type = "checkbox"

        this.btnADD.addEventListener("click", () => {
            if(this.nome.value.length > 0){
                var produto = {
                    "nome": this.nome.value,
                    "status": false,
                    "valor": false

                }
                this.addItem(produto)
                this.nome.value = ""
                this.nome.focus()
            }
        })

        this.btnDelAll.addEventListener("click", () => {
            this.deletaTudo()
        })

    }

    addItem(item){
        this.lista.push(item)
        this.carregaLista()
    }

   

    carregaLista(){
        this.ul.innerHTML = ""
        
        this.lista.forEach((item, indice) => {
            const btnDelItem = document.createElement("button")
            btnDelItem.innerHTML = "x"
            btnDelItem.id = "btnDelItem"
            btnDelItem.onclick = () => this.deletaItem(indice)


            const li = document.createElement("li")
            li.id = "lista"
            li.ondblclick = () => this.mudaCheck(item.nome, item.status, item.valor, indice)
            
            li.innerHTML = `<input id="check" type="checkbox" ${item.status ? "checked" : ""} disabled> ${item.nome}`

            li.appendChild(btnDelItem)

            this.ul.appendChild(li)
            
            
        })
        console.log(this.lista)
    }

    mudaCheck(nome, status, valor, i){
        if(status == false){
            console.log("debug"+nome, status, valor, i)
            var produto = {
                "nome": nome,
                "status": "checked",
                "valor": false
            }
            this.lista.splice(i, 1, produto) 
            this.carregaLista()
        }else{
            console.log("debug"+nome, status, valor, i)
            var produto = {
                "nome": nome,
                "status": false,
                "valor": false
            }
            this.lista.splice(i, 1, produto) 
            this.carregaLista()
        }
    }

    deletaItem(indice){
        this.lista.splice(indice, 1)
        this.carregaLista()

    }

    deletaTudo(){
        this.lista = []
        this.carregaLista()
    }

}



