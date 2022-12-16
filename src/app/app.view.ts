import { VirtualDOM } from '@youwol/flux-view'
import { AppState } from './app.state'
import { PotreeView } from './potree.view'

/**
 *
 * @category View
 */
export class AppView implements VirtualDOM {
    /**
     * @group States
     */
    public readonly appState: AppState

    /**
     * @group Immutable DOM Constants
     */
    public readonly class = 'h-100 w-100'

    /**
     * @group Immutable DOM Constants
     */
    public readonly children: VirtualDOM[]

    constructor(params: { appState: AppState }) {
        Object.assign(this, params)

        const pointCloudUrl = `/api/assets-gateway/assets-backend/assets/${this.appState.assetId}/files/metadata.json`

        this.children = [new PotreeView({ pointCloudUrl })]
    }
}
