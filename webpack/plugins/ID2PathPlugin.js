/**
 * Created by ued on 2017/5/25.
 */

class ID2PathPlugin {

    constructor (config = {}) {
        this.projectRoot = config.projectRoot;
        this.sfxRoot = config.sfxRoot;
        if (!this.projectRoot) {
            console.error('[ID2PathPlugin] projectRoot required! ');
        }
        if (!this.sfxRoot) {
            console.error('[ID2PathPlugin] sfxRoot required! ');
        }
    }

    apply (compiler) {
        let me = this;
        const ID_PATH = {};

        compiler.plugin('emit', (compilation, callback) => {
            compilation.chunks.forEach(chunk => {
                chunk.modules.forEach(module => {
                    ID_PATH[module.id] = {
                        id: module.id,
                        context: me.removeRoot(module.context),
                        rawRequest: module.rawRequest,
                        userRequest: me.removeRoot(module.userRequest),
                        fileDependencies: me.removeRoot(module.fileDependencies)
                    };

                });
            });

            // 记录webpack的模块ID跟实际文件的对应关系
            // 以后可能需要做远程调试本地js的功能
            let context = 'window.webpack_id_2_path = ' + JSON.stringify(ID_PATH, false, 4);
            compilation.assets['webpack_module_id_to_path.js'] = {
                source () {
                    return context;
                },
                size () {
                    return context.length;
                }
            };

            callback();

        });

    }

    removeRoot (paths) {
        let isArray = true;
        if (!paths) {
            return;
        }
        if (!Array.isArray(paths)) {
            isArray = false;
            paths = [paths];
        }
        paths = paths.map(path => {
            if (path.indexOf(this.projectRoot) === 0) {
                return path.replace(this.projectRoot, 'projectRoot');
            } else if (path.indexOf(this.sfxRoot) === 0) {
                return path.replace(this.sfxRoot, 'sfxRoot');
            }
            return path;
        });
        if (!isArray) {
            return paths[0];
        }
        return paths;
    }

}

module.exports = ID2PathPlugin;
