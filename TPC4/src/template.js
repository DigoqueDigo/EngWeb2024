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


    compositoresPage(compositores){

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
                <h1>Lista de Compositores</h1>
            </header>
        </div>
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                    <th>Nome</th>
                    <th>Periodo</th>
                    <th>Inspecionar</th>
                </tr>`

        compositores.forEach(compositor => {
            text +=`
                <tr>
                    <td>${compositor.nome}</td>
                    <td>${compositor.periodo}</td>
                    <td>
                        <a href="/compositores/${compositor.id}">
                            <button class="w3-button w3-circle w3-black">+</button>
                        </a>
                    </td>
                </tr>`
        });

        text += `
            </table>
        </div>
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
        <div class="w3-grey" style="padding-left: 15px;">
            <h3 style="padding-top: 10px;">Periodo</h3>
            <p style="text-align: justify; font-size: 17px; padding-bottom: 10px;">${compositor.periodo}</p>
        </div>
        <div class="w3-grey" style="padding-left: 15px;">
            <h3 style="padding-top: 10px;">Data de Nascimento</h3>
            <p style="text-align: justify; font-size: 17px; padding-bottom: 10px;">${compositor.dataNasc}</p>
        </div>
        <div class="w3-grey" style="padding-left: 15px;">
            <h3 style="padding-top: 10px;">Data de Falecimento</h3>
            <p style="text-align: justify; font-size: 17px; padding-bottom: 10px;">${compositor.dataObito}</p>
        </div>
        <div class="w3-grey" style="padding-left: 15px; padding-right: 15px;">
            <h3 style="padding-top: 10px;">Biografia</h3>
            <p style="text-align: justify; font-size: 17px; padding-bottom: 10px;">${compositor.bio}</p>
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
    }
}

export default Template
