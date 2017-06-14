"use strict"

//sed 's/[.;\,?!:]//g' shakespeare.txt > shakespeare.txt

// Import de bibliotecas usadas no desenolvimento do projeto.
const fs = require('fs');
const _ = require('lodash');

// Leitura do Arquivo e transformação do mesmo em Array de palavras;
// Melhorar Desempenho.
const treinamento = fs.readFileSync('shakespeare.txt', 'utf8').split(' ').filter((item) => item != '');

//eu corri muito

const findWordAfter = (palavra, arrayTreinamento) => {
  let words = [];
  for (let i=0; i<arrayTreinamento.lenght; i++){
    if(arrayTreinamento[i] == palavra){
      console(arrayTreinamento[i]);
      for(let j=0; j<words.lenght; j++){
        if(words[j].word == palavra){
          words[j].count +=1;
        }else{
          words.push({
            word: palavra,
            count: 1
          })
        }
      }
    }
  }
  return words;
}

console.log(findWordAfter('muito', treinamento));
//Leitura dos parâmetros no Temrinal.
const params = process.argv.slice(2);
