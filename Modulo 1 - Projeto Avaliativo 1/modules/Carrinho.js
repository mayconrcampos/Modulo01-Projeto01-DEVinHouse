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
            // Aqui tá a merda toda

            
        })
    }

    deletaItem(indice){
        this.lista.splice(indice, 1)

    }

    deletaTudo(){
        this.lista = []
        this.carregaLista()
    }

}

var carrinho = new Carrinho()

