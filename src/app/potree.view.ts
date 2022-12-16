import { VirtualDOM } from '@youwol/flux-view'
import * as Potree from '@youwol/potree'

/**
 *
 * @category Configuration
 */
export class ViewerOptions {
    /**
     * @group Immutable Constants
     */
    public readonly EDLEnabled = true
    /**
     * @group Immutable Constants
     */
    public readonly FOV = 60
    /**
     * @group Immutable Constants
     */
    public readonly pointBudget = 1e6
    /**
     * @group Immutable Constants
     */
    public readonly clipTask = Potree.ClipTask.SHOW_INSIDE

    constructor(
        params: {
            EDLEnabled?: boolean
            FOV?: number
            pointBudget?: number
            clipTask?: Potree.ClipTask
        } = {},
    ) {
        Object.assign(this, params)
    }
    apply(viewer: Potree.Viewer) {
        viewer.setEDLEnabled(this.EDLEnabled)
        viewer.setFOV(this.FOV)
        viewer.setPointBudget(this.pointBudget)
        viewer.setClipTask(this.clipTask)
        viewer.loadSettingsFromURL()
    }
}

/**
 *
 * @category View
 */
export class PotreeView implements VirtualDOM {
    /**
     * @group Immutable Constants
     */
    public readonly pointCloudUrl: string
    /**
     * @group Immutable Constants
     */
    public readonly options: ViewerOptions
    /**
     * @group Immutable DOM Constants
     */
    public readonly class = 'h-100 w-100'
    /**
     * @group Immutable DOM Constants
     */
    public readonly children: VirtualDOM[]

    constructor(params: { pointCloudUrl: string; options?: ViewerOptions }) {
        Object.assign(this, params)
        this.options = this.options || new ViewerOptions()
        this.children = [
            {
                class: 'h-100 w-100',
                connectedCallback: (htmlElement: HTMLDivElement) => {
                    const viewer = new Potree.Viewer(htmlElement)
                    this.options.apply(viewer)
                    Potree.loadPointCloud(this.pointCloudUrl).then(
                        ({ pointcloud }) => {
                            const material = pointcloud.material

                            material.activeAttributeName = 'rgba'
                            material.minSize = 2
                            material.pointSizeType =
                                Potree.PointSizeType.ADAPTIVE

                            viewer.scene.addPointCloud(pointcloud)
                            viewer.fitToScreen()
                        },
                    )
                },
            },
        ]
    }
}
