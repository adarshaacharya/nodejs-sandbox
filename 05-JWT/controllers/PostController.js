exports.dashboard = (req, res) => {
    res.json({
        posts : {
            title : 'Post One',
            description : 'You cannot access data without logged in'
        }
    })
}

exports.admin = (req, res) => {
    res.json({
        adminOne : {
            name : 'Stephen Grinder'
        },
        adminTwo : {
            name : 'Wes Bos'
        }
    })
}