"use strict"

//Import of libraries
const fs = require('fs');
const _ = require('lodash');

//Read a File ans transform in a array os elements ordened by the order of the text.
const treinamento = fs.readFileSync('shakespeare.txt', 'utf8').split(' ').filter((item) => item != '');



// ****Functions****//

//Remove a simple regular expression of a array os elements. Need modify to remove a '\', BUT WORK.
const removeRegularExpression = (array) =>{
  for(let k = 0; k< array.length; k++){
    array[k] = array[k].replace(/(\r\n|\n|\r)/gm,"")
  }
  return array;
}

//return a value of a array.
const countNGram = (array) => {
  return array.length;
}

//count the word in a array of elements.
const countWords = (palavra, array_treinamento) => {
  let count = 0;
  for (let i = 0; i< array_treinamento.length; i++){
    if(array_treinamento.slice(i, palavra.split(' ').length+i).join(" ").toUpperCase() == palavra.toUpperCase()){
      count ++;
    }
  }
  return count;
}

//Count how many times a word appears after a parameter.
const countWordsAfter = (palavraAnterior, palavra, array_treinamento) => {
  let count = 0;
  for (let i = 0; i< array_treinamento.length; i++){
    if(array_treinamento.slice(i, palavraAnterior.split(' ').length+i).join(" ").toUpperCase() == palavraAnterior.toUpperCase()){
      if(array_treinamento.slice(i, palavraAnterior.split(' ').length+i+1).join(" ").toUpperCase() == palavraAnterior.concat(" ", palavra).toUpperCase()){
        count ++;
      }
    }
  }
  return count;
}

//Show the word ofter a parameter.
const findWordsAfter = (palavra, array_treinamento) => {
  let palavras = [];
  let uniqueArray = [];
  for (let i=0; i< array_treinamento.length; i++){
    if(array_treinamento.slice(i, palavra.split(' ').length+i).join(" ").toUpperCase() == palavra.toUpperCase()){
      palavras.push(array_treinamento.slice(i, palavra.split(' ').length+i+1).slice(array_treinamento.slice(i, palavra.split(' ').length+i+1).length-1).join(" "));
    }
  }
  uniqueArray = palavras.filter((item, pos) =>  palavras.indexOf(item) == pos )
  return uniqueArray;
}

// Recieve a parameter on terminal.
const params = process.argv.slice(2).join(" ");


//Function Main used to make the program work.
const main = (params, array_treinamento) => {
  let probabilidades = []
  let result = [];
  for(let i = 0; i<findWordsAfter(params, array_treinamento).length; i++){
    probabilidades.push({
      word: findWordsAfter(params, array_treinamento)[i],
      prob: countWordsAfter(params, findWordsAfter(params, array_treinamento)[i], array_treinamento)/countWords(params, array_treinamento)
    })
  }
  let palavras = _.orderBy(probabilidades, ['prob'], ['desc']);
  for(let j=0; j<3; j++){
    result.push(params.concat(' ', palavras[j].word));
  }
  console.log(result);
}
main(params, removeRegularExpression(treinamento));
