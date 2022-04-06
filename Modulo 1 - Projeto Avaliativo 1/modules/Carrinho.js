export class Carrinho {
    nome 
    totalCompras
    constructor(){
    
        this.totalCompras = 0
        this.lista = []
        this.total = document.getElementById("total")
        this.ul = document.getElementById("listaItens")
        this.btnADD = document.getElementById("btnADD")
        this.nome = document.getElementById("nome")
        this.btnDelItem = document.getElementById("btnDelItem")
        this.btnDelComprados = document.createElement("button")
        this.btnDelComprados.innerHTML = "Excluir Assinalados"
        this.btnDelComprados.id = "btnDelComprados"
        this.btnDelAll = document.getElementById("btnDelAll")
        
        this.body = document.body

        // Criação de Eventos em geral

        // CarregaDB da localstorage ao carregar a página
        this.body.onload = this.carregaDB()

        // Evento para ouvir click e deletar todos os itens já assinalados
        this.btnDelComprados.addEventListener("click", () => {
            this.deletaComprados()
            this.salvaDB()
            this.carregaLista()
        })

        // Evento para ouvir click do botão Inserir
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

        // Evento de click do botão para deletar todos os itens.
        this.btnDelAll.addEventListener("click", () => {
            this.deletaTudo()
            this.salvaDB()
        })

        // Chamada do método carrega lista ao abrir o site.
        this.carregaLista()

    }


    /**
     * Métodos da classe Carrinho
     */

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
        var h2 = document.createElement("h2")

        if(this.lista.length == 0){
            
            this.ul.innerHTML = ""
            h2.innerHTML = "Vazio"
            this.ul.appendChild(h2)

            this.total.innerHTML = this.formataValor(this.totalCompras)
        }else{
            this.ul.innerHTML = ""
            
            h2.innerHTML = "Lista de Compras"

            this.ul.appendChild(h2)
            
            this.lista.forEach((item, indice) => {
                this.totalCompras += item.valor

                

                // Criação da linha
                const linha = document.createElement("div")
                linha.id = "linha"
                
                // Criação da Checkbox
                const checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.id = "check"
                checkbox.checked = item.status ? "checked" : ""

                checkbox.onclick = () => {
                    this.mudaCheck(item.nome, item.status, item.valor, indice)
                    
                }

                // Inserção da checkbox dentro de divcheckbox
                linha.appendChild(checkbox)

                // Criação de uma tag div pra comportar o conteudo de item.nome
                const divItemNome = document.createElement("div")
                divItemNome.id = "divItemNome"
                divItemNome.innerHTML = `${item.nome}`

                // Criação do evento double Click para itemNome
                divItemNome.ondblclick = () => this.mudaCheck(item.nome, item.status, item.valor, indice)

                // Inserção da divItemNome dentro de linha
                linha.appendChild(divItemNome)


                // Criação do button deleta item
                const btnDelItem = document.createElement("button")
                btnDelItem.innerHTML = "x"
                btnDelItem.id = "btnDelItem"

                btnDelItem.onclick = () => {
                    this.deletaItem(indice)
                    this.salvaDB()
                    this.carregaLista()
                }
                
                // Inserção do button dentro de li
                linha.appendChild(btnDelItem)

                // Inserção de li dentro de ul
                this.ul.appendChild(linha)
            
            
            })

            if(this.totalCompras > 0) {
                this.ul.appendChild(this.btnDelComprados)
                this.total.innerHTML = this.formataValor(this.totalCompras)
            }else{
                this.total.innerHTML = this.formataValor(this.totalCompras)
            }
        }
        
    }


    mudaCheck(nome, status, valor, i){
        if(status == false){
            valor = window.prompt("Digite o valor (R$)")
       
            if(!isNaN(valor) && valor > 0){
                var produto = {
                    "nome": nome,
                    "status": "checked",
                    "valor": Number(valor)
                }
                this.lista.splice(i, 1, produto)
                this.salvaDB()
                this.carregaLista()
            }else{
                alert("ERRO! Valor inválido")
            }
            
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
        

    }

    deletaTudo(){
        this.lista = []
        this.carregaLista()
    }

    deletaComprados(){
        for(let i = this.lista.length - 1; i >= 0; i--){
            if(this.lista[i].valor != false){
                this.deletaItem(i)
            }
            
        }

    }

    formataValor(valor){
        var valorFormatado = valor

        return valorFormatado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2});
    }

}



