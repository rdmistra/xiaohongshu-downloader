const { scrapeXiaohongshu } = require('./index'); 

(async () => {
    const url = 'URL';
    const result = await scrapeXiaohongshu(url);

    console.log('--- Metadata ---');
    console.log(result.metadata);

    console.log('--- Download Links ---');
    console.log(result.download);
})();