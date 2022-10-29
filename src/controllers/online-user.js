const fs = require('fs')
const { exec } = require('child_process')

const controllerOnlineUser = async (req, res) => {
    const users = []

    const data = await fs.readFileSync('./usuarios.db', {encoding:'utf8', flag:'r'})
    const dataUsers = data.split('\n')

    dataUsers.map(async UserAndLimit => {

        const userAndlimit = UserAndLimit.split(' ')

        const command = `ps -u ${userAndlimit[0]} | grep sshd | wc -l`

        exec(command, (error, stdout, stderr) => {
            
            if (error) throw error;

            users.push({
                user: userAndlimit[0],
                onlines: parseInt(stdout.split('\n')[0]),
                limiteUsers: parseInt(userAndlimit[1])
            })

            if (users.length == dataUsers.length) {

                return res.send(users)
                
            }
        }) 
        
    })
}
module.exports = controllerOnlineUser

//const { exec } = require('child_process');exec("ps -u root | grep sshd | wc -l", (err, stdout, stderr)=>console.log(stdout))