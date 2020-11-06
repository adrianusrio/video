import React, { Component } from 'react'
import axios from 'axios'

export class Video extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            seconds : 0,
            cntarray : 0,
            src:'',
            arrvideo : []
        }

        this.myRef = React.createRef();
        window.addEventListener('contextmenu', event => event.preventDefault());
    }

    componentDidMount() {
        // axios.get('http://localhost/video/checkvideohandler.php').then(res => {
        //     this.setState({
        //         ...this.state,
        //         src : res.data[0].filename,
        //         arrvideo : res.data
        //     })
        // }).catch(function (error) {

        // })
        this.checkNewUpdateVideo()
        this.timer = setInterval(() => {
            this.setState({ 
                ...this.state,
                seconds: this.state.seconds + 1 });
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state)
        if(this.state.seconds === 3){
            this.fullscreen();
        }

        if(this.state.seconds === 60){
            this.checkNewUpdateVideo();
            this.resetInterval();
        }

    }

    fullscreen(){
        let elemvideo = this.myRef.current;
        if (elemvideo.requestFullscreen) {
            elemvideo.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else if (elemvideo.mozRequestFullScreen) {
            elemvideo.mozRequestFullScreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else if (elemvideo.webkitRequestFullscreen) {
            elemvideo.webkitRequestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else if (elemvideo.msRequestFullscreen) { 
            elemvideo.msRequestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        }
    }

    resetInterval(){
        clearInterval(this.timer);
        this.setState({
            ...this.state,
            seconds: 0
        })
        this.timer = setInterval(() => {
            this.setState({
                ...this.state,
                seconds: this.state.seconds + 1 
            });
        }, 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    next = () => {
        let {arrvideo, src, cntarray} = this.state
        let vidlength = arrvideo.length - 1;

        if(vidlength == cntarray){
            let tmp = 0;
            this.setState({
                ...this.state,
                cntarray : 0,
                src : arrvideo[tmp].filename
            })
        }else{
            cntarray += 1;
            this.setState({
                ...this.state,
                cntarray : cntarray,
                src : arrvideo[cntarray].filename
            })
        }

    }

    checkNewUpdateVideo(){
        axios.get('http://localhost/video/checkvideohandler.php').then(res => {
            this.setState({
                ...this.state,
                src : res.data[0].filename,
                arrvideo : res.data
            })
        }).catch(function (error) {

        })
    }

    render() {
        return (
            <div className="video_contain">
                <video id="videoarea" onEnded={this.next} autoPlay muted src={`${process.env.PUBLIC_URL}/video/${this.state.src}`} ref={this.myRef}></video>
            </div>
        )
    }
}

export default Video
