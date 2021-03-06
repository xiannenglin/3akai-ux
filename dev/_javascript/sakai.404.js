/*
 * Licensed to the Sakai Foundation (SF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The SF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

var sakai = sakai || {};
sakai.nopermissions = function(tuid, showSettings) {
    
    var pageNotFoundErrorLoggedOutTemplate = "page_not_found_error_logged_out_template";
    var pageNotFoundErrorLoggedInTemplate = "page_not_found_error_logged_in_template";
    var pageNotFoundError = ".page_not_found_error";
    var gatewayURL = sakai.config.URL.GATEWAY_URL;

    var doInit = function(){
        if (sakai.data.me.user.anon){
            // the user is anonymous and should be able to log in
            var renderedTemplate = $.TemplateRenderer(pageNotFoundErrorLoggedOutTemplate, sakai.data.me.user).replace(/\r/g, '');
            $(pageNotFoundError).append(renderedTemplate);
            // Set the link for the sign in button
            $(".login-container a").attr("href", gatewayURL + "?url=" + window.location.pathname + window.location.hash);
        } else {
            // Remove the sakai.index stylesheet as it would mess up the design
            $("LINK[href*='/dev/_css/sakai/sakai.index.css']").remove();
            // the user is logged in and should get a page in Sakai itself
            var renderedTemplate = $.TemplateRenderer(pageNotFoundErrorLoggedInTemplate, sakai.data.me.user).replace(/\r/g, '');
            $(pageNotFoundError).append(renderedTemplate);
        }
    }

    doInit();

};
sakai.api.Widgets.Container.registerForLoad("sakai.nopermissions");