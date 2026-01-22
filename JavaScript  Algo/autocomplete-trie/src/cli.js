const readline = require("readline");
const AutoCompleteTrie = require("./AutoCompleteTrie");


const trie = new AutoCompleteTrie();

function printWelcome() {
  console.log("=== AutoComplete Trie Console ===");
  console.log("Type 'help' for commands\n");
}

function printHelp() {
  console.log("Commands:");
  console.log("  add <word>           - Add word to dictionary");
  console.log("  find <word>          - Check if word exists");
  console.log("  complete <prefix>    - Get completions");
  console.log("  use <word>           - Increment usage count (bonus)");
  console.log("  help                 - Show this message");
  console.log("  exit                 - Quit program\n");
}

function parseInput(line){
    const trimmed = line.trim();
    if(!trimmed) return { cmd: "", arg: "" };
    const [cmd, ...rest] = trimmed.split(/\s+/); // רווח אחד או יותר 
    return { cmd: cmd.toLowerCase(), arg: rest.join(" ") };
}

function formatSuggestions(prefix, suggestionsWithFreq) {
  if (suggestionsWithFreq.length === 0) {
    return `No suggestions for '${prefix}'`;
  }
  const formatted = suggestionsWithFreq.map(s => `${s.word} (${s.frequency})`).join(", ");
  return `Suggestions for '${prefix}': ${formatted}`;
}

function startCLI() {
  printWelcome();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
  });

  rl.prompt();

  rl.on("line", (line) => {
    const { cmd, arg } = parseInput(line);

    switch (cmd) {
      case "add": {
        if (!arg) {
          console.log("✗ Usage: add <word>");
          break;
        }
        const ok = trie.addWord(arg);
        console.log(ok ? `✓ Added '${arg.trim()}' to dictionary` : "✗ Could not add word");
        break;
      }

      case "find": {
        if (!arg) {
          console.log("✗ Usage: find <word>");
          break;
        }
        const exists = trie.findWord(arg);
        console.log(exists ? `✓ '${arg.trim()}' exists in dictionary` : `✗ '${arg.trim()}' not found in dictionary`);
        break;
      }

      case "complete": {
         if (!arg) {
          console.log("✗ Usage: complete <prefix>");
          break;
        }

        const prefix = arg.trim();
        const list = trie.predictWords(prefix); // מחזיר strings

        if (list.length === 0) {
          console.log(`No suggestions for '${prefix}'`);
        } else {
          console.log(`Suggestions for '${prefix}': ${list.join(", ")}`);
        }
        break;
      }


      case "use": {
        if (!arg) {
          console.log("✗ Usage: use <word>");
          break;
        }
        const ok = trie.useWord(arg);
        if (!ok) {
          console.log(`✗ Cannot increment usage: '${arg.trim()}' not found as a complete word`);
          break;
        }
        const freq = trie.getFrequency(arg);
        console.log(`✓ Incremented usage for '${arg.trim()}' (now ${freq})`);
        break;
      }

      case "help":
        printHelp();
        break;

      case "exit":
        console.log("Goodbye!");
        rl.close();
        return;

      case "":
        break;

      default:
        console.log("✗ Unknown command. Type 'help' for commands.");
        break;
    }

    rl.prompt();
  });

  rl.on("close", () => {
    process.exit(0);
  });
}

startCLI();