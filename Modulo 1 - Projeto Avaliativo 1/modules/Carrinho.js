export class Carrinho {
    nome 
    totalCompras
    constructor(){
        this.totalCompras = 0
        this.lista = []
        this.total = document.getElementById("total")
        this.ul = document.getElementById("listaItens")
        this.li = document.createElement("li")
        this.btnADD = document.getElementById("btnADD")
        this.nome = document.getElementById("nome")
        this.btnDelItem = document.getElementById("btnDelItem")
        this.btnDelAll = document.getElementById("btnDelAll")
        this.checkbox = document.createElement("input")
        this.checkbox.type = "checkbox"
        this.body = document.body

        this.body.onload = this.carregaDB()

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
            this.salvaDB()

        })

    }

    addItem(item){
        this.lista.push(item)
        this.salvaDB()
        this.carregaLista()
    }

    salvaDB(){
        if(this.lista.length >= 0){
            var dados = JSON.stringify(this.lista)
            localStorage.setItem("carrinho", dados)
        }
        
    }

    carregaDB(){
        
        var dados = localStorage.getItem("carrinho")
        console.log(dados)
        dados = JSON.parse(dados)
        if(dados.length > 0){
            for (let index = 0; index < dados.length; index++) {
                this.lista.push(dados[index])
            }
            
            this.carregaLista()
            
        }else{
            alert("ERRO! Não há itens salvos no DB")
        }
    }
   

    carregaLista(){
        this.totalCompras = 0
        if(this.lista.length == 0){
            this.ul.style.display = "none"
        }else{
            this.ul.innerHTML = ""
            

            this.lista.forEach((item, indice) => {
                this.totalCompras += item.valor
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
            if(this.totalCompras > 0) {
                this.total.innerHTML = "Total (R$)"+this.totalCompras.toFixed(2)
            }
        }
        
    }

    mudaCheck(nome, status, valor, i){
        if(status == false){
            console.log("debug"+nome, status, valor, i)
            valor = window.prompt("Digite o valor (R$)")
            var produto = {
                "nome": nome,
                "status": "checked",
                "valor": Number(valor)
            }
            this.lista.splice(i, 1, produto)
            this.salvaDB()
            this.carregaLista()
        }else{
            console.log("debug"+nome, status, valor, i)
            var produto = {
                "nome": nome,
                "status": false,
                "valor": false
            }
            this.lista.splice(i, 1, produto) 
            this.salvaDB()
            this.carregaLista()
        }
    }

    deletaItem(indice){
        this.lista.splice(indice, 1)
        this.salvaDB()
        this.carregaLista()

    }

    deletaTudo(){
        this.lista = []
        this.carregaLista()
    }

}



