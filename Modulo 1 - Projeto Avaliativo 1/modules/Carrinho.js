export class Carrinho {
    nome 
    totalCompras
    constructor(){
        // Pegando elementos existentes na DOM
        this.totalCompras = 0
        this.lista = []
        this.total = document.getElementById("total")
        this.divTotalCompras = document.getElementById("divTotalCompras")
        this.ul = document.getElementById("listaItens")
        this.btnADD = document.getElementById("btnADD")
        this.btnDelAll = document.getElementById("btnDelAll")
        this.logo = document.getElementById("logo")
        this.nome = document.getElementById("nome")
        this.btnDelItem = document.getElementById("btnDelItem")

        // Adicionando titles aos botões
        this.btnADD.title = "Clique aqui para adicionar Item"
        this.btnDelAll.title = "Clique aqui para esvaziar a lista de compras"
        

        // Criando elemento button
        this.btnDelComprados = document.createElement("button")
        this.btnDelComprados.innerHTML = "Excluir Assinalados"
        this.btnDelComprados.id = "btnDelComprados"
        this.btnDelComprados.title = "Deletar somente itens assinalados"
        
        // atribuindo document.body a this.body
        this.body = document.body

        /**
         * 
         *  Criação de Eventos em geral
         * 
         */

        // Carrega dados da localstorage ao carregar a página
        this.body.onload = this.carregaDB()

        // Evento para capturar resize de window para ajustar tamanho de texto total de compras.
        window.onresize = (e) => {
            if(e.target.innerWidth <= 960){
                this.divTotalCompras.style.fontSize = "smaller"
                this.divTotalCompras.style.marginTop = "100px"
                this.btnADD.style.width = "75px"
                this.btnADD.style.fontSize = "small"
                this.btnADD.style.height = "50px"
                this.btnDelAll.style.width = "95px"
                this.btnDelAll.style.fontSize = "xx-small"
                this.btnDelAll.style.height = "50px"
                this.logo.style.width = "150px"
                this.logo.style.height = "50px"
            }else{
                this.divTotalCompras.style.fontSize = "xx-large"
                this.divTotalCompras.style.marginTop = "10px"
                this.btnADD.style.width = "150px"
                this.btnADD.style.fontSize = "large"
                this.btnDelAll.style.width = "200px"
                this.btnDelAll.style.fontSize = "large"
                this.logo.style.width = "300px"
                this.logo.style.height = "80px"
            }
        }

        // Evento para ouvir click e deletar todos os itens já assinalados
        this.btnDelComprados.addEventListener("click", () => {
            let confirma = confirm("Deseja mesmo excluir os assinalados?")
            if(confirma){
                this.deletaComprados()
                this.salvaDB()
                this.carregaLista()
            }
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

        // Evento de click para deletar todos os itens.
        this.btnDelAll.addEventListener("click", () => {
            let confirma = confirm("Deseja mesmo excluir todos os itens da lista?")
            if(confirma){
                this.deletaTudo()
                this.salvaDB()
            }
        })

        /**
         * A chamada deste método só vai servir pra quando carregar a página com localStorage vazio.
         * Ele irá inicializar a lista com o texto escrito: "Vazio" e o total de Compras: "R$ 0,00"
         */
        this.carregaLista()
    }


    /**
     * 
     * Métodos da classe Carrinho
     * 
     */


    // Adiciona Item no Array de itens

    addItem(item){
        this.lista.push(item)
        this.salvaDB()
        this.carregaLista()
    }

    // Salva array na localStorage
    salvaDB(){
        if(this.lista.length >= 0){
            var dados = JSON.stringify(this.lista)
            localStorage.setItem("carrinho", dados)
        }
        
    }

    // Carrega conteudo da localStorage para array de itens
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
   
    // Carrega lista de itens na tela
    carregaLista(){
        this.totalCompras = 0
        var h2 = document.createElement("h2")

        // Se array de itens estiver vazio
        if(this.lista.length == 0){
            this.ul.innerHTML = ""
            h2.innerHTML = "Vazio"
            this.ul.appendChild(h2)

            this.total.innerHTML = this.formataValor(this.totalCompras)

        // Se array de itens não estiver vazio
        }else{
            this.ul.innerHTML = ""
            
            h2.innerHTML = "Lista de Compras"

            this.ul.appendChild(h2)
            
            // Geração da lista de itens na tela
            this.lista.forEach((item, indice) => {
                this.totalCompras += item.valor

                // Criação da linha
                const linha = document.createElement("div")
                linha.id = "linha"
                
           
                // 1º Elemento -  Criando uma div pra substituir checkbox
                const divDoCheckBox = document.createElement("div")

                divDoCheckBox.id = "divDoCheckBox"
                divDoCheckBox.title = "Clique para colocar o preço e assinalar item"

                divDoCheckBox.onclick = () => {
                    this.mudaCheck(item.nome, item.status, item.valor, indice)
                }

                // Criando imagem pra substituir a checkbox
                const imgCheck = document.createElement("img")
                imgCheck.id = "imgCheck"

                imgCheck.src = item.status ? "./img/checked.png" : "./img/notchecked.png"

                divDoCheckBox.appendChild(imgCheck)

                // Inserção da checkbox dentro de divcheckbox
                linha.appendChild(divDoCheckBox)

                // 2º elemento - Criação de uma tag div pra comportar o conteudo de item.nome
                const divItemNome = document.createElement("div")
                divItemNome.id = "divItemNome"
                divItemNome.innerHTML = `${item.nome}`
                divItemNome.title = `Clique duas vezes para colocar o preço e assinalar item.`
                divItemNome.style.textDecoration = item.status ? "line-through" : ""

                // Criação do evento double Click para itemNome
                divItemNome.ondblclick = () => this.mudaCheck(item.nome, item.status, item.valor, indice)

                // Inserção da divItemNome dentro de linha
                linha.appendChild(divItemNome)


                // 3º elemento - Criação do button deleta item
                const btnDelItem = document.createElement("button")
                btnDelItem.innerHTML = "x"
                btnDelItem.id = "btnDelItem"
                btnDelItem.title = `Deletar ${item.nome}`

                btnDelItem.onclick = () => {
                    let confirma = confirm(`Deseja deletar ${item.nome}`)
                    if(confirma){
                        this.deletaItem(indice)
                        this.salvaDB()
                        this.carregaLista()
                    }
                    
                }
                
                // Inserção do button dentro de li
                linha.appendChild(btnDelItem)

                // Inserção de li dentro de ul
                this.ul.appendChild(linha)
            
            
            })
            // Se total de compras for maior que zero, é inserido o botão deleta itens assinalados.
            if(this.totalCompras > 0) {
                this.ul.appendChild(this.btnDelComprados)
                this.total.innerHTML = this.formataValor(this.totalCompras)
            
            // Senão apenas imprime total R$0,00 na tela.
            }else{
                this.total.innerHTML = this.formataValor(this.totalCompras)
            }
        }
        
    }

    // Modifica valor de item = status e valor
    mudaCheck(nome, status, valor, i){
        // Se status for igual false (explícito)
        if(status == false){
            valor = window.prompt("Digite o valor (R$)")
       
            if(!isNaN(valor) && valor > 0){
                var produto = {
                    "nome": nome,
                    "status": true,
                    "valor": Number(valor)
                }
                // Muda-se valores do item.
                this.lista.splice(i, 1, produto)
                this.salvaDB()
                this.carregaLista()
            }else{
                alert("ERRO! Valor inválido")
            }
            
        }else{
            // Se status for diferente de false, é setado false para status e valor.
            var produto = {
                "nome": nome,
                "status": false,
                "valor": false
            }
            // Muda-se valores do item
            this.lista.splice(i, 1, produto) 
            this.salvaDB()
            this.carregaLista()
        }
    }

    // deleta item de array de itens
    deletaItem(indice){
        this.lista.splice(indice, 1)
    }

    // Esvazia array de itens
    deletaTudo(){
        this.lista = []
        this.carregaLista()
    }

    // Deleta somente itens do array de itens cujos valores são diferentes de false
    deletaComprados(){
        // Laço for iterando lista de itens do último para primeiro elemento.
        for(let i = this.lista.length - 1; i >= 0; i--){
            if(this.lista[i].valor != false){
                this.deletaItem(i)
            }
        }
    }

    // Formata string para valor monetário
    formataValor(valor){
        var valorFormatado = valor

        return valorFormatado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2});
    }
}
