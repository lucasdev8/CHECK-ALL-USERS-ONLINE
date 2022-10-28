const fs = require('fs')
const { spawn } = require('child_process')

const controllerOnlineUser = async (req, res) => {
    const users = []
    
    const data = await fs.readFileSync('./usuarios.db', {encoding:'utf8', flag:'r'})

    const dataUsers = data.split('\n')

    dataUsers.map(async UserAndLimit => {

        const userAndlimit = UserAndLimit.split(' ')

        const command = `ps -u ${userAndlimit[0]} | grep sshd | wc -l`

        const ls = await spawn(command, [command], { shell: true })
        
        ls.stdout.on('data', (connectedOverSsh) => {

            users.push({
                user: userAndlimit[0],
                onlines: parseInt(`${connectedOverSsh}`.split('\n')[0]),
                limiteUsers: parseInt(userAndlimit[1])
            })

            return res.send(users)
            
        })
        ls.stderr.on('error', (erro) => {
            console.log(erro)
        })
    })
}
module.exports = controllerOnlineUser

//:usuarios.db/CHECK/src/controllers/usu