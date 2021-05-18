/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2021/5/18
 * Time: 12:47 下午
 */

const fs = require('fs');
const path = require('path');
const execa = require('execa');

let dirname = path.resolve(__dirname, '../.deploy_git');

// 检查文件是否存在于当前目录中。
function isDirExist(dirname) {
    try {
        fs.accessSync(dirname, fs.constants.F_OK);
        return true;
    } catch (e) {
        return false;
    }
}


async function deploy() {
    let targetPath = `root@chrischen.top:/home/project/chrischen.top`;
    try {
        console.log('scp -r', dirname, targetPath);
        await execa('scp', '-r', dirname, targetPath);
    } catch (e) {
        
        console.log(e);
    }
}
