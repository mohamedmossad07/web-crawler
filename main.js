const {crawl} = require('./crawl')

if(process.argv.length != 3){
    console.error("Please enter a Valid args!!")
    process.exit(1)
}
const response = crawl(process.argv[2],process.argv[2])
response.then(r=>console.log(`Result:`,r))
