const { question } = require("readline-sync");
const axios = require("axios");
const fetch = require("sync-fetch");
const Color = require("sync-color");
Color.init();
const fs = require("fs");

function Generador(Link, What) {
    resetConsole();
    var toGen = question(Color.morning(`\nHow Many ${What} You Want To Generate ?: `));
    if (!fs.readdirSync(__dirname).includes(What)) fs.mkdirSync(`./${What}`);
    var i = 1;
    
    const interval = setInterval(() => {
        if (toGen < i) {
            clearInterval(interval);
            console.log(`\x1b[32m\n${i - 1} ${What} Has Been Successfully Generated !\x1b[0m`);
            process.exit();
            return;
        }
        
        fetch(Link).json().then(data => {
            var newLink = data.message;
            
            axios.get(newLink, { responseType: 'stream' })
                .then(response => {
                    const contentType = response.headers['content-type'];
                    const extension = contentType.includes('gif') ? 'gif' : 'jpeg';
                    const writer = fs.createWriteStream(`./${What}/${What}-${i}.${extension}`);
                    
                    response.data.pipe(writer);
                    
                    writer.on('finish', () => {
                        console.log(`Downloaded ${What}-${i}.${extension}`);
                    });
                    
                    i++;
                })
                .catch(err => {
                    if (err.toString().includes("Rate") || err.toString().includes("429")) {
                        console.log("\x1b[33mRate Limited.\x1b[0m");
                        clearInterval(interval);
                        process.exit();
                    } else {
                        console.error(`Error downloading: ${err.message}`);
                    }
                });
        }).catch(err => {
            console.error(`Error fetching link: ${err.message}`);
        });
    }, 1500);
}

function resetConsole() {
    console.clear();
    console.log(Color.morning(`
     _   _           _         _____            
    | \\ | |         | |       / ____|           
    |  \\| |_   _  __| | ___  | |  __  ___ _ __  
    | . \` | | | |/ _\` |/ _ \\ | | |_ |/ _ \\ '_ \\ 
    | |\\  | |_| | (_| |  __/ | |__| |  __/ | | |
    |_| \\_|\\__,_|\\__,_|\\___|  \\_____|\\___|_| |_|`));
}

function main() {
    resetConsole();
    console.log(Color.morning(`  _______________________________________________
                What Do You Want To Do ?`));
    console.log(Color.morning(`       [1]: Generate Pussy | [2]: Generate Ass
       [3]: Generate 4K    | [4]: Generate Tits
       [5]: Generate Thigh | [6]: Generate Hentai\n`));
    var choosed = question(Color.InitGradient(["#00aaaa", "#FF1493"])("Select A Number: "));
    
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
            console.log(Color.InitGradient(["#8B0000", "#FF1493"])("Please Choose A Valid Number."));
            break;
    }
}

main();
