#!/usr/bin/env node

// ^ Always use when writing a command line script for someone else to use

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

console.log(chalk.yellow('Its Keon from the Grave'))

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));


// send a welcome message
async function welcome() {
    const glitchTitle = chalkAnimation.glitch('Players beware, losers die 💀')

    await sleep();
    glitchTitle.stop();

    console.log(`${chalk.green('HOW TO PLAY')}
    I am a anomaly on your computer.
    if you get a question wrong, your mind will be trapped in your CPU ${chalk.bgRed('forever')}
    Your mind is on the line!
    `)
};


//get user name
async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'what is your name mortal?',
        default() {
            return 'Player';
        },
    });
    playerName = answers.player_name;
}




//ask questions
async function question1() {
    const answers = await inquirer.prompt({
        name: 'question1',
        type: 'list',
        message: 'When was Keon born?',
        choices: [
            'February 19, 1997',
            'July 18, 1996',
            'November 26, 1991',
            'August 7, 2002',
        ]
    })

    return handleAnswer(answers.question1 == 'July 18, 1996');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question2',
        type: 'confirm',
        message: 'Is Keon still alive?',
        choices: [
            'yes',
            'no'
        ]
    })

    return handleAnswer(answers.question2 == 'no' || 'n')
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question3',
        type: 'list',
        message: 'Where is Keons soul?',
        choices: [
            'Underground',
            'lost in space',
            'depleted',
            'exonerated'
        ]
    })

    return handleAnswer(answers.question3 == 'lost in space' || 'exonerated')
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question4',
        type: 'input',
        message: 'Are you afraid to die?',
        choices: [
            'yes',
            'no',
        ]
    })

    return handleAnswer(answers.question4 == 'no' || 'No')
}


//handle answer - success or fail
async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. that was correct!` });
    } else {
        spinner.error({ text: `💀 Game over, your mind is now minds forever ${playerName} 💀` })
        process.exit(1);
    }
}



// print a message for a winner!
function winner() {
    console.clear();
    const msg = `${playerName}, You have won! 🚀`

    figlet(msg, (err, data) => {
        console.log(gradient.retro.multiline(data))
    })
}


await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await winner();

