/**
 * @category State
 */
export class AppState {
    /**
     * @group Immutable Constants
     */
    public readonly assetId: string

    constructor(params: { assetId: string }) {
        Object.assign(this, params)
    }
}
