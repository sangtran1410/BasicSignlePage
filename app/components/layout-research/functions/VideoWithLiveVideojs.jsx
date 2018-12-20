import React, { Component } from 'react'
import Moment from 'moment';
import { filter, isEmpty } from 'lodash'

const FPS = 29.97
let videoPlayer;

export default class VideoWithVideojs extends Component {
	static propTypes = {
	}
	static contextTypes = {
	}

	state = {
		status: {
			isVideoJsReady: false
		},
		info: {},
		liveUrls: [
			'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
		],
		poster: 'https://images.pexels.com/photos/160699/girl-dandelion-yellow-flowers-160699.jpeg',
		style: {
			width: '100%'
		},
		id: 'live_video_js',
		tracks: '[{"body":"","endmsec":8267,"endsmpte":"00:00:08:07","id":63912,"startmsec":8267,"startsmpte":"00:00:08:07","tracktypeid":1,"uri":"512/small/keyframe7.jpg","videoassetid":512},{"body":"","endmsec":11300,"endsmpte":"00:00:11:08","id":63913,"startmsec":11300,"startsmpte":"00:00:11:08","tracktypeid":1,"uri":"512/small/keyframe8.jpg","videoassetid":512},{"body":"","endmsec":14334,"endsmpte":"00:00:14:09","id":63914,"startmsec":14334,"startsmpte":"00:00:14:09","tracktypeid":1,"uri":"512/small/keyframe9.jpg","videoassetid":512},{"body":"","endmsec":18167,"endsmpte":"00:00:18:04","id":63915,"startmsec":18167,"startsmpte":"00:00:18:04","tracktypeid":1,"uri":"512/small/keyframe10.jpg","videoassetid":512},{"body":"","endmsec":21200,"endsmpte":"00:00:21:05","id":63916,"startmsec":21200,"startsmpte":"00:00:21:05","tracktypeid":1,"uri":"512/small/keyframe11.jpg","videoassetid":512},{"body":"","endmsec":24234,"endsmpte":"00:00:24:06","id":63917,"startmsec":24234,"startsmpte":"00:00:24:06","tracktypeid":1,"uri":"512/small/keyframe12.jpg","videoassetid":512},{"body":"","endmsec":27267,"endsmpte":"00:00:27:07","id":63918,"startmsec":27267,"startsmpte":"00:00:27:07","tracktypeid":1,"uri":"512/small/keyframe13.jpg","videoassetid":512},{"body":"","endmsec":8267,"endsmpte":"00:00:08:07","id":63919,"startmsec":8267,"startsmpte":"00:00:08:07","tracktypeid":2,"uri":"512/large/keyframe7.jpg","videoassetid":512},{"body":"","endmsec":11300,"endsmpte":"00:00:11:08","id":63920,"startmsec":11300,"startsmpte":"00:00:11:08","tracktypeid":2,"uri":"512/large/keyframe8.jpg","videoassetid":512},{"body":"","endmsec":14334,"endsmpte":"00:00:14:09","id":63921,"startmsec":14334,"startsmpte":"00:00:14:09","tracktypeid":2,"uri":"512/large/keyframe9.jpg","videoassetid":512},{"body":"","endmsec":18167,"endsmpte":"00:00:18:04","id":63922,"startmsec":18167,"startsmpte":"00:00:18:04","tracktypeid":2,"uri":"512/large/keyframe10.jpg","videoassetid":512},{"body":"","endmsec":21200,"endsmpte":"00:00:21:05","id":63923,"startmsec":21200,"startsmpte":"00:00:21:05","tracktypeid":2,"uri":"512/large/keyframe11.jpg","videoassetid":512},{"body":"","endmsec":24234,"endsmpte":"00:00:24:06","id":63924,"startmsec":24234,"startsmpte":"00:00:24:06","tracktypeid":2,"uri":"512/large/keyframe12.jpg","videoassetid":512},{"body":"","endmsec":27267,"endsmpte":"00:00:27:07","id":63925,"startmsec":27267,"startsmpte":"00:00:27:07","tracktypeid":2,"uri":"512/large/keyframe13.jpg","videoassetid":512},{"body":"PROPOSAL TO FUND","endmsec":785,"endsmpte":"00:00:00:23","id":63926,"startmsec":418,"startsmpte":"00:00:00:12","tracktypeid":3,"videoassetid":512},{"body":"REPAIRS TO THE","endmsec":1518,"endsmpte":"00:00:01:15","id":63927,"startmsec":885,"startsmpte":"00:00:00:26","tracktypeid":3,"videoassetid":512},{"body":"AGING TRANSIT","endmsec":2586,"endsmpte":"00:00:02:17","id":63928,"startmsec":1619,"startsmpte":"00:00:01:18","tracktypeid":3,"videoassetid":512},{"body":"SYSTEM  HE WILL","endmsec":3054,"endsmpte":"00:00:03:01","id":63929,"startmsec":2687,"startsmpte":"00:00:02:20","tracktypeid":3,"videoassetid":512},{"body":"MAKE AN","endmsec":3988,"endsmpte":"00:00:03:29","id":63930,"startmsec":3154,"startsmpte":"00:00:03:04","tracktypeid":3,"videoassetid":512},{"body":"ANNOUNCEMENT","endmsec":4921,"endsmpte":"00:00:04:27","id":63931,"startmsec":4088,"startsmpte":"00:00:04:02","tracktypeid":3,"videoassetid":512},{"body":"HERE IN BROOKLYN","endmsec":5390,"endsmpte":"00:00:05:11","id":63932,"startmsec":5023,"startsmpte":"00:00:05:00","tracktypeid":3,"videoassetid":512},{"body":"LATER TODAY THAT","endmsec":6425,"endsmpte":"00:00:06:12","id":63933,"startmsec":5490,"startsmpte":"00:00:05:14","tracktypeid":3,"videoassetid":512},{"body":"HE WANTS TO TAX","endmsec":7824,"endsmpte":"00:00:07:24","id":63934,"startmsec":6524,"startsmpte":"00:00:06:15","tracktypeid":3,"videoassetid":512},{"body":"THE WEATHIEST ONE","endmsec":8326,"endsmpte":"00:00:08:09","id":63935,"startmsec":7926,"startsmpte":"00:00:07:27","tracktypeid":3,"videoassetid":512},{"body":"PERCENT OF NEW","endmsec":9060,"endsmpte":"00:00:09:01","id":63936,"startmsec":8426,"startsmpte":"00:00:08:12","tracktypeid":3,"videoassetid":512},{"body":"YORKERS TO GET","endmsec":10094,"endsmpte":"00:00:10:02","id":63937,"startmsec":9160,"startsmpte":"00:00:09:04","tracktypeid":3,"videoassetid":512},{"body":"MORE MONEY","endmsec":10462,"endsmpte":"00:00:10:13","id":63938,"startmsec":10195,"startsmpte":"00:00:10:05","tracktypeid":3,"videoassetid":512},{"body":"FLOWING INTO THE","endmsec":11230,"endsmpte":"00:00:11:06","id":63939,"startmsec":10562,"startsmpte":"00:00:10:16","tracktypeid":3,"videoassetid":512},{"body":"SUBWAYS","endmsec":12496,"endsmpte":"00:00:12:14","id":63940,"startmsec":11329,"startsmpte":"00:00:11:09","tracktypeid":3,"videoassetid":512},{"body":"ALL OF THIS COMES","endmsec":14131,"endsmpte":"00:00:14:03","id":63941,"startmsec":12597,"startsmpte":"00:00:12:17","tracktypeid":3,"videoassetid":512},{"body":"AFTER DISPUTES","endmsec":15265,"endsmpte":"00:00:15:07","id":63942,"startmsec":14232,"startsmpte":"00:00:14:06","tracktypeid":3,"videoassetid":512},{"body":"BETWEEN THE MAYOR","endmsec":15766,"endsmpte":"00:00:15:22","id":63943,"startmsec":15366,"startsmpte":"00:00:15:10","tracktypeid":3,"videoassetid":512},{"body":"AND GOVERNOR","endmsec":16334,"endsmpte":"00:00:16:09","id":63944,"startmsec":15867,"startsmpte":"00:00:15:25","tracktypeid":3,"videoassetid":512},{"body":"OVER WHO WILL BE","endmsec":17434,"endsmpte":"00:00:17:12","id":63945,"startmsec":16434,"startsmpte":"00:00:16:12","tracktypeid":3,"videoassetid":512},{"body":"FOOTING THE BILL","endmsec":17902,"endsmpte":"00:00:17:26","id":63946,"startmsec":17535,"startsmpte":"00:00:17:15","tracktypeid":3,"videoassetid":512},{"body":"FOR THE TRANSIT","endmsec":18502,"endsmpte":"00:00:18:14","id":63947,"startmsec":18002,"startsmpte":"00:00:18:00","tracktypeid":3,"videoassetid":512},{"body":"SYSTEM. THE MTA IS","endmsec":19604,"endsmpte":"00:00:19:17","id":63948,"startmsec":18603,"startsmpte":"00:00:18:17","tracktypeid":3,"videoassetid":512},{"body":"CONTROLLED BY","endmsec":20037,"endsmpte":"00:00:20:01","id":63949,"startmsec":19704,"startsmpte":"00:00:19:20","tracktypeid":3,"videoassetid":512},{"body":"GOVERNOR CUOMO","endmsec":20672,"endsmpte":"00:00:20:19","id":63950,"startmsec":20138,"startsmpte":"00:00:20:04","tracktypeid":3,"videoassetid":512},{"body":"BUT THE GOVERNOR","endmsec":21806,"endsmpte":"00:00:21:23","id":63951,"startmsec":20772,"startsmpte":"00:00:20:22","tracktypeid":3,"videoassetid":512},{"body":"MAINTAINED THAT","endmsec":22273,"endsmpte":"00:00:22:08","id":63952,"startmsec":21906,"startsmpte":"00:00:21:26","tracktypeid":3,"videoassetid":512},{"body":"THE MAYOR NEEDS","endmsec":22873,"endsmpte":"00:00:22:25","id":63953,"startmsec":22373,"startsmpte":"00:00:22:10","tracktypeid":3,"videoassetid":512},{"body":"TO CHIP IN FROM THE","endmsec":24007,"endsmpte":"00:00:24:00","id":63954,"startmsec":22974,"startsmpte":"00:00:22:28","tracktypeid":3,"videoassetid":512},{"body":"CITY BUDGET TO HELP","endmsec":24574,"endsmpte":"00:00:24:16","id":63955,"startmsec":24108,"startsmpte":"00:00:24:03","tracktypeid":3,"videoassetid":512},{"body":"PAY FOR THE REPAIRS.","endmsec":25109,"endsmpte":"00:00:25:03","id":63956,"startmsec":24676,"startsmpte":"00:00:24:19","tracktypeid":3,"videoassetid":512},{"body":"MTA CHAIRMAN JOE","endmsec":26078,"endsmpte":"00:00:26:02","id":63957,"startmsec":25210,"startsmpte":"00:00:25:06","tracktypeid":3,"videoassetid":512},{"body":"LHOTA HAS CALLED","endmsec":26544,"endsmpte":"00:00:26:16","id":63958,"startmsec":26177,"startsmpte":"00:00:26:05","tracktypeid":3,"videoassetid":512},{"body":"ON BOTH THE MAYOR","endmsec":27210,"endsmpte":"00:00:27:06","id":63959,"startmsec":26644,"startsmpte":"00:00:26:18","tracktypeid":3,"videoassetid":512},{"body":"AND THE GOVERNOR","endmsec":28213,"endsmpte":"00:00:28:06","id":63960,"startmsec":27312,"startsmpte":"00:00:27:09","tracktypeid":3,"videoassetid":512}]',
		type: 'application/x-mpegurl'
	}

