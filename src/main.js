const fs = require('fs');
const _ = require('lodash');
const treinamento = fs.readFileSync('shakespeare.txt', 'utf8').split(' ').filter((item) => item != '');

//Functions

const removeRegularExpression = (array) =>{
  for(let k = 0; k< array.length; k++){
    array[k] = array[k].replace(/(\r\n|\n|\r)/gm,"")
  }
  return array;
}

const countNGram = (array) => {
  return array.length;
}

const countWords = (palavra, array_treinamento) => {
  let count = 0;
  for (let i = 0; i< array_treinamento.length; i++){
    if(array_treinamento.slice(i, palavra.split(' ').length+i).join(" ").toUpperCase() == palavra.toUpperCase()){
      count ++;
    }
  }
  return count;
}

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

const params = process.argv.slice(2).join(" ");

const main = (params, array_treinamento) => {
  let probabilidades = []
  result = [];
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
  return result;
}
//console.log(process.argv.slice(2).slice(process.argv.slice(2).length-1))
console.log(main(params, removeRegularExpression(treinamento)));

//console.log(findWords('Four days', treinamento));
//console.log(findWordsAfter('Long withering', removeRegularExpression(treinamento)));
//console.log(countWordsAfter('now', 'my', removeRegularExpression(treinamento)));


// const caclProbabilidadeNGram = (palavra, palavraAnterior){
//
// }
