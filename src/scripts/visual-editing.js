// Visual Editing: enables click-to-edit overlays when page is inside Sanity Presentation Tool
import { enableVisualEditing } from '@sanity/visual-editing'

// Only activate when page is loaded inside an iframe (Presentation Tool)
if (window.self !== window.top) {
    enableVisualEditing()
}
