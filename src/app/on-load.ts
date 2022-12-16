import { PotreeView } from './potree.view'
import { render } from '@youwol/flux-view'

const assetId = new URLSearchParams(window.location.search).get('id')

const pointCloudUrl = `/api/assets-gateway/assets-backend/assets/${assetId}/files/metadata.json`

const vDOM = new PotreeView({ pointCloudUrl })
document.getElementById('content').appendChild(render(vDOM))
