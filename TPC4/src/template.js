class Template{


    constructor() {}

    errorPage(){

        return `
<!DOCTYPE html>
<html">
    <head>
        <meta charset="UTF-8"/>
        <link rel="icon" href="favicon.ico"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Error</title>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Página não identificada</h1>
            </header>
        </div>
        <a href="/" style="text-decoration: none;">
            <button class="w3-button w3-block w3-red">
                Volar
            </button>
        </a>
        <footer class="w3-container w3-teal">
            <h5>Criado por Diogo Marques</h5>
        </footer>
    </body>
</html>`
    }

    initialPage(){
        
        return `
<!DOCTYPE html>
<html">
    <head>
        <meta charset="UTF-8"/>
        <link rel="icon" href="favicon.ico"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Página Inicial</title>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Música Clássica</h1>
            </header>
        </div>
        <a href="/periodos" style="text-decoration: none;">
            <button class="w3-button w3-block w3-sand w3-padding-large">
                <h3>Períodos</h3>
            </button>
        <a href="/compositores" style="text-decoration: none;">
            <button class="w3-button w3-block w3-sand w3-padding-large">
                <h3>Compositores</h3>
            </button>
        </a>
    </a>
        <footer class="w3-container w3-teal">
            <h5>Criado por Diogo Marques</h5>
        </footer>
    </body>
</html>`
    }

    compositoresPage(title,compositores,voltar){

        let text =`
<!DOCTYPE html>
<html">
    <head>
        <meta charset="UTF-8"/>
        <link rel="icon" href="favicon.ico"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Compositores</title>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>${title}</h1>
            </header>
        </div>
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                    <th>Nome</th>
                    <th>Período</th>
                    <th>Informação</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>`

        compositores.forEach(compositor => {
            text +=`
                <tr>
                    <td>${compositor.nome}</td>
                    <td>${compositor.periodo}</td>
                    <td>
                        <a href="/compositores/${compositor.id}">
                            <button class="w3-button w3-circle w3-grey">
                                <img src="info-lg.svg">
                            </button>
                        </a>
                    </td>
                    <td>
                        <a href="/compositores/edit/${compositor.id}">
                            <button class="w3-button w3-circle w3-grey">
                                <img src="pencil-fill.svg">
                            </button>
                        </a>
                    </td>
                    <td>
                        <a href="/compositores/delete/${compositor.id}">
                            <button class="w3-button w3-circle w3-grey">
                                <img src="trash3-fill.svg">
                            </button>
                        </a>
                    </td>
                </tr>`
        });

        text += `
            </table>
        </div>
        <a href="${voltar}" style="text-decoration: none;">
            <button class="w3-button w3-block w3-grey">
                Volar
            </button>
        </a>
        <footer class="w3-container w3-teal">
            <h5>Criado por Diogo Marques</h5>
        </footer>
    </body>
</html>`

        return text
    }

    compositorPage(compositor){

        return `
<!DOCTYPE html>
<html">
    <head>
        <meta charset="UTF-8"/>
        <link rel="icon" href="favicon.ico"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>${compositor.nome}</title>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>${compositor.nome}</h1>
            </header>
        </div>
        <div class="w3-light-grey" style="padding-left: 15px;">
            <h3 style="padding-top: 10px;">Período</h3>
            <p style="text-align: justify; font-size: 17px; padding-bottom: 10px;">${compositor.periodo}</p>
        </div>
        <div class="w3-light-grey" style="padding-left: 15px;">
            <h3 style="padding-top: 10px;">Data de Nascimento</h3>
            <p style="text-align: justify; font-size: 17px; padding-bottom: 10px;">${compositor.dataNasc}</p>
        </div>
        <div class="w3-light-grey" style="padding-left: 15px;">
            <h3 style="padding-top: 10px;">Data de Falecimento</h3>
            <p style="text-align: justify; font-size: 17px; padding-bottom: 10px;">${compositor.dataObito}</p>
        </div>
        <div class="w3-light-grey" style="padding-left: 15px; padding-right: 15px;">
            <h3 style="padding-top: 10px;">Biografia</h3>
            <p style="text-align: justify; font-size: 17px; padding-bottom: 10px;">${compositor.bio}</p>
        </div>
        <a href="/compositores" style="text-decoration: none;">
            <button class="w3-button w3-block w3-grey">
                Volar
            </button>
        </a>
        <footer class="w3-container w3-teal">
            <h5>Criado por Diogo Marques</h5>
        </footer>
    </body>
</html>`
    }

    periodosPage(periodos){

        let text =`
<!DOCTYPE html>
<html">
    <head>
        <meta charset="UTF-8"/>
        <link rel="icon" href="favicon.ico"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Períodos</title>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Lista de Períodos</h1>
            </header>
        </div>
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                    <th>Período</th>
                    <th>Artistas</th>
                    <th>Editar</th>
                    <th>Apagar</th>
                </tr>`

        periodos.forEach(periodo => {
            text +=`
                <tr>
                    <td>${periodo}</td>
                    <td>
                        <a href="/periodos/${periodo}">
                            <button class="w3-button w3-circle w3-grey">
                                <img src="people-fill.svg">
                            </button>
                        </a>
                    </td>
                    <td>
                        <button class="w3-button w3-circle w3-grey">
                            <img src="pencil-fill.svg">
                        </button>
                    </td>
                    <td>
                    <button class="w3-button w3-circle w3-grey">
                        <img src="trash3-fill.svg">
                    </button>
                </td>
                </tr>`
        });

        text += `
            </table>
        </div>
        <a href="/" style="text-decoration: none;">
            <button class="w3-button w3-block w3-grey">
                Volar
            </button>
        </a>
        <footer class="w3-container w3-teal">
            <h5>Criado por Diogo Marques</h5>
        </footer>
    </body>
</html>`
        return text

    }

    editCompositor(compositor){
        return `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="icon" href="favicon.ico"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>Editar - ${compositor.id}</title>
    </head>
    <body>
       <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>${compositor.nome}</h1>
            </header>
        </div>
        <form class="w3-container" method="POST">
            <fieldset>
                <label>Nome</label>
                <input class="w3-input w3-round" type="text" name="nome" value="${compositor.nome}"/>
                <label>Período</label>
                <input class="w3-input w3-round" type="text" name="periodo" value="${compositor.periodo}"/>
                <label>Data de Nascimento</label>
                <input class="w3-input w3-round" type="date" name="dataNasc"value="${compositor.dataNasc}"/>
                <label>Data de Óbito</label>
                <input class="w3-input w3-round" type="date" name="dataObito" value="${compositor.dataObito}"/>
                <label>Biografia</label>
                <input class="w3-input w3-round" type="text" name="bio" value="${compositor.bio}"/>
            </fieldset>
            <button class="w3-button w3-block w3-grey" type="submit">
                Guardar
            </button>
        </form>
        <footer class="w3-container w3-teal">
            <h5>Criado por Diogo Marques</h5>
        </footer>
    </body>
</html>`
    }
}

export default Template