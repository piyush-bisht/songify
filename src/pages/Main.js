import React, { Component } from 'react';
import { auth ,db ,storage, } from "../services/firebase";
import './Main.css';
import { MdMoreVert } from 'react-icons/md';
import defaultAvatarUrl from '../assets/avatar.png';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: auth().currentUser,
            chats: [],
            content: "",
            readError: null,
            writeError: null,
            showMenu: false
        };

        this.toggleMenu = this.toggleMenu.bind(this)
      }

logout() {
    auth().signOut()
}

toggleMenu() {
    this.setState({showMenu: !this.state.showMenu});
}

render() {
    const { user, chats, content, showMenu } = this.state;
    // console.log(user);
    const displayName = user.displayName ? user.displayName : user.email;
    return (
      <div className="chat-window">
        {/* User Info header */}
        <header className="user-info">
          
          <div className="display-name" role="button">
            <div className="d1">
              <div className="d2">
                <span title={displayName} className="s3">
                  {displayName}
                </span>
              </div>
            </div>
          </div>
          <div className="user-actions">
            <div className="d1">
              <div className="d2">
                <div role="button" title="Menu" onClick={this.toggleMenu}>
                  <span>
                    <MdMoreVert />
                  </span>
                </div>
                <span>
                  {showMenu && (
                    <div
                      className="d3"
                      tabIndex="-1"
                      style={{
                        transformOrigin: 'right top',
                        transform: 'scale(1)',
                        opacity: 1,
                      }}
                    >
                      <ul className="u1">
                        <li className="l1" tabIndex="-1">
                          <div
                            className="d4"
                            role="button"
                            onClick={this.logout}
                          >
                            Logout
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}


export default Main;
