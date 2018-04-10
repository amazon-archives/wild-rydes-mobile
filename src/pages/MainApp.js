/*
 *   Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the "license" file accompanying this file. This file is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *  express or implied. See the License for the specific language governing
 *  permissions and limitations under the License.
 */
import React from 'react';
import BaseMap from '../components/BaseMap';
import { Auth } from 'aws-amplify';
import '../css/ride.css';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: null
    };
  }

  async componentDidMount() {
    const session = await Auth.currentSession();
    console.log(`session = ${session.accessToken.jwtToken}`);
    this.setState({ authToken: session.accessToken.jwtToken });
  }

  render() {
    const hasApi = false;

    const noApiBlock = (
      <div className="configMessage">
        <div className="backdrop"></div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Successfully Authenticated!</h3>
          </div>
          <div className="panel-body">
            <p>This page is not functional yet because there is no API configured.</p>
            <p>Here is your authentication token:</p>
            <p className="authToken">{this.state.authToken}</p>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <BaseMap/>
        {!hasApi && noApiBlock}
      </div>
    );
  }
}

export default MainApp;
