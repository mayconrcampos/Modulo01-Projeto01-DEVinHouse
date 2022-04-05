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
            const li = document.createElement("li")

            li.innerHTML = `<input type="checkbox"> ${item.nome}`
            btnDelItem.innerHTML = "x"

            btnDelItem.onclick = () => this.deletaItem(indice)
            li.appendChild(btnDelItem)

            this.ul.appendChild(li)
            
        })
        console.log(this.lista)
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



