import React from 'react';
import { Button } from 'reactstrap';
import TiMediaPlayOutline from 'react-icons/lib/ti/media-play-outline';
import TiHeartOutline from 'react-icons/lib/ti/heart-outline';
import IoSocialBufferOutline from 'react-icons/lib/io/social-buffer-outline';
import MdChatBubbleOutline from 'react-icons/lib/md/chat-bubble-outline';
import IoIosPaperplaneOutline from 'react-icons/lib/io/ios-paperplane-outline';
import axios from 'axios';
import url from '../config.js';

class IconTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            numOfComments: 0,
            numOfCollection: 0,
            numOfLikes: 0
        }
    }

    shortenNum(num) {
        const stringifiedNum = typeof num === 'string' ? num : JSON.stringify(num);
        if (stringifiedNum.length >= 7 && stringifiedNum.length < 10) {
            const milDigit = stringifiedNum.slice(0, stringifiedNum.length - 4);
            return this.convertMilToString(stringifiedNum, milDigit);
        } else if (stringifiedNum.length >= 10 && stringifiedNum.length < 13) {
            const bilDigit = stringifiedNum.slice(0, stringifiedNum.length - 7)
            return this.convertBilToString(stringifiedNum, bilDigit);
        } else if (stringifiedNum.length >= 4 && stringifiedNum.length < 7) {
            const kDigit = stringifiedNum.slice(0, stringifiedNum.length - 1)
            return this.convertThousandToString(stringifiedNum, kDigit);
        } else {
            return num
        }

    }

    convertMilToString(stringifiedNum, milDigit) {
        if (Number(milDigit[milDigit.length - 1]) >= 5) {
            let newNum = Number(milDigit.slice(0, milDigit.length - 1)) + 1;
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' M';
        } else {
            let newNum = Number(milDigit.slice(0, milDigit.length - 1));
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' M';
        }
    }

    convertBilToString(stringifiedNum, bilDigit) {
        if (Number(bilDigit[bilDigit.length - 1]) >= 5) {
            let newNum = Number(bilDigit.slice(0, bilDigit.length - 1)) + 1;
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' B';
        } else {
            let newNum = Number(bilDigit.slice(0, bilDigit.length - 1));
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' B';
        }

    }

    convertThousandToString(stringifiedNum, kDigit) {
        if (stringifiedNum.length === 4) {
            let newNum = Number(kDigit.slice(0, kDigit.length - 1));
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' K';
        } else {
            if (Number(kDigit[kDigit.length - 1]) >= 5) {
                let newNum = Number(kDigit.slice(0, kDigit.length - 1)) + 1;
                let newArr = newNum.toString().split('');
                newArr.splice(newArr.length - 1, 0, ".")
                return newArr.join('') + ' K';
            } else {
                let newNum = Number(kDigit.slice(0, kDigit.length - 1));
                let newArr = newNum.toString().split('');
                newArr.splice(newArr.length - 1, 0, ".")
                return newArr.join('') + ' K';
            }
        }
    }

    getNumOfComments(video_id) {
        axios.get(`http://${url}/comments/${video_id}`).then((data) => {
            this.setState({
                numOfComments: data.data.length
            })
        })
    }

    getNumOfLikes(video_id) {
        axios.get(`http://${url}/categories/${video_id}`).then((data) => {
            this.setState({
                numOfLikes: data.data.likes
            })
        })
    }

    componentDidMount() {
        let id = window.location.pathname;
        id = id.split('/');
        this.getNumOfComments(Number(id[1]));
        this.getNumOfLikes(Number(id[1]));
    }

    render() {
        return (
            <div style={{ paddingRight: '2%' }}>
                <div style={{ float: 'left' }}>
                    <Button style={{ backgroundColor: 'white', borderColor: 'white', width: '8em' }}>
                        <TiMediaPlayOutline style={{ color: 'black', width: '2em', height: '2em' }} />
                        <div style={{ display: 'inline', color: 'black' }}>{
                            this.props.data.plays === undefined ?
                                this.shortenNum(10000000)
                                : this.shortenNum(this.props.data.plays)
                        }</div>
                    </Button>
                    &nbsp;
                    <Button style={{ backgroundColor: 'white', borderColor: 'white', width: '8em' }}>
                        <TiHeartOutline style={{ color: 'black', width: '1.75em', height: '2em' }} />
                        <div style={{ display: 'inline', color: 'black' }}>{" " + this.state.numOfLikes === undefined ?
                            this.shortenNum(10000000)
                            : this.shortenNum(this.state.numOfLikes)}</div>
                    </Button>
                    &nbsp;
                    <Button style={{ backgroundColor: 'white', borderColor: 'white', width: '8em' }}>
                        <IoSocialBufferOutline style={{ color: 'black', width: '1.75em', height: '2em' }} />
                        <div style={{ display: 'inline', color: 'black' }}>{" " + this.state.numOfCollection}</div>
                    </Button>
                    &nbsp;
                    <Button style={{ backgroundColor: 'white', borderColor: 'white', width: '8em' }}>
                        <MdChatBubbleOutline style={{ color: 'black', width: '1.75em', height: '2em' }} />
                        <div style={{ display: 'inline', color: 'black' }}>{" " + this.state.numOfComments}</div>
                    </Button>
                </div>
                <div style={{ float: 'right' }}>
                    <Button style={{ backgroundColor: 'rgb(238, 241, 242)', borderColor: 'white', width: '7em' }}>
                        <IoIosPaperplaneOutline style={{ color: 'black', width: '1.75em', height: '2em' }} />
                        <div style={{ display: 'inline', color: 'black' }}>{" Share"}</div>
                    </Button>
                </div>
            </div>
        )
    }

}

export default IconTab;