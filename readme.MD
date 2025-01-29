# Xiaohongshu Downloader Library

A simple JavaScript library to scrape metadata and download links from Xiaohongshu (RedNote). This library extracts detailed metadata and provides download links for videos or images.

---

## Features
- Scrape **title**, **category**, **author details**, and **stats**.
- Extract download links for images or videos.

---

## Installation

Install via npm:

```bash
npm install xiaohongshu-downloader
```

---

## Usage

### Import the Library

```javascript
const { scrapeXiaohongshu } = require('xiaohongshu-downloader');
```

### Example Code

```javascript
const { scrapeXiaohongshu } = require('xiaohongshu-downloader');

(async () => {
    const url = 'https://www.xiaohongshu.com/explore/example-url';
    const result = await scrapeXiaohongshu(url);

    console.log('--- Metadata ---');
    console.log(result.metadata);

    console.log('--- Download Links ---');
    console.log(result.download);
})();
```

### Example Output

#### Metadata
```json
{
  "title": "xxxxxxx",
  "category": ["xxxxxxx", "xxxxxxx", "xxxxxxx"],
  "stats": {
    "liked": false,
    "likedCount": "1万+",
    "collected": false,
    "collectedCount": "10+",
    "commentCount": "10+",
    "shareCount": "10+",
    "followed": false,
    "relation": "none"
  },
  "author": {
    "userId": "652xxxxxxxxxxxx",
    "nickname": "xxxxxxxxx",
    "avatar": "https://sns-avatar-qc.xhscdn.com/avatar/xxxxxxxxxxxxxxxx.jpg",
    "xsecToken": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}

// Video: http://sns-video-ak.xhscdn.com/stream/xxxxxxxxxxxxxxx.mp4
```

---

## Error Handling
The library will throw an error if:
- The provided URL is invalid.
- The content cannot be scraped (e.g., due to changes in the Xiaohongshu structure).

Use a `try-catch` block to handle errors:

```javascript
try {
    const result = await scrapeXiaohongshu(url);
} catch (error) {
    console.error('Error:', error.message);
}
```

---

## License
This project is licensed under the MIT License.