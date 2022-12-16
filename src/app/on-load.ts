import { render } from '@youwol/flux-view'
import { AppState } from './app.state'
import { AppView } from './app.view'

const assetId = new URLSearchParams(window.location.search).get('id')

const appState = new AppState({ assetId })
const vDOM = new AppView({ appState })

document.getElementById('content').appendChild(render(vDOM))