	componentDidMount() {
		console.log('componentDidMount')
		this.initVideo()
	}

	componentDidUpdate() {
		/* Quality func NMVP-6343: need <video> and *.m3u8 ready before run this.onBeforeInitVideo() */
		if (document.querySelector('video')) {
			// this.initVideo()
		}
	}

	initVideo() {
		console.log('init video')
		const { id, tracks } = this.state
		const self = this
		/* Case: fix for Edge */
		videoPlayer = window.videojs && window.videojs(id, this.initConfig(), function ready() {
			window.videojs.log('Your player is ready!');
			window.videojs.log('Keys are hot!!');

			this.play()
			this.on('loadedmetadata', () => {
				console.log('--------- loadedmetadata')
			});
			this.on('play', () => {
				console.log('--------- play')
				if (!self.state.status.isVideoJsReady) {
					self.initTrackWithJson(JSON.parse(tracks));
					self.state.status.isVideoJsReady = true
				}
			});
			this.on('playing', () => {
				console.log('--------- play')
			});
			this.on('pause', () => {
				console.log('--------- pause')
			})
			this.on('ended', () => {
				console.log('--------- ended')
			});
		});
	}

	initConfig() {
		const { poster } = this.state
		const config = {
			autoplay: false,
			loop: false,
			controls: true,
			preload: 'auto',
			poster,
			width: '100%',
			height: '500px',
			controlBar: {
				bigPlayButton: true,
				playToggle: true,
				timeDivider: true,
				currentTimeDisplay: true,
				durationDisplay: true,
				remainingTimeDisplay: false,
				progressControl: true,
				fullscreenToggle: true,
				volumePanel: {
					inline: false
				},
				captionsButton: true,
				children: [
					'playToggle',
					'currentTimeDisplay',
					'timeDivider',
					'durationDisplay',
					'progressControl',
					'volumePanel',
					'captionsButton'
				]
			},
			plugins: {
				videoJsResolutionSwitcher: {
					default: 'low',
					dynamicLabel: true
				}
			}
		}

		return config
	}

