import React, { Component, PropTypes } from 'react'


export default class ShareLikeSocial extends Component {
	static propTypes = {
	}
	static contextTypes = {
		i18n: PropTypes.func.isRequired
	}

	state = {}

	render() {
		const shareHref = 'http://viewnhanh.com/news/song-dep/hot-girl-thai-lan-cao-1-71-m-duoc-menh-danh-xinh-nhu-bup-be';
		const shareTitle = 'Hot girl Thái Lan cao 1,71 m, được mệnh danh xinh như búp bê'
		const shareImage = 'https%3A%2F%2Fi.ytimg.com%2Fvi%2FdVAM7Zer9Ck%2Fmaxresdefault.jpg'

		return (
			<div className="container">
				<div>
					{/*addthis social share
					<div className="addthis_inline_share_toolbox"></div>
					*/}
					{/* FB Like & Share button*/}
					<div className="fb-like row" data-href="https://developers.facebook.com/docs/plugins/" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
					{/* FB Follow button*/}
					<div className="fb-follow row" data-href="https://www.facebook.com/zuck" data-layout="standard" data-size="small" data-show-faces="true"></div>
					{/* Linkedin share button*/}
					<script type="IN/Share" data-counter="right"></script>
					{/* Twitter share button
						https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ftweet-button&ref_src=twsrc%5Etfw&text=Tweet%20Button%20%E2%80%94%20Twitter%20Developers&tw_p=tweetbutton&url=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ftweet-button
					*/}
					<a className="twitter-share-button" href="https://twitter.com/intent/tweet" >Tweet</a>
					{/* Google plus Follow button*/}
					<div className="g-plus" data-action="share"></div>
				</div>
				<div>
					<p>
						<a href="https://www.facebook.com/dialog/share?app_id=87741124305&href=https%3A//www.youtube.com/attribution_link%3Fa%3DQUvw03WmeZY%26u%3D%252Fwatch%253Fv%253DdVAM7Zer9Ck%2526feature%253Dshare">facebook</a>
						<a href={`https://www.blogger.com/blog-this.g?n=${shareTitle}&source=youtube&b=%3Ciframe+width=%22480%22+height=%22270%22+src=%22${shareHref}%22+frameborder=%220%22+allowfullscreen%3E%3C/iframe%3E&eurl=https://i.ytimg.com/vi/dVAM7Zer9Ck/maxresdefault.jpg`}>Blogger</a>
						<a href="https://www.tumblr.com/widgets/share/tool/preview?shareSource=legacy&canonicalUrl=&url=https%3A%2F%2Fwww.youtube.com%2F&posttype=video&content=https%3A%2F%2Fwww.youtube.com%2Fattribution_link%3Fa%3DkqUnErEtOY4%26u%3D%252Fwatch%253Fv%253DdVAM7Zer9Ck%2526feature%253Dshare&caption=M%E1%BB%B9+%C4%90ang+Bi%E1%BA%BFn+Trung+Qu%E1%BB%91c+Th%C3%A0nh+Syria+Th%E1%BB%A9+2%3F+%7C+Trung+Qu%E1%BB%91c+Kh%C3%B4ng+Ki%E1%BB%83m+Duy%E1%BB%87t&_format=html">tumblr</a>
						<br />
						ok
                        <a href={`https://www.pinterest.com/pin/create/button/?url=${shareHref}&description=${shareTitle}&media=${shareImage}`}>pinterest</a>
						<a href={`https://plus.google.com/u/0/b/108519829056323858714/share?url=${shareHref}`}>plus.google</a>
						<a href={`https://twitter.com/intent/tweet?url=${shareHref}&text=${shareTitle}&via=YouTube&related=YouTube,YouTubeTrends,YTCreators`}>Twitter</a>
					</p>
				</div>
				<div>
					<a href="https://www.pinterest.com/pin/create/button/">
						<img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_gray_20.png" />
					</a>
					<a data-pin-do="buttonFollow" href="https://www.pinterest.com/pinterest/">Pinterest</a>
				</div>
			</div>
		)
	}
}
