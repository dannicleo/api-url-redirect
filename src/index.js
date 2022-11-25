const express    = require('express');
const bodyParser = require('body-parser');
const port       = 80;
const allowCors  = require("./cors");
const { default: helmet } = require("helmet");
const app        = express();

const { getUrlToRedirect } = require("./util");

app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json() );
app.use( allowCors );
app.use( helmet() );

const config = {
    urlDefault: 'https://www.youtube.com/',
    redirectUrl: false,
    changeUrlTime: 12000,
}

const endPoints = [
    {  name: 'dannicleo', defaultUrl: 'https://www.google.com.br', redirectUrl: 'https://www.manal.com.br/'      },
    {  name: 'pricila',   defaultUrl: 'https://www.google.com.br', redirectUrl: 'https://www.americanas.com.br/' },
    {  name: 'george',    defaultUrl: 'https://www.google.com.br', redirectUrl: 'https://www.amazon.com.br/'     },
    {  name: 'ricardo',   defaultUrl: 'https://www.google.com.br', redirectUrl: 'https://www.microsoft.com.br/'  },
]

app.get('/', (req, res) => {
    res.redirect(config.urlDefault);
})

app.get('/cadastro', (req, res) => {
    res.redirect(config.urlDefault);
})

app.get('/cadastro/:name', ( req, res ) => {

    const endPointName = req.params.name || '';
    const { urlDefault, redirectUrl } = config 

    if (endPointName) res.redirect(getUrlToRedirect({
        redirectUrl,
        endPoints, 
        endPointName, 
        urlDefault,
    }));

})

const startBot = function() {

    try {
        
        let botTime = 0;

        setInterval(() => {
    
            if ( botTime === config.changeUrlTime ) {
                config.redirectUrl = !config.redirectUrl
                botTime = 0;
            }
        
            botTime = botTime + 1000;
        
        }, 1000);
    
    
    } catch (error) {
        // console.log()
    }

}

startBot();

app.listen(port);
app.timeout = 240000;