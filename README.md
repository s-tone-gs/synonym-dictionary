# synonym-dictionary

A CLI application that displays a list of synonyms for the input word, along with the selected word's part of speech, definition, and example sentence.

## Description

This tool lets you search for synonyms of English words directly from the terminal. It uses the **FreeDictionaryAPI** to retrieve detailed data and displays the following information:

- **Part of Speech**
- **Definition**
- **Example**

Interactive operation using `enquirer` allows you to smoothly check word meanings and usage.

## install

```
npm install synonym-dictionary
```

## How to use

```
npx synonym-dictionary <word>
```

When executed, you can operate through the following steps:

- Display a list of synonyms for the word passed as a command-line argument
- Select a synonym you want to see details for
- Display the part of speech, definition, and example sentence for the selected synonym

### Output Example

```
 ✔ select synonym you want to check · author
📖 word：author
 🏷️ partOfSpeech：noun
 🔹 definitions
     1. The originator or creator of a work, especially of a literary composition.
     💡 example：Have you read any Corinthian authors?
     2. Someone who writes books for a living.
     3. One's authority for something: an informant.
 🏷️ partOfSpeech：verb
 🔹 definitions
     1. (sometimes proscribed) To create a work as its author.
```

## Required Libraries

This package depends on the following libraries.

- [enquirer](https://www.npmjs.com/package/enquirer) - Interactive CLI prompt display
- [synonyms](https://www.npmjs.com/package/synonyms) - Synonym lookup
