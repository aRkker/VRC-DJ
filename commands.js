const url = require('url'); // for URL validation
const youtubedl = require('youtube-dl'); // duh
const fs = require('fs'); // filesystem for file writing
const ffmpeg = require('fluent-ffmpeg');

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
                      bestURL = format.url;
                    }
                }

                // Didn't find an MP4 one!
                if (bestURL === 'none') {
                    myMessage.edit('Could not find a suitable URL to store, converting. This will take a moment\r\nDownloading video...', 'No valid URL in youtube metadata');
                    // We must do conversion
                    handleConversion(params[0], myMessage);
                }
                else {
                    // TODO: Do what ever here with bestURL, store it to the database or however it works
                    myMessage.edit('Added the track to the list!');
                }
            });
        });
    },


}

handleConversion = (url, message) => {
    let video = youtubedl(url);

    // Pipe it to an actual file
    video.pipe(fs.createWriteStream('C:\\temp\\convert-me.mp4')); // TODO: change path

    video.on('end', () => {
        message.edit('Could not find a suitable URL to store, converting. This will take a moment\r\nConverting video...');

        ffmpeg('C:\\temp\\convert-me.mp4')
        .audioCodec('aac')
        .videoCodec('libx264')
        .on('error', err => {
            console.log(err.message);
        })
        .on('end', () => {
            message.edit('Added the track to the list!');
            // TODO: actually store the file somewhere etc etc. Its in C:\temp\converted.mp4 now 
        })
        .save('C:\\temp\\converted.mp4'); // TODO: change path
    });

}