	/* init track for video */
	initTrackWithJson(tracks) {
		const { id } = this.state
		/* check videojs is exsitx in page */
		videoPlayer = window.videojs && window.videojs.getPlayers()[id]
		if (!videoPlayer) {
			return;
		}
		const textTracks = filter(tracks, (o) => { return o.tracktypeid === 3 });
		if (!isEmpty(textTracks)) {
			try {
				const track = videoPlayer.addTextTrack('captions', 'captions on', 'captions on');
				textTracks.forEach(item => {
					if (item.startmsec && item.endmsec) {
						const startime = this.getValueFromHHMMSSFPS(item.startsmpte);
						const endtime = this.getValueFromHHMMSSFPS(item.endsmpte);
						let startmsec = this.convertMilliseconds(startime);
						let endmsec = this.convertMilliseconds(endtime);
						/*delayTime to marker match the label*/
						const delayTime = FPS;
						startmsec = (startmsec - delayTime > 0) ? (startmsec - delayTime) : 0;
						endmsec = (endmsec - delayTime > 0) ? (endmsec - delayTime) : 0;
						track.addCue(new VTTCue((startmsec / 1000), (endmsec / 1000), item.body));
					}
				});
				track.mode = 'showing';
				return;
			} catch (ex) {
				//console.log(ex);
			}
		}
	}

