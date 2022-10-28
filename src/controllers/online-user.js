const { spawn } = require('child_process')
const fs = require('fs');

const controllerOnlineUser = async (req, res) => {
    
    const data = fs.readFileSync('.../usuarios.db', {encoding:'utf8', flag:'r'})

    const dataUsers = data.split('\n')

    dataUsers.forEach((user) => {

        const userAndlimit = user.split(', ')

        const command = `ps -u ${userAndlimit[0]} | grep sshd | wc -l`
        const ls = spawn(command, [command], {shell: true})

        ls.stdout.on("data", (data) => {
            const users = []
            if (data == 0) {
                users.push({
                    user: userAndlimit[0],
                    onlines: `${data}`.split('\n')[0],
                    limit: userAndlimit[1]
                })
                console.log(users)
                res.send(users)
            }
        })
        ls.stdout.on('error', (err) => {
            console.log(err)
        })
    })

}
module.exports = controllerOnlineUser