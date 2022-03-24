const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const GithubStats = require('./components/GithubStats');

module.exports = class ProfileStats extends Plugin {
    startPlugin() {
        this.loadStylesheet('styles.css');
        
        const UserPopoutBody = getModule(m => m.default?.displayName === 'UserPopoutBody', false);

        inject('add-github-stats', UserPopoutBody, 'default', (args, res) => {
            let { user } = args[0];
            res.props.children.splice(0, 0, React.createElement(GithubStats, { user: user.id }));
            return res;
        })
        UserPopoutBody.default.displayName = "UserPopoutBody";
	}

    pluginWillUnload() {
        uninject('add-github-stats');
    }
}