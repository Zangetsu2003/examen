import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'How well do you know me? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function askName() {
    const answers = await inquirer.prompt({
      name: 'player_name',
      type: 'input',
      message: 'What is your name?',
      default() {
        return 'Player';
      },
    });
  
    playerName = answers.player_name;
  }

  async function question1() {
    const answers = await inquirer.prompt({
      name: 'question_1',
      type: 'list',
      message: 'This is an exam so no talking?\n',
      choices: [
        'Halo 1',
        'Halo 2',
        'Halo 3',
        'Halo reach',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'Halo reach');
  }

  async function question2() {
    const answers = await inquirer.prompt({
      name: 'question_2',
      type: 'list',
      message: 'What is the best cod?\n',
      choices: [
        'COD BO1',
        'COD BO2',
        'COD MW2',
        'COD MW3',
      ],
    });
  
    return handleAnswer(answers.question_2 === 'COD BO2');
  }

  async function question3() {
    const answers = await inquirer.prompt({
      name: 'question_3',
      type: 'list',
      message: 'What is the best shooter?\n',
      choices: [
        'Cod',
        'Valorant',
        'R6',
        'CSGO',
      ],
    });
  
    return handleAnswer(answers.question_3 === 'Cod');
  }

  async function question4() {
    const answers = await inquirer.prompt({
      name: 'question_4',
      type: 'list',
      message: 'What is the best campaign game?\n',
      choices: [
        'God of War',
        'RDR2',
        'GTA V',
        'Halo',
      ],
    });
  
    return handleAnswer(answers.question_4 === 'RDR2');
  }

  async function question5() {
    const answers = await inquirer.prompt({
      name: 'question_5',
      type: 'list',
      message: 'What is the best console?\n',
      choices: [
        'Xbox',
        'Switch',
        'Playstation',
        'Steamdeck',
      ],
    });
  
    return handleAnswer(answers.question_5 === 'Xbox');
  }


  async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
  
    if (isCorrect) {
      spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
      spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
      process.exit(1);
    }
  }

  function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');

      console.log(
        chalk.green(
          `I owe you your favorite thing in the world`
        )
      );
  
      process.exit(0);
    });
  }

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