	/*get value h,m,s,ms from a string */
	getValueFromHHMMSSFPS(string) {
		const times = { h: 0, m: 0, s: 0, ms: 0 }
		if (string) {
			const arrayTime = string.split(':');
			return {
				h: Number(arrayTime[0]), m: Number(arrayTime[1]), s: Number(arrayTime[2]), ms: Number(arrayTime[3])
			}
		}
		return times;
	}

	convertMilliseconds({ h, m, s, ms }) {
		const display = Moment.duration({
			h,
			m,
			s
		});
		let milliseconds = display.asMilliseconds();
		milliseconds += this.convertTimeFromFrames(ms);
		return milliseconds
	}

	convertTimeFromFrames(milliseconds, frames = FPS) {
		return Math.round((milliseconds / frames * 1000));
	}

	getInfo() {
		const info = {
			duration: videoPlayer.duration(),
			currentTime: videoPlayer.currentTime()
		}
		this.setState({ info })
	}

	capture(id) {
		const video = this.getVideo(id);
		/* check status of video*/
		video.pause()
		/* delay time to image match together when the video play or pause */
		setTimeout(() => {
			/* create canvas to get image from video */
			const canvas = document.createElement('canvas');
			/* get the actual width, height from video */
			const { videoWidth, videoHeight } = video;
			canvas.width = videoWidth;
			canvas.height = videoHeight;
			canvas.getContext('2d').drawImage(video, 0, 0, videoWidth, videoHeight);
			const base64 = canvas.toDataURL('image/jpeg')
			console.log(base64)
			this.setState({ base64 })
		}, 1000);
	}

	getVideo(VIDEO_ID) {
		let video = document.getElementById(VIDEO_ID).querySelector('video');
		if (!video && document.getElementById(VIDEO_ID)) {
			video = document.getElementById(VIDEO_ID);
		}
		return video;
	}

	renderVideo({ videoKey = 'urls', type = 'mp4'} = '') {
		const { style, [videoKey]: urls, id, type: typeLink } = this.state
		return (
			<div className="featured_Video" >
				<h1>{type} video links:</h1>
				<video
					crossOrigin
					style={style}
					controls={true}
					preload="auto"
					id={id}
					className="video-js vjs-default-skin video-js-on-cms">
					<source src={urls[0]} type={typeLink} />
				</video>
			</div>
		)
	}

	render() {
		const { info = {}, base64, id } = this.state
		console.log(document.querySelector('video'))
		return (
			<div className="container">
				{this.renderVideo({ videoKey: 'liveUrls', type: 'live stream' })}
				<hr />
				<div>
					<button className="btn btn-primary" onClick={() => this.getInfo()}>1.GetInfo</button>
					<button className="btn btn-primary" onClick={() => this.capture(id)}>2.Capture</button>
					<p>Duration: {info.duration}</p>
					<p>Current Time: {info.currentTime}</p>
					<img src={base64} width="500" />
				</div>
			</div>
		)
	}
}
