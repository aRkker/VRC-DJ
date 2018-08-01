const url = require('url'); // for URL validation
const youtubedl = require('youtube-dl');

module.exports = {
    
    handleYoutube: (params, message) => {

        // continue only after we've succesfully sent the message because we want to edit it rather than flood the channel with spam
        let result = url.parse(params[0]);
        if (url.parse(params[0]).hostname == null || !url.parse(params[0]).hostname.includes('youtu')) {
            message.channel.send('Invalid URL provided');
            return;
        }
        message.channel.send('Checking compatibility...').then((myMessage) => {
            youtubedl.getInfo(params[0], (err, info) => {
                let bestURL = 'none';

                for (let format of info.formats) {
                    if (format.ext === "mp4") {
                       // console.log('Got one MP4 at least');
                        console.log(format);
                        bestURL = format.url;
                    }
                }

                // Didn't find an MP4 one!
                if (bestURL === 'none') {
                    myMessage.edit('Could not find a suitable URL to store, converting. This will take a moment', 'No valid URL in youtube metadata');
                    // We must do conversion
                }
                else {
                    // Do what ever here with bestURL, store it to the database or however it works
                    myMessage.edit('Added the track to the list!');
                }
            });
        });
    }
}
