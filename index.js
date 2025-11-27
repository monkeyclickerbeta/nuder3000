const { question } = require("readline-sync");
const axios = require("axios");
const fetch = require("sync-fetch");
const chalk = require("chalk");
const gradient = require("gradient-string");
const fs = require("fs");

function Generador(Link, What) {
    resetConsole();
    var toGen = question(gradient.morning(`\nHow Many ${What} You Want To Generate ?: `));
    if (!fs.readdirSync(__dirname).includes(What)) fs.mkdirSync(`./${What}`);
    var i = 1;
    
    const interval = setInterval(() => {
        if (toGen < i) {
            clearInterval(interval);
            console.log(chalk.green(`\n${i - 1} ${What} Has Been Successfully Generated !`));
            process.exit();
            return;
        }
        
        try {
            const data = fetch(Link).json();
            const newLink = data.message;
            
            axios.get(newLink, { responseType: 'stream' })
                .then(response => {
                    const contentType = response.headers['content-type'];
                    const extension = contentType.includes('gif') ? 'gif' : 'jpeg';
                    const writer = fs.createWriteStream(`./${What}/${What}-${i}.${extension}`);
                    
                    response.data.pipe(writer);
                    
                    writer.on('finish', () => {
                        console.log(chalk.cyan(`Downloaded ${What}-${i}.${extension}`));
                    });
                    
                    i++;
                })
                .catch(err => {
                    if (err.toString().includes("Rate") || err.toString().includes("429")) {
                        console.log(chalk.yellow("Rate Limited."));
                        clearInterval(interval);
                        process.exit();
                    } else {
                        console.error(chalk.red(`Error downloading: ${err.message}`));
                    }
                });
        } catch (err) {
            console.error(chalk.red(`Error fetching link: ${err.message}`));
        }
    }, 1500);
}

function resetConsole() {
    console.clear();
    console.log(gradient.morning(`
     _   _           _         _____            
    | \\ | |         | |       / ____|           
    |  \\| |_   _  __| | ___  | |  __  ___ _ __  
    | . \` | | | |/ _\` |/ _ \\ | | |_ |/ _ \\ '_ \\ 
    | |\\  | |_| | (_| |  __/ | |__| |  __/ | | |
    |_| \\_|\\__,_|\\__,_|\\___|  \\_____|\\___|_| |_|`));
}

function main() {
    resetConsole();
    console.log(gradient.morning(`  _______________________________________________
                What Do You Want To Do ?`));
    console.log(gradient.morning(`       [1]: Generate Pussy | [2]: Generate Ass
       [3]: Generate 4K    | [4]: Generate Tits
       [5]: Generate Thigh | [6]: Generate Hentai\n`));
    var choosed = question(gradient.pastel(`Select A Number: `));
    
    switch (choosed) {
        case "1":
            Generador("https://nekobot.xyz/api/image?type=pussy", "Pussy");
            break;
        case "2":
            Generador("https://nekobot.xyz/api/image?type=ass", "Ass");
            break;
        case "3":
            Generador("https://nekobot.xyz/api/image?type=4k", "4K");
            break;
        case "4":
            Generador("https://nekobot.xyz/api/image?type=boobs", "Tits");
            break;
        case "5":
            Generador("https://nekobot.xyz/api/image?type=thigh", "Thigh");
            break;
        case "6":
            Generador("https://nekobot.xyz/api/image?type=hentai", "Hentai");
            break;
        default:
            console.log(gradient.vice("Please Choose A Valid Number."));
            break;
    }
}

main();
