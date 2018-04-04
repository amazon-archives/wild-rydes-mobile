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
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

import '../css/main.css';

const MainApp = () => (
  <div className="page-mainapp">
    <header className="site-header">
      <div className="site-logo dark">Wild Rydes</div>
      <div className="row column medium-8 large-6 xlarge-5 xxlarge-4">
        <h1 className="title">Main Application</h1>
      </div>
      <SiteNav/>
    </header>
    <SiteFooter/>
  </div>
);

export default MainApp;
