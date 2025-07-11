function countWordOccurrence(titles){
const wordCount={}
  // Flatten all titles into a single string, convert to lowercase, and split by non-word characters
  const allTitlesText = titles.join(" ").toLowerCase();
  const words = allTitlesText.split(/\W+/); // Split by spaces, punctuation, etc.

   words.forEach((word) => {
    if (word) {
      // Ensure it's not an empty string
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });

  return wordCount;
}
function filterWordsByOccurrence(titles){
   const wordscount=countWordOccurrence(titles);
   //this return an object with the  words that appear more than twice
   return Object.fromEntries(
      Object.entries(wordscount).filter(([word,count])=>count>2) //this filters and returns an array of pairs
   );
}
module.exports = filterWordsByOccurrence;