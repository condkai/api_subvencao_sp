
/*Selenium*/ 

var webdriver = require('selenium-webdriver');
var express = require('express')
var app = express()
var port = process.env.PORT || 14000;
var By = webdriver.By;
var SGV = require('./funcoes-sgv');
const navegador = 'chrome';//'chrome'; //phantomjs

const driver = new webdriver.Builder().forBrowser(navegador).build();

const jaLogado = function(){
    var link = "data:,"; // quando não está logado este é a url

    var resultado = driver.getCurrentUrl().then(function(url){
        
        if (link == url) {
            return false;
        }else{
            return true;
        }
    }, function(){  
        console.log("não foi possivel visualizar url")
        return false;
    })

}


const acessarSite = function(){
    var link = "https://suser.agricultura.sp.gov.br/feapseguranca/seg_Login/";

    driver.get(link).then(function(){
        console.log("Site Acessado")
    }, function(){
        console.log("Não foi possivel acessar o site")
    });
}

const inserirCPF = function(cpf){
    driver.wait(  webdriver.until.elementLocated(By.id('cpfUsuario')),   1000).then(function(){

        driver.findElement(By.id("cpfUsuario")).sendKeys(cpf);  
        driver.findElement(By.id("cpfUsuario")).getAttribute("value").then(function(valor){
            valor = valor.match(/\d/g).join("");
            if (valor != cpf) {
                console.log("Inserindo CPF novamente, valor atual:" + valor + " é diferente do real: " + cpf) ;
                driver.findElement(By.id("cpfUsuario")).clear();           
                inserirCPF(cpf);
            }           
        }, function(){
            console.log("Não foi possivel inserir o CPF")
            acessarSite();

        })
    }, function(){        
        acessarSite();
    })
    
}

const inserirInput = function(identificador, valorInformado){
    driver.wait(  webdriver.until.elementLocated(By.id(identificador)),   1000).then(function(){

        driver.findElement(By.id(identificador)).sendKeys(valorInformado);  
        driver.findElement(By.id(identificador)).getAttribute("value").then(function(valor){
              
            if (valor != valorInformado) {
                console.log("Inserindo " + identificador + " novamente, valor atual:" + valor + " é diferente do real: " + valorInformado) ;
                driver.findElement(By.id(identificador)).clear();           
                inserirInput(valorInformado);
            }           
        }, function(){
            console.log("Não foi possivel inserir o " + identificador)
            
            acessarSite();

        })
    }, function(){        
        acessarSite();
    })
}

const pressionarBotao = function(identificador){
    driver.wait(  webdriver.until.elementLocated(By.id(identificador)),   100).then(function(){
        driver.findElement(By.id(identificador)).click().then(function(){
            console.log("Clicando no botão " + identificador)
        },function(){
            console.log("Erro ao clicar no botão")        
        })    
    }, function(){        
        console.log("Botão " + identificador  + " não localizado")    
        pressionarBotao(identificador);
    })

}

const erroAoLogar = function(){
    driver.wait(  webdriver.until.elementLocated(By.xpath('/html/body/div[4]/div[7]/div/button')), 1000).then(function () {
        //driver.findElement(By.xpath("/html/body/div[4]/div[7]/div/button")).click();
        //logar();
    },function(){
        driver.wait(  webdriver.until.elementLocated(By.id('item_145')),   1000).then(function(){
            console.log("Não foi possivel logar...");                
        }, function(){            
            console.log("Logado com sucesso");      
        })        
    })  
}

logar()

function logar(){
    
    var link = "data:,"; // quando não está logado este é a url

    driver.getCurrentUrl().then(function(url){        
        if (link == url) {
            acessarSite();
            inserirCPF( "{login}");
            inserirInput("senha", "{senha}");
            pressionarBotao("btnLogin");
            pressionarBotao("id_img_sub_form_b");
            console.log("Realizando login...")
        }else{
            console.log("Já logado...")
        }
    }, function(){  
        console.log("Não foi possivel visualizar url")
        return false;
    })
 
}

app.get('/subvencao/',  function (req, res) {

    let cpf = req.query.cpf;
    let proposta = req.query.proposta;
    let valorSubvencao = req.query.valorSubvencao;
   
    logar();
         

});




app.listen(port, function () {

    console.log('Example app listening on port: ',port)

});
