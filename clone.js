const scrape = require('website-scraper').default;
const path = require('path');

const options = {
  urls: ['https://iccdalan.vn/'],
  directory: path.join(__dirname, 'iccdalan_clone'),
  recursive: true,
  maxRecursiveDepth: 2, // Lấy trang chủ và các trang con trực tiếp (cấp 1)
  filenameGenerator: 'bySiteStructure',
  request: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }
  }
};

console.log("Đang bắt đầu tải trang web... Vui lòng chờ.");

scrape(options)
  .then((result) => {
    console.log("Hoàn thành! Đã tải xong giao diện web.");
  })
  .catch((err) => {
    console.error("Đã xảy ra lỗi trong quá trình tải:", err);
  });
