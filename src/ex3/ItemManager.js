import { PokemonClient } from './PokemonClient.js';
import chalk from 'chalk';
import * as fs from 'fs';
const dataFile = 'tasks.txt';

export async function addTodo(todo) {
  writeToFile(`${todo}\n`, 'Task was not added', 'Task was added succesfuly!', {
    flags: 'a',
  });
}

export async function addPokemons(pokemons) {
  const pokemonClient = new PokemonClient();
  const result = await pokemonClient.fetchPokemons(pokemons);

  if (!result) {
    console.log(chalk.red(`could not fetch one of the pokemons ${pokemons}`));
    return;
  }

  result.forEach((pokemon) => {
    writeToFile(
      `Catch ${pokemon.name}\n`,
      'Pokemon was not added',
      'Pokemon was added succesfuly!',
      { flags: 'a' }
    );
  });
}

export function removeItem(indices) {
  const fileData = fs.readFileSync(dataFile).toString(); // reading file data
  const tasksArray = fileData.split('\n').filter((task) => task !== ''); // creating array of lines
  const indicesSorted = [...indices].sort((a, b) => b - a);

  indicesSorted.forEach((idx) => {
    if (idx > tasksArray.length - 1 || idx < 0) {
      // checking idx validity
      throw new Error(chalk.red('Index is invalid!'));
    }
    tasksArray.splice(idx, 1); // removing a line
  });

  const newData = tasksArray.join('\n').concat('\n'); // creating new string without the lines
  writeToFile(
    newData,
    'Could not delete tasks',
    'Tasks were deleted successfuly'
  ); // writing back to the file
}

export function removeAll() {
  writeToFile('', 'Could not delete all tasks', 'All tasks were deleted');
}

export function printTasks() {
  const fileData = fs.readFileSync(dataFile, 'utf8');
  const tasksArray = fileData.split('\n').filter((task) => task !== '');
  const pink = '#DEADED';
  const blue = '#FFA500';
  let currentColor = pink;
  tasksArray.forEach((line) => {
    // add changing colors to each line
    console.log(chalk.hex(currentColor)(line));
    currentColor = currentColor === blue ? pink : blue;
  });
}

function writeToFile(text, errorMsg, successMsg, options = {}) {
  const writeStream = fs.createWriteStream(dataFile, options);

  writeStream.write(text, (err) => {
    if (err) {
      console.log(chalk.blue(errorMsg));
    } else {
      console.log(chalk.magenta(successMsg));
    }
  });
}
