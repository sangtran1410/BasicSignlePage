import React, { Component, PropTypes } from 'react'
import connect from 'connect-alt'
import MenuLeft from './menu-left';
import ReactCycle from './functions/react-cycle';
import FetchContent from './functions/fetch-content';
import Translate from 'components/layout-research/functions/translate';
import ImgToBase64 from 'components/layout-research/functions/ImgToBase64';
import SaveFile from 'components/layout-research/functions/saveFile';
import PublishingFacebook from 'components/layout-research/functions/publishingFacebook';
import ShareLikeSocial from 'components/layout-research/functions/ShareLikeSocial';
import VideoWithVideojs from 'components/layout-research/functions/VideoWithVideojs';
import VideoWithLiveVideojs from 'components/layout-research/functions/VideoWithLiveVideojs';
import Canvas from 'components/layout-research/functions/canvas';
import ColorPicker from 'components/layout-research/functions/colorpicker';
import ImgWithJimp from 'components/layout-research/functions/ImgWithJimp';


@connect(({ requests: { inProgress }, session: { session } }) => ({ inProgress, session }))

export default class HomeNew extends Component {
    static propTypes = {
        inProgress: PropTypes.bool, 
        session: PropTypes.object
    }
    static contextTypes = {
        locales: PropTypes.array.isRequired,
        flux: PropTypes.object.isRequired,
        i18n: PropTypes.func.isRequired
    }

    state = {
        page: 'ReactCycle',
        userHistory: {
            pageType: '',
            viewedList: [
                { key: '123123-123-122' }
            ],
            needToUpdateList: [
                { key: '123123-123-123', count: 10}
            ]
        }
    }

    componentWillMount() {
        console.log('----------componentWillMount home')
        const { flux } = this.context
        // console.log(flux.stores.helmet.state)
        flux.getActions('helmet').update({ title: 'home page title', description: 'home page description' })
        flux.getActions('users').index()
    }

    componentDidMount() {
        window.addEventListener('hashchange', (e) => {
            console.log(e)
        })  
    }

    checkIsClient() {
        // console.log(JSON.stringify(this.state.userHistory))
        console.log('-----------------', process.env.PORT)
        if (!process.env.PORT) {
            this.state.isClient = true
        } else {
            this.state.isClient = false
        }
        console.log('--------check isclient', this.state.isClient)
    }

    changePage(page) {
        this.setState({ page })
    }

    render() {
        console.log('----------render')
        this.checkIsClient()
        const { page, isPageType } = this.state;
        const style = (isPageType === 'eva') ? {background: 'pink'} : {}

        if (isPageType === 'eva') {
            return (
                <h1>{isPageType}</h1>
            )
        }

        return (
            <div style={style}>
                <h1>
                    Research page. 
                </h1>
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-xl-2">
                        <MenuLeft changePage={this.changePage.bind(this)} />
                    </div>

                    <div className="col-sm-9 col-md-9 col-xl-10">
                        { page === 'ReactCycle' &&
                            <ReactCycle />
                        }
                        { page === 'FetchContent' &&
                            <FetchContent />
                        }
                        { page === 'Translate' &&
                            <Translate />
                        }
                        { page === 'ImgToBase64' &&
                            <ImgToBase64 />
                        }
                        { page === 'SaveFile' &&
                            <SaveFile />
                        }
                        { page === 'PublishingFacebook' &&
                            <PublishingFacebook />
                        }
                        { page === 'ShareLikeSocial' &&
                            <ShareLikeSocial />
                        }
                        { page === 'VideoWithLiveVideojs' &&
                            <VideoWithLiveVideojs />
                        }
                        { page === 'VideoWithVideojs' &&
                            <VideoWithVideojs />
                        }
                        { page === 'Canvas' &&
                            <Canvas />
                        }
                        { page === 'ColorPicker' &&
                            <ColorPicker />
                        }
                        { page === 'ImgWithJimp' &&
                            <ImgWithJimp />
                        }
                    </div>
                </div>     
            </div >
        )
    }
}
