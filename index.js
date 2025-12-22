#!/usr/bin/env node

import synonyms from "synonyms";
import enquirer from "enquirer";
const { Select } = enquirer;

function buildChoices(foundSynonyms) {
  const choices = new Set();
  for (let key in foundSynonyms) {
    const words = foundSynonyms[key];
    for (let i = 0; i < words.length; i++) {
      choices.add(words[i]);
    }
  }
  return [...choices];
}

async function runSynonymSelector(selectableSynonyms) {
  const selecter = new Select({
    name: "synonyms",
    message: "select synonym you want to check",
    choices: selectableSynonyms,
  });
  return await selecter.run();
}

async function fetchFreeDictionary(selectedSynonym) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedSynonym}`;
  const response = await fetch(url);
  return response;
}

function buildDescription(subjectSynonym, dictionaryEntries) {
  const descriptions = [];
  descriptions.push(`📖 word：${subjectSynonym}`);
  for (const sections of dictionaryEntries) {
    for (const meaning of sections.meanings) {
      descriptions.push(` 🏷️ partOfSpeech：${meaning.partOfSpeech}`);
      descriptions.push(" 🔹 definitions");
      let number = 1;
      for (const definitionBlock of meaning.definitions) {
        descriptions.push(`     ${number}. ${definitionBlock.definition}`);
        if (definitionBlock.example) {
          descriptions.push(`     💡 example：${definitionBlock.example}`);
        }
        number++;
      }
    }
  }
  return descriptions.join("\n");
}

const word = process.argv[2];
if (word === undefined) {
  console.log("Enter a word");
  process.exit();
}
const foundSynonyms = synonyms(word);
if (foundSynonyms === undefined) {
  console.log("synonyms not found");
  process.exit();
}
const selectableSynonyms = buildChoices(foundSynonyms);
const subjectSynonym = await runSynonymSelector(selectableSynonyms);
let response;
try {
  response = await fetchFreeDictionary(subjectSynonym);
} catch (err) {
  if (err instanceof TypeError) {
    console.log("Failed to fetch from the Free Dictionary API");
    process.exit();
  }
}
if (response.status === 404) {
  console.log(`meanings for ${subjectSynonym} not found`);
  process.exit();
}
const dictionaryEntries = await response.json();
console.log(buildDescription(subjectSynonym, dictionaryEntries));
