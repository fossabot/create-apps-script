const chalk = require( 'chalk' );
const path = require( 'path' );
const fs = require( 'fs' );
// ──────────────────────────────────────────────────
const prompts = require( './prompt-script' );
// ──────────────────────────────────────────────────
const inq = require( 'inquirer' );
// ──────────────────────────────────────────────────

const defaults = JSON.parse( fs.readFileSync( path.join( __filename, '../../config/default-prompt-values.json' ) ) );

/**
 * Prompts for package.json field values
 */
async function displayPrompts( workDir ) { // eslint-disable-line no-unused-vars
  const workspace = path.resolve( workDir );

  console.log( `Creating Apps Script project at ${chalk.blue( workspace )}`, '\n' );


  const promptAnswers = await inq.prompt(
    prompts( defaults ).prompts
  );

  return promptAnswers;
}

module.exports = displayPrompts;
