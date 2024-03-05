const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const app = express();
var compression = require('compression');
require('dotenv').config();

const PORT = {PORT};
const indexPath = path.resolve(__dirname, 'index.html');
app.use(compression());
// Static resources should just be served as they are
app.use(express.static(path.resolve(__dirname)));

async function getCourseById(id) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}v1/course/course-detail/${id}`);
        return response.data.data; // Return data from API
    } catch (error) {
        console.error('Error fetching course:', error);
        return null;
    }
}

app.get('*', async function (req, res) {
    console.log('request: ===> ' + req._parsedUrl.pathname);
    if (req._parsedUrl.pathname.includes('detail')) {
        const courseId = req._parsedUrl.pathname.split('/')[2]; // Extract the id from the URL
        const course = await getCourseById(courseId);
        // Read index.html
        fs.readFile(indexPath, 'utf8', (err, htmlData) => {
            if (err) {
                console.error('Error during file reading', err);
                return res.status(404).end();
            }
            if (course) {
                // Inject meta tags
                htmlData = htmlData
                    .replace('<title>Life Uni</title>', `<title>LifeUni | ${course.name}</title>`)
                    .replace('__META_OG_TITLE__', course.name)
                    .replace('__META_OG_DESCRIPTION__', course.shortDescription)
                    .replace('__META_DESCRIPTION__', course.shortDescription)
                    .replace('__META_OG_IMAGE__', `${process.env.REACT_APP_API_MEDIA}v1/file/download${course.banner}`);
            }

            return res.send(htmlData);
        });
    } else res.sendFile(path.join(__dirname, 'index.html'));
});

// Listening...
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('server start success');
    }
});