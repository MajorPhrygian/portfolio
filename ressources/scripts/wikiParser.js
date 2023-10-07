let mockInput = 'John Wilksbooth';

const splitInWords = (inputString) => {
   if (typeof inputString === 'string') {
     let wordArray = inputString.split(' ');
     wordArray = wordArray.filter(function(str) {
        return /\S/.test(str);
    });
     if (wordArray.length !== 0) {
        
        return wordArray;
     } else {return null;}
   } else {return null;}
} 

const assembleWords = (words)=>{
    let newString = "";
    words.forEach(word => {
        newString += word + "_"
    });
    newString = newString.slice(0, -1);
    newString = newString.charAt(0).toUpperCase() + newString.slice(1);
    return newString
}

const createURL = (endOfURL) => {
    return 'https://en.wikipedia.org/wiki/' + endOfURL;
}



module.exports = {splitInWords, assembleWords, createURL};