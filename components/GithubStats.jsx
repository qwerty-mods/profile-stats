const { React, getModule } = require('powercord/webpack');

const { fetchProfile } = getModule(['fetchProfile'], false);

module.exports = ({user}) => {
    const [ github, setGithub ] = React.useState();

    if (!github) {
        fetchProfile(user, 'githubstats', user => {
            setGithub(user.connected_accounts.find(m=>m.type === "github"))
        })
    }

    if (github === undefined) return null;

    const stats = `url(https://corellanstoma-github-readme-stats.vercel.app/api?username=${github.name}&custom_title=GitHub:&show_icons=true&hide_border=true&bg_color=00000000&title_color=ffffff&text_color=b9bbbe&icon_color=ffffff&border_radius=12&role=OWNER,COLLABORATOR)`

    return <>
        <div
            className='githubStats'
            style={{backgroundImage: stats}}
        />
    </>
}
