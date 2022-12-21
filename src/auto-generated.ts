
const runTimeDependencies = {
    "externals": {
        "@youwol/potree": "^0.1.1",
        "@youwol/cdn-client": "^1.0.2",
        "@youwol/flux-view": "^1.0.3"
    },
    "includedInBundle": {}
}
const externals = {
    "@youwol/potree": "window['Potree_APIv01']",
    "@youwol/cdn-client": "window['@youwol/cdn-client_APIv1']",
    "@youwol/flux-view": "window['@youwol/flux-view_APIv1']"
}
const exportedSymbols = {
    "@youwol/potree": {
        "apiKey": "01",
        "exportedSymbol": "Potree"
    },
    "@youwol/cdn-client": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/cdn-client"
    },
    "@youwol/flux-view": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/flux-view"
    }
}

// eslint-disable-next-line @typescript-eslint/ban-types -- allow to allow no secondary entries
const mainEntry : Object = {
    "entryFile": "./main.ts",
    "loadDependencies": [
        "@youwol/potree",
        "@youwol/cdn-client",
        "@youwol/flux-view"
    ]
}

// eslint-disable-next-line @typescript-eslint/ban-types -- allow to allow no secondary entries
const secondaryEntries : Object = {}
const entries = {
     '@youwol/potree-viewer': './main.ts',
    ...Object.values(secondaryEntries).reduce( (acc,e) => ({...acc, [`@youwol/potree-viewer/${e.name}`]:e.entryFile}), {})
}
export const setup = {
    name:'@youwol/potree-viewer',
        assetId:'QHlvdXdvbC9wb3RyZWUtdmlld2Vy',
    version:'0.1.1-wip',
    shortDescription:"",
    developerDocumentation:'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/potree-viewer',
    npmPackage:'https://www.npmjs.com/package/@youwol/potree-viewer',
    sourceGithub:'https://github.com/youwol/potree-viewer',
    userGuide:'https://l.youwol.com/doc/@youwol/potree-viewer',
    apiVersion:'01',
    runTimeDependencies,
    externals,
    exportedSymbols,
    entries,
    getDependencySymbolExported: (module:string) => {
        return `${exportedSymbols[module].exportedSymbol}_APIv${exportedSymbols[module].apiKey}`
    },

    installMainModule: ({cdnClient, installParameters}:{cdnClient, installParameters?}) => {
        const parameters = installParameters || {}
        const scripts = parameters.scripts || []
        const modules = [
            ...(parameters.modules || []),
            ...mainEntry['loadDependencies'].map( d => `${d}#${runTimeDependencies.externals[d]}`)
        ]
        return cdnClient.install({
            ...parameters,
            modules,
            scripts,
        }).then(() => {
            return window[`@youwol/potree-viewer_APIv01`]
        })
    },
    installAuxiliaryModule: ({name, cdnClient, installParameters}:{name: string, cdnClient, installParameters?}) => {
        const entry = secondaryEntries[name]
        const parameters = installParameters || {}
        const scripts = [
            ...(parameters.scripts || []),
            `@youwol/potree-viewer#0.1.1-wip~dist/@youwol/potree-viewer/${entry.name}.js`
        ]
        const modules = [
            ...(parameters.modules || []),
            ...entry.loadDependencies.map( d => `${d}#${runTimeDependencies.externals[d]}`)
        ]
        if(!entry){
            throw Error(`Can not find the secondary entry '${name}'. Referenced in template.py?`)
        }
        return cdnClient.install({
            ...parameters,
            modules,
            scripts,
        }).then(() => {
            return window[`@youwol/potree-viewer/${entry.name}_APIv01`]
        })
    }
}
