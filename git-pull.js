let options;
const argsSchema = [
    ['github', 'pobruno'],
    ['repository', 'bitburner-scripts'],
    ['branch', 'main'],
    ['download', []],
    ['new-file', []],
    ['subfolder', ''],
    ['extension', ['.js', '.ns', '.txt', '.script']],
    ['omit-folder', ['/Temp/']],
];

export function autocomplete(data, args) {
    data.flags(argsSchema);
    const lastFlag = args.length > 1 ? args[args.length - 2] : null;
    if (["--download", "--subfolder", "--omit-folder"].includes(lastFlag))
        return data.scripts;
    return [];
}

export async function main(ns) {
    options = ns.flags(argsSchema);    
    if (options.subfolder && !options.subfolder.startsWith('/'))
        options.subfolder = '/' + options.subfolder;
    const baseUrl = `https://raw.githubusercontent.com/${options.github}/${options.repository}/${options.branch}/`;
    const filesToDownload = options['new-file'].concat(options.download.length > 0 ? options.download : await repositoryListing(ns));
    for (const localFilePath of filesToDownload) {
        let fullLocalFilePath = pathJoin(options.subfolder, localFilePath);
        const remoteFilePath = baseUrl + localFilePath;
        ns.print(`tentando atualizar "${fullLocalFilePath}" de ${remoteFilePath} ...`);
        if (await ns.wget(`${remoteFilePath}?ts=${new Date().getTime()}`, fullLocalFilePath) && await rewriteFileForSubfolder(ns, fullLocalFilePath))
            ns.tprint(`SUCESSO: Atualizado "${localFilePath}" para o mais recente de ${remoteFilePath}`);
        else
            ns.tprint(`AVISO: "${localFilePath}" não foi atualizado. (Atualmente em execução ou não localizado em ${remoteFilePath} )`)
    }
}

function pathJoin(...args) {
    return args.filter(s => !!s).join('/').replace(/\/\/+/g, '/');
}

export async function rewriteFileForSubfolder(ns, path) {
    if (!options.subfolder || path.includes('git-pull.js'))
        return true;
    let contents = ns.read(path);
    contents = contents.replace(`subfolder const = ''`, `const subfolder = '${options.subfolder}/'`);
    contents = contents.replace(/from '(\.\/)?(.*)'/g, `de '${pathJoin(options.subfolder, '$2')}'`);
    await ns.write(path, contents, 'w');
    return true;
}

async function repositoryListing(ns, folder = '') {
    const listUrl = `https://api.github.com/repos/${options.github}/${options.repository}/contents/${folder}?ref=${options.branch}`
    let response = null;
    try {
        response = await fetch(listUrl);
        response = await response.json();
        const folders = response.filter(f => f.type == "dir").map(f => f.path);
        let files = response.filter(f => f.type == "file").map(f => f.path)
            .filter(f => options.extension.some(ext => f.endsWith(ext)));
        ns.print(`Os seguintes arquivos existem em ${listUrl}\n${files.join(", ")}`);
        for (const folder of folders)
            files = files.concat((await repositoryListing(ns, folder))
                .map(f => `/${f}`));
        return files;
    } catch (error) {
        if (folder !== '') throw error;
        ns.tprint(`AVISO: Falha ao obter uma listagem de repositório: ${listUrl}` +
            `\nConteúdo da resposta (se disponível): ${JSON.stringify(response ?? '(N/A)')}\nError: ${String(error)}`);
        return ns.ls('home').filter(name => options.extension.some(ext => f.endsWith(ext)) &&
            !options['omit-folder'].some(dir => name.startsWith(dir)));
    }
}


/*

git init
git add .
git commit -m "message"
git remote add origin "github.com/pobruno/bitburner-scripts.git"
git push -u origin master

*/
