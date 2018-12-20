const WebpackState = {
    data: {
        goliath: {
            script: [],
            style: [
            ],
            images: []
        },
        default: {
            script: [
                '/public/styles/lib/jimp/jimp.min.js',
                '/public/styles/lib/videojs/video.js',
                '/public/styles/lib/videojs/videojs-contrib-hls.min.js',
                '/public/styles/lib/videojs/videojs-contrib-quality-levels.min.js',
                '/public/styles/lib/videojs/videojs-resolution-switcher.js'
            ],
            style: [
                '/public/styles/lib/bootstrap/bootstrap.min.css',
                '/public/styles/lib/font-awesome/css/font-awesome.min.css',
                '/public/styles/lib/bootstrap/bootstrap-colorpicker.min.css',
                '/public/styles/lib/videojs/video-js.css',
                '/public/styles/lib/videojs/custom.css'
            ],
            images: []
        }
    },
    getAssets({ url = '' }) {
        let layout = 'default';
        layout = (url.indexOf('/goliath') > -1) ? 'goliath' : layout;
        return this.data[layout];
    }
}

export default WebpackState;
