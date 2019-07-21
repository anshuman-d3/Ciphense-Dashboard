import React from 'react';
import logo from "../../static/images/logo.png";
import {Badge, Dropdown, Icon, Layout, Menu} from "antd";

import userAvatar from '../../static/images/user_avatar.png';

import './header.css'

const {Header: Index} = Layout;
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.facebook.com/">
                Profile
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.twitter.com/">
                Settings
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.linkedin.com/">
                Sign Out
            </a>
        </Menu.Item>
    </Menu>
);

const notifications = (
    <Menu>
        <Menu.Item key="0">
            <a href="http://www.facebook.com/" style={{fontSize: "16px"}}><Icon type="facebook" style={{marginRight: "5px", fontSize: "16px"}} />New Notifications on Facebook.</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="http://www.twitter.com/" style={{fontSize: "16px"}}><Icon type="twitter" style={{marginRight: "5px", fontSize: "16px"}}/>Trends updated on Twitter.</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3">
            <a href="http://www.linkedin.com/" style={{fontSize: "16px"}}><Icon type="linkedin" style={{marginRight: "5px", fontSize: "16px"}}/>Find your connections on LinkedIn.</a>
        </Menu.Item>
        <Menu.Item key="3">
            <a href="http://www.behance.com/" style={{fontSize: "16px"}}><Icon type="behance" style={{marginRight: "5px", fontSize: "16px"}}/>View profile on Behance.</a>
        </Menu.Item>
    </Menu>
);

export default class HeaderComponent extends React.Component {
    render() {
        return (
            <Index className="header" style={{background: "#3B3E3F"}}>
                <div className="logo">
                    <img className={"top-logo"} src={logo} alt={"top-logo"}/>
                </div>
                <div className={"user-actions"}>
                    <Dropdown overlay={notifications} trigger={['click']}>
                        <div style={{display: "flex", alignItems: "center", marginRight: "50px"}}>
                            <Icon type="bell" style={{color: "#FFF", fontSize: "24px", marginRight: "10px"}}/>
                            <Badge count={10} style={{backgroundColor: "#C9D1D7", color: "#000"}}/>
                        </div>
                    </Dropdown>
                    <div>
                        <img src={userAvatar} alt={"user_avatar"} className={"user-avatar"}/>
                        <Dropdown overlay={menu} overlayStyle={{width: "150px"}}>
                            <a className="ant-dropdown-link" href="http://www.facebook.com" style={{color: "#FFF", fontStyle: "None"}}>
                                John Doe <Icon type="down"/>
                            </a>
                        </Dropdown>,
                    </div>
                </div>
            </Index>
        )
    }
}
