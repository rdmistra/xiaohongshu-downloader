const axios = require('axios');
const cheerio = require('cheerio');

function removeUnicode(jsonString) {
    return jsonString
        .replace(/\\u/g, '')
        .replace(/\\n/g, '\n')
        .replace(/002F/g, '/')
        .replace(/undefined/g, 'null')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\f/g, '\f')
        .replace(/\\b/g, '\b')
        .replace(/\\\\/g, '\\')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/[\x00-\x1F\x7F]/g, '');
}

/**
 * @param {string} url
 * @returns {Promise<object>}
 */

async function scrapeXiaohongshu(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        let jsonString = $("script").last().text();
        if (jsonString.includes("window.__INITIAL_STATE__=")) {
            jsonString = jsonString.split("window.__INITIAL_STATE__=")[1];
        } else {
            throw new Error("JSON data not found in the page.");
        }

        jsonString = jsonString.split(";")[0];
        jsonString = removeUnicode(jsonString);

        let data;
        try {
            data = JSON.parse(jsonString);
        } catch (error) {
            throw new Error(`Failed to parse JSON: ${error.message}`);
        }

        const id = data.note.currentNoteId;
        const meta = data.note.noteDetailMap[id].note;

        const result = {
            metadata: {
                title: meta.title,
                category: meta.tagList.map((tag) => tag.name),
                stats: meta.interactInfo,
                author: meta.user,
            },
            download: meta.video
                ? meta.video.media.stream["h264"][0].masterUrl
                : meta.imageList.map((image) => image.urlDefault),
        };

        return result;
    } catch (error) {
        throw new Error(`Scraping failed: ${error.message}`);
    }
}

module.exports = { scrapeXiaohongshu };
