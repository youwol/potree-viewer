export {}
import * as Potree from '@youwol/potree'

const viewer = new Potree.Viewer(document.getElementById('potree_render_area'))

viewer.setEDLEnabled(true)
viewer.setFOV(60)
viewer.setPointBudget(1e6)
viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE)
viewer.loadSettingsFromURL()

const assetId = new URLSearchParams(window.location.search).get('id')

const url = `/api/assets-gateway/assets-backend/assets/${assetId}/files/metadata.json`
Potree.loadPointCloud(url).then(({ pointcloud }) => {
    const material = pointcloud.material

    material.activeAttributeName = 'rgba'
    material.minSize = 2
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE

    viewer.scene.addPointCloud(pointcloud)
    viewer.fitToScreen()
})
