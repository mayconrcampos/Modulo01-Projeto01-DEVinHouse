export class Produto {
    #_nome 
    #_valor
    #_checked
    #_listaCompra
    constructor(){
        this.nome = false 
        this.#_valor = false
        this.#_listaCompra = []
        this.botao_add = document.getElementById("btnAdd")
        this.btnDeleteAll = document.getElementById("btnDelAll")
        
        this.inputNome = document.getElementById("nomeProduto")
        this.ul = document.getElementById("ul")

        this.botao_add.addEventListener("click", () => {
            if(this.inputNome.value.length > 0){
                this.addLista(this.inputNome.value)
                this.carregaLista()
                this.inputNome.value = ""
                this.inputNome.focus()
            }else{
                alert("ERRO! É preciso preencher o campo.")
            }
        })

        this.btnDeleteAll.addEventListener("click", () => this.deleteAll())
    }

    set nome(nome){
        this.#_nome = nome 
    }
    get nome(){
        return this.#_nome
    }

    set checked(checked){
        this.#_checked = checked
    }
    get checked(){
        return this.#_checked
    }

    addLista(nome){
        this.#_listaCompra.push({
            "nome": nome,
            "valor": this.#_valor,
            "checked": false
        })
    }

    carregaLista(){
        this.ul.innerHTML = ""
        this.#_listaCompra.forEach((item, indice) => {
            this.ul.innerHTML += `<li><input type="checkbox" id="checked"> ${item.nome} <button onclick="this.deletaUM(${indice})">x</button></li>`
        })
    }

    listarTudo(){
        this.#_listaCompra.forEach((item, indice) => {
            console.log(item, indice)
        })
    }

    deleteAll(){
        this.#_listaCompra = []
        this.carregaLista()
    }

    deletaUM(indice){
    
        this.#_listaCompra.splice(indice, 1)
        this.carregaLista()
    }

}


var prod = new Produto()