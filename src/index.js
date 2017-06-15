"use strict"

//sed 's/[.;\,?!:]//g' shakespeare.txt > shakespeare.txt

// Import de bibliotecas usadas no desenolvimento do projeto.
const fs = require('fs');
const _ = require('lodash');

// Leitura do Arquivo e transformação do mesmo em Array de palavras;
// Melhorar Desempenho.
const treinamento = fs.readFileSync('shakespeare.txt', 'utf8').split(' ').filter((item) => item != '');

// const params = process.argv.slice(2);
const wordsArray = (palavra, arrayTreinamento) => {
  let palavras = [];
  let countWords = [];
  let countPalavras = {};
  let arrayPalavras = [];
  for (let i=0; i< arrayTreinamento.length; i++){
    if(palavra == arrayTreinamento[i]){
      palavras.push(arrayTreinamento[i+1]);
    }
  }
  for(let k = 0; k< palavras.length; k++){
    palavras[k] = palavras[k].replace(/(\r\n|\n|\r)/gm,"")
  }
  return palavras;
}

const countPalavraInArray = (array) =>{
  let result = [];
  for (let i = 0; i<array.length; i++){
    if(result.length == 0){
      result.push({
        word: array[i],
        count: 1
      });
    }else{
      for(let j = 0; j<result.length; j++){
        if(array[i] == result[j].word){
          result[j].count ++;
        }else{
          result.push({
            word: array[i],
            count: 1
          });
        }
      }
    }
  }
  return result;
}

const palavras = wordsArray('now', treinamento);
console.log(countPalavraInArray(palavras));

//Leitura dos parâmetros no Temrinal.
